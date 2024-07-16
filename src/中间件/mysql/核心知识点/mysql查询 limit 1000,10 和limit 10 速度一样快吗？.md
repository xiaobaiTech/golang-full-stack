# mysql 查询 limit 1000,10 和 limit 10 速度一样快吗？如果我要分页，我该怎么办？

<br>

刷网站的时候，我们经常会遇到需要分页查询的场景。

比如下图红框里的翻页功能。

<img src="https://cdn.xiaobaidebug.top/image-20220603221954745.png" style="zoom:50%;" />

<br>

我们很容易能联想到可以用 mysql 实现。

假设我们的建表 sql 是这样的

![mysql建表sql](https://cdn.xiaobaidebug.top/image/mysql%E5%BB%BA%E8%A1%A8sql5.png)

<br>

建表 sql 大家也不用扣细节，只需要知道**id 是主键，并且在 user_name 建了个非主键索引**就够了，其他都不重要。

为了实现分页。

很容易联想到下面这样的 sql 语句。

```sql
select * from page order by id limit offset, size;
```

比如一页有 10 条数据。

![user表数据库原始状态](https://cdn.xiaobaidebug.top/image/user%E8%A1%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8E%9F%E5%A7%8B%E7%8A%B6%E6%80%816.drawio.png)

第一页就是下面这样的 sql 语句。

```sql
select * from page order by id limit 0, 10;
```

第一百页就是

```sql
select * from page order by id limit 990, 10;
```

<br>

那么问题来了。

用这种方式，**同样都是拿 10 条数据，查第一页和第一百页的查询速度是一样的吗？为什么？**

<br>

## 两种 limit 的执行过程

上面的两种查询方式。对应 `limit offset, size` 和 `limit size` 两种方式。

而其实 `limit size` ，相当于 `limit 0, size`。也就是从 0 开始取 size 条数据。

也就是说，两种方式的**区别在于 offset 是否为 0。**

我们先来看下 limit sql 的内部执行逻辑。

![Mysql架构](https://cdn.xiaobaidebug.top/image/Mysql%E6%9E%B6%E6%9E%846.drawio.png)

mysql 内部分为**server 层**和**存储引擎层**。一般情况下存储引擎都用 innodb。

server 层有很多模块，其中需要关注的是**执行器**是用于跟存储引擎打交道的组件。

执行器可以通过调用存储引擎提供的接口，将一行行数据取出，当这些数据完全符合要求（比如满足其他 where 条件），则会放到**结果集**中，最后返回给调用 mysql 的**客户端（go、java 写的应用程序）**。

<br>

我们可以对下面的 sql 先执行下 `explain`。

```sql
explain select * from page order by id limit 0, 10;
```

可以看到，explain 中提示 key 那里，执行的是**PRIMARY**，也就是走的**主键索引**。

![分页查询offset=0](https://cdn.xiaobaidebug.top/image/%E5%88%86%E9%A1%B5%E6%9F%A5%E8%AF%A2offset=0.png)

主键索引本质是一棵 B+树，它是放在 innodb 中的一个数据结构。

我们可以回忆下，B+树大概长这样。

![B+树结构](https://cdn.xiaobaidebug.top/B%E5%8A%A0%E6%A0%91%E7%BB%93%E6%9E%842d.png)

在这个树状结构里，我们需要关注的是，最下面一层节点，也就是**叶子结点**。而这个叶子结点里放的信息会根据当前的索引是**主键还是非主键**有所不同。

- 如果是**主键索引**，它的叶子节点会存放完整的行数据信息。
- 如果是**非主键索引**，那它的叶子节点则会存放主键，如果想获得行数据信息，则需要再跑到主键索引去拿一次数据，这叫**回表**。

比如执行

```sql
select * from page where user_name = "小白10";
```

会通过非主键索引去查询**user_name**为"**小白 10**"的数据，然后在叶子结点里找到"**小白 10**"的数据对应的**主键为 10**。

此时回表到**主键索引**中做查询，最后定位到**主键为 10 的行数据**。

![回表](https://cdn.xiaobaidebug.top/image/%E5%9B%9E%E8%A1%A8.drawio.png)

但不管是主键还是非主键索引，他们的叶子结点数据都是**有序的**。比如在主键索引中，这些数据是根据主键 id 的大小，从小到大，进行排序的。

<br>

### 基于主键索引的 limit 执行过程

那么回到文章开头的问题里。

当我们去掉 explain，执行这条 sql。

```sql
select * from page order by id limit 0, 10;
```

上面 select 后面带的是**星号\***，也就是要求获得行数据的**所有字段信息。**

server 层会调用 innodb 的接口，在 innodb 里的主键索引中获取到第 0 到 10 条**完整行数据**，依次返回给 server 层，并放到 server 层的结果集中，返回给客户端。

而当我们把 offset 搞离谱点，比如执行的是

```sql
select * from page order by id limit 6000000, 10;
```

server 层会调用 innodb 的接口，由于这次的 offset=6000000，会在 innodb 里的主键索引中获取到第 0 到（6000000 + 10）条**完整行数据**，**返回给 server 层之后根据 offset 的值挨个抛弃，最后只留下最后面的 size 条**，也就是 10 条数据，放到 server 层的结果集中，返回给客户端。

可以看出，当 offset 非 0 时，server 层会从引擎层获取到**很多无用的数据**，而获取的这些无用数据都是要耗时的。

因此，我们就知道了文章开头的问题的答案，**mysql 查询中 limit 1000,10 会比 limit 10 更慢。原因是 limit 1000,10 会取出 1000+10 条数据，并抛弃前 1000 条，这部分耗时更大**

<br>

**那这种 case 有办法优化吗？**

可以看出，当 offset 非 0 时，server 层会从引擎层获取到很多无用的数据，而当 select 后面是\*号时，就需要拷贝完整的行信息，**拷贝完整数据**跟**只拷贝行数据里的其中一两个列字段**耗时是不同的，这就让原本就耗时的操作变得更加离谱。

因为前面的 offset 条数据最后都是不要的，就算将完整字段都拷贝来了又有什么用呢，所以我们可以将 sql 语句修改成下面这样。

```sql
select * from page  where id >=(select id from page  order by id limit 6000000, 1) order by id limit 10;
```

上面这条 sql 语句，里面先执行子查询 `select id from page  order by id limit 6000000, 1`, 这个操作，其实也是将在 innodb 中的主键索引中获取到`6000000+1`条数据，然后 server 层会抛弃前 6000000 条，只保留最后一条数据的 id。

但不同的地方在于，在返回 server 层的过程中，只会拷贝数据行内的 id 这一列，而不会拷贝数据行的所有列，当数据量较大时，这部分的耗时还是比较明显的。

在拿到了上面的 id 之后，假设这个 id 正好等于 6000000，那 sql 就变成了

```sql
select * from page  where id >=(6000000) order by id limit 10;
```

这样 innodb 再走一次**主键索引**，通过 B+树快速定位到 id=6000000 的行数据，时间复杂度是 lg(n)，然后向后取 10 条数据。

这样性能确实是提升了，亲测能快一倍左右，属于那种耗时从 3s 变成 1.5s 的操作。

这······

属实有些杯水车薪，有点搓，属于没办法中的办法。

<br>

### 基于非主键索引的 limit 执行过程

上面提到的是主键索引的执行过程，我们再来看下基于**非主键索引**的 limit 执行过程。

比如下面的 sql 语句

```sql
select * from page order by user_name  limit 0, 10;
```

server 层会调用 innodb 的接口，在 innodb 里的非主键索引中获取到第 0 条数据对应的主键 id 后，**回表**到主键索引中找到对应的完整行数据，然后返回给 server 层，server 层将其放到结果集中，返回给客户端。

而当 offset>0 时，且 offset 的值较小时，逻辑也类似，区别在于，offset>0 时会丢弃前面的 offset 条数据。

也就是说**非主键索引的 limit 过程，比主键索引的 limit 过程，多了个回表的消耗。**

但当 offset 变得非常大时，比如 600 万，此时执行 explain。

![非主键索引offset值超大时走全表扫描](https://cdn.xiaobaidebug.top/image/%E9%9D%9E%E4%B8%BB%E9%94%AE%E7%B4%A2%E5%BC%95offset%E5%80%BC%E8%B6%85%E5%A4%A7%E6%97%B6%E8%B5%B0%E5%85%A8%E8%A1%A8%E6%89%AB%E6%8F%8F.png)

可以看到 type 那一栏显示的是 ALL，也就是**全表扫描**。

这是因为 server 层的**优化器**，会在执行器执行 sql 语句前，判断下哪种执行计划的代价更小。

很明显，优化器在看到非主键索引的 600w 次回表之后，摇了摇头，还不如全表一条条记录去判断算了，于是选择了全表扫描。

因此，**当 limit offset 过大时，非主键索引查询非常容易变成全表扫描。是真·性能杀手**。

<br>

这种情况也能通过一些方式去优化。比如

```sql
select * from page t1, (select id from page order by user_name limit 6000000, 100) t2  WHERE t1.id = t2.id;
```

通过`select id from page order by user_name limit 6000000, 100`。 先走 innodb 层的 user_name 非主键索引取出 id，因为只拿主键 id，**不需要回表**，所以这块性能会稍微快点，在返回 server 层之后，同样抛弃前 600w 条数据，保留最后的 100 个 id。然后再用这 100 个 id 去跟 t1 表做 id 匹配，此时走的是主键索引，将匹配到的 100 条行数据返回。这样就绕开了之前的 600w 条数据的回表。

当然，跟上面的 case 一样，还是没有解决要白拿 600w 条数据然后抛弃的问题，这也是非常挫的优化。

<br>

像这种，当 offset 变得超大时，比如到了百万千万的量级，问题就突然变得严肃了。

这里就产生了个专门的术语，叫**深度分页**。

<br>

## 深度分页问题

深度分页问题，是个很恶心的问题，恶心就恶心在，这个问题，它其实**无解**。

不管你是用 mysql 还是 es，你都只能通过一些手段去"减缓"问题的严重性。

遇到这个问题，我们就该回过头来想想。

为什么我们的代码会产生深度分页问题？

**它背后的原始需求是什么**，我们可以根据这个做一些规避。

<br>

### 如果你是想取出全表的数据

有些需求是这样的，我们有一张数据库表，但我们希望将这个数据库表里的所有数据取出，异构到 es，或者 hive 里，这时候如果直接执行

```sql
select * from page;
```

这个 sql 一执行，狗看了都摇头。

因为数据量较大，mysql 根本没办法一次性获取到全部数据，妥妥**超时报错**。

于是不少 mysql 小白会通过`limit offset size`分页的形式去分批获取，刚开始都是好的，等慢慢地，哪天数据表变得奇大无比，就有可能出现前面提到的**深度分页**问题。

这种场景是最好解决的。

我们可以将所有的数据**根据 id 主键进行排序**，然后分批次取，将当前批次的最大 id 作为下次筛选的条件进行查询。

可以看下伪代码

![batch获取数据](https://cdn.xiaobaidebug.top/image/batch%E8%8E%B7%E5%8F%96%E6%95%B0%E6%8D%AE.png)

这个操作，可以通过主键索引，每次定位到 id 在哪，然后往后遍历 100 个数据，这样不管是多少万的数据，查询性能都很稳定。

![batch分批获取user表](https://cdn.xiaobaidebug.top/image/batch分批获取user表.drawio.png)

<br>

### 如果是给用户做分页展示

如果深度分页背后的原始需求只是产品经理希望做一个展示页的功能，比如商品展示页，那么我们就应该好好跟产品经理 battle 一下了。

什么样的翻页，需要翻到 10 多万以后，这明显是不合理的需求。

是不是可以改一下需求，让它更接近用户的使用行为？

比如，我们在使用谷歌搜索时看到的翻页功能。

![](https://cdn.xiaobaidebug.top/image/image-20220502222159101.png)

一般来说，谷歌搜索基本上都在 20 页以内，作为一个用户，我就很少会翻到第 10 页之后。

作为参考。

如果我们要做搜索或筛选类的页面的话，就别用 mysql 了，用 es，并且也需要控制展示的结果数，比如一万以内，这样不至于让分页过深。

如果因为各种原因，必须使用 mysql。那同样，也需要控制下返回结果数量，比如数量 1k 以内。

这样就能勉强支持各种翻页，跳页（比如突然跳到第 6 页然后再跳到第 106 页）。

<br>

但如果能从产品的形式上就做成不支持跳页会更好，比如**只支持上一页或下一页**。

![上下页的形式](https://cdn.xiaobaidebug.top/image/%E4%B8%8A%E4%B8%8B%E9%A1%B5%E7%9A%84%E5%BD%A2%E5%BC%8F.drawio.png)

这样我们就可以使用上面提到的 start_id 方式，采用分批获取，每批数据以 start_id 为起始位置。这个解法最大的好处是不管翻到多少页，查询速度永远稳定。

听起来很挫？

怎么会呢，把这个功能包装一下。

变成像抖音那样只能上划或下划，专业点，叫**瀑布流**。

是不是就不挫了？

![](https://cdn.xiaobaidebug.top/image/image-20220503134616713.png)

<br>

## 总结

- `limit offset, size` 比 `limit size` 要慢，且 offset 的值越大，sql 的执行速度越慢。

- 当 offset 过大，会引发**深度分页**问题，目前不管是 mysql 还是 es 都没有很好的方法去解决这个问题。只能通过限制查询数量或分批获取的方式进行规避。

- 遇到深度分页的问题，多思考其原始需求，大部分时候是不应该出现深度分页的场景的，必要时多去影响产品经理。

- 如果数据量很少，比如 1k 的量级，且长期不太可能有巨大的增长，还是用`limit offset, size` 的方案吧，整挺好，能用就行。

<br>

## 参考资料

《MySQL 的 Limit 子句底层原理你不可不知》https://blog.csdn.net/qq_34115899/article/details/120727513

<br>

## 最后

关于深度分页，如果大家有更好的想法，欢迎评论区说出来。

这道题，是我无能！

**告辞！！**

<br>

最近原创更文的阅读量稳步下跌，思前想后，夜里辗转反侧。

我有个不成熟的请求。

![](https://cdn.xiaobaidebug.top/image/u=2281575747,3550568508&fm=253&fmt=auto&app=120&f=JPEG.jpeg)

<br>

**离开广东好长时间了，好久没人叫我靓仔了。**

大家可以在**评论区**里，叫我一靓仔吗？

我这么善良质朴的愿望，能被满足吗？

如果实在叫不出口的话，能帮我点下右下角的**点赞和在看**吗？

<br>

##### 别说了，一起在知识的海洋里呛水吧

关注公众号:【小白 debug】


<br>

不满足于在留言区说骚话？

加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点有意思的话题。就**超！开！心！**

<img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" width = "50%"   align=center />

![](https://cdn.xiaobaidebug.top/image/006APoFYly1g5q9gn2jipg308w08wqdi.gif)


## 文章推荐：
- [golang进阶面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html)

- [golang基础面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html)

- [golang常用标准库第三方库大全](https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html)

- [golang学习路线](https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html)
