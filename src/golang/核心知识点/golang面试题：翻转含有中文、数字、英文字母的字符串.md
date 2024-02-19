---
title: golang面试题：翻转含有中文、数字、英文字母的字符串
date: 2020-05-10 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8wNzdhMGZlOC1lZDU2LTQ5ODItYjRmNy1iNzZhMGYyYWIwNmYucG5n?x-oss-process=image/format,png)

<!-- more -->

# 问题

翻转含有`中文、数字、英文字母`的字符串  
`"你好abc啊哈哈"`

# 代码实现

```go
package main

import"fmt"

func main() {
	src := "你好abc啊哈哈"
	dst := reverse([]rune(src))
	fmt.Printf("%v\n", string(dst))
}

func reverse(s []rune) []rune {
	for i, j := 0, len(s)-1; i < j; i, j = i+1, j-1 {
		s[i], s[j] = s[j], s[i]
	}
	return s
}

```

# 解释

- `rune`关键字，从 golang 源码中看出，它是 int32 的别名（-2^31 ~ 2^31-1），比起 byte（-128 ～ 127），**可表示更多的字符**。
- 由于 rune 可表示的范围更大，所以能处理一切字符，当然也包括**中文字符**。在平时计算中文字符，可用 rune。
- 因此将`字符串`转为`rune的切片`，再进行翻转，完美解决。

##### 关注公众号:【小白 debug】

![](https://cdn.xiaobaidebug.top/1696069689495.png)
