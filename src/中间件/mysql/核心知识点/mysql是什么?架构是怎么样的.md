
# mysql 是什么？架构是怎么样的？

![mysql是什么](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.0001.jpeg)

你是一个程序员，你做了一个网站应用，站点里的用户数据，需要存到某个地方，方便随时读写。

很容易想到可以将数据存到文件里。

但如果数据量很大，想从大量文件数据中查找某部分数据，并更新，是一件很痛苦的事情。

  

那么问题就来了，有办法可以解决这个问题吗？

好办，**没有什么是加一层中间层不能解决的，如果有，那就再加一层**。

这次我们要加的中间层是 **mysql**。

![mysql是数据和应用的中间层](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.002.jpeg)



  

## 什么是 mysql

Mysql数据库，是一款存放和管理数据的软件, 它介于**应用**和**数据**之间，通过一些设计，将大量数据，变成一张张像 excel 的数据表。为应用提供创建(Create), 读取(Read), 更新(Update), 删除(Delete)等核心操作。

![mysql是什么](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.003.jpeg)


我们来看下它是怎么实现的。

  

## 数据页

  

mysql 将数据组织成 excel 表的样子。

excel 文件在磁盘上是个**xls** 文件，mysql 的数据表也类似，在磁盘上则是个**ibd** 后缀的文件。

![ibd文件是什么](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.004.jpeg)


数据表越大，磁盘上的 ibd 文件也就越大。

直接读写一个大文件里的全部数据会很慢，所以 MySQL 将数据**拆成一个个数据页**，每页大小 **16KB**。这样我们读写部分表数据的时候，就只需要读取磁盘里的**几个数据页**就好。

![mysql将文件分成多个数据页](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.005.jpeg)


  
## 索引

  
但数据页那么多，查某条数据时，怎么知道要读哪些数据页？

好办，可以为每个数据页加入**页号**，再为每行数据加个**序号**，这个序号其实就是所谓的主键。


按主键大小排序，将每个数据页里**最小的主键序号和所在页的页号**提出来，放入到一个新生成的数据页中，并且给数据页加入**层级**的概念。

这样我们就可以通过上层的数据页**快速缩小查找范围**，加速查找数据页的过程。

现在页跟页之间看起来就像是一棵倒过来的树，这棵可以加速查找数据页的树，就是我们常说的**B+树**索引。

![B+树索引](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.006.jpeg)


上面提到的是针对主键的索引，也就是**主键索引**。

![主键索引](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.007.jpeg)

按同样的思路，也可以为**其他数据表的列**去建立**索引**，比如用户表的名称字段，这样我们就能快速查找到名字为 xx 的用户有哪些，这就是所谓的**辅助索引**。

![辅助索引](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.008.jpeg)


## Buffer Pool

  

但就算有了索引，数据也还是在**磁盘**上。每次都读磁盘太慢了。有办法提升下性能吗？

有！在**磁盘数据**和**应用**之间，加一层进程内**缓存**，缓存里装的就是前面提到的 16KB 数据和索引页, 它就是所谓的 **Buffer Pool**。

![buffer pool是什么](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.009.jpeg)


读数据的时候优先读 Buffer Pool，有数据就返回，没数据才去磁盘里读取，减少了读磁盘的次数，大大提升了性能。

但问题就来了，我们知道，文件读取，**默认**会先将文件数据加载到**操作系统的文件缓存**中，同样都是缓存，为什么还要整 Buffer Pool 这死出？

这是因为进程自己维护的 Buffer Pool ，可以定制更多缓存**策略**，还能实现**加锁**等各种数据表高级特性。

也正是因为已经有了 Buffer Pool，所以也就没必要使用操作系统的文件缓存了，所以 Buffer Pool 通过"**直接 I/O**" 模式, **绕过**操作系统的缓存机制，**直接**从磁盘读写数据。

![buffer pool直接IO](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.010.jpeg)


## 自适应 hash 索引

  

就算有了 buffer pool，要查到某个数据页，也依然要查找 B+树，查询复杂度 **O(lgn)**。能更快吗？

能！可以使用查询复杂度为 **O(1)**的 hash 表进行优化。

记录每个数据页的查询频率，对于热点数据页，我们以查询的**值**为 **key**，**数据页地址**为 **value**，构建 hash 表。

比如name为 `'xiaobai' 的数据页，`被频繁查询，那 **key** 就是 xiaobai，**value** 就是包含 xiaobai 记录的数据页的地址。

![哈希的key和value](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.012.jpeg)


这个 hash 表，就是所谓的**自适应哈希索引**，**Adaptive Hash Index**。

![自适应哈希](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.013.jpeg)

  

## Change Buffer

  

有了**自适应 hash 索引**的加持，读性能提高了。那写性能也能优化吗？

能！

