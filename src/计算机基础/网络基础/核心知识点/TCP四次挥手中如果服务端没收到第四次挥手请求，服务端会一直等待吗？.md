---
title: TCP四次挥手中如果服务端没收到第四次挥手请求，服务端会一直等待吗？
date: 2022-08-13 22:57:55
tags:
categories: "图解网络"
---

> 文章持续更新，可以微信搜一搜「小白 debug」第一时间阅读，回复【面试】获面试题集。本文已经收录在 GitHub https://github.com/xiaobaiTech/golangFamily , 有大厂面试完整考点和成长路线，欢迎 Star。

搬运一个在某乎的回答，水一篇文章吧。

![](https://cdn.xiaobaidebug.top/image-20220813113924022.png)

![TCP四次挥手](https://cdn.xiaobaidebug.top/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B7.png)

正常情况下。只要数据传输完了，**不管是客户端还是[服务端](https://www.zhihu.com/search?q=服务端&search_source=Entity&hybrid_search_source=Entity&hybrid_search_extra={"sourceType"%3A"answer"%2C"sourceId"%3A2613763971})，都可以主动发起四次挥手**，释放连接。

就跟上图画的一样，假设，这次四次挥手是由客户端主动发起的，那它就是**主动方**。服务器是被动接收客户端的挥手请求的，叫**被动方**。

客户端和服务器，一开始，都是处于`ESTABLISHED`状态。

**第一次挥手**：一般情况下，主动方执行`close()`或 `shutdown()`方法，会发个`FIN报文`出来，表示"**我不再发送数据了**"。

**第二次挥手**：在收到主动方的`FIN`报文后，被动方立马回应一个`ACK`，意思是"我收到你的 FIN 了，也知道你不再发数据了"。

上面提到的是**主动方**不再发送数据了。但如果这时候，**被动方**还有数据要发，那就继续发。注意，虽然第二次和第三次挥手之间，被动方是能发数据到主动方的，但主动方能不能正常收就不一定了，这个待会说。

**第三次挥手**：在被动方在感知到第二次挥手之后，会做了一系列的收尾工作，最后也调用一个 `close()`, 这时候就会发出第三次挥手的 `FIN-ACK`。

**第四次挥手**：主动方回一个`ACK`，意思是收到了。

其中第一次挥手和第三次挥手，都是我们在应用程序中主动触发的（比如调用`close()`方法），也就是我们平时写代码需要关注的地方。

第二和第四次挥手，都是内核协议栈自动帮我们完成的，我们写代码的时候碰不到这地方，因此也不需要太关心。

另外不管是主动还是被动，每方发出了一个 `FIN` 和一个`ACK` 。也收到了一个 `FIN` 和一个`ACK` 。

回到题主的问题。

**TCP 四次挥手中如果服务端没收到第四次挥手请求，服务端会一直等待吗？**

第四次挥手是第三次挥手触发的。如果第四次挥手服务端一直没收到，那服务端会认为是不是自己的第三次挥手丢了，于是服务端不断重试发第三次挥手（FIN）.重发次数由系统的 tcp_orphan_retries 参数控制。重试多次还没成功，服务端直接断开链接。**所以结论是服务端不会一直等待第四次挥手。**

![TCP第四次挥手丢失](https://cdn.xiaobaidebug.top/TCP%E7%AC%AC%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B%E4%B8%A2%E5%A4%B1.drawio.png)

```shell
# cat /proc/sys/net/ipv4/tcp_orphan_retries
0
```

另外，你会发现`tcp_orphan_retries`参数是 0，但其实并不是不重试的意思。为 0 时，默认值为 8. 也就是重试 8 次。

```c
/* Calculate maximal number or retries on an orphaned socket. */
static int tcp_orphan_retries(struct sock *sk, int alive)
{
	int retries = sysctl_tcp_orphan_retries; /* May be zero. */

	/* We know from an ICMP that something is wrong. */
	if (sk->sk_err_soft && !alive)
		retries = 0;

	/* However, if socket sent something recently, select some safe
	 * number of retries. 8 corresponds to >100 seconds with minimal
	 * RTO of 200msec. */
	if (retries == 0 && alive)
		retries = 8;
	return retries;
}
```

当然如果服务端重试发第三次挥手 FIN 的过程中，还是同样的端口和 IP,起了个新的客户端，这时候服务端重试的 FIN 被收到后，客户端就会认为是不正常的数据包，直接发个 RST 给服务端，这时候两端连接也会断开。

<br>

## 参考资料

查资料的时候发现**小林大佬已经写过，而且写的巨好**，感兴趣的可以看下他的这篇文章。

**《 如何优化 TCP?》**https://xiaolincoding.com/network/3_tcp/tcp_optimize.html#%E4%B8%BB%E5%8A%A8%E6%96%B9%E7%9A%84%E4%BC%98%E5%8C%96

链接太长，懒得复制的话，点击**阅读原文**可以直接跳转。

<br>

## 最后

新的文章快写好了，就缺个开头了。

![](https://cdn.xiaobaidebug.top/image-20220813115736303.png)

**我有个不成熟的请求。**

![](https://cdn.xiaobaidebug.top/u=2281575747,3550568508&fm=253&fmt=auto&app=120&f=JPEG.jpeg)

<br>

**离开广东好长时间了，好久没人叫我靓仔了。**

大家可以在**评论区**里，叫我一靓仔吗？

我这么善良质朴的愿望，能被满足吗？

如果实在叫不出口的话，能帮我点下右下角的**点赞和在看**吗？

<br>

##### 别说了，一起在知识的海洋里呛水吧

**点击**下方名片，关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)

<br>

不满足于在留言区说骚话？

加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点有意思的话题。就**超！开！心！**

<img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" alt="" style="zoom:50%;" />

![](https://cdn.xiaobaidebug.top/006APoFYly1g5q9gn2jipg308w08wqdi-20220806162638482.gif)

## 文章推荐：

- [既然有 HTTP 协议，为什么还要有 RPC](https://www.xiaobaidebug.top/2022/07/19/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/%E6%97%A2%E7%84%B6%E6%9C%89HTTP%E5%8D%8F%E8%AE%AE%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%A6%81%E6%9C%89RPC%E5%8D%8F%E8%AE%AE%EF%BC%9F/)
- [TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解](https://www.xiaobaidebug.top/2021/03/26/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/TCP%E7%B2%98%E5%8C%85%EF%BC%81%E6%95%B0%E6%8D%AE%E5%8C%85%EF%BC%9A%E6%88%91%E5%8F%AA%E6%98%AF%E7%8A%AF%E4%BA%86%E6%AF%8F%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E9%83%BD%E4%BC%9A%E7%8A%AF%E7%9A%84%E9%94%99%EF%BC%8C%E7%A1%AC%E6%A0%B8%E5%9B%BE%E8%A7%A3/)
- [动图图解！既然 IP 层会分片，为什么 TCP 层也还要分段？](https://www.xiaobaidebug.top/2021/05/25/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/%E5%8A%A8%E5%9B%BE%E5%9B%BE%E8%A7%A3%EF%BC%81%E6%97%A2%E7%84%B6IP%E5%B1%82%E4%BC%9A%E5%88%86%E7%89%87%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88TCP%E5%B1%82%E4%B9%9F%E8%BF%98%E8%A6%81%E5%88%86%E6%AE%B5%EF%BC%9F/)
