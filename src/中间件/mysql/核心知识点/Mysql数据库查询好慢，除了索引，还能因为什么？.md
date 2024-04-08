# mysql 数据库查询好慢，除了索引，还能因为什么？

<br>

我熟练应用 ctrl c 和 ctrl v 开发 curd 代码好多年了。

mysql 查询为什么会慢，关于这个问题，在实际开发经常会遇到，而面试中，也是个高频题。

遇到这种问题，我们一般也会想到是因为索引。

**那除开索引之外，还有哪些因素会导致数据库查询变慢呢？**

**有哪些操作，可以提升 mysql 的查询能力呢？**

今天这篇文章，我们就来聊聊会导致数据库查询变慢的场景有哪些，并给出原因和解决方案。

<br>

### 数据库查询流程

我们先来看下，一条查询语句下来，会经历哪些流程。

比如我们有一张数据库表

```sql
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '名字',
  `age` int(11) NOT NULL DEFAULT '0' COMMENT '年龄',
  `gender` int(8) NOT NULL DEFAULT '0' COMMENT '性别',
  PRIMARY KEY (`id`),
  KEY `idx_age` (`age`),
  KEY `idx_gender` (`gender`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
```

我们平常写的应用代码（go 或 C++之类的），这时候就叫**客户端**了。

客户端底层会带着账号密码，尝试向 mysql 建立一条 TCP 长链接。

mysql 的**连接管理模块**会对这条连接进行管理。

建立连接后，客户端执行一条查询 sql 语句。 比如：

```sql
select * from user where gender = 1 and age = 100;
```

客户端会将 sql 语句通过网络连接给 mysql。

mysql 收到 sql 语句后，会在**分析器**中先判断下 SQL 语句有没有语法错误，比如 select，如果少打一个`l`，写成`slect`，则会报错`You have an error in your SQL syntax; `。这个报错对于我这样的手残党来说可以说是很熟悉了。

接下来是**优化器**，在这里会**根据一定的规则选择该用什么索引**。

之后，才是通过**执行器**去调用**存储引擎**的接口函数。

