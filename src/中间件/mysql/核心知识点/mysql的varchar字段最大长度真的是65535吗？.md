# mysql的varchar字段最大长度真的是65535吗？

在mysql建表sql里，我们经常会有定义**字符串**类型的需求。

```sql
CREATE TABLE `user` (
  `name` varchar(100) NOT NULL DEFAULT '' COMMENT '名字'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 ;
```

比方说user表里的名字，就是个字符串。mysql里有两个**类型**比较适合这个场景。

**char和varchar。**

声明它们都需要在字段边上加个数组，比如**char(100)**和**varchar(100)**，这个100是指当前字段能放的**最大字符数**。

**char和varchar的区别**在于，varchar虽然声明了最大能放100个字符，但一开始不需要分配100个字符的空间，可以根据需要慢慢增加空间。而char一开始声明是多少，就固定预留多少空间。

所以，varchar比起char更省空间，一般没啥大事，大家都爱用**varchar**。

<br>

那问题来了，声明**varchar**字段时，它的最大长度是多少呢？

<br>

**相信大家应该听说过varchar字段的最大长度是65535吧。**

<br>

没听过也没关系，你现在听到了。

但实际上是这样吗？

我们来做个实验。

<br>

# varchar最大值是多少

我们直接拿65535来试一下。

![长度为65535的varchar报错](https://cdn.xiaobaidebug.top/%E9%95%BF%E5%BA%A6%E4%B8%BA65535%E7%9A%84varchar%E6%8A%A5%E9%94%99.png)

很明显报错了。

报错内容也说了, **由于列长度过大导致报错，最长是16383**。

把上面的65535**改成 16383，确实是成功了。**

哦？所以说varchar最大值是16383？

当然不是。

这其实还有好几个因素影响这这个最大值。

<br>

## 不同字符集的影响

varchar里放的是字符串，而字符串看起来可以是英文字母，也可以是数字或中文。但不管怎么样，都可以把这样的中英文数字转成二进制的01串。

按照一定规则把符号和二进制码对应起来，这就是**编码**。而把n多这种已经编码的字符聚在一起，就是我们常说的**字符集**。

建表语句里有个**CHARSET**，这里填的是**字符集。**

不同的字符集要求使用的字节个数也不同，我们可以通过 `show charset;` 看到mysql支持哪些字符集，以及这些字符集里**存储一个字符所需的最大字节数（Maxlen）。**

![查看mysql支持哪些charset](https://cdn.xiaobaidebug.top/charset%E7%A7%8D%E7%B1%BB.png)

我们尝试下把建表sql语句里的CHARSET改一改，比如改成**utf8mb3**。

我们再执行下，会发现，最大值又不一样了。

![utf8mb3下的报错](https://cdn.xiaobaidebug.top/utf8mb3%E4%B8%8B%E7%9A%84%E6%8A%A5%E9%94%99.png)

并且，上面虽然提示max=21845，但要是真执行起来会发现还是报错。**在改为21844之后才成功。**

不讲武德。

再把**字符集改为 latin1**。会发现，**最大值会是 65533**。

![varchar为65533时创建成功](https://cdn.xiaobaidebug.top/varchar%E4%B8%BA65533%E6%97%B6%E5%88%9B%E5%BB%BA%E6%88%90%E5%8A%9F.png)

这里渐渐可以发现规律。

- utf8mb4的maxlen=4，对应varchar最大长度=16383。 4*16383 = 65532。
- utf8mb3的maxlen=3，对应varchar最大长度=21844。3*21844 = 65532。
- latin1的maxlen=1，对应varchar最大长度=65533。    1 * 65533 = 65533。

也就是说varchar边上的长度代表的是这一列能放的最大**字符数**，而maxlen代表单个字符占用的最大**字节数**。相乘的结果很接近65535。说明**65535是指的字节数**，而**不是字符数**。

也就是说varchar的最大长度，根据选择的字符集的不同，会有区别。

总的来说接近于 65535 除以 字符集的maxlen。

<br>

**但其实这样还不够严谨**。还有其他影响因素。

<br>

## 是否可以为NULL的影响

上面的建表语句里声明了test字段都是`NOT NULL`，也就是非空，如果我们将这个改成可以为NULL，再用 **CHARSET=latin1**去试试。这时候就会发现，前面NOT NULL的时候最大能使用65533去建表，现在报错了。

改成65532，就能成功了，也就是最长长度**少了1个字节**。

![是否为NULL的影响](https://cdn.xiaobaidebug.top/%E6%98%AF%E5%90%A6%E4%B8%BANULL%E7%9A%84%E5%BD%B1%E5%93%8D.png)

这是因为一个字段是否为NULL这件事情，是需要**一个字节**去记录下来的。

而当字段为**NOT NULL**的时候，则可以省下这个字节。

<br>

## 列数的影响

上面提到的情况都是在表里只有一列时的结果，当我们表里**有更多的列**时，我们会发现varchar的最大值还会有变化。比如同样还是latin1字符集，我们再增加一列varchar类型，并且用的还是前面允许的最大值65533。

结果发现这次会失败。

![两个varchar列的情况](https://cdn.xiaobaidebug.top/%E4%B8%A4%E4%B8%AAvarchar%E5%88%97%E7%9A%84%E6%83%85%E5%86%B5.png)

查了一下资料发现，原来65535是mysql单行的最大长度（不包含blob和text等类型的情况下）

mysql表里单行中的**所有列加起来**（不考虑其他隐藏列和记录头信息） ，占用的最大长度是65535个字节。

**注意上面加粗的部分，加起来不超过65535。**

比如如果还有int的列，那它占用4个字节，bigint占用8个字节，字段越多，留给单个varchar列的空间就越少。

因此，**前面提到的 varchar 的最大长度，接近于 65535 除以 字符集的maxlen，但前提是只有一列not null 的varchar类型的字段。**

<br>

## 为什么不是65535而是65533？

不过问题又来了，上面建表sql里，不管是那种字符集，最后得到的字符数都约等于65533。

但数据库单行最大值应该是65535。**65535 - 65533 = 2 。这里面还差了个2**，为什么呢？

这就要聊一下mysql单行里数据到底是怎么存储的。

<br>

### 数据表行存储的格式

我们可以通过 `show table status` 命令，查看到当前表格使用的行格式。

![查看到当前表格使用的行格式](https://cdn.xiaobaidebug.top/%E6%9F%A5%E7%9C%8B%E5%88%B0%E5%BD%93%E5%89%8D%E8%A1%A8%E6%A0%BC%E4%BD%BF%E7%94%A8%E7%9A%84%E8%A1%8C%E6%A0%BC%E5%BC%8F.png)

通过上面的 `Row_format` 字段可以看到这个表用的是 `Dynamic` 行格式。

事实上，现在的mysql数据表一般都是采用Dynamic行记录格式。

我们来看下`Dynamic`行格式长什么样子。

![Dynamic行记录格式](https://cdn.xiaobaidebug.top/Dynamic%E8%A1%8C%E8%AE%B0%E5%BD%95%E6%A0%BC%E5%BC%8F3.drawio.png)

Dynamic格式将行记录分为两部分，分为是**行记录的额外信息**和**行记录的真实数据**。

**行记录的额外信息**：

- **变长字段长度列表**：指的是varchar，text，blob这种类型，它们属于变长字段，这里表示的就是这些字段的长度。
- **NULL值列表**：用来记录当前行里哪些列是为null的。如果全部列都是not null的话，那就不需要有这个字段。
- **记录头信息**：这是固定5个字节，用来记录一些特殊的信息，比如这一行是否被删了，这一行在这个16k的数据页内是不是最小的，以及指向下一条记录的指针之类的一些信息，不需要太关注。

<br>

**行记录的真实数据**：

里面放的就是一行里，每一列的真正内容。除了我们建表时里涉及到的列以外，还有一些隐藏列。

比如Row_ID，这个是在建表是没有声明主键时，数据表自动会生成的隐藏主键。另外还有`trx_id`字段，用于记录当前这一行数据行是被**哪个事务**修改的，和一个`roll_pointer`字段，这个字段是用来指向当前这个数据行的上一个版本，通过这个字段，可以为这行数据形成一条版本链，从而实现**多版本并发控制（MVCC）**。有没有很眼熟，这个在之前写的[文章](https://mp.weixin.qq.com/s/SR0ZL1zAc_0QIQvpDCOANw)里出现过。

![隐藏列有哪些](https://cdn.xiaobaidebug.top/%E9%9A%90%E8%97%8F%E5%88%97%E6%9C%89%E5%93%AA%E4%BA%9B.drawio.png)

所以我们回过头来看我们建的表，当只有一列not null的 varchar字段时，行记录长下面这样。

![单条varchar数据的Dynamic行记录格式.drawio](https://cdn.xiaobaidebug.top/%E5%8D%95%E6%9D%A1varchar%E6%95%B0%E6%8D%AE%E7%9A%84Dynamic%E8%A1%8C%E8%AE%B0%E5%BD%95%E6%A0%BC%E5%BC%8F.drawio.png)

前面提到，行最大值65535字节是不包含隐藏列和记录头信息的，所以其实是指上图中红色的部分。

<br>

而最左边的**变长字段长度列表**中，为了表示varchar列的长度，占用了**两个字节**，也就是16位，2的16次方，最大可以表示65535的长度，正好足够用来表示varchar列当前的长度是65533。

所以**65535 - 65533 = 2 。这里面差的2**，是用来存**varchar字段长度**去了。

<br>

## 一个页才16k，怎么保存65533（64k）数据？

之前的文章里其实多次提到了mysql底层是以页的形式去存储数据的，而一个页固定16k，而一个varchar字段最大能放65533字节数据，换算一下大概是64k，整整4个16k的页。

![页结构](https://cdn.xiaobaidebug.top/%E9%A1%B5%E7%BB%93%E6%9E%84.png)

这里面是怎么实现的？

对于这种情况，其实行数据里针对这个超大的varchar字段只保存个20字节的指针（实际上是个偏移量），这个指针会指向新的页（off page），这些页里保存的是实际的varchar字段里的65533字节数据。这种由于字段过长导致需要额外的页来保存数据的现象叫**行溢出**。

![行溢出](https://cdn.xiaobaidebug.top/%E8%A1%8C%E6%BA%A2%E5%87%BA.drawio.png)

<br>

## 大于64k的字符串该怎么处理？

如果离谱点，数据量更大，比64k还大，这时候就不能继续用varchar了，需要改用text和blob类型字段。

而text和blob类型本身也是分TINY、MEDIUM，LONG三个档位的，对应着不同的数据长度，最大到4G左右。

像下面这样就可以将数据类型定义为LONGTEXT。

```sql
CREATE TABLE `test_max_length` (
  `test` LONGTEXT NOT NULL COMMENT '测试长度字段'
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ;
```

而他们的存储方式也跟varchar的情况类似，只保存20个字节的指针，实际数据保存在其他溢出页里。

以前我们查某一行数据，他们都在一个16k的数据页里，查询时只要一次磁盘IO就能将这个数据页读取出来。

当一个数据库里某行数据里有个特别大的字符串时，我们如果还想把整行数据给读出来，那我们还得把**off page**的数据给全部读出来，这意味着**更多的磁盘IO，性能就更差了**。

为了规避这个问题，我们写**select sql**的时候，如果发现某列字段，是个特别长的字符串时，能不读它就尽量不加到select里，这也是为什么大家不建议使用`select * from table`的原因。

<br>

### blob和text的区别

一般来说，blob和text都可以用来放超长字符串。但它们会有一点点区别。

我们知道字符集（charset）下还有个**校对规则**（collation）的概念，比如同样是a，大写A和小写a能不能算作是一个字符，这会影响比较和排序，collation就是定义这个规则用的。

**blob没有字符集的概念，而text有**。这意味如果用blob来存文本的话，就没法用字符集的校对规则来排序和做比较。

还有一个区别，blob还能保存二进制数据，比如压缩过的文本数据，图片或者视频，别笑，虽然不合适，但我确实见过有人拿它来保存视频。。。

<br>

## 总结

- 现在的mysql数据表一般采用Dynamic行记录格式。它由行记录的额外信息和行记录的真实数据组成。
- mysql表里单行中的**所有列加起来**（不考虑其他隐藏列和记录头信息） ，占用的最大长度是65535个字节。
- 如果数据表里只有**一列 not null** 的varchar字段，它的最大长度，接近于 **65535 除以 字符集的maxlen**。
- 如果要存放大于64k的字段数据，可以考虑使用longtext和longblob等类型。
- mysql的数据页大小是16k，为了保存varchar或者text，blob这种长度可能大于16k的字段，在Dynamic行格式中，会只保留**20个字节**的指针，实际数据则放在其他溢出页中。为了将它们读取出来，会需要更多的磁盘IO。
- blob和text很像，但blob没有字符集的概念，并且还能存放二进制的数据，比如图片或视频，但实际上图片和视频更推荐放在对象存储（**O**bject **S**torage **S**ervice，简称**oss**）中。

<br>

## 参考资料

《mysql技术内幕》

《从根儿理解mysql》

<br>

## 最后

最近原创更文的阅读量稳步下跌，思前想后，夜里辗转反侧。

我有个不成熟的请求。

<img src="https://cdn.xiaobaidebug.top/image-20220522162506224.png" alt="" style="zoom:20%;" />

<br>

**离开广东好长时间了，好久没人叫我靓仔了。**

大家可以在**评论区**里，叫我一靓仔吗？

我这么善良质朴的愿望，能被满足吗？

如果实在叫不出口的话，能帮我点下右下角的**点赞和在看**吗？

<br>

##### 别说了，一起在知识的海洋里呛水吧

关注公众号:【小白debug】
![](https://cdn.xiaobaidebug.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E6%A0%87%E5%87%86%E8%89%B2%E7%89%88.png)

<br>

不满足于在留言区说骚话？

加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点有意思的话题。就**超！开！心！**

<img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" alt="" style="zoom:50%;" />

![](https://cdn.xiaobaidebug.top/006APoFYly1g5q9gn2jipg308w08wqdi.gif)


## 文章推荐：
- [golang进阶面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html)

- [golang基础面试题八股文合集](https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html)

- [golang常用标准库第三方库大全](https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html)

- [golang学习路线](https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html)
