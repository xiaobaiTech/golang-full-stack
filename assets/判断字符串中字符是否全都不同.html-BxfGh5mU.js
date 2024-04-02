import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as a,c as s,a as e,b as n,d as i,e as d}from"./app-CVBBBkvE.js";const o={},c=d(`<h1 id="判断字符串中字符是否全都不同" tabindex="-1"><a class="header-anchor" href="#判断字符串中字符是否全都不同"><span>判断字符串中字符是否全都不同</span></a></h1><p><strong>问题描述</strong></p><p>请实现一个算法，确定一个字符串的所有字符【是否全都不同】。这里我们要求【不允许使用额外的存储结构】。<br> 给定一个string，请返回一个bool值,true代表所有字符全都不同，false代表存在相同的字符。<br> 保证字符串中的字符为【ASCII字符】。字符串的长度小于等于【3000】。</p><p><strong>解题思路</strong></p><p>这里有几个重点，第一个是<code>ASCII字符</code>，<code>ASCII字符</code>字符一共有256个，其中128个是常用字符，可以在键盘上输入。128之后的是键盘上无法找到的。</p><p>然后是全部不同，也就是字符串中的字符没有重复的，再次，不准使用额外的储存结构，且字符串小于等于3000。</p><p>如果允许其他额外储存结构，这个题目很好做。如果不允许的话，可以使用golang内置的方式实现。</p><p><strong>源码参考</strong></p><p>通过<code>strings.Count</code> 函数判断：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>func isUniqueString(s string) bool {
	if strings.Count(s,&quot;&quot;) &gt; 3000{
		return  false
	}
	for _,v := range s {
		if v &gt; 127 {
			return false
		}
		if strings.Count(s,string(v)) &gt; 1 {
			return false
		}
	}
	return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过<code>strings.Index</code>和<code>strings.LastIndex</code>函数判断：</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>func isUniqueString2(s string) bool {
	if strings.Count(s,&quot;&quot;) &gt; 3000{
		return  false
	}
	for k,v := range s {
		if v &gt; 127 {
			return false
		}
		if strings.Index(s,string(v)) != k {
			return false
		}
	}
	return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过位运算判断</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>func isUniqString3(s string) bool {
	if len(s) == 0 || len(s) &gt; 3000 {
		return false
	}
	// 256 个字符 256 = 64 + 64 + 64 + 64
	var mark1, mark2, mark3, mark4 uint64
	var mark *uint64
	for _, r := range s {
		n := uint64(r)
		if n &lt; 64 {
			mark = &amp;mark1
		} else if n &lt; 128 {
			mark = &amp;mark2
			n -= 64
		} else if n &lt; 192 {
			mark = &amp;mark3
			n -= 128
		} else {
			mark = &amp;mark4
			n -= 192
		}
		if (*mark)&amp;(1&lt;&lt;n) != 0 {
			return false
		}
		*mark = (*mark) | uint64(1&lt;&lt;n)
	}
	return true
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>以上三种方法都可以实现这个算法。</p><p>第一个方法使用的是golang内置方法<code>strings.Count</code>,可以用来判断在一个字符串中包含的另外一个字符串的数量。</p><p>第二个方法使用的是golang内置方法<code>strings.Index</code>和<code>strings.LastIndex</code>，用来判断指定字符串在另外一个字符串的索引未知，分别是第一次发现位置和最后发现位置。</p><p>第三个方法使用的是位运算来判断是否重复，时间复杂度为o(n)，相比前两个方法时间复杂度低</p><h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章"><span>相关文章</span></a></h2>`,20),m={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html",target:"_blank",rel:"noopener noreferrer"},u={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html",target:"_blank",rel:"noopener noreferrer"},g={href:"https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html",target:"_blank",rel:"noopener noreferrer"};function p(E,b){const t=l("ExternalLinkIcon");return a(),s("div",null,[c,e("ul",null,[e("li",null,[e("p",null,[e("a",m,[n("golang进阶面试题八股文合集"),i(t)])])]),e("li",null,[e("p",null,[e("a",u,[n("golang基础面试题八股文合集"),i(t)])])]),e("li",null,[e("p",null,[e("a",g,[n("golang常用标准库第三方库大全"),i(t)])])]),e("li",null,[e("p",null,[e("a",v,[n("golang学习路线"),i(t)])])])])])}const f=r(o,[["render",p],["__file","判断字符串中字符是否全都不同.html.vue"]]),_=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%88%A4%E6%96%AD%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E5%AD%97%E7%AC%A6%E6%98%AF%E5%90%A6%E5%85%A8%E9%83%BD%E4%B8%8D%E5%90%8C.html","title":"判断字符串中字符是否全都不同","lang":"zh-CN","frontmatter":{"description":"判断字符串中字符是否全都不同 问题描述 请实现一个算法，确定一个字符串的所有字符【是否全都不同】。这里我们要求【不允许使用额外的存储结构】。 给定一个string，请返回一个bool值,true代表所有字符全都不同，false代表存在相同的字符。 保证字符串中的字符为【ASCII字符】。字符串的长度小于等于【3000】。 解题思路 这里有几个重点，第一...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%88%A4%E6%96%AD%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E5%AD%97%E7%AC%A6%E6%98%AF%E5%90%A6%E5%85%A8%E9%83%BD%E4%B8%8D%E5%90%8C.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"判断字符串中字符是否全都不同"}],["meta",{"property":"og:description","content":"判断字符串中字符是否全都不同 问题描述 请实现一个算法，确定一个字符串的所有字符【是否全都不同】。这里我们要求【不允许使用额外的存储结构】。 给定一个string，请返回一个bool值,true代表所有字符全都不同，false代表存在相同的字符。 保证字符串中的字符为【ASCII字符】。字符串的长度小于等于【3000】。 解题思路 这里有几个重点，第一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-16T02:56:05.000Z"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-03-16T02:56:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"判断字符串中字符是否全都不同\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-16T02:56:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%88%A4%E6%96%AD%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E5%AD%97%E7%AC%A6%E6%98%AF%E5%90%A6%E5%85%A8%E9%83%BD%E4%B8%8D%E5%90%8C.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E5%88%A4%E6%96%AD%E5%AD%97%E7%AC%A6%E4%B8%B2%E4%B8%AD%E5%AD%97%E7%AC%A6%E6%98%AF%E5%90%A6%E5%85%A8%E9%83%BD%E4%B8%8D%E5%90%8C.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"判断字符串中字符是否全都不同"}],["meta",{"property":"og:description","content":"判断字符串中字符是否全都不同 问题描述 请实现一个算法，确定一个字符串的所有字符【是否全都不同】。这里我们要求【不允许使用额外的存储结构】。 给定一个string，请返回一个bool值,true代表所有字符全都不同，false代表存在相同的字符。 保证字符串中的字符为【ASCII字符】。字符串的长度小于等于【3000】。 解题思路 这里有几个重点，第一..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-16T02:56:05.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-16T02:56:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"判断字符串中字符是否全都不同\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-16T02:56:05.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"相关文章","slug":"相关文章","link":"#相关文章","children":[]}],"git":{"createdTime":1710132137000,"updatedTime":1710557765000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":2}]},"readingTime":{"minutes":2.31,"words":692},"filePathRelative":"golang/核心知识点/判断字符串中字符是否全都不同.md","localizedDate":"2024年3月11日","autoDesc":true}');export{f as comp,_ as data};