大部分数据表，除了主键索引外，我们还会加一些辅助索引。比如对用户名加个**辅助索引**。

那对于这类数据表的写操作，更新完主键索引的**数据页**之后，还需要更新**辅助索引页**。这样读取辅助索引页的磁盘 IO 必然少不了。

![更新主键和辅助索引](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.014.jpeg)


怎么办呢？我们可以先将要**写入的数据**收集到一块**内存里**，等哪天磁盘里的索引页正好被读入 Buffer pool 的时候，再将写入数据应用到索引页中。

通过这个方式减少大量的磁盘 IO，提升性能。

而这个将写操作收集起来的地方，就是所谓的 **Change Buffer**，它其实是 Buffer pool 的一部分。
  ![Change Buffer的更新流程](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.015.jpeg)


## Undo Log

  

在数据库中，有一个叫**事务**的概念。不了解没关系，说白了，就是可以让多行数据，要么**同时**更新成功，要么**同时**更新失败。也就是所谓的**原子性**。

![事务是什么](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.016.jpeg)


为了实现这一点，我们就需要知道写数据时每行数据**原来长啥样**，方便对更新后的数据行，进行**回滚**，因此就有了 **Undo Log**。

![undo log回滚](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.017.jpeg)


更新 buffer pool 数据页的时候，

会用旧数据生成 undo log 记录，存储在 Buffer Pool 中的特殊 undo log 内存页中。

并随着 buffer pool 的刷盘机制，不定时写入到磁盘的 **undo log 文件**中。

  ![undo log的写入流程](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.018.jpeg)


## Redo Log

  

上面提到的都是 buffer pool 相关的内容，它们本质上都是内存。

如果内存数据只写了一半到磁盘中，数据库进程就崩了，那**一个事务**里的多行数据就没能做到"同时更新成功"。

怎么办呢？

好办，我们将事务中更新数据行的操作都写入到 **redo log buffer** 内存中，然后在**事务提交**的时候进行 redo log 刷磁盘，将数据固化到 **redo log 文件**中。

数据库**进程崩溃重启**后，就能通过 redo log file 找到历史操作记录，**重做**数据。保证了事务里的多行数据变更，要么都成功，要么都失败。

  ![redo log的写入流程](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.019.jpeg)


这时候问题就来了，我有这功夫更新 redo log file 文件，直接将 buffer pool 的数据写入到磁盘不香吗？

![为什么不直接写磁盘数据页](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.020.jpeg)


不太一样，redo log file 是**顺序**写入的，buffer pool 的内存数据是**随机分散**在磁盘各处的，**顺序写磁盘性能是随机写的几十倍**，所以很多存储系统在写数据时都会搞个日志来记录操作，方便服务重启后进行数据对账，确保数据的一致性和完整性，这类操作就是所谓的 **Write-Ahead Logging (WAL)** 。

![顺序写比随机写快很多](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.0211.jpeg)



但问题又来了，redo log buffer 也是内存，buffer pool 也是内存，如果 redo log buffer 里的数据还没来得及写入到 redo log，数据库进程就崩了，那 redo log buffer 里的数据不也丢了吗？

是的，所以 redo log 的作用并不是保证所有数据不丢失，而是确保已提交事务的变更不会丢失。但因为 redo log 刷盘频率很高，所以丢失数据的概率很低。

**redo log 本质上是写入性能和数据完整性折中的产物**，做架构就是这样，做到最后总是需要通过牺牲某些东西去换取另一样东西，果然，程序员才是真正的炼金术师。

  

## Innodb 是什么

  

我们将上面提到的内容，分为**内存**和**磁盘**两部分，一部分是内存里的自适应哈希，buffer pool，以及 redo log buffer。另一部分是磁盘里存放行数据和索引的.ibd 文件, 以及 undo log, redo log 等文件。它们共同构成了 **innodb 存储引擎**。并对外提供一系列函数接口。

比如操作数据行的 write_row(), update_row()，以及操作数据表的 create(), drop()等等接口。

我们平时写的 SQL 语句，最终都会转换成 InnoDB 提供的这些接口函数调用。

![innodb提供的函数接口](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.023.jpeg)

比如：

  

- INSERT 语句会调用 write_row() 接口来插入数据行。
    
- UPDATE 语句会调用 update_row() 接口来更新数据行。
    
- CREATE TABLE 语句会调用 create() 接口来创建新表。
    
- DROP TABLE 语句会调用 drop() 接口来删除表。
    

  

但问题就来了，我们平时读写 mysql 用的 sql 语句，是怎么转成存储引擎的函数接口的呢？

那就需要介绍 Server 层了。

  
## Server 层是什么

**Server 层**，本质上是 sql 语句 和 innodb 存储引擎之间的中间层。

![server层](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.024.jpeg)


