# golang 并发题目测试

题目来源： [Go并发编程小测验： 你能答对几道题？](https://colobu.com/2019/04/28/go-concurrency-quizzes/)

## 1 Mutex

```go
package main
import (
	"fmt"
	"sync"
)
var mu sync.Mutex
var chain string
func main() {
	chain = "main"
	A()
	fmt.Println(chain)
}
func A() {
	mu.Lock()
	defer mu.Unlock()
	chain = chain + " --> A"
	B()
}
func B() {
	chain = chain + " --> B"
	C()
}
func C() {
	mu.Lock()
	defer mu.Unlock()
	chain = chain + " --> C"
}
```

- A: 不能编译
- B: 输出 main --> A --> B --> C
- C: 输出 main
- D: panic

## 2 RWMutex

```go
package main
import (
	"fmt"
	"sync"
	"time"
)
var mu sync.RWMutex
var count int
func main() {
	go A()
	time.Sleep(2 * time.Second)
	mu.Lock()
	defer mu.Unlock()
	count++
	fmt.Println(count)
}
func A() {
	mu.RLock()
	defer mu.RUnlock()
	B()
}
func B() {
	time.Sleep(5 * time.Second)
	C()
}
func C() {
	mu.RLock()
	defer mu.RUnlock()
}
```

- A: 不能编译
- B: 输出 1
- C: 程序hang住
- D: panic

## 3 Waitgroup

```go
package main
import (
	"sync"
	"time"
)
func main() {
	var wg sync.WaitGroup
	wg.Add(1)
	go func() {
		time.Sleep(time.Millisecond)
		wg.Done()
		wg.Add(1)
	}()
	wg.Wait()
}
```

- A: 不能编译
- B: 无输出，正常退出
- C: 程序hang住
- D: panic

## 4 双检查实现单例

```go
package doublecheck
import (
	"sync"
)
type Once struct {
	m    sync.Mutex
	done uint32
}
func (o *Once) Do(f func()) {
	if o.done == 1 {
		return
	}
	o.m.Lock()
	defer o.m.Unlock()
	if o.done == 0 {
		o.done = 1
		f()
	}
}
```

- A: 不能编译
- B: 可以编译，正确实现了单例
- C: 可以编译，有并发问题，f函数可能会被执行多次
- D: 可以编译，但是程序运行会panic

## 5 Mutex

```go
package main
import (
	"fmt"
	"sync"
)
type MyMutex struct {
	count int
	sync.Mutex
}
func main() {
	var mu MyMutex
	mu.Lock()
	var mu2 = mu
	mu.count++
	mu.Unlock()
	mu2.Lock()
	mu2.count++
	mu2.Unlock()
	fmt.Println(mu.count, mu2.count)
}
```

- A: 不能编译
- B: 输出 1, 1
- C: 输出 1, 2
- D: panic

## 6 Pool

```go
package main
import (
	"bytes"
	"fmt"
	"runtime"
	"sync"
	"time"
)
var pool = sync.Pool{New: func() interface{} { return new(bytes.Buffer) }}
func main() {
	go func() {
		for {
			processRequest(1 << 28) // 256MiB
		}
	}()
	for i := 0; i < 1000; i++ {
		go func() {
			for {
				processRequest(1 << 10) // 1KiB
			}
		}()
	}
	var stats runtime.MemStats
	for i := 0; ; i++ {
		runtime.ReadMemStats(&stats)
		fmt.Printf("Cycle %d: %dB\n", i, stats.Alloc)
		time.Sleep(time.Second)
		runtime.GC()
	}
}
func processRequest(size int) {
	b := pool.Get().(*bytes.Buffer)
	time.Sleep(500 * time.Millisecond)
	b.Grow(size)
	pool.Put(b)
	time.Sleep(1 * time.Millisecond)
}
```

- A: 不能编译
- B: 可以编译，运行时正常，内存稳定
- C: 可以编译，运行时内存可能暴涨
- D: 可以编译，运行时内存先暴涨，但是过一会会回收掉

## 7 channel

```go
package main
import (
	"fmt"
	"runtime"
	"time"
)
func main() {
	var ch chan int
	go func() {
		ch = make(chan int, 1)
		ch <- 1
	}()
	go func(ch chan int) {
		time.Sleep(time.Second)
		<-ch
	}(ch)
	c := time.Tick(1 * time.Second)
	for range c {
		fmt.Printf("#goroutines: %d\n", runtime.NumGoroutine())
	}
}
```

- A: 不能编译
- B: 一段时间后总是输出 `#goroutines: 1`
- C: 一段时间后总是输出 `#goroutines: 2`
- D: panic

## 8 channel

```go
package main
import "fmt"
func main() {
	var ch chan int
	var count int
	go func() {
		ch <- 1
	}()
	go func() {
		count++
		close(ch)
	}()
	<-ch
	fmt.Println(count)
}
```

- A: 不能编译
- B: 输出 1
- C: 输出 0
- D: panic

## 9 Map

```go
package main
import (
	"fmt"
	"sync"
)
func main() {
	var m sync.Map
	m.LoadOrStore("a", 1)
	m.Delete("a")
	fmt.Println(m.Len())
}
```

- A: 不能编译
- B: 输出 1
- C: 输出 0
- D: panic

## 10 happens before

```go
package main
var c = make(chan int)
var a int
func f() {
	a = 1
	<-c
}
func main() {
	go f()
	c <- 0
	print(a)
}
```

- A: 不能编译
- B: 输出 1
- C: 输出 0
- D: panic





# 答案

## 1. D

会产生死锁`panic`，因为`Mutex` 是互斥锁。

## 2. D

会产生死锁`panic`，根据`sync/rwmutex.go` 中注释可以知道，读写锁当有一个协程在等待写锁时，其他协程是不能获得读锁的，而在`A`和`C`中同一个调用链中间需要让出读锁，让写锁优先获取，而`A`的读锁又要求`C`调用完成，因此死锁。


## 3. D

`WaitGroup` 在调用 `Wait` 之后是不能再调用 `Add` 方法的。

## 4. C

在多核CPU中，因为CPU缓存会导致多个核心中变量值不同步。

## 5. D

加锁后复制变量，会将锁的状态也复制，所以`mu1` 其实是已经加锁状态，再加锁会死锁。

## 6. C

个人理解，在单核CPU中，内存可能会稳定在`256MB`，如果是多核可能会暴涨。

## 7. C

因为 `ch` 未初始化，写和读都会阻塞，之后被第一个协程重新赋值，导致写的`ch` 都阻塞。

## 8. D

`ch` 未有被初始化，关闭时会报错。

## 9. A

`sync.Map` 没有 `Len` 方法。

## 10. B

`c <- 0` 会阻塞依赖于 `f()` 的执行。




## 相关文章
- [golang进阶面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html)

- [golang基础面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html)

- [golang常用标准库第三方库大全](https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html)

- [golang学习路线](https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html)



