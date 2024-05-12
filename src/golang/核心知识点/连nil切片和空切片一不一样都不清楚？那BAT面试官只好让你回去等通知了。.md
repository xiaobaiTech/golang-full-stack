---
title: 连nil切片和空切片一不一样都不清楚？那BAT面试官只好让你回去等通知了。
date: 2020-10-12 22:57:55
tags:
categories: "golang面试题"
---

![封面nil切片和空切片的区别](https://cdn.xiaobaidebug.top/1715521271870.webp)
<!-- more -->

# 问题

```go
package main

import (
	"fmt"
	"reflect"
	"unsafe"
)

func main() {

	var s1 []int   // nil切片
	s2 := make([]int,0)  // 空切片
	s4 := make([]int,0)   // 空切片

	fmt.Printf("s1 pointer:%+v, s2 pointer:%+v, s4 pointer:%+v, \n", *(*reflect.SliceHeader)(unsafe.Pointer(&s1)),*(*reflect.SliceHeader)(unsafe.Pointer(&s2)),*(*reflect.SliceHeader)(unsafe.Pointer(&s4)))
	fmt.Printf("%v\n", (*(*reflect.SliceHeader)(unsafe.Pointer(&s1))).Data==(*(*reflect.SliceHeader)(unsafe.Pointer(&s2))).Data)
	fmt.Printf("%v\n", (*(*reflect.SliceHeader)(unsafe.Pointer(&s2))).Data==(*(*reflect.SliceHeader)(unsafe.Pointer(&s4))).Data)
}
```

**nil 切片和空切片指向的地址一样吗？这个代码会输出什么？**

# 怎么答

- **nil 切片和空切片指向的地址不一样。nil 空切片引用数组指针地址为 0（无指向任何实际地址）**
- **空切片的引用数组指针地址是有的，且固定为一个值**

```
s1 pointer:{Data:0 Len:0 Cap:0}, s2 pointer:{Data:824634207952 Len:0 Cap:0}, s4 pointer:{Data:824634207952 Len:0 Cap:0},
false //nil切片和空切片指向的数组地址不一样
true  //两个空切片指向的数组地址是一样的，都是824634207952
```

# 解释

- 之前在[前面的文章](https://zhuanlan.zhihu.com/p/144923309)里提到过切片的数据结构为

```go
type SliceHeader struct {
 Data uintptr  //引用数组指针地址
 Len  int     // 切片的目前使用长度
 Cap  int     // 切片的容量
}
```

- nil 切片和空切片最大的区别在于**指向的数组引用地址是不一样的**。
![](https://cdn.xiaobaidebug.top/1715521303529.webp)


- **所有的空切片指向的数组引用地址都是一样的**
  ![](https://cdn.xiaobaidebug.top/1715521352139.webp)

# 文章推荐：
- [golang进阶面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html)

- [golang基础面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html)

- [golang常用标准库第三方库大全](https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html)

- [golang学习路线](https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html)

##### 如果你想每天学习一个知识点，关注我的【公】【众】【号】【小白 debug】。
