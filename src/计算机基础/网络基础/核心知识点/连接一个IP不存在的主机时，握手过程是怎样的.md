---
title: 连接一个 IP 不存在的主机时，握手过程是怎样的？
date: 2021-07-25 22:57:55
tags:
categories: "图解网络"
---

> 文章持续更新，可以微信搜一搜「小白 debug」第一时间阅读，回复【面试】获免费面试题集。本文已经收录在 GitHub https://github.com/xiaobaiTech/golangFamily , 有大厂面试完整考点和成长路线，欢迎 Star。

鸽了好长时间了，最近**很忙**。以前工作忙完，就抽空写文章。

现在忙完工作，还要一三五学驾照，二四六看家具。有同感的老铁们不要举手，拉到右下角**点个"在看"**就好了。

真的，全怪某音。

<!-- more -->

![](https://cdn.xiaobaidebug.top/image/12021625633784_.pic.jpg)

扯远了，回到今天的主题。

方兄最近写了篇很赞的文章 [写给想去字节写 Go 的你](https://mp.weixin.qq.com/s/SxaNLfGwM4dyzvBUvLAHvA) ，里面提到了两个问题。

连接一个 **IP 不存在**的主机时，握手过程是怎样的？

连接一个 **IP 地址存在但端口号不存在**的主机时，握手过程又是怎样的呢？

让我回想起曾经也被面试官也问过类似的问题，意识到应该很多朋友会对这个问题感兴趣。

所以来给大家唠唠。

这两个问题可以延伸出非常多的点。

看完了，说不定能加分！

![](https://cdn.xiaobaidebug.top/image/12011625633784_.pic.jpg)

<br>

# 正常情况的握手过程是怎么样的

上面提到的问题，其实是指**TCP 的三次握手流程**。这绝对是面试八股文里的老股了。

我们**简单回顾**下基础知识点。

![正常情况下的TCP三次握手](https://cdn.xiaobaidebug.top/image/%E6%AD%A3%E5%B8%B8%E6%83%85%E5%86%B5%E4%B8%8B%E7%9A%84TCP%E4%B8%89%E6%AC%A1%E6%8F%A1%E6%89%8B1.png)

在**服务端**启动好后会调用 `listen()` 方法，进入到 `LISTEN` 状态，然后静静等待**客户端**的连接请求到来。

而此时客户端主动调用 `connect(IP地址)` ，就会向某个 IP 地址发起**第一次握手**，发送`SYN` 到目的服务器。

服务器在收到第一次握手后就会响应客户端，这是**第二次握手**。

客户端在收到第二次握手的消息后，响应服务的一个`ACK`，这算**第三次**握手，此时客户端 就会进入 `ESTABLISHED`状态，认为连接已经建立完成。

通过抓包可以直观看出三次握手的流程。

![正常三次握手抓包](https://cdn.xiaobaidebug.top/image/image-20210626164202297.png)

<br>

# 连一个 IP 不存在的主机时，握手过程是怎样的

那不存在的 IP，分两种，**局域网内和局域网外**的。

![家用路由器局域网互联](https://cdn.xiaobaidebug.top/image/%E5%AE%B6%E7%94%A8%E8%B7%AF%E7%94%B1%E5%99%A8%E5%B1%80%E5%9F%9F%E7%BD%91%E4%BA%92%E8%81%94.png)

我以我家里的情况举例。

家里有一台**家用路由器**。本质上它的功能已经集成了我们常说的**路由器，交换机和无线接入点**的功能了。

其中**路由器和交换机**在之前写过的 《[硬核图解！30 张图带你搞懂！路由器，集线器，交换机，网桥，光猫有啥区别？](https://mp.weixin.qq.com/s/BJqp72EyEMahxi2XOfSrBQ)》里已经详细介绍过了，就不再说一遍了。**无线接入点**基本可以认为就是个放出 wifi 信号的组件。

家用路由器下，连着我的 N 台设备，包括手机和电脑，他们的 IP 都有个**共同点**。都是 `192.168.31.xx` 形式的。其中，我的电脑的 IP 是`192.168.31.6` ，这个可以通过 `ifconfig`查到。

符合这个形式的这些个设备，本质上就是通过各种设备（wifi 或交换机等）接入到**上图路由器的 e2 端口**，他们共同构成一个**局域网**。

因此，在我家，我们可以**粗暴点**认为只要是 `192.168.31.xx` 形式的 IP，就是**局域网内的 IP**。否则就是**局域网外的 IP**，比如 `192.0.2.2` 。

<br>

## 目的 IP 在局域网内

因为通过 ifconfig 可以查到我的局域网内 IP 是`192.168.31.6` ，这里**盲猜**末尾+1 是不存在的 IP 。试了下，`192.168.31.7` 还真不存在。

```shell
$ ping 192.168.31.7
PING 192.168.31.7 (192.168.31.7): 56 data bytes
Request timeout for icmp_seq 0
Request timeout for icmp_seq 1
Request timeout for icmp_seq 2
Request timeout for icmp_seq 3
^C
--- 192.168.31.7 ping statistics ---
5 packets transmitted, 0 packets received, 100.0% packet loss
```

于是写个程序尝试连这个 IP 。下面的代码是 `golang` 写的，**大家不看代码也没关系，放出来只是方便大家自己复现的时候用的。**

```go
// tcp客户端
package main

import (
	"fmt"
	"io"
	"net"
	"os"
)

func main() {
	client, err := net.Dial("tcp", "192.168.31.7:8081")
	if err != nil {
		fmt.Println("err:", err)
		return
	}

	defer client.Close()
	go func() {
		input := make([]byte, 1024)
		for {
			n, err := os.Stdin.Read(input)
			if err != nil {
				fmt.Println("input err:", err)
				continue
			}
			client.Write([]byte(input[:n]))
		}
	}()

	buf := make([]byte, 1024)
	for {
		n, err := client.Read(buf)
		if err != nil {
			if err == io.EOF {
				return
			}
			fmt.Println("read err:", err)
			continue
		}
		fmt.Println(string(buf[:n]))
	}
}

```

然后尝试抓包。

![连一个不存在的IP(局域网内)抓包](https://cdn.xiaobaidebug.top/image/image-20210619112642833.png)

可以发现根本没有三次握手的包，只有一些 ARP 包，在询问“谁是 `192.168.31.7`，告诉一下 `192.168.31.6`” 。

这里有三个问题

- 为什么会发 ARP 请求？
- 为什么没有 TCP 握手包？
- ARP 本身是没有重试机制的，为什么 ARP 请求会发那么多遍？

首先我们看下正常情况下执行`connect`，也就是第一次握手 的流程。

![正常connect的流程](https://cdn.xiaobaidebug.top/image/%E6%AD%A3%E5%B8%B8connect%E7%9A%84%E6%B5%81%E7%A8%8B.png)

应用层执行`connect`过后，会通过 socket 层，操作系统接口，进程会从**用户态进入到内核态**，此时进入 **传输层**，因为是**TCP 第一次握手**，会加入**TCP 头**，且置**SYN**标志。

![tcp报头的SYN](https://cdn.xiaobaidebug.top/image/tcp%E6%8A%A5%E5%A4%B4%E7%9A%84SYN.png)

然后进入**网络层**，我想要连的是 `192.168.31.7` ，虽然它是我瞎编的，但**IP 头**还是得老老实实把它加进去。

此时需要重点介绍的是**邻居子系统**，它在**网络层和数据链路层之间**。可以通过**ARP 协议将目的 IP 转为对应的 MAC 地址**，然后**数据链路层**就可以用这个 MAC 地址组装**帧头**。

我们看下那么**ARP 协议的流程**是

![ARP流程](https://cdn.xiaobaidebug.top/image/ARP%E6%B5%81%E7%A8%8B3.png)

1.先到本地 ARP 表查一下有没有 `192.168.31.7` 对应的 **mac 地址**，有的话就返回，这里显然是不可能会有的。

> 可以通过 arp -a 命令查看本机的 arp 表都记录了哪些信息

```shell
$ arp -a
? (192.168.31.1) at 88:c1:97:59:d1:c3 on en0 ifscope [ethernet]
? (224.0.0.251) at 1:0:4e:0:1:fb on en0 ifscope permanent [ethernet]
? (239.255.255.250) at 1:0:3e:7f:ff:fb on en0 ifscope permanent [ethernet]
```

2.看下 `192.168.31.7` 跟本机 IP `192.168.31.6 `在不在一个局域网下。如果在的话，就在局域网内发一个 arp 广播，内容就是 前面提到的 “谁是 `192.168.31.7`，告诉一下 `192.168.31.6`”。

3.如果目的 IP 跟本机 IP 不在同一个局域网下，那么会去获取**默认网关的 MAC 地址**，这里就是指获取**家用路由器的 MAC 地址**。然后把消息发给家用路由器，让路由器发到互联网，找到下一跳路由器，一跳一跳的发送数据，**直到把消息发到目的 IP 上，又或者找不到目的地最终被丢弃。**

4.第 2 和第 3 点都是本地没有查到 ARP 缓存记录的情况，这时候会**把 SYN 报文放进一个队列（叫 unresolved_queue）里暂存起来**，然后发起 ARP 请求；等 ARP 层收到 ARP 回应报文之后，会再从缓存中取出 SYN 报文，组装 MAC 帧头，完成刚刚没完成的发送流程。

如果经过 ARP 流程能正常返回 MAC 地址，那皆大欢喜，直接给**数据链路层**，经过 `ring buffer` 后传到网卡，发出去。

但因为现在这个 IP 是瞎编的，因此不可能得到目的地址 MAC ，所以消息也一直没法到数据链路层。**整个流程卡在了 ARP 流程中。**

而**抓包是在数据链路层之后进行的**，因此 TCP 第一次握手的包一直没能抓到，只能抓到为了获得 `192.168.31.7` 的 MAC 地址的 ARP 请求。

> 发送数据时，是在经过数据链路层之后的 dev_queue_xmit_nit 方法执行抓包操作的，这是属于网卡驱动层的方法了。
>
> 顺带一提，接收端抓包是在 \_\_netif_receive_skb_core 方法里执行的，也属于网卡驱动层。感兴趣的朋友们可以以这个为关键词搜索相关知识点哈

此时 因为 TCP 协议是可靠的协议，对于 TCP 层来说，第一次握手的消息，已经发出去了，但是一直没有收到 ACK。也不知道消息是出去后是遇到什么事了。为了保证可靠性，它会不断重发。

而每一次重发，都会因为同样的原因（没有目的 MAC 地址）而尬在了 ARP 那个流程里。因此，才看到好几次重复的 ARP 消息。

那回到刚刚的三个问题

- 为什么会发 ARP 请求？

  因为目的地址是瞎编的，本地 ARP 表没有目的机器的 MAC 地址，因此发出 ARP 消息。

- 为什么没有 TCP 握手包？

  因为协议栈的数据到了网络层后，在数据链路层前，就因为没有目的 MAC 地址，没法发出。因此抓包软件抓不到相关数据。

- 为什么 ARP 请求会发那么多遍？

  因为 TCP 协议的可靠性，会重发第一次握手的消息，但每一次都因为没有目的 MAC 地址而失败，每次都会发出 ARP 请求。

<br>

### 小结

连一个 IP 不存在的主机时，如果**目的 IP 在局域网内**，则第一次握手会失败，接着不断尝试重发握手的请求。同时，本机会不断发出 ARP 请求，企图获得目的机器的 MAC 地址。并且，因为没能获得目的 MAC 地址，这些 TCP 握手请求最终都发不出去，

<br>

## 目的 IP 在局域网外

上面提到的是，目的 IP 在**局域网内**的情况，下面讨论目的 IP 在**局域网外**的情况。

瞎编一个不是 `192.168.31.xx` 形式的 IP 作为这次要用的局域网外 IP， 比如 `10.225.31.11`。

先抓包看一下。

![连一个不存在的IP(局域网外)抓包](https://cdn.xiaobaidebug.top/image/image-20210619111302173.png)

这次的现象是能发出 TCP 第一次握手的 `SYN包`。

这里有两个问题

- 为什么连局域网外的 IP 现象跟连局域网内不一致？
- TCP 第一次握手的重试规律好像不太对？

<br>

### 为什么连局域网外的 IP 现象跟连局域网内不一致？

这个问题的答案其实在上面 **ARP 的流程**里已经提到过了，如果目的 IP 跟本机 IP 不在同一个局域网下，那么会去获取**默认网关的 MAC 地址**，这里就是指获取**家用路由器的 MAC 地址**。

此时 ARP 流程成功返回**家用路由器的 MAC 地址**，数据链路层加入帧头，消息通过网卡发到了**家用路由器上**。

消息会通过互联网一直传递到某个局域网为 `10.225.31.xx` 的路由器上，那个路由器 发出 ARP 请求，询问他们局域网内的机器有没有叫 `10.225.31.11`的 （结果当然没有）。

最终没能发送成功，发送端也就迟迟收不到目的机的第二次握手响应。

因此触发 TCP 重传。

<br>

### TCP 第一次握手的重试规律好像不太对？

在 Linux 中，第一次握手的 `SYN` 重传次数，是通过 `tcp_syn_retries` 参数控制的。可以通过下面的方式查看

```shell
$cat /proc/sys/net/ipv4/tcp_syn_retries
6
```

这里的含义是指 `syn重传` 会发生 6 次。

而每次重试都会间隔一定的时间，这里的间隔一般是 1s，2s，4s，8s, 16s, 32s .

![SYN重传](https://cdn.xiaobaidebug.top/image/SYN%E9%87%8D%E4%BC%A0.png)

而事实上，看我的截图，是先重试 4 次，每次都是 1s，之后才是 1s，2s，4s，8s, 16s, 32s 的重试。

这跟我们知道的不太一样。

这个是因为**我用的是 macOS 抓的包，跟 linux 就不是一个系统**，各自的 TCP 协议栈在 sync 重传方面的实现都可能会有一定的差异。

我还听说 `oppo` 和 `vivo` 的 syn 重传 是 0.5s 起步的。而 `windows` 的 syn 重传 还有自己的专利。

这些冷知识大家可以不用在意。面试的时候知道 linux 的就够了，剩下的可以用来装逼。毕竟面试官不在意"茴"字到底有几种写法。

<br>

# 连 IP 地址存在但端口号不存在的主机的握手过程

前面提到的是 IP 地址压根就不存在的情况。假如**IP 地址存在但端口号是瞎编的**呢？

## 目的 IP 是回环地址

![连回环地址，端口不存在抓包](https://cdn.xiaobaidebug.top/image/image-20210627090037348.png)

现象也比较简单，已经 IP 地址是存在的，也就是在互联网中这个机器是存在的。

那么我们可以正常发消息到目的 IP，因为对应的 MAC 地址和 IP 都是正确的，所以，数据从数据链路层到网络层都很 OK。

直到传输层，TCP 协议在识别到这个端口号对应的进程根本不存在时，就会把数据丢弃，响应一个 RST 消息给发送端。

![连回环地址时端口不存在](https://cdn.xiaobaidebug.top/image/%E8%BF%9E%E5%9B%9E%E7%8E%AF%E5%9C%B0%E5%9D%80%E6%97%B6%E7%AB%AF%E5%8F%A3%E4%B8%8D%E5%AD%98%E5%9C%A8.png)

<br>

### RST 是什么？

我们都是到 TCP 正常情况下断开连接是用四次挥手，那是**正常时候**的优雅做法。

但**异常情况**下，收发双方都不一定正常，连挥手这件事本身都可能做不到，所以就需要一个机制去强行关闭连接。

**RST** 就是用于这种情况，一般用来**异常地**关闭一个连接。它在 TCP 包头中，在收到置了这个标志位的数据包后，连接就会被关闭，此时接收到 RST 的一方，一般会看到一个 `connection reset` 或 `connection refused` 的报错。

![TCP报头RST位](https://cdn.xiaobaidebug.top/image/tcp报头RST位.png)

<br>

## 目的 IP 在局域网内

刚刚提到我的本机 IP 是 `192.168.31.6` ，局域网内有台 `192.168.31.1` 。同样尝试连一个不存在的端口。

![连存在的局域网内IP，端口不存在抓包](https://cdn.xiaobaidebug.top/image/image-20210619113503022.png)

此时现象跟前者一致。

唯一不同的是，前者是回环地址，RST 数据是从本机的传输层返回的。而这次的情况，RST 数据是从目的机器的传输层返回的。

![连外网地址时端口不存在](https://cdn.xiaobaidebug.top/image/%E8%BF%9E%E5%A4%96%E7%BD%91%E5%9C%B0%E5%9D%80%E6%97%B6%E7%AB%AF%E5%8F%A3%E4%B8%8D%E5%AD%98%E5%9C%A8.png)

<br>

## 目的 IP 在局域网外

找一个存在的外网 ip，这里我拿了**最近刚白嫖的阿里云服务器**地址 ` 47.102.221.141` 。（炫耀）

进行连接连接，发现与前面两种情况是一致的，目的机器在收到我的请求后，立马就通过 **RST 标志位** 断开了这次的连接。

![连存在的局域网外IP，端口不存在抓包](https://cdn.xiaobaidebug.top/image/image-20210619182034584.png)

这一点跟前面两种情况一致。

熟悉小白的朋友们都知道，每次搞事情做测试，都会用 `baidu.com` 。

这次也不例外，ping 一下 `baidu.com` ,获得它的 `IP: 220.181.38.148` 。

```shell
$ ping baidu.com
PING baidu.com (220.181.38.148): 56 data bytes
64 bytes from 220.181.38.148: icmp_seq=0 ttl=48 time=35.728 ms
64 bytes from 220.181.38.148: icmp_seq=1 ttl=48 time=38.052 ms
64 bytes from 220.181.38.148: icmp_seq=2 ttl=48 time=37.845 ms
64 bytes from 220.181.38.148: icmp_seq=3 ttl=48 time=37.210 ms
64 bytes from 220.181.38.148: icmp_seq=4 ttl=48 time=38.402 ms
64 bytes from 220.181.38.148: icmp_seq=5 ttl=48 time=37.692 ms
^C
--- baidu.com ping statistics ---
6 packets transmitted, 6 packets received, 0.0% packet loss
round-trip min/avg/max/stddev = 35.728/37.488/38.402/0.866 ms
```

发消息到给百度域名背后的 IP，且瞎随机指定一个端口 **8080**， 抓包。

![连baidu，端口不存在抓包](https://cdn.xiaobaidebug.top/image/image-20210619084158238.png)

现象却不一致。没有 `RST` 。而且触发了第一次握手的重试消息。这是为什么？

这是因为 baidu 的机器，作为线上生产的机器，会设置一系列安全策略，比如只对外暴露某些端口，除此之外的端口，都一律拒绝。

所以很多发到 8080 端口的消息都**在防火墙这一层就被拒绝掉了**，根本到不了目的主机里，而**RST 是在目的主机的 TCP/IP 协议栈里发出**的，都还没到这一层，就更不可能发 RST 了。因此发送端发现消息没有回应（因为被防火墙丢了），就会重传。所以才会出现上述抓包里的现象。

![防火墙安全策略](https://cdn.xiaobaidebug.top/image/%E9%98%B2%E7%81%AB%E5%A2%99%E5%AE%89%E5%85%A8%E7%AD%96%E7%95%A5.png)

<br>

# 总结

连一个 IP 不存在的主机时

- 如果 IP 在局域网内，会发送 N 次 ARP 请求获得目的主机的 MAC 地址，同时不能发出 TCP 握手消息。

- 如果 IP 在局域网外，会将消息通过路由器发出，但因为最终找不到目的地，触发 TCP 重试流程。

连 IP 地址存在但端口号不存在的主机时

- 不管目的 IP 是回环地址还是局域网内外的 IP 地址，目的主机的传输层都会在收到握手消息后，发现端口不正确，发出 RST 消息断开连接。

- 当然如果目的机器设置了防火墙策略，限制他人将消息发到不对外暴露的端口，那么这种情况，发送端就会不断重试第一次握手。

最后留个问题，连一个 **不存在的局域网外 IP**的主机时，我们可以看到 TCP 的重发规律是：开始时，每隔 1s 重发五次 `TCP SYN`消息，接着 2s,4s,8s,16s,32s 都重发一次；

对比连一个 **不存在的局域网内 IP**的主机时，却是每隔 1s 重发了 4 次`ARP请求`，接着过了 32s 后才再发出一次 ARP 请求。已知 ARP 请求是没有重传机制的，它的重试就是 TCP 重试触发的，但两者规律不一致，是为什么？

<br>

# 最后

欢迎大家加我微信（公众号里右下角“联系我”），互相围观朋友圈砍一刀啥的哈哈。

如果文章对你有帮助，看下文章底部右下角，做点正能量的事情（**点两下**）支持一下。（**~~卑微~~疯狂暗示，拜托拜托，这对我真的很重要！**）

![](https://cdn.xiaobaidebug.top/image/12051625633785_.pic.jpg)

我是小白，我们下期见。

##### 别说了，一起在知识的海洋里呛水吧

关注公众号:【小白 debug】
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
