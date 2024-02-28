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

## 相关文章
- [golang进阶面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html)

- [golang基础面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html)

- [golang常用标准库第三方库大全](https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html)

- [golang学习路线](https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html)

##### 如果你想每天学习一个知识点？

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS85ODZiZWU0YS03NzQ1LTQ0YjMtYTFhOS0wMzc5ODIzOGNkNmQucG5n?x-oss-process=image/format,png)


