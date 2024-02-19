---
title: 动图图解！GMP模型里为什么要有P？背后的原因让人暖心
date: 2021-06-11 22:57:55
tags:
categories: "golang面试题"
---

> 文章持续更新，可以微信搜一搜「小白 debug」第一时间阅读，回复【面试】获免费面试题集。本文已经收录在 GitHub https://github.com/xiaobaiTech/golangFamily , 有大厂面试完整考点和成长路线，欢迎 Star。

## GM 模型是什么

![GM图](https://cdn.xiaobaidebug.top/image/GM%E5%9B%BE.png)

在 `Go 1.1`版本之前，其实用的就是`GM`模型。

<!-- more -->

- **G**，协程。通常在代码里用 `go` 关键字执行一个方法，那么就等于起了一个`G`。

- **M**，**内核**线程，操作系统内核其实看不见`G`和`P`，只知道自己在执行一个线程。`G`和`P`都是在**用户层**上的实现。

除了`G`和`M`以外，还有一个**全局协程队列**，这个全局队列里放的是多个处于**可运行状态**的`G`。`M`如果想要获取`G`，就需要访问一个**全局队列**。同时，内核线程`M`是可以同时存在多个的，因此访问时还需要考虑**并发**安全问题。因此这个全局队列有一把**全局的大锁**，每次访问都需要去获取这把大锁。

并发量小的时候还好，当并发量大了，这把大锁，就成为了**性能瓶颈**。

![GM模型](https://cdn.xiaobaidebug.top/image/GM%E6%A8%A1%E5%9E%8B.gif)

## GMP 模型是什么

![GMP图](https://cdn.xiaobaidebug.top/image/GMP图.png)

基于**没有什么是加一个中间层不能解决的**思路，`golang`在原有的`GM`模型的基础上加入了一个调度器`P`，可以简单理解为是在`G`和`M`中间加了个中间层。

于是就有了现在的`GMP`模型里。

- `P` 的加入，还带来了一个**本地协程队列**，跟前面提到的**全局队列**类似，也是用于存放`G`，想要获取等待运行的`G`，会**优先**从本地队列里拿，访问本地队列无需加锁。而全局协程队列依然是存在的，但是功能被弱化，不到**万不得已**是不会去全局队列里拿`G`的。

- `GM`模型里 M 想要运行`G`，直接去全局队列里拿就行了；`GMP`模型里，`M`想要运行`G`，就得先获取`P`，然后从 `P` 的本地队列获取 `G`。

![GMP模型](https://cdn.xiaobaidebug.top/image/GMP%E6%A8%A1%E5%9E%8B1.gif)

- 新建 `G` 时，新`G`会优先加入到 `P` 的本地队列；如果本地队列满了，则会把本地队列中一半的 `G` 移动到全局队列。

- `P` 的本地队列为空时，就从全局队列里去取。

![GMP模型-获取全局协程队列](https://cdn.xiaobaidebug.top/image/GMP%E6%A8%A1%E5%9E%8B-%E8%8E%B7%E5%8F%96%E5%85%A8%E5%B1%80%E5%8D%8F%E7%A8%8B%E9%98%9F%E5%88%97.gif)

- 如果全局队列为空时，`M` 会从其他 `P` 的本地队列**偷（stealing）一半 G**放到自己 `P` 的本地队列。

![GMP模型-stealing](https://cdn.xiaobaidebug.top/image/GMP%E6%A8%A1%E5%9E%8B-stealing2.gif)

- `M` 运行 `G`，`G` 执行之后，`M` 会从 `P` 获取下一个 `G`，不断重复下去。

![GMP模型-循环执行](https://cdn.xiaobaidebug.top/image/GMP%E6%A8%A1%E5%9E%8B4.gif)

## 为什么 P 的逻辑不直接加在 M 上

主要还是因为`M`其实是**内核**线程，内核只知道自己在跑线程，而`golang`的运行时（包括调度，垃圾回收等）其实都是**用户空间**里的逻辑。操作系统内核哪里还知道，也不需要知道用户空间的 golang 应用原来还有那么多花花肠子。这一切逻辑交给应用层自己去做就好，毕竟改内核线程的逻辑也不合适啊。

> 如果文章对你有帮助，看下文章底部右下角，做点正能量的事情（**点两下**）支持一下。（**疯狂暗示，拜托拜托，这对我真的很重要！**）

我是小白，我们下期见。

## 参考资料

[1]《Golang 调度器 GMP 原理与调度全分析》 ——Aceld :https://learnku.com/articles/41728

[2]《GMP 模型为什么要有 P》 ——煎鱼 :https://mp.weixin.qq.com/s/an7dml9NLOhqOZjEGLdEEw

[3]《深度解密 Go 语言之 Scheduler》 ——qcrao :https://qcrao.com/2019/09/02/dive-into-go-scheduler/#%E4%BB%80%E4%B9%88%E6%98%AF-scheduler

## 文章推荐：

- [i/o timeout，希望你不要踩到这个 net/http 包的坑](https://mp.weixin.qq.com/s/UBiZp2Bfs7z1_mJ-JnOT1Q)
- [妙啊! 程序猿的第一本互联网黑话指南](https://mp.weixin.qq.com/s/btksE3RUxtioSYrYpChEeQ)
- [程序员防猝死指南](https://mp.weixin.qq.com/s/PwIbKDTi0uSxhUWC56sJYg)
- [我感觉，我可能要拿图灵奖了。。。](https://mp.weixin.qq.com/s/rLLfj883lJbWr21wHAJTJA)
- [给大家丢脸了，用了三年 golang，我还是没答对这道内存泄漏题](https://mp.weixin.qq.com/s/T6XXaFFyyOJioD6dqDJpFg)
- [硬核！漫画图解 HTTP 知识点+面试题](https://mp.weixin.qq.com/s/T41YBEmG4lkxokDLzRxVgA)
- [TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解](https://mp.weixin.qq.com/s/PwIbKDTi0uSxhUWC56sJYg)
- [硬核图解！30 张图带你搞懂！路由器，集线器，交换机，网桥，光猫有啥区别？](https://mp.weixin.qq.com/s/BJqp72EyEMahxi2XOfSrBQ)

##### 别说了，关注公众号:【小白 debug】，一起在知识的海洋里呛水吧

关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)
