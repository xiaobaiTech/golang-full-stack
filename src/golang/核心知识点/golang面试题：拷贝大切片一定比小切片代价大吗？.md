---
title: 拷贝大切片一定比小切片代价大吗？
date: 2020-05-13 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9jMmM2Y2YxZi0xN2RlLTRiZDEtYjY5Ny02NGQ1ZDlhY2M2MDUucG5n?x-oss-process=image/format,png)

<!-- more -->

# 问题

拷贝大切片一定比小切片代价大吗？

# 怎么答

并不是，所有切片的大小相同；**三个字段**（一个 uintptr，两个 int）。切片中的第一个字是指向切片底层数组的指针，这是切片的存储空间，第二个字段是切片的长度，第三个字段是容量。将一个 slice 变量分配给另一个变量只会复制三个机器字。所以 **拷贝大切片跟小切片的代价应该是一样的**。

# 解释

- `SliceHeader` 是`切片`在 go 的底层结构。

```go
type SliceHeader struct {
	Data uintptr
	Len  int
	Cap  int
}
```

- 大切片跟小切片的区别无非就是 `Len` 和 `Cap`的值比小切片的这两个值大一些，如果发生拷贝，本质上就是拷贝上面的三个字段。

##### 关注公众号:【小白 debug】



## 相关文章
- [golang进阶面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html)

- [golang基础面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html)

- [golang常用标准库第三方库大全](https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html)

- [golang学习路线](https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html)