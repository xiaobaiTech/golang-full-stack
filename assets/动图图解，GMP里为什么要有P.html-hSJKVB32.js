import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as g,c as r,a as e,b as t,d as a,e as l}from"./app-Cf5go4s7.js";const c={},d={href:"https://github.com/xiaobaiTech/golangFamily",target:"_blank",rel:"noopener noreferrer"},p=l('<h2 id="gm-模型是什么" tabindex="-1"><a class="header-anchor" href="#gm-模型是什么"><span>GM 模型是什么</span></a></h2><figure><img src="https://cdn.xiaobaidebug.top/image/GM图.png" alt="GM图" tabindex="0" loading="lazy"><figcaption>GM图</figcaption></figure><p>在 <code>Go 1.1</code>版本之前，其实用的就是<code>GM</code>模型。</p><ul><li><p><strong>G</strong>，协程。通常在代码里用 <code>go</code> 关键字执行一个方法，那么就等于起了一个<code>G</code>。</p></li><li><p><strong>M</strong>，<strong>内核</strong>线程，操作系统内核其实看不见<code>G</code>和<code>P</code>，只知道自己在执行一个线程。<code>G</code>和<code>P</code>都是在<strong>用户层</strong>上的实现。</p></li></ul><p>除了<code>G</code>和<code>M</code>以外，还有一个<strong>全局协程队列</strong>，这个全局队列里放的是多个处于<strong>可运行状态</strong>的<code>G</code>。<code>M</code>如果想要获取<code>G</code>，就需要访问一个<strong>全局队列</strong>。同时，内核线程<code>M</code>是可以同时存在多个的，因此访问时还需要考虑<strong>并发</strong>安全问题。因此这个全局队列有一把<strong>全局的大锁</strong>，每次访问都需要去获取这把大锁。</p><p>并发量小的时候还好，当并发量大了，这把大锁，就成为了<strong>性能瓶颈</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/image/GM模型.gif" alt="GM模型" tabindex="0" loading="lazy"><figcaption>GM模型</figcaption></figure><h2 id="gmp-模型是什么" tabindex="-1"><a class="header-anchor" href="#gmp-模型是什么"><span>GMP 模型是什么</span></a></h2><figure><img src="https://cdn.xiaobaidebug.top/image/GMP图.png" alt="GMP图" tabindex="0" loading="lazy"><figcaption>GMP图</figcaption></figure><p>基于<strong>没有什么是加一个中间层不能解决的</strong>思路，<code>golang</code>在原有的<code>GM</code>模型的基础上加入了一个调度器<code>P</code>，可以简单理解为是在<code>G</code>和<code>M</code>中间加了个中间层。</p><p>于是就有了现在的<code>GMP</code>模型里。</p><ul><li><p><code>P</code> 的加入，还带来了一个<strong>本地协程队列</strong>，跟前面提到的<strong>全局队列</strong>类似，也是用于存放<code>G</code>，想要获取等待运行的<code>G</code>，会<strong>优先</strong>从本地队列里拿，访问本地队列无需加锁。而全局协程队列依然是存在的，但是功能被弱化，不到<strong>万不得已</strong>是不会去全局队列里拿<code>G</code>的。</p></li><li><p><code>GM</code>模型里 M 想要运行<code>G</code>，直接去全局队列里拿就行了；<code>GMP</code>模型里，<code>M</code>想要运行<code>G</code>，就得先获取<code>P</code>，然后从 <code>P</code> 的本地队列获取 <code>G</code>。</p></li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/GMP模型1.gif" alt="GMP模型" tabindex="0" loading="lazy"><figcaption>GMP模型</figcaption></figure><ul><li><p>新建 <code>G</code> 时，新<code>G</code>会优先加入到 <code>P</code> 的本地队列；如果本地队列满了，则会把本地队列中一半的 <code>G</code> 移动到全局队列。</p></li><li><p><code>P</code> 的本地队列为空时，就从全局队列里去取。</p></li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/GMP模型-获取全局协程队列.gif" alt="GMP模型-获取全局协程队列" tabindex="0" loading="lazy"><figcaption>GMP模型-获取全局协程队列</figcaption></figure><ul><li>如果全局队列为空时，<code>M</code> 会从其他 <code>P</code> 的本地队列<strong>偷（stealing）一半 G</strong>放到自己 <code>P</code> 的本地队列。</li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/GMP模型-stealing2.gif" alt="GMP模型-stealing" tabindex="0" loading="lazy"><figcaption>GMP模型-stealing</figcaption></figure><ul><li><code>M</code> 运行 <code>G</code>，<code>G</code> 执行之后，<code>M</code> 会从 <code>P</code> 获取下一个 <code>G</code>，不断重复下去。</li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/GMP模型4.gif" alt="GMP模型-循环执行" tabindex="0" loading="lazy"><figcaption>GMP模型-循环执行</figcaption></figure><h2 id="为什么-p-的逻辑不直接加在-m-上" tabindex="-1"><a class="header-anchor" href="#为什么-p-的逻辑不直接加在-m-上"><span>为什么 P 的逻辑不直接加在 M 上</span></a></h2><p>主要还是因为<code>M</code>其实是<strong>内核</strong>线程，内核只知道自己在跑线程，而<code>golang</code>的运行时（包括调度，垃圾回收等）其实都是<strong>用户空间</strong>里的逻辑。操作系统内核哪里还知道，也不需要知道用户空间的 golang 应用原来还有那么多花花肠子。这一切逻辑交给应用层自己去做就好，毕竟改内核线程的逻辑也不合适啊。</p><blockquote><p>如果文章对你有帮助，看下文章底部右下角，做点正能量的事情（<strong>点两下</strong>）支持一下。（<strong>疯狂暗示，拜托拜托，这对我真的很重要！</strong>）</p></blockquote><p>我是小白，我们下期见。</p><h2 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料"><span>参考资料</span></a></h2>',24),s={href:"https://learnku.com/articles/41728",target:"_blank",rel:"noopener noreferrer"},E={href:"https://mp.weixin.qq.com/s/an7dml9NLOhqOZjEGLdEEw",target:"_blank",rel:"noopener noreferrer"},h={href:"https://qcrao.com/2019/09/02/dive-into-go-scheduler/#%E4%BB%80%E4%B9%88%E6%98%AF-scheduler",target:"_blank",rel:"noopener noreferrer"},m=e("h2",{id:"文章推荐",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#文章推荐"},[e("span",null,"文章推荐：")])],-1),u={href:"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%8A%A8%E5%9B%BE%E5%9B%BE%E8%A7%A3%EF%BC%8CGMP%E9%87%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89P.html",target:"_blank",rel:"noopener noreferrer"},B={href:"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%BB%99%E5%A4%A7%E5%AE%B6%E4%B8%A2%E8%84%B8%E4%BA%86%EF%BC%8C%E7%94%A8%E4%BA%86%E4%B8%89%E5%B9%B4golang%EF%BC%8C%E6%88%91%E8%BF%98%E6%98%AF%E6%B2%A1%E7%AD%94%E5%AF%B9%E8%BF%99%E9%81%93%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F%E9%A2%98.html",target:"_blank",rel:"noopener noreferrer"},G={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html",target:"_blank",rel:"noopener noreferrer"},b={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html",target:"_blank",rel:"noopener noreferrer"},A={href:"https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html",target:"_blank",rel:"noopener noreferrer"},M={href:"https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html",target:"_blank",rel:"noopener noreferrer"},f=e("h5",{id:"别说了-关注公众号-【小白-debug】-一起在知识的海洋里呛水吧",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#别说了-关注公众号-【小白-debug】-一起在知识的海洋里呛水吧"},[e("span",null,"别说了，关注公众号:【小白 debug】，一起在知识的海洋里呛水吧")])],-1),P=e("p",null,[t("关注公众号:【小白 debug】"),e("br"),e("img",{src:"https://cdn.xiaobaidebug.top/1696069689495.png",alt:"",loading:"lazy"})],-1);function _(x,F){const o=i("ExternalLinkIcon");return g(),r("div",null,[e("blockquote",null,[e("p",null,[t("文章持续更新，可以微信搜一搜「小白 debug」第一时间阅读，回复【面试】获免费面试题集。本文已经收录在 GitHub "),e("a",d,[t("https://github.com/xiaobaiTech/golangFamily"),a(o)]),t(" , 有大厂面试完整考点和成长路线，欢迎 Star。")])]),p,e("p",null,[t("[1]《Golang 调度器 GMP 原理与调度全分析》 ——Aceld :"),e("a",s,[t("https://learnku.com/articles/41728"),a(o)])]),e("p",null,[t("[2]《GMP 模型为什么要有 P》 ——煎鱼 :"),e("a",E,[t("https://mp.weixin.qq.com/s/an7dml9NLOhqOZjEGLdEEw"),a(o)])]),e("p",null,[t("[3]《深度解密 Go 语言之 Scheduler》 ——qcrao :"),e("a",h,[t("https://qcrao.com/2019/09/02/dive-into-go-scheduler/#什么是-scheduler"),a(o)])]),m,e("ul",null,[e("li",null,[e("p",null,[e("a",u,[t("i/o timeout，希望你不要踩到这个 net/http 包的坑"),a(o)])])]),e("li",null,[e("p",null,[e("a",B,[t("给大家丢脸了，用了三年 golang，我还是没答对这道内存泄漏题"),a(o)])])]),e("li",null,[e("p",null,[e("a",G,[t("golang进阶面试题八股文合集"),a(o)])])]),e("li",null,[e("p",null,[e("a",b,[t("golang基础面试题八股文合集"),a(o)])])]),e("li",null,[e("p",null,[e("a",A,[t("golang常用标准库第三方库大全"),a(o)])])]),e("li",null,[e("p",null,[e("a",M,[t("golang学习路线"),a(o)])])])]),f,P])}const k=n(c,[["render",_],["__file","动图图解，GMP里为什么要有P.html.vue"]]),T=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%8A%A8%E5%9B%BE%E5%9B%BE%E8%A7%A3%EF%BC%8CGMP%E9%87%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89P.html","title":"动图图解！GMP模型里为什么要有P？背后的原因让人暖心","lang":"zh-CN","frontmatter":{"title":"动图图解！GMP模型里为什么要有P？背后的原因让人暖心","date":"2021-06-11T22:57:55.000Z","tags":null,"categories":"golang面试题","description":" 文章持续更新，可以微信搜一搜「小白 debug」第一时间阅读，回复【面试】获免费面试题集。本文已经收录在 GitHub https://github.com/xiaobaiTech/golangFamily , 有大厂面试完整考点和成长路线，欢迎 Star。 GM 模型是什么 GM图GM图 在 Go 1.1版本之前，其实用的就是GM模型。 G，协程。...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%8A%A8%E5%9B%BE%E5%9B%BE%E8%A7%A3%EF%BC%8CGMP%E9%87%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89P.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"动图图解！GMP模型里为什么要有P？背后的原因让人暖心"}],["meta",{"property":"og:description","content":" 文章持续更新，可以微信搜一搜「小白 debug」第一时间阅读，回复【面试】获免费面试题集。本文已经收录在 GitHub https://github.com/xiaobaiTech/golangFamily , 有大厂面试完整考点和成长路线，欢迎 Star。 GM 模型是什么 GM图GM图 在 Go 1.1版本之前，其实用的就是GM模型。 G，协程。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.xiaobaidebug.top/image/GM%E5%9B%BE.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-28T01:37:12.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"动图图解！GMP模型里为什么要有P？背后的原因让人暖心"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:published_time","content":"2021-06-11T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-28T01:37:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"动图图解！GMP模型里为什么要有P？背后的原因让人暖心\\",\\"image\\":[\\"https://cdn.xiaobaidebug.top/image/GM%E5%9B%BE.png\\",\\"https://cdn.xiaobaidebug.top/image/GM%E6%A8%A1%E5%9E%8B.gif\\",\\"https://cdn.xiaobaidebug.top/image/GMP图.png\\",\\"https://cdn.xiaobaidebug.top/image/GMP%E6%A8%A1%E5%9E%8B1.gif\\",\\"https://cdn.xiaobaidebug.top/image/GMP%E6%A8%A1%E5%9E%8B-%E8%8E%B7%E5%8F%96%E5%85%A8%E5%B1%80%E5%8D%8F%E7%A8%8B%E9%98%9F%E5%88%97.gif\\",\\"https://cdn.xiaobaidebug.top/image/GMP%E6%A8%A1%E5%9E%8B-stealing2.gif\\",\\"https://cdn.xiaobaidebug.top/image/GMP%E6%A8%A1%E5%9E%8B4.gif\\",\\"https://cdn.xiaobaidebug.top/1696069689495.png\\"],\\"datePublished\\":\\"2021-06-11T22:57:55.000Z\\",\\"dateModified\\":\\"2024-02-28T01:37:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%8A%A8%E5%9B%BE%E5%9B%BE%E8%A7%A3%EF%BC%8CGMP%E9%87%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89P.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%8A%A8%E5%9B%BE%E5%9B%BE%E8%A7%A3%EF%BC%8CGMP%E9%87%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E6%9C%89P.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"动图图解！GMP模型里为什么要有P？背后的原因让人暖心"}],["meta",{"property":"og:description","content":" 文章持续更新，可以微信搜一搜「小白 debug」第一时间阅读，回复【面试】获免费面试题集。本文已经收录在 GitHub https://github.com/xiaobaiTech/golangFamily , 有大厂面试完整考点和成长路线，欢迎 Star。 GM 模型是什么 GM图GM图 在 Go 1.1版本之前，其实用的就是GM模型。 G，协程。..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-28T01:37:12.000Z"}],["meta",{"property":"article:published_time","content":"2021-06-11T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-28T01:37:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"动图图解！GMP模型里为什么要有P？背后的原因让人暖心\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-06-11T22:57:55.000Z\\",\\"dateModified\\":\\"2024-02-28T01:37:12.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"GM 模型是什么","slug":"gm-模型是什么","link":"#gm-模型是什么","children":[]},{"level":2,"title":"GMP 模型是什么","slug":"gmp-模型是什么","link":"#gmp-模型是什么","children":[]},{"level":2,"title":"为什么 P 的逻辑不直接加在 M 上","slug":"为什么-p-的逻辑不直接加在-m-上","link":"#为什么-p-的逻辑不直接加在-m-上","children":[]},{"level":2,"title":"参考资料","slug":"参考资料","link":"#参考资料","children":[]},{"level":2,"title":"文章推荐：","slug":"文章推荐","link":"#文章推荐","children":[]}],"git":{"createdTime":1708315540000,"updatedTime":1709084232000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":2}]},"readingTime":{"minutes":4.59,"words":1376},"filePathRelative":"golang/核心知识点/动图图解，GMP里为什么要有P.md","localizedDate":"2021年6月11日","autoDesc":true}');export{k as comp,T as data};
