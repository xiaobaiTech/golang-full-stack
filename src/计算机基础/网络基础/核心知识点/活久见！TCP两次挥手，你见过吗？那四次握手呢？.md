---
title: 活久见！TCP两次挥手，你见过吗？那四次握手呢？
date: 2021-09-25 22:57:55
tags:
categories: "图解网络"
---

我们都知道，TCP 是个**面向连接的、可靠的、基于字节流的传输层**通信协议。

![TCP是什么](https://cdn.xiaobaidebug.top/image/tcp%E6%98%AF%E4%BB%80%E4%B9%882.png)

那这里面提到的"**面向连接**"，意味着需要 建立连接，使用连接，释放连接。

**建立连接**是指我们熟知的**TCP 三次握手**。

而**使用连接**，则是通过一发送、一确认的形式，进行**数据传输**。

还有就是**释放连接**，也就是我们常见的**TCP 四次挥手**。

**TCP 四次挥手**大家应该比较了解了，但大家见过**三次挥手**吗？还有**两次挥手**呢？

都见过？ 那**四次握手**呢？

今天这个话题，不想只是猎奇，也不想搞冷知识。

我们从四次挥手开始说起，搞点实用的知识点。

<!-- more -->
<br>

# TCP 四次挥手

简单回顾下 TCP 四次挥手。

![TCP四次挥手](https://cdn.xiaobaidebug.top/image/TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B7.png)

正常情况下。只要数据传输完了，**不管是客户端还是服务端，都可以主动发起四次挥手**，释放连接。

就跟上图画的一样，假设，这次四次挥手是由客户端主动发起的，那它就是**主动方**。服务器是被动接收客户端的挥手请求的，叫**被动方**。

客户端和服务器，一开始，都是处于`ESTABLISHED`状态。

**第一次挥手**：一般情况下，主动方执行`close()`或 `shutdown()`方法，会发个`FIN报文`出来，表示"**我不再发送数据了**"。

**第二次挥手**：在收到主动方的`FIN`报文后，被动方立马回应一个`ACK`，意思是"我收到你的 FIN 了，也知道你不再发数据了"。

上面提到的是**主动方**不再发送数据了。但如果这时候，**被动方**还有数据要发，那就继续发。注意，虽然第二次和第三次挥手之间，被动方是能发数据到主动方的，但主动方能不能正常收就不一定了，这个待会说。

**第三次挥手**：在被动方在感知到第二次挥手之后，会做了一系列的收尾工作，最后也调用一个 `close()`, 这时候就会发出第三次挥手的 `FIN-ACK`。

**第四次挥手**：主动方回一个`ACK`，意思是收到了。

其中第一次挥手和第三次挥手，都是我们在应用程序中主动触发的（比如调用`close()`方法），也就是我们平时写代码需要关注的地方。

第二和第四次挥手，都是内核协议栈自动帮我们完成的，我们写代码的时候碰不到这地方，因此也不需要太关心。

另外不管是主动还是被动，每方发出了一个 `FIN` 和一个`ACK` 。也收到了一个 `FIN` 和一个`ACK` 。**这一点大家关注下，待会还会提到。**

## FIN 一定要程序执行 close()或 shutdown()才能发出吗？

**不一定**。一般情况下，通过对`socket`执行 `close()` 或 `shutdown()` 方法会发出`FIN`。但实际上，只要应用程序退出，不管是**主动**退出，还是**被动**退出（因为一些莫名其妙的原因被`kill`了）, **都会**发出 `FIN`。

> FIN 是指"我不再发送数据"，因此`shutdown()` 关闭读不会给对方发 FIN, 关闭写才会发 FIN。

<br>

## 如果机器上 FIN-WAIT-2 状态特别多，是为什么

根据上面的四次挥手图，可以看出，`FIN-WAIT-2`是**主动方**那边的状态。

处于这个状态的程序，一直在等**第三次挥手**的`FIN`。而第三次挥手需要由被动方在代码里执行`close()` 发出。

因此当机器上`FIN-WAIT-2`状态特别多，那一般来说，另外一台机器上会有大量的 `CLOSE_WAIT`。需要检查有大量的 `CLOSE_WAIT`的那台机器，为什么迟迟不愿调用`close()`关闭连接。

所以，如果机器上`FIN-WAIT-2`状态特别多，一般是因为对端一直不执行`close()`方法发出第三次挥手。

![FIN-WAIT-2特别多的原因](https://cdn.xiaobaidebug.top/image/FIN-WAIT-2%E7%89%B9%E5%88%AB%E5%A4%9A%E7%9A%84%E5%8E%9F%E5%9B%A0.png)

<br>

## 主动方在 close 之后收到的数据，会怎么处理

之前写的一篇文章《代码执行 send 成功后，数据就发出去了吗？》中，从源码的角度提到了，**一般情况下**，程序主动执行`close()`的时候；

- 如果当前连接对应的`socket`的**接收缓冲区**有数据，会发`RST`。
- 如果**发送缓冲区**有数据，那会等待发送完，再发第一次挥手的`FIN`。

大家知道，TCP 是**全双工通信**，意思是发送数据的同时，还可以接收数据。

`Close()`的含义是，此时要同时**关闭发送和接收**消息的功能。

也就是说，虽然**理论上**，第二次和第三次挥手之间，被动方是可以传数据给主动方的。

但如果 主动方的四次挥手是通过 `close()` 触发的，那主动方是不会去收这个消息的。而且还会回一个 `RST`。直接结束掉这次连接。

![close()触发TCP四次挥手](<https://cdn.xiaobaidebug.top/image/close()%E8%A7%A6%E5%8F%91TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B5.png>)

<br>

## 第二第三次挥手之间，不能传输数据吗？

也不是。前面提到`Close()`的含义是，要同时**关闭发送和接收**消息的功能。

那如果能做到**只关闭发送消息**，**不关闭接收消息**的功能，那就能继续收消息了。这种 `half-close` 的功能，通过调用`shutdown()` 方法就能做到。

```c
int shutdown(int sock, int howto);
```

> 其中 howto 为断开方式。有以下取值：
>
> - SHUT_RD：关闭读。这时应用层不应该再尝试接收数据，内核协议栈中就算接收缓冲区收到数据也会被丢弃。
> - SHUT_WR：关闭写。如果发送缓冲区中还有数据没发，会将将数据传递到目标主机。
> - SHUT_RDWR：关闭读和写。相当于`close()`了。

![shutdown触发的TCP四次挥手](https://cdn.xiaobaidebug.top/image/shutdown%E8%A7%A6%E5%8F%91%E7%9A%84TCP%E5%9B%9B%E6%AC%A1%E6%8C%A5%E6%89%8B.png)

<br>

## 怎么知道对端 socket 执行了 close 还是 shutdown

不管**主动**关闭方调用的是`close()`还是`shutdown()`，对于被动方来说，收到的就只有一个`FIN`。

**被动**关闭方**就懵了**，"我怎么知道对方让不让我继续发数据？"

![](https://cdn.xiaobaidebug.top/image/e18d20c94006dfe0-feec70b0eb485633-f0e01cf6d9cce2bccba34029f1ca10e0-20210808141929988.jpg)

其实，大可不必纠结，该发就发。

第二次挥手和第三次挥手之间，如果**被动**关闭方想发数据，那么在代码层面上，就是执行了 `send()` 方法。

```c
int send( SOCKET s,const char* buf,int len,int flags);
```

`send()` 会把数据拷贝到本机的**发送缓冲区**。如果发送缓冲区没出问题，都能拷贝进去，所以正常情况下，`send()`**一般**都会返回成功。

![tcp_sendmsg逻辑](https://cdn.xiaobaidebug.top/image/tcp_sendmsg%E9%80%BB%E8%BE%912.png)

然后**被动方**内核协议栈会把数据发给**主动**关闭方。

- 如果上一次**主动**关闭方调用的是`shutdown(socket_fd, SHUT_WR)`。那此时，**主动关闭方**不再发送消息，但能接收**被动方**的消息，一切如常，皆大欢喜。

- 如果上一次**主动**关闭方调用的是`close()`。那**主动方**在收到**被动方**的数据后会直接**丢弃**，然后回一个`RST`。

针对第二种情况。

被动方**内核协议栈**收到了`RST`，会把连接关闭。但内核连接关闭了，应用层也不知道（除非被通知）。

此时被动方**应用层**接下来的操作，无非就是**读或写**。

- 如果是读，则会返回`RST`的报错，也就是我们常见的`Connection reset by peer`。

- 如果是写，那么程序会产生`SIGPIPE`信号，应用层代码可以捕获并处理信号，如果不处理，则默认情况下进程会终止，异常退出。

<br>

**总结一下**，当被动关闭方 `recv()` 返回`EOF`时，说明主动方通过 `close()`或 `shutdown(fd, SHUT_WR)` 发起了第一次挥手。

如果此时被动方执行**两次** `send()`。

- 第一次`send()`, 一般会成功返回。

- 第二次`send()`时。如果主动方是通过 `shutdown(fd, SHUT_WR)` 发起的第一次挥手，那此时`send()`还是会成功。如果主动方通过 `close()`发起的第一次挥手，那此时会产生`SIGPIPE`信号，进程默认会终止，异常退出。不想异常退出的话，记得捕获处理这个信号。

<br>

## 如果被动方一直不发第三次挥手，会怎么样

第三次挥手，是由**被动方**主动触发的，比如调用`close()`。

如果由于代码错误或者其他一些原因，被动方就是不执行第三次挥手。

这时候，主动方会根据自身第一次挥手的时候用的是 `close()` 还是 `shutdown(fd, SHUT_WR)` ，有不同的行为表现。

- 如果是 `shutdown(fd, SHUT_WR)` ，说明主动方其实只关闭了写，但还可以读，此时会一直处于 `FIN-WAIT-2`， 死等被动方的第三次挥手。

- 如果是 `close()`， 说明主动方读写都关闭了，这时候会处于 `FIN-WAIT-2`一段时间，这个时间由 `net.ipv4.tcp_fin_timeout` 控制，一般是 `60s`，这个值正好跟`2MSL`一样 。**超过这段时间之后，状态不会变成 `TIME-WAIT`，而是直接变成`CLOSED`。**

```sh
# cat /proc/sys/net/ipv4/tcp_fin_timeout
60
```

![一直不发第三次挥手的情况](https://cdn.xiaobaidebug.top/image/%E4%B8%80%E7%9B%B4%E4%B8%8D%E5%8F%91%E7%AC%AC%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E7%9A%84%E6%83%85%E5%86%B53.png)

<br>

# TCP 三次挥手

四次挥手聊完了，那有没有可能出现三次挥手？

**是可能的。**

我们知道，TCP 四次挥手里，第二次和第三次挥手之间，是有可能有数据传输的。第三次挥手的目的是为了告诉主动方，"被动方没有数据要发了"。

所以，在第一次挥手之后，如果被动方没有数据要发给主动方。第二和第三次挥手是**有可能**合并传输的。这样就出现了三次挥手。

![TCP三次挥手](https://cdn.xiaobaidebug.top/image/TCP%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B.png)

<br>

## 如果有数据要发，就不能是三次挥手了吗

上面提到的是**没有数据要发**的情况，如果第二、第三次挥手之间**有数据**要发，就不可能变成三次挥手了吗？

**并不是**。TCP 中还有个特性叫**延迟确认**。可以简单理解为：**接收方收到数据以后不需要立刻马上回复 ACK 确认包。**

在此基础上，**不是每一次发送数据包都能对应收到一个 `ACK` 确认包，因为接收方可以合并确认。**

而这个合并确认，放在四次挥手里，可以把第二次挥手、第三次挥手，以及他们之间的数据传输都合并在一起发送。因此也就出现了三次挥手。

![TCP三次挥手延迟确认](https://cdn.xiaobaidebug.top/image/TCP%E4%B8%89%E6%AC%A1%E6%8C%A5%E6%89%8B%E5%BB%B6%E8%BF%9F%E7%A1%AE%E8%AE%A4.png)

<br>

# TCP 两次挥手

前面在四次挥手中提到，关闭的时候双方都**发出了一个 FIN 和收到了一个 ACK**。

正常情况下 TCP 连接的两端，是不同**IP+端口**的进程。

但如果 TCP 连接的两端，**IP+端口**是一样的情况下，那么在关闭连接的时候，也同样做到了**一端发出了一个 FIN，也收到了一个 ACK**，只不过正好这两端其实是`同一个socket` 。

![TCP两次挥手](https://cdn.xiaobaidebug.top/image/TCP%E4%B8%A4%E6%AC%A1%E6%8C%A5%E6%89%8B2.png)

而这种两端**IP+端口**都一样的连接，叫**TCP 自连接**。

是的，你没看错，我也没打错别字。**同一个 socket 确实可以自己连自己，形成一个连接。**

<br>

## 一个 socket 能建立连接？

上面提到了，同一个客户端 socket，自己对自己发起连接请求。是可以成功建立连接的。这样的连接，叫**TCP 自连接**。

下面我们尝试下复现。

注意我是在以下系统进行的实验。在`mac`上多半无法复现。

```sh
#  cat /etc/os-release
NAME="CentOS Linux"
VERSION="7 (Core)"
ID="centos"
ID_LIKE="rhel fedora"
VERSION_ID="7"
PRETTY_NAME="CentOS Linux 7 (Core)"
```

通过`nc`命令可以很简单的创建一个**TCP 自连接**

```sh
# nc -p 6666 127.0.0.1 6666
```

上面的 `-p` 可以指定源端口号。也就是指定了一个端口号为`6666`的客户端去连接 `127.0.0.1:6666` 。

```sh
# netstat -nt | grep 6666
tcp        0      0 127.0.0.1:6666          127.0.0.1:6666          ESTABLISHED
```

**整个过程中，都没有服务端参与**。可以抓个包看下。

![image-20210810093309117](https://cdn.xiaobaidebug.top/image/image-20210810093309117.png)

可以看到，**相同的 socket，自己连自己的时候，握手是三次的。挥手是两次的。**

![TCP自连接](https://cdn.xiaobaidebug.top/image/TCP%E8%87%AA%E8%BF%9E%E6%8E%A52.png)

上面这张图里，左右都是同一个客户端，把它画成两个是为了方便大家理解状态的迁移。

我们可以拿自连接的握手状态**对比下**正常情况下的 TCP 三次握手。

![正常情况下的TCP三次握手](https://cdn.xiaobaidebug.top/image/正常情况下的TCP三次握手2.png)

看了自连接的状态图，再看看下面几个问题。

<br>

### 一端发出第一次握手后，如果又收到了第一次握手的 SYN 包，TCP 连接状态会怎么变化？

第一次握手过后，连接状态就变成了`SYN_SENT`状态。如果此时又收到了第一次握手的 SYN 包，那么连接状态就会从`SYN_SENT`状态变成`SYN_RCVD`。

```c
// net/ipv4/tcp_input.c
static int tcp_rcv_synsent_state_process()
{
    // SYN_SENT状态下，收到SYN包
	if (th->syn) {
        // 状态置为 SYN_RCVD
		tcp_set_state(sk, TCP_SYN_RECV);
	}
}

```

<br>

### 一端发出第二次握手后，如果又收到第二次握手的 SYN+ACK 包，TCP 连接状态会怎么变化？

第二握手过后，连接状态就变为`SYN_RCVD`了，此时如果再收到第二次握手的`SYN+ACK`包。连接状态会变为`ESTABLISHED`。

```c
// net/ipv4/tcp_input.c
int tcp_rcv_state_process()
{
    // 前面省略很多逻辑，能走到这就认为肯定有ACK
	if (true) {
        // 判断下这个ack是否合法
		int acceptable = tcp_ack(sk, skb, FLAG_SLOWPATH | FLAG_UPDATE_TS_RECENT) > 0;
		switch (sk->sk_state) {
		case TCP_SYN_RECV:
			if (acceptable) {
        // 状态从 SYN_RCVD 转为 ESTABLISHED
				tcp_set_state(sk, TCP_ESTABLISHED);
			}
		}
	}
}
```

<br>

### 一端第一次挥手后，又收到第一次挥手的包，TCP 连接状态会怎么变化？

第一次挥手过后，一端状态就会变成 `FIN-WAIT-1`。正常情况下，是要等待第二次挥手的`ACK`。但实际上却等来了 一个第一次挥手的 `FIN`包， 这时候连接状态就会变为`CLOSING`。

```c
// net/
static void tcp_fin(struct sock *sk)
{
	switch (sk->sk_state) {
	case TCP_FIN_WAIT1:
		tcp_send_ack(sk);
    // FIN-WAIT-1状态下，收到了FIN，转为 CLOSING
		tcp_set_state(sk, TCP_CLOSING);
		break;
	}
}
```

这可以说是**隐藏剧情**了。

`CLOSING` 很少见，除了出现在**自连接关闭**外，一般还会出现在 TCP 两端**同时关闭**连接的情况下。

处于`CLOSING`状态下时，只要再收到一个`ACK`，就能进入 `TIME-WAIT` 状态，然后等个`2MSL`，连接就彻底断开了。这跟正常的四次挥手还是有些差别的。大家可以滑到文章开头的 TCP 四次挥手再对比下。

<br>

### 代码复现自连接

可能大家会产生怀疑，这是不是`nc`这个软件本身的`bug`。

那我们可以尝试下用`strace`看看它内部都做了啥。

```sh
# strace nc -p 6666 127.0.0.1 6666
// ...
socket(AF_INET, SOCK_STREAM, IPPROTO_TCP) = 3
fcntl(3, F_GETFL)                       = 0x2 (flags O_RDWR)
fcntl(3, F_SETFL, O_RDWR|O_NONBLOCK)    = 0
setsockopt(3, SOL_SOCKET, SO_REUSEADDR, [1], 4) = 0
bind(3, {sa_family=AF_INET, sin_port=htons(6666), sin_addr=inet_addr("0.0.0.0")}, 16) = 0
connect(3, {sa_family=AF_INET, sin_port=htons(6666), sin_addr=inet_addr("127.0.0.1")}, 16) = -1 EINPROGRESS (Operation now in progress)
// ...
```

无非就是以创建了一个客户端`socket`句柄，然后对这个句柄执行 `bind`, 绑定它的端口号是`6666`，然后再向 `127.0.0.1:6666`发起`connect`方法。

我们可以尝试用`C语言`去复现一遍。

**下面的代码，只用于复现问题。直接跳过也完全不影响阅读。**

```c
#include <stdio.h>
#include <unistd.h>
#include <sys/socket.h>
#include <stdlib.h>
#include <arpa/inet.h>
#include <ctype.h>
#include <string.h>
#include <strings.h>


int main()
{
    int lfd, cfd;
    struct sockaddr_in serv_addr, clie_addr;
    socklen_t clie_addr_len;
    char buf[BUFSIZ];
    int n = 0, i = 0, ret = 0 ;
    printf("This is a client \n");

    /*Step 1: 创建客户端端socket描述符cfd*/
    cfd = socket(AF_INET, SOCK_STREAM, 0);
    if(cfd == -1)
    {
        perror("socket error");
        exit(1);
    }

    int flag=1,len=sizeof(int);
	if( setsockopt(cfd, SOL_SOCKET, SO_REUSEADDR, &flag, len) == -1)
	{
		perror("setsockopt");
		exit(1);
	}


    bzero(&clie_addr, sizeof(clie_addr));
    clie_addr.sin_family = AF_INET;
    clie_addr.sin_port = htons(6666);
    inet_pton(AF_INET,"127.0.0.1", &clie_addr.sin_addr.s_addr);

    /*Step 2: 客户端使用bind绑定客户端的IP和端口*/
    ret = bind(cfd, (struct sockaddr* )&clie_addr, sizeof(clie_addr));
    if(ret != 0)
    {
        perror("bind error");
        exit(2);
    }

    /*Step 3: connect链接服务器端的IP和端口号*/
    bzero(&serv_addr, sizeof(serv_addr));
    serv_addr.sin_family = AF_INET;
    serv_addr.sin_port = htons(6666);
    inet_pton(AF_INET,"127.0.0.1", &serv_addr.sin_addr.s_addr);
    ret = connect(cfd,(struct sockaddr *)&serv_addr, sizeof(serv_addr));
    if(ret != 0)
    {
        perror("connect error");
        exit(3);
    }

    /*Step 4: 向服务器端写数据*/
    while(1)
    {
        fgets(buf, sizeof(buf), stdin);
        write(cfd, buf, strlen(buf));
        n = read(cfd, buf, sizeof(buf));
        write(STDOUT_FILENO, buf, n);//写到屏幕上
    }
    /*Step 5: 关闭socket描述符*/
    close(cfd);
    return 0;
}
```

保存为 `client.c` 文件，然后执行下面命令，会发现连接成功。

```sh
# gcc client.c -o client && ./client
This is a client
```

```sh
# netstat -nt | grep 6666
tcp        0      0 127.0.0.1:6666          127.0.0.1:6666          ESTABLISHED
```

说明，这不是 nc 的 bug。事实上，这也是内核允许的一种情况。

<br>

### 自连接的解决方案

自连接一般不太常见，但遇到了也不难解决。

解决方案比较简单，只要能保证客户端和服务端的端口不一致就行。

事实上，我们写代码的时候一般不会去指定客户端的端口，系统会随机给客户端分配某个范围内的端口。而这个范围，可以通过下面的命令进行查询

```sh
# cat /proc/sys/net/ipv4/ip_local_port_range
32768   60999
```

也就是只要我们的服务器端口不在`32768-60999`这个范围内，比如设置为`8888`。就可以规避掉这个问题。

另外一个解决方案，可以参考`golang`标准网络库的实现，在连接建立完成之后判断下 IP 和端口是否一致，如果遇到自连接，则断开重试。

```go
func dialTCP(net string, laddr, raddr *TCPAddr, deadline time.Time) (*TCPConn, error) {
	// 如果是自连接，这里会重试
	for i := 0; i < 2 && (laddr == nil || laddr.Port == 0) && (selfConnect(fd, err) || spuriousENOTAVAIL(err)); i++ {
		if err == nil {
			fd.Close()
		}
		fd, err = internetSocket(net, laddr, raddr, deadline, syscall.SOCK_STREAM, 0, "dial", sockaddrToTCP)
	}
    // ...
}

func selfConnect(fd *netFD, err error) bool {
	// 判断是否端口、IP一致
	return l.Port == r.Port && l.IP.Equal(r.IP)
}
```

<br>

# 四次握手

前面提到的`TCP`自连接是一个客户端自己连自己的场景。那不同客户端之间是否可以互联？

答案是**可以的**，有一种情况叫**TCP 同时打开**。

![TCP同时打开](https://cdn.xiaobaidebug.top/image/TCP%E5%90%8C%E6%97%B6%E6%89%93%E5%BC%802.png)

大家可以对比下，**TCP 同时打开**在握手时的状态变化，跟 TCP 自连接是非常的像。

比如`SYN_SENT`状态下，又收到了一个`SYN`，其实就相当于自连接里，在发出了第一次握手后，又收到了第一次握手的请求。结果都是变成 `SYN_RCVD`。

在 `SYN_RCVD` 状态下收到了 `SYN+ACK`，就相当于自连接里，在发出第二次握手后，又收到第二次握手的请求，结果都是变成 `ESTABLISHED`。**他们的源码其实都是同一块逻辑。**

<br>

### 复现 TCP 同时打开

分别在**两个控制台**下，分别执行下面两行命令。

```sh
while true; do nc -p 2224 127.0.0.1 2223 -v;done

while true; do nc -p 2223 127.0.0.1 2224 -v;done
```

上面两个命令的含义也比较简单，两个客户端互相请求连接对方的端口号，如果失败了则不停重试。

执行后看到的现象是，一开始会疯狂失败，重试。一段时间后，连接建立完成。

```sh
# netstat -an | grep  2223
Proto Recv-Q Send-Q Local Address           Foreign Address         State
tcp        0      0 127.0.0.1:2224          127.0.0.1:2223          ESTABLISHED
tcp        0      0 127.0.0.1:2223          127.0.0.1:2224          ESTABLISHED
```

期间抓包获得下面的结果。

![](https://cdn.xiaobaidebug.top/image/image-20210815090301418.png)

可以看到，这里面建立连接用了四次交互。因此可以说这是通过**"四次握手"**建立的连接。

而且更重要的是，这里面只涉及两个客户端，**没有服务端**。

看到这里，不知道大家有没有跟我一样，被刷新了一波认知，对`socket`有了重新的认识。

在以前的观念里，建立连接，必须要有一个客户端和一个服务端，并且服务端还要执行一个`listen()`和一个`accept()`。而实际上，这些都不是必须的。

那么下次，面试官问你**"没有`listen()`， TCP 能建立连接吗？"**， 我想大家应该知道该怎么回答了。

但问题又来了，只有两个客户端，没有`listen()` ，为什么能建立`TCP`连接？

如果大家感兴趣，我们以后有机会再填上这个坑。

<br>

# 总结

- **四次挥手**中，不管是程序主动执行`close()`，还是进程被杀，都有可能发出第一次挥手`FIN`包。如果机器上`FIN-WAIT-2`状态特别多，一般是因为对端一直不执行`close()`方法发出第三次挥手。
- `Close()`会**同时关闭**发送和接收消息的功能。`shutdown()` 能**单独关闭**发送或接受消息。

- 第二、第三次挥手，是有可能合在一起的。于是四次挥手就变成**三次挥手**了。
- 同一个 socket 自己连自己，会产生**TCP 自连接**，自连接的挥手是**两次挥手**。
- 没有`listen`，两个客户端之间也能建立连接。这种情况叫**TCP 同时打开**，它由**四次握手**产生。

<br>

# 最后

今天提到的，不管是**两次挥手**，还是**自连接**，或是**TCP 同时打开**什么的。

咋一看，可能对日常搬砖没什么用，实际上也确实没什么用。

并且在面试上大概率也不会被问到。

**毕竟一般面试官也不在意茴字有几种写法。**

这篇文章的目的，主要是想从另外一个角度让大家重新认识下`socket`。原来`TCP`是可以自己连自己的，甚至两个客户端之间，不用服务端也能连起来。

这实在是，太出乎意料了。

<br>

<br>

**如果文章对你有帮助，欢迎.....**

算了。

兄弟们都是自家人，点不**点赞**，在不**在看**什么的，没关系的，大家看开心了就好。

**在看，点赞**什么的，我不是特别在意，真的，真的，别不信啊。

不三连也真的没关系的。

兄弟们不要在意啊。

我是**虚伪**的小白，我们下期见！

<br>

##### 别说了，一起在知识的海洋里呛水吧

**点击**下方名片，关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)

<br>

不满足于在留言区说骚话？

加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点阳间的话题。就**超！开！心！**

<img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" width = "50%"   align=center />

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
