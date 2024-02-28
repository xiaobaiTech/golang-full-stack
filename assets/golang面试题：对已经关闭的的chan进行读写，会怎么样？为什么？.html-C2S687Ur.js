import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as c,o as r,c as i,a as e,b as a,d as o,e as l}from"./app-Cf5go4s7.js";const g={},s=l('<figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC8xNDVkOWZiZjQ0NzM0M2Q5YmIxODM4YjNmMzk4MjRhNi5wbmc?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h1><p>对<strong>已经关闭</strong>的的<code>chan</code>进行读写，会怎么样？<strong>为什么？</strong></p><h1 id="怎么答" tabindex="-1"><a class="header-anchor" href="#怎么答"><span>怎么答</span></a></h1><ul><li>读<strong>已经关闭</strong>的<code>chan</code>能一直读到东西，但是读到的内容根据通道内<code>关闭前</code>是否有元素而不同。 <ul><li>如果<code>chan</code>关闭前，<code>buffer</code>内有元素<strong>还未读</strong>,会正确读到<code>chan</code>内的值，且返回的第二个 bool 值（是否读成功）为<code>true</code>。</li><li>如果<code>chan</code>关闭前，<code>buffer</code>内有元素<strong>已经被读完</strong>，<code>chan</code>内无值，接下来所有接收的值都会非阻塞直接成功，返回 <code>channel</code> 元素的<strong>零值</strong>，但是第二个<code>bool</code>值一直为<code>false</code>。</li></ul></li><li>写<strong>已经关闭</strong>的<code>chan</code>会<code>panic</code></li></ul><h1 id="举例" tabindex="-1"><a class="header-anchor" href="#举例"><span>举例</span></a></h1><h4 id="_1-写已经关闭的-chan" tabindex="-1"><a class="header-anchor" href="#_1-写已经关闭的-chan"><span>1.写已经关闭的 chan</span></a></h4><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC9lYjlhZGRhNDU3NGU0ZTAyYjJlODczN2JkODI5NWE0NC5wbmc?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>注意这个<code>send on closed channel</code>，待会会提到。</li></ul><h4 id="_2-读已经关闭的-chan" tabindex="-1"><a class="header-anchor" href="#_2-读已经关闭的-chan"><span>2.读已经关闭的 chan</span></a></h4><figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC8wZTcyNTVkNzI5NDI0Y2NhYTBhNGNjNmQ5ZGU1MTBkMi5wbmc?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="多问一句" tabindex="-1"><a class="header-anchor" href="#多问一句"><span>多问一句</span></a></h1><p><strong>1.为什么写已经关闭的<code>chan</code>就会<code>panic</code>呢？</strong><br><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC81Njc2MDBmYmEyNDE0MjcwYWQ3YWU0YTFjY2RhODQwMy5wbmc?x-oss-process=image/format,png" alt="" loading="lazy"></p><ul><li>当<code>c.closed != 0</code>则为通道关闭，此时执行写，源码提示直接 panic，输出的内容就是上面提到的<code>&quot;send on closed channel&quot;</code>。</li></ul><p><strong>2. 为什么读已关闭的<code>chan</code>会一直能读到值？</strong><br><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC80YmNjMGYwNjI3MzE0Y2JiYWRkMWI0ODRjNTE4OTRkOS5wbmc?x-oss-process=image/format,png" alt="" loading="lazy"></p><ul><li><code>c.closed != 0 &amp;&amp; c.qcount == 0</code>指通道已经关闭，且缓存为空的情况下（已经读完了之前写到通道里的值）</li><li>如果接收值的地址<code>ep</code>不为空 <ul><li>那接收值将获得是一个<strong>该类型的零值</strong></li><li><code>typedmemclr</code> 会<strong>根据类型清理</strong>相应地址的内存</li><li>这就解释了上面代码为什么关闭的<code>chan</code>会返回对应类型的零值</li></ul></li></ul><h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章"><span>相关文章</span></a></h2>',17),d={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html",target:"_blank",rel:"noopener noreferrer"},p={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html",target:"_blank",rel:"noopener noreferrer"},h={href:"https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html",target:"_blank",rel:"noopener noreferrer"},E=e("h5",{id:"如果你想每天学习一个知识点",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#如果你想每天学习一个知识点"},[e("span",null,"如果你想每天学习一个知识点？")])],-1),B=e("figure",null,[e("img",{src:"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS85ODZiZWU0YS03NzQ1LTQ0YjMtYTFhOS0wMzc5ODIzOGNkNmQucG5n?x-oss-process=image/format,png",alt:"",tabindex:"0",loading:"lazy"}),e("figcaption")],-1);function A(b,u){const t=c("ExternalLinkIcon");return r(),i("div",null,[s,e("ul",null,[e("li",null,[e("p",null,[e("a",d,[a("golang进阶面试题八股文合集"),o(t)])])]),e("li",null,[e("p",null,[e("a",p,[a("golang基础面试题八股文合集"),o(t)])])]),e("li",null,[e("p",null,[e("a",h,[a("golang常用标准库第三方库大全"),o(t)])])]),e("li",null,[e("p",null,[e("a",m,[a("golang学习路线"),o(t)])])])]),E,B])}const M=n(g,[["render",A],["__file","golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？.html.vue"]]),_=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E5%AF%B9%E5%B7%B2%E7%BB%8F%E5%85%B3%E9%97%AD%E7%9A%84%E7%9A%84chan%E8%BF%9B%E8%A1%8C%E8%AF%BB%E5%86%99%EF%BC%8C%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7%EF%BC%9F%E4%B8%BA%E4%BB%80%E4%B9%88%EF%BC%9F.html","title":"golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？","lang":"zh-CN","frontmatter":{"title":"golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？","date":"2020-06-11T22:57:55.000Z","tags":null,"categories":"golang面试题","description":" 问题 对已经关闭的的chan进行读写，会怎么样？为什么？ 怎么答 读已经关闭的chan能一直读到东西，但是读到的内容根据通道内关闭前是否有元素而不同。 如果chan关闭前，buffer内有元素还未读,会正确读到chan内的值，且返回的第二个 bool 值（是否读成功）为true。 如果chan关闭前，buffer内有元素已经被读完，chan内无值，接...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E5%AF%B9%E5%B7%B2%E7%BB%8F%E5%85%B3%E9%97%AD%E7%9A%84%E7%9A%84chan%E8%BF%9B%E8%A1%8C%E8%AF%BB%E5%86%99%EF%BC%8C%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7%EF%BC%9F%E4%B8%BA%E4%BB%80%E4%B9%88%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？"}],["meta",{"property":"og:description","content":" 问题 对已经关闭的的chan进行读写，会怎么样？为什么？ 怎么答 读已经关闭的chan能一直读到东西，但是读到的内容根据通道内关闭前是否有元素而不同。 如果chan关闭前，buffer内有元素还未读,会正确读到chan内的值，且返回的第二个 bool 值（是否读成功）为true。 如果chan关闭前，buffer内有元素已经被读完，chan内无值，接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC8xNDVkOWZiZjQ0NzM0M2Q5YmIxODM4YjNmMzk4MjRhNi5wbmc?x-oss-process=image/format,png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-28T01:37:12.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:published_time","content":"2020-06-11T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-28T01:37:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？\\",\\"image\\":[\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC8xNDVkOWZiZjQ0NzM0M2Q5YmIxODM4YjNmMzk4MjRhNi5wbmc?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC9lYjlhZGRhNDU3NGU0ZTAyYjJlODczN2JkODI5NWE0NC5wbmc?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC8wZTcyNTVkNzI5NDI0Y2NhYTBhNGNjNmQ5ZGU1MTBkMi5wbmc?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC81Njc2MDBmYmEyNDE0MjcwYWQ3YWU0YTFjY2RhODQwMy5wbmc?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zdGF0aWMwMS5pbWdrci5jb20vdGVtcC80YmNjMGYwNjI3MzE0Y2JiYWRkMWI0ODRjNTE4OTRkOS5wbmc?x-oss-process=image/format,png\\",\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS85ODZiZWU0YS03NzQ1LTQ0YjMtYTFhOS0wMzc5ODIzOGNkNmQucG5n?x-oss-process=image/format,png\\"],\\"datePublished\\":\\"2020-06-11T22:57:55.000Z\\",\\"dateModified\\":\\"2024-02-28T01:37:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E5%AF%B9%E5%B7%B2%E7%BB%8F%E5%85%B3%E9%97%AD%E7%9A%84%E7%9A%84chan%E8%BF%9B%E8%A1%8C%E8%AF%BB%E5%86%99%EF%BC%8C%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7%EF%BC%9F%E4%B8%BA%E4%BB%80%E4%B9%88%EF%BC%9F.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E5%AF%B9%E5%B7%B2%E7%BB%8F%E5%85%B3%E9%97%AD%E7%9A%84%E7%9A%84chan%E8%BF%9B%E8%A1%8C%E8%AF%BB%E5%86%99%EF%BC%8C%E4%BC%9A%E6%80%8E%E4%B9%88%E6%A0%B7%EF%BC%9F%E4%B8%BA%E4%BB%80%E4%B9%88%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？"}],["meta",{"property":"og:description","content":" 问题 对已经关闭的的chan进行读写，会怎么样？为什么？ 怎么答 读已经关闭的chan能一直读到东西，但是读到的内容根据通道内关闭前是否有元素而不同。 如果chan关闭前，buffer内有元素还未读,会正确读到chan内的值，且返回的第二个 bool 值（是否读成功）为true。 如果chan关闭前，buffer内有元素已经被读完，chan内无值，接..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-28T01:37:12.000Z"}],["meta",{"property":"article:published_time","content":"2020-06-11T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-28T01:37:12.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-06-11T22:57:55.000Z\\",\\"dateModified\\":\\"2024-02-28T01:37:12.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"相关文章","slug":"相关文章","link":"#相关文章","children":[]}],"git":{"createdTime":1708315540000,"updatedTime":1709084232000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":2}]},"readingTime":{"minutes":1.91,"words":574},"filePathRelative":"golang/核心知识点/golang面试题：对已经关闭的的chan进行读写，会怎么样？为什么？.md","localizedDate":"2020年6月11日","autoDesc":true}');export{M as comp,_ as data};