![Mysql架构](https://cdn.xiaobaidebug.top/Mysql%E6%9E%B6%E6%9E%8456.drawio.png)

**存储引擎**类似于一个个组件，它们才是 mysql 真正获取一行行数据并返回数据的地方，存储引擎是可以替换更改的，既可以用不支持事务的 MyISAM，也可以替换成支持事务的 Innodb。这个可以在建表的时候指定。比如

```sql
CREATE TABLE `user` (
  ...
) ENGINE=InnoDB;
```

现在最常用的是**InnoDB**。

我们就重点说这个。

InnoDB 中，因为直接操作磁盘会比较慢，所以加了一层内存提提速，叫**buffer pool**，这里面，放了很多内存页，每一页 16KB，有些内存页放的是数据库表里看到的那种一行行的数据，有些则是放的索引信息。

![bufferPool与磁盘](https://cdn.xiaobaidebug.top/image/bufferPool%E4%B8%8E%E7%A3%81%E7%9B%982.png)

查询 SQL 到了 InnoDB 中。会根据前面优化器里计算得到的索引，去**查询相应的索引页**，如果不在 buffer pool 里则从磁盘里加载索引页。**再通过索引页加速查询，得到数据页**的具体位置。如果这些数据页不在 buffer pool 中，则从磁盘里加载进来。

这样我们就得到了我们想要的一行行数据。

![索引页与磁盘页的关系](https://cdn.xiaobaidebug.top/image/%E7%B4%A2%E5%BC%95%E9%A1%B5%E4%B8%8E%E7%A3%81%E7%9B%98%E9%A1%B5%E7%9A%84%E5%85%B3%E7%B3%BB.png)

最后将得到的数据结果返回给客户端。

<br>

### 慢查询分析

如果上面的流程比较慢的话，我们可以通过开启`profiling`看到流程慢在哪。

```sql
mysql> set profiling=ON;
Query OK, 0 rows affected, 1 warning (0.00 sec)

mysql> show variables like 'profiling';
+---------------+-------+
| Variable_name | Value |
+---------------+-------+
| profiling     | ON    |
+---------------+-------+
1 row in set (0.00 sec)
```

然后正常执行 sql 语句。

这些 SQL 语句的执行时间都会被记录下来，此时你想查看有哪些语句被记录下来了，可以执行 `show profiles;`

```sql
mysql> show profiles;
+----------+------------+---------------------------------------------------+
| Query_ID | Duration   | Query                                             |
+----------+------------+---------------------------------------------------+
|        1 | 0.06811025 | select * from user where age>=60                  |
|        2 | 0.00151375 | select * from user where gender = 2 and age = 80  |
|        3 | 0.00230425 | select * from user where gender = 2 and age = 60  |
|        4 | 0.00070400 | select * from user where gender = 2 and age = 100 |
|        5 | 0.07797650 | select * from user where age!=60                  |
+----------+------------+---------------------------------------------------+
5 rows in set, 1 warning (0.00 sec)
```

关注下上面的`query_id`，比如`select * from user where age>=60 `对应的 query_id 是 1，如果你想查看这条 SQL 语句的具体耗时，那么可以执行以下的命令。

```sql
mysql> show profile for query 1;
+----------------------+----------+
| Status               | Duration |
+----------------------+----------+
| starting             | 0.000074 |
| checking permissions | 0.000010 |
| Opening tables       | 0.000034 |
| init                 | 0.000032 |
| System lock          | 0.000027 |
| optimizing           | 0.000020 |
| statistics           | 0.000058 |
| preparing            | 0.000018 |
| executing            | 0.000013 |
| Sending data         | 0.067701 |
| end                  | 0.000021 |
| query end            | 0.000015 |
| closing tables       | 0.000014 |
| freeing items        | 0.000047 |
| cleaning up          | 0.000027 |
+----------------------+----------+
15 rows in set, 1 warning (0.00 sec)
```

通过上面的各个项，大家就可以看到具体耗时在哪。比如从上面可以看出 Sending data 的耗时最大，这个是指**执行器**开始查询数据并将数据发送给客户端的耗时，因为我的这张表符合条件的数据有**好几万条**，所以这块耗时最大，也符合预期。

一般情况下，我们开发过程中，耗时大部分时候都在`Sending data`阶段，而这一阶段里如果慢的话，最容易想到的还是索引相关的原因。

<br>

### 索引相关原因

索引相关的问题，一般能用 explain 命令帮助分析。通过它能看到**用了哪些索引**，大概会**扫描多少行**之类的信息。

mysql 会在**优化器阶段**里看下选择哪个索引，查询速度会更快。

一般主要考虑几个因素，比如：

- 选择这个索引大概要扫描**多少行**（rows）
- 为了把这些行取出来，需要读**多少个 16kb 的页**
- 走普通索引需要回表，主键索引则不需要，**回表成本**大不大？

<br>

回到 show profile 中提到的 sql 语句，我们使用`explain select * from user where age>=60` 分析一下。

![explain sql](https://cdn.xiaobaidebug.top/image/image-20220319080215281.png)

上面的这条语句，使用的`type`为 ALL，意味着是**全表扫描**，`possible_keys`是指**可能用得到的索引**，这里可能使用到的索引是为 age 建的普通索引，但实际上数据库使用的索引是在`key`那一列，是`NULL`。也就是说**这句 sql 不走索引，全表扫描**。

这个是因为数据表里，符合条件的数据行数（`rows`）太多，如果使用 age 索引，那么需要将它们从 age 索引中读出来，并且 age 索引是**普通索引**，还需要**回表**找到对应的**主键**才能找到对应的**数据页**。算下来还不如直接走主键划算。于是最终选择了全表扫描。

当然上面只是举了个例子，实际上，mysql 执行 sql 时，**不用索引或者用的索引不符合我们预期**这件事经常发生，索引失效的场景有很多，比如用了**不等号，隐式转换**等，这个相信大家背八股文的时候也背过不少了，我也不再赘述。

聊两个生产中容易遇到的问题吧。

<br>

#### 索引不符合预期

实际开发中有些情况比较特殊，比如有些数据库表一开始数据量小，索引少，执行 sql 时，确实使用了符合你预期的索引。但随时时间边长，开发的人变多了，数据量也变大了，甚至还可能会加入一些其他重复多余的索引，就有可能出现用着用着，用到了不符合你预期的其他索引了。从而导致查询突然变慢。

这种问题，也好解决，可以通过`force index`**指定索引**。比如

![force index指定索引](https://cdn.xiaobaidebug.top/image/image-20220319093631814.png)

通过`explain`可以看出，加了 force index 之后，sql 就选用了 idx_age 这个索引了。

<br>

#### 走了索引还是很慢

有些 sql，用`explain`命令看，明明是走索引的，但还是很慢。一般是两种情况：

第一种是索引区分度太低，比如网页全路径的 url 链接，这拿来做索引，一眼看过去全都是同一个域名，如果**前缀索引**的长度建得不够长，那这走索引跟走**全表扫描**似的，正确姿势是尽量让索引的**区分度**更高，比如域名去掉，只拿后面 URI 部分去做索引。

![索引前缀区分度太低](https://cdn.xiaobaidebug.top/image/%E7%B4%A2%E5%BC%95%E5%89%8D%E7%BC%80%E5%8C%BA%E5%88%86%E5%BA%A6%E5%A4%AA%E4%BD%8E.drawio.png)

第二种是索引中匹配到的数据太大，这时候需要关注的是 explain 里的**rows**字段了。

它是用于**预估**这个查询语句需要查的行数的，它不一定完全准确，但可以体现个大概量级。

当它很大时，一般常见的是下面几种情况。

- 如果这个字段具有**唯一**的属性，比如电话号码等，一般是不应该有大量重复的，那可能是你代码逻辑出现了**大量重复插入**的操作，你需要检查下代码逻辑，或者需要加个**唯一索引**限制下。

- 如果这个字段下的数据就是会很大，是否需要全部拿？如果不需要，加个`limit`限制下。如果确实要拿全部，那也不能一次性全拿，今天你数据量小，可能一次取一两万都没啥压力，万一哪天涨到了十万级别，那一次性取就有点吃不消了。你可能需要**分批次取**，具体操作是先用`order by id`排序一下，拿到一批数据后取`最大id`作为下次取数据的起始位置。

<br>

### 连接数过小

索引相关的原因我们聊完了，我们来聊聊，**除了索引之外，还有哪些因素会限制我们的查询速度的。**

我们可以看到，mysql 的 server 层里有个**连接管理**，它的作用是管理客户端和 mysql 之间的长连接。

正常情况下，客户端与 server 层如果只有**一条**连接，那么在执行 sql 查询之后，只能阻塞等待结果返回，如果有大量查询同时并发请求，那么**后面的请求都需要等待前面的请求执行完成**后，才能开始执行。

![连接过少会导致sql阻塞](https://cdn.xiaobaidebug.top/image/%E8%BF%9E%E6%8E%A5%E8%BF%87%E5%B0%91%E4%BC%9A%E5%AF%BC%E8%87%B4sql%E9%98%BB%E5%A1%9E.png)

因此很多时候我们的应用程序，比如 go 或 java 这些，**会打印出 sql 执行了几分钟的日志，但实际上你把这条语句单独拎出来执行，却又是毫秒级别的。**这都是因为这些 sql 语句在**等待**前面的 sql 执行完成。

怎么解决呢？

如果我们能**多建几条连接**，那么请求就可以并发执行，后面的连接就不用等那么久了。

![增加连接可以加快执行sql](https://cdn.xiaobaidebug.top/image/%E5%A2%9E%E5%8A%A0%E8%BF%9E%E6%8E%A5%E5%8F%AF%E4%BB%A5%E5%8A%A0%E5%BF%AB%E6%89%A7%E8%A1%8Csql.png)

而连接数过小的问题，**受数据库和客户端两侧同时限制**。

<br>

#### 数据库连接数过小

mysql 的最大连接数默认是`100`, 最大可以达到`16384`。

可以通过设置 mysql 的`max_connections`参数，更改数据库的最大连接数。

```sql
mysql> set global max_connections= 500;
Query OK, 0 rows affected (0.00 sec)

mysql> show variables like 'max_connections';
+-----------------+-------+
| Variable_name   | Value |
+-----------------+-------+
| max_connections | 500   |
+-----------------+-------+
1 row in set (0.00 sec)
```

上面的操作，就把最大连接数改成了 500。

<br>

#### 应用侧连接数过小

数据库连接大小是调整过了，但貌似问题还是没有变化？还是有很多 sql 执行达到了几分钟，甚至超时？

那有可能是因为你应用侧（go，java 写的应用，也就是 mysql 的客户端）的连接数也过小。

应用侧与 mysql 底层的连接，是**基于 TCP 协议的长链接**，而 TCP 协议，需要经过**三次握手和四次挥手**来实现建连和释放。如果我每次执行 sql 都重新建立一个新的连接的话，那就要不断握手和挥手，这很**耗时**。所以一般会建立一个**长连接池**，连接用完之后，塞到连接池里，下次要执行 sql 的时候，再从里面捞一条连接出来用，非常环保。

![连接池原理](https://cdn.xiaobaidebug.top/image/connection_pool.png)

我们一般写代码的时候，都会通过第三方的**orm 库**来对数据库进行操作，而成熟的 orm 库，**百分之一千万都会有个连接池。**

而这个连接池，一般会有个大小。这个大小就控制了你的连接数最大值，如果说你的连接池太小，都还没有数据库的大，那调了数据库的最大连接数也没啥作用。

一般情况下，可以翻下你使用的 orm 库的文档，看下怎么设置这个连接池的大小，就几行代码的事情，改改就好。比如 go 语言里的`gorm`里是这么设置的

```go
func Init() {
  db, err := gorm.Open(mysql.Open(conn), config)
	sqlDB, err := db.DB()
	// SetMaxIdleConns 设置空闲连接池中连接的最大数量
	sqlDB.SetMaxIdleConns(200)
	// SetMaxOpenConns 设置打开数据库连接的最大数量
	sqlDB.SetMaxOpenConns(1000)
}
```

<br>

### buffer pool 太小

连接数是上去了，速度也提升了。

曾经遇到过面试官会追问，**有没有其他办法可以让速度更快呢？**

那必须要眉头紧锁，假装思考，然后说**：有的**。

我们在前面的数据库查询流程里，提到了进了 innodb 之后，会有一层内存 buffer pool，用于将磁盘数据页加载到内存页中，只要查询到 buffer pool 里有，就可以直接返回，否则就要走磁盘 IO，那就慢了。

也就是说，**如果我的 buffer pool 越大，那我们能放的数据页就越多，相应的，sql 查询时就更可能命中 buffer pool，那查询速度自然就更快了。**

可以通过下面的命令查询到 buffer pool 的大小，单位是`Byte`。

```sql
mysql> show global variables like 'innodb_buffer_pool_size';
+-------------------------+-----------+
| Variable_name           | Value     |
+-------------------------+-----------+
| innodb_buffer_pool_size | 134217728 |
+-------------------------+-----------+
1 row in set (0.01 sec)
```

也就是`128Mb`。

如果想要调大一点。可以执行

```sql
mysql> set global innodb_buffer_pool_size = 536870912;
Query OK, 0 rows affected (0.01 sec)

mysql> show global variables like 'innodb_buffer_pool_size';
+-------------------------+-----------+
| Variable_name           | Value     |
+-------------------------+-----------+
| innodb_buffer_pool_size | 536870912 |
+-------------------------+-----------+
1 row in set (0.01 sec)
```

这样就把 buffer pool 增大到 512Mb 了。

但是吧，如果 buffer pool 大小正常，只是**别的原因**导致的查询变慢，那改 buffer pool 毫无意义。

但问题又来了。

<br>

#### 怎么知道 buffer pool 是不是太小了？

这个我们可以看**buffer pool 的缓存命中率**。

![查看buffer pool命中率](https://cdn.xiaobaidebug.top/image/image-20220319113917654.png)

通过 `show status like  'Innodb_buffer_pool_%';`可以看到跟 buffer pool 有关的一些信息。

`Innodb_buffer_pool_read_requests`表示读请求的次数。

`Innodb_buffer_pool_reads` 表示从物理磁盘中读取数据的请求次数。

所以 buffer pool 的命中率就可以这样得到：

```sql
buffer pool 命中率 = 1 - (Innodb_buffer_pool_reads/Innodb_buffer_pool_read_requests) * 100%
```

比如我上面截图里的就是，1 - (405/2278354) = 99.98%。可以说命中率非常高了。

一般情况下**buffer pool 命中率**都在`99%`以上，如果低于这个值，才需要考虑加大 innodb buffer pool 的大小。

当然，还可以把这个命中率做到**监控**里，这样半夜 sql 变慢了，早上上班还能定位到原因，就很舒服。

<br>

### 还有哪些骚操作？

前面提到的是在**存储引擎层**里加入了 buffer pool 用于缓存内存页，这样可以加速查询。

那同样的道理，**server 层**也可以加个缓存，直接将第一次查询的结果缓存下来，这样**下次**查询就能立刻返回，听着挺美的。

按道理，如果命中缓存的话，确实是能为查询加速的。但这个功能限制很大，其中最大的问题是只要数据库表被更新过，表里面的**所有缓存都会失效**，数据表频繁的更新，就会带来频繁的缓存失效。所以这个功能只适合用于那些**不怎么更新的数据表。**

另外，这个功能在`8.0版本`之后，就被**干掉**了。所以这功能用来聊聊天可以，没必要真的在生产中使用啊。

![查询缓存被删除](https://cdn.xiaobaidebug.top/image/%E6%9F%A5%E8%AF%A2%E7%BC%93%E5%AD%98%E8%A2%AB%E5%88%A0%E9%99%A4.png)

<br>

### 总结

- 数据查询过慢一般是索引问题，可能是因为选错索引，也可能是因为查询的行数太多。
- 客户端和数据库连接数过小，会限制 sql 的查询并发数，增大连接数可以提升速度。
- innodb 里会有一层内存 buffer pool 用于提升查询速度，命中率一般>99%，如果低于这个值，可以考虑增大 buffer pool 的大小，这样也可以提升速度。
- 查询缓存（query cache）确实能为查询提速，但一般不建议打开，因为限制比较大，并且 8.0 以后的 mysql 里已经将这个功能干掉了。

### 最后

最近原创更文的阅读量稳步下跌，思前想后，夜里辗转反侧。

我有个不成熟的请求。

![](https://cdn.xiaobaidebug.top/image/u=2281575747,3550568508&fm=253&fmt=auto&app=120&f=JPEG.jpeg)

<br>

**离开广东好长时间了，好久没人叫我靓仔了。**

大家可以在**评论区**里，叫我一靓仔吗？

我这么善良质朴的愿望，能被满足吗？

如果实在叫不出口的话，能帮我点下右下角的**点赞和在看**吗？

<br>

###### 别说了，一起在知识的海洋里呛水吧

**点击**下方名片，关注公众号:【小白 debug】
![](https://cdn.xiaobaidebug.top/1696069689495.png)

<br>

不满足于在留言区说骚话？

加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点有意思的话题。就**超！开！心！**

<img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" width = "50%"   align=center />

![](https://cdn.xiaobaidebug.top/image/006APoFYly1g5q9gn2jipg308w08wqdi.gif)

### 文章推荐：

- [程序员防猝死指南](https://mp.weixin.qq.com/s/PP80aD-GQp7VtgyfHj392g)
- [TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解](/计算机基础/网络基础/核心知识点/TCP粘包！数据包：我只是犯了每个数据包都会犯的错，硬核图解)
- [动图图解！既然 IP 层会分片，为什么 TCP 层也还要分段？](/计算机基础/网络基础/核心知识点/动图图解！既然IP层会分片，为什么TCP层也还要分段？)
