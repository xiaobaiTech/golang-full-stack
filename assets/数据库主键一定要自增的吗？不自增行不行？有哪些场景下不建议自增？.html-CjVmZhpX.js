import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o as i,c as r,a as n,b as s,d as t,e}from"./app-BsGbjd6a.js";const d={},l=e('<h1 id="数据库主键一定要自增的吗-有哪些场景下不建议自增" tabindex="-1"><a class="header-anchor" href="#数据库主键一定要自增的吗-有哪些场景下不建议自增"><span>数据库主键一定要自增的吗？有哪些场景下不建议自增？</span></a></h1><br><p>我们平时建表的时候，一般会像下面这样。</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>\n  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">AUTO_INCREMENT</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;主键&#39;</span><span class="token punctuation">,</span>\n  <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;&#39;</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;名字&#39;</span><span class="token punctuation">,</span>\n  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span>  <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>出于习惯，我们一般会加一列<strong>id 作为主键</strong>，而这个主键一般边上都有个<code>AUTO_INCREMENT</code>, 意思是这个主键是自增的。自增就是 i++，也就是每次都加 1。</p><p>但问题来了。</p><p><strong>主键 id 不自增行不行？</strong></p><p><strong>为什么要用自增 id 做主键？</strong></p><p><strong>离谱点，没有主键可以吗？</strong></p><p><strong>什么情况下不应该自增？</strong></p><br><p>被这么一波追问，念头都不通达了？</p><p>这篇文章，我会尝试回答这几个问题。</p><br><h2 id="主键不自增行不行" tabindex="-1"><a class="header-anchor" href="#主键不自增行不行"><span>主键不自增行不行</span></a></h2><p>当然是可以的。比如我们可以把建表 sql 里的<code>AUTO_INCREMENT</code>去掉。</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>\n  <span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span> <span class="token keyword">int</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;主键&#39;</span><span class="token punctuation">,</span>\n  <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;&#39;</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;名字&#39;</span><span class="token punctuation">,</span>\n  <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">)</span>\n<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>然后执行</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span><span class="token punctuation">)</span>  <span class="token keyword">VALUES</span>	<span class="token punctuation">(</span><span class="token string">&#39;debug&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这时候会报错<code>Field &#39;id&#39; doesn&#39;t have a default value</code>。也就是说如果你不让主键自增的话，那你在写数据的时候需要自己指定 id 的值是多少，想要主键 id 是多少就写多少进去，不写就报错。</p><p>改成下面这样就好了</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span><span class="token identifier"><span class="token punctuation">`</span>id<span class="token punctuation">`</span></span><span class="token punctuation">,</span><span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span><span class="token punctuation">)</span>  <span class="token keyword">VALUES</span>	<span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token string">&#39;debug&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><br><h2 id="为什么要用自增主键" tabindex="-1"><a class="header-anchor" href="#为什么要用自增主键"><span>为什么要用自增主键</span></a></h2><p>我们在数据库里保存的数据就跟 excel 表一样，一行行似的。</p><figure><img src="https://cdn.xiaobaidebug.top/user表数据库原始状态2.drawio.png" alt="user表" tabindex="0" loading="lazy"><figcaption>user表</figcaption></figure><p>而在底层，这一行行数据，就是保存在一个个<strong>16k 大小的页</strong>里。</p><p>每次都去遍历所有的行性能会不好，于是为了加速搜索，我们可以<strong>根据主键 id，从小到大排列这些行数据</strong>，将这些数据页用<strong>双向链表</strong>的形式组织起来，再将这些页里的部分信息提取出来放到一个新的 16kb 的数据页里，再加入<strong>层级的概念</strong>。于是，一个个数据页就被组织起来了，成为了一棵<strong>B+树索引</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/B加树结构7.drawio.png" alt="B+树结构" tabindex="0" loading="lazy"><figcaption>B+树结构</figcaption></figure><p>而当我们在建表 sql 里声明了<code>PRIMARY KEY (id)</code>时，mysql 的 innodb 引擎，就会为主键 id 生成一个<strong>主键索引</strong>，里面就是通过 B+树的形式来维护这套索引。</p><p>到这里，我们有<strong>两个点</strong>是需要关注的：</p><ul><li>数据页大小是<strong>固定 16k</strong></li><li>数据页内，以及数据页之间，数据主键 id 都是从<strong>小到大排序</strong>的</li></ul><p>由于数据页大小<strong>固定了是 16k</strong>，当我们需要插入一条新的数据，数据页会被慢慢<strong>放满</strong>，当超过 16k 时，这个数据页就有可能会进行<strong>分裂</strong>。</p><p>针对 B+树<strong>叶子节点</strong>，<strong>如果主键是自增的</strong>，那它产生的 id 每次都比前一次要大，所以每次都会将数据加在 B+树<strong>尾部</strong>，B+树的叶子节点本质上是<strong>双向链表</strong>，查找它的首部和尾部，<strong>时间复杂度 O(1)</strong>。而如果此时最末尾的数据页满了，那创建个新的页就好。</p><figure><img src="https://cdn.xiaobaidebug.top/叶子满了但非叶子未满.drawio-20220606092636547.png" alt="主键id自增的情况" tabindex="0" loading="lazy"><figcaption>主键id自增的情况</figcaption></figure><p><strong>如果主键不是自增的</strong>，比方说上次分配了 id=7，这次分配了 id=3，为了让新加入数据后<strong>B+树的叶子节点还能保持有序</strong>，它就需要往叶子结点的中间找，查找过程的<strong>时间复杂度是 O(lgn)</strong>，如果这个页正好也满了，这时候就需要进行<strong>页分裂</strong>了。并且页分裂操作本身是需要加<strong>悲观锁</strong>的。总体看下来，自增的主键遇到页分裂的可能性更少，因此性能也会更高。</p><figure><img src="https://cdn.xiaobaidebug.top/主键id不自增的情况.drawio.png" alt="主键id不自增的情况" tabindex="0" loading="lazy"><figcaption>主键id不自增的情况</figcaption></figure><br><h2 id="没有主键可以吗" tabindex="-1"><a class="header-anchor" href="#没有主键可以吗"><span>没有主键可以吗</span></a></h2><p>mysql 表如果没有主键索引，查个数据都得全表扫描，那既然它这么重要，我今天就不当人了，<strong>不声明主键，可以吗？</strong></p><p>嗯，你完全可以不声明主键。</p><p>你确实可以在建表 sql 里写成这样。</p><div class="language-sql line-numbers-mode" data-ext="sql" data-title="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> <span class="token identifier"><span class="token punctuation">`</span>user<span class="token punctuation">`</span></span> <span class="token punctuation">(</span>\n  <span class="token identifier"><span class="token punctuation">`</span>name<span class="token punctuation">`</span></span> <span class="token keyword">char</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">DEFAULT</span> <span class="token string">&#39;&#39;</span> <span class="token keyword">COMMENT</span> <span class="token string">&#39;名字&#39;</span>\n<span class="token punctuation">)</span> <span class="token keyword">ENGINE</span><span class="token operator">=</span><span class="token keyword">InnoDB</span> <span class="token keyword">DEFAULT</span> <span class="token keyword">CHARSET</span><span class="token operator">=</span>utf8mb4<span class="token punctuation">;</span>\n</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>看起来确实是没有主键的样子。然而实际上，mysql 的 innodb 引擎内部会帮你生成一个名为<code>ROW_ID</code>列，它是个 6 字节的隐藏列，你平时也看不到它，但实际上，它也是自增的。有了这层兜底机制保证，<strong>数据表肯定会有主键和主键索引</strong>。</p>',44),c=n("code",null,"trx_id",-1),g=n("strong",null,"哪个事务",-1),E=n("code",null,"roll_pointer",-1),u=n("strong",null,"多版本并发控制（MVCC）",-1),k={href:"https://mp.weixin.qq.com/s/SR0ZL1zAc_0QIQvpDCOANw",target:"_blank",rel:"noopener noreferrer"},A=e('<p><img src="https://cdn.xiaobaidebug.top/隐藏的row_id列.drawio.png" alt="隐藏的row_id列" loading="lazy"><br></p><h2 id="有没有建议主键不自增的场景" tabindex="-1"><a class="header-anchor" href="#有没有建议主键不自增的场景"><span>有没有建议主键不自增的场景</span></a></h2><p>前面提到了主键自增可以带来很多好处，事实上<strong>大部分场景下，我们都建议主键设为自增。</strong></p><p>那有没有不建议主键自增的场景呢？</p><br><h3 id="mysql-分库分表下的-id" tabindex="-1"><a class="header-anchor" href="#mysql-分库分表下的-id"><span>mysql 分库分表下的 id</span></a></h3><p>聊到分库分表，那我就需要说明下，<strong>递增和自增的区别</strong>了，<strong>自增</strong>就是每次都+1，而<strong>递增</strong>则是新的 id 比上一个 id 要大就行了，具体大多少，没关系。</p>',7),B={href:"https://mp.weixin.qq.com/s/HShytuc9Sw3p3kwCfbRbXw",target:"_blank",rel:"noopener noreferrer"},b=e('<p>一种分表方式是通过<strong>对 id 取模进行分表</strong>，这种要求递增就好，不要求严格自增，因为取模后数据会被分散到多个分表中，就算 id 是严格自增的，在分散之后，都只能保证每个分表里 id 只能是递增的。</p><figure><img src="https://cdn.xiaobaidebug.top/根据id取模分表.drawio.png" alt="根据id取模分表" tabindex="0" loading="lazy"><figcaption>根据id取模分表</figcaption></figure><p>另一种分表方式是<strong>根据 id 的范围进行分表（分片）</strong>，它会划出一定的范围，比如以 2kw 为一个分表的大小，那 0~2kw 就放在这张分表中，2kw~4kw 放在另一张分表中，数据不断增加，分表也可以不断增加，<strong>非常适合动态扩容</strong>，但它要求<strong>id 自增</strong>，如果<strong>id 递增</strong>，数据则会出现<strong>大量空洞</strong>。举个例子，比如第一次分配 id=2，第二次分配 id=2kw，这时候第一张表的范围就被打满了，后面再分配一个 id，比如是 3kw，就只能存到 2kw~4kw（第二张）的分表中。那我在 0~2kw 这个范围的分表，也就存了<strong>两条数据</strong>，这太浪费了。</p><figure><img src="https://cdn.xiaobaidebug.top/根据id范围分表.png" alt="根据id范围分表" tabindex="0" loading="lazy"><figcaption>根据id范围分表</figcaption></figure><p>但不管哪种分表方式，一般是<strong>不可能继续用原来表里的自增主键的</strong>，原因也比较好理解，原来的每个表如果都从 0 开始自增的话，那好几个表就会出现好几次重复的 id，根据 id 唯一的原则，这显然不合理。</p><br><p>所以我们在分库分表的场景下，插入的 id 都是专门的 id 服务生成的，如果是要严格自增的话，那一般会通过 redis 来获得，当然不会是一个 id 请求获取一次，一般会<strong>按批次去获得，比如一次性获得 100 个。快用完了再去获取下一批 100 个。</strong></p><p>但这个方案有个问题，它严重依赖 redis，如果 redis 挂了，那整个功能就傻了。</p><p>有没有不依赖于其他第三方组件的方法呢？</p><br><h4 id="雪花算法" tabindex="-1"><a class="header-anchor" href="#雪花算法"><span>雪花算法</span></a></h4><p>有，比如<strong>Twitter 开源的雪花算法。</strong></p><p>雪花算法通过 64 位有特殊含义的数字来组成 id。</p><figure><img src="https://cdn.xiaobaidebug.top/雪花算法.d4rawio.png" alt="雪花算法" tabindex="0" loading="lazy"><figcaption>雪花算法</figcaption></figure><p>首先<strong>第 0 位</strong>不用。</p><p>接下来的<strong>41 位</strong>是<strong>时间戳</strong>。精度是<strong>毫秒</strong>，这个大小大概能表示个<code>69年</code>左右，因为时间戳随着时间流逝肯定是越来越大的，所以这部分决定了生成的 id 肯定是越来越大的。</p><p>再接下来的<strong>10 位</strong>是指产生这些雪花算法的<strong>工作机器 id</strong>，这样就可以让每个机器产生的 id 都具有相应的标识。</p><p>再接下来的<strong>12 位</strong>，<strong>序列号</strong>，就是指这个工作机器里生成的递增数字。</p><p>可以看出，只要处于同一毫秒内，所有的雪花算法 id 的前 42 位的值都是一样的，因此在这一毫秒内，能产生的 id 数量就是 <code>2的10次方✖️2的12次方</code>，大概<code>400w</code>，肯定是够用了，甚至有点多了。</p><br><p><strong>但是！</strong></p><p>细心的兄弟们肯定也发现了，雪花算法它算出的数字动不动就比上次的数字多个几百几万的，也就是它生成的 id 是<strong>趋势递增</strong>的，并不是严格**+1 自增**的，也就是说它并不太适合于根据范围来分表的场景。这是个非常疼的问题。</p><p>还有个<strong>小问题</strong>是，那 10 位工作机器 id，我每次扩容一个工作机器，这个机器怎么知道自己的 id 是多少呢？是不是得从某个地方读过来。</p><p><strong>那有没有一种生成 id 生成方案，既能让分库分表能做到很好的支持动态扩容，又能像雪花算法那样并不依赖 redis 这样的第三方服务。</strong></p><p>有。这就是这篇文章的重点了。</p><br><h4 id="适合分库分表的-uuid-算法" tabindex="-1"><a class="header-anchor" href="#适合分库分表的-uuid-算法"><span>适合分库分表的 uuid 算法</span></a></h4><p>我们可以参考雪花算法的实现，设计成下面这样。注意下面的每一位，<strong>都是十进制</strong>，而不是二进制。</p><figure><img src="https://cdn.xiaobaidebug.top/适合分库分表的uuid算法.d43rawio.png" alt="适合分库分表的uuid算法" tabindex="0" loading="lazy"><figcaption>适合分库分表的uuid算法</figcaption></figure><p>开头的<strong>12 位</strong>依然是时间，但并不是时间戳，雪花算法的时间戳精确到毫秒，我们用不上这么细，我们改为<code>yyMMddHHmmss</code>，注意开头的 yy 是两位，也就是这个方案能保证到 2099 年之前，id 都不会重复，能用到重复，那也是真·百年企业。同样由于最前面是时间，随着时间流逝，也能保证 id 趋势递增。</p><p>接下来的<strong>10 位</strong>，用<strong>十进制</strong>的方式表示工作机器的 ip，就可以把 12 位的 ip 转为 10 位的数字，它可以保证全局唯一，只要服务起来了，也就知道自己的 ip 是多少了，不需要像雪花算法那样从别的地方去读取 worker id 了，又是一个小细节。</p><div align="center"><img src="https://cdn.xiaobaidebug.top/0bec52deb6276987.jpeg" width="30%"></div><p>在接下来的<strong>6 位</strong>，就用于生成序列号，它能支持每秒钟生成 100w 个 id。</p><p>最后的<strong>4 位</strong>，也是这个 id 算法最妙的部分。它<strong>前 2 位</strong>代表分库 id，<strong>后 2 位</strong>代表分表 id。也就是支持一共<code>100*100=1w</code>张分表。</p><br><p>举个例子，假设我只用了 1 个分库，当我一开始只有 3 张分表的情况下，那我可以通过配置，要求生成的 uuid 最后面的 2 位，取值只能是[0,1,2]，分别对应三个表。这样我生成出来的 id，就能非常均匀的落到三个分表中，这还<strong>顺带解决了单个分表热点写入的问题。</strong></p><p>如果随着业务不断发展，需要新加入两张新的表(3 和 4)，同时第 0 张表有点满了，不希望再被写了，那就将配置改为[1,2,3,4]，这样生成的 id 就不会再插入到对应的 0 表中。同时还可以加入生成 id 的<strong>概率和权重</strong>来调整哪个分表落更多数据。</p><p>有了这个新的 uuid 方案，我们<strong>既可以保证生成的数据趋势递增，同时也能非常方便扩展分表</strong>。非常 nice。</p><br><p>数据库有那么多种，mysql 只是其中一种，那其他数据库也是要求主键自增吗？</p><br><h3 id="tidb-的主键-id-不建议自增" tabindex="-1"><a class="header-anchor" href="#tidb-的主键-id-不建议自增"><span>tidb 的主键 id 不建议自增</span></a></h3><p>tidb 是一款分布式数据库，作为 mysql 分库分表场景下的替代产品，可以更好的对数据进行分片。</p><p>它通过引入<strong>Range</strong>的概念进行数据表分片，比如第一个分片表的 id 在 0~2kw，第二个分片表的 id 在 2kw~4kw。这其实就是<strong>根据 id 范围进行数据库分表</strong>。</p><p>它的语法几乎跟 mysql 一致，用起来大部分时候是无感的。</p><p>但跟 mysql 有一点很不一样的就是，mysql 建议 id 自增，但<strong>tidb 却建议使用随机的 uuid</strong>。原因是如果 id 自增的话，根据范围分片的规则，一段时间内生成的 id 几乎都会落到同一个分片上，比如下图，从<code>3kw</code>开始的自增 uuid，几乎都落到<code>range 1</code>这个分片中，而其他表却几乎不会有写入，性能没有被利用起来。出现<strong>一表有难，多表围观</strong>的场面，这种情况又叫<strong>写热点</strong>问题。</p><figure><img src="https://cdn.xiaobaidebug.top/写热点问题.drawio.png" alt="写热点问题" tabindex="0" loading="lazy"><figcaption>写热点问题</figcaption></figure><p>所以为了充分的利用多个分表的写入能力，tidb 建议我们写入时使用<strong>随机 id</strong>，这样数据就能被均匀分散到多个分片中。</p><br><h3 id="用户-id-不建议用自增-id" tabindex="-1"><a class="header-anchor" href="#用户-id-不建议用自增-id"><span>用户 id 不建议用自增 id</span></a></h3><p>前面提到的不建议使用自增 id 的场景，都是技术原因导致的，而下面介绍的这个，单纯是因为业务。</p><p>举个例子吧。</p><p>如果你能知道一个产品每个月，新增的用户数有多少，这个对你来说会是有用的信息吗？</p><p>对程序员来说，可能这个信息价值不大。</p><p>但如果你是做投资的呢，或者是分析竞争对手呢？</p><p>那反过来。</p><p>如果你发现你的竞争对手，总能非常清晰的知道你的产品每个月新进的注册用户是多少人，你会不会心里毛毛的？</p><p>如果真出现了这问题，先不要想是不是有内鬼，先检查下你的用户表主键是不是自增的。</p><img src="https://cdn.xiaobaidebug.top/有内鬼.jpeg" alt="有内鬼" style="zoom:30%;"><p><strong>如果用户 id 是自增的，那别人只要每个月都注册一个新用户，然后抓包得到这个用户的 user_id，然后跟上个月的值减一下，就知道这个月新进多少用户了。</strong></p><p>同样的场景有很多，有时候你去小店吃饭，发票上就写了你是今天的第几单，那大概就能估计今天店家做了多少单。你是店家，你心里也不舒服吧。</p><p>再比如说一些小 app 的商品订单 id，如果也做成自增的，那就很容易可以知道这个月成了多少单。</p><p>类似的事情有很多，这些场景都建议使用趋势递增的 uuid 作为主键。</p><p>当然，<strong>主键保持自增，但是不暴露给前端，那也行，那前面的话，你当我没说过</strong>。</p><br><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li>建表 sql 里主键边上的<code>AUTO_INCREMENT</code>，可以让主键自增，去掉它是可以的，但这就需要你在 insert 的时候自己设置主键的值。</li><li>建表 sql 里的 <code>PRIMARY KEY</code> 是用来声明主键的，如果去掉，那也能建表成功，但 mysql 内部会给你偷偷建一个 <code>ROW_ID</code>的隐藏列作为主键。</li><li>由于 mysql 使用<strong>B+树索引，叶子节点是从小到大排序的</strong>，如果使用自增 id 做主键，这样每次数据都加在 B+树的最后，比起每次加在 B+树中间的方式，加在最后可以有效<strong>减少页分裂的问题。</strong></li><li>在分库分表的场景下，我们可以通过 redis 等第三方组件来获得严格自增的主键 id。如果不想依赖 redis，可以参考雪花算法进行<strong>魔改</strong>，<strong>既能保证数据趋势递增，也能很好的满足分库分表的动态扩容。</strong></li><li>并不是所有数据库都建议使用自增 id 作为主键，比如<strong>tidb 就推荐使用随机 id</strong>，这样可以有效避免<strong>写热点</strong>的问题。而对于一些敏感数据，比如用户 id，订单 id 等，如果使用自增 id 作为主键的话，外部通过抓包，很容易可以知道新进用户量，成单量这些信息，所以需要<strong>谨慎考虑</strong>是否继续使用自增主键。</li></ul><br><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后"><span>最后</span></a></h2><p>我比较记仇，最近有不少兄弟们在评论区叫我 diao 毛。</p><p><strong>我都记住了。</strong></p><p>但是，只要兄弟们还能给右下角的<strong>点赞和在看</strong>来上那么一下的话。</p><p>我觉得，<strong>这口气，也不是不能忍。</strong></p><p>按照惯例，我应该在这里唯唯诺诺的求大家叫我两声<strong>靓仔</strong>的。</p><p>但我今天不想。</p><p>所以先这样。</p><p>我是小白，我们下期见。</p><br><h5 id="别说了-一起在知识的海洋里呛水吧" tabindex="-1"><a class="header-anchor" href="#别说了-一起在知识的海洋里呛水吧"><span>别说了，一起在知识的海洋里呛水吧</span></a></h5><p><strong>点击</strong>下方名片，关注公众号:【小白 debug】<br><img src="https://cdn.xiaobaidebug.top/扫码_搜索联合传播样式-标准色版.png" alt="" loading="lazy"></p><br><p>不满足于在留言区说骚话？</p><p>加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点有意思的话题。就<strong>超！开！心！</strong></p><img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" alt="" style="zoom:50%;"><figure><img src="https://cdn.xiaobaidebug.top/006APoFYly1g5q9gn2jipg308w08wqdi.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><h2 id="文章推荐" tabindex="-1"><a class="header-anchor" href="#文章推荐"><span>文章推荐：</span></a></h2>',87),h={href:"https://mp.weixin.qq.com/s/PP80aD-GQp7VtgyfHj392g",target:"_blank",rel:"noopener noreferrer"},m={href:"https://mp.weixin.qq.com/s/0-YBxU1cSbDdzcZEZjmQYA",target:"_blank",rel:"noopener noreferrer"},y={href:"https://mp.weixin.qq.com/s/YpQGsRyyrGNDu1cOuMy83w",target:"_blank",rel:"noopener noreferrer"};function _(f,w){const a=p("ExternalLinkIcon");return i(),r("div",null,[l,n("p",null,[s("跟 ROW_ID 被隐藏的列还有"),c,s("字段，用于记录当前这一行数据行是被"),g,s("修改的，和一个"),E,s("字段，这个字段是用来指向当前这个数据行的上一个版本，通过这个字段，可以为这行数据形成一条版本链，从而实现"),u,s("。有没有很眼熟，这个在之前写的"),n("a",k,[s("文章"),t(a)]),s("里出现过。")]),A,n("p",null,[s("之前写过一篇"),n("a",B,[s("文章"),t(a)]),s("提到过，mysql 在水平分库分表时，一般有两种方式。")]),b,n("ul",null,[n("li",null,[n("a",h,[s("程序员防猝死指南"),t(a)])]),n("li",null,[n("a",m,[s("TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解"),t(a)])]),n("li",null,[n("a",y,[s("动图图解！既然 IP 层会分片，为什么 TCP 层也还要分段？"),t(a)])])])])}const q=o(d,[["render",_],["__file","数据库主键一定要自增的吗？不自增行不行？有哪些场景下不建议自增？.html.vue"]]),C=JSON.parse('{"path":"/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%BB%E9%94%AE%E4%B8%80%E5%AE%9A%E8%A6%81%E8%87%AA%E5%A2%9E%E7%9A%84%E5%90%97%EF%BC%9F%E4%B8%8D%E8%87%AA%E5%A2%9E%E8%A1%8C%E4%B8%8D%E8%A1%8C%EF%BC%9F%E6%9C%89%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E4%B8%8B%E4%B8%8D%E5%BB%BA%E8%AE%AE%E8%87%AA%E5%A2%9E%EF%BC%9F.html","title":"数据库主键一定要自增的吗？有哪些场景下不建议自增？","lang":"zh-CN","frontmatter":{"description":"数据库主键一定要自增的吗？有哪些场景下不建议自增？ 我们平时建表的时候，一般会像下面这样。 出于习惯，我们一般会加一列id 作为主键，而这个主键一般边上都有个AUTO_INCREMENT, 意思是这个主键是自增的。自增就是 i++，也就是每次都加 1。 但问题来了。 主键 id 不自增行不行？ 为什么要用自增 id 做主键？ 离谱点，没有主键可以吗？ ...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%BB%E9%94%AE%E4%B8%80%E5%AE%9A%E8%A6%81%E8%87%AA%E5%A2%9E%E7%9A%84%E5%90%97%EF%BC%9F%E4%B8%8D%E8%87%AA%E5%A2%9E%E8%A1%8C%E4%B8%8D%E8%A1%8C%EF%BC%9F%E6%9C%89%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E4%B8%8B%E4%B8%8D%E5%BB%BA%E8%AE%AE%E8%87%AA%E5%A2%9E%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"数据库主键一定要自增的吗？有哪些场景下不建议自增？"}],["meta",{"property":"og:description","content":"数据库主键一定要自增的吗？有哪些场景下不建议自增？ 我们平时建表的时候，一般会像下面这样。 出于习惯，我们一般会加一列id 作为主键，而这个主键一般边上都有个AUTO_INCREMENT, 意思是这个主键是自增的。自增就是 i++，也就是每次都加 1。 但问题来了。 主键 id 不自增行不行？ 为什么要用自增 id 做主键？ 离谱点，没有主键可以吗？ ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.xiaobaidebug.top/user%E8%A1%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8E%9F%E5%A7%8B%E7%8A%B6%E6%80%812.drawio.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-19T03:57:35.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"数据库主键一定要自增的吗？有哪些场景下不建议自增？"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-02-19T03:57:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据库主键一定要自增的吗？有哪些场景下不建议自增？\\",\\"image\\":[\\"https://cdn.xiaobaidebug.top/user%E8%A1%A8%E6%95%B0%E6%8D%AE%E5%BA%93%E5%8E%9F%E5%A7%8B%E7%8A%B6%E6%80%812.drawio.png\\",\\"https://cdn.xiaobaidebug.top/B%E5%8A%A0%E6%A0%91%E7%BB%93%E6%9E%847.drawio.png\\",\\"https://cdn.xiaobaidebug.top/%E5%8F%B6%E5%AD%90%E6%BB%A1%E4%BA%86%E4%BD%86%E9%9D%9E%E5%8F%B6%E5%AD%90%E6%9C%AA%E6%BB%A1.drawio-20220606092636547.png\\",\\"https://cdn.xiaobaidebug.top/%E4%B8%BB%E9%94%AEid%E4%B8%8D%E8%87%AA%E5%A2%9E%E7%9A%84%E6%83%85%E5%86%B5.drawio.png\\",\\"https://cdn.xiaobaidebug.top/%E9%9A%90%E8%97%8F%E7%9A%84row_id%E5%88%97.drawio.png\\",\\"https://cdn.xiaobaidebug.top/%E6%A0%B9%E6%8D%AEid%E5%8F%96%E6%A8%A1%E5%88%86%E8%A1%A8.drawio.png\\",\\"https://cdn.xiaobaidebug.top/%E6%A0%B9%E6%8D%AEid%E8%8C%83%E5%9B%B4%E5%88%86%E8%A1%A8.png\\",\\"https://cdn.xiaobaidebug.top/%E9%9B%AA%E8%8A%B1%E7%AE%97%E6%B3%95.d4rawio.png\\",\\"https://cdn.xiaobaidebug.top/%E9%80%82%E5%90%88%E5%88%86%E5%BA%93%E5%88%86%E8%A1%A8%E7%9A%84uuid%E7%AE%97%E6%B3%95.d43rawio.png\\",\\"https://cdn.xiaobaidebug.top/%E5%86%99%E7%83%AD%E7%82%B9%E9%97%AE%E9%A2%98.drawio.png\\",\\"https://cdn.xiaobaidebug.top/%E6%89%AB%E7%A0%81_%E6%90%9C%E7%B4%A2%E8%81%94%E5%90%88%E4%BC%A0%E6%92%AD%E6%A0%B7%E5%BC%8F-%E6%A0%87%E5%87%86%E8%89%B2%E7%89%88.png\\",\\"https://cdn.xiaobaidebug.top/006APoFYly1g5q9gn2jipg308w08wqdi.gif\\"],\\"dateModified\\":\\"2024-02-19T03:57:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%BB%E9%94%AE%E4%B8%80%E5%AE%9A%E8%A6%81%E8%87%AA%E5%A2%9E%E7%9A%84%E5%90%97%EF%BC%9F%E4%B8%8D%E8%87%AA%E5%A2%9E%E8%A1%8C%E4%B8%8D%E8%A1%8C%EF%BC%9F%E6%9C%89%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E4%B8%8B%E4%B8%8D%E5%BB%BA%E8%AE%AE%E8%87%AA%E5%A2%9E%EF%BC%9F.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%95%B0%E6%8D%AE%E5%BA%93%E4%B8%BB%E9%94%AE%E4%B8%80%E5%AE%9A%E8%A6%81%E8%87%AA%E5%A2%9E%E7%9A%84%E5%90%97%EF%BC%9F%E4%B8%8D%E8%87%AA%E5%A2%9E%E8%A1%8C%E4%B8%8D%E8%A1%8C%EF%BC%9F%E6%9C%89%E5%93%AA%E4%BA%9B%E5%9C%BA%E6%99%AF%E4%B8%8B%E4%B8%8D%E5%BB%BA%E8%AE%AE%E8%87%AA%E5%A2%9E%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"数据库主键一定要自增的吗？有哪些场景下不建议自增？"}],["meta",{"property":"og:description","content":"数据库主键一定要自增的吗？有哪些场景下不建议自增？ 我们平时建表的时候，一般会像下面这样。 出于习惯，我们一般会加一列id 作为主键，而这个主键一般边上都有个AUTO_INCREMENT, 意思是这个主键是自增的。自增就是 i++，也就是每次都加 1。 但问题来了。 主键 id 不自增行不行？ 为什么要用自增 id 做主键？ 离谱点，没有主键可以吗？ ..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-19T03:57:35.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-19T03:57:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"数据库主键一定要自增的吗？有哪些场景下不建议自增？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-19T03:57:35.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"主键不自增行不行","slug":"主键不自增行不行","link":"#主键不自增行不行","children":[]},{"level":2,"title":"为什么要用自增主键","slug":"为什么要用自增主键","link":"#为什么要用自增主键","children":[]},{"level":2,"title":"没有主键可以吗","slug":"没有主键可以吗","link":"#没有主键可以吗","children":[]},{"level":2,"title":"有没有建议主键不自增的场景","slug":"有没有建议主键不自增的场景","link":"#有没有建议主键不自增的场景","children":[{"level":3,"title":"mysql 分库分表下的 id","slug":"mysql-分库分表下的-id","link":"#mysql-分库分表下的-id","children":[]},{"level":3,"title":"tidb 的主键 id 不建议自增","slug":"tidb-的主键-id-不建议自增","link":"#tidb-的主键-id-不建议自增","children":[]},{"level":3,"title":"用户 id 不建议用自增 id","slug":"用户-id-不建议用自增-id","link":"#用户-id-不建议用自增-id","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"最后","slug":"最后","link":"#最后","children":[]},{"level":2,"title":"文章推荐：","slug":"文章推荐","link":"#文章推荐","children":[]}],"git":{"createdTime":1708315055000,"updatedTime":1708315055000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":15.66,"words":4698},"filePathRelative":"中间件/mysql/核心知识点/数据库主键一定要自增的吗？不自增行不行？有哪些场景下不建议自增？.md","localizedDate":"2024年2月19日","autoDesc":true}');export{q as comp,C as data};
