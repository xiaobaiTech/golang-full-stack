---
title: 昨天那个在for循环里append元素的同事，今天还在么？
date: 2020-09-12 22:57:55
tags:
categories: "golang面试题"
---

![](https://i.loli.net/2020/09/23/cPoMQsnbLIExiBZ.png)

<!-- more -->

# 问题

```go
package main

import "fmt"

func main() {
	s := []int{1,2,3,4,5}
	for _, v:=range s {
		s =append(s, v)
		fmt.Printf("len(s)=%v\n",len(s))
	}
}
```

**这个代码会造成死循环吗？**

# 怎么答

- **不会死循环**，`for range`其实是`golang`的`语法糖`，在循环开始前会获取切片的长度 `len(切片)`，然后再执行`len(切片)`次数的循环。

# 解释

- `for range`的源码是

```go
// The loop we generate:
//   for_temp := range
//   len_temp := len(for_temp)
//   for index_temp = 0; index_temp < len_temp; index_temp++ {
//           value_temp = for_temp[index_temp]
//           index = index_temp
//           value = value_temp
//           original body
//   }
```

- 上面的代码会被编译器认为是

```go
func main() {
	s := []int{1,2,3,4,5}
	for_temp := s
	len_temp := len(for_temp)
	for index_temp := 0; index_temp < len_temp; index_temp++ {
		value_temp := for_temp[index_temp]
		_ = index_temp
		value := value_temp
		// 以下是 original body
		s =append(s, value)
		fmt.Printf("len(s)=%v\n",len(s))
	}
}
```

- 代码运行输出

```go
len(s)=6
len(s)=7
len(s)=8
len(s)=9
len(s)=10
```

**所以说，那个同事用的是 golang 吗？**

# 文章推荐：

- [golang 面试官：for select 时，如果通道已经关闭会怎么样？如果只有一个 case 呢？](https://mp.weixin.qq.com/s/lK6I353Iw08robqpmPB6-g)
- [golang 面试题：对已经关闭的的 chan 进行读写，会怎么样？为什么？](https://mp.weixin.qq.com/s/qm-8pvHBVRmLQQ4_DHc1Tw)
- [golang 面试题：对未初始化的的 chan 进行读写，会怎么样？为什么？](https://mp.weixin.qq.com/s/ixJu0wrGXsCcGzveCqnr6A)
- [golang 面试题：reflect（反射包）如何获取字段 tag？为什么 json 包不能导出私有变量的 tag？](https://mp.weixin.qq.com/s/WK9StkC3Jfy-o1dUqlo7Dg)
- [golang 面试题：json 包变量不加 tag 会怎么样？](https://mp.weixin.qq.com/s/zZM_iLuopyenI0LD6VYZGw)
- [golang 面试题：怎么避免内存逃逸？](https://mp.weixin.qq.com/s/4QAxGEr9KxtZXyfSG8VoCQ)
- [golang 面试题：简单聊聊内存逃逸？](https://mp.weixin.qq.com/s/4YYR1eYFIFsNOaTxL4Q-eQ)
- [golang 面试题：字符串转成 byte 数组，会发生内存拷贝吗？](https://mp.weixin.qq.com/s/d80m0hgoKcHfKp4ZXH1M4A)
- [golang 面试题：翻转含有`中文、数字、英文字母`的字符串](https://mp.weixin.qq.com/s/OIRPOszH-rTJp03AeRgnRQ)
- [golang 面试题：拷贝大切片一定比小切片代价大吗？](https://mp.weixin.qq.com/s/hPYdiHYRufimyKT4FcW4HA)
- [golang 面试题：能说说 uintptr 和 unsafe.Pointer 的区别吗？](https://mp.weixin.qq.com/s/IkOwh9bh36vK6JgN7b3KjA)

##### 如果你想每天学习一个知识点？

![](https://s1.ax1x.com/2020/09/22/wqH8c8.jpg)
