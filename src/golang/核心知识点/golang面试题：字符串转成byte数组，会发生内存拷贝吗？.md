---
title: golang面试题：字符串转成byte数组，会发生内存拷贝吗？
date: 2020-05-17 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS83OGRhNTQ2My01M2ViLTRjNTctYTA4Yy0wOWJhNGYyOGZmOTYucG5n?x-oss-process=image/format,png)

<!-- more -->

# 问题

字符串转成 byte 数组，会发生内存拷贝吗？

# 怎么答

字符串转成切片，会产生拷贝。严格来说，只要是发生类型强转都会发生内存拷贝。那么问题来了。  
频繁的内存拷贝操作听起来对性能不大友好。**有没有什么办法可以在字符串转成切片的时候不用发生拷贝呢？**

# 代码实现

```go
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

func main() {
	a :="aaa"
	ssh := *(*reflect.StringHeader)(unsafe.Pointer(&a))
	b := *(*[]byte)(unsafe.Pointer(&ssh))
	fmt.Printf("%v",b)
}

```

# 解释

- `StringHeader` 是`字符串`在 go 的底层结构。

```go
type StringHeader struct {
	Data uintptr
	Len  int
}
```

- `SliceHeader` 是`切片`在 go 的底层结构。

```go
type SliceHeader struct {
	Data uintptr
	Len  int
	Cap  int
}
```

- 那么如果想要在底层转换二者，只需要把 `StringHeader` 的地址强转成 `SliceHeader` 就行。那么 go 有个很强的包叫 `unsafe` 。

  - 1.`unsafe.Pointer(&a)`方法可以得到变量`a`的地址。
  - 2.`(*reflect.StringHeader)(unsafe.Pointer(&a))` 可以把字符串 a 转成底层结构的形式。

  - 3.`(*[]byte)(unsafe.Pointer(&ssh)) ` 可以把 ssh 底层结构体转成 byte 的切片的指针。
  - 4.再通过 `*`转为指针指向的实际内容。

######

关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)
