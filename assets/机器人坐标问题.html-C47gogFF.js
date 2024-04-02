import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as l,o as s,c as r,a as e,b as n,d as i,e as o}from"./app-CAiDvdpy.js";const d={},c=o(`<h1 id="机器人坐标问题" tabindex="-1"><a class="header-anchor" href="#机器人坐标问题"><span>机器人坐标问题</span></a></h1><p><strong>问题描述</strong></p><p>有一个机器人，给一串指令，L左转 R右转，F前进一步，B后退一步，问最后机器人的坐标，最开始，机器人位于 0 0，方向为正Y。<br> 可以输入重复指令n ： 比如 R2(LF) 这个等于指令 RLFLF。<br> 问最后机器人的坐标是多少？</p><p><strong>解题思路</strong></p><p>这里的一个难点是解析重复指令。主要指令解析成功，计算坐标就简单了。</p><p><strong>源码参考</strong></p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>package main

import (
	&quot;unicode&quot;
)

const (
	Left = iota
	Top
	Right
	Bottom
)

func main() {
	println(move(&quot;R2(LF)&quot;, 0, 0, Top))
}

func move(cmd string, x0 int, y0 int, z0 int) (x, y, z int) {
	x, y, z = x0, y0, z0
	repeat := 0
	repeatCmd := &quot;&quot;
	for _, s := range cmd {
		switch {
		case unicode.IsNumber(s):
			repeat = repeat*10 + (int(s) - &#39;0&#39;)
		case s == &#39;)&#39;:
			for i := 0; i &lt; repeat; i++ {
				x, y, z = move(repeatCmd, x, y, z)
			}
			repeat = 0
			repeatCmd = &quot;&quot;
		case repeat &gt; 0 &amp;&amp; s != &#39;(&#39; &amp;&amp; s != &#39;)&#39;:
			repeatCmd = repeatCmd + string(s)
		case s == &#39;L&#39;:
			z = (z + 1) % 4
		case s == &#39;R&#39;:
			z = (z - 1 + 4) % 4
		case s == &#39;F&#39;:
			switch {
			case z == Left || z == Right:
				x = x - z + 1
			case z == Top || z == Bottom:
				y = y - z + 2
			}
		case s == &#39;B&#39;:
			switch {
			case z == Left || z == Right:
				x = x + z - 1
			case z == Top || z == Bottom:
				y = y + z - 2
			}
		}
	}
	return
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>这里使用三个值表示机器人当前的状况，分别是：x表示x坐标，y表示y坐标，z表示当前方向。<br> L、R 命令会改变值z，F、B命令会改变值x、y。<br> 值x、y的改变还受当前的z值影响。</p><p>如果是重复指令，那么将重复次数和重复的指令存起来递归调用即可。</p><h2 id="相关文章" tabindex="-1"><a class="header-anchor" href="#相关文章"><span>相关文章</span></a></h2>`,11),m={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/2.Go%E8%BF%9B%E9%98%B6.html",target:"_blank",rel:"noopener noreferrer"},p={href:"https://golangguide.top/golang/%E9%9D%A2%E8%AF%95%E9%A2%98/1.Go%E5%85%A5%E9%97%A8.html",target:"_blank",rel:"noopener noreferrer"},v={href:"https://golangguide.top/golang/%E5%B8%B8%E7%94%A8%E5%8C%85%E5%A4%A7%E5%85%A8.html",target:"_blank",rel:"noopener noreferrer"},u={href:"https://golangguide.top/golang/%E5%AD%A6%E4%B9%A0%E8%B7%AF%E7%BA%BF.html",target:"_blank",rel:"noopener noreferrer"};function g(b,E){const t=l("ExternalLinkIcon");return s(),r("div",null,[c,e("ul",null,[e("li",null,[e("p",null,[e("a",m,[n("golang进阶面试题八股文合集"),i(t)])])]),e("li",null,[e("p",null,[e("a",p,[n("golang基础面试题八股文合集"),i(t)])])]),e("li",null,[e("p",null,[e("a",v,[n("golang常用标准库第三方库大全"),i(t)])])]),e("li",null,[e("p",null,[e("a",u,[n("golang学习路线"),i(t)])])])])])}const B=a(d,[["render",g],["__file","机器人坐标问题.html.vue"]]),_=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%9C%BA%E5%99%A8%E4%BA%BA%E5%9D%90%E6%A0%87%E9%97%AE%E9%A2%98.html","title":"机器人坐标问题","lang":"zh-CN","frontmatter":{"description":"机器人坐标问题 问题描述 有一个机器人，给一串指令，L左转 R右转，F前进一步，B后退一步，问最后机器人的坐标，最开始，机器人位于 0 0，方向为正Y。 可以输入重复指令n ： 比如 R2(LF) 这个等于指令 RLFLF。 问最后机器人的坐标是多少？ 解题思路 这里的一个难点是解析重复指令。主要指令解析成功，计算坐标就简单了。 源码参考 源码解析 这...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%9C%BA%E5%99%A8%E4%BA%BA%E5%9D%90%E6%A0%87%E9%97%AE%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"机器人坐标问题"}],["meta",{"property":"og:description","content":"机器人坐标问题 问题描述 有一个机器人，给一串指令，L左转 R右转，F前进一步，B后退一步，问最后机器人的坐标，最开始，机器人位于 0 0，方向为正Y。 可以输入重复指令n ： 比如 R2(LF) 这个等于指令 RLFLF。 问最后机器人的坐标是多少？ 解题思路 这里的一个难点是解析重复指令。主要指令解析成功，计算坐标就简单了。 源码参考 源码解析 这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-16T02:56:05.000Z"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-03-16T02:56:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"机器人坐标问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-16T02:56:05.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%9C%BA%E5%99%A8%E4%BA%BA%E5%9D%90%E6%A0%87%E9%97%AE%E9%A2%98.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E6%9C%BA%E5%99%A8%E4%BA%BA%E5%9D%90%E6%A0%87%E9%97%AE%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"机器人坐标问题"}],["meta",{"property":"og:description","content":"机器人坐标问题 问题描述 有一个机器人，给一串指令，L左转 R右转，F前进一步，B后退一步，问最后机器人的坐标，最开始，机器人位于 0 0，方向为正Y。 可以输入重复指令n ： 比如 R2(LF) 这个等于指令 RLFLF。 问最后机器人的坐标是多少？ 解题思路 这里的一个难点是解析重复指令。主要指令解析成功，计算坐标就简单了。 源码参考 源码解析 这..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-16T02:56:05.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-16T02:56:05.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"机器人坐标问题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-16T02:56:05.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"相关文章","slug":"相关文章","link":"#相关文章","children":[]}],"git":{"createdTime":1710132137000,"updatedTime":1710557765000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":2}]},"readingTime":{"minutes":1.64,"words":491},"filePathRelative":"golang/核心知识点/机器人坐标问题.md","localizedDate":"2024年3月11日","autoDesc":true}');export{B as comp,_ as data};
