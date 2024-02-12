import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,a as e}from"./app-BsHlUl9v.js";const t={},p=e(`<h1 id="_5-函数与模块" tabindex="-1"><a class="header-anchor" href="#_5-函数与模块"><span>5. 函数与模块</span></a></h1><p>在这一节里，我们将深入了解函数和模块，并对它们进行一些扩展讲解。</p><h2 id="函数-让代码更有逻辑" tabindex="-1"><a class="header-anchor" href="#函数-让代码更有逻辑"><span>函数：让代码更有逻辑</span></a></h2><p>函数是编程中不可或缺的一部分。它们像是小工厂，接收一些输入（参数），进行一些操作，然后返回一个结果。</p><p>简单来说，函数就是一段处理逻辑，你给它一些信息，它会给你一个处理后的结果。</p><p>例如，我们写了一个计算两个数字和的函数：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">add_numbers</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    result <span class="token operator">=</span> a <span class="token operator">+</span> b
    <span class="token keyword">return</span> result
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>add_numbers</code> 是我们定义的函数名，<code>a</code> 和 <code>b</code> 是传入的参数。函数内部执行了一个加法操作，并将结果返回。</p><h3 id="函数变量" tabindex="-1"><a class="header-anchor" href="#函数变量"><span>函数变量</span></a></h3><p>函数变量指的是将函数本身赋值给一个变量，比如：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">greet</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span><span class="token punctuation">:</span>
    message <span class="token operator">=</span> <span class="token string">&quot;Hello, &quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;!&quot;</span>
    <span class="token keyword">return</span> message
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，<code>greet</code> 是一个函数，我们将它赋值给了变量 <code>say_hello</code>：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>say_hello <span class="token operator">=</span> greet
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>现在，<code>say_hello</code> 和 <code>greet</code> 具有相同的功能。</p><h2 id="模块-代码的组织者" tabindex="-1"><a class="header-anchor" href="#模块-代码的组织者"><span>模块：代码的组织者</span></a></h2><p>模块是一组相关的函数和变量的集合，它们被放在一个独立的文件中，以便于组织和重复使用。</p><p>比如，我们可以把之前写的 <code>add_numbers</code> 函数放在一个叫做 <code>calculator.py</code> 的文件中，然后在其他地方通过导入这个模块来使用这个函数。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 在其他文件中使用</span>
<span class="token keyword">import</span> calculator

result <span class="token operator">=</span> calculator<span class="token punctuation">.</span>add_numbers<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>  <span class="token comment"># 这里会输出 5</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="特殊情况-导入函数名" tabindex="-1"><a class="header-anchor" href="#特殊情况-导入函数名"><span>特殊情况：导入函数名</span></a></h3><p>有时候我们只需要导入模块中的一个函数，而不是全部函数。可以使用以下方式：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">from</span> calculator <span class="token keyword">import</span> add_numbers
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h3 id="函数冲突" tabindex="-1"><a class="header-anchor" href="#函数冲突"><span>函数冲突</span></a></h3><p>如果在同一个文件中定义了两个同名函数，后面的函数会覆盖前面的函数。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Hello, World!&quot;</span>

<span class="token keyword">def</span> <span class="token function">greet</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> <span class="token string">&quot;Bonjour!&quot;</span>

result <span class="token operator">=</span> greet<span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span>  <span class="token comment"># 输出 &quot;Bonjour!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="处理模块内函数冲突" tabindex="-1"><a class="header-anchor" href="#处理模块内函数冲突"><span>处理模块内函数冲突</span></a></h3><p>如果导入了两个模块，它们内部有同名函数，Python 将会以最后导入的模块函数为准。</p><h4 id="示例" tabindex="-1"><a class="header-anchor" href="#示例"><span>示例：</span></a></h4><p>假设有两个模块 <code>module1.py</code> 和 <code>module2.py</code>，它们都定义了同名函数 <code>add_numbers</code>：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># module1.py</span>

<span class="token keyword">def</span> <span class="token function">add_numbers</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># module2.py</span>

<span class="token keyword">def</span> <span class="token function">add_numbers</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> a <span class="token operator">*</span> b
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果你在另一个文件中导入了这两个模块：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">from</span> module1 <span class="token keyword">import</span> add_numbers <span class="token keyword">as</span> add1
<span class="token keyword">from</span> module2 <span class="token keyword">import</span> add_numbers <span class="token keyword">as</span> add2

result1 <span class="token operator">=</span> add1<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
result2 <span class="token operator">=</span> add2<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>result1<span class="token punctuation">)</span>  <span class="token comment"># 输出 5</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>result2<span class="token punctuation">)</span>  <span class="token comment"># 输出 6</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们通过别名来区分了两个同名函数。<code>from module1 import add_numbers as add1</code> 表示从 <code>module1</code> 中导入 <code>add_numbers</code> 并将其别名设为 <code>add1</code>，同理，<code>from module2 import add_numbers as add2</code>。</p><p>这样，你就可以在同一程序中使用两个模块中的同名函数了。</p><h2 id="实战例子-制作一个简单的计算器" tabindex="-1"><a class="header-anchor" href="#实战例子-制作一个简单的计算器"><span>实战例子：制作一个简单的计算器</span></a></h2><p>让我们来动手实践一下！我们将制作一个简单的计算器，可以进行加减乘除操作。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># calculator.py</span>

<span class="token keyword">def</span> <span class="token function">add</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b

<span class="token keyword">def</span> <span class="token function">subtract</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> a <span class="token operator">-</span> b

<span class="token keyword">def</span> <span class="token function">multiply</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">return</span> a <span class="token operator">*</span> b

<span class="token keyword">def</span> <span class="token function">divide</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">if</span> b <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> a <span class="token operator">/</span> b
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> <span class="token string">&quot;Error: Division by zero!&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># main.py</span>

<span class="token keyword">import</span> calculator

result_add <span class="token operator">=</span> calculator<span class="token punctuation">.</span>add<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
result_subtract <span class="token operator">=</span> calculator<span class="token punctuation">.</span>subtract<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
result_multiply <span class="token operator">=</span> calculator<span class="token punctuation">.</span>multiply<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>
result_divide <span class="token operator">=</span> calculator<span class="token punctuation">.</span>divide<span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">3</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;5 + 3 =&quot;</span><span class="token punctuation">,</span> result_add<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;5 - 3 =&quot;</span><span class="token punctuation">,</span> result_subtract<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;5 * 3 =&quot;</span><span class="token punctuation">,</span> result_multiply<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;5 / 3 =&quot;</span><span class="token punctuation">,</span> result_divide<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>通过这篇文章，我们学习了如何使用函数使代码更有逻辑，以及如何使用模块来组织代码。我们还通过实战例子制作了一个简单的计算器，巩固了所学知识。</p><p>希望你现在对函数和模块有了更清晰的理解。继续加油，你已经迈出了成为 Python 大师的第一步！</p>`,41),o=[p];function l(c,i){return s(),a("div",null,o)}const r=n(t,[["render",l],["__file","5. 函数与模块.html.vue"]]),k=JSON.parse('{"path":"/python/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/5.%20%E5%87%BD%E6%95%B0%E4%B8%8E%E6%A8%A1%E5%9D%97.html","title":"5. 函数与模块","lang":"zh-CN","frontmatter":{"description":"5. 函数与模块 在这一节里，我们将深入了解函数和模块，并对它们进行一些扩展讲解。 函数：让代码更有逻辑 函数是编程中不可或缺的一部分。它们像是小工厂，接收一些输入（参数），进行一些操作，然后返回一个结果。 简单来说，函数就是一段处理逻辑，你给它一些信息，它会给你一个处理后的结果。 例如，我们写了一个计算两个数字和的函数： 在这个例子中，add_num...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/python/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/5.%20%E5%87%BD%E6%95%B0%E4%B8%8E%E6%A8%A1%E5%9D%97.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"5. 函数与模块"}],["meta",{"property":"og:description","content":"5. 函数与模块 在这一节里，我们将深入了解函数和模块，并对它们进行一些扩展讲解。 函数：让代码更有逻辑 函数是编程中不可或缺的一部分。它们像是小工厂，接收一些输入（参数），进行一些操作，然后返回一个结果。 简单来说，函数就是一段处理逻辑，你给它一些信息，它会给你一个处理后的结果。 例如，我们写了一个计算两个数字和的函数： 在这个例子中，add_num..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-05T08:45:30.000Z"}],["meta",{"property":"article:author","content":"Golang全栈程序员"}],["meta",{"property":"article:modified_time","content":"2023-10-05T08:45:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"5. 函数与模块\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-05T08:45:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Golang全栈程序员\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"函数：让代码更有逻辑","slug":"函数-让代码更有逻辑","link":"#函数-让代码更有逻辑","children":[{"level":3,"title":"函数变量","slug":"函数变量","link":"#函数变量","children":[]}]},{"level":2,"title":"模块：代码的组织者","slug":"模块-代码的组织者","link":"#模块-代码的组织者","children":[{"level":3,"title":"特殊情况：导入函数名","slug":"特殊情况-导入函数名","link":"#特殊情况-导入函数名","children":[]},{"level":3,"title":"函数冲突","slug":"函数冲突","link":"#函数冲突","children":[]},{"level":3,"title":"处理模块内函数冲突","slug":"处理模块内函数冲突","link":"#处理模块内函数冲突","children":[]}]},{"level":2,"title":"实战例子：制作一个简单的计算器","slug":"实战例子-制作一个简单的计算器","link":"#实战例子-制作一个简单的计算器","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1696495530000,"updatedTime":1696495530000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":3.06,"words":917},"filePathRelative":"python/第1章：Python 基础知识/5. 函数与模块.md","localizedDate":"2023年10月5日","autoDesc":true}');export{r as comp,k as data};
