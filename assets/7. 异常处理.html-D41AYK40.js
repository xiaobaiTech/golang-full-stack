import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,a as t}from"./app-BsHlUl9v.js";const e={},p=t(`<h1 id="_7-异常处理" tabindex="-1"><a class="header-anchor" href="#_7-异常处理"><span>7. 异常处理</span></a></h1><p>今天我们将学习如何在程序中处理一些意想不到的情况，就好像，你在给你喜欢的女生送早餐的时候，她男朋友出现了，这属于一种<strong>异常</strong>情况，你需要办法去处理异常，以保证你跟这个女生的友谊正常，甚至天长地久。</p><p>说不下去了，哭了。</p><h2 id="什么是异常" tabindex="-1"><a class="header-anchor" href="#什么是异常"><span>什么是异常？</span></a></h2><p>首先，让我们聊聊什么是异常。在编程中，异常就像是程序遇到的一些突发情况，比如你要读取一个文件，但文件突然不存在了。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 举个例子，假设你要打开一个文件</span>
<span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;non_existent_file.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;r&quot;</span><span class="token punctuation">)</span>  <span class="token comment"># 这里会产生一个FileNotFoundError异常</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码会产生一个 <code>FileNotFoundError</code> 异常，因为文件不存在。异常会打断程序的正常执行。</p><h2 id="不处理异常-程序崩溃" tabindex="-1"><a class="header-anchor" href="#不处理异常-程序崩溃"><span>不处理异常：程序崩溃</span></a></h2><p>如果我们不对异常进行处理，程序就会崩溃。就像下面这样：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&quot;non_existent_file.txt&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;r&quot;</span><span class="token punctuation">)</span>
Traceback <span class="token punctuation">(</span>most recent call last<span class="token punctuation">)</span><span class="token punctuation">:</span>
  File <span class="token string">&quot;&lt;stdin&gt;&quot;</span><span class="token punctuation">,</span> line <span class="token number">1</span><span class="token punctuation">,</span> <span class="token keyword">in</span> <span class="token operator">&lt;</span>module<span class="token operator">&gt;</span>
FileNotFoundError<span class="token punctuation">:</span> <span class="token punctuation">[</span>Errno <span class="token number">2</span><span class="token punctuation">]</span> No such <span class="token builtin">file</span> <span class="token keyword">or</span> directory<span class="token punctuation">:</span> <span class="token string">&#39;non_existent_file.txt&#39;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这种情况显然是我们不希望看到的。为了避免程序崩溃，我们需要学会如何处理异常。</p><h2 id="捕获异常-让程序保持优雅" tabindex="-1"><a class="header-anchor" href="#捕获异常-让程序保持优雅"><span>捕获异常：让程序保持优雅</span></a></h2><p>有时候，我们可以预见到某些情况可能会引发异常。比如说，当我们尝试将一个字符串转换为数字时，如果字符串不是一个合法的数字，就会产生一个异常。</p><p>这时候，我们可以使用 <code>try</code> 和 <code>except</code> 关键字来捕获异常，让程序继续执行下去，而不会崩溃。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    num <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入一个数字: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;你输入的数字是:&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>
<span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;这不是一个有效的数字！&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们尝试将用户输入的内容转换为数字。如果用户输入的不是一个合法的数字，就会引发一个 <code>ValueError</code> 异常，然后程序会执行 <code>except</code> 块中的代码。</p><h2 id="多重异常-针对不同情况做出不同处理" tabindex="-1"><a class="header-anchor" href="#多重异常-针对不同情况做出不同处理"><span>多重异常：针对不同情况做出不同处理</span></a></h2><p>有时候，我们可能会遇到多种不同类型的异常，而我们希望针对不同类型的异常做出不同的处理。这时候，我们可以使用多个 <code>except</code> 块。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    num <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入一个数字: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;你输入的数字是:&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>
<span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;这不是一个有效的数字！&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> ZeroDivisionError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;除数不能为零！&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们同时处理了 <code>ValueError</code> 和 <code>ZeroDivisionError</code> 两种可能的异常情况。</p><h2 id="各种错误类型的讲解" tabindex="-1"><a class="header-anchor" href="#各种错误类型的讲解"><span>各种错误类型的讲解</span></a></h2><p>在 Python 中，有许多不同类型的异常，比如：</p><ul><li><code>ValueError</code>：当一个函数接收到一个不合适的值时引发。</li><li><code>TypeError</code>：当操作或函数应用于不适当类型的对象时引发。</li><li><code>FileNotFoundError</code>：当尝试打开不存在的文件时引发。</li><li><code>KeyError</code>：当试图访问字典中不存在的键时引发。</li></ul><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 举个例子</span>
<span class="token keyword">try</span><span class="token punctuation">:</span>
    num <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token string">&quot;hello&quot;</span><span class="token punctuation">)</span>  <span class="token comment"># 这里会产生一个ValueError</span>
<span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;发生了一个ValueError异常！&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-finally-块" tabindex="-1"><a class="header-anchor" href="#使用-finally-块"><span>使用 <code>finally</code> 块</span></a></h2><p>除了 <code>try</code> 和 <code>except</code> 块，我们还可以使用 <code>finally</code> 块。无论是否发生异常，<code>finally</code> 块中的代码都会被执行。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    num <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入一个数字: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;你输入的数字是:&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">)</span>
<span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;这不是一个有效的数字！&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">finally</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;无论发生了什么，我都会被执行！&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>finally</code> 块通常用于在代码块执行后进行清理工作，比如关闭文件或释放资源。这确保了无论是否发生异常，都会执行这些清理操作。</p><h2 id="实战例子-一个简单的除法计算器" tabindex="-1"><a class="header-anchor" href="#实战例子-一个简单的除法计算器"><span>实战例子：一个简单的除法计算器</span></a></h2><p>让我们来动手实践一下！我们将制作一个简单的除法计算器，用户可以输入两个数字，程序将计算它们的商。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">try</span><span class="token punctuation">:</span>
    num1 <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入第一个数字: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    num2 <span class="token operator">=</span> <span class="token builtin">int</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入第二个数字: &quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    result <span class="token operator">=</span> num1 <span class="token operator">/</span> num2
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>num1<span class="token punctuation">}</span></span><span class="token string"> 除以 </span><span class="token interpolation"><span class="token punctuation">{</span>num2<span class="token punctuation">}</span></span><span class="token string"> 的结果是: </span><span class="token interpolation"><span class="token punctuation">{</span>result<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
<span class="token keyword">except</span> ValueError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;输入的不是有效的数字！&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">except</span> ZeroDivisionError<span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;除数不能为零！&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>通过这篇文章，我们学习了如何使用异常处理来保证程序在遇到意外情况时也能保持优雅的运行。我们了解了如何使用 <code>try</code> 和 <code>except</code> 关键字来捕获异常，以及如何处理不同类型的异常情况。同时，我们也学会了使用 <code>finally</code> 块来执行无论如何都要执行的代码。</p><p>希望你现在对异常处理有了更清晰的理解。异常处理是编程中一个非常重要的概念，它可以让我们的程序更健壮、稳定。继续加油，你已经迈出了成为 Python 大师的重要一步！</p>`,34),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","7. 异常处理.html.vue"]]),k=JSON.parse('{"path":"/python/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/7.%20%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86.html","title":"7. 异常处理","lang":"zh-CN","frontmatter":{"description":"7. 异常处理 今天我们将学习如何在程序中处理一些意想不到的情况，就好像，你在给你喜欢的女生送早餐的时候，她男朋友出现了，这属于一种异常情况，你需要办法去处理异常，以保证你跟这个女生的友谊正常，甚至天长地久。 说不下去了，哭了。 什么是异常？ 首先，让我们聊聊什么是异常。在编程中，异常就像是程序遇到的一些突发情况，比如你要读取一个文件，但文件突然不存在...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/python/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/7.%20%E5%BC%82%E5%B8%B8%E5%A4%84%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"7. 异常处理"}],["meta",{"property":"og:description","content":"7. 异常处理 今天我们将学习如何在程序中处理一些意想不到的情况，就好像，你在给你喜欢的女生送早餐的时候，她男朋友出现了，这属于一种异常情况，你需要办法去处理异常，以保证你跟这个女生的友谊正常，甚至天长地久。 说不下去了，哭了。 什么是异常？ 首先，让我们聊聊什么是异常。在编程中，异常就像是程序遇到的一些突发情况，比如你要读取一个文件，但文件突然不存在..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-05T08:45:30.000Z"}],["meta",{"property":"article:author","content":"Golang全栈程序员"}],["meta",{"property":"article:modified_time","content":"2023-10-05T08:45:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"7. 异常处理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-05T08:45:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Golang全栈程序员\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"什么是异常？","slug":"什么是异常","link":"#什么是异常","children":[]},{"level":2,"title":"不处理异常：程序崩溃","slug":"不处理异常-程序崩溃","link":"#不处理异常-程序崩溃","children":[]},{"level":2,"title":"捕获异常：让程序保持优雅","slug":"捕获异常-让程序保持优雅","link":"#捕获异常-让程序保持优雅","children":[]},{"level":2,"title":"多重异常：针对不同情况做出不同处理","slug":"多重异常-针对不同情况做出不同处理","link":"#多重异常-针对不同情况做出不同处理","children":[]},{"level":2,"title":"各种错误类型的讲解","slug":"各种错误类型的讲解","link":"#各种错误类型的讲解","children":[]},{"level":2,"title":"使用 finally 块","slug":"使用-finally-块","link":"#使用-finally-块","children":[]},{"level":2,"title":"实战例子：一个简单的除法计算器","slug":"实战例子-一个简单的除法计算器","link":"#实战例子-一个简单的除法计算器","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1696495530000,"updatedTime":1696495530000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":4.02,"words":1205},"filePathRelative":"python/第1章：Python 基础知识/7. 异常处理.md","localizedDate":"2023年10月5日","autoDesc":true}');export{d as comp,k as data};
