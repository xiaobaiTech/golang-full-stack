import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,a as i,b as o,d as n,e as g,o as a,r as l}from"./app-G1Aj0uLO.js";const p={},d={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html",target:"_blank",rel:"noopener noreferrer"},c={href:"https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html",target:"_blank",rel:"noopener noreferrer"},f={href:"https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html",target:"_blank",rel:"noopener noreferrer"},B={href:"https://www.photo-translate.top",target:"_blank",rel:"noopener noreferrer"};function u(b,t){const e=l("ExternalLinkIcon");return a(),s("div",null,[t[5]||(t[5]=i('<h1 id="mysql-是什么-架构是怎么样的" tabindex="-1"><a class="header-anchor" href="#mysql-是什么-架构是怎么样的"><span>mysql 是什么？架构是怎么样的？</span></a></h1><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.0001.jpeg" alt="mysql是什么" tabindex="0" loading="lazy"><figcaption>mysql是什么</figcaption></figure><p>你是一个程序员，你做了一个网站应用，站点里的用户数据，需要存到某个地方，方便随时读写。</p><p>很容易想到可以将数据存到文件里。</p><p>但如果数据量很大，想从大量文件数据中查找某部分数据，并更新，是一件很痛苦的事情。</p><p>那么问题就来了，有办法可以解决这个问题吗？</p><p>好办，<strong>没有什么是加一层中间层不能解决的，如果有，那就再加一层</strong>。</p><p>这次我们要加的中间层是 <strong>mysql</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.002.jpeg" alt="mysql是数据和应用的中间层" tabindex="0" loading="lazy"><figcaption>mysql是数据和应用的中间层</figcaption></figure><h2 id="什么是-mysql" tabindex="-1"><a class="header-anchor" href="#什么是-mysql"><span>什么是 mysql</span></a></h2><p>Mysql数据库，是一款存放和管理数据的软件, 它介于<strong>应用</strong>和<strong>数据</strong>之间，通过一些设计，将大量数据，变成一张张像 excel 的数据表。为应用提供创建(Create), 读取(Read), 更新(Update), 删除(Delete)等核心操作。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.003.jpeg" alt="mysql是什么" tabindex="0" loading="lazy"><figcaption>mysql是什么</figcaption></figure><p>我们来看下它是怎么实现的。</p><h2 id="数据页" tabindex="-1"><a class="header-anchor" href="#数据页"><span>数据页</span></a></h2><p>mysql 将数据组织成 excel 表的样子。</p><p>excel 文件在磁盘上是个<strong>xls</strong> 文件，mysql 的数据表也类似，在磁盘上则是个<strong>ibd</strong> 后缀的文件。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.004.jpeg" alt="ibd文件是什么" tabindex="0" loading="lazy"><figcaption>ibd文件是什么</figcaption></figure><p>数据表越大，磁盘上的 ibd 文件也就越大。</p><p>直接读写一个大文件里的全部数据会很慢，所以 MySQL 将数据<strong>拆成一个个数据页</strong>，每页大小 <strong>16KB</strong>。这样我们读写部分表数据的时候，就只需要读取磁盘里的<strong>几个数据页</strong>就好。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.005.jpeg" alt="mysql将文件分成多个数据页" tabindex="0" loading="lazy"><figcaption>mysql将文件分成多个数据页</figcaption></figure><h2 id="索引" tabindex="-1"><a class="header-anchor" href="#索引"><span>索引</span></a></h2><p>但数据页那么多，查某条数据时，怎么知道要读哪些数据页？</p><p>好办，可以为每个数据页加入<strong>页号</strong>，再为每行数据加个<strong>序号</strong>，这个序号其实就是所谓的主键。</p><p>按主键大小排序，将每个数据页里<strong>最小的主键序号和所在页的页号</strong>提出来，放入到一个新生成的数据页中，并且给数据页加入<strong>层级</strong>的概念。</p><p>这样我们就可以通过上层的数据页<strong>快速缩小查找范围</strong>，加速查找数据页的过程。</p><p>现在页跟页之间看起来就像是一棵倒过来的树，这棵可以加速查找数据页的树，就是我们常说的<strong>B+树</strong>索引。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.006.jpeg" alt="B+树索引" tabindex="0" loading="lazy"><figcaption>B+树索引</figcaption></figure><p>上面提到的是针对主键的索引，也就是<strong>主键索引</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.007.jpeg" alt="主键索引" tabindex="0" loading="lazy"><figcaption>主键索引</figcaption></figure><p>按同样的思路，也可以为<strong>其他数据表的列</strong>去建立<strong>索引</strong>，比如用户表的名称字段，这样我们就能快速查找到名字为 xx 的用户有哪些，这就是所谓的<strong>辅助索引</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.008.jpeg" alt="辅助索引" tabindex="0" loading="lazy"><figcaption>辅助索引</figcaption></figure><h2 id="buffer-pool" tabindex="-1"><a class="header-anchor" href="#buffer-pool"><span>Buffer Pool</span></a></h2><p>但就算有了索引，数据也还是在<strong>磁盘</strong>上。每次都读磁盘太慢了。有办法提升下性能吗？</p><p>有！在<strong>磁盘数据</strong>和<strong>应用</strong>之间，加一层进程内<strong>缓存</strong>，缓存里装的就是前面提到的 16KB 数据和索引页, 它就是所谓的 <strong>Buffer Pool</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.009.jpeg" alt="buffer pool是什么" tabindex="0" loading="lazy"><figcaption>buffer pool是什么</figcaption></figure><p>读数据的时候优先读 Buffer Pool，有数据就返回，没数据才去磁盘里读取，减少了读磁盘的次数，大大提升了性能。</p><p>但问题就来了，我们知道，文件读取，<strong>默认</strong>会先将文件数据加载到<strong>操作系统的文件缓存</strong>中，同样都是缓存，为什么还要整 Buffer Pool 这死出？</p><p>这是因为进程自己维护的 Buffer Pool ，可以定制更多缓存<strong>策略</strong>，还能实现<strong>加锁</strong>等各种数据表高级特性。</p><p>也正是因为已经有了 Buffer Pool，所以也就没必要使用操作系统的文件缓存了，所以 Buffer Pool 通过&quot;<strong>直接 I/O</strong>&quot; 模式, <strong>绕过</strong>操作系统的缓存机制，<strong>直接</strong>从磁盘读写数据。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.010.jpeg" alt="buffer pool直接IO" tabindex="0" loading="lazy"><figcaption>buffer pool直接IO</figcaption></figure><h2 id="自适应-hash-索引" tabindex="-1"><a class="header-anchor" href="#自适应-hash-索引"><span>自适应 hash 索引</span></a></h2><p>就算有了 buffer pool，要查到某个数据页，也依然要查找 B+树，查询复杂度 <strong>O(lgn)</strong>。能更快吗？</p><p>能！可以使用查询复杂度为 **O(1)**的 hash 表进行优化。</p><p>记录每个数据页的查询频率，对于热点数据页，我们以查询的<strong>值</strong>为 <strong>key</strong>，<strong>数据页地址</strong>为 <strong>value</strong>，构建 hash 表。</p><p>比如name为 <code>&#39;xiaobai&#39; 的数据页，</code>被频繁查询，那 <strong>key</strong> 就是 xiaobai，<strong>value</strong> 就是包含 xiaobai 记录的数据页的地址。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.012.jpeg" alt="哈希的key和value" tabindex="0" loading="lazy"><figcaption>哈希的key和value</figcaption></figure><p>这个 hash 表，就是所谓的<strong>自适应哈希索引</strong>，<strong>Adaptive Hash Index</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.013.jpeg" alt="自适应哈希" tabindex="0" loading="lazy"><figcaption>自适应哈希</figcaption></figure><h2 id="change-buffer" tabindex="-1"><a class="header-anchor" href="#change-buffer"><span>Change Buffer</span></a></h2><p>有了<strong>自适应 hash 索引</strong>的加持，读性能提高了。那写性能也能优化吗？</p><p>能！</p><p>大部分数据表，除了主键索引外，我们还会加一些辅助索引。比如对用户名加个<strong>辅助索引</strong>。</p><p>那对于这类数据表的写操作，更新完主键索引的<strong>数据页</strong>之后，还需要更新<strong>辅助索引页</strong>。这样读取辅助索引页的磁盘 IO 必然少不了。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.014.jpeg" alt="更新主键和辅助索引" tabindex="0" loading="lazy"><figcaption>更新主键和辅助索引</figcaption></figure><p>怎么办呢？我们可以先将要<strong>写入的数据</strong>收集到一块<strong>内存里</strong>，等哪天磁盘里的索引页正好被读入 Buffer pool 的时候，再将写入数据应用到索引页中。</p><p>通过这个方式减少大量的磁盘 IO，提升性能。</p><p>而这个将写操作收集起来的地方，就是所谓的 <strong>Change Buffer</strong>，它其实是 Buffer pool 的一部分。<br><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.015.jpeg" alt="Change Buffer的更新流程" loading="lazy"></p><h2 id="undo-log" tabindex="-1"><a class="header-anchor" href="#undo-log"><span>Undo Log</span></a></h2><p>在数据库中，有一个叫<strong>事务</strong>的概念。不了解没关系，说白了，就是可以让多行数据，要么<strong>同时</strong>更新成功，要么<strong>同时</strong>更新失败。也就是所谓的<strong>原子性</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.016.jpeg" alt="事务是什么" tabindex="0" loading="lazy"><figcaption>事务是什么</figcaption></figure><p>为了实现这一点，我们就需要知道写数据时每行数据<strong>原来长啥样</strong>，方便对更新后的数据行，进行<strong>回滚</strong>，因此就有了 <strong>Undo Log</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.017.jpeg" alt="undo log回滚" tabindex="0" loading="lazy"><figcaption>undo log回滚</figcaption></figure><p>更新 buffer pool 数据页的时候，</p><p>会用旧数据生成 undo log 记录，存储在 Buffer Pool 中的特殊 undo log 内存页中。</p><p>并随着 buffer pool 的刷盘机制，不定时写入到磁盘的 <strong>undo log 文件</strong>中。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.018.jpeg" alt="undo log的写入流程" tabindex="0" loading="lazy"><figcaption>undo log的写入流程</figcaption></figure><h2 id="redo-log" tabindex="-1"><a class="header-anchor" href="#redo-log"><span>Redo Log</span></a></h2><p>上面提到的都是 buffer pool 相关的内容，它们本质上都是内存。</p><p>如果内存数据只写了一半到磁盘中，数据库进程就崩了，那<strong>一个事务</strong>里的多行数据就没能做到&quot;同时更新成功&quot;。</p><p>怎么办呢？</p><p>好办，我们将事务中更新数据行的操作都写入到 <strong>redo log buffer</strong> 内存中，然后在<strong>事务提交</strong>的时候进行 redo log 刷磁盘，将数据固化到 <strong>redo log 文件</strong>中。</p><p>数据库<strong>进程崩溃重启</strong>后，就能通过 redo log file 找到历史操作记录，<strong>重做</strong>数据。保证了事务里的多行数据变更，要么都成功，要么都失败。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.019.jpeg" alt="redo log的写入流程" tabindex="0" loading="lazy"><figcaption>redo log的写入流程</figcaption></figure><p>这时候问题就来了，我有这功夫更新 redo log file 文件，直接将 buffer pool 的数据写入到磁盘不香吗？</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.020.jpeg" alt="为什么不直接写磁盘数据页" tabindex="0" loading="lazy"><figcaption>为什么不直接写磁盘数据页</figcaption></figure><p>不太一样，redo log file 是<strong>顺序</strong>写入的，buffer pool 的内存数据是<strong>随机分散</strong>在磁盘各处的，<strong>顺序写磁盘性能是随机写的几十倍</strong>，所以很多存储系统在写数据时都会搞个日志来记录操作，方便服务重启后进行数据对账，确保数据的一致性和完整性，这类操作就是所谓的 <strong>Write-Ahead Logging (WAL)</strong> 。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.0211.jpeg" alt="顺序写比随机写快很多" tabindex="0" loading="lazy"><figcaption>顺序写比随机写快很多</figcaption></figure><p>但问题又来了，redo log buffer 也是内存，buffer pool 也是内存，如果 redo log buffer 里的数据还没来得及写入到 redo log，数据库进程就崩了，那 redo log buffer 里的数据不也丢了吗？</p><p>是的，所以 redo log 的作用并不是保证所有数据不丢失，而是确保已提交事务的变更不会丢失。但因为 redo log 刷盘频率很高，所以丢失数据的概率很低。</p><p><strong>redo log 本质上是写入性能和数据完整性折中的产物</strong>，做架构就是这样，做到最后总是需要通过牺牲某些东西去换取另一样东西，果然，程序员才是真正的炼金术师。</p><h2 id="innodb-是什么" tabindex="-1"><a class="header-anchor" href="#innodb-是什么"><span>Innodb 是什么</span></a></h2><p>我们将上面提到的内容，分为<strong>内存</strong>和<strong>磁盘</strong>两部分，一部分是内存里的自适应哈希，buffer pool，以及 redo log buffer。另一部分是磁盘里存放行数据和索引的.ibd 文件, 以及 undo log, redo log 等文件。它们共同构成了 <strong>innodb 存储引擎</strong>。并对外提供一系列函数接口。</p><p>比如操作数据行的 write_row(), update_row()，以及操作数据表的 create(), drop()等等接口。</p><p>我们平时写的 SQL 语句，最终都会转换成 InnoDB 提供的这些接口函数调用。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.023.jpeg" alt="innodb提供的函数接口" tabindex="0" loading="lazy"><figcaption>innodb提供的函数接口</figcaption></figure><p>比如：</p><ul><li><p>INSERT 语句会调用 write_row() 接口来插入数据行。</p></li><li><p>UPDATE 语句会调用 update_row() 接口来更新数据行。</p></li><li><p>CREATE TABLE 语句会调用 create() 接口来创建新表。</p></li><li><p>DROP TABLE 语句会调用 drop() 接口来删除表。</p></li></ul><p>但问题就来了，我们平时读写 mysql 用的 sql 语句，是怎么转成存储引擎的函数接口的呢？</p><p>那就需要介绍 Server 层了。</p><h2 id="server-层是什么" tabindex="-1"><a class="header-anchor" href="#server-层是什么"><span>Server 层是什么</span></a></h2><p><strong>Server 层</strong>，本质上是 sql 语句 和 innodb 存储引擎之间的中间层。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.024.jpeg" alt="server层" tabindex="0" loading="lazy"><figcaption>server层</figcaption></figure><p>在 Server 层内提供一个<strong>连接管理模块</strong>，用于管理来自应用的网络连接。</p><p>并提供一个<strong>分析器</strong>，用于判断 SQL 语句有没有语法错误，比如 select，是不是少打了一个<code>l</code>。</p><p>再提供一个<strong>优化器</strong>，用于<strong>根据一定的规则选择该用什么索引</strong>，生成执行计划。</p><p>之后，提供一个<strong>执行器</strong>，根据执行计划去调用<strong>Innodb 存储引擎</strong>的接口函数。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.025.jpeg" alt="server层做了哪些事情" tabindex="0" loading="lazy"><figcaption>server层做了哪些事情</figcaption></figure><p><strong>server 层</strong>和<strong>存储引擎层</strong>共同构成了一个完整的数据库，它就是我们常说的 <strong>Mysql 数据库</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.026.jpeg" alt="mysql是什么" tabindex="0" loading="lazy"><figcaption>mysql是什么</figcaption></figure><p>并且，server 层和存储引擎层是通过接口函数进行<strong>解耦</strong>的，换句话说就是，只要实现了上面这些接口函数，就能作为存储引擎与 Server 层对接。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.027.jpeg" alt="引擎解耦" tabindex="0" loading="lazy"><figcaption>引擎解耦</figcaption></figure><p>比如，mysql 早期用的是 <strong>myisam</strong> 存储引擎，后来才支持的 <strong>innodb</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.028.jpeg" alt="常用存储引擎有哪些" tabindex="0" loading="lazy"><figcaption>常用存储引擎有哪些</figcaption></figure><h2 id="binlog-是什么" tabindex="-1"><a class="header-anchor" href="#binlog-是什么"><span>binlog 是什么</span></a></h2><p>你听说过删库跑路吧，为了防止数据库表被删除带来的影响， server 层会将历史上<strong>所有变更操作记录到磁盘上的日志文件中</strong>，这个日志文件就是所谓的 <strong>binlog</strong>。一旦误删表，就可以利用 binlog 来恢复数据。</p><p>那么问题就来了，innodb 有一个 <strong>redo log</strong> 也做类似的事情，为什么还要多此一举？评论区告诉我答案。</p><p>这是因为 redo log 是<strong>环状</strong>写入的，后面写的内容最终会覆盖前面的内容，也就是不会记录所有历史写操作，而 binlog 却会记录<strong>所有</strong>历史变更。并且 binlog 位于 server 层，这样不管底层的存储引擎是什么，都能复用这部分能力。</p><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.0291.jpeg" alt="binlog写入流程" tabindex="0" loading="lazy"><figcaption>binlog写入流程</figcaption></figure><h2 id="mysql-主从架构" tabindex="-1"><a class="header-anchor" href="#mysql-主从架构"><span>Mysql 主从架构</span></a></h2><p>由于 binlog 记录了一个 mysql 的所有变更操作，因此我们还可以利用 binlog 数据，&quot;<strong>复制</strong>&quot;一个新的 mysql 出来。原来的 master 叫<strong>主</strong>数据库，复制出来的则是<strong>从</strong>数据库，主数据库负责承接<strong>写</strong>流量，从数据库负责<strong>读</strong>流量，这样就可以让 mysql 承接更高的读写流量。它就是经典的 <strong>mysql 主从同步架构</strong>。</p><h2 id="数据库查询更新流程" tabindex="-1"><a class="header-anchor" href="#数据库查询更新流程"><span>数据库查询更新流程</span></a></h2><p>接下来我们用实际例子将上面提到的内容串起来。<br> 首先不管是查询还是更新操作，客户端都会先跟 mysql 建立网络连接，并将 sql 发送到 <strong>server 层</strong>，经过<strong>分析器</strong>解析 sql 语法、<strong>优化器</strong>选择索引生成执行计划，最终给到<strong>执行器</strong>调用 InnoDB 的函数接口。</p><ul><li><p>对于<strong>读操作</strong>。InnoDB<strong>存储引擎</strong>会先检查 <strong>Buffer Pool</strong> 中是否存在所需的 B+树数据页，如果存在则直接返回数据。如果 Buffer Pool 中没有所需的数据页，则会从<strong>磁盘</strong>中读取相应的数据页加载到 Buffer Pool 中，再返回数据。同时，如果查询的数据是热点数据，还会将数据页加入到<strong>自适应哈希索引</strong>豪华套餐中，加速后续的查询。</p></li><li><p>对于<strong>写操作</strong>，则会先将数据写入 <strong>Buffer Pool</strong>，并生成相应的 <strong>Undo Log</strong> 记录，以便在事务回滚时能够恢复数据的原始状态。接下来，会将写操作记录到 Redo Log Buffer 中，这些 redo log 会周期性地写入到磁盘中的 <strong>Redo Log 文件</strong>中，就算数据库崩了，已提交的事务也不会丢失。对于<strong>辅助索引</strong>的更新操作，InnoDB 会将这些更新暂时存储在 <strong>Change Buffer</strong> 中，等到相关的索引页被读取到 Buffer Pool 时再进行实际的更新操作，从而减少磁盘 I/O，提高写入性能。同时，所有的变更都会记录到 server 层的 <strong>binlog</strong> 中，以便进行数据恢复。</p></li></ul><figure><img src="https://cdn.xiaobaidebug.top/mysql是什么配图.030.jpeg" alt="mysql架构总览图" tabindex="0" loading="lazy"><figcaption>mysql架构总览图</figcaption></figure><p>现在大家通了吗？</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li><p>mysql 分为 server 层和存储引擎层。存储引擎层可更换，既可以是 myisam，也可以是 innodb。当前用 innodb 更多。</p></li><li><p>innodb 分为内存和磁盘两部分，一部分是内存里的自适应 hash，buffer bool，以及 redo log buffer。另一部分是磁盘里存放行数据和索引的.ibd 文件, 以及 undo log, redo log 等文件。</p></li><li><p>mysql server 层会通过 binlog 记录数据库变更操作，binlog 可以用于数据恢复，也可以用于主从同步等场景。</p></li></ul><p>如果你觉得这篇文章对你有帮助，记得转发给你那不成器的兄弟。最后遗留一个问题，你听说过 HDFS 吗？你知道它的架构是怎么样的吗？如果你感兴趣，记得关注，我会在下期聊聊这个话题。我们下期见！</p><h2 id="文章推荐" tabindex="-1"><a class="header-anchor" href="#文章推荐"><span>文章推荐：</span></a></h2>',119)),o("ul",null,[o("li",null,[o("p",null,[o("a",d,[t[0]||(t[0]=n("golang进阶面试题八股文合集")),g(e)])])]),o("li",null,[o("p",null,[o("a",E,[t[1]||(t[1]=n("golang基础面试题八股文合集")),g(e)])])]),o("li",null,[o("p",null,[o("a",c,[t[2]||(t[2]=n("golang常用标准库第三方库大全")),g(e)])])]),o("li",null,[o("p",null,[o("a",f,[t[3]||(t[3]=n("golang学习路线")),g(e)])])]),o("li",null,[o("p",null,[o("a",B,[t[4]||(t[4]=n("基于golang实现的图片翻译工具")),g(e)])])])])])}const y=r(p,[["render",u],["__file","mysql是什么_架构是怎么样的.html.vue"]]),q=JSON.parse('{"path":"/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/mysql%E6%98%AF%E4%BB%80%E4%B9%88_%E6%9E%B6%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84.html","title":"mysql 是什么？架构是怎么样的？","lang":"zh-CN","frontmatter":{"description":"mysql 是什么？架构是怎么样的？ mysql是什么mysql是什么 你是一个程序员，你做了一个网站应用，站点里的用户数据，需要存到某个地方，方便随时读写。 很容易想到可以将数据存到文件里。 但如果数据量很大，想从大量文件数据中查找某部分数据，并更新，是一件很痛苦的事情。 那么问题就来了，有办法可以解决这个问题吗？ 好办，没有什么是加一层中间层不能解...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/mysql%E6%98%AF%E4%BB%80%E4%B9%88_%E6%9E%B6%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"mysql 是什么？架构是怎么样的？"}],["meta",{"property":"og:description","content":"mysql 是什么？架构是怎么样的？ mysql是什么mysql是什么 你是一个程序员，你做了一个网站应用，站点里的用户数据，需要存到某个地方，方便随时读写。 很容易想到可以将数据存到文件里。 但如果数据量很大，想从大量文件数据中查找某部分数据，并更新，是一件很痛苦的事情。 那么问题就来了，有办法可以解决这个问题吗？ 好办，没有什么是加一层中间层不能解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.0001.jpeg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-15T11:49:00.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"mysql 是什么？架构是怎么样的？"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-12-15T11:49:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mysql 是什么？架构是怎么样的？\\",\\"image\\":[\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.0001.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.002.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.003.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.004.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.005.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.006.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.007.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.008.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.009.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.010.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.012.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.013.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.014.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.015.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.016.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.017.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.018.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.019.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.020.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.0211.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.023.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.024.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.025.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.026.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.027.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.028.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.0291.jpeg\\",\\"https://cdn.xiaobaidebug.top/mysql%E6%98%AF%E4%BB%80%E4%B9%88%E9%85%8D%E5%9B%BE.030.jpeg\\"],\\"dateModified\\":\\"2024-12-15T11:49:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/mysql%E6%98%AF%E4%BB%80%E4%B9%88_%E6%9E%B6%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/mysql%E6%98%AF%E4%BB%80%E4%B9%88_%E6%9E%B6%E6%9E%84%E6%98%AF%E6%80%8E%E4%B9%88%E6%A0%B7%E7%9A%84.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"mysql 是什么？架构是怎么样的？"}],["meta",{"property":"og:description","content":"mysql 是什么？架构是怎么样的？ mysql是什么mysql是什么 你是一个程序员，你做了一个网站应用，站点里的用户数据，需要存到某个地方，方便随时读写。 很容易想到可以将数据存到文件里。 但如果数据量很大，想从大量文件数据中查找某部分数据，并更新，是一件很痛苦的事情。 那么问题就来了，有办法可以解决这个问题吗？ 好办，没有什么是加一层中间层不能解..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-15T11:49:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-15T11:49:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mysql 是什么？架构是怎么样的？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-15T11:49:00.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"什么是 mysql","slug":"什么是-mysql","link":"#什么是-mysql","children":[]},{"level":2,"title":"数据页","slug":"数据页","link":"#数据页","children":[]},{"level":2,"title":"索引","slug":"索引","link":"#索引","children":[]},{"level":2,"title":"Buffer Pool","slug":"buffer-pool","link":"#buffer-pool","children":[]},{"level":2,"title":"自适应 hash 索引","slug":"自适应-hash-索引","link":"#自适应-hash-索引","children":[]},{"level":2,"title":"Change Buffer","slug":"change-buffer","link":"#change-buffer","children":[]},{"level":2,"title":"Undo Log","slug":"undo-log","link":"#undo-log","children":[]},{"level":2,"title":"Redo Log","slug":"redo-log","link":"#redo-log","children":[]},{"level":2,"title":"Innodb 是什么","slug":"innodb-是什么","link":"#innodb-是什么","children":[]},{"level":2,"title":"Server 层是什么","slug":"server-层是什么","link":"#server-层是什么","children":[]},{"level":2,"title":"binlog 是什么","slug":"binlog-是什么","link":"#binlog-是什么","children":[]},{"level":2,"title":"Mysql 主从架构","slug":"mysql-主从架构","link":"#mysql-主从架构","children":[]},{"level":2,"title":"数据库查询更新流程","slug":"数据库查询更新流程","link":"#数据库查询更新流程","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"文章推荐：","slug":"文章推荐","link":"#文章推荐","children":[]}],"git":{"createdTime":1734263101000,"updatedTime":1734263340000,"contributors":[{"name":"xiaobai-tech","email":"948485496@qq.com","commits":2}]},"readingTime":{"minutes":14.03,"words":4210},"filePathRelative":"中间件/mysql/核心知识点/mysql是什么?架构是怎么样的.md","localizedDate":"2024年12月15日","autoDesc":true}');export{y as comp,q as data};
