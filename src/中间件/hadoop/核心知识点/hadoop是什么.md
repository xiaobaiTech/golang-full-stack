  

# Hadoop是什么，架构是怎么样的

你是一个程序员，你做了一个商城网站，里面的东西卖的太好了，每天都会产生巨量的用户行为和订单数据，通过分析海量的数据，老板得出一个惊人结论：程序员消费力不如狗。

从技术的角度看，这是一个将海量数据先存起来，再将数据拿出来进行计算，并得到结果的过程。

如果使用 mysql 数据库将这海量数据存起来，再执行 sql 进行统计，大概率直接卡死。

那么问题来了，怎么读写这类海量数据场景呢？

没有什么是加一层中间层不能解决的，如果有，那就再加一层。

这次我们要加的是 Hadoop 全家桶和它的朋友们。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.002.png)

  

## Hadoop 是什么？

  

像我们平时用的 mysql，处理个几百 GB 数据就已经比较极限了。如果数据再大点，比如 TB，PB 这样的规模，我们就称它为**大数据**。

它不仅数据规模大，增长速度也非常快。mysql根本扛不住。

所以需要有专门的工具做处理。Hadoop 就是一套专门用于大数据处理的工具, 内部由多个组件构成。

你可以将它理解为应用和大数据之间的一个中间层。

以前数据量小的时候，应用程序读写 mysql，现在数据量大了，应用程序就改为读写 Hadoop全家桶。

Hadoop 为应用程序屏蔽了大数据的一些处理细节，对外提供一系列的读写 API, 应用通过调用 API，实现对大数据的处理。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.003.png)


我们来看下它是怎么做到的。

  

## 大数据怎么处理

  

大数据之所以难处理，本质原因在于它**大**。所以解决思路也很简单，核心只有一个字，那就是"**切**", 将处理不过来的大数据，**切分**成一份份处理得过来的小数据。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.004.png)


对小份数据进行**存储**，**计算**等一系列操作。

所以 Hadoop 要解决的核心问题有两个，一个是**怎么存**，另一个是**怎么算**？

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.005.png)


  

## 怎么存

  

对于 TB,PB 级别的大数据，一台服务器的硬盘装不下，我们就用多台服务器的硬盘来装。

文件太大，那就切。我们可以将大文件切分成一个个 128MB 的数据块，也就是block。

![](https://cdn.xiaobaidebug.top/hadoop%2525E9%252585%25258D%2525E5%25259B%2525BE.006.png)

放到多台服务器硬盘上，怕一台数据崩了影响数据完整性，那就多复制几份数据在多台服务器备份着。这些存放数据的服务器，就叫 datanode.

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.007.png)


以前我们只需要从一台服务器里读写数据，现在就变成了需要在多台服务器里读写数据，因此需要有一个软件为我们屏蔽多台服务器的读写复杂性，这个负责切分和存储数据的分布式软件，就叫 HDFS，全名 Hadoop Distributed File System，也就是 Hadoop 的分布式文件系统。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.008.png)

  

## 怎么算

  

大数据的存储问题是解决了，那怎么对大数据进行计算呢？

比如，我们需要统计商城所有用户订单的性别和消费金额。

假设商城的全部订单数据共1280G，想从HDFS全部加载到内存中做计算，没有一台服务器扛得住，有解法吗？

有！跟存储类似，也将数据切分为很多份，每份叫一个**分片**，也就是 split, 分给多个服务器做计算，然后再将结果聚合起来就好啦。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.009.png)


但每个服务器怎么知道该怎么计算分片数据呢？

当然是由我们来告诉它们！

我们需要定义一个 map 函数，告诉计算机，每个**分片**数据里的每行订单数据该怎么算。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.010.png)


再定义一个 reduce 函数，告诉计算机 map 函数算好的结果怎么汇总起来计算最终结果。


![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.011.png)


这个从hdfs中获取数据，再切分数据为多个分片，执行计算任务并汇总的过程非常通用，用户只需要自定义里面的 map 和 reduce 函数就能满足各种定制化需求，所以我们可以抽象为一个通用的代码库，说好听点，又叫框架，它就是所谓的 MapReduce。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.012.png)


  

## Yarn 是什么

  

看到这里问题又来了，MapReduce 的计算任务的数量都这么多，每个任务都需要cpu和内存等服务器计算资源，怎么管理和安排这些计算任务，到哪些服务器节点跑数据呢？

很容易想到，我们可以在计算任务和服务器之间，加一个中间层。

也就是大名鼎鼎的 yarn, 全名 Yet Another Resource Negotiator, 让它来负责资源的管理。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.015.png)


它将每个计算任务所需要的资源抽象为**容器**，Container，它本质上其实就是个被限制了 cpu 和内存等计算资源的 jvm 虚拟机进程，容器内运行计算任务代码。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.016.png)


> yarn 的容器跟 docker/k8s 的容器概念上有点像，但终究不是一回事。具体区别是什么，评论区告诉我。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.017.png)

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.018.png)

yarn会根据MapReduce这类计算框架的需求，分配容器资源，再由计算框架将计算任务调度到，已分配的服务器容器上运行。通过一系列的资源申请+协调调度，完成 map 和 reduce 的计算任务并最终得到计算结果。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.019.png)


> yarn 和 之前视频里介绍的k8s 做的事情有点像，它们的区别是什么，看爽了就评论区告诉我。

## Hadoop 是什么

  

