import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as a,c as n,a as s}from"./app-BsHlUl9v.js";const t={},l=s(`<h1 id="_3-变量、数据类型与运算符" tabindex="-1"><a class="header-anchor" href="#_3-变量、数据类型与运算符"><span>3. 变量、数据类型与运算符</span></a></h1><p>在开始编写真正的程序之前，让我们先来认识一下 Python 中的变量、数据类型和运算符。</p><p>严格来说，不管是哪种语言，都有这类知识，这块属于通用的知识点，属于学了一门，另外一门语言的也会了。（虽然表达上可能会有些区别，但关系不大）。</p><h2 id="变量声明-给数据起名字" tabindex="-1"><a class="header-anchor" href="#变量声明-给数据起名字"><span>变量声明：给数据起名字</span></a></h2><p>首先，让我们来谈谈变量声明。变量声明就是给数据起一个名字，以便在程序中引用和使用这些数据。</p><p>比如，我们可以创建一个叫做<code>message</code>的变量，用来存储一句问候语：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>message <span class="token operator">=</span> <span class="token string">&quot;Hello, World!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样，以后我们想要使用这句问候语，只需要写<code>message</code>就行了！</p><h2 id="数据类型-数据的分类" tabindex="-1"><a class="header-anchor" href="#数据类型-数据的分类"><span>数据类型：数据的分类</span></a></h2><p>Python 中有各种各样的数据类型，每种类型都有不同的特点和用途。</p><h3 id="整数-int-和浮点数-float" tabindex="-1"><a class="header-anchor" href="#整数-int-和浮点数-float"><span>整数（int）和浮点数（float）</span></a></h3><p>整数就是没有小数部分的数字，比如 <code>5</code> 和 <code>-10</code>。而浮点数则带有小数部分，比如 <code>3.14</code> 和 <code>-2.7</code>。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>my_integer <span class="token operator">=</span> <span class="token number">5</span>
my_float <span class="token operator">=</span> <span class="token number">3.14</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字符串-str" tabindex="-1"><a class="header-anchor" href="#字符串-str"><span>字符串（str）</span></a></h3><p>字符串是一串文本，可以是字母、数字、符号等组成的序列。你可以用单引号或双引号括起来，比如 <code>&quot;Hello&quot;</code> 或者 <code>&#39;Python&#39;</code>。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>my_string <span class="token operator">=</span> <span class="token string">&quot;Hello, Python!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="布尔值-bool" tabindex="-1"><a class="header-anchor" href="#布尔值-bool"><span>布尔值（bool）</span></a></h3><p>布尔值只有两个取值，<code>True</code> 和 <code>False</code>，用来表示逻辑上的真和假。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>my_bool <span class="token operator">=</span> <span class="token boolean">True</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="运算符-做一些数学和逻辑运算" tabindex="-1"><a class="header-anchor" href="#运算符-做一些数学和逻辑运算"><span>运算符：做一些数学和逻辑运算</span></a></h2><p>运算符就像是数学的符号，可以进行各种计算。</p><h3 id="算术运算符" tabindex="-1"><a class="header-anchor" href="#算术运算符"><span>算术运算符</span></a></h3><p>这些运算符用于数学计算：</p><ul><li><code>+</code> 加法</li><li><code>-</code> 减法</li><li><code>*</code> 乘法</li><li><code>/</code> 除法</li><li><code>**</code> 指数（比如 <code>2**3</code> 表示 2 的 3 次方）</li></ul><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>result <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">+</span> <span class="token number">5</span>  <span class="token comment"># 结果是 15</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="比较运算符" tabindex="-1"><a class="header-anchor" href="#比较运算符"><span>比较运算符</span></a></h3><p>这些运算符用于比较两个值：</p><ul><li><code>==</code> 等于</li><li><code>!=</code> 不等于</li><li><code>&lt;</code> 小于</li><li><code>&gt;</code> 大于</li><li><code>&lt;=</code> 小于等于</li><li><code>&gt;=</code> 大于等于</li></ul><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>is_equal <span class="token operator">=</span> <span class="token number">10</span> <span class="token operator">==</span> <span class="token number">5</span>  <span class="token comment"># 结果是 False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="逻辑运算符" tabindex="-1"><a class="header-anchor" href="#逻辑运算符"><span>逻辑运算符</span></a></h3><p>这些运算符用于组合多个条件：</p><ul><li><code>and</code> 与，同时满足条件</li><li><code>or</code> 或，满足其中一个条件</li><li><code>not</code> 非，取反</li></ul><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>check1 <span class="token operator">=</span> <span class="token boolean">True</span>
check2 <span class="token operator">=</span> <span class="token boolean">False</span>

result <span class="token operator">=</span> check1 <span class="token keyword">and</span> check2  <span class="token comment"># 结果是 False</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="小结与实例" tabindex="-1"><a class="header-anchor" href="#小结与实例"><span>小结与实例</span></a></h2><p>现在让我们来用这些知识做一个小实例，比如我们要计算一个矩形的面积：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 定义矩形的长和宽</span>
length <span class="token operator">=</span> <span class="token number">5</span>
width <span class="token operator">=</span> <span class="token number">3</span>

<span class="token comment"># 计算面积</span>
area <span class="token operator">=</span> length <span class="token operator">*</span> width

<span class="token comment"># 打印结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;矩形的面积是:&quot;</span><span class="token punctuation">,</span> area<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>你可以看到，我们定义了两个变量 <code>length</code> 和 <code>width</code>，然后用它们进行了乘法运算，最后打印出了结果。这就是变量声明、数据类型和运算符的一个小实例。</p><p>这是你踏上 Python 编程旅程的第一步，加油！如果你有任何问题，随时问我哦！</p>`,38),o=[l];function i(d,c){return a(),n("div",null,o)}const h=e(t,[["render",i],["__file","3. 变量、数据类型与运算符.html.vue"]]),u=JSON.parse('{"path":"/golang/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/3.%20%E5%8F%98%E9%87%8F%E3%80%81%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%8E%E8%BF%90%E7%AE%97%E7%AC%A6.html","title":"3. 变量、数据类型与运算符","lang":"zh-CN","frontmatter":{"description":"3. 变量、数据类型与运算符 在开始编写真正的程序之前，让我们先来认识一下 Python 中的变量、数据类型和运算符。 严格来说，不管是哪种语言，都有这类知识，这块属于通用的知识点，属于学了一门，另外一门语言的也会了。（虽然表达上可能会有些区别，但关系不大）。 变量声明：给数据起名字 首先，让我们来谈谈变量声明。变量声明就是给数据起一个名字，以便在程序...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/golang/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/3.%20%E5%8F%98%E9%87%8F%E3%80%81%E6%95%B0%E6%8D%AE%E7%B1%BB%E5%9E%8B%E4%B8%8E%E8%BF%90%E7%AE%97%E7%AC%A6.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"3. 变量、数据类型与运算符"}],["meta",{"property":"og:description","content":"3. 变量、数据类型与运算符 在开始编写真正的程序之前，让我们先来认识一下 Python 中的变量、数据类型和运算符。 严格来说，不管是哪种语言，都有这类知识，这块属于通用的知识点，属于学了一门，另外一门语言的也会了。（虽然表达上可能会有些区别，但关系不大）。 变量声明：给数据起名字 首先，让我们来谈谈变量声明。变量声明就是给数据起一个名字，以便在程序..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-12T10:05:49.000Z"}],["meta",{"property":"article:author","content":"Golang全栈程序员"}],["meta",{"property":"article:modified_time","content":"2024-02-12T10:05:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"3. 变量、数据类型与运算符\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-12T10:05:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Golang全栈程序员\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"变量声明：给数据起名字","slug":"变量声明-给数据起名字","link":"#变量声明-给数据起名字","children":[]},{"level":2,"title":"数据类型：数据的分类","slug":"数据类型-数据的分类","link":"#数据类型-数据的分类","children":[{"level":3,"title":"整数（int）和浮点数（float）","slug":"整数-int-和浮点数-float","link":"#整数-int-和浮点数-float","children":[]},{"level":3,"title":"字符串（str）","slug":"字符串-str","link":"#字符串-str","children":[]},{"level":3,"title":"布尔值（bool）","slug":"布尔值-bool","link":"#布尔值-bool","children":[]}]},{"level":2,"title":"运算符：做一些数学和逻辑运算","slug":"运算符-做一些数学和逻辑运算","link":"#运算符-做一些数学和逻辑运算","children":[{"level":3,"title":"算术运算符","slug":"算术运算符","link":"#算术运算符","children":[]},{"level":3,"title":"比较运算符","slug":"比较运算符","link":"#比较运算符","children":[]},{"level":3,"title":"逻辑运算符","slug":"逻辑运算符","link":"#逻辑运算符","children":[]}]},{"level":2,"title":"小结与实例","slug":"小结与实例","link":"#小结与实例","children":[]}],"git":{"createdTime":1707732349000,"updatedTime":1707732349000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":2.33,"words":699},"filePathRelative":"golang/第1章：Python 基础知识/3. 变量、数据类型与运算符.md","localizedDate":"2024年2月12日","autoDesc":true}');export{h as comp,u as data};
