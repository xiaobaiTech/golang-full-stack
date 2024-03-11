import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-DWfSWoLm.js";const e={},p=t(`<h1 id="交替打印数字和字母" tabindex="-1"><a class="header-anchor" href="#交替打印数字和字母"><span>交替打印数字和字母</span></a></h1><p><strong>问题描述</strong></p><p>使用两个 <code>goroutine</code> 交替打印序列，一个 <code>goroutine</code> 打印数字， 另外一个 <code>goroutine</code> 打印字母， 最终效果如下：</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>12AB34CD56EF78GH910IJ1112KL1314MN1516OP1718QR1920ST2122UV2324WX2526YZ2728
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>解题思路</strong></p><p>问题很简单，使用 channel 来控制打印的进度。使用两个 channel ，来分别控制数字和字母的打印序列， 数字打印完成后通过 channel 通知字母打印, 字母打印完成后通知数字打印，然后周而复始的工作。</p><p><strong>源码参考</strong></p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>	letter<span class="token punctuation">,</span>number <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span><span class="token punctuation">,</span><span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
	wait <span class="token operator">:=</span> sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">{</span><span class="token punctuation">}</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i <span class="token operator">:=</span> <span class="token number">1</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>number<span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
				i<span class="token operator">++</span>
				fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
				i<span class="token operator">++</span>
				letter <span class="token operator">&lt;-</span> <span class="token boolean">true</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	wait<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>
	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span>wait <span class="token operator">*</span>sync<span class="token punctuation">.</span>WaitGroup<span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i <span class="token operator">:=</span> <span class="token char">&#39;A&#39;</span>
		<span class="token keyword">for</span><span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>letter<span class="token punctuation">:</span>
				<span class="token keyword">if</span> i <span class="token operator">&gt;=</span> <span class="token char">&#39;Z&#39;</span> <span class="token punctuation">{</span>
					wait<span class="token punctuation">.</span><span class="token function">Done</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
					<span class="token keyword">return</span>
				<span class="token punctuation">}</span>

				fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
				i<span class="token operator">++</span>
				fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span><span class="token punctuation">)</span>
				i<span class="token operator">++</span>
				number <span class="token operator">&lt;-</span> <span class="token boolean">true</span>
			<span class="token punctuation">}</span>

		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>wait<span class="token punctuation">)</span>
	number<span class="token operator">&lt;-</span><span class="token boolean">true</span>
	wait<span class="token punctuation">.</span><span class="token function">Wait</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>源码解析</strong></p><p>这里用到了两个<code>channel</code>负责通知，letter负责通知打印字母的goroutine来打印字母，number用来通知打印数字的goroutine打印数字。wait用来等待字母打印完成后退出循环。</p><p>也可以分别使用三个 channel 来控制数字，字母以及终止信号的输入.</p><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>
<span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	number <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
	letter <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>
	done <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">bool</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		i <span class="token operator">:=</span> <span class="token number">1</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>number<span class="token punctuation">:</span>
				fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
				i<span class="token operator">++</span>
				fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
				i<span class="token operator">++</span>
				letter <span class="token operator">&lt;-</span> <span class="token boolean">true</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token keyword">go</span> <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		j <span class="token operator">:=</span> <span class="token char">&#39;A&#39;</span>
		<span class="token keyword">for</span> <span class="token punctuation">{</span>
			<span class="token keyword">select</span> <span class="token punctuation">{</span>
			<span class="token keyword">case</span> <span class="token operator">&lt;-</span>letter<span class="token punctuation">:</span>
				<span class="token keyword">if</span> j <span class="token operator">&gt;=</span> <span class="token char">&#39;Z&#39;</span> <span class="token punctuation">{</span>
					done <span class="token operator">&lt;-</span> <span class="token boolean">true</span>
				<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
					fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span>
					j<span class="token operator">++</span>
					fmt<span class="token punctuation">.</span><span class="token function">Print</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>j<span class="token punctuation">)</span><span class="token punctuation">)</span>
					j<span class="token operator">++</span>
					number <span class="token operator">&lt;-</span> <span class="token boolean">true</span>
				<span class="token punctuation">}</span>
			<span class="token punctuation">}</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	number <span class="token operator">&lt;-</span> <span class="token boolean">true</span>

	<span class="token keyword">for</span> <span class="token punctuation">{</span>
		<span class="token keyword">select</span> <span class="token punctuation">{</span>
		<span class="token keyword">case</span> <span class="token operator">&lt;-</span>done<span class="token punctuation">:</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12),o=[p];function c(i,l){return s(),a("div",null,o)}const d=n(e,[["render",c],["__file","交替打印数字和字母.html.vue"]]),k=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E4%BA%A4%E6%9B%BF%E6%89%93%E5%8D%B0%E6%95%B0%E5%AD%97%E5%92%8C%E5%AD%97%E6%AF%8D.html","title":"交替打印数字和字母","lang":"zh-CN","frontmatter":{"description":"交替打印数字和字母 问题描述 使用两个 goroutine 交替打印序列，一个 goroutine 打印数字， 另外一个 goroutine 打印字母， 最终效果如下： 解题思路 问题很简单，使用 channel 来控制打印的进度。使用两个 channel ，来分别控制数字和字母的打印序列， 数字打印完成后通过 channel 通知字母打印, 字母打印...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E4%BA%A4%E6%9B%BF%E6%89%93%E5%8D%B0%E6%95%B0%E5%AD%97%E5%92%8C%E5%AD%97%E6%AF%8D.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"交替打印数字和字母"}],["meta",{"property":"og:description","content":"交替打印数字和字母 问题描述 使用两个 goroutine 交替打印序列，一个 goroutine 打印数字， 另外一个 goroutine 打印字母， 最终效果如下： 解题思路 问题很简单，使用 channel 来控制打印的进度。使用两个 channel ，来分别控制数字和字母的打印序列， 数字打印完成后通过 channel 通知字母打印, 字母打印..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-11T04:42:17.000Z"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-03-11T04:42:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"交替打印数字和字母\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-11T04:42:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E4%BA%A4%E6%9B%BF%E6%89%93%E5%8D%B0%E6%95%B0%E5%AD%97%E5%92%8C%E5%AD%97%E6%AF%8D.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E4%BA%A4%E6%9B%BF%E6%89%93%E5%8D%B0%E6%95%B0%E5%AD%97%E5%92%8C%E5%AD%97%E6%AF%8D.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"交替打印数字和字母"}],["meta",{"property":"og:description","content":"交替打印数字和字母 问题描述 使用两个 goroutine 交替打印序列，一个 goroutine 打印数字， 另外一个 goroutine 打印字母， 最终效果如下： 解题思路 问题很简单，使用 channel 来控制打印的进度。使用两个 channel ，来分别控制数字和字母的打印序列， 数字打印完成后通过 channel 通知字母打印, 字母打印..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-11T04:42:17.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-11T04:42:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"交替打印数字和字母\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-11T04:42:17.000Z\\",\\"author\\":[]}"]]},"headers":[],"git":{"createdTime":1710132137000,"updatedTime":1710132137000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":1.15,"words":344},"filePathRelative":"golang/核心知识点/交替打印数字和字母.md","localizedDate":"2024年3月11日","autoDesc":true}');export{d as comp,k as data};
