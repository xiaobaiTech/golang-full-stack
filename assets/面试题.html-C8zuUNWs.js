import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as e,c as i,e as a}from"./app-Bdt4EgWg.js";const n="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.033.jpeg",s={},p=a(`<h1 id="mysql面试题" tabindex="-1"><a class="header-anchor" href="#mysql面试题"><span><strong>MySQL面试题</strong></span></a></h1><h2 id="隔离级别与锁的关系" tabindex="-1"><a class="header-anchor" href="#隔离级别与锁的关系"><span>隔离级别与锁的关系</span></a></h2><p>回答这个问题，可以先阐述四种隔离级别，再阐述它们的实现原理。隔离级别就是依赖锁 和 MVCC 实现的。</p><h2 id="实践中如何优化-mysql" tabindex="-1"><a class="header-anchor" href="#实践中如何优化-mysql"><span>实践中如何优化 MySQL？</span></a></h2><p>最好是按照以下顺序优化：</p><ul><li><p>SQL 语句及索引的优化</p></li><li><p>数据库表结构的优化</p></li><li><p>系统配置的优化</p></li><li><p>硬件的优化</p></li></ul><h2 id="优化子查询的方法" tabindex="-1"><a class="header-anchor" href="#优化子查询的方法"><span>优化子查询的方法</span></a></h2><ul><li><p>用关联查询替代。</p></li><li><p>优化 GROUP BY 和 DISTINCT。</p></li><li><p>这两种查询据可以使用索引来优化，是最有效的优化方法。 - 关联查询中，使用标识列分组的效率更高。</p></li><li><p>如果不需要 ORDER BY，进行 GROUP BY 时加 ORDER BY NULL，MySQL 不会再进行文件排序。</p></li><li><p>WITH ROLLUP 超级聚合，可以挪到应用程序处理。</p></li></ul><h2 id="前缀索引" tabindex="-1"><a class="header-anchor" href="#前缀索引"><span>前缀索引</span></a></h2><ul><li><p>语法：index(field(10))，使用字段值的前 10 个字符建立索引，默认是使用字段的全部内容建立索引。</p></li><li><p>前提：前缀的标识度高。比如密码就适合建立前缀索引，因为密码几乎各不相同。</p></li><li><p>实操的难度：在于前缀截取的长度。</p></li><li><p>我们可以利用 select count(*)/count(distinct left(password,prefixLen));，通过从调整 prefixLen 的值（从 1 自增）查看不同前缀长度的一个平均匹配度，接近 1 时就可 以了（表示一个密码的前 prefixLen 个字符几乎能确定唯一一条记录）。</p></li></ul><h2 id="mysql-5-6-和-mysql-5-7-对索引做了哪些优化" tabindex="-1"><a class="header-anchor" href="#mysql-5-6-和-mysql-5-7-对索引做了哪些优化"><span>MySQL 5.6 和 MySQL 5.7 对索引做了哪些优化？</span></a></h2><ul><li><p>MySQL5.6 引入了索引下推优化，默认是开启的。</p></li><li><p>例子：user 表中（a,b,c）构成一个索引。</p></li><li><p>select * from user where a=&#39;23&#39; and b like &#39;%eqw%&#39; and c like &#39;dasd&#39;。</p></li><li><p>解释：如果没有索引下推原则，则 MySQL 会通过 a=&#39;23&#39; 先查询出一个对应的数据。然后返回到 MySQL 服务端。MySQL 服务端再基于两个 like 模糊查询来校验 and 查询出的数据是否符合条件。这个过程就设计到回表操作。</p></li><li><p>如果使用了索引下推技术，则 MySQL 会首先返回返回条件 a=&#39;23&#39;的数据的索引，然后根据模糊查询的条件来校验索引行数据是否符合条件，如果符合条件，则直接根据 索引来定位对应的数据，如果不符合直接 reject 掉。因此，有了索引下推优化，可以 在有 like 条件的情况下，减少回表的次数。</p></li></ul><h2 id="mysql-有关权限的表有哪几个呢" tabindex="-1"><a class="header-anchor" href="#mysql-有关权限的表有哪几个呢"><span>MySQL 有关权限的表有哪几个呢？</span></a></h2><p>MySQL 服务器通过权限表来控制用户对数据库的访问，权限表存放在 MySQL 数据库 里，由 MySQL_install_db 脚本初始化。这些权限表分别 user，db，table_priv， columns_priv 和 host。</p><p>user 权限表：记录允许连接到服务器的用户帐号信息，里面的权限是全局级的。 2、 db 权限表：记录各个帐号在各个数据库上的操作权限。</p><p>table_priv 权限表：记录数据表级的操作权限。</p><p>columns_priv 权限表：记录数据列级的操作权限。</p><p>host 权限表：配合 db 权限表对给定主机上数据库级操作权限作更细致的控制。这个 权限表不受 GRANT 和 REVOKE语句的影响。</p><h2 id="mysql-中都有哪些触发器" tabindex="-1"><a class="header-anchor" href="#mysql-中都有哪些触发器"><span>MySQL 中都有哪些触发器？</span></a></h2><p>MySQ- 数据库中有六种触发器： - Before Insert</p><ul><li><p>After Insert</p></li><li><p>Before Update - After Update - Before Delete - After Delete</p></li></ul><h2 id="大表怎么优化-分库分表了是怎么做的-分表分库了有什么问题-有用到中间件么-他们的原理知道么" tabindex="-1"><a class="header-anchor" href="#大表怎么优化-分库分表了是怎么做的-分表分库了有什么问题-有用到中间件么-他们的原理知道么"><span>大表怎么优化？分库分表了是怎么做的？分表分库了有什么问题？ 有用到中间件么？他们的原理知道么？</span></a></h2><p>当 MySQL 单表记录数过大时，数据库的 CRUD 性能会明显下降，一些常见的优化措施如 下：</p><ul><li>限定数据的范围： 务必禁止不带任何限制数据范围条件的查询语句。比如：我们当用</li></ul><p>户在查询订单历史的时候，我们可以控制在一个月的范围内。；</p><ul><li><p>读/写分离： 经典的数据库拆分方案，主库负责写，从库负责读；</p></li><li><p>缓存： 使用 MySQL 的缓存，另外对重量级、更新少的数据可以考虑使用应用级别的</p></li></ul><p>缓存； <strong>还有就是通过分库分表的方式进行优化。主要有垂直分区、垂直分表、水平分区、水平分 表</strong></p><p><strong>垂直分区</strong></p><p>根据数据库里面数据表的相关性进行拆分。 例如，用户表中既有用户的登录信息又有 用户的基本信息，可以将用户表拆分成两个单独的表，甚至放到单独的库做分库。</p><p>简单来说垂直拆分是指数据表列的拆分，把一张列比较多的表拆分为多张表。 如下图 所示，这样来说大家应该就更容易理解了。</p><figure><img src="https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.001.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p><strong>垂直拆分的优点：</strong></p><p>可以使得行数据变小，在查询时减少读取的 Block 数，减少 I/O 次数。此外，垂直分区可 以简化表的结构，易于维护。</p><p><strong>垂直拆分的缺点：</strong></p><p>主键会出现冗余，需要管理冗余列，并会引起 Join 操作，可以通过在应用层进行 Join 来 解决。此外，垂直分区会让事务变得更加复杂。</p><p><strong>垂直分表</strong></p><p>把主键和一些列放在一个表，然后把主键和另外的列放在另一个表中</p><figure><img src="https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.003.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>适用场景</p><ul><li><p>如果一个表中某些列常用，另外一些列不常用</p></li><li><p>可以使数据行变小，一个数据页能存储更多数据，查询时减少 I/O 次数</p></li></ul><p>缺点</p><ul><li>有些分表的策略基于应用层的逻辑算法，一旦逻辑算法改变，整个分表逻辑都会改</li></ul><p>变，扩展性较差</p><ul><li><p>对于应用层来说，逻辑算法增加开发成本</p></li><li><p>管理冗余列，查询所有数据需要 join 操作</p></li></ul><p>水平分区</p><ul><li>保持数据表结构不变，通过某种策略存储数据分片。这样每一片数据分散到不同的表</li></ul><p>或者库中，达到了分布式的目的。 水平拆分可以支撑非常大的数据量。</p><ul><li>水平拆分是指数据表行的拆分，表的行数超过 200 万行时，就会变慢，这时可以把一</li></ul><p>张的表的数据拆成多张表来存放。举个例子：我们可以将用户信息表拆分成多个用户 信息表，这样就可以避免单一表数据量过大对性能造成影响。</p><figure><img src="https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.004.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>水品拆分可以支持非常大的数据量。需要注意的一点是</li></ul><p>过大的问题，但由于表的数据还是在同一台机器上，其实对于提升 没有什么意义，所以 水平拆分最好分库 。</p><p>:分表仅仅是解决了单一表数据</p><p>MySQL 并发能力</p><ul><li>水平拆分能够支持非常大的数据量存储，应用端改造也少，但 分片事务难以解决 ，</li></ul><p>跨界点 Join 性能较差，逻辑复杂。</p><p><strong>水平分表：</strong> 表很大，分割后可以降低在查询时需要读的数据和索引的页数，同时也降低了索引的层 数，提高查询次数。</p><p>![](/Users/zhaolun.lin/Documents/self/计算机基础/其他/Golang部分/Converted documents/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.005.jpeg)</p><p>适用场景</p><ul><li>表中的数据本身就有独立性，例如表中分表记录各个地区的数据或者不同时期的数</li></ul><p>据，特别是有些数据常用，有些不常用。</p><ul><li>需要把数据存放在多个介质上。</li></ul><p>水平切分的缺点</p><ul><li>给应用增加复杂度，通常查询时需要多个表名，查询所有数据都需 UNION 操作。 - 在许多数据库应用中，这种复杂度会超过它带来的优点，查询时会增加读一个索引层</li></ul><p>的磁盘次数。</p><p><strong>数据库分片的两种常见方案：</strong></p><p><strong>客户端代理：</strong></p><p>分片逻辑在应用端，封装在 jar 包中，通过修改或者封装 JDBC 层来实现。当当网 的 Sharding-JDBC 、阿里的 TDDL是两种比较常用的实现。</p><p><strong>中间件代理：</strong></p><p>在应用和数据中间加了一个代理层。分片逻辑统一维护在中间件服务中。** 我们现在谈的 Mycat** 、360 的 Atlas、网易的 DDB 等等都是这种架构的实现。</p><p><strong>分库分表后面临的问题</strong></p><p><strong>事务支持</strong></p><p>分库分表后，就成了分布式事务了。如果依赖数据库本身的分布式事务管理功能去执行事 务，将付出高昂的性能代价； 如果由应用程序去协助控制，形成程序逻辑上的事务，又会 造成编程方面的负担。</p><p><strong>跨库 join</strong></p><p>只要是进行切分，跨节点 Join 的问题是不可避免的。但是良好的设计和切分却可以减少此 类情况的发生。解决这一问题的普遍做法是分两次查询实现。在第一次查询的结果集中找 出关联数据的 id,根据这些 id 发起第二次请求得到关联数据。 <strong>数据迁移，容量规划，扩容等问题</strong></p><p>来自淘宝综合业务平台团队，它利用对 2 的倍数取余具有向前兼容的特性（如对 4 取余得 1 的数对 2 取余也是 1）来分配数据，避免了行级别的数据迁移，但是依然需要进行表级 别的迁移，同时对扩容规模和分表数量都有限制。总得来说，这些方案都不是十分的理</p><p>想，多多少少都存在一些缺点，这也从一个侧面反映出了 Sharding 扩容的难度。</p><p><strong>ID 问题</strong></p><p>一旦数据库被切分到多个物理结点上，我们将不能再依赖数据库自身的主键生成机制。一 方面，某个分区数据库自生成的 ID 无法保证在全局上是唯一的；另一方面，应用程序在 插入数据之前需要先获得 ID,以便进行 SQL 路由、一些常见的主键生成策略</p><p>UUID 使用 UUID 作主键是最简单的方案，但是缺点也是非常明显的。由于 UUID 非常的 长，除占用大量存储空间外，最主要的问题是在索引上，在建立索引和基于索引进行查询 时都存在性能问题。 Twitter 的分布式自增 ID 算法 Snowflake 在分布式系统中，需要生 成全局 UID 的场合还是比较多的，twitter 的 snowflake 解决了这种需求，实现也还是很 简单的，除去配置信息，核心代码就是毫秒级时间 41 位 机器 ID 10 位 毫秒内序列 12 位。</p><p><strong>跨分片的排序分页问题</strong></p><p>一般来讲，分页时需要按照指定字段进行排序。当排序字段就是分片字段的时候，我们通 过分片规则可以比较容易定位到指定的分片，而当排序字段非分片字段的时候，情况就会 变得比较复杂了。为了最终结果的准确性，我们需要在不同的分片节点中将数据进行排序 并返回，并将不同分片返回的结果集进行汇总和再次排序，最后再返回给用户。如下图所 示：</p><figure><img src="https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.006.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="b-tree-索引和-hash-索引区别" tabindex="-1"><a class="header-anchor" href="#b-tree-索引和-hash-索引区别"><span>B+ Tree 索引和 Hash 索引区别？</span></a></h2><ul><li><p>hash 索引适合等值查询，但是无法进行范围查询。</p></li><li><p>hash 索引没办法利用索引完成排序。</p></li><li><p>hash 索引不支持多列联合索引的最左匹配规则。</p></li><li><p>如果有大量重复健值得情况下，hash 索引的效率会很低，因为哈希碰撞问题。</p></li></ul><h2 id="数据库索引的原理-为什么要用-b-树-为什么不用二叉树" tabindex="-1"><a class="header-anchor" href="#数据库索引的原理-为什么要用-b-树-为什么不用二叉树"><span>数据库索引的原理，为什么要用 B+树，为什么不用二叉树？</span></a></h2><p>可以从几个维度去看这个问题，查询是否够快，效率是否稳定，存储数据多少，以及查找 磁盘次数，为什么不是二叉树，为什么不是平衡二叉树，为什么不是 B树，而偏偏是 B+</p><p>树呢？</p><p><strong>为什么不是一般二叉树？</strong> 如果二叉树特殊化为一个链表，相当于全表扫描。平衡二叉树相比于二叉查找树来说，查 找效率更稳定，总体的查找速度也更快。</p><p><strong>为什么不是平衡二叉树呢？</strong> 我们知道，在内存比在磁盘的数据，查询效率快得多。如果树这种数据结构作为索引，那 我们每查找一次数据就需要从磁盘中读取一个节点，也就是我们说的一个磁盘块，但是平 衡二叉树可是每个节点只存储一个键值和数据的，如果是 B树，可以存储更多的节点数 据，树的高度也会降低，因此读取磁盘的次数就降下来啦，查询效率就快啦。 <strong>那为什么不是 B 树而是 B+树呢？</strong></p><p>1）B+树非叶子节点上是不存储数据的，仅存储键值，而 B树节点中不仅存储键值，也会 存储数据。innodb 中页的默认大小是 16KB，如果不存储数据，那么就会存储更多的键 值，相应的树的阶数（节点的子节点树）就会更大，树就会更矮更胖，如此一来我们查找 数据进行磁盘的 IO 次数有会再次减少，数据查询的效率也会更快。 2）B+树索引的所有数据均存储在叶子节点，而且数据是按照顺序排列的，链表连着的。 那么 B+树使得范围查找，排序查找，分组查找以及去重查找变得异常简单。</p><h2 id="据库三大范式是什么" tabindex="-1"><a class="header-anchor" href="#据库三大范式是什么"><span>据库三大范式是什么</span></a></h2><ul><li>第一范式：每个列都不可以再拆分。</li><li>第二范式：在第一范式的基础上，非主键列完全依赖于主键，而不能是依赖于主键的一部分。</li><li>第三范式：在第二范式的基础上，非主键列只依赖于主键，不依赖于其他</li></ul><p>非主键。</p><p>在设计数据库结构的时候，要尽量遵守三范式，如果不遵守，必须有足够的理由。比如性能。事实上我们经常会为了性能而妥协数据库的设计。</p><h2 id="mysql-有关权限的表都有哪几个" tabindex="-1"><a class="header-anchor" href="#mysql-有关权限的表都有哪几个"><span>MySQL 有关权限的表都有哪几个？</span></a></h2><p>MySQL服务器通过权限表来控制用户对数据库的访问，权限表存放在 mysql 数据库里，由 mysql_install_db 脚本初始化。这些权限表分别 user，db， table_priv，columns_priv 和 host。下面分别介绍一下这些表的结构和内容：</p><ul><li>user 权限表：记录允许连接到服务器的用户帐号信息，里面的权限是全局级的。</li><li>db 权限表：记录各个帐号在各个数据库上的操作权限。</li><li>table_priv 权限表：记录数据表级的操作权限。</li><li>columns_priv 权限表：记录数据列级的操作权限。</li><li>host 权限表：配合 db 权限表对给定主机上数据库级操作权限作更细致的控制。这个权限表不受 GRANT和 REVOKE语句的影响。</li></ul><h2 id="mysql-的-binlog-有有几种录入格式-分别有什么区别" tabindex="-1"><a class="header-anchor" href="#mysql-的-binlog-有有几种录入格式-分别有什么区别"><span>MySQL 的 Binlog 有有几种录入格式？分别有什么区别？</span></a></h2><p>有三种格式，statement，row和 mixed。</p><ul><li>statement 模式下，每一条会修改数据的 sql 都会记录在 binlog 中。不需要记录每一行的变化，减少了 binlog 日志量，节约了 IO，提高性能。由于 sql 的执行是有上下文的，因此在保存的时候需要保存相关的信息，同时还有一些使用了函数之类的语句无法被记录复制。</li><li>row级别下，不记录 sql 语句上下文相关信息，仅保存哪条记录被修改。记录单元为每一行的改动，基本是可以全部记下来但是由于很多操作，会导致大量行的改动(比如 alter table)，因此这种模式的文件保存的信息太多，日志量太大。</li><li>mixed，一种折中的方案，普通操作使用 statement 记录，当无法使用 statement 的时候使用 row。</li></ul><h2 id="mysql-存储引擎-myisam-与-innodb-区别" tabindex="-1"><a class="header-anchor" href="#mysql-存储引擎-myisam-与-innodb-区别"><span>MySQL 存储引擎 MyISAM 与 InnoDB 区别</span></a></h2><ul><li>锁粒度方面：由于锁粒度不同，InnoDB比 MyISAM支持更高的并发;InnoDB 的锁粒度为行锁、MyISAM的锁粒度为表锁、行锁需要对每一行进行加锁，所以锁的开销更大，但是能解决脏读和不可重复读的问题，相对来说也更容易发生死锁</li><li>可恢复性上：由于 InnoDB是有事务日志的，所以在产生由于数据库崩溃等条件后，可以根据日志文件进行恢复。而 MyISAM 则没有事务日志。</li><li>查询性能上:MylSAM要优于 InnoDB因为 InnoDB在查询过程中，是需要维护数据缓存，而且查询过程是先定位到行所在的数据块，然后在从数据块中定位到要查找的行;而 MyISAM 可以直接定位到数据所在的内存地址，可以直接找到数据。</li><li>表结构文件上:MyISAM的表结构文件包括:frm(表结构定义),.MYI(索引),.MYD(数据);而 InnoDB的表数据文件为:ibd 和 frm(表结构定义)。</li></ul><h2 id="myisam-索引与-innodb-索引的区别" tabindex="-1"><a class="header-anchor" href="#myisam-索引与-innodb-索引的区别"><span>MyISAM 索引与 InnoDB 索引的区别？</span></a></h2><ul><li>InnoDB索引是聚簇索引，MyISAM索引是非聚簇索引。</li><li>InnoDB的主键索引的叶子节点存储着行数据，因此主键索引非常高效。</li><li>MyISAM索引的叶子节点存储的是行数据地址，需要再寻址一次才能得到数据。</li><li>InnoDB非主键索引的叶子节点存储的是主键和其他带索引的列数据，因此查询时做到覆盖索引会非常高效。</li></ul><h2 id="什么是索引" tabindex="-1"><a class="header-anchor" href="#什么是索引"><span>什么是索引？</span></a></h2><p>索引是一种特殊的文件(InnoDB数据表上的索引是表空间的一个组成部分)，它们包含着对数据表里所有记录的引用指针。索引是一种数据结构。数据库索引，是数据库管理系统中一个排序的数据结构，以协助快速查询、更新数据库表中数据。索引的实现通常使用 B树及其变种 B+树。</p><p>更通俗的说，索引就相当于目录。为了方便查找书中的内容，通过对内容建立索引形成目录。索引是一个文件，它是要占据物理空间的。</p><h2 id="索引有哪些优缺点" tabindex="-1"><a class="header-anchor" href="#索引有哪些优缺点"><span>索引有哪些优缺点？</span></a></h2><p><strong>索引的优点</strong></p><ul><li>可以大大加快数据的检索速度，这也是创建索引的最主要的原因。</li><li>通过使用索引，可以在查询的过程中，使用优化隐藏器，提高系统的性能。</li></ul><p><strong>索引的缺点</strong></p><ul><li>时间方面：创建索引和维护索引要耗费时间，具体地，当对表中的数据进行增加、删除和修改的时候，索引也要动态的维护，会降低增/改/删的执行效率；</li><li>空间方面：索引需要占物理空间。</li></ul><h2 id="索引有哪几种类型" tabindex="-1"><a class="header-anchor" href="#索引有哪几种类型"><span>索引有哪几种类型？</span></a></h2><p>主键索引:</p><p>数据列不允许重复，不允许为 NULL，一个表只能有一个主键。</p><p>唯一索引:</p><p>数据列不允许重复，允许为 NULL值，一个表允许多个列创建唯一索引。</p><ul><li>可以通过 ALTER TABLE table_name ADD UNIQUE (column); 创建唯一索</li></ul><p>引。</p><ul><li>可以通过 ALTER TABLE table_name ADD UNIQUE (column1,column2); 创建唯一组合索引。</li></ul><p>普通索引:</p><p>基本的索引类型，没有唯一性的限制，允许为 NULL值。</p><ul><li>可以通过 ALTER TABLE table_name ADD INDEX index_name (column);创建普通索引</li><li>可以通过 ALTER TABLE table_name ADD INDEX index_name(column1, column2, column3);创建组合索引。</li></ul><p>全文索引：</p><p>是目前搜索引擎使用的一种关键技术。</p><ul><li>可以通过 ALTER TABLE table_name ADD FULLTEXT (column);创建全文索引。</li></ul><h2 id="mysql-中有哪几种锁" tabindex="-1"><a class="header-anchor" href="#mysql-中有哪几种锁"><span>MySQL 中有哪几种锁？</span></a></h2><ul><li>表级锁：开销小，加锁快；不会出现死锁；锁定粒度大，发生锁冲突的概率最高，并发度最低。</li><li>行级锁：开销大，加锁慢；会出现死锁；锁定粒度最小，发生锁冲突的概率最低，并发度也最高。</li><li>页面锁：开销和加锁时间界于表锁和行锁之间；会出现死锁；锁定粒度界于表锁和行锁之间，并发度一般。</li></ul><h2 id="mysql-中-innodb-支持的四种事务隔离级别名称-以及逐级之间的区别" tabindex="-1"><a class="header-anchor" href="#mysql-中-innodb-支持的四种事务隔离级别名称-以及逐级之间的区别"><span>MySQL 中 InnoDB 支持的四种事务隔离级别名称，以及逐级之间的区别？</span></a></h2><p>SQL标准定义的四个隔离级别为：</p><ul><li>read uncommited：读到未提交数据</li><li>read committed：脏读，不可重复读</li><li>repeatable read：可重读</li><li>serializable：串行事物</li></ul><h2 id="char-和-varchar-的区别" tabindex="-1"><a class="header-anchor" href="#char-和-varchar-的区别"><span>char 和 varchar 的区别？</span></a></h2><ul><li>char 和 varchar 类型在存储和检索方面有所不同</li><li>char 列长度固定为创建表时声明的长度，长度值范围是1 到255</li><li>当 char 值被存储时，它们被用空格填充到特定长度，检索 char 值时需删除尾随空格。</li></ul><h2 id="主键和候选键有什么区别" tabindex="-1"><a class="header-anchor" href="#主键和候选键有什么区别"><span>主键和候选键有什么区别？</span></a></h2><p>表格的每一行都由主键唯一标识,一个表只有一个主键。主键也是候选键。按照惯例，候选键可以被指定为主键，并且可以用于任何外键引用。</p><h2 id="如何在-unix-和-mysql-时间戳之间进行转换" tabindex="-1"><a class="header-anchor" href="#如何在-unix-和-mysql-时间戳之间进行转换"><span>如何在 Unix 和 MySQL 时间戳之间进行转换？</span></a></h2><p>UNIX_TIMESTAMP是从 Mysql时间戳转换为 Unix 时间戳的命令 FROM_UNIXTIME 是从 Unix 时间戳转换为 Mysql时间戳的命令。</p><h2 id="myisam-表类型将在哪里存储-并且还提供其存储格式" tabindex="-1"><a class="header-anchor" href="#myisam-表类型将在哪里存储-并且还提供其存储格式"><span>MyISAM 表类型将在哪里存储，并且还提供其存储格式？</span></a></h2><p>每个 MyISAM 表格以三种格式存储在磁盘上：</p><ul><li>“.frm”文件存储表定义</li><li>数据文件具有“.MYD”（MYData）扩展名</li><li>索引文件具有“.MYI”（MYIndex）扩展名</li></ul><h2 id="mysql-里记录货币用什么字段类型好" tabindex="-1"><a class="header-anchor" href="#mysql-里记录货币用什么字段类型好"><span>MySQL 里记录货币用什么字段类型好</span></a></h2><p>NUMERIC和 DECIMAL类型被 Mysql实现为同样的类型，这在 SQL92标准允许。他们被用于保存值，该值的准确精度是极其重要的值，例如与金钱有关的数据。当声明一个类是这些类型之一时，精度和规模的能被(并且通常是)指定。例如：</p><p>salary DECIMAL(9,2)</p><p>在这个例子中，9(precision)代表将被用于存储值的总的小数位数，而2(scale)代表将被用于存储小数点后的位数。因此，在这种情况下，能被存储在 salary 列中的值的范围是从-9999999.99 到9999999.99。</p><h2 id="创建索引时需要注意什么" tabindex="-1"><a class="header-anchor" href="#创建索引时需要注意什么"><span>创建索引时需要注意什么？</span></a></h2><ul><li>非空字段：应该指定列为 NOT NULL，除非你想存储 NULL。在 mysql 中，含有空值的列很难进行查询优化，因为它们使得索引、索引的统计信息以及比较运算更加复杂。应该用0、一个特殊的值或者一个空串代替空值；</li><li>取值离散大的字段：（变量各个取值之间的差异程度）的列放到联合索引的前面，可以通过 count()函数查看字段的差异值，返回值越大说明字段的唯一值越多字段的离散程度高；</li><li>索引字段越小越好：数据库的数据存储以页为单位一页存储的数据越多一次 IO操作获取的数据越大效率越高。</li></ul><h2 id="使用索引查询一定能提高查询的性能吗-为什么" tabindex="-1"><a class="header-anchor" href="#使用索引查询一定能提高查询的性能吗-为什么"><span>使用索引查询一定能提高查询的性能吗？为什么</span></a></h2><p>通常，通过索引查询数据比全表扫描要快。但是我们也必须注意到它的代价。索引需要空间来存储，也需要定期维护，每当有记录在表中增减或索引列被修改时，索引本身也会被修改。这意味着每条记录的 INSERT，DELETE，UPDATE 将为此多付出4，5 次的磁盘 I/O。因为索引需要额外的存储空间和处理，那些不必要的索引反而会使查询反应时间变慢。使用索引查询不一定能提高查询性能，索引范围查询(INDEX RANGE SCAN)适用于两种情况:</p><ul><li>基于一个范围的检索，一般查询返回结果集小于表中记录数的30%</li><li>基于非唯一性索引的检索</li></ul><h2 id="百万级别或以上的数据如何删除" tabindex="-1"><a class="header-anchor" href="#百万级别或以上的数据如何删除"><span>百万级别或以上的数据如何删除</span></a></h2><p>关于索引：由于索引需要额外的维护成本，因为索引文件是单独存在的文件,所以当我们对数据的增加,修改,删除,都会产生额外的对索引文件的操作,这些操作需要消耗额外的 IO,会降低增/改/删的执行效率。所以，在我们删除数据库百万级别数据的时候，查询 MySQL官方手册得知删除数据的速度和创建的索引数量是成正比的。</p><ul><li>所以我们想要删除百万数据的时候可以先删除索引（此时大概耗时三分多钟）</li><li>然后删除其中无用数据（此过程需要不到两分钟）</li><li>删除完成后重新创建索引(此时数据较少了)创建索引也非常快，约十分钟左右。</li><li>与之前的直接删除绝对是要快速很多，更别说万一删除中断,一切删除会回滚。那更是坑了。</li></ul><h2 id="什么是最左前缀原则-什么是最左匹配原则" tabindex="-1"><a class="header-anchor" href="#什么是最左前缀原则-什么是最左匹配原则"><span>什么是最左前缀原则？什么是最左匹配原则</span></a></h2><p>顾名思义，就是最左优先，在创建多列索引时，要根据业务需求，where 子句中使用最频繁的一列放在最左边。</p><p>最左前缀匹配原则，非常重要的原则，mysql 会一直向右匹配直到遇到范围查询(&gt;、&lt;、between、like)就停止匹配，比如 a = 1 and b = 2 and c &gt; 3 and d = 4 如果建立(a,b,c,d)顺序的索引，d 是用不到索引的，如果建立(a,b,d,c)的索引则都可以用到，a,b,d 的顺序可以任意调整。=和 in 可以乱序，比如 a = 1 and b = 2 and c = 3 建立(a,b,c)索引可以任意顺序，mysql 的查询优化器会帮你优化成索引可以识别的形式。</p><h2 id="什么是聚簇索引-何时使用聚簇索引与非聚簇索引" tabindex="-1"><a class="header-anchor" href="#什么是聚簇索引-何时使用聚簇索引与非聚簇索引"><span>什么是聚簇索引？何时使用聚簇索引与非聚簇索引</span></a></h2><ul><li>聚簇索引：将数据存储与索引放到了一块，找到索引也就找到了数据</li><li>非聚簇索引：将数据存储于索引分开结构，索引结构的叶子节点指向了数据的对应行，myisam通过 key_buffer 把索引先缓存到内存中，当需要访问数据时（通过索引访问数据），在内存中直接搜索索引，然后通过索引找到磁盘相应数据，这也就是为什么索引不在 key buffer 命中时，速度慢的原因。</li></ul><h2 id="mysql-连接器" tabindex="-1"><a class="header-anchor" href="#mysql-连接器"><span>MySQL 连接器</span></a></h2><p>首先需要在 MySQL客户端登陆才能使用，所以需要个连接器来连接用户和 MySQL数据库，我们一般是使用</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>mysql-u 用户名-p 密码
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>来进行 MySQL登陆，和服务端建立连接。在完成 TCP握手后，连接器会根据你输入的用户名和密码验证你的登录身份。如果用户名或者密码错误，MySQL就会提示 Access denied for user，来结束执行。如果登录成功后，MySQL会根据权限表中的记录来判定你的权限。</p><h2 id="mysql-查询缓存" tabindex="-1"><a class="header-anchor" href="#mysql-查询缓存"><span>MySQL 查询缓存</span></a></h2><p>连接完成后，你就可以执行 SQL语句了，这行逻辑就会来到第二步:查询缓存。 MySQL在得到一个执行请求后，会首先去查询缓存中查找，是否执行过这条 SQL语句，之前执行过的语句以及结果会以 key-value 对的形式，被直接放在内存中。key 是查询语句，value 是查询的结果。</p><p>如果通过 key 能够查找到这条 SQL语句，就直接妾返回 SQL的执行结果。</p><p>如果语句不在查询缓存中，就会继续后面的执行阶段。执行完成后，执行结果就会被放入查询缓存中。</p><p>可以看到，如果查询命中缓存，MySQL不需要执行后面的复杂操作，就可以直接返回结果，效率会很高。</p><h2 id="mysql-分析器" tabindex="-1"><a class="header-anchor" href="#mysql-分析器"><span>MySQL 分析器</span></a></h2><p>如果没有命中查询，就开始执行真正的 SQL语句。</p><ul><li>首先，MySQL会根据你写的 SQL语句进行解析，分析器会先做词法分析，你</li></ul><p>写的 SQL就是由多个字符串和空格组成的一条 SQL语句，MySQL需要识别出里面的字符串是什么，代表什么。</p><ul><li>然后进行语法分析，根据词法分析的结果，语法分析器会根据语法规则，判断你输入的这个 SQL语句是否满足 MySQL语法。如果 SQL语句不正确，就会提示 You have an error in your SQL syntax。</li></ul><h2 id="mysql-优化器" tabindex="-1"><a class="header-anchor" href="#mysql-优化器"><span>MySQL 优化器</span></a></h2><p>经过分析器的词法分析和语法分析后，你这条 SQL就合法了，MySQL就知道你要做什么了。但是在执行前，还需要进行优化器的处理，优化器会判断你使用了哪种索引，使用了何种连接，优化器的作用就是确定效率最高的执行方案。</p><h2 id="mysql-执行器" tabindex="-1"><a class="header-anchor" href="#mysql-执行器"><span>MySQL 执行器</span></a></h2><p>MySQL通过分析器知道了你的 SQL语句是否合法，你想要做什么操作，通过优化器知道了该怎么做效率最高，然后就进入了执行阶段，开始执行这条 SQL语句在执行阶段，MySQL首先会判断你有没有执行这条语句的权限，没有权限的话，就会返回没有权限的错误。如果有权限，就打开表继续执行。打开表的时候，执行器就会根据表的引擎定义，去使用这个引擎提供的接口。对于有索引的表，执行的逻辑也差不多。</p><h2 id="什么是临时表-何时删除临时表" tabindex="-1"><a class="header-anchor" href="#什么是临时表-何时删除临时表"><span>什么是临时表，何时删除临时表？</span></a></h2><p>什么是临时表?MySQL在执行 SQL语句的过程中通常会临时创建一些存储中间结果集的表，临时表只对当前连接可见，在连接关闭时，临时表会被删除并释放所有表空间。</p><p>临时表分为两种:一种是内存临时表，一种是磁盘临时表，什么区别呢?内存临时表使用的是 MEMORY存储引擎，而临时表采用的是 MylSAM 存储引擎。</p><p>MySQL会在下面这几种情况产生临时表。</p><ul><li>使用 UNION查询:UNION有两种，一种是 UNION，一种是 UNION ALL，它们都用于联合查询;区别是使用 UNION会去掉两个表中的重复数据，相当于对结果集做了一下去重(distinct)。使用 UNIONALL，则不会排重，返回所有的行。使用 UNION查询会产生临时表。</li><li>使用 TEMPTABLE算法或者是 UNION查询中的视图。TEMPTABLE算法是一种创建临时表的算法，它是将结果放置到临时表中，意味这要 MySQL要先创建好一个临时表，然后将结果放到临时表中去，然后再使用这个临时表进行相应的查询。</li><li>ORDER BY和 GROUPBY的子句不一样时也会产生临时表。</li><li>DISTINCT 查询并且加上 ORDER BY时;</li><li>SQL中用到 SQL_SMALL_RESULT选项时;如果查询结果比较小的时候，可以加上 SQL SMALL RESULT来优化，产生临时表</li><li>FROM中的子查询;</li><li>EXPLAIN 查看执行计划结果的 Extra 列中，如果使用 Using Temporary 就表示会用到临时表。</li></ul><h2 id="谈谈-sql-优化的经验" tabindex="-1"><a class="header-anchor" href="#谈谈-sql-优化的经验"><span>谈谈 SQL 优化的经验</span></a></h2><ul><li>查询语句无论是使用哪种判断条件等于、小于、大于，WHERE 左侧的条件查询字段不要使用函数或者表达式</li><li>使用 EXPLAIN 命令优化你的 SELECT 查询，对于复杂、效率低的 sql 语句，我们通常是使用 explainsql 来分析这条 sql 语句，这样方便我们分析，进行优化。</li><li>当你的 SELECT 查询语句只需要使用一条记录时，要使用 LIMIT 1。不要直接使用 SELECT*，而应该使用具体需要查询的表字段，因为使用 EXPLAIN 进行分析时，SELECT&quot;使用的是全表扫描，也就是 type =all 。</li><li>为每一张表设置一个 ID属性。</li><li>避免在 MHERE 字句中对字段进行 NULL</li><li>判断避免在 WHERE中使用!或&gt;操作符</li><li>使用 BETWEEN AND 替代 IN</li><li>为搜索字段创建索引</li><li>选择正确的存储引擎，InnoDB、MyISAM、MEMORY等</li><li>使用 LIKE%abc%不会走索引，而使用 LIKE abc%会走索引。</li><li>对于枚举类型的字段(即有固定罗列值的字段)，建议使用 ENUM 而不是 VARCHAR，如性别、星期、类型、类别等。</li><li>拆分大的 DELETE或 INSERT 语句</li><li>选择合适的字段类型，选择标准是尽可能小、尽可能定长、尽可能使用整数。</li><li>字段设计尽可能使用 NOT NULL</li><li>进行水平切割或者垂直分割</li></ul><h2 id="什么叫外链接" tabindex="-1"><a class="header-anchor" href="#什么叫外链接"><span>什么叫外链接？</span></a></h2><p>外连接分为三种，分别是是左外连接(LEFT OUTER J0IN 或 LEFT JOIN 右外连接(RIGHT OUTER JOIN 或 RIC GHT JOIN、全外连接(FULL OUTER JOIN 或 FULLJOIN)。</p><p>左外连接:又称为左连接，这种连接方式会显示左表不符合条件的数据行，右边不符合条件的数据行直接显示 NULL。</p><p>右外连接:也被称为右连接，他与左连接相对，这种连接方式会显示右表不符合条件的数据行，左表不符合条件的数据行直接显示 NULL。</p><h2 id="什么叫内链接" tabindex="-1"><a class="header-anchor" href="#什么叫内链接"><span>什么叫内链接？</span></a></h2><p>结合两个表中相同的字段，返回关联字段相符的记录就是内链接。</p><figure><img src="`+n+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="使用-union-和-union-all-时需要注意些什么" tabindex="-1"><a class="header-anchor" href="#使用-union-和-union-all-时需要注意些什么"><span>使用 union 和 union all 时需要注意些什么？</span></a></h2><p>通过 union 连接的 SQL分别单独取出的列数必须相同。</p><p>使用 union 时，多个相等的行将会被合并，由于合升比较耗时，一般不直接使用 union 进行合并，而是通常采用 union all 进行合并。</p><h2 id="myisam-存储引擎的特点" tabindex="-1"><a class="header-anchor" href="#myisam-存储引擎的特点"><span>MyISAM 存储引擎的特点</span></a></h2><p>在5.1 版本之前，MyISAM是 MySQL的默认存储引擎，MylSAM并发性比较差，使用的场景比较少主要特点是:</p><ul><li>不支持事务操作，ACID的特性也就不存在了，这一设计是为了性能和效率考虑的，</li><li>不支持外键操作，如果强行增加外键，MySQL不会报错，只不过外键不起作用。</li><li>MyISAM 默认的锁粒度是表级锁，所以并发性能比较差，加锁比较快，锁冲突比较少，不太容易发生死锁的情况。</li><li>MyISAM会在磁盘上存储三个文件，文件名和表名相同，扩展名分别是 frm(存储表定义)、MYD(MYData，存储数据)、MYI(MyIndex，存储索引)。这里需要特别注意的是 MyISAM只缓存索引文件，并不缓存数据文件。</li><li>MyISAM支持的索引类型有全局索引(Full-Text)、B-Tree 索引、R-Tree 索引 <ul><li>Full-Text 索引:它的出现是为了解决针对文本的模糊查询效率较低的问题。</li><li>B-Tree 索引:所有的索引节点都按照平衡树的数据结构来存储，所有的索引数据节点都在叶节点</li><li>R-Tree 索引:它的存储方式和 B-Tree 索引有一些区别，主要设计用于存储空间和多维数据的字段做索引目前的 MySQL版本仅支持 geometry 类型的字段作索引，相对于 BTREE,RTREE的优势在于范围查找。</li></ul></li><li>数据库所在主机如果宕机，MyISAM的数据文件容易损坏，而且难以恢复。</li><li>增删改查性能方面:SELECT性能较高，适用于查询较多的情况</li></ul><h2 id="innodb-存储引擎的特点" tabindex="-1"><a class="header-anchor" href="#innodb-存储引擎的特点"><span>InnoDB 存储引擎的特点</span></a></h2><p>自从 MySQL5.1之后，默认的存储引擎变成了 InnoDB存储引擎，相对于</p><p>MylSAM，InnoDB 存储引擎有了较大的改变，它的主要特点是</p><ul><li>支持事务操作，具有事务 ACID隔离特性，默认的隔离级别是可重复读(repetable-read)、通过 MVCC(并发版本控制)来实现的。能够解决脏读和不可重复读的问题。 InnoDB 支持外键操作。</li><li>InnoDB 默认的锁粒度行级锁，并发性能比较好，会发生死锁的情况。</li><li>和 MyISAM一样的是，InnoDB存储引擎也有 frm 文件存储表结构定义，但是不同的是，InnoDB的表数据与索引数据是存储在一起的，都位于 B+数的叶子节点上，而 MylSAM的表数据和索引数据是分开的。</li><li>InnoDB有安全的日志文件，这个日志文件用于恢复因数据库崩溃或其他情况导致的数据丢失问题，保证数据的一致性。</li><li>InnoDB和 MylSAM支持的索引类型相同，但具体实现因为文件结构的不同有很大差异。</li><li>增删改查性能方面，果执行大量的增删改操作，推荐使用 InnoDB存储引擎，它在删除操作时是对行删除，不会重建表。</li></ul><h2 id="mysql高可用方案有哪些" tabindex="-1"><a class="header-anchor" href="#mysql高可用方案有哪些"><span>Mysql高可用方案有哪些?</span></a></h2><p>Mysql高可用方案包括:</p><ol><li>主从复制方案</li></ol><p>这是MySQL自身提供的一种高可用解决方案，数据同步方法采用的是MySQL replication技术。MySQL replication就是从服务器到主服务器拉取二进制日志文件，然后再将日志文件解析成相应的SQL在从服务器上重新执行一遍主服务器的操作，通过这种方式保证数据的一致性。为了达到更高的可用性，在实际的应用环境中，一般都是采用MySQL replication技术配合高可用集群软件keepalived来实现自动failover，这种方式可以实现95.000%的SLA。</p><ol><li>MMM/MHA高可用方案</li></ol><p>MMM提供了MySQL主主复制配置的监控、故障转移和管理的一套可伸缩的脚本套件。在MMM高可用方案中，典型的应用是双主多从架构，通过MySQL replication技术可以实现两个服务器互为主从，且在任何时候只有一个节点可以被写入，避免了多点写入的数据冲突。同时，当可写的主节点故障时，MMM套件可以立刻监控到，然后将服务自动切换到另一个主节点，继续提供服务，从而实现MySQL的高可用。</p><ol><li>Heartbeat/SAN高可用方案</li></ol><p>在这个方案中，处理failover的方式是高可用集群软件Heartbeat，它监控和管理各个节点间连接的网络，并监控集群服务，当节点出现故障或者服务不可用时，自动在其他节点启动集群服务。在数据共享方面，通过SAN（Storage Area Network）存储来共享数据，这种方案可以实现99.990%的SLA。</p><ol><li>Heartbeat/DRBD高可用方案</li></ol><p>这个方案处理failover的方式上依旧采用Heartbeat，不同的是，在数据共享方面，采用了基于块级别的数据同步软件DRBD来实现。DRBD是一个用软件实现的、无共享的、服务器之间镜像块设备内容的存储复制解决方案。和SAN网络不同，它并不共享存储，而是通过服务器之间的网络复制数据。</p><ol><li>NDB CLUSTER高可用方案</li></ol><p>国内用NDB集群的公司非常少，貌似有些银行有用。NDB集群不需要依赖第三方组件，全部都使用官方组件，能保证数据的一致性，某个数据节点挂掉，其他数据节点依然可以提供服务，管理节点需要做冗余以防挂掉。缺点是：管理和配置都很复杂，而且某些SQL语句例如join语句需要避免。</p>',212),t=[p];function r(o,d){return e(),i("div",null,t)}const y=l(s,[["render",r],["__file","面试题.html.vue"]]),u=JSON.parse('{"path":"/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E9%9D%A2%E8%AF%95%E9%A2%98.html","title":"MySQL面试题","lang":"zh-CN","frontmatter":{"description":"MySQL面试题 隔离级别与锁的关系 回答这个问题，可以先阐述四种隔离级别，再阐述它们的实现原理。隔离级别就是依赖锁 和 MVCC 实现的。 实践中如何优化 MySQL？ 最好是按照以下顺序优化： SQL 语句及索引的优化 数据库表结构的优化 系统配置的优化 硬件的优化 优化子查询的方法 用关联查询替代。 优化 GROUP BY 和 DISTINCT。...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E9%9D%A2%E8%AF%95%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"MySQL面试题"}],["meta",{"property":"og:description","content":"MySQL面试题 隔离级别与锁的关系 回答这个问题，可以先阐述四种隔离级别，再阐述它们的实现原理。隔离级别就是依赖锁 和 MVCC 实现的。 实践中如何优化 MySQL？ 最好是按照以下顺序优化： SQL 语句及索引的优化 数据库表结构的优化 系统配置的优化 硬件的优化 优化子查询的方法 用关联查询替代。 优化 GROUP BY 和 DISTINCT。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.001.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-13T08:18:41.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"MySQL面试题"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-02-13T08:18:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MySQL面试题\\",\\"image\\":[\\"https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.001.png\\",\\"https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.003.jpeg\\",\\"https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.004.png\\",\\"https://golangguide.top/Users/zhaolun.lin/Documents/self/计算机基础/其他/Golang部分/Converted documents/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.005.jpeg\\",\\"https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.5ecd995e-c5e9-4f38-a516-498d258c0f77.006.png\\",\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.033.jpeg\\"],\\"dateModified\\":\\"2024-02-13T08:18:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"隔离级别与锁的关系","slug":"隔离级别与锁的关系","link":"#隔离级别与锁的关系","children":[]},{"level":2,"title":"实践中如何优化 MySQL？","slug":"实践中如何优化-mysql","link":"#实践中如何优化-mysql","children":[]},{"level":2,"title":"优化子查询的方法","slug":"优化子查询的方法","link":"#优化子查询的方法","children":[]},{"level":2,"title":"前缀索引","slug":"前缀索引","link":"#前缀索引","children":[]},{"level":2,"title":"MySQL 5.6 和 MySQL 5.7 对索引做了哪些优化？","slug":"mysql-5-6-和-mysql-5-7-对索引做了哪些优化","link":"#mysql-5-6-和-mysql-5-7-对索引做了哪些优化","children":[]},{"level":2,"title":"MySQL 有关权限的表有哪几个呢？","slug":"mysql-有关权限的表有哪几个呢","link":"#mysql-有关权限的表有哪几个呢","children":[]},{"level":2,"title":"MySQL 中都有哪些触发器？","slug":"mysql-中都有哪些触发器","link":"#mysql-中都有哪些触发器","children":[]},{"level":2,"title":"大表怎么优化？分库分表了是怎么做的？分表分库了有什么问题？ 有用到中间件么？他们的原理知道么？","slug":"大表怎么优化-分库分表了是怎么做的-分表分库了有什么问题-有用到中间件么-他们的原理知道么","link":"#大表怎么优化-分库分表了是怎么做的-分表分库了有什么问题-有用到中间件么-他们的原理知道么","children":[]},{"level":2,"title":"B+ Tree 索引和 Hash 索引区别？","slug":"b-tree-索引和-hash-索引区别","link":"#b-tree-索引和-hash-索引区别","children":[]},{"level":2,"title":"数据库索引的原理，为什么要用  B+树，为什么不用二叉树？","slug":"数据库索引的原理-为什么要用-b-树-为什么不用二叉树","link":"#数据库索引的原理-为什么要用-b-树-为什么不用二叉树","children":[]},{"level":2,"title":"据库三大范式是什么","slug":"据库三大范式是什么","link":"#据库三大范式是什么","children":[]},{"level":2,"title":"MySQL 有关权限的表都有哪几个？","slug":"mysql-有关权限的表都有哪几个","link":"#mysql-有关权限的表都有哪几个","children":[]},{"level":2,"title":"MySQL 的 Binlog 有有几种录入格式？分别有什么区别？","slug":"mysql-的-binlog-有有几种录入格式-分别有什么区别","link":"#mysql-的-binlog-有有几种录入格式-分别有什么区别","children":[]},{"level":2,"title":"MySQL 存储引擎 MyISAM 与 InnoDB 区别","slug":"mysql-存储引擎-myisam-与-innodb-区别","link":"#mysql-存储引擎-myisam-与-innodb-区别","children":[]},{"level":2,"title":"MyISAM 索引与 InnoDB 索引的区别？","slug":"myisam-索引与-innodb-索引的区别","link":"#myisam-索引与-innodb-索引的区别","children":[]},{"level":2,"title":"什么是索引？","slug":"什么是索引","link":"#什么是索引","children":[]},{"level":2,"title":"索引有哪些优缺点？","slug":"索引有哪些优缺点","link":"#索引有哪些优缺点","children":[]},{"level":2,"title":"索引有哪几种类型？","slug":"索引有哪几种类型","link":"#索引有哪几种类型","children":[]},{"level":2,"title":"MySQL 中有哪几种锁？","slug":"mysql-中有哪几种锁","link":"#mysql-中有哪几种锁","children":[]},{"level":2,"title":"MySQL 中 InnoDB 支持的四种事务隔离级别名称，以及逐级之间的区别？","slug":"mysql-中-innodb-支持的四种事务隔离级别名称-以及逐级之间的区别","link":"#mysql-中-innodb-支持的四种事务隔离级别名称-以及逐级之间的区别","children":[]},{"level":2,"title":"char 和 varchar 的区别？","slug":"char-和-varchar-的区别","link":"#char-和-varchar-的区别","children":[]},{"level":2,"title":"主键和候选键有什么区别？","slug":"主键和候选键有什么区别","link":"#主键和候选键有什么区别","children":[]},{"level":2,"title":"如何在 Unix 和 MySQL 时间戳之间进行转换？","slug":"如何在-unix-和-mysql-时间戳之间进行转换","link":"#如何在-unix-和-mysql-时间戳之间进行转换","children":[]},{"level":2,"title":"MyISAM 表类型将在哪里存储，并且还提供其存储格式？","slug":"myisam-表类型将在哪里存储-并且还提供其存储格式","link":"#myisam-表类型将在哪里存储-并且还提供其存储格式","children":[]},{"level":2,"title":"MySQL 里记录货币用什么字段类型好","slug":"mysql-里记录货币用什么字段类型好","link":"#mysql-里记录货币用什么字段类型好","children":[]},{"level":2,"title":"创建索引时需要注意什么？","slug":"创建索引时需要注意什么","link":"#创建索引时需要注意什么","children":[]},{"level":2,"title":"使用索引查询一定能提高查询的性能吗？为什么","slug":"使用索引查询一定能提高查询的性能吗-为什么","link":"#使用索引查询一定能提高查询的性能吗-为什么","children":[]},{"level":2,"title":"百万级别或以上的数据如何删除","slug":"百万级别或以上的数据如何删除","link":"#百万级别或以上的数据如何删除","children":[]},{"level":2,"title":"什么是最左前缀原则？什么是最左匹配原则","slug":"什么是最左前缀原则-什么是最左匹配原则","link":"#什么是最左前缀原则-什么是最左匹配原则","children":[]},{"level":2,"title":"什么是聚簇索引？何时使用聚簇索引与非聚簇索引","slug":"什么是聚簇索引-何时使用聚簇索引与非聚簇索引","link":"#什么是聚簇索引-何时使用聚簇索引与非聚簇索引","children":[]},{"level":2,"title":"MySQL 连接器","slug":"mysql-连接器","link":"#mysql-连接器","children":[]},{"level":2,"title":"MySQL 查询缓存","slug":"mysql-查询缓存","link":"#mysql-查询缓存","children":[]},{"level":2,"title":"MySQL 分析器","slug":"mysql-分析器","link":"#mysql-分析器","children":[]},{"level":2,"title":"MySQL 优化器","slug":"mysql-优化器","link":"#mysql-优化器","children":[]},{"level":2,"title":"MySQL 执行器","slug":"mysql-执行器","link":"#mysql-执行器","children":[]},{"level":2,"title":"什么是临时表，何时删除临时表？","slug":"什么是临时表-何时删除临时表","link":"#什么是临时表-何时删除临时表","children":[]},{"level":2,"title":"谈谈 SQL 优化的经验","slug":"谈谈-sql-优化的经验","link":"#谈谈-sql-优化的经验","children":[]},{"level":2,"title":"什么叫外链接？","slug":"什么叫外链接","link":"#什么叫外链接","children":[]},{"level":2,"title":"什么叫内链接？","slug":"什么叫内链接","link":"#什么叫内链接","children":[]},{"level":2,"title":"使用 union 和 union all 时需要注意些什么？","slug":"使用-union-和-union-all-时需要注意些什么","link":"#使用-union-和-union-all-时需要注意些什么","children":[]},{"level":2,"title":"MyISAM 存储引擎的特点","slug":"myisam-存储引擎的特点","link":"#myisam-存储引擎的特点","children":[]},{"level":2,"title":"InnoDB 存储引擎的特点","slug":"innodb-存储引擎的特点","link":"#innodb-存储引擎的特点","children":[]},{"level":2,"title":"Mysql高可用方案有哪些?","slug":"mysql高可用方案有哪些","link":"#mysql高可用方案有哪些","children":[]}],"git":{"createdTime":1707812321000,"updatedTime":1707812321000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":33.32,"words":9997},"filePathRelative":"中间件/mysql/面试题.md","localizedDate":"2024年2月13日","autoDesc":true}');export{y as comp,u as data};
