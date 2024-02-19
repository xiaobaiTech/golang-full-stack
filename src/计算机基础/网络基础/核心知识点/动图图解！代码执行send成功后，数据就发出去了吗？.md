---
title: 动图图解！代码执行send成功后，数据就发出去了吗？
date: 2021-08-10 22:57:55
tags:
categories: "图解网络"
---

今天又是被倾盆的需求淹没的一天。

![](https://cdn.xiaobaidebug.top/image/8e7e47794e20a373.jpeg)

有没有人知道，那种“**我用 3 句话，就让产品为我砍了 18 个需求**”的鸡汤课在哪报名，想报。

<!-- more -->

"**听懂掌声**"的那种课就算了，太费手了。

![](https://cdn.xiaobaidebug.top/image/2b1dc921fecd27e1.gif)

扯远了，回到我们今天的正题，我们了解下这篇文的目录。

![目录](https://cdn.xiaobaidebug.top/image/send%E7%9B%AE%E5%BD%95.png)

代码执行 send 成功后，数据就发出去了吗？

回答这个问题之前，需要了解什么是**Socket 缓冲区**。

<br>

# Socket 缓冲区

## 什么是 socket 缓冲区

编程的时候，如果要跟某个 IP 建立连接，我们需要调用操作系统提供的 `socket API`。

**socket** 在操作系统层面，可以理解为一个**文件**。

我们可以对这个文件进行一些**方法操作**。

用`listen`方法，可以让程序作为服务器**监听**其他客户端的连接。

用`connect`，可以作为客户端**连接**服务器。

用`send`或`write`可以**发送**数据，`recv`或`read`可以**接收**数据。

在建立好连接之后，这个 **socket** 文件就像是远端机器的 **"代理人"** 一样。比如，如果我们想给远端服务发点什么东西，那就只需要对这个文件执行写操作就行了。

![socket_api](https://cdn.xiaobaidebug.top/image/socket_api.png)

那写到了这个文件之后，剩下的发送工作自然就是由操作系统**内核**来完成了。

既然是写给操作系统，那操作系统就需要**提供一个地方给用户写**。同理，接收消息也是一样。

这个地方就是 **socket 缓冲区**。

用户**发送**消息的时候写给 send buffer（发送缓冲区）。

用户**接收**消息的时候，是从 recv buffer（接收缓冲区）中读取数据。

也就是说**一个 socket ，会带有两个缓冲区**，一个用于发送，一个用于接收。因为这是个先进先出的结构，有时候也叫它们**发送、接收队列**。

![一个socket有两个缓冲区](https://cdn.xiaobaidebug.top/image/%E4%B8%80%E4%B8%AAsocket%E6%9C%89%E4%B8%A4%E4%B8%AA%E7%BC%93%E5%86%B2%E5%8C%BA.png)

<br>

### 怎么观察 socket 缓冲区

如果想要查看 socket 缓冲区，可以在 linux 环境下执行 `netstat -nt` 命令。

```bash
# netstat -nt
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0     60 172.22.66.69:22         122.14.220.252:59889    ESTABLISHED
```

这上面表明了，这里有一个协议（Proto）类型为 TCP 的连接，同时还有本地（Local Address）和远端（Foreign Address）的 IP 信息，状态（State）是已连接。

还有**Send-Q 是发送缓冲区**，下面的数字 60 是指，当前还有 60 Byte 在发送缓冲区中未发送。而 **Recv-Q 代表接收缓冲区**， 此时是空的，数据都被应用进程接收干净了。

<br>

# TCP 部分

我们在使用 TCP 建立连接之后，一般会使用 send 发送数据。

```c
int main(int argc, char *argv[])
{
    // 创建socket
    sockfd=socket(AF_INET,SOCK_STREAM, 0))

    // 建立连接
    connect(sockfd, 服务器ip信息, sizeof(server))

    // 执行 send 发送消息
    send(sockfd,str,sizeof(str),0))

    // 关闭 socket
    close(sockfd);

    return 0;
}
```

上面是一段伪代码，仅用于展示大概逻辑，我们在建立好连接后，一般会在代码中执行 `send` 方法。那么此时，消息就会被立刻发到对端机器吗？

<br>

## 执行 send 发送的字节，会立马发送吗？

答案是不确定！执行 send 之后，数据只是拷贝到了 socket 缓冲区。至于什么时候会发数据，发多少数据，**全听操作系统安排**。

![tcp_sendmsg逻辑](https://cdn.xiaobaidebug.top/image/tcp_sendmsg%E9%80%BB%E8%BE%913.png)

在用户进程中，程序通过操作 socket 会从用户态进入内核态，而 send 方法会将数据一路传到传输层。在识别到是 TCP 协议后，会调用 tcp_sendmsg 方法。

```c
// net/ipv4/tcp.c
// 以下省略了大量逻辑
int tcp_sendmsg()
{
  // 如果还有可以放数据的空间
  if (skb_availroom(skb) > 0) {
    // 尝试拷贝待发送数据到发送缓冲区
    err = skb_add_data_nocache(sk, skb, from, copy);
  }
  // 下面是尝试发送的逻辑代码,先省略
}
```

在 tcp_sendmsg 中， 核心工作就是将待发送的数据组织按照先后顺序放入到发送缓冲区中， 然后根据实际情况（比如拥塞窗口等）判断是否要发数据。如果不发送数据，那么此时直接返回。

<br>

## 如果缓冲区满了会怎么办

前面提到的情况里是，发送缓冲区有足够的空间，可以用于拷贝待发送数据。

### 如果发送缓冲区空间不足，或者满了，执行发送，会怎么样？

这里分两种情况。

首先，socket 在创建的时候，是可以设置是**阻塞**的还是**非阻塞**的。

```c
int s = socket(AF_INET, SOCK_STREAM | SOCK_NONBLOCK, IPPROTO_TCP);
```

比如通过上面的代码，就可以将 `socket` 设置为**非阻塞** （`SOCK_NONBLOCK`）。

当发送缓冲区**满了**，如果还向 socket 执行 send

- 如果此时 socket 是阻塞的，那么程序会在那**干等、死等**，直到释放出新的缓存空间，就继续把数据拷进去，然后**返回**。

![send阻塞](https://cdn.xiaobaidebug.top/image/send%E9%98%BB%E5%A1%9E.gif)

- 如果此时 socket 是非阻塞的，程序就会**立刻返回**一个 `EAGAIN` 错误信息，意思是 `Try again` , 现在缓冲区满了，你也别等了，待会再试一次。

![send非阻塞](https://cdn.xiaobaidebug.top/image/send%E9%9D%9E%E9%98%BB%E5%A1%9E.gif)

我们可以简单看下源码是怎么实现的。还是回到刚才的 `tcp_sendmsg` 发送方法中。

```c
int tcp_sendmsg()
{
  if (skb_availroom(skb) > 0) {
    // ..如果有足够缓冲区就执行balabla
  } else {
    // 如果发送缓冲区没空间了，那就等到有空间，至于等的方式，分阻塞和非阻塞
    if ((err = sk_stream_wait_memory(sk, &timeo)) != 0)
        goto do_error;
  }
}
```

里面提到的 `sk_stream_wait_memory` 会根据`socket`是否阻塞，来决定是**一直等**，还是**等一会就返回**。

```c
int sk_stream_wait_memory(struct sock *sk, long *timeo_p)
{
	while (1) {
    // 非阻塞模式时，会等到超时返回 EAGAIN
		if (等待超时))
			return -EAGAIN;
     // 阻塞等待时，会等到发送缓冲区有足够的空间了，才跳出
		if (sk_stream_memory_free(sk) && !vm_wait)
			break;
	}
	return err;
}
```

<br>

### 如果接收缓冲区为空，执行 recv 会怎么样？

接收缓冲区也是类似的情况。

当接收缓冲区**为空**，如果还向 socket 执行 recv

- 如果此时 socket 是阻塞的，那么程序会在那**干等**，直到接收缓冲区有数据，就会把数据从接收缓冲区拷贝到用户缓冲区，然后**返回**。

![recv阻塞](https://cdn.xiaobaidebug.top/image/recv%E9%98%BB%E5%A1%9E.gif)

- 如果此时 socket 是非阻塞的，程序就会**立刻返回**一个 `EAGAIN` 错误信息。

![recv非阻塞](https://cdn.xiaobaidebug.top/image/recv%E9%9D%9E%E9%98%BB%E5%A1%9E2.gif)

下面用一张图汇总一下，方便大家保存面试的时候用哈哈哈。

![socket读写缓冲区满了的情况汇总](https://cdn.xiaobaidebug.top/image/socket.png)

<br>

## 如果 socket 缓冲区还有数据，执行 close 了，会怎么样？

首先我们要知道，**一般正常情况下，发送缓冲区和接收缓冲区 都应该是空的。**

如果发送、接收缓冲区长时间非空，说明有数据堆积，这往往是由于一些网络问题或用户应用层问题，导致数据没有正常处理。

正常情况下，如果 `socket` 缓冲区**为空**，执行 `close`。就会触发四次挥手。

![TCP四次挥手](https://cdn.xiaobaidebug.top/image/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B4.png)

这个也是面试老八股文内容了，**这里我们只需要关注第一次挥手，发的是 `FIN` 就够了**。

<br>

### 如果接收缓冲区有数据时，执行 close 了，会怎么样？

`socket close` 时，主要的逻辑在 `tcp_close()` 里实现。

先说结论，关闭过程主要有两种情况：

- 如果接收缓冲区**还有数据未读**，会先把接收缓冲区的数据清空，然后给对端发一个 RST。
- 如果接收缓冲区是**空的**，那么就调用 `tcp_send_fin()` 开始进行四次挥手过程的第一次挥手。

```c
void tcp_close(struct sock *sk, long timeout)
{
  // 如果接收缓冲区有数据，那么清空数据
	while ((skb = __skb_dequeue(&sk->sk_receive_queue)) != NULL) {
		u32 len = TCP_SKB_CB(skb)->end_seq - TCP_SKB_CB(skb)->seq -
			  tcp_hdr(skb)->fin;
		data_was_unread += len;
		__kfree_skb(skb);
	}

   if (data_was_unread) {
    // 如果接收缓冲区的数据被清空了，发 RST
		tcp_send_active_reset(sk, sk->sk_allocation);
	 } else if (tcp_close_state(sk)) {
    // 正常四次挥手， 发 FIN
		tcp_send_fin(sk);
	}
	// 等待关闭
	sk_stream_wait_close(sk, timeout);
}
```

![recvbuf非空](https://cdn.xiaobaidebug.top/image/recvbuf%E9%9D%9E%E7%A9%BA.gif)

<br>

### 如果发送缓冲区有数据时，执行 close 了，会怎么样？

以前以为，这种情况下，内核会把发送缓冲区数据清空，然后四次挥手。

但是发现源码**并不是这样的**。

```c
void tcp_send_fin(struct sock *sk)
{
  // 获得发送缓冲区的最后一块数据
	struct sk_buff *skb, *tskb = tcp_write_queue_tail(sk);
	struct tcp_sock *tp = tcp_sk(sk);

  // 如果发送缓冲区还有数据
	if (tskb && (tcp_send_head(sk) || sk_under_memory_pressure(sk))) {
		TCP_SKB_CB(tskb)->tcp_flags |= TCPHDR_FIN; // 把最后一块数据值为 FIN
		TCP_SKB_CB(tskb)->end_seq++;
		tp->write_seq++;
	}  else {
    // 发送缓冲区没有数据，就造一个FIN包
  }
  // 发送数据
	__tcp_push_pending_frames(sk, tcp_current_mss(sk), TCP_NAGLE_OFF);
}
```

此时，还有些数据没发出去，内核会把发送缓冲区最后一个数据块拿出来。然后置为 FIN。

`socket` 缓冲区是个**先进先出**的队列，这种情况是指，内核会等待 TCP 层安静地把发送缓冲区数据都**发完**，最后再执行 四次挥手的第一次挥手（FIN 包）。

有一点需要注意的是，只有在**接收缓冲区为空的前提下**，我们才有可能走到 `tcp_send_fin()` 。而只有在进入了这个方法之后，我们才有可能考虑**发送缓冲区是否为空**的场景。

![sendbuf非空](https://cdn.xiaobaidebug.top/image/sendbuf%E9%9D%9E%E7%A9%BA.gif)

<br>

# UDP 部分

## UDP 也有缓冲区吗

说完 TCP 了，我们聊聊 UDP。这对好基友，同时都是传输层里的重要协议。既然前面提到 TCP 有发送、接收缓冲区，那 UDP 有吗？

以前我以为。

> "每个 UDP socket 都有一个接收缓冲区，没有发送缓冲区，从概念上来说就是只要有数据就发，不管对方是否可以正确接收，正因为不需要缓冲数据，所以也不需要发送缓冲区。"

后来我发现我错了。

UDP socket 也是 socket，一个 socket 就是会有收和发两个缓冲区。**跟用什么协议关系不大**。

有没有是一回事，用不用又是另外一回事。

<br>

## UDP 不用发送缓冲区？

事实上，UDP 不仅`有`发送缓冲区，也`用`发送缓冲区。

一般正常情况下，会把数据直接拷到发送缓冲区后直接发送。

还有一种情况，是在发送数据的时候，设置一个 `MSG_MORE` 的标记。

```c
ssize_t send(int sock, const void *buf, size_t len, int flags); // flag 置为 MSG_MORE
```

大概的意思是告诉内核，待会还有其他**更多消息**要一起发，先别着急发出去。此时内核就会把这份数据先用**发送缓冲区**缓存起来，待会应用层说 ok 了，再一起发。

我们可以看下源码。

```c
int udp_sendmsg()
{
	// corkreq 为 true 表示是 MSG_MORE 的方式，仅仅组织报文，不发送；
	int corkreq = up->corkflag || msg->msg_flags&MSG_MORE；

	//  将要发送的数据，按照MTU大小分割，每个片段一个skb；并且这些
	//  skb会放入到套接字的发送缓冲区中；该函数只是组织数据包，并不执行发送动作。
	err = ip_append_data(sk, fl4, getfrag, msg->msg_iov, ulen,
			     sizeof(struct udphdr), &ipc, &rt,
			     corkreq ? msg->msg_flags|MSG_MORE : msg->msg_flags);

	// 没有启用 MSG_MORE 特性，那么直接将发送队列中的数据发送给IP。
    if (!corkreq)
		err = udp_push_pending_frames(sk);

}
```

因此，不管是不是 `MSG_MORE`， IP 都会先把数据放到发送队列中，然后根据实际情况再考虑是不是立刻发送。

而我们大部分情况下，都不会用 `MSG_MORE`，也就是来一个数据包就直接发一个数据包。从这个行为上来说，**虽然 UDP 用上了发送缓冲区，但实际上并没有起到"缓冲"的作用。**

<br>

# 最后

这篇文章，我也就写了 20 个小时吧。画图也就画吐了**而已**，每天早上 7 点钟爬起来写一个多小时再去上班。

兄弟们都是自家人，点不**点赞**，在不**在看**什么的，没关系的，大家看开心了就好。

**在看，点赞**什么的，我不是特别在意，真的，真的，别不信啊。

不三连也真的没关系的。

兄弟们不要在意啊。

我是心口不一的小白，我们下期见！

<br>

##### 别说了，一起在知识的海洋里呛水吧

**点击**下方名片，关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)

<br>

## 文章推荐：

- [程序员防猝死指南](https://mp.weixin.qq.com/s/PwIbKDTi0uSxhUWC56sJYg)
- [TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解](https://mp.weixin.qq.com/s/0H8WL6QeZ2VbO1hHPkn8Ug)
- [动图图解！GMP 模型里为什么要有 P？背后的原因让人暖心](https://mp.weixin.qq.com/s/O_GPwa71zqcpIkNdlkWYnQ)
- [i/o timeout，希望你不要踩到这个 net/http 包的坑](https://mp.weixin.qq.com/s/UBiZp2Bfs7z1_mJ-JnOT1Q)
- [妙啊! 程序猿的第一本互联网黑话指南](https://mp.weixin.qq.com/s/btksE3RUxtioSYrYpChEeQ)

- [我感觉，我可能要拿图灵奖了。。。](https://mp.weixin.qq.com/s/rLLfj883lJbWr21wHAJTJA)
- [给大家丢脸了，用了三年 golang，我还是没答对这道内存泄漏题](https://mp.weixin.qq.com/s/T6XXaFFyyOJioD6dqDJpFg)
- [硬核！漫画图解 HTTP 知识点+面试题](https://mp.weixin.qq.com/s/T41YBEmG4lkxokDLzRxVgA)

- [硬核图解！30 张图带你搞懂！路由器，集线器，交换机，网桥，光猫有啥区别？](https://mp.weixin.qq.com/s/BJqp72EyEMahxi2XOfSrBQ)
