---
title: 连nil切片和空切片一不一样都不清楚？那BAT面试官只好让你回去等通知了。
date: 2020-10-12 22:57:55
tags:
categories: "golang面试题"
---

![img](https://cdn.xiaobaidebug.top/image/640-20210524195843699.png)

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
  ![img](https://cdn.xiaobaidebug.top/image/640.png)

- **所有的空切片指向的数组引用地址都是一样的**
  ![img](https://cdn.xiaobaidebug.top/image/640-20210524195829623.png)

# 文章推荐：

- [昨天那个在 for 循环里 append 元素的同事，今天还在么？](https://zhuanlan.zhihu.com/p/257802146)
- [对已经关闭的的 chan 进行读写，会怎么样？为什么？](https://zhuanlan.zhihu.com/p/150629411)
- [对未初始化的的 chan 进行读写，会怎么样？为什么？](https://zhuanlan.zhihu.com/p/149796956)
- [golang 面试题：reflect（反射包）如何获取字段 tag？为什么 json 包不能导出私有变量的 tag？](https://zhuanlan.zhihu.com/p/148341972)
- [golang 面试题：json 包变量不加 tag 会怎么样？](https://zhuanlan.zhihu.com/p/148175563)
- [golang 面试题：怎么避免内存逃逸？？](https://zhuanlan.zhihu.com/p/146590283)
- [golang 面试题：简单聊聊内存逃逸？](https://zhuanlan.zhihu.com/p/145468000)
- [golang 面试题：字符串转成 byte 数组，会发生内存拷贝吗？](https://zhuanlan.zhihu.com/p/144923309)
- [golang 面试题：翻转含有`中文、数字、英文字母`的字符串](https://zhuanlan.zhihu.com/p/143056105)
- [golang 面试题：拷贝大切片一定比小切片代价大吗？](https://zhuanlan.zhihu.com/p/144980413)
- [golang 面试题：能说说 uintptr 和 unsafe.Pointer 的区别吗？](https://zhuanlan.zhihu.com/p/145220416)

##### 如果你想每天学习一个知识点，关注我的【公】【众】【号】【小白 debug】。
