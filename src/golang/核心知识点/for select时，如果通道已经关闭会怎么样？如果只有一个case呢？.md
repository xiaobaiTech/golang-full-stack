---
title: golang面试官：for select时，如果通道已经关闭会怎么样？如果select中只有一个case呢？
date: 2020-08-11 22:57:55
tags:
categories: "golang面试题"
---

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8yNDFlZTVhYy1kMGY1LTQzZDEtYTU5ZC0yMzExODgzNzMzNDkucG5n?x-oss-process=image/format,png)

<!-- more -->

# 问题

`for`循环`select`时，如果通道已经关闭会怎么样？如果`select`中的`case`只有一个，又会怎么样？

# 怎么答

- for 循环`select`时，如果其中一个 case 通道已经关闭，则每次都会执行到这个 case。
- 如果 select 里边只有一个 case，而这个 case 被关闭了，则会出现死循环。

# 解释

## 1.for 循环里被关闭的通道

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9jNmU5MzM4MS03YTk3LTRmMDgtODljOS1lODkwNDg1YmE2YmUucG5n?x-oss-process=image/format,png)

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS84OWMxMWU0OS0zYThiLTQxYTAtYmE3MC1mZmQwZWRkOTExMTcucG5n?x-oss-process=image/format,png)

- `c通道`是一个缓冲为`0`的通道，在`main`开始时，启动一个协程对`c通道`写入`10`，然后就关闭掉这个通道。
- 在`main`中通过 `x, ok := <-c` 接受`通道c`里的值，从输出结果里看出，确实从通道里读出了之前塞入通道的`10`，但是在通道关闭后，这个通道一直能读出内容。

## 2.怎么样才能不读关闭后通道

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9lNDlmNDE4Mi03MGQyLTQxYjAtODRjYy05M2VkMzMxYjc3YjUucG5n?x-oss-process=image/format,png)

- `x, ok := <-c` 返回的值里第一个 x 是通道内的值，`ok`是指通道是否关闭，当通道被关闭后，`ok`则返回`false`，因此可以根据这个进行操作。读一个已经关闭的通道为什么会出现 false，可以看我之前的 [对已经关闭的的 chan 进行读写，会怎么样？为什么？](https://mp.weixin.qq.com/s/qm-8pvHBVRmLQQ4_DHc1Tw) 。
- 当返回的`ok`为`false`时，执行`c = nil` 将通道置为`nil`，相当于读一个未初始化的通道，则会一直阻塞。至于为什么读一个未初始化的通道会出现阻塞，可以看我的另一篇 [对未初始化的的 chan 进行读写，会怎么样？为什么？](https://mp.weixin.qq.com/s/ixJu0wrGXsCcGzveCqnr6A) 。`select`中如果任意某个通道有值可读时，它就会被执行，其他被忽略。则`select`会跳过这个阻塞`case`，可以解决不断读已关闭通道的问题。

## 3.如果 select 里只有一个已经关闭的 case，会怎么样？

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS82ZGMxZDQ1Zi04MDk1LTQ1ODAtODUxNi04MWZmNDdkNTI4MGEucG5n?x-oss-process=image/format,png)

- 可以看出只有一个`case`的情况下，则会`死循环`。
- 那如果像上面一个`case`那样，把通道置为`nil`就能解决问题了吗？

## 4.select 里只有一个已经关闭的 case，置为 nil，会怎么样？

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9hZTAyNWU4NS0yNzZjLTQyMDItYWU2Ny0yMGQ4Njk1Y2I3MTQucG5n?x-oss-process=image/format,png)

- 第一次读取`case`能读到通道里的`10`
- 第二次读取`case`能读到通道已经关闭的信息。此时将通道置为`nil`
- 第三次读取`case`时 main 协程会被阻塞，此时整个进程没有其他活动的协程了，进程`deadlock`

# 总结

- `select`中如果任意某个通道有值可读时，它就会被执行，其他被忽略。
- 如果没有`default`字句，`select`将有可能阻塞，直到某个通道有值可以运行，所以`select`里最好有一个`default`，否则将有一直阻塞的风险。

# 文章推荐：

- [golang 面试题：对已经关闭的的 chan 进行读写，会怎么样？为什么？](https://mp.weixin.qq.com/s/qm-8pvHBVRmLQQ4_DHc1Tw)
- [golang 面试题：对未初始化的的 chan 进行读写，会怎么样？为什么？](https://mp.weixin.qq.com/s/ixJu0wrGXsCcGzveCqnr6A)
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
