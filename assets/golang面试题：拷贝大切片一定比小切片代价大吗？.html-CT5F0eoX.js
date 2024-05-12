import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as l,c as r,a as e,b as a,d as n,e as s}from"./app-B7Tho3c5.js";const c={},p=s(`<figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9jMmM2Y2YxZi0xN2RlLTRiZDEtYjY5Ny02NGQ1ZDlhY2M2MDUucG5n?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h1><p>拷贝大切片一定比小切片代价大吗？</p><h1 id="怎么答" tabindex="-1"><a class="header-anchor" href="#怎么答"><span>怎么答</span></a></h1><p>并不是，所有切片的大小相同；<strong>三个字段</strong>（一个 uintptr，两个 int）。切片中的第一个字是指向切片底层数组的指针，这是切片的存储空间，第二个字段是切片的长度，第三个字段是容量。将一个 slice 变量分配给另一个变量只会复制三个机器字。所以 <strong>拷贝大切片跟小切片的代价应该是一样的</strong>。</p><h1 id="解释" tabindex="-1"><a class="header-anchor" href="#解释"><span>解释</span></a></h1><ul><li><code>SliceHeader</code> 是<code>切片</code>在 go 的底层结构。</li></ul><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">type</span> SliceHeader <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	Data <span class="token builtin">uintptr</span>
	Len  <span class="token builtin">int</span>
	Cap  <span class="token builtin">int</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>大切片跟小切片的区别无非就是 <code>Len</code> 和 <code>Cap</code>的值比小切片的这两个值大一些，如果发生拷贝，本质上就是拷贝上面的三个字段。</li></ul><h5 id="关注公众号-【小白-debug】" tabindex="-1"><a class="header-anchor" href="#关注公众号-【小白-debug】"><span>关注公众号:【小白 debug】</span></a></h5><h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章"><span>相关文章</span></a></h2>`,11),g={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html",target:"_blank",rel:"noopener noreferrer"},E={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html",target:"_blank",rel:"noopener noreferrer"};function h(u,A){const t=i("ExternalLinkIcon");return l(),r("div",null,[p,e("ul",null,[e("li",null,[e("p",null,[e("a",g,[a("golang进阶面试题八股文合集"),n(t)])])]),e("li",null,[e("p",null,[e("a",E,[a("golang基础面试题八股文合集"),n(t)])])]),e("li",null,[e("p",null,[e("a",d,[a("golang常用标准库第三方库大全"),n(t)])])]),e("li",null,[e("p",null,[e("a",m,[a("golang学习路线"),n(t)])])])])])}const b=o(c,[["render",h],["__file","golang面试题：拷贝大切片一定比小切片代价大吗？.html.vue"]]),F=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E6%8B%B7%E8%B4%9D%E5%A4%A7%E5%88%87%E7%89%87%E4%B8%80%E5%AE%9A%E6%AF%94%E5%B0%8F%E5%88%87%E7%89%87%E4%BB%A3%E4%BB%B7%E5%A4%A7%E5%90%97%EF%BC%9F.html","title":"拷贝大切片一定比小切片代价大吗？","lang":"zh-CN","frontmatter":{"title":"拷贝大切片一定比小切片代价大吗？","date":"2020-05-13T22:57:55.000Z","tags":null,"categories":"golang面试题","description":" 问题 拷贝大切片一定比小切片代价大吗？ 怎么答 并不是，所有切片的大小相同；三个字段（一个 uintptr，两个 int）。切片中的第一个字是指向切片底层数组的指针，这是切片的存储空间，第二个字段是切片的长度，第三个字段是容量。将一个 slice 变量分配给另一个变量只会复制三个机器字。所以 拷贝大切片跟小切片的代价应该是一样的。 解释 SliceH...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E6%8B%B7%E8%B4%9D%E5%A4%A7%E5%88%87%E7%89%87%E4%B8%80%E5%AE%9A%E6%AF%94%E5%B0%8F%E5%88%87%E7%89%87%E4%BB%A3%E4%BB%B7%E5%A4%A7%E5%90%97%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"拷贝大切片一定比小切片代价大吗？"}],["meta",{"property":"og:description","content":" 问题 拷贝大切片一定比小切片代价大吗？ 怎么答 并不是，所有切片的大小相同；三个字段（一个 uintptr，两个 int）。切片中的第一个字是指向切片底层数组的指针，这是切片的存储空间，第二个字段是切片的长度，第三个字段是容量。将一个 slice 变量分配给另一个变量只会复制三个机器字。所以 拷贝大切片跟小切片的代价应该是一样的。 解释 SliceH..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9jMmM2Y2YxZi0xN2RlLTRiZDEtYjY5Ny02NGQ1ZDlhY2M2MDUucG5n?x-oss-process=image/format,png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-12T13:55:00.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"拷贝大切片一定比小切片代价大吗？"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:published_time","content":"2020-05-13T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-12T13:55:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"拷贝大切片一定比小切片代价大吗？\\",\\"image\\":[\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS9jMmM2Y2YxZi0xN2RlLTRiZDEtYjY5Ny02NGQ1ZDlhY2M2MDUucG5n?x-oss-process=image/format,png\\"],\\"datePublished\\":\\"2020-05-13T22:57:55.000Z\\",\\"dateModified\\":\\"2024-05-12T13:55:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E6%8B%B7%E8%B4%9D%E5%A4%A7%E5%88%87%E7%89%87%E4%B8%80%E5%AE%9A%E6%AF%94%E5%B0%8F%E5%88%87%E7%89%87%E4%BB%A3%E4%BB%B7%E5%A4%A7%E5%90%97%EF%BC%9F.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E6%8B%B7%E8%B4%9D%E5%A4%A7%E5%88%87%E7%89%87%E4%B8%80%E5%AE%9A%E6%AF%94%E5%B0%8F%E5%88%87%E7%89%87%E4%BB%A3%E4%BB%B7%E5%A4%A7%E5%90%97%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"拷贝大切片一定比小切片代价大吗？"}],["meta",{"property":"og:description","content":" 问题 拷贝大切片一定比小切片代价大吗？ 怎么答 并不是，所有切片的大小相同；三个字段（一个 uintptr，两个 int）。切片中的第一个字是指向切片底层数组的指针，这是切片的存储空间，第二个字段是切片的长度，第三个字段是容量。将一个 slice 变量分配给另一个变量只会复制三个机器字。所以 拷贝大切片跟小切片的代价应该是一样的。 解释 SliceH..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-12T13:55:00.000Z"}],["meta",{"property":"article:published_time","content":"2020-05-13T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-12T13:55:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"拷贝大切片一定比小切片代价大吗？\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-13T22:57:55.000Z\\",\\"dateModified\\":\\"2024-05-12T13:55:00.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"相关文章","slug":"相关文章","link":"#相关文章","children":[]}],"git":{"createdTime":1708315540000,"updatedTime":1715522100000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":2},{"name":"xiaobai-tech","email":"948485496@qq.com","commits":1}]},"readingTime":{"minutes":1.2,"words":360},"filePathRelative":"golang/核心知识点/golang面试题：拷贝大切片一定比小切片代价大吗？.md","localizedDate":"2020年5月13日","autoDesc":true}');export{b as comp,F as data};
