import{_ as o}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as p,a as i,b as n,d as s,e,o as l,r as c}from"./app-Ciq-_e96.js";const r={},u={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html",target:"_blank",rel:"noopener noreferrer"},d={href:"https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html",target:"_blank",rel:"noopener noreferrer"},m={href:"https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html",target:"_blank",rel:"noopener noreferrer"};function E(k,a){const t=c("ExternalLinkIcon");return l(),p("div",null,[a[4]||(a[4]=i(`<figure><img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8wNzdhMGZlOC1lZDU2LTQ5ODItYjRmNy1iNzZhMGYyYWIwNmYucG5n?x-oss-process=image/format,png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="问题" tabindex="-1"><a class="header-anchor" href="#问题"><span>问题</span></a></h1><p>翻转含有<code>中文、数字、英文字母</code>的字符串<br><code>&quot;你好abc啊哈哈&quot;</code></p><h1 id="代码实现" tabindex="-1"><a class="header-anchor" href="#代码实现"><span>代码实现</span></a></h1><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span><span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	src <span class="token operator">:=</span> <span class="token string">&quot;你好abc啊哈哈&quot;</span>
	dst <span class="token operator">:=</span> <span class="token function">reverse</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">rune</span><span class="token punctuation">(</span>src<span class="token punctuation">)</span><span class="token punctuation">)</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;%v\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>dst<span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">reverse</span><span class="token punctuation">(</span>s <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">rune</span><span class="token punctuation">)</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">rune</span> <span class="token punctuation">{</span>
	<span class="token keyword">for</span> i<span class="token punctuation">,</span> j <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>s<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> j<span class="token punctuation">;</span> i<span class="token punctuation">,</span> j <span class="token operator">=</span> i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> j<span class="token operator">-</span><span class="token number">1</span> <span class="token punctuation">{</span>
		s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">,</span> s<span class="token punctuation">[</span>j<span class="token punctuation">]</span> <span class="token operator">=</span> s<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">,</span> s<span class="token punctuation">[</span>i<span class="token punctuation">]</span>
	<span class="token punctuation">}</span>
	<span class="token keyword">return</span> s
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="解释" tabindex="-1"><a class="header-anchor" href="#解释"><span>解释</span></a></h1><ul><li><code>rune</code>关键字，从 golang 源码中看出，它是 int32 的别名（-2^31 ~ 2^31-1），比起 byte（-128 ～ 127），<strong>可表示更多的字符</strong>。</li><li>由于 rune 可表示的范围更大，所以能处理一切字符，当然也包括<strong>中文字符</strong>。在平时计算中文字符，可用 rune。</li><li>因此将<code>字符串</code>转为<code>rune的切片</code>，再进行翻转，完美解决。</li></ul><h5 id="关注公众号-【小白-debug】" tabindex="-1"><a class="header-anchor" href="#关注公众号-【小白-debug】"><span>关注公众号:【小白 debug】</span></a></h5><h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章"><span>相关文章</span></a></h2>`,9)),n("ul",null,[n("li",null,[n("p",null,[n("a",u,[a[0]||(a[0]=s("golang进阶面试题八股文合集")),e(t)])])]),n("li",null,[n("p",null,[n("a",g,[a[1]||(a[1]=s("golang基础面试题八股文合集")),e(t)])])]),n("li",null,[n("p",null,[n("a",d,[a[2]||(a[2]=s("golang常用标准库第三方库大全")),e(t)])])]),n("li",null,[n("p",null,[n("a",m,[a[3]||(a[3]=s("golang学习路线")),e(t)])])])])])}const B=o(r,[["render",E],["__file","golang面试题：翻转含有中文、数字、英文字母的字符串.html.vue"]]),b=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E7%BF%BB%E8%BD%AC%E5%90%AB%E6%9C%89%E4%B8%AD%E6%96%87%E3%80%81%E6%95%B0%E5%AD%97%E3%80%81%E8%8B%B1%E6%96%87%E5%AD%97%E6%AF%8D%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2.html","title":"golang面试题：翻转含有中文、数字、英文字母的字符串","lang":"zh-CN","frontmatter":{"title":"golang面试题：翻转含有中文、数字、英文字母的字符串","date":"2020-05-10T22:57:55.000Z","tags":null,"categories":"golang面试题","description":" 问题 翻转含有中文、数字、英文字母的字符串 \\"你好abc啊哈哈\\" 代码实现 解释 rune关键字，从 golang 源码中看出，它是 int32 的别名（-2^31 ~ 2^31-1），比起 byte（-128 ～ 127），可表示更多的字符。 由于 rune 可表示的范围更大，所以能处理一切字符，当然也包括中文字符。在平时计算中文字符，可用 run...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E7%BF%BB%E8%BD%AC%E5%90%AB%E6%9C%89%E4%B8%AD%E6%96%87%E3%80%81%E6%95%B0%E5%AD%97%E3%80%81%E8%8B%B1%E6%96%87%E5%AD%97%E6%AF%8D%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"golang面试题：翻转含有中文、数字、英文字母的字符串"}],["meta",{"property":"og:description","content":" 问题 翻转含有中文、数字、英文字母的字符串 \\"你好abc啊哈哈\\" 代码实现 解释 rune关键字，从 golang 源码中看出，它是 int32 的别名（-2^31 ~ 2^31-1），比起 byte（-128 ～ 127），可表示更多的字符。 由于 rune 可表示的范围更大，所以能处理一切字符，当然也包括中文字符。在平时计算中文字符，可用 run..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8wNzdhMGZlOC1lZDU2LTQ5ODItYjRmNy1iNzZhMGYyYWIwNmYucG5n?x-oss-process=image/format,png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-12T13:55:00.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"golang面试题：翻转含有中文、数字、英文字母的字符串"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:published_time","content":"2020-05-10T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-12T13:55:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"golang面试题：翻转含有中文、数字、英文字母的字符串\\",\\"image\\":[\\"https://imgconvert.csdnimg.cn/aHR0cHM6Ly9pbWdrci5jbi1iai51ZmlsZW9zLmNvbS8wNzdhMGZlOC1lZDU2LTQ5ODItYjRmNy1iNzZhMGYyYWIwNmYucG5n?x-oss-process=image/format,png\\"],\\"datePublished\\":\\"2020-05-10T22:57:55.000Z\\",\\"dateModified\\":\\"2024-05-12T13:55:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E7%BF%BB%E8%BD%AC%E5%90%AB%E6%9C%89%E4%B8%AD%E6%96%87%E3%80%81%E6%95%B0%E5%AD%97%E3%80%81%E8%8B%B1%E6%96%87%E5%AD%97%E6%AF%8D%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/golang%E9%9D%A2%E8%AF%95%E9%A2%98%EF%BC%9A%E7%BF%BB%E8%BD%AC%E5%90%AB%E6%9C%89%E4%B8%AD%E6%96%87%E3%80%81%E6%95%B0%E5%AD%97%E3%80%81%E8%8B%B1%E6%96%87%E5%AD%97%E6%AF%8D%E7%9A%84%E5%AD%97%E7%AC%A6%E4%B8%B2.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"golang面试题：翻转含有中文、数字、英文字母的字符串"}],["meta",{"property":"og:description","content":" 问题 翻转含有中文、数字、英文字母的字符串 \\"你好abc啊哈哈\\" 代码实现 解释 rune关键字，从 golang 源码中看出，它是 int32 的别名（-2^31 ~ 2^31-1），比起 byte（-128 ～ 127），可表示更多的字符。 由于 rune 可表示的范围更大，所以能处理一切字符，当然也包括中文字符。在平时计算中文字符，可用 run..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-12T13:55:00.000Z"}],["meta",{"property":"article:published_time","content":"2020-05-10T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-12T13:55:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"golang面试题：翻转含有中文、数字、英文字母的字符串\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-05-10T22:57:55.000Z\\",\\"dateModified\\":\\"2024-05-12T13:55:00.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"相关文章","slug":"相关文章","link":"#相关文章","children":[]}],"git":{"createdTime":1708315540000,"updatedTime":1715522100000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":2},{"name":"xiaobai-tech","email":"948485496@qq.com","commits":1}]},"readingTime":{"minutes":1.13,"words":338},"filePathRelative":"golang/核心知识点/golang面试题：翻转含有中文、数字、英文字母的字符串.md","localizedDate":"2020年5月10日","autoDesc":true}');export{B as comp,b as data};
