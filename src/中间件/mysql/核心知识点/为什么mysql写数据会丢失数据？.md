# mysql 插入数据会失败，为什么？

<br>

那天，我还在外面吃成都六姐的冒菜。

牛肉丸裹上麻酱后，狠狠嘬一口，都要入嘴了。

产品经理突然发来消息。

**"线上有些用户不能注册了"**

心想着"关我 x 事，又不是我做的模块"，放下手机。

不对，那老哥上礼拜刚离职了，想到这里，夹住毛肚的手**微微颤抖**。

对面继续发**："还有些用户不能改名"**

![](https://cdn.xiaobaidebug.top/image/a6a681ebgy1gpfzfr4ikdj20520523yf.jpg)

"如果用上**表情符号**的话，问题必现"

可以了，这下问题几乎直接定位了。

危，速归。

<br>

有经验的兄弟们很容易看出，这肯定是因为**字符集**的缘故。

<br>

## 复现问题

我们来简单复现下这个问题。

如果你有一张数据库表，建表 sql 就像下面一样。

![建表sql语句](http://cdn.xiaobaidebug.top/image/%E5%BB%BA%E8%A1%A8sql%E8%AF%AD%E5%8F%A5.png)

接下来如果你插入的数据是

![insert成功case](https://cdn.xiaobaidebug.top/image/insert%E6%88%90%E5%8A%9Fcase.png)

**能成功**。一切正常。

但如果你插入的是

![insert失败case](https://cdn.xiaobaidebug.top/image/insert%E5%A4%B1%E8%B4%A5case.png)

就会**报错**。

```sql
Incorrect string value: '\xF0\x9F\x98\x81' for column 'name' at row 1
```

**区别在于后者多了个 emoji 表情。**

明明也是字符串，为什么字符串里含有**emoji 表情**，插入就会报错呢？

我们从**字符集编码**这个话题开始聊起。

<br>

## 编码和字符集的关系

虽然我们平时可以在编辑器上输入各种中文英文字母，但这些都是给人读的，不是给计算机读的，其实计算机真正保存和传输数据都是以**二进制**0101 的格式进行的。

那么就需要有一个规则，把中文和英文字母转化为二进制，比如"debug"，计算机就需要把它转化为下图这样。

![debug的编码](https://cdn.xiaobaidebug.top/image/debug%E7%9A%84%E7%BC%96%E7%A0%81.drawio.png)

其中 d 对应十六进制下的 64，它可以转换为 01 二进制的格式。

于是字母和数字就这样一一对应起来了，这就是**ASCII 编码**格式。

它用**一个字节**，也就是`8位`来标识字符，基础符号有 128 个，扩展符号也是 128 个。

将它能表示的所有字符，给聚在一起，这就是我们常说的**ASCII 字符集**。

因为使用的字节数过少，因此也就只能表示下**英文字母和数字**。

这哪里够用。

塞牙缝都不够。

于是为了标识**中文**，出现了**GB2312**的编码格式。为了标识**希腊语**，出现了**greek**编码格式，为了标识**俄语**，整了**cp866**编码格式。

这百花齐放的场面，显然不是一个爱写`if else`的程序员想看到的。

为了统一它们，于是出现了**Unicode 字符集**，它用了 2~4 个字节来表示字符，简单的字符就用 2 个字节表示，复杂的就用 3 到 4 个字节。这样理论上所有符号都能被收录进去，并且完全兼容 ASCII 码，也就是说，同样是字母 d，在 ASCII 用 64 表示，在 Unicode 里还是用 64 来表示。但**unicode 本身只是个字符集，它只规定了某个字符的具体数字是多少，但并没有规定这些数字是要用几个字节去存。**

如果你用**UTF-32**的编码格式，它有 32 位，就会用 4 个字节去存。

如果你用**UTF-16**的编码格式，它有 16 位，就会用 2 个字节去存。

但**不同的地方是 ASCII 用 1 个字节来表示，而 Unicode 下，不管使用 UTF-16 还是 UTF-32 都至少要用两个字节来表示。**

比如下图，同样都是字母 d，unicode 比 ascii 至少多使用了一个字节。

![unicode比ascii多使用一个字节](https://cdn.xiaobaidebug.top/image/unicode%E6%AF%94ascii%E5%A4%9A%E4%BD%BF%E7%94%A8%E4%B8%80%E4%B8%AA%E5%AD%97%E8%8A%82.drawio.png)

我们可以注意到，上面的 unicode 规定的字符码，放在前面的都是 0，其实用不上，但还**占了个字节，有点浪费，完全能隐藏掉**。如果我们能做到该隐藏时隐藏，这样就能省下不少空间，按这个思路，就是就有了**UTF-8 编码**。

![编码格式](https://cdn.xiaobaidebug.top/%E7%BC%96%E7%A0%81%E6%A0%BC%E5%BC%8F2.drawio.png)

来总结下。

按照一定规则把**符号**和计算机里的**二进制码**对应起来，这就是**编码**。而把 n 多这种已经编码的字符聚在一起，就是我们常说的**字符集**。

比如 utf-8 字符集就是所有 utf-8 编码格式的字符的合集。

> 当然，这里说的 utf-8 字符集，其实就是 unicode 字符集。

![字符和字符集的关系](https://cdn.xiaobaidebug.top/image/%E5%AD%97%E7%AC%A6%E5%92%8C%E5%AD%97%E7%AC%A6%E9%9B%86%E7%9A%84%E5%85%B3%E7%B3%BB3.drawio.png)

<br>

## mysql 的字符集

想看下 mysql 支持哪些字符集。可以执行 `show charset;`

![数据库支持哪些字符集](https://cdn.xiaobaidebug.top/image/%E6%95%B0%E6%8D%AE%E5%BA%93%E6%94%AF%E6%8C%81%E5%93%AA%E4%BA%9B%E5%AD%97%E7%AC%A6%E9%9B%86.png)

上面这么多字符集，我们只需要关注 utf8 和 utf8mb4 字符集就够了。

<br>

### utf8 和 utf8mb4 的区别

注意下面的内容非常容易晕，大家请**放慢阅读速度，关注下 utf 和 8 之间有没有横杠"-"。**

上面提到 utf-8 编码是 unicode 字符集的众多编码中的一种，utf-8 也一样可以表示所有字符，为了避免混淆，我在后面叫它**大 utf8**。

而从上面 mysql 支持的字符集的图里，我们看到了 utf8 和 utf8mb4。

先说**utf8mb4**编码，mb4 就是**most bytes 4**的意思，从上图最右边的`Maxlen`可以看到，它最大支持用**4 个字节**来表示字符，它几乎可以用来表示目前已知的所有的字符。

再说 mysql 字符集里的**utf8**，它是数据库的**默认字符集**。但注意，**此 utf8 非彼 utf-8**，我们叫它**小 utf8**字符集。

注意，这里的**小 utf8**和上面提到的**大 utf8**，并不是一回事。

为什么这么说，因为从 Maxlen 可以看出，它最多支持用 3 个字节去表示字符，按 utf8mb4 的命名方式，准确点应该叫它**utf8mb3**。

它就像是阉割版的 utf8mb4，只支持部分字符。比如 emoji 表情，它就不支持。

![utf8mb3和utf8mb4的关系](https://cdn.xiaobaidebug.top/image/utf8mb3%E5%92%8Cutf8mb4%E7%9A%84%E5%85%B3%E7%B3%BB5.drawio.png)

<br>

而 mysql 支持的字符集里，第三列，**collation**，它是指**字符集的比较规则**。

比如，**"debug"和"Debug"**是同一个单词，但它们大小写不同，该不该判为同一个单词呢。

这时候就需要用到 collation 了。

通过`SHOW COLLATION WHERE Charset = 'utf8mb4';`可以查看到`utf8mb4`下支持什么比较规则。

![utf8mb4字符集比较规则](https://cdn.xiaobaidebug.top/image/utf8mb4%E5%AD%97%E7%AC%A6%E9%9B%86%E6%AF%94%E8%BE%83%E8%A7%84%E5%88%99-20220421210049625.png)

如果`collation = utf8mb4_general_ci`，是指使用 utf8mb4 字符集前提下，**挨个字符进行比较**（`general`），并且不区分大小写（`_ci，case insensitice`）。

这种情况下，**"debug"和"Debug"是同一个单词**。

![对比规则-大小写不敏感](https://cdn.xiaobaidebug.top/image/%E5%AF%B9%E6%AF%94%E8%A7%84%E5%88%99-%E5%A4%A7%E5%B0%8F%E5%86%99%E4%B8%8D%E6%95%8F%E6%84%9F2.png)

如果改成`collation=utf8mb4_bin`，就是指**挨个比较二进制位大小**。

于是**"debug"和"Debug"就不是同一个单词。**

![对比规则-大小写敏感](https://cdn.xiaobaidebug.top/image/%E5%AF%B9%E6%AF%94%E8%A7%84%E5%88%99-%E5%A4%A7%E5%B0%8F%E5%86%99%E6%95%8F%E6%84%9F.png)

<br>

### 那 utf8mb4 对比 utf8mb3 有什么劣势吗？

我们知道数据库表里，字段类型如果是 char(2)的话，里面的 2 是指**字符个数**，也就是说**不管这张表用的是什么字符集**，都能放上 2 个字符。

而 char 又是**固定长度**，为了能放下 2 个 utf8mb4 的字符，char 会默认保留`2*4（maxlen=4）= 8`个字节的空间。

如果是 utf8mb3，则会默认保留 2 \* 3 (maxlen=3) = 6 个字节的空间。也就是说，在这种情况下，**utf8mb4 会比 utf8mb3 多使用一些空间。**

但这真的无关紧要，如果我不用 char，用 varchar 就好了，varchar 不是固定长度，也就没有上面这些麻烦事了。

所以我**个人认为，utf8mb4 比起 utf8mb3 几乎没有劣势。**

<br>

### 如何查看数据库表的字符集

如果我们不知道自己的表是用的哪种字符集，可以通过下面的方式进行查看。

![查看数据库表的字符集](https://cdn.xiaobaidebug.top/image/%E6%9F%A5%E7%9C%8B%E6%95%B0%E6%8D%AE%E5%BA%93%E8%A1%A8%E7%9A%84%E5%AD%97%E7%AC%A6%E9%9B%862.png)

<br>

## 再看报错原因

到这里，我们回到文章开头的问题。

因为数据库表在建表的时候使用 `DEFAULT CHARSET=utf8`， 相当于指定了`utf8mb3`字符集格式。

而在执行 insert 数据的时候，又不讲武德，加入了 emoji 表情这种`utf8mb4`才能支持的字符，mysql 识别到这是`utf8mb3`不支持的字符，于是忍痛报错。

要修复也很简单，执行下面的 sql 语句，就可以把数据库表的字符集改成`utf8mb4`。

```sql
ALTER TABLE user CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```

**答应我，以后建表，我们都无脑选 utf8mb4。**

选 utf8 除了在 char 字段场景下会比 utf8mb4 稍微省一点空间外，几乎没任何好处。

这点空间省下来了能提高你的绩效吗？不能。

但如果因此炸雷了，那你号就没了。

<br>

## 总结

- ASCII 编码支持数字和字母。大佬们为了支持中文引入了 GB2312 编码格式，其他国家的大佬们为了支持更多语言和符号，也引入了相应的编码格式。但他们都不能表达所有的字符，为了统一，于是有了 unicode 字符集，但它在计算机中的存储方式可以有很多种，比如有 utf-32 和 utf-16 编码格式，而 utf-8 则在 utf-32 和 utf-16 的基础上做了优化，压缩了空间。也就是说，utf-8, utf-16, utf32 都只是 unicode 字符集的编码格式而已。
- mysql 默认的 utf8 字符集，其实只是 utf8mb3，并不完整，当插入 emoji 表情等特殊字符时，会报错，导致插入、更新数据失败。改成 utf8mb4 就好了，它能支持更多字符。
- mysql 建表时如果不知道该选什么字符集，无脑选 utf8mb4 就行了，你会感谢我的。

## 参考资料

《从根儿上理解 mysql》

<br>

## 最后

原本 A 同学设计这张表的时候非常简单，也有字符串类型的字段，但字段含义决定了肯定不会有奇奇怪怪的字符，用 utf8 很合理，还省空间。

后来交接给了 B 同学，B 同学在这基础上加过非常多的字段，离职前最后一个需求加的这个名称字段，所幸并没炸雷。最后到了我这里。

好一个**击鼓传雷**。

有点东西哦。

![](https://cdn.xiaobaidebug.top/image/images.jpeg)

<br>

那么问题来了。

这样的一个事故，复盘会一开，会挂 P 几呢？

![](https://cdn.xiaobaidebug.top/image/a6a681ebgy1gp1tujp12gj208c08cmxb.jpg)

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
