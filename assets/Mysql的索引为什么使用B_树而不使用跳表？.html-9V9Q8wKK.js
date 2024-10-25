import{_ as g}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,a as r,b as n,d as o,e as i,o as a,r as s}from"./app-Ciq-_e96.js";const l={},d={href:"https://mp.weixin.qq.com/s/XX_NkIIf_PLyU4IE6lEEYQ",target:"_blank",rel:"noopener noreferrer"},B={href:"https://mp.weixin.qq.com/s/XX_NkIIf_PLyU4IE6lEEYQ",target:"_blank",rel:"noopener noreferrer"},E={href:"https://mp.weixin.qq.com/s/XX_NkIIf_PLyU4IE6lEEYQ",target:"_blank",rel:"noopener noreferrer"},m={href:"https://cloud.tencent.com/developer/article/1813695",target:"_blank",rel:"noopener noreferrer"},b={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html",target:"_blank",rel:"noopener noreferrer"},u={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html",target:"_blank",rel:"noopener noreferrer"},c={href:"https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html",target:"_blank",rel:"noopener noreferrer"},A={href:"https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html",target:"_blank",rel:"noopener noreferrer"};function f(h,t){const e=s("ExternalLinkIcon");return a(),p("div",null,[t[25]||(t[25]=r('<h1 id="mysql-的索引为什么使用-b-树而不使用跳表" tabindex="-1"><a class="header-anchor" href="#mysql-的索引为什么使用-b-树而不使用跳表"><span>mysql 的索引为什么使用 B+树而不使用跳表？</span></a></h1><br><p>在我们的印象中，mysql 数据表里无非就是存储一行行的数据。跟个 excel 似的。</p><p>直接遍历这一行行数据，性能就是 O(n)，比较慢。为了加速查询，使用了<strong>B+树</strong>来做索引，将查询性能优化到了<strong>O(lg(n))</strong>。</p><p>但问题就来了，查询数据性能在 lg(n) 级别的数据结构有很多，比如 redis 的 zset 里用到的<strong>跳表</strong>，也是<strong>lg(n)</strong>，并且实现还贼简单。</p><p><strong>那为什么 mysql 的索引，不使用跳表呢？</strong></p><p>我们今天就来聊聊这个话题。</p><br><h2 id="b-树的结构" tabindex="-1"><a class="header-anchor" href="#b-树的结构"><span>B+树的结构</span></a></h2>',9)),n("p",null,[t[1]||(t[1]=o("之前的一篇")),n("a",d,[t[0]||(t[0]=o("文章")),i(e)]),t[2]||(t[2]=o("里，已经提到过")),t[3]||(t[3]=n("strong",null,"B+树的结构",-1)),t[4]||(t[4]=o("了。文章不长，如果没看过，建议先看下。"))]),t[26]||(t[26]=r('<p><strong>当然，不看也行。</strong></p><p>在这里，<s>为了混点字数</s>，我简单总结下 B+树的结构。</p><p><img src="https://cdn.xiaobaidebug.top/B加树查询过程.png" alt="B+树查询过程" loading="lazy"><br> 如上图，一般 B+树是由多个页组成的<strong>多层级</strong>结构，每个页<code>16Kb</code>，对于主键索引来说，最末级的<strong>叶子结点</strong>放行数据，<strong>非叶子结点</strong>放的则是索引信息（主键 id 和页号），用于加速查询。</p><p>比方说我们想要查找行数据 5。会先从顶层页的 record 们入手。<strong>record 里包含了主键 id 和页号（页地址）</strong>。关注黄色的箭头，向左最小 id 是 1，向右最小 id 是 7。那 id=5 的数据如果存在，那必定在左边箭头。于是顺着的 record 的页地址就到了<code>6号</code>数据页里，再判断 id=5&gt;4，所以肯定在右边的数据页里，于是加载<code>105号</code>数据页。</p><p>在<code>105号数据页</code>里，虽然有多行数据，但也<strong>不是挨个遍历的</strong>，数据页内还有个<strong>页目录</strong>的信息，它可以通过<strong>二分查找</strong>的方式加速查询行数据，于是找到 id=5 的数据行，完成查询。</p><p>从上面可以看出，B+树利用了<strong>空间换时间</strong>的方式（构造了一批非叶子结点用于存放索引信息），<strong>将查询时间复杂度从 O(n)优化为 O(lg(n))</strong>。</p><br><h2 id="跳表的结构" tabindex="-1"><a class="header-anchor" href="#跳表的结构"><span>跳表的结构</span></a></h2><p>看完 B+树，我们再来看下跳表是怎么来的。</p><p>同样的，还是为了存储一行行的数据。</p><p>我们可以将它们用<strong>链表</strong>串起来。</p><figure><img src="https://cdn.xiaobaidebug.top/image/单链表.png" alt="单链表" tabindex="0" loading="lazy"><figcaption>单链表</figcaption></figure><p>想要查询链表中的其中一个结点，时间复杂度是 O(n)，这谁顶得住，于是将<strong>部分</strong>链表结点提出来，再构建出一个新的链表。</p><figure><img src="https://cdn.xiaobaidebug.top/image/两层跳表.png" alt="两层跳表" tabindex="0" loading="lazy"><figcaption>两层跳表</figcaption></figure><p>这样当我想要查询一个数据的时候，我先查上层的链表，就很容易知道数据落在<strong>哪个范围</strong>，然后**跳到下一个层级里进行查询。**这样就把搜索范围一下子缩小了一大半。</p><p>比如查询 id=10 的数据，我们先在上层遍历，依次判断 1,6,12，很快就可以判断出 10 在 6 到 12 之间，然后往下一跳，就可以在遍历 6,7,8,9,10 之后，确定 id=10 的位置。直接将查询范围从原来的 1 到 10，变成现在的 1,6,7,8,9,10，算是砍半了。</p><figure><img src="https://cdn.xiaobaidebug.top/image/两层跳表查找id为10的数据.drawio.png" alt="两层跳表查找id为10的数据" tabindex="0" loading="lazy"><figcaption>两层跳表查找id为10的数据</figcaption></figure><p>既然两层链表就直接将查询范围砍半了，那我<strong>多加几层</strong>，岂不妙哉？</p><p>于是跳表就这样变成了多层。</p><figure><img src="https://cdn.xiaobaidebug.top/image/三层跳表.png" alt="三层跳表" tabindex="0" loading="lazy"><figcaption>三层跳表</figcaption></figure><p>如果还是查询 id=10 的数据，就只需要查询 1,6,9,10 就能找到，比两层的时候更快一些。</p><figure><img src="https://cdn.xiaobaidebug.top/image/三层跳表查询id为10的数据.png" alt="三层跳表查询id为10的数据" tabindex="0" loading="lazy"><figcaption>三层跳表查询id为10的数据</figcaption></figure><p>可以看出，跳表也是通过<strong>牺牲空间换取时间</strong>的方式提升查询性能。<strong>时间复杂度都是 lg(n)</strong>。</p><br><h2 id="b-树和跳表的区别" tabindex="-1"><a class="header-anchor" href="#b-树和跳表的区别"><span>B+树和跳表的区别</span></a></h2><p>从上面可以看到，B+树和跳表的<strong>最下面一层，都包含了所有的数据</strong>，且都是<strong>顺序的，适合用于范围查询</strong>。往上的层级都是构建出来用于提升搜索性能的。这两者实在是太像了。但他们两者在<strong>新增和删除数据</strong>时，还是有些区别的。下面我们以新增数据为例聊一下。</p><br><h3 id="b-树新增数据会怎么样" tabindex="-1"><a class="header-anchor" href="#b-树新增数据会怎么样"><span>B+树新增数据会怎么样</span></a></h3><p>B+树本质上是一种多叉平衡二叉树。关键在于&quot;<strong>平衡</strong>&quot;这两个字，对于多叉树结构来说，它的含义是子树们的高度层级尽量一致（一般最多差一个层级），这样在搜索的时候，不管是到哪个子树分支，搜索次数都差不了太多。</p><p>当数据库表不断插入新的数据时，为了维持 B+树的平衡，B+树会不断分裂调整数据页。</p><p>我们知道 B+树分为<strong>叶子结点和非叶子结点</strong>。</p><p>当插入一条数据时，叶子结点和它上层的索引结点（非叶子结点）最大容量都是 16k，它们都有可能会满。</p><p>为了简化问题，我们<strong>假设</strong>一个数据页只能放三条行数据或索引。</p><p>加入一条数据，根据数据页会不会满，分为三种情况。</p><ul><li><strong>叶子结点和索引结点都没满</strong>。这种情况最简单，直接插入到叶子结点中就好了。</li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/叶子和非叶子都未满.png" alt="叶子和非叶子都未满" tabindex="0" loading="lazy"><figcaption>叶子和非叶子都未满</figcaption></figure><ul><li><strong>叶子结点满了，但索引结点没满</strong>。此时需要拆分叶子结点，同时索引结点要增加新的索引信息。</li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/叶子满了但非叶子未满.drawio.png" alt="叶子满了但非叶子未满" tabindex="0" loading="lazy"><figcaption>叶子满了但非叶子未满</figcaption></figure><ul><li><strong>叶子结点满了，且索引结点也满了</strong>。叶子和索引结点都要拆分，同时往上还要再<strong>加一层索引。</strong></li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/叶子和非叶子都满了.png" alt="叶子和非叶子都满了" tabindex="0" loading="lazy"><figcaption>叶子和非叶子都满了</figcaption></figure><p>从上面可以看到，只有在叶子和索引结点<strong>都满了</strong>的情况下，B+树才会考虑加入一层新的结点。</p>',41)),n("p",null,[t[6]||(t[6]=o("而从之前的")),n("a",B,[t[5]||(t[5]=o("文章")),i(e)]),t[7]||(t[7]=o("知道，要把三层 B+树塞满，那大概需要 2kw 左右的数据。"))]),t[27]||(t[27]=r('<br><h3 id="跳表新增数据" tabindex="-1"><a class="header-anchor" href="#跳表新增数据"><span>跳表新增数据</span></a></h3><p>跳表同样也是很多层，新增一个数据时，最底层的链表需要插入数据。</p><p>此时，<strong>是否需要在上面的几层中加入数据做索引呢？</strong></p><p>这个就纯靠<strong>随机函数</strong>了。</p><p>理论上为了达到<strong>二分的效果</strong>，每一层的结点数需要是下一层结点数的二分之一。</p><p>也就是说现在有一个新的数据插入了，它有<code>50%</code>的概率需要在<code>第二层</code>加入索引，有<code>25%</code>的概率需要在<code>第三层</code>加个索引，以此类推，直到<code>最顶层</code>。</p><p>举个例子，如果跳表中插入数据 id=6，且随机函数返回第三层（有 25%的概率），那就需要在跳表的最底层到第三层都插入数据。</p><figure><img src="https://cdn.xiaobaidebug.top/image/跳表插入数据.drawio.png" alt="跳表插入数据" tabindex="0" loading="lazy"><figcaption>跳表插入数据</figcaption></figure><p>如果这个随机函数设计成上面这样，当<strong>数据量样本足够大</strong>的时候，数据的分布就符合我们理想中的&quot;二分&quot;。</p><p>跟上面 B+树不一样，跳表是否新增层数，纯粹靠随机函数，根本不关心前后上下结点。</p><br><p>好了，基础科普也结束了，我们可以进入正题了。</p><br><h2 id="mysql-的索引为什么使用-b-树而不使用跳表-1" tabindex="-1"><a class="header-anchor" href="#mysql-的索引为什么使用-b-树而不使用跳表-1"><span>mysql 的索引为什么使用 B+树而不使用跳表？</span></a></h2>',15)),n("p",null,[t[9]||(t[9]=n("strong",null,"B+树",-1)),t[10]||(t[10]=o("是多叉树结构，每个结点都是一个 16k 的数据页，能存放较多索引信息，所以")),t[11]||(t[11]=n("strong",null,"扇出很高",-1)),t[12]||(t[12]=o("。")),t[13]||(t[13]=n("strong",null,"三层",-1)),t[14]||(t[14]=o("左右就可以存储")),t[15]||(t[15]=n("code",null,"2kw",-1)),t[16]||(t[16]=o("左右的数据（知道结论就行，想知道原因可以看之前的")),n("a",E,[t[8]||(t[8]=o("文章")),i(e)]),t[17]||(t[17]=o("）。也就是说查询一次数据，如果这些数据页都在磁盘里，那么最多需要查询")),t[18]||(t[18]=n("strong",null,"三次磁盘 IO",-1)),t[19]||(t[19]=o("。"))]),t[28]||(t[28]=r('<br><p><strong>跳表</strong>是链表结构，一条数据一个结点，如果最底层要存放<code>2kw</code>数据，且每次查询都要能达到<strong>二分查找</strong>的效果，<code>2kw</code>大概在<code>2的24次方</code>左右，所以，跳表大概高度在<strong>24 层</strong>左右。最坏情况下，这 24 层数据会分散在不同的数据页里，也即是查一次数据会经历<strong>24 次磁盘 IO</strong>。</p><p>因此存放同样量级的数据，B+树的高度比跳表的要少，如果放在 mysql 数据库上来说，就是<strong>磁盘 IO 次数更少，因此 B+树查询更快</strong>。</p><p>而针对<strong>写操作</strong>，B+树需要拆分合并索引数据页，跳表则独立插入，并根据随机函数确定层数，没有旋转和维持平衡的开销，因此<strong>跳表的写入性能会比 B+树要好。</strong></p><p>其实，mysql 的<strong>存储引擎是可以换的</strong>，以前是<code>myisam</code>，后来才有的<code>innodb</code>，它们底层索引用的都是<strong>B+树</strong>。也就是说，你完全可以造一个索引为跳表的存储引擎装到 mysql 里。事实上，<code>facebook</code>造了个<code>rocksDB</code>的存储引擎，里面就用了<strong>跳表</strong>。直接说结论，它的<strong>写入性能</strong>确实是比 innodb 要好，但<strong>读性能</strong>确实比 innodb 要差不少。感兴趣的话，可以在文章最后面的<strong>参考资料</strong>里看到他们的性能对比数据。</p><br><h2 id="redis-为什么使用跳表而不使用-b-树或二叉树呢" tabindex="-1"><a class="header-anchor" href="#redis-为什么使用跳表而不使用-b-树或二叉树呢"><span>redis 为什么使用跳表而不使用 B+树或二叉树呢？</span></a></h2><p>redis 支持多种数据结构，里面有个<strong>有序集合</strong>，也叫<strong>ZSET</strong>。内部实现就是<strong>跳表</strong>。那为什么要<strong>用跳表而不用 B+树等结构呢？</strong></p><p>这个几乎每次面试都要被问一下。</p><p>虽然已经很熟了，但每次都要装作之前没想过，现场思考一下才知道答案。</p><p>真的，很考验演技。</p><p>大家知道，redis 是纯纯的内存数据库。</p><p>进行读写数据都是操作内存，跟磁盘没啥关系，因此也<strong>不存在磁盘 IO</strong>了，所以层高就不再是跳表的劣势了。</p><p>并且前面也提到 B+树是有一系列合并拆分操作的，换成红黑树或者其他 AVL 树的话也是各种旋转，目的也是<strong>为了保持树的平衡</strong>。</p><p>而跳表插入数据时，只需要随机一下，就知道自己要不要往上加索引，根本不用考虑前后结点的感受，也就<strong>少了旋转平衡的开销</strong>。</p><p>因此，redis 选了跳表，而不是 B+树。</p><br><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li>B+树是多叉平衡搜索树，扇出高，只需要 3 层左右就能存放 2kw 左右的数据，同样情况下跳表则需要 24 层左右，假设层高对应<strong>磁盘 IO</strong>，那么 B+树的读性能会比跳表要好，因此 mysql 选了 B+树做索引。</li><li>redis 的读写全在内存里进行操作，不涉及磁盘 IO，同时跳表实现简单，相比 B+树、AVL 树、少了旋转树结构的开销，因此 redis 使用跳表来实现 ZSET，而不是树结构。</li><li>存储引擎 RocksDB 内部使用了跳表，对比使用 B+树的 innodb，虽然写性能更好，但读性能属实差了些。在读多写少的场景下，B+树依旧 YYDS。</li></ul><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2><p>《MYSQL 内核：INNODB 存储引擎 卷 1》</p><p>《RocksDB 和 Innodb 引擎性能 PK 胜负难料？》</p>',22)),n("p",null,[n("a",m,[t[20]||(t[20]=o("https://cloud.tencent.com/developer/article/1813695")),i(e)])]),t[29]||(t[29]=r('<h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后"><span>最后</span></a></h2><br><p>最近在看《龙蛇演义》，剧情很一般，但我硬是一口气看到了最新一集，还很上头。</p><p>为啥？</p><p>点开它，看到女主角的时候你就理解我了。</p><figure><img src="https://cdn.xiaobaidebug.top/image/image-20220404094330264.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这么说吧，一个颜值出众，身材火辣的姐姐，还是个世界顶级的武术高手，穿着旗袍，踩着高跟，做着各种让牛顿棺材板都快要按不住的动作，只为手把手教会你武术基本功。</p><p>这时候，剧情还重要吗？</p><p>不得不说，当我看到姐姐穿成这样用木棍顶起 400 斤的汞球时。</p><figure><img src="https://cdn.xiaobaidebug.top/image/image-20220404094549469.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><p>我可以肯定，导演根本不懂物理。</p><br><p>但是！</p><br><p>导演很懂男人!</p><br><p>这不得不让我陷入沉思，<strong>到底什么才是好的内容?</strong></p><p>难道现在有个大姐姐穿个黑丝高跟超短裙，教你变量的声明和定义这么基础的东西，你也会去看吗？</p><p>我不知道你们会不会。</p><br><p>反正我会。</p><figure><img src="https://cdn.xiaobaidebug.top/image/006Xk4cbgy1gqzc3sofewj30c805st8u.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><p>最近原创更文的阅读量稳步下跌，思前想后，夜里辗转反侧。</p><p>我有个不成熟的请求。</p><figure><img src="https://cdn.xiaobaidebug.top/image/u=2281575747,3550568508&amp;fm=253&amp;fmt=auto&amp;app=120&amp;f=JPEG.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><br><p><strong>离开广东好长时间了，好久没人叫我靓仔了。</strong></p><p>大家可以在<strong>评论区</strong>里，叫我一靓仔吗？</p><p>我这么善良质朴的愿望，能被满足吗？</p><p>如果实在叫不出口的话，能帮我点下右下角的<strong>点赞和在看</strong>吗？</p><br><h5 id="别说了-一起在知识的海洋里呛水吧" tabindex="-1"><a class="header-anchor" href="#别说了-一起在知识的海洋里呛水吧"><span>别说了，一起在知识的海洋里呛水吧</span></a></h5><p>关注公众号:【小白 debug】</p><br><p>不满足于在留言区说骚话？</p><p>加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点有意思的话题。就<strong>超！开！心！</strong></p><img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" width="50%" align="center"><figure><img src="https://cdn.xiaobaidebug.top/image/006APoFYly1g5q9gn2jipg308w08wqdi.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="文章推荐" tabindex="-1"><a class="header-anchor" href="#文章推荐"><span>文章推荐：</span></a></h2>',41)),n("ul",null,[n("li",null,[n("p",null,[n("a",b,[t[21]||(t[21]=o("golang进阶面试题八股文合集")),i(e)])])]),n("li",null,[n("p",null,[n("a",u,[t[22]||(t[22]=o("golang基础面试题八股文合集")),i(e)])])]),n("li",null,[n("p",null,[n("a",c,[t[23]||(t[23]=o("golang常用标准库第三方库大全")),i(e)])])]),n("li",null,[n("p",null,[n("a",A,[t[24]||(t[24]=o("golang学习路线")),i(e)])])])])])}const q=g(l,[["render",f],["__file","Mysql的索引为什么使用B_树而不使用跳表？.html.vue"]]),F=JSON.parse('{"path":"/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/Mysql%E7%9A%84%E7%B4%A2%E5%BC%95%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8B_%E6%A0%91%E8%80%8C%E4%B8%8D%E4%BD%BF%E7%94%A8%E8%B7%B3%E8%A1%A8%EF%BC%9F.html","title":"mysql 的索引为什么使用 B+树而不使用跳表？","lang":"zh-CN","frontmatter":{"description":"mysql 的索引为什么使用 B+树而不使用跳表？ 在我们的印象中，mysql 数据表里无非就是存储一行行的数据。跟个 excel 似的。 直接遍历这一行行数据，性能就是 O(n)，比较慢。为了加速查询，使用了B+树来做索引，将查询性能优化到了O(lg(n))。 但问题就来了，查询数据性能在 lg(n) 级别的数据结构有很多，比如 redis 的 zs...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/Mysql%E7%9A%84%E7%B4%A2%E5%BC%95%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8B_%E6%A0%91%E8%80%8C%E4%B8%8D%E4%BD%BF%E7%94%A8%E8%B7%B3%E8%A1%A8%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"mysql 的索引为什么使用 B+树而不使用跳表？"}],["meta",{"property":"og:description","content":"mysql 的索引为什么使用 B+树而不使用跳表？ 在我们的印象中，mysql 数据表里无非就是存储一行行的数据。跟个 excel 似的。 直接遍历这一行行数据，性能就是 O(n)，比较慢。为了加速查询，使用了B+树来做索引，将查询性能优化到了O(lg(n))。 但问题就来了，查询数据性能在 lg(n) 级别的数据结构有很多，比如 redis 的 zs..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.xiaobaidebug.top/B%E5%8A%A0%E6%A0%91%E6%9F%A5%E8%AF%A2%E8%BF%87%E7%A8%8B.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T01:53:36.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"mysql 的索引为什么使用 B+树而不使用跳表？"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-07-16T01:53:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mysql 的索引为什么使用 B+树而不使用跳表？\\",\\"image\\":[\\"https://cdn.xiaobaidebug.top/B%E5%8A%A0%E6%A0%91%E6%9F%A5%E8%AF%A2%E8%BF%87%E7%A8%8B.png\\",\\"https://cdn.xiaobaidebug.top/image/%E5%8D%95%E9%93%BE%E8%A1%A8.png\\",\\"https://cdn.xiaobaidebug.top/image/%E4%B8%A4%E5%B1%82%E8%B7%B3%E8%A1%A8.png\\",\\"https://cdn.xiaobaidebug.top/image/%E4%B8%A4%E5%B1%82%E8%B7%B3%E8%A1%A8%E6%9F%A5%E6%89%BEid%E4%B8%BA10%E7%9A%84%E6%95%B0%E6%8D%AE.drawio.png\\",\\"https://cdn.xiaobaidebug.top/image/%E4%B8%89%E5%B1%82%E8%B7%B3%E8%A1%A8.png\\",\\"https://cdn.xiaobaidebug.top/image/%E4%B8%89%E5%B1%82%E8%B7%B3%E8%A1%A8%E6%9F%A5%E8%AF%A2id%E4%B8%BA10%E7%9A%84%E6%95%B0%E6%8D%AE.png\\",\\"https://cdn.xiaobaidebug.top/image/%E5%8F%B6%E5%AD%90%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E9%83%BD%E6%9C%AA%E6%BB%A1.png\\",\\"https://cdn.xiaobaidebug.top/image/%E5%8F%B6%E5%AD%90%E6%BB%A1%E4%BA%86%E4%BD%86%E9%9D%9E%E5%8F%B6%E5%AD%90%E6%9C%AA%E6%BB%A1.drawio.png\\",\\"https://cdn.xiaobaidebug.top/image/%E5%8F%B6%E5%AD%90%E5%92%8C%E9%9D%9E%E5%8F%B6%E5%AD%90%E9%83%BD%E6%BB%A1%E4%BA%86.png\\",\\"https://cdn.xiaobaidebug.top/image/%E8%B7%B3%E8%A1%A8%E6%8F%92%E5%85%A5%E6%95%B0%E6%8D%AE.drawio.png\\",\\"https://cdn.xiaobaidebug.top/image/image-20220404094330264.png\\",\\"https://cdn.xiaobaidebug.top/image/image-20220404094549469.png\\",\\"https://cdn.xiaobaidebug.top/image/006Xk4cbgy1gqzc3sofewj30c805st8u.jpg\\",\\"https://cdn.xiaobaidebug.top/image/u=2281575747,3550568508&fm=253&fmt=auto&app=120&f=JPEG.jpeg\\",\\"https://cdn.xiaobaidebug.top/image/006APoFYly1g5q9gn2jipg308w08wqdi.gif\\"],\\"dateModified\\":\\"2024-07-16T01:53:36.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/Mysql%E7%9A%84%E7%B4%A2%E5%BC%95%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8B_%E6%A0%91%E8%80%8C%E4%B8%8D%E4%BD%BF%E7%94%A8%E8%B7%B3%E8%A1%A8%EF%BC%9F.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/%E4%B8%AD%E9%97%B4%E4%BB%B6/mysql/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/Mysql%E7%9A%84%E7%B4%A2%E5%BC%95%E4%B8%BA%E4%BB%80%E4%B9%88%E4%BD%BF%E7%94%A8B_%E6%A0%91%E8%80%8C%E4%B8%8D%E4%BD%BF%E7%94%A8%E8%B7%B3%E8%A1%A8%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"mysql 的索引为什么使用 B+树而不使用跳表？"}],["meta",{"property":"og:description","content":"mysql 的索引为什么使用 B+树而不使用跳表？ 在我们的印象中，mysql 数据表里无非就是存储一行行的数据。跟个 excel 似的。 直接遍历这一行行数据，性能就是 O(n)，比较慢。为了加速查询，使用了B+树来做索引，将查询性能优化到了O(lg(n))。 但问题就来了，查询数据性能在 lg(n) 级别的数据结构有很多，比如 redis 的 zs..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-07-16T01:53:36.000Z"}],["meta",{"property":"article:modified_time","content":"2024-07-16T01:53:36.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"mysql 的索引为什么使用 B+树而不使用跳表？\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-07-16T01:53:36.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"B+树的结构","slug":"b-树的结构","link":"#b-树的结构","children":[]},{"level":2,"title":"跳表的结构","slug":"跳表的结构","link":"#跳表的结构","children":[]},{"level":2,"title":"B+树和跳表的区别","slug":"b-树和跳表的区别","link":"#b-树和跳表的区别","children":[{"level":3,"title":"B+树新增数据会怎么样","slug":"b-树新增数据会怎么样","link":"#b-树新增数据会怎么样","children":[]},{"level":3,"title":"跳表新增数据","slug":"跳表新增数据","link":"#跳表新增数据","children":[]}]},{"level":2,"title":"mysql 的索引为什么使用 B+树而不使用跳表？","slug":"mysql-的索引为什么使用-b-树而不使用跳表-1","link":"#mysql-的索引为什么使用-b-树而不使用跳表-1","children":[]},{"level":2,"title":"redis 为什么使用跳表而不使用 B+树或二叉树呢？","slug":"redis-为什么使用跳表而不使用-b-树或二叉树呢","link":"#redis-为什么使用跳表而不使用-b-树或二叉树呢","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]},{"level":2,"title":"最后","slug":"最后","link":"#最后","children":[]},{"level":2,"title":"文章推荐：","slug":"文章推荐","link":"#文章推荐","children":[]}],"git":{"createdTime":1708315055000,"updatedTime":1721094816000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":2},{"name":"xiaobai-tech","email":"948485496@qq.com","commits":2}]},"readingTime":{"minutes":12.14,"words":3642},"filePathRelative":"中间件/mysql/核心知识点/Mysql的索引为什么使用B+树而不使用跳表？.md","localizedDate":"2024年2月19日","autoDesc":true}');export{q as comp,F as data};