到这里，我们用 hdfs 解决了大数据的存储问题，用 mapreduce 解决了大数据计算问题，用 yarn 解决了 mapreduce 的计算资源管理问题，它们三个核心组件，共同构成了 Hadoop 大数据处理框架。

  

## Hive 是什么

  

到这里问题又又来了，以前数据存在 mysql 的时候，我想统计下数据，做下数据分析，只需要写点 sql。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.020.png)

  

而现在，在大数据场景下，却要我写那么多 map 和 reduce 函数。

你搁这跟我开玩笑呢？这不变相逼着产品运营 BI 天天按着我写 mapreduce 代码吗？

我能写代码，不代表我喜欢写代码！

我自嘲是牛马可以，你不能真把我当牛马吧，那该怎么办呢？

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.021.png)


  

为了让数据分析人员能够像使用 SQL 一样方便地查询大数据，我们需要一个工具来简化这个过程。

它就是 Hive。你可以将它理解为 sql 和 mapreduce 的一个中间层。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.023.png)

它可以将用户输入的类似 SQL 的查询语言解析转换成一个个复杂的 mapreduce 任务，运行并最终输出计算结果。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.024.png)


这样，不会写代码的人也可以通过写 sql 读写大数据。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.022.png)


  

## Spark和Flink 是什么

现在做一次数据分析，Hadoop就得用Hive解析sql，跑mapreduce任务。一不小心半小时就过去了。有办法更快吗？

有！MapReduce 会把计算过程中产生的中间结果放在磁盘中，这就导致需要频繁读写磁盘文件，略慢。

为了提升性能，可以将中间结果放在内存中，内存放不下才放磁盘，那处理速度不就上来了吗，基于这个思路，大佬们设计了Spark, 你可以将它简单理解为是通过内存强化性能的 MapReduce。

![](https://cdn.xiaobaidebug.top/hadoop%2525E9%252585%25258D%2525E5%25259B%2525BE.026.png)

以前 Hive 可以将 sql 转化为 Mapreduce 的任务，现在同样也可以通过一个叫 Hive on Spark 的适配层接入 Spark ，将 sql 转化为 spark 任务. 这样 sql 查询的性能也能得到提升。

![](https://cdn.xiaobaidebug.top/hadoop%2525E9%252585%25258D%2525E5%25259B%2525BE.027.png)

但毕竟 hive 本身不是为 spark 设计的，所以大佬们又设计了 spark sql。它跟 hive 是类似的东西，但跟 spark 搭配起来，性能更好。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.028.png)

但不管是mapreduce还是 Spark， 都是为离线数据处理设计的，说白了就是数据是一批一批处理的，一条数据来了，得攒够一批才会被处理. 攒的过程会浪费一些时间，所以为了更高的实时性，大佬们又又设计了 flink, 数据来一条就处理一条，完美应对了实时性要求较高的在线数据处理场景。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.029.png)


## Hbase是什么

虽然现在大数据存算问题及处理问题都解决了。但用hive从海量数据里读写一两条数据，依然是接近分钟级别的操作， flink虽然实时性高，但一般面向数据处理，而不是在线读写场景。有办法像mysql那样，在毫秒级别完成实时在线读写吗？

基于这个痛点，大佬们又设计了分布式数据库Hbase，用于在海量数据中高并发读写数据的场景。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.030.png)


最后我们用一个例子将它们串起来。

  

## 写数据

  

在大数据场景下，我们将数据写入到 hdfs 中的多个 datanode 中。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.031.png)


## 读数据

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.032.png)


在数据分析场景，用户将写好的 sql，输入到 hive 中，hive 会将 sql 解析为多个 mapreduce 计算任务，配合 yarn的资源调度，mapreduce这类计算框架，将这些计算任务分发到多个服务器上，再将计算好的结果汇总后，得到最终结果，最后返回给用户。完成读数据。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.033.png)


当然如果追求性能，也可以将 hive 换成 spark sql，将 mapreduce 换成 spark，通过内存加速整个读数据的过程。对于实时性要求高的场景，可以使用flink。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.034.png)

对于在线实时查询场景，可以通过hbase，实现海量数据的毫秒级查询。

![](https://cdn.xiaobaidebug.top/hadoop%25E9%2585%258D%25E5%259B%25BE.035.png)


现在大家通了吗？

好啦，如果你觉得这期视频对你有帮助，记得转发给你那不成器的兄弟。文字版的笔记，见评论区。

最后遗留一个问题，你听说过Mongodb吗？你知道它是怎么被设计出来的吗？有Mysql为什么还要有Mongodb？

视频点赞超过 1w，下期聊聊这个话题。如果你感兴趣，记得关注！我们下期见！

  

  

## 总结

- Hadoop 是一个开源的大数据处理框架，主要用于存储和处理大数据。它要解决的核心问题有两个，一个是**怎么存**，另一个是**怎么算**

- 大数据之所以难处理，本质原因在于它大。所以解决思路也很简单，核心只有一个字，那就是"**切**",

- Hdfs 将处理不过来的大数据**切分**成一份份处理得过来的小数据块。每个 128MB，存到多个 DataNode 中，解决了存储的问题。

- MapReduce 则通过一套代码框架，将数据处理抽象为 map 和 reduce 两个阶段，用户只要实现这两个函数，框架就会将大数据的处理**切分**成一个个小任务，完成计算。

- yarn 本质上是计算任务和服务器之间的一个中间层，通过一系列协调调度，将计算任务调度到合适的服务器上运行，完成 map 和 reduce 的计算任务并最终得到最终计算结果。