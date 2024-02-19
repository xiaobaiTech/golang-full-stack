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

![](https://cdn.xiaobaidebug.top/1696069689495.png)
