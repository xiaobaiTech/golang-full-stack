---
title: golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？
date: 2020-06-11 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC8xNDVkOWZiZjQ0NzM0M2Q5YmIxODM4YjNmMzk4MjRhNi5wbmc?x-oss-process=image/format,png)

<!-- more -->

# 问题

对**已经关闭**的的`chan`进行读写，会怎么样？**为什么？**

# 怎么答

- 读**已经关闭**的`chan`能一直读到东西，但是读到的内容根据通道内`关闭前`是否有元素而不同。
  - 如果`chan`关闭前，`buffer`内有元素**还未读**,会正确读到`chan`内的值，且返回的第二个 bool 值（是否读成功）为`true`。
  - 如果`chan`关闭前，`buffer`内有元素**已经被读完**，`chan`内无值，接下来所有接收的值都会非阻塞直接成功，返回 `channel` 元素的**零值**，但是第二个`bool`值一直为`false`。
- 写**已经关闭**的`chan`会`panic`

# 举例

#### 1.写已经关闭的 chan

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC9lYjlhZGRhNDU3NGU0ZTAyYjJlODczN2JkODI5NWE0NC5wbmc?x-oss-process=image/format,png)

- 注意这个`send on closed channel`，待会会提到。

#### 2.读已经关闭的 chan

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC8wZTcyNTVkNzI5NDI0Y2NhYTBhNGNjNmQ5ZGU1MTBkMi5wbmc?x-oss-process=image/format,png)

# 多问一句

**1.为什么写已经关闭的`chan`就会`panic`呢？**
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC81Njc2MDBmYmEyNDE0MjcwYWQ3YWU0YTFjY2RhODQwMy5wbmc?x-oss-process=image/format,png)

- 当`c.closed != 0`则为通道关闭，此时执行写，源码提示直接 panic，输出的内容就是上面提到的`"send on closed channel"`。

**2. 为什么读已关闭的`chan`会一直能读到值？**
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC80YmNjMGYwNjI3MzE0Y2JiYWRkMWI0ODRjNTE4OTRkOS5wbmc?x-oss-process=image/format,png)

- `c.closed != 0 && c.qcount == 0`指通道已经关闭，且缓存为空的情况下（已经读完了之前写到通道里的值）
- 如果接收值的地址`ep`不为空
  - 那接收值将获得是一个**该类型的零值**
  - `typedmemclr` 会**根据类型清理**相应地址的内存
  - 这就解释了上面代码为什么关闭的`chan`会返回对应类型的零值

### 文章推荐：

- [对未初始化的的 chan 进行读写，会怎么样？为什么？](https://mp.weixin.qq.com/s/ixJu0wrGXsCcGzveCqnr6A)
- [golang 面试题：​reflect（反射包）如何获取字段 tag​？为什么 json 包不能导出私有变量的 tag？](https://mp.weixin.qq.com/s/WK9StkC3Jfy-o1dUqlo7Dg)
- [golang 面试题：json 包变量不加 tag 会怎么样？](https://mp.weixin.qq.com/s/zZM_iLuopyenI0LD6VYZGw)
- [golang 面试题：怎么避免内存逃逸？](https://mp.weixin.qq.com/s/4QAxGEr9KxtZXyfSG8VoCQ)
- [golang 面试题：简单聊聊内存逃逸？](https://mp.weixin.qq.com/s/4YYR1eYFIFsNOaTxL4Q-eQ)
- [golang 面试题：字符串转成 byte 数组，会发生内存拷贝吗？](https://mp.weixin.qq.com/s/d80m0hgoKcHfKp4ZXH1M4A)
- [golang 面试题：翻转含有`中文、数字、英文字母`的字符串](https://mp.weixin.qq.com/s/OIRPOszH-rTJp03AeRgnRQ)
- [golang 面试题：拷贝大切片一定比小切片代价大吗？](https://mp.weixin.qq.com/s/hPYdiHYRufimyKT4FcW4HA)
- [golang 面试题：能说说 uintptr 和 unsafe.Pointer 的区别吗？](https://mp.weixin.qq.com/s/IkOwh9bh36vK6JgN7b3KjA)

##### 如果你想每天学习一个知识点？

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS85ODZiZWU0YS03NzQ1LTQ0YjMtYTFhOS0wMzc5ODIzOGNkNmQucG5n?x-oss-process=image/format,png)
