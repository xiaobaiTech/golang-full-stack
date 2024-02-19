---
title: i/o timeout ， 希望你不要踩到这个net/http包的坑
date: 2021-05-18 22:57:55
tags:
categories: "golang面试题"
---

> 文章持续更新，可以微信搜一搜「小白 debug」第一时间阅读，回复【面试】获免费面试题集。本文已经收录在 GitHub https://github.com/xiaobaiTech/golangFamily , 有大厂面试完整考点和成长路线，欢迎 Star。

<br>

## 问题

我们来看一段日常代码。

<!-- more -->

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net"
	"net/http"
	"time"
)

var tr *http.Transport

func init() {
	tr = &http.Transport{
		MaxIdleConns: 100,
		Dial: func(netw, addr string) (net.Conn, error) {
			conn, err := net.DialTimeout(netw, addr, time.Second*2) //设置建立连接超时
			if err != nil {
				return nil, err
			}
			err = conn.SetDeadline(time.Now().Add(time.Second * 3)) //设置发送接受数据超时
			if err != nil {
				return nil, err
			}
			return conn, nil
		},
	}
}

func main() {
	for {
		_, err := Get("http://www.baidu.com/")
		if err != nil {
			fmt.Println(err)
			break
		}
	}
}


func Get(url string) ([]byte, error) {
	m := make(map[string]interface{})
	data, err := json.Marshal(m)
	if err != nil {
		return nil, err
	}
	body := bytes.NewReader(data)
	req, _ := http.NewRequest("Get", url, body)
	req.Header.Add("content-type", "application/json")

	client := &http.Client{
		Transport: tr,
	}
	res, err := client.Do(req)
	if res != nil {
		defer res.Body.Close()
	}
	if err != nil {
		return nil, err
	}
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	return resBody, nil
}

```

做的事情，比较简单，就是循环去请求 `http://www.baidu.com/` , 然后等待响应。

**看上去貌似没啥问题吧。**

代码跑起来，也**确实能正常收发消息**。

但是这段代码跑**一段时间**，就会出现 `i/o timeout` 的报错。

<br>

这其实是最近排查了的一个问题，发现这个坑可能比较容易踩上，我这边对代码做了简化。

实际生产中发生的**现象**是，`golang`服务在发起`http`调用时，虽然`http.Transport`设置了`3s`超时，会偶发出现`i/o timeout`的报错。

但是查看下游服务的时候，发现下游服务其实 `100ms` 就已经返回了。

<br>

## 排查

