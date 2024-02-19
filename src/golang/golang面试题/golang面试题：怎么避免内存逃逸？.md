---
title: golang面试题：怎么避免内存逃逸？
date: 2020-05-16 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9jZDJkODUxZS1hZWQ1LTRlNjYtOGFmNy0wMjczZDc0NDgzNzAucG5n?x-oss-process=image/format,png)

<!-- more -->

# 问题

怎么避免**内存逃逸**？

# 怎么答

在`runtime/stubs.go:133`有个函数叫`noescape`。`noescape`可以在逃逸分析中**隐藏一个指针**。让这个指针在逃逸分析中**不会被检测为逃逸**。

```go
 // noescape hides a pointer from escape analysis.  noescape is
 // the identity function but escape analysis doesn't think the
 // output depends on the input.  noescape is inlined and currently
 // compiles down to zero instructions.
 // USE CAREFULLY!
 //go:nosplit
 func noescape(p unsafe.Pointer) unsafe.Pointer {
     x := uintptr(p)
     return unsafe.Pointer(x ^ 0)
}
```

# 举例

- 通过一个例子加深理解，接下来尝试下怎么通过 `go build -gcflags=-m` 查看逃逸的情况。

```go
package main

import (
	"unsafe"
)
type A struct {
	S *string
}
func (f *A) String() string {
	return *f.S
}
type ATrick struct {
	S unsafe.Pointer
}
func (f *ATrick) String() string {
	return *(*string)(f.S)
}
func NewA(s string) A {
	return A{S: &s}
}
func NewATrick(s string) ATrick {
	return ATrick{S: noescape(unsafe.Pointer(&s))}
}
func noescape(p unsafe.Pointer) unsafe.Pointer {
	x := uintptr(p)
	return unsafe.Pointer(x ^ 0)
}
func main() {
	s := "hello"
	f1 := NewA(s)
	f2 := NewATrick(s)
	s1 := f1.String()
	s2 := f2.String()
	_ = s1 + s2
}
```

执行`go build -gcflags=-m main.go`

```go
$go build -gcflags=-m main.go
# command-line-arguments
./main.go:11:6: can inline (*A).String
./main.go:19:6: can inline (*ATrick).String
./main.go:23:6: can inline NewA
./main.go:31:6: can inline noescape
./main.go:27:6: can inline NewATrick
./main.go:28:29: inlining call to noescape
./main.go:36:6: can inline main
./main.go:38:14: inlining call to NewA
./main.go:39:19: inlining call to NewATrick
./main.go:39:19: inlining call to noescape
./main.go:40:17: inlining call to (*A).String
./main.go:41:17: inlining call to (*ATrick).String
/var/folders/45/qx9lfw2s2zzgvhzg3mtzkwzc0000gn/T/go-build763863171/b001/_gomod_.go:6:6: can inline init.0
./main.go:11:7: leaking param: f to result ~r0 level=2
./main.go:19:7: leaking param: f to result ~r0 level=2
./main.go:24:16: &s escapes to heap
./main.go:23:13: moved to heap: s
./main.go:27:18: NewATrick s does not escape
./main.go:28:45: NewATrick &s does not escape
./main.go:31:15: noescape p does not escape
./main.go:38:14: main &s does not escape
./main.go:39:19: main &s does not escape
./main.go:40:10: main f1 does not escape
./main.go:41:10: main f2 does not escape
./main.go:42:9: main s1 + s2 does not escape
```

其中主要看中间一小段

```go
./main.go:24:16: &s escapes to heap    //这个是NewA中的，逃逸了
./main.go:23:13: moved to heap: s
./main.go:27:18: NewATrick s does not escape // NewATrick里的s的却没逃逸
./main.go:28:45: NewATrick &s does not escape
```

# 解释

- 上段代码对`A`和`ATrick`同样的功能有两种实现：他们包含一个 `string` ，然后用 `String()` 方法返回这个字符串。但是从逃逸分析看`ATrick` 版本没有逃逸。
- `noescape()` 函数的作用是遮蔽输入和输出的依赖关系。使编译器不认为 `p` 会通过 `x` 逃逸， 因为 `uintptr()` 产生的引用是编译器无法理解的。
- 内置的 `uintptr` 类型是一个真正的指针类型，但是在编译器层面，它只是一个存储一个 `指针地址` 的 `int` 类型。代码的最后一行返回 `unsafe.Pointer` 也是一个 `int`。

- `noescape()` 在 `runtime` 包中使用 `unsafe.Pointer` 的地方被大量使用。如果作者清楚被 `unsafe.Pointer` 引用的数据肯定不会被逃逸，但编译器却不知道的情况下，这是很有用的。

- **面试中秀一秀是可以的**，如果在实际项目中如果使用这种 unsafe 包大概率会被同事打死。**不建议使用！** 毕竟包的名字就叫做 `unsafe`, 而且源码中的注释也写明了 `USE CAREFULLY! `。

### 文章推荐：

- [golang 面试题：简单聊聊内存逃逸？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483686&idx=1&sn=e48c51107191f02da5751a19a54f7d41&chksm=9aee288fad99a199c126d5ff735af7320356ce4bb5753ae59ac6231e596354499414b5705b79&token=2092782362&lang=zh_CN#rd)
- [golang 面试题：字符串转成 byte 数组，会发生内存拷贝吗？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483669&idx=1&sn=88f754ddabc04eb3f66ba8ac37ee1461&chksm=9aee28bcad99a1aa1ada41cfccaffc7ef4719a9bc11c1bef45b7d1b5427c1faa12d8d0c3156f&token=2092782362&lang=zh_CN#rd)
- [golang 面试题：翻转含有`中文、数字、英文字母`的字符串](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483664&idx=1&sn=23a0cf8a78b1d9c30b2e3bc102bf421e&chksm=9aee28b9ad99a1af6c879ba4b1f6439e4c21c363f0a668f322c082ca334b62255507828f66d4&token=2092782362&lang=zh_CN#rd)
- [golang 面试题：拷贝大切片一定比小切片代价大吗？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483674&idx=1&sn=ce4b5fee48c54ff69127ef2bd5d91427&chksm=9aee28b3ad99a1a57eed7651a16fd4bdc35ff23937e423c5e1322a234652fd135f1a16abbece&token=2092782362&lang=zh_CN#rd)
- [golang 面试题：能说说 uintptr 和 unsafe.Pointer 的区别吗？](https://mp.weixin.qq.com/s?__biz=MzAwMDAxNjU4Mg==&mid=2247483679&idx=1&sn=7075859e59741b1d0a81dc472b8ce45f&chksm=9aee28b6ad99a1a0599416886660d9ea56bd7fec18841af0e5fe86c3daea3973732a83d7eabb&token=2092782362&lang=zh_CN#rd)

######

关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)
