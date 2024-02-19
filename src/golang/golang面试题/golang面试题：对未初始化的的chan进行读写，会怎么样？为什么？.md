---
title: golang面试题：对未初始化的的chan进行读写，会怎么样？为什么？
date: 2020-06-11 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8zNjlhMWU4Zi1lNWExLTQ1N2YtYmJmNy1iMjA1Yjc5NjlhYTAucG5n?x-oss-process=image/format,png)

<!-- more -->

# 问题

对**未初始化**的的`chan`进行读写，会怎么样？**为什么？**

# 怎么答

读写**未初始化**的`chan`都会**阻塞**。

# 举例

#### 1.写未初始化的 chan

```go
package main
// 写未初始化的chan
func main() {
	var c chan int
	c <- 1
}
```

```go
// 输出结果
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan send (nil chan)]:
main.main()
        /Users/admin18/go/src/repos/main.go:6 +0x36
```

注意这个`chan send (nil chan)`，待会会提到。

#### 2.写读未初始化的 chan

```go
package main
import "fmt"
// 读未初始化的chan
func main() {
	var c chan int
	num, ok := <-c
	fmt.Printf("读chan的协程结束, num=%v, ok=%v\n", num, ok)
}
```

```go
// 输出结果
fatal error: all goroutines are asleep - deadlock!

goroutine 1 [chan receive (nil chan)]:
main.main()
        /Users/admin18/go/src/repos/main.go:6 +0x46
```

注意这个`chan receive (nil chan)`，待会也会提到。

# 多问一句

关于`chan`的面试题非常多，这个是比较常见的其中一个。但多问一句：**为什么对未初始化的`chan`就会阻塞呢？**

**1.对于写的情况**

```go
//在 src/runtime/chan.go中
func chansend(c *hchan, ep unsafe.Pointer, block bool, callerpc uintptr) bool {
	if c == nil {
      // 不能阻塞，直接返回 false，表示未发送成功
      if !block {
        return false
      }
      gopark(nil, nil, waitReasonChanSendNilChan, traceEvGoStop, 2)
      throw("unreachable")
	}
  // 省略其他逻辑
}
```

- 未初始化的`chan`此时是等于`nil`，当它不能阻塞的情况下，直接返回 `false`，表示写 `chan` 失败
- 当`chan`能阻塞的情况下，则直接阻塞 `gopark(nil, nil, waitReasonChanSendNilChan, traceEvGoStop, 2) `, 然后调用`throw(s string)`抛出错误,其中`waitReasonChanSendNilChan`就是刚刚提到的报错`"chan send (nil chan)"`

**2. 对于读的情况**

```go
//在 src/runtime/chan.go中
func chanrecv(c *hchan, ep unsafe.Pointer, block bool) (selected, received bool) {
    //省略逻辑...
    if c == nil {
        if !block {
          return
        }
        gopark(nil, nil, waitReasonChanReceiveNilChan, traceEvGoStop, 2)
        throw("unreachable")
    }
    //省略逻辑...
}
```

- 未初始化的`chan`此时是等于`nil`，当它不能阻塞的情况下，直接返回 `false`，表示读 `chan` 失败
- 当`chan`能阻塞的情况下，则直接阻塞 `gopark(nil, nil, waitReasonChanReceiveNilChan, traceEvGoStop, 2) `, 然后调用`throw(s string)`抛出错误,其中`waitReasonChanReceiveNilChan`就是刚刚提到的报错`"chan receive (nil chan)"`
