# 为什么 mysql 插入不存在的数据会产生死锁？

<br>

mysql 的读写锁这个话题，老难了。

水太深，容易把握不住。

看书吧犯困。

但面试又绕不过去。

今天我们面向一个例子学习，希望能让大家提起一点兴趣。

直接开始吧。

<br>

有这么一张表，建表 sql 如下。

```sql
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT COMMENT '主键',
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '名字',
  `phone_no` int(10) NOT NULL DEFAULT '0' COMMENT '电话号码',
  PRIMARY KEY (`id`),
  KEY `idx_phone_no` (`phone_no`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
```

这里需要关注的是，**电话号码**这一列，是加了**普通索引**的。

![四层隔离级别](https://cdn.xiaobaidebug.top/image/四层隔离级别.png)

mysql 有四层隔离级别，应对不同的事务并发处理能力。之前写的[《mysql 主库更新后，从库都读到最新值了，主库还有可能读到旧值吗？》](https://mp.weixin.qq.com/s/2UxF7GJrAW2nY8bB57ZogQ),里面用一个例子简单介绍了他们之间的区别。

假设我们现在用的是**可重复读隔离级别**。

当前数据表长这样。

![user表数据库原始状态](https://cdn.xiaobaidebug.top/image/user%E8%A1%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8E%9F%E5%A7%8B%E7%8A%B6%E6%80%81-20220409140411351.png)

注意里面**没有 phone_no=2**。

现在代码里有这么一段逻辑。

```sql
select user where phone_no=2 for update  // 查询sql
if (user 存在) {
		return
} else {
  insert user;   // 插入sql
}
```

逻辑比较简单，就是去查一下 phone_no=2 的数据存不存在。不存在的话，就插入一条到数据库里。

**目的是保证 phone=2 的数据唯一。**

注意跟平时的 select 查询不一样，select 语句后面还有个 **for update** ，是为了对 phone_no=2 进行加锁，**不懂没关系，待会还会提到。**

现在有两个线程同时**并发**跑上面的逻辑。

结果竟然提示**死锁**。

```sql
Deadlock found when trying to get lock; try restarting transaction
```

<br>

为什么呢？

<br>

为了解释这个问题，我们就从 mysql 锁的话题开始聊起。

<br>

### 锁

mysql 锁的话题很大了，这个细细聊起来又是一篇长文了。

我们简单说一下。mysql 中，我们现在用的引擎几乎都是 innodb，我们以此为默认条件展开话题。

<br>

常见的锁有两种，一种是**表锁**，一种是**行锁**。

当你**更新**一条数据时，**如果你不走索引，那会锁表，否则，锁行。**

表锁是在你什么索引都没有的时候，为了保证**数据一致性**，迫不得已加上去的，锁的对象当然就是整个数据表了。也就是说，你在对数据表加锁之后，再对表进行读写操作，结束之后对表解锁。在此期间，其他对这张表的读写都得等你操作完。

是的，**干等**，哪怕你操作的是第 1 行的数据，其他人要操作的是第 100 行的数据，也得干等。

![锁表](https://cdn.xiaobaidebug.top/image/%E9%94%81%E8%A1%A8.drawio.png)

为了提升效率，设计 mysql 的大佬们又把锁的粒度给减小了，粒度从锁表变成锁行。

也就是说，你先**锁住**这个行，在读写完这一行之后，再**解锁**，期间其他人如果要操作这一行，那要等着，如果操作其他行，那就不用等了。这样并发量就提上去了。

![锁行](https://cdn.xiaobaidebug.top/image/%E9%94%81%E8%A1%8C.drawio.png)

而加锁除了 update, insert 这类**写类型**的语句会加之外，还可以在 select 语句的最后加入**for update**，这样也能加锁。比如

```sql
select * from user where phone_no =2 for update;
```

update 语句会加锁比较好理解，就是你要更新某一行了，防止别人这时候也要更新，所以加锁。后者 select for update 就是告诉别人，你**读的**这一行接下来是要**拿来做更新的操作的**（`for update`）,在你更新完成前，谁也不能更新它。

上面这种锁，主要是为了写的时候加入的，叫**写锁，也就是 X 锁**。

**写锁跟写锁之间是互斥的**。意思是不能同时对某一行加两个写锁，凡事讲究先来后到，后面加写锁的线程会**阻塞等待**前面的线程解锁完。

既然有写锁，当然有**读锁，也叫 S 锁**。

像下面这样在 select 语句后面加上**lock in share mode**，就能加入读锁。

```sql
select * from user where phone_no =2 lock in share mode;
```

**读锁和读锁之间就不互斥**，也就是两个线程可以对同一行数据同时加读锁，不会阻塞。

![读写锁兼容性](https://cdn.xiaobaidebug.top/image/%E8%AF%BB%E5%86%99%E9%94%81%E5%85%BC%E5%AE%B9%E6%80%A7.drawio.png)

<br>

### 死锁

简单解释下死锁，一个数据表里有那么多行，我们写代码的时候，会执行各种 sql 语句，期间完全可以锁住多行。

当一个线程先锁 A 行，再锁 B 行时，另外一个线程反过来，先锁 B 行，再锁 A 行。就有可能发生两个线程在已经持有一个锁的同时，死等对方持有的另外一个锁释放的情况。

双方都想拿对方的锁，且自己的锁也死死不松手，逻辑就都跑不下去了，这就是**死锁**。

![死锁.drawio](https://cdn.xiaobaidebug.top/image/%E6%AD%BB%E9%94%81.drawio.png)

<br>

### 间隙锁

那么我们回到文章开头的话题上。

如果我能保证，对 id=2 的那一行加锁，写结束前都不释放，期间别人都没法写，这样岂不是保证数据唯一了？

道理是这么个道理没错，但是现在的关键是，**phone_no=2 这一行并不存在**。

![phone=2不存在](https://cdn.xiaobaidebug.top/image/phone=2不存在.png)

```sql
select user where phone_no=2 for update
```

这一行 sql 一执行，牢牢锁住了空气？

<br>

开个玩笑。

是不是什么也没锁住，这个要看**隔离级别**了。

![四层隔离级别](https://cdn.xiaobaidebug.top/image/四层隔离级别.png)

phone_no 是加了索引的，且因为**数据库索引里，数据是排好序的**，phone_no=1 和 phone_no=3 都存在，他们之间没有数据，如果有 phone_no=2 这条数据的话，那也理应出现在他们中间。

那么现在的问题是，有没有办法锁住 1 和 3 之间的**缝隙**？

有的，有个**间隙锁**，这个锁，在**读未提交**和**读已提交**里都没有，它在**可重复读**这个隔离级别下被引入。

而且，**间隙锁和间隙锁之间是不互斥的**。

记住上面这句话，老关键了。

于是乎，我们回到文章开头的问题里，这次我加上注释。

![RR隔离级别加锁并发写数据会死锁的原因](https://cdn.xiaobaidebug.top/image/RR%E9%9A%94%E7%A6%BB%E7%BA%A7%E5%88%AB%E5%8A%A0%E9%94%81%E5%B9%B6%E5%8F%91%E5%86%99%E6%95%B0%E6%8D%AE%E4%BC%9A%E6%AD%BB%E9%94%81%E5%8A%A0%E6%B3%A8%E9%87%8A.drawio.png)

线程 1**在可重复读这个隔离级别下，通过 for update ，可以在 1 和 3 之间，加上间隙锁**。

线程 2 也一样，也在 1 和 3 之间加上间隙锁，**因为间隙锁和间隙锁之间是不互斥的，所以也能加锁成功。**

这时候线程 1 尝试去**插入数据**，插入数据的时候也会加一个**特殊的锁**，专业点，叫**插入意向锁**。**插入意向锁跟间隙锁是互斥的。**

![image-20220626224918681](https://cdn.xiaobaidebug.top/image-20220626224918681.png)

但由于线程 2 前面已经加过间隙锁了。所以线程 1 会等线程 2 释放间隙锁。

但线程 2，不仅不释放间隙锁，反而又打算加一个写锁。

哦吼。

**相当于两个线程在持有一个锁的同时，还等着对方释放锁。**

这就妥妥**死锁**了。

这下，文章开头死锁的问题，就解释完了。

<br>

<br>

那么问题又来了。

<br>

#### 为什么可重复读要引入间隙锁？

可重复读最关键的一个点是，我开了一个事务，在这个事务里，**不管我读多少次，我读到的数据都要是一样的**，这才是**可重复读**。如果 mysql 不存在间隙锁，那么就有可能出现下面的情况。

![幻读3.drawio](https://cdn.xiaobaidebug.top/image/%E5%B9%BB%E8%AF%BB3.drawio.png)

在一个事务里，读多次数据，发现每次数据都不同。就好像出现幻觉一样，所以又叫**幻读**。

这就跟可重复读的定义违背了。

通过加入间隙锁，线程 1 在第一次执行 select for update 后，线程 2 如果再尝试去写数据，就会被阻塞，直到线程 1 执行 commit 后，线程 2 阻塞结束然后执行 insert。

![间隙锁解决幻读](https://cdn.xiaobaidebug.top/image/%E9%97%B4%E9%9A%99%E9%94%81%E8%A7%A3%E5%86%B3%E5%B9%BB%E8%AF%BB.png)

可重复读隔离级别下，**通过引入间隙锁，是为了解决幻读的问题。**

<br>

### 总结

- mysql 锁从粒度上分为行锁和表锁，从行为上又分为读锁和写锁，也就是 S 锁和 X 锁。

- 两个线程在持有锁的同时，又想等待对方把锁释放掉，则会发生死锁。

- 两个间隙锁之间不会互斥。

- 在可重复读隔离级别下，通过间隙锁解决了幻读。

### 参考资料

《MYSQL 内核：INNODB 存储引擎 卷 1》

<br>

### 最后

这篇文章只是想通过一个例子讲讲锁的内容。并不是希望通过这样的方式来保证并发写入唯一数据。

如果只是想在**并发写**时保证**数据唯一**的话，加个**唯一索引**吧，别搞上面这些花里胡哨的。具体的可以看我之前写过的文章。

<br>

![](https://cdn.xiaobaidebug.top/image/902ee1871d.jpg)

<br>

最近原创更文的阅读量稳步下跌，思前想后，夜里辗转反侧。

我有个不成熟的请求。

![](https://cdn.xiaobaidebug.top/image/u=2281575747,3550568508&fm=253&fmt=auto&app=120&f=JPEG.jpeg)

<br>

**离开广东好长时间了，好久没人叫我靓仔了。**

大家可以在**评论区**里，叫我一声靓仔吗？

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
- [TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解](https://mp.weixin.qq.com/s/0-YBxU1cSbDdzcZEZjmQYA)
- [动图图解！既然 IP 层会分片，为什么 TCP 层也还要分段？](https://mp.weixin.qq.com/s/YpQGsRyyrGNDu1cOuMy83w)
