# QPS 的计算是怎么实现的？

面试的时候，面试官看着你做的项目，大概率会问一句，**这个项目(API)能支持多大 QPS**？

如果你是个已经工作有几年的程序员，那想必这个问题难不倒你。
但如果，我是说如果，面试官问你，你知道 **QPS 的计算是怎么实现的不，能详细说下思路吗？**
阁下又该如何应对呢？
这是个很有意思的问题，我们今天就来聊聊这个话题。
考虑到有不少读者还是学生，我们先来看下 **QPS 的含义**。

## QPS 是什么

**QPS（Queries Per Second）**,也就是“**每秒查询数**”，它表示服务器每秒能够处理的请求数量，是一个衡量服务器性能的重要指标。

![QPS是什么](https://cdn.xiaobaidebug.top/1708092177258.png)
比如说服务的用户查询 API 支持 100 QPS，就是指这个接口可以做到每秒查 100 次。
你务必**牢牢记住这个概念**，因为工作之后经常会听别人提起它。
很多面试官就特别爱问："你的这个项目（API）的读写性能怎么样，单个实例能支持多少 QPS？"。
这个问题就是个**照妖镜**。面试官可以通过这个问题了解你对项目的了解程度。
**如果你答不出来，那你在这个项目中很可能就不是核心开发，或者说你这个项目既不核心也不重要，甚至可能你就没做过这个项目。。。**
并且这个 QPS 数值还会有一个**合理范围**，有经验的开发能通过这个值判断这个服务 API 底层大概是咋样的。如果你回答的数值过小或过大，那又可以继续细聊过小和过大的原因。

我说下我目前接触下来比较合理的 QPS 范围：带了数据库的服务一般写性能在 5k 以下，读性能一般在 10k 以下，能到 10k 以上的话，那很可能是在数据库前面加了层缓存。如果你的服务还带了个文本算法模型，那使用了 gpu 的情况下 API 一般支持 100~400QPS 左右，如果是个同时支持文本和图片的模型，也就是所谓的多模态模型，那一般在 100QPS 以内。

![qps经验值](https://cdn.xiaobaidebug.top/1707141265996.png)

比如候选人上来就说服务单实例 API 读写性能都有上万 QPS, 那我可以大概猜到这**应该**是个纯 cpu+内存的 API 链路。但如果候选人还说这里面没做缓存且有数据库调用，那我可能会追问这里头用的是哪款数据库，底层是什么存储引擎？如果候选人还说这里面带了个文本检测的算法模型，那有点违反经验，那我会多聊聊细节，说不定这对我来说是个开眼界的机会。

## 如何计算 QPS ？

现在了解完 QPS 了，假设我们想要获得某个函数 的 QPS，该怎么做呢？  
这一般分两个情况：

- 1.**实时性要求较低**的监控场景。
- 2.**实时性要求较高**的服务治理场景。

![计算qps的两个场景](https://cdn.xiaobaidebug.top/1707141277540.png)

### 监控场景

监控服务 QPS 是最常见的场景，它对实时性要求不高。
如果我们想要查看服务的 QPS，可以在服务代码内部接入 `Prometheus` 的代码库，然后在每个需要计算 QPS 的地方，加入类似`Counter.Inc()`这样的代码，意思是函数执行次数加 1。这个过程也就是所谓的**打点**。

当函数执行到打点函数时，Prometheus 代码库内部会计算这个函数的调用次数，将数据写入到 `counter_xx.db` 的文件中，再同步到公司的`时序数据库`中，然后我们可以通过一些监控面板，比如 `grafana`调取时序数据库里的打点数据，在监控面板上通过特殊的表达式，也就是`PromQL`，对某段时间里的打点进行求导计算速率，这样就能看到这个函数的调用 QPS 啦。

![监控场景中获取qps](https://cdn.xiaobaidebug.top/1707142786480.png)

### 服务治理场景

跟监控面板查看服务 QPS 不同的是，我们有时候需要以**更高的实时性**获取 QPS。
比如在**服务治理**这一块，我们需要在服务内部加入一些中间层，实时计算服务 api 当前的 QPS，当它大于某个阈值时，可以做一些自定义逻辑，比如是直接拒绝掉一些请求，还是将请求排队等一段时间后再处理等等，也就是所谓的**限流**。  
这样的场景都要求我们实时计算出准确的 QPS，那么接下来就来看下这是怎么实现的？

#### 基本思路

计算某个函数的执行 QPS 说白了就是计算每秒内这个函数被执行了多少次。
我们可以参考监控场景的思路，用一个**临时变量 cnt** 记录某个函数的**执行次数**，每执行一次就给变量`+1`，然后计算单位时间内的变化速率。
公式就像这样：

```shell
QPS = (cnt(t) - cnt(t - Δt)) / Δt
```

其中 `cnt(t)` 表示在时间 `t` 的请求数，`Δt`表示时间间隔。
比如在第 9 秒的时候, cnt 是 80， 到第 10 秒的时候，cnt 是 100，那这一秒内就执行了` (100-80)/(10-9) = 20 次`, 也就是 20QPS。
![QPS怎么计算](https://cdn.xiaobaidebug.top/1707143413147.png)

#### 引入 bucket

但这样会有个问题，到了第 10 秒的时候，有时候我还想回去知道第 5 和第 6 秒的 QPS，光一个变量的话，数据老早被覆盖了，根本不够用。
于是我们可以将临时变量 cnt，改成了一个数组，数组里每个元素都用来存放(cnt(t) - cnt(t - Δt)) 的值。
数组里的每个元素，都叫 `bucket`.

![bucket数组](https://cdn.xiaobaidebug.top/1707224066407.png)

#### 调整 bucket 范围粒度

我们默认每个 bucket 都用来存放 1s 内的数据增量，但这**粒度比较粗**，我们可以调整为 200ms，这样我们可以获得更细粒度的数据。**粒度越细，意味着我们计算 QPS 的组件越灵敏，那基于这个 QPS 做的服务治理能力响应就越快**。
于是，原来用 1 个 bucket 存放 1s 内的增量数量，现在就变成要用 5 个 bucket 了。

![bucket粒度细化](https://cdn.xiaobaidebug.top/1707223958965.png)

#### 引入环形数组

但这样又引入一个新的问题，随着时间变长，**数组的长度就越长**，需要的内存就越多，最终导致进程申请的内存过多，被 `oom（Out of Memory） kill `了。
为了解决这个问题，我们可以为数组加入最大长度的限制，超过最大长度的部分，就从头开始写，覆盖掉老的数据。这样的数组，就是所谓的**环状数组**。

虽然环状数组听起来挺高级了，但说白了就是**一个用%取模来确定写入位置的定长数组**，没有想象的那么高端。  
比如数组长度是 5，数组 index 从 0 开始，要写 index=6 的 bucket， 计算 6%5 = 1，那就是写入 index=1 的位置上。

![bucket环形数组](https://cdn.xiaobaidebug.top/1707223987029.png)

#### 加入滑动窗口

有了环形数组之后，现在我们想要计算 qps，就需要引入**滑动窗口**的概念。这玩意听着玄乎，其实就是 `start` 和 `end` 两个变量。通过它来圈定我们要计算 qps 的 bucket 数组范围。
将当前时间跟 bucket 的粒度做**取模**操作，可以大概知道 `end` 落在哪个 bucket 上，确定了 end 之后，将 end 的时间戳减个 `1s`就能大概得到 `start` 在哪个 bucket 上，有了这两个值，**再将 start 到 end 范围内的 bucket 取出**。对范围内的 bucket 里的 cnt 求和，得到这段时间内的总和，再除以 Δt，也就是 1s。就可以得到 qps。
![引入滑动窗口](https://cdn.xiaobaidebug.top/1707224019053.png)
到这里 qps 的计算过程就介绍完了。

#### 如何计算平均耗时

既然 qps 可以这么算，那同理，我们也可以计算某个函数的**平均耗时**，实现也很简单，上面提到 bucket 有个用来统计调用次数的变量 cnt，现在再加个用来统计延时的变量 `Latency` 。每次执行完函数，就给 bucket 里的 Latency 变量 加上耗时。
再通过滑动窗口获得对应的 bucket 数组范围，计算 Latency 的总和，再除以这些 bucket 里的调用次数 cnt 总和。
就像下面这样：

```shell
函数的平均耗时 = Latency总和/cnt总和
```

于是就得到了这个函数的**平均耗时**。

#### sentinel-golang

看到这里，你应该对「怎么基于滑动窗口和 bucket 实现一个计算 QPS 和平均 Latency 的组件」有一定思路了。
但没代码，说再多好像也不够解渴，对吧？
其实，上面的思路，就是阿里开源的[sentinel-golang](github.com/alibaba/sentinel-golang)中 QPS 计算组件的实现方式。
sentinel-golang 是个著名的服务治理库，它会基于 QPS 和 Latency 等信息提供一系列限流熔断策略。  
如果你想了解具体的代码实现，可以去看下。链接是：

```shell
https://github.com/alibaba/sentinel-golang
```

但茫茫码海，从何看起呢？下面给出一些关键词，大家可以作为入口去搜索看下。
首先可以基于 `sliding_window_metric.go` 里的 `GetQPS` 开始看起，它是实时计算 QPS 的入口函数。
这里面会看到很多上面提到的内容细节，其中前面提到的**滑动窗口**，它在 sentinel-golang 中叫 `LeapArray`。
**bucket 环形数组**，在 sentinel-golang 中叫 `AtomicBucketWrapArray`。
环形数组里存放的 bucket 在代码里就是 `MetricBucket`，但需要注意的是 MetricBucket 里的 count 并不是一个数字类型，而是一个 map 类型，它将上面提到的 cnt 和 Latency 等都作为一种 key-value 来存放。以后想要新增字段就不需要改代码了，提高了代码**扩展性**。

## 最后

- QPS 指“每秒查询数”，是程序员必知必会的内容。建议多了解你负责的项目的 qps，以防面试官一问你三不知。
- 这篇文章介绍了代码实时计算 QPS 的实现细节，同时这也是著名的服务治理库 sentinel-golang 的实现原理，除了 golang 版本，它还有 java,cpp,js 版本的库，原理都大同小异，看完这篇文章等于一次性学了 4 个库，这波不亏。

# 参考文章：
- [golang进阶面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html)

- [golang基础面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html)

- [golang常用标准库第三方库大全](https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html)

- [golang学习路线](https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html)

