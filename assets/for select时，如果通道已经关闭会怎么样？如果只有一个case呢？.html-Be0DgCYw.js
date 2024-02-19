import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as s,c as l,a as e,b as c,d as o,e as a}from"./app-D3PKci_G.js";const r={},d=a('<figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8yNDFlZTVhYy1kMGY1LTQzZDEtYTU5ZC0yMzExODgzNzMzNDkucG5n?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h1><p><code>for</code>循环<code>select</code>时，如果通道已经关闭会怎么样？如果<code>select</code>中的<code>case</code>只有一个，又会怎么样？</p><h1 id="怎么答" tabindex="-1"><a class="header-anchor" href="#怎么答"><span>怎么答</span></a></h1><ul><li>for 循环<code>select</code>时，如果其中一个 case 通道已经关闭，则每次都会执行到这个 case。</li><li>如果 select 里边只有一个 case，而这个 case 被关闭了，则会出现死循环。</li></ul><h1 id="解释" tabindex="-1"><a class="header-anchor" href="#解释"><span>解释</span></a></h1><h2 id="_1-for-循环里被关闭的通道" tabindex="-1"><a class="header-anchor" href="#_1-for-循环里被关闭的通道"><span>1.for 循环里被关闭的通道</span></a></h2><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9jNmU5MzM4MS03YTk3LTRmMDgtODljOS1lODkwNDg1YmE2YmUucG5n?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS84OWMxMWU0OS0zYThiLTQxYTAtYmE3MC1mZmQwZWRkOTExMTcucG5n?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li><code>c通道</code>是一个缓冲为<code>0</code>的通道，在<code>main</code>开始时，启动一个协程对<code>c通道</code>写入<code>10</code>，然后就关闭掉这个通道。</li><li>在<code>main</code>中通过 <code>x, ok := &lt;-c</code> 接受<code>通道c</code>里的值，从输出结果里看出，确实从通道里读出了之前塞入通道的<code>10</code>，但是在通道关闭后，这个通道一直能读出内容。</li></ul><h2 id="_2-怎么样才能不读关闭后通道" tabindex="-1"><a class="header-anchor" href="#_2-怎么样才能不读关闭后通道"><span>2.怎么样才能不读关闭后通道</span></a></h2><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9lNDlmNDE4Mi03MGQyLTQxYjAtODRjYy05M2VkMzMxYjc3YjUucG5n?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure>',12),g=e("code",null,"x, ok := <-c",-1),m=e("code",null,"ok",-1),p=e("code",null,"ok",-1),h=e("code",null,"false",-1),_={href:"https://mp.weixin.qq.com/s/qm-8pvHBVRmLQQ4_DHc1Tw",target:"_blank",rel:"noopener noreferrer"},f=e("code",null,"ok",-1),u=e("code",null,"false",-1),b=e("code",null,"c = nil",-1),x=e("code",null,"nil",-1),E={href:"https://mp.weixin.qq.com/s/ixJu0wrGXsCcGzveCqnr6A",target:"_blank",rel:"noopener noreferrer"},M=e("code",null,"select",-1),Z=e("code",null,"select",-1),y=e("code",null,"case",-1),N=a('<h2 id="_3-如果-select-里只有一个已经关闭的-case-会怎么样" tabindex="-1"><a class="header-anchor" href="#_3-如果-select-里只有一个已经关闭的-case-会怎么样"><span>3.如果 select 里只有一个已经关闭的 case，会怎么样？</span></a></h2><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS82ZGMxZDQ1Zi04MDk1LTQ1ODAtODUxNi04MWZmNDdkNTI4MGEucG5n?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>可以看出只有一个<code>case</code>的情况下，则会<code>死循环</code>。</li><li>那如果像上面一个<code>case</code>那样，把通道置为<code>nil</code>就能解决问题了吗？</li></ul><h2 id="_4-select-里只有一个已经关闭的-case-置为-nil-会怎么样" tabindex="-1"><a class="header-anchor" href="#_4-select-里只有一个已经关闭的-case-置为-nil-会怎么样"><span>4.select 里只有一个已经关闭的 case，置为 nil，会怎么样？</span></a></h2><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9hZTAyNWU4NS0yNzZjLTQyMDItYWU2Ny0yMGQ4Njk1Y2I3MTQucG5n?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>第一次读取<code>case</code>能读到通道里的<code>10</code></li><li>第二次读取<code>case</code>能读到通道已经关闭的信息。此时将通道置为<code>nil</code></li><li>第三次读取<code>case</code>时 main 协程会被阻塞，此时整个进程没有其他活动的协程了，进程<code>deadlock</code></li></ul><h1 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h1><ul><li><code>select</code>中如果任意某个通道有值可读时，它就会被执行，其他被忽略。</li><li>如果没有<code>default</code>字句，<code>select</code>将有可能阻塞，直到某个通道有值可以运行，所以<code>select</code>里最好有一个<code>default</code>，否则将有一直阻塞的风险。</li></ul><h1 id="文章推荐" tabindex="-1"><a class="header-anchor" href="#文章推荐"><span>文章推荐：</span></a></h1>',9),z={href:"https://mp.weixin.qq.com/s/qm-8pvHBVRmLQQ4_DHc1Tw",target:"_blank",rel:"noopener noreferrer"},T={href:"https://mp.weixin.qq.com/s/ixJu0wrGXsCcGzveCqnr6A",target:"_blank",rel:"noopener noreferrer"},D={href:"https://mp.weixin.qq.com/s/WK9StkC3Jfy-o1dUqlo7Dg",target:"_blank",rel:"noopener noreferrer"},L={href:"https://mp.weixin.qq.com/s/zZM_iLuopyenI0LD6VYZGw",target:"_blank",rel:"noopener noreferrer"},k={href:"https://mp.weixin.qq.com/s/4QAxGEr9KxtZXyfSG8VoCQ",target:"_blank",rel:"noopener noreferrer"},W={href:"https://mp.weixin.qq.com/s/4YYR1eYFIFsNOaTxL4Q-eQ",target:"_blank",rel:"noopener noreferrer"},Y={href:"https://mp.weixin.qq.com/s/d80m0hgoKcHfKp4ZXH1M4A",target:"_blank",rel:"noopener noreferrer"},A={href:"https://mp.weixin.qq.com/s/OIRPOszH-rTJp03AeRgnRQ",target:"_blank",rel:"noopener noreferrer"},v=e("code",null,"中文、数字、英文字母",-1),H={href:"https://mp.weixin.qq.com/s/hPYdiHYRufimyKT4FcW4HA",target:"_blank",rel:"noopener noreferrer"},j={href:"https://mp.weixin.qq.com/s/IkOwh9bh36vK6JgN7b3KjA",target:"_blank",rel:"noopener noreferrer"},Q=e("h5",{id:"如果你想每天学习一个知识点",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#如果你想每天学习一个知识点"},[e("span",null,"如果你想每天学习一个知识点？")])],-1),G=e("figure",null,[e("img",{src:"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS85ODZiZWU0YS03NzQ1LTQ0YjMtYTFhOS0wMzc5ODIzOGNkNmQucG5n?x-oss-process=image/format,png",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1);function O(B,S){const t=i("ExternalLinkIcon");return s(),l("div",null,[d,e("ul",null,[e("li",null,[g,c(" 返回的值里第一个 x 是通道内的值，"),m,c("是指通道是否关闭，当通道被关闭后，"),p,c("则返回"),h,c("，因此可以根据这个进行操作。读一个已经关闭的通道为什么会出现 false，可以看我之前的 "),e("a",_,[c("对已经关闭的的 chan 进行读写，会怎么样？为什么？"),o(t)]),c(" 。")]),e("li",null,[c("当返回的"),f,c("为"),u,c("时，执行"),b,c(" 将通道置为"),x,c("，相当于读一个未初始化的通道，则会一直阻塞。至于为什么读一个未初始化的通道会出现阻塞，可以看我的另一篇 "),e("a",E,[c("对未初始化的的 chan 进行读写，会怎么样？为什么？"),o(t)]),c(" 。"),M,c("中如果任意某个通道有值可读时，它就会被执行，其他被忽略。则"),Z,c("会跳过这个阻塞"),y,c("，可以解决不断读已关闭通道的问题。")])]),N,e("ul",null,[e("li",null,[e("a",z,[c("golang 面试题：对已经关闭的的 chan 进行读写，会怎么样？为什么？"),o(t)])]),e("li",null,[e("a",T,[c("golang 面试题：对未初始化的的 chan 进行读写，会怎么样？为什么？"),o(t)])]),e("li",null,[e("a",D,[c("golang 面试题：​reflect（反射包）如何获取字段 tag​？为什么 json 包不能导出私有变量的 tag？"),o(t)])]),e("li",null,[e("a",L,[c("golang 面试题：json 包变量不加 tag 会怎么样？"),o(t)])]),e("li",null,[e("a",k,[c("golang 面试题：怎么避免内存逃逸？"),o(t)])]),e("li",null,[e("a",W,[c("golang 面试题：简单聊聊内存逃逸？"),o(t)])]),e("li",null,[e("a",Y,[c("golang 面试题：字符串转成 byte 数组，会发生内存拷贝吗？"),o(t)])]),e("li",null,[e("a",A,[c("golang 面试题：翻转含有"),v,c("的字符串"),o(t)])]),e("li",null,[e("a",H,[c("golang 面试题：拷贝大切片一定比小切片代价大吗？"),o(t)])]),e("li",null,[e("a",j,[c("golang 面试题：能说说 uintptr 和 unsafe.Pointer 的区别吗？"),o(t)])])]),Q,G])}const R=n(r,[["render",O],["__file","for select时，如果通道已经关闭会怎么样？如果只有一个case呢？.html.vue"]]),w=JSON.parse('{"path":"/golang/golang%E9%9D%A2%E8%AF%95%E9%A2%98/for%20select%E6%97%B6%EF%BC%8C%E5%A6%82%E6%9E%9C%E9%80%9A%E9%81%93%E5%B7%B2%E7%BB%8F%E5%85%B3%E9%97%AD%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7%EF%BC%9F%E5%A6%82%E6%9E%9C%E5%8F%AA%E6%9C%89%E4%B8%80%E4%B8%AAcase%E5%91%A2%EF%BC%9F.html","title":"golang面试官：for select时，如果通道已经关闭会怎么样？如果select中只有一个case呢？","lang":"zh-CN","frontmatter":{"title":"golang面试官：for select时，如果通道已经关闭会怎么样？如果select中只有一个case呢？","date":"2020-08-11T22:57:55.000Z","tags":null,"categories":"golang面试题","description":" 问题 for循环select时，如果通道已经关闭会怎么样？如果select中的case只有一个，又会怎么样？ 怎么答 for 循环select时，如果其中一个 case 通道已经关闭，则每次都会执行到这个 case。 如果 select 里边只有一个 case，而这个 case 被关闭了，则会出现死循环。 解释 1.for 循环里被关闭的通道 c通道...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/golang%E9%9D%A2%E8%AF%95%E9%A2%98/for%20select%E6%97%B6%EF%BC%8C%E5%A6%82%E6%9E%9C%E9%80%9A%E9%81%93%E5%B7%B2%E7%BB%8F%E5%85%B3%E9%97%AD%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7%EF%BC%9F%E5%A6%82%E6%9E%9C%E5%8F%AA%E6%9C%89%E4%B8%80%E4%B8%AAcase%E5%91%A2%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"golang面试官：for select时，如果通道已经关闭会怎么样？如果select中只有一个case呢？"}],["meta",{"property":"og:description","content":" 问题 for循环select时，如果通道已经关闭会怎么样？如果select中的case只有一个，又会怎么样？ 怎么答 for 循环select时，如果其中一个 case 通道已经关闭，则每次都会执行到这个 case。 如果 select 里边只有一个 case，而这个 case 被关闭了，则会出现死循环。 解释 1.for 循环里被关闭的通道 c通道..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8yNDFlZTVhYy1kMGY1LTQzZDEtYTU5ZC0yMzExODgzNzMzNDkucG5n?x-oss-process=image/format,png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-19T03:57:35.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"golang面试官：for select时，如果通道已经关闭会怎么样？如果select中只有一个case呢？"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:published_time","content":"2020-08-11T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-19T03:57:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"golang面试官：for select时，如果通道已经关闭会怎么样？如果select中只有一个case呢？\\",\\"image\\":[\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8yNDFlZTVhYy1kMGY1LTQzZDEtYTU5ZC0yMzExODgzNzMzNDkucG5n?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9jNmU5MzM4MS03YTk3LTRmMDgtODljOS1lODkwNDg1YmE2YmUucG5n?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS84OWMxMWU0OS0zYThiLTQxYTAtYmE3MC1mZmQwZWRkOTExMTcucG5n?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9lNDlmNDE4Mi03MGQyLTQxYjAtODRjYy05M2VkMzMxYjc3YjUucG5n?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS82ZGMxZDQ1Zi04MDk1LTQ1ODAtODUxNi04MWZmNDdkNTI4MGEucG5n?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9hZTAyNWU4NS0yNzZjLTQyMDItYWU2Ny0yMGQ4Njk1Y2I3MTQucG5n?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS85ODZiZWU0YS03NzQ1LTQ0YjMtYTFhOS0wMzc5ODIzOGNkNmQucG5n?x-oss-process=image/format,png\\"],\\"datePublished\\":\\"2020-08-11T22:57:55.000Z\\",\\"dateModified\\":\\"2024-02-19T03:57:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"1.for 循环里被关闭的通道","slug":"_1-for-循环里被关闭的通道","link":"#_1-for-循环里被关闭的通道","children":[]},{"level":2,"title":"2.怎么样才能不读关闭后通道","slug":"_2-怎么样才能不读关闭后通道","link":"#_2-怎么样才能不读关闭后通道","children":[]},{"level":2,"title":"3.如果 select 里只有一个已经关闭的 case，会怎么样？","slug":"_3-如果-select-里只有一个已经关闭的-case-会怎么样","link":"#_3-如果-select-里只有一个已经关闭的-case-会怎么样","children":[]},{"level":2,"title":"4.select 里只有一个已经关闭的 case，置为 nil，会怎么样？","slug":"_4-select-里只有一个已经关闭的-case-置为-nil-会怎么样","link":"#_4-select-里只有一个已经关闭的-case-置为-nil-会怎么样","children":[]}],"git":{"createdTime":1708315055000,"updatedTime":1708315055000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":3.34,"words":1002},"filePathRelative":"golang/golang面试题/for select时，如果通道已经关闭会怎么样？如果只有一个case呢？.md","localizedDate":"2020年8月11日","autoDesc":true}');export{R as comp,w as data};