![五层网络协议对应的消息体变化分析](https://cdn.xiaobaidebug.top/image/%E4%BA%94%E5%B1%82%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE%E5%AF%B9%E5%BA%94%E7%9A%84%E6%B6%88%E6%81%AF%E4%BD%93%E5%8F%98%E5%8C%96%E5%88%86%E6%9E%90.png)

就很奇怪了，明明服务端显示处理耗时才`100ms`，且客户端超时设的是`3s`, 怎么就出现超时报错 `i/o timeout` 呢？

<br>

这里推测有两个可能。

- 因为服务端打印的日志其实只是**服务端应用层**打印的日志。但客户端应用层发出数据后，中间还经过**客户端的传输层，网络层，数据链路层和物理层**，再经过**服务端的物理层，数据链路层，网络层，传输层到服务端的应用层**。服务端应用层处耗时**100ms**，再原路返回。那剩下的`3s-100ms`**可能是**耗在了整个流程里的各个层上。比如网络不好的情况下，传输层 TCP 使劲丢包重传之类的原因。

- 网络没问题，客户端到服务端链路整个收发流程大概耗时就是`100ms`左右。客户端处理逻辑问题导致超时。

  <br>

**一般遇到问题，大部分情况下都不会是底层网络的问题，大胆怀疑是自己的问题就对了**，不死心就抓个包看下。

![抓包结果](https://cdn.xiaobaidebug.top/image/wiresharkcp2.png)

分析下，从刚开始三次握手（**画了红框的地方**）。

到最后出现超时报错 `i/o timeout` （**画了蓝框的地方**）。

从`time`那一列从`7`到`10`，确实间隔`3s`。而且看**右下角**的蓝框，是`51169`端口发到`80`端口的一次`Reset`连接。

`80`端口是服务端的端口。换句话说就是客户端`3s`超时**主动**断开链接的。

但是再仔细看下**第一行**三次握手到**最后**客户端超时主动断开连接的中间，其实有**非常多次 HTTP 请求**。

回去看代码设置超时的方式。

```go
	tr = &http.Transport{
		MaxIdleConns: 100,
		Dial: func(netw, addr string) (net.Conn, error) {
			conn, err := net.DialTimeout(netw, addr, time.Second*2) //设置建立连接超时
			if err != nil {
				return nil, err
			}
			err = conn.SetDeadline(time.Now().Add(time.Second * 3)) //设置发送接受数据超时
			if err != nil {
				return nil, err
			}
			return conn, nil
		},
	}
```

也就是说，这里的`3s`超时，其实是在**建立连接之后**开始算的，而不是**单次调用开始算的**超时。

看注释里写的是

> SetDeadline sets the read and write deadlines associated with the **connection**.

<br>

<br>

## 超时原因

大家知道`HTTP`是应用层协议，传输层用的是`TCP`协议。

HTTP 协议从`1.0`以前，默认用的是`短连接`，每次发起请求都会建立 TCP 连接。收发数据。然后断开连接。

TCP 连接每次都是三次握手。每次断开都要四次挥手。

其实没必要每次都建立新连接，建立的连接不断开就好了，每次发送数据都复用就好了。

于是乎，HTTP 协议从`1.1`之后就默认使用`长连接`。具体相关信息可以看之前的 [这篇文章](https://mp.weixin.qq.com/s/T41YBEmG4lkxokDLzRxVgA)。

那么`golang标准库`里也兼容这种实现。

通过建立一个连接池，针对`每个域名`建立一个 TCP 长连接，比如`http://baidu.com`和`http://golang.com` 就是两个不同的域名。

第一次访问`http://baidu.com` 域名的时候会建立一个连接，用完之后放到空闲连接池里，下次再要访问`http://baidu.com` 的时候会重新从连接池里把这个连接捞出来`复用`。

![复用长连接](https://cdn.xiaobaidebug.top/image/%E5%A4%8D%E7%94%A8%E9%95%BF%E8%BF%9E%E6%8E%A5.png)

<br>

> 插个题外话：这也解释了之前[这篇文章](https://mp.weixin.qq.com/s/T6XXaFFyyOJioD6dqDJpFg)里最后的疑问，为什么要强调是同一个域名：一个域名会建立一个连接，一个连接对应**一个读 goroutine 和一个写 goroutine**。正因为是同一个域名，所以最后才会泄漏`3`个 goroutine，如果不同域名的话，那就会泄漏 `1+2*N` 个协程，`N`就是域名数。

<br>

假设第一次请求要`100ms`，每次请求完`http://baidu.com` 后都**放入**连接池中，下次继续复用，重复`29`次，耗时`2900ms`。

第`30`次请求的时候，连接从建立开始到服务返回前就已经用了`3000ms`，刚好到设置的**3s**超时阈值，那么此时客户端就会报超时 `i/o timeout` 。

虽然这时候服务端其实才花了`100ms`，但耐不住前面`29次`加起来的耗时已经很长。

也就是说只要通过 `http.Transport` 设置了 `err = conn.SetDeadline(time.Now().Add(time.Second * 3)) `，并且你用了**长连接**，哪怕服务端处理再快，客户端设置的超时再长，总有一刻，你的程序会报超时错误。

## 正确姿势

原本预期是给每次调用设置一个超时，而不是给整个连接设置超时。

另外，上面出现问题的原因是给长连接设置了超时，且长连接会复用。

基于这两点，改一下代码。

```go
package main

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"time"
)

var tr *http.Transport

func init() {
	tr = &http.Transport{
		MaxIdleConns: 100,
		// 下面的代码被干掉了
		//Dial: func(netw, addr string) (net.Conn, error) {
		//	conn, err := net.DialTimeout(netw, addr, time.Second*2) //设置建立连接超时
		//	if err != nil {
		//		return nil, err
		//	}
		//	err = conn.SetDeadline(time.Now().Add(time.Second * 3)) //设置发送接受数据超时
		//	if err != nil {
		//		return nil, err
		//	}
		//	return conn, nil
		//},
	}
}


func Get(url string) ([]byte, error) {
	m := make(map[string]interface{})
	data, err := json.Marshal(m)
	if err != nil {
		return nil, err
	}
	body := bytes.NewReader(data)
	req, _ := http.NewRequest("Get", url, body)
	req.Header.Add("content-type", "application/json")

	client := &http.Client{
		Transport: tr,
		Timeout: 3*time.Second,  // 超时加在这里，是每次调用的超时
	}
	res, err := client.Do(req)
	if res != nil {
		defer res.Body.Close()
	}
	if err != nil {
		return nil, err
	}
	resBody, err := ioutil.ReadAll(res.Body)
	if err != nil {
		return nil, err
	}
	return resBody, nil
}

func main() {
	for {
		_, err := Get("http://www.baidu.com/")
		if err != nil {
			fmt.Println(err)
			break
		}
	}
}

```

看注释会发现，改动的点有两个

- `http.Transport`里的建立连接时的一些超时设置干掉了。

- 在发起 http 请求的时候会场景`http.Client`，此时加入超时设置，这里的超时就可以理解为单次请求的超时了。同样可以看下注释

  > Timeout specifies a time limit for **requests** made by this Client.

到这里，代码就改好了，实际生产中问题也就解决了。

实例代码里，如果拿去跑的话，其实还会下面的错

```go
Get http://www.baidu.com/: EOF
```

这个是因为调用得太猛了，`http://www.baidu.com` 那边主动断开的连接，可以理解为一个限流措施，目的是为了保护服务器，**毕竟每个人都像这么搞，服务器是会炸的**。。。

解决方案很简单，每次 HTTP 调用中间加个`sleep`间隔时间就好。

<br>

到这里，其实问题已经解决了，下面会在源码层面分析出现问题的原因。对读源码不感兴趣的朋友们可以不用接着往下看，直接拉到文章底部**右下角**，做点正能量的事情（**点两下**）支持一下。（**疯狂暗示，拜托拜托，这对我真的很重要！**）

## 源码分析

**用的 go 版本是 1.12.7**。

从发起一个网络请求开始跟。

```go
res, err := client.Do(req)
func (c *Client) Do(req *Request) (*Response, error) {
	return c.do(req)
}

func (c *Client) do(req *Request) {
	// ...
	if resp, didTimeout, err = c.send(req, deadline); err != nil {
    // ...
  }
	// ...
}
func send(ireq *Request, rt RoundTripper, deadline time.Time) {
	// ...
	resp, err = rt.RoundTrip(req)
 	// ...
}

// 从这里进入 RoundTrip 逻辑
/src/net/http/roundtrip.go: 16
func (t *Transport) RoundTrip(req *Request) (*Response, error) {
	return t.roundTrip(req)
}

func (t *Transport) roundTrip(req *Request) (*Response, error) {
	// 尝试去获取一个空闲连接，用于发起 http 连接
  pconn, err := t.getConn(treq, cm)
  // ...
}

// 重点关注这个函数，返回是一个长连接
func (t *Transport) getConn(treq *transportRequest, cm connectMethod) (*persistConn, error) {
  // 省略了大量逻辑，只关注下面两点
	// 有空闲连接就返回
	pc := <-t.getIdleConnCh(cm)

  // 没有创建连接
  pc, err := t.dialConn(ctx, cm)

}


```

这里上面很多代码，其实只是为了展示这部分代码是怎么跟踪下来的，方便大家去看源码的时候去跟一下。

最后一个上面的代码里有个 `getConn` 方法。在发起网络请求的时候，会先取一个网络连接，取连接有两个来源。

- 如果有空闲连接，就拿空闲连接

  ```go
  /src/net/http/tansport.go:810
  func (t *Transport) getIdleConnCh(cm connectMethod) chan *persistConn {
     // 返回放空闲连接的chan
     ch, ok := t.idleConnCh[key]
  	 // ...
     return ch
  }
  ```

- 没有空闲连接，就创建长连接。

```go
/src/net/http/tansport.go:1357
func (t *Transport) dialConn() {
  //...
  conn, err := t.dial(ctx, "tcp", cm.addr())
  // ...
  go pconn.readLoop()
  go pconn.writeLoop()
  // ...
}
```

当**第一次**发起一个 http 请求时，这时候肯定没有空闲连接，会建立一个新连接。同时会创建一个**读 goroutine 和一个写 goroutine**。

![读写协程](https://cdn.xiaobaidebug.top/image/%E8%AF%BB%E5%86%99%E5%8D%8F%E7%A8%8B.png)

注意上面代码里的`t.dial(ctx, "tcp", cm.addr())`，如果像文章开头那样设置了 `http.Transport`的

```go
Dial: func(netw, addr string) (net.Conn, error) {
   conn, err := net.DialTimeout(netw, addr, time.Second*2) //设置建立连接超时
   if err != nil {
      return nil, err
   }
   err = conn.SetDeadline(time.Now().Add(time.Second * 3)) //设置发送接受数据超时
   if err != nil {
      return nil, err
   }
   return conn, nil
},
```

那么这里就会在下面的`dial`里被执行到

```go
func (t *Transport) dial(ctx context.Context, network, addr string) (net.Conn, error) {
   // ...
  c, err := t.Dial(network, addr)
  // ...
}
```

这里面调用的设置超时，会执行到

```go
/src/net/net.go
func (c *conn) SetDeadline(t time.Time) error {
	//...
	c.fd.SetDeadline(t)
	//...
}

//...

func setDeadlineImpl(fd *FD, t time.Time, mode int) error {
	// ...
	runtime_pollSetDeadline(fd.pd.runtimeCtx, d, mode)
	return nil
}


//go:linkname poll_runtime_pollSetDeadline internal/poll.runtime_pollSetDeadline
func poll_runtime_pollSetDeadline(pd *pollDesc, d int64, mode int) {
	// ...
  // 设置一个定时器事件
  rtf = netpollDeadline
	// 并将事件注册到定时器里
  modtimer(&pd.rt, pd.rd, 0, rtf, pd, pd.rseq)
}
```

上面的源码，简单来说就是，当第一次调用请求的，会建立个连接，这时候还会注册一个**定时器事件**，假设时间设了`3s`，那么这个事件会在`3s`后发生，然后执行注册事件的逻辑。而这个注册事件就是`netpollDeadline`。 **注意这个`netpollDeadline`，待会会提到。**

![读写协程定时器事件](https://cdn.xiaobaidebug.top/image/%E8%AF%BB%E5%86%99%E5%8D%8F%E7%A8%8B%E5%AE%9A%E6%97%B6%E5%99%A8%E4%BA%8B%E4%BB%B6.png)

设置了超时事件，且超时事件是 3s 后之后，发生。再次期间正常收发数据。一切如常。

直到`3s`过后，这时候看`读goroutine`，会等待网络数据返回。

```go
/src/net/http/tansport.go:1642
func (pc *persistConn) readLoop() {
	//...
	for alive {
		_, err := pc.br.Peek(1)  // 阻塞读取服务端返回的数据
	//...
}
```

然后就是一直跟代码。

```go
src/bufio/bufio.go: 129
func (b *Reader) Peek(n int) ([]byte, error) {
   // ...
   b.fill()
   // ...
}

func (b *Reader) fill() {
	// ...
	n, err := b.rd.Read(b.buf[b.w:])
	// ...
}

/src/net/http/transport.go: 1517
func (pc *persistConn) Read(p []byte) (n int, err error) {
	// ...
	n, err = pc.conn.Read(p)
	// ...
}

// /src/net/net.go: 173
func (c *conn) Read(b []byte) (int, error) {
	// ...
	n, err := c.fd.Read(b)
	// ...
}

func (fd *netFD) Read(p []byte) (n int, err error) {
	n, err = fd.pfd.Read(p)
	// ...
}

/src/internal/poll/fd_unix.go:
func (fd *FD) Read(p []byte) (int, error) {
	//...
  if err = fd.pd.waitRead(fd.isFile); err == nil {
    continue
  }
	// ...
}

func (pd *pollDesc) waitRead(isFile bool) error {
	return pd.wait('r', isFile)
}

func (pd *pollDesc) wait(mode int, isFile bool) error {
	// ...
  res := runtime_pollWait(pd.runtimeCtx, mode)
	return convertErr(res, isFile)
}

```

直到跟到 **runtime_pollWait**，这个可以简单认为是**等待服务端数据返回**。

```go
//go:linkname poll_runtime_pollWait internal/poll.runtime_pollWait
func poll_runtime_pollWait(pd *pollDesc, mode int) int {

	// 1.如果网络正常返回数据就跳出
  for !netpollblock(pd, int32(mode), false) {
    // 2.如果有出错情况也跳出
		err = netpollcheckerr(pd, int32(mode))
		if err != 0 {
			return err
		}
	}
	return 0
}
```

整条链路跟下来，就是会一直等待数据，等待的结果只有两个

- 有可以读的数据
- 出现报错

这里面的**报错**，又有那么两种

- 连接关闭
- 超时

```go
func netpollcheckerr(pd *pollDesc, mode int32) int {
	if pd.closing {
		return 1 // errClosing
	}
	if (mode == 'r' && pd.rd < 0) || (mode == 'w' && pd.wd < 0) {
		return 2 // errTimeout
	}
	return 0
}
```

其中提到的`超时`，就是指这里面返回的`数字2`，会通过下面的函数，转化为 `ErrTimeout`， 而 `ErrTimeout.Error()` 其实就是 `i/o timeout`。

```go
func convertErr(res int, isFile bool) error {
	switch res {
	case 0:
		return nil
	case 1:
		return errClosing(isFile)
	case 2:
		return ErrTimeout // ErrTimeout.Error() 就是 "i/o timeout"
	}
	println("unreachable: ", res)
	panic("unreachable")
}
```

那么问题来了。上面返回的超时错误，也就是**返回 2 的时候的条件是怎么满足的**？

```go
	if (mode == 'r' && pd.rd < 0) || (mode == 'w' && pd.wd < 0) {
		return 2 // errTimeout
	}
```

还记得刚刚提到的 `netpollDeadline`吗？

这里面放了定时器`3s`到点时执行的逻辑。

```go
func timerproc(tb *timersBucket) {
	// 计时器到设定时间点了，触发之前注册函数
	f(arg, seq) // 之前注册的是 netpollDeadline
}

func netpollDeadline(arg interface{}, seq uintptr) {
	netpolldeadlineimpl(arg.(*pollDesc), seq, true, true)
}

/src/runtime/netpoll.go: 428
func netpolldeadlineimpl(pd *pollDesc, seq uintptr, read, write bool) {
	//...
	if read {
		pd.rd = -1
		rg = netpollunblock(pd, 'r', false)
	}
	//...
}
```

这里会设置`pd.rd=-1`，是指 `poller descriptor.read deadline` ，含义**网络轮询器文件描述符**的**读超时时间**， 我们知道在 linux 里万物皆文件，这里的文件其实是指这次网络通讯中使用到的**socket**。

这时候再回去看**发生超时的条件**就是`if (mode == 'r' && pd.rd < 0) `。

至此。我们的代码里就收到了 `io timeout` 的报错。

## 总结

- 不要在 `http.Transport`中设置超时，那是连接的超时，不是请求的超时。否则可能会出现莫名 `io timeout`报错。

- 请求的超时在创建`client`里设置。

如果文章对你有帮助，看下文章底部右下角，做点正能量的事情（**点两下**）支持一下。（**疯狂暗示，拜托拜托，这对我真的很重要！**）

我是小白，我们下期见。

## 文章推荐：

- [妙啊! 程序猿的第一本互联网黑话指南](https://mp.weixin.qq.com/s/btksE3RUxtioSYrYpChEeQ)
- [程序员防猝死指南](https://mp.weixin.qq.com/s/PwIbKDTi0uSxhUWC56sJYg)
- [我感觉，我可能要拿图灵奖了。。。](https://mp.weixin.qq.com/s/rLLfj883lJbWr21wHAJTJA)
- [给大家丢脸了，用了三年 golang，我还是没答对这道内存泄漏题](https://mp.weixin.qq.com/s/T6XXaFFyyOJioD6dqDJpFg)
- [硬核！漫画图解 HTTP 知识点+面试题](https://mp.weixin.qq.com/s/T41YBEmG4lkxokDLzRxVgA)
- [TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解](https://mp.weixin.qq.com/s/PwIbKDTi0uSxhUWC56sJYg)
- [硬核图解！30 张图带你搞懂！路由器，集线器，交换机，网桥，光猫有啥区别？](https://mp.weixin.qq.com/s/BJqp72EyEMahxi2XOfSrBQ)

##### 别说了，一起在知识的海洋里呛水吧

关注公众号:**【小白 debug】**
![](https://cdn.xiaobaidebug.top/1696069689495.png)
