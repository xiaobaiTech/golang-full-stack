---
title: 动图图解！怎么让goroutine跑一半就退出？
date: 2021-11-15 22:57:55
tags:
categories: "golang面试题"
---

![](https://cdn.xiaobaidebug.top/image/doutub_gif2.gif)

光看标题，大家可能不太理解我说的是啥。

<!-- more -->

我们平时创建一个协程，跑一段逻辑，代码大概长这样。

```go
package main

import (
	"fmt"
	"time"
)
func Foo() {
	fmt.Println("打印1")
	defer fmt.Println("打印2")
	fmt.Println("打印3")
}

func main() {
	go  Foo()
	fmt.Println("打印4")
	time.Sleep(1000*time.Second)
}

// 这段代码，正常运行会有下面的结果
打印4
打印1
打印3
打印2
```

**注意**这上面"**打印 2**"是在`defer`中的，所以会在函数结束前打印。因此后置于"**打印 3**"。

那么今天的问题是，如何让`Foo()`函数**跑一半就结束**，比如说跑到**打印 2**，就退出协程。输出如下结果

```go
打印4
打印1
打印2
```

也不卖关子了，我这边直接说答案。

在"打印 2"后面插入一个 `runtime.Goexit()`， 协程就会直接结束。并且结束前还能执行到`defer`里的**打印 2**。

```go
package main

import (
	"fmt"
	"runtime"
	"time"
)
func Foo() {
	fmt.Println("打印1")
	defer fmt.Println("打印2")
	runtime.Goexit() // 加入这行
	fmt.Println("打印3")
}

func main() {
	go  Foo()
	fmt.Println("打印4")
	time.Sleep(1000*time.Second)
}


// 输出结果
打印4
打印1
打印2
```

可以看到**打印 3**这一行没出现了，协程确实提前结束了。

其实面试题到这里就讲完了，这一波自问自答可还行？

但这不是今天的重点，我们需要搞搞清楚内部的逻辑。

## runtime.Goexit()是什么？

看一下内部实现。

```go
func Goexit() {
	// 以下函数省略一些逻辑...
	gp := getg()
	for {
    // 获取defer并执行
		d := gp._defer
		reflectcall(nil, unsafe.Pointer(d.fn), deferArgs(d), uint32(d.siz), uint32(d.siz))
	}
	goexit1()
}

func goexit1() {
	mcall(goexit0)
}
```

从代码上看，`runtime.Goexit()`会先执行一下`defer`里的方法，这里就解释了开头的代码里为什么**在 defer 里的打印 2**能正常输出。

然后代码再执行`goexit1`。本质就是对`goexit0`的简单封装。

我们可以把代码继续跟下去，看看`goexit0`做了什么。

```go
// goexit continuation on g0.
func goexit0(gp *g) {
  // 获取当前的 goroutine
	_g_ := getg()
	// 将当前goroutine的状态置为 _Gdead
	casgstatus(gp, _Grunning, _Gdead)
  // 全局协程数减一
	if isSystemGoroutine(gp, false) {
		atomic.Xadd(&sched.ngsys, -1)
	}

  // 省略各种清空逻辑...

  // 把g从m上摘下来。
  dropg()


	// 把这个g放回到p的本地协程队列里，放不下放全局协程队列。
	gfput(_g_.m.p.ptr(), gp)

  // 重新调度，拿下一个可运行的协程出来跑
	schedule()
}

```

这段代码，信息密度比较大。

很多名词可能让人一脸懵。

简单描述下，Go 语言里有个**GMP 模型**的说法，`M`是内核线程，`G`也就是我们平时用的协程`goroutine`，`P`会在`G和M之间`做工具人，负责**调度**`G`到`M`上运行。

![GMP图](https://cdn.xiaobaidebug.top/image/GMP图.png)

既然是**调度**，也就是说不是每个`G`都能一直处于运行状态，等 G 不能运行时，就把它存起来，再**调度**下一个能运行的 G 过来运行。

暂时不能运行的 G，P 上会有个**本地队列**去存放这些这些 G，P 的本地队列存不下的话，还有个全局队列，干的事情也类似。

了解这个背景后，再回到 `goexit0` 方法看看，做的事情就是将当前的协程 G 置为`_Gdead`状态，然后把它从 M 上摘下来，尝试放回到 P 的本地队列中。然后重新调度一波，获取另一个能跑的 G，拿出来跑。

![goexit](https://cdn.xiaobaidebug.top/image/goexit.gif)

所以简单总结一下，**只要执行 goexit 这个函数，当前协程就会退出，同时还能调度下一个可执行的协程出来跑。**

看到这里，大家应该就能理解，开头的代码里，为什么`runtime.Goexit()`能让协程只执行一半就结束了。

## goexit 的用途

看是看懂了，但是会忍不住疑惑。**面试这么问问，那只能说明你遇到了一个喜欢为难年轻人的面试官**，但正经人谁会没事跑一半协程就结束呢？所以`goexit`的**真实用途**是啥？

有个**小细节**，不知道大家平时 debug 的时候有没有关注过。

![](https://cdn.xiaobaidebug.top/image/0bec52deb6276987.jpeg)

为了说明问题，这里先给出一段代码。

```go
package main

import (
	"fmt"
	"time"
)
func Foo() {
	fmt.Println("打印1")
}

func main() {
	go  Foo()
	fmt.Println("打印3")
	time.Sleep(1000*time.Second)
}
```

这是一段非常简单的代码，输出什么完全不重要。通过`go`关键字启动了一个`goroutine`执行`Foo()`，里面打印一下就结束，主协程`sleep`很长时间，只为**死等**。

这里我们新启动的协程里，在`Foo()`函数内随便打个断点。然后`debug`一下。

![](https://cdn.xiaobaidebug.top/image/image-20211024150223114.png)

会发现，这个协程的堆栈底部是从`runtime.goexit()`里开始启动的。

如果大家平时有注意观察，会发现，**其实所有的堆栈底部，都是从这个函数开始的**。我们继续跟跟代码。

## goexit 是什么？

从上面的`debug`堆栈里点进去会发现，这是个汇编函数，可以看出调用的是`runtime`包内的 `goexit1()` 函数。

```c
// The top-most function running on a goroutine
// returns to goexit+PCQuantum.
TEXT runtime·goexit(SB),NOSPLIT,$0-0
	BYTE	$0x90	// NOP
	CALL	runtime·goexit1(SB)	// does not return
	// traceback from goexit1 must hit code range of goexit
	BYTE	$0x90	// NOP
```

于是跟到了`pruntime/proc.go`里的代码中。

```go
// 省略部分代码
func goexit1() {
	mcall(goexit0)
}
```

是不是很熟悉，这不就是我们开头讲`runtime.Goexit()`里内部执行的`goexit0`吗。

## 为什么每个堆栈底部都是这个方法？

我们首先需要知道的是，函数栈的执行过程，是先进后出。

假设我们有以下代码

```go
func main() {
	B()
}

func B() {
	A()
}

func A() {

}
```

上面的代码是 main 运行 B 函数，B 函数再运行 A 函数，代码执行时就跟下面的动图那样。

![函数堆栈执行顺序](https://cdn.xiaobaidebug.top/image/%E5%87%BD%E6%95%B0%E5%A0%86%E6%A0%88.gif)

这个是先进后出的过程，也就是我们常说的函数栈，执行完**子函数 A()**后，就会回到**父函数 B()**中，执行完**B()后**，最后就会回到**main()**。这里的栈底是`main()`，如果在**栈底**插入的是 `goexit` 的话，那么当程序执行结束的时候就都能跑到`goexit`里去。

结合前面讲过的内容，我们就能知道，此时栈底的`goexit`，会在协程内的业务代码跑完后被执行到，从而实现协程退出，并调度下一个**可执行的 G**来运行。

<br>

那么问题又来了，栈底插入`goexit`这件事是谁做的，什么时候做的？

直接说答案，这个在`runtime/proc.go`里有个`newproc1`方法，只要是**创建协程**都会用到这个方法。里面有个地方是这么写的。

```go
func newproc1(fn *funcval, argp unsafe.Pointer, narg int32, callergp *g, callerpc uintptr) {
	// 获取当前g
  _g_ := getg()
	// 获取当前g所在的p
	_p_ := _g_.m.p.ptr()
  // 创建一个新 goroutine
	newg := gfget(_p_)

	// 底部插入goexit
	newg.sched.pc = funcPC(goexit) + sys.PCQuantum
	newg.sched.g = guintptr(unsafe.Pointer(newg))
	// 把新创建的g放到p中
	runqput(_p_, newg, true)

	// ...
}

```

主要的逻辑是获取当前协程 G 所在的调度器 P，然后创建一个新 G，并在栈底插入一个 goexit。

所以我们每次 debug 的时候，就都能看到函数栈底部有个 goexit 函数。

## main 函数也是个协程，栈底也是 goexit？

关于 main 函数栈底是不是也有个`goexit`，我们对下面代码断点看下。直接得出结果。

![](https://cdn.xiaobaidebug.top/image/image-20211025073255360.png)

main 函数栈底也是`goexit()`。

从 `asm_amd64.s`可以看到 Go 程序启动的流程，这里提到的 `runtime·mainPC` 其实就是 `runtime.main`.

```c
	// create a new goroutine to start program
	MOVQ	$runtime·mainPC(SB), AX		// 也就是runtime.main
	PUSHQ	AX
	PUSHQ	$0			// arg size
	CALL	runtime·newproc(SB)
```

通过`runtime·newproc`创建`runtime.main`协程，然后在`runtime.main`里会启动`main.main`函数，这个就是我们平时写的那个 main 函数了。

```go
// runtime/proc.go
func main() {
	// 省略大量代码
	fn := main_main // 其实就是我们的main函数入口
	fn()
}

//go:linkname main_main main.main
func main_main()
```

结论是，**其实 main 函数也是由 newproc 创建的，只要通过 newproc 创建的 goroutine，栈底就会有一个 goexit。**

## os.Exit()和 runtime.Goexit()有什么区别

最后再回到开头的问题，实现一下首尾呼应。

开头的面试题，除了`runtime.Goexit()`，是不是还可以改为用`os.Exit()`？

同样都是带有"退出"的含义，两者退出的**对象**不同。`os.Exit()` 指的是整个**进程**退出；而`runtime.Goexit()`指的是**协程**退出。

可想而知，改用`os.Exit()` 这种情况下，defer 里的内容就不会被执行到了。

```go
package main

import (
	"fmt"
	"os"
	"time"
)
func Foo() {
	fmt.Println("打印1")
	defer fmt.Println("打印2")
	os.Exit(0)
	fmt.Println("打印3")
}

func main() {
	go  Foo()
	fmt.Println("打印4")
	time.Sleep(1000*time.Second)
}

// 输出结果
打印4
打印1

```

## 总结

- 通过 `runtime.Goexit()`可以做到提前结束协程，且结束前还能执行到 defer 的内容
- `runtime.Goexit()`其实是对 goexit0 的封装，只要执行 goexit0 这个函数，当前协程就会退出，同时还能调度下一个可执行的协程出来跑。
- 通过`newproc`可以创建出新的`goroutine`，它会在函数栈底部插入一个 goexit。
- `os.Exit()` 指的是整个**进程**退出；而`runtime.Goexit()`指的是**协程**退出。两者含义有区别。

## 最后

无用的知识又增加了。

一般情况下，业务开发中，谁会没事执行这个函数呢？

**但是开发中不关心，不代表面试官不关心！**

下次面试官问你，**如果想在 goroutine 执行一半就退出协程，该怎么办？**你知道该怎么回答了吧？

<br>

好了，兄弟们，有没有发现这篇文章写的又水又短，真的是因为我变懒了吗？

不！

当然不！

我是为了兄弟们的身体健康考虑，保持蹲姿太久对身体不好，懂？

<br>

**如果文章对你有帮助，欢迎.....**

算了。

一起在知识的海洋里呛水吧

我是小白，我们下期见！

<br>

**点击**下方名片，关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)

<br>

不满足于在留言区说骚话？

加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点有趣的话题。就**超！开！心！**

<img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" width = "50%"   align=center />

## 文章推荐：

- [既然有 HTTP 协议，为什么还要有 RPC](https://www.xiaobaidebug.top/2022/07/19/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/%E6%97%A2%E7%84%B6%E6%9C%89HTTP%E5%8D%8F%E8%AE%AE%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%A6%81%E6%9C%89RPC%E5%8D%8F%E8%AE%AE%EF%BC%9F/)
- [TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解](https://www.xiaobaidebug.top/2021/03/26/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/TCP%E7%B2%98%E5%8C%85%EF%BC%81%E6%95%B0%E6%8D%AE%E5%8C%85%EF%BC%9A%E6%88%91%E5%8F%AA%E6%98%AF%E7%8A%AF%E4%BA%86%E6%AF%8F%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E9%83%BD%E4%BC%9A%E7%8A%AF%E7%9A%84%E9%94%99%EF%BC%8C%E7%A1%AC%E6%A0%B8%E5%9B%BE%E8%A7%A3/)
- [动图图解！既然 IP 层会分片，为什么 TCP 层也还要分段？](https://www.xiaobaidebug.top/2021/05/25/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/%E5%8A%A8%E5%9B%BE%E5%9B%BE%E8%A7%A3%EF%BC%81%E6%97%A2%E7%84%B6IP%E5%B1%82%E4%BC%9A%E5%88%86%E7%89%87%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88TCP%E5%B1%82%E4%B9%9F%E8%BF%98%E8%A6%81%E5%88%86%E6%AE%B5%EF%BC%9F/)

## 参考资料

饶大的《哪来里的 goexit？》- https://qcrao.com/2021/06/07/where-is-goexit-from/