在 Server 层内提供一个**连接管理模块**，用于管理来自应用的网络连接。

并提供一个**分析器**，用于判断 SQL 语句有没有语法错误，比如 select，是不是少打了一个`l`。

再提供一个**优化器**，用于**根据一定的规则选择该用什么索引**，生成执行计划。

之后，提供一个**执行器**，根据执行计划去调用**Innodb 存储引擎**的接口函数。

![server层做了哪些事情](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.025.jpeg)


**server 层**和**存储引擎层**共同构成了一个完整的数据库，它就是我们常说的 **Mysql 数据库**。

  ![mysql是什么](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.026.jpeg)


并且，server 层和存储引擎层是通过接口函数进行**解耦**的，换句话说就是，只要实现了上面这些接口函数，就能作为存储引擎与 Server 层对接。

![引擎解耦](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.027.jpeg)


比如，mysql 早期用的是 **myisam** 存储引擎，后来才支持的 **innodb**。

  ![常用存储引擎有哪些](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.028.jpeg)


  

## binlog 是什么

  

你听说过删库跑路吧，为了防止数据库表被删除带来的影响， server 层会将历史上**所有变更操作记录到磁盘上的日志文件中**，这个日志文件就是所谓的 **binlog**。一旦误删表，就可以利用 binlog 来恢复数据。

那么问题就来了，innodb 有一个 **redo log** 也做类似的事情，为什么还要多此一举？评论区告诉我答案。

这是因为 redo log 是**环状**写入的，后面写的内容最终会覆盖前面的内容，也就是不会记录所有历史写操作，而 binlog 却会记录**所有**历史变更。并且 binlog 位于 server 层，这样不管底层的存储引擎是什么，都能复用这部分能力。

![binlog写入流程](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.0291.jpeg)

## Mysql 主从架构

由于 binlog 记录了一个 mysql 的所有变更操作，因此我们还可以利用 binlog 数据，"**复制**"一个新的 mysql 出来。原来的 master 叫**主**数据库，复制出来的则是**从**数据库，主数据库负责承接**写**流量，从数据库负责**读**流量，这样就可以让 mysql 承接更高的读写流量。它就是经典的 **mysql 主从同步架构**。

## 数据库查询更新流程

接下来我们用实际例子将上面提到的内容串起来。
首先不管是查询还是更新操作，客户端都会先跟 mysql 建立网络连接，并将 sql 发送到 **server 层**，经过**分析器**解析 sql 语法、**优化器**选择索引生成执行计划，最终给到**执行器**调用 InnoDB 的函数接口。

- 对于**读操作**。InnoDB**存储引擎**会先检查 **Buffer Pool** 中是否存在所需的 B+树数据页，如果存在则直接返回数据。如果 Buffer Pool 中没有所需的数据页，则会从**磁盘**中读取相应的数据页加载到 Buffer Pool 中，再返回数据。同时，如果查询的数据是热点数据，还会将数据页加入到**自适应哈希索引**豪华套餐中，加速后续的查询。

- 对于**写操作**，则会先将数据写入 **Buffer Pool**，并生成相应的 **Undo Log** 记录，以便在事务回滚时能够恢复数据的原始状态。接下来，会将写操作记录到 Redo Log Buffer 中，这些 redo log 会周期性地写入到磁盘中的 **Redo Log 文件**中，就算数据库崩了，已提交的事务也不会丢失。对于**辅助索引**的更新操作，InnoDB 会将这些更新暂时存储在 **Change Buffer** 中，等到相关的索引页被读取到 Buffer Pool 时再进行实际的更新操作，从而减少磁盘 I/O，提高写入性能。同时，所有的变更都会记录到 server 层的 **binlog** 中，以便进行数据恢复。

![mysql架构总览图](https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.030.jpeg)

现在大家通了吗？

  

## 总结

- mysql 分为 server 层和存储引擎层。存储引擎层可更换，既可以是 myisam，也可以是 innodb。当前用 innodb 更多。
    
- innodb 分为内存和磁盘两部分，一部分是内存里的自适应 hash，buffer bool，以及 redo log buffer。另一部分是磁盘里存放行数据和索引的.ibd 文件, 以及 undo log, redo log 等文件。
    
- mysql server 层会通过 binlog 记录数据库变更操作，binlog 可以用于数据恢复，也可以用于主从同步等场景。
    

如果你觉得这篇文章对你有帮助，记得转发给你那不成器的兄弟。最后遗留一个问题，你听说过 HDFS 吗？你知道它的架构是怎么样的吗？如果你感兴趣，记得关注，我会在下期聊聊这个话题。我们下期见！

## 文章推荐：
- [golang进阶面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html)

- [golang基础面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html)

- [golang常用标准库第三方库大全](https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html)

- [golang学习路线](https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html)
