import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,a as t}from"./app-BsHlUl9v.js";const e={},p=t(`<h1 id="_9-文件操作与管理" tabindex="-1"><a class="header-anchor" href="#_9-文件操作与管理"><span>9. 文件操作与管理</span></a></h1><p>今天我们将一起探讨如何在 Python 中进行文件操作与管理。我将用简单易懂的方式向你介绍这个话题。</p><h2 id="为什么要学习文件操作" tabindex="-1"><a class="header-anchor" href="#为什么要学习文件操作"><span>为什么要学习文件操作？</span></a></h2><p>在计算机世界里，文件是存储和组织数据的重要方式之一。无论是文本文件、图片、视频，甚至你正在玩的游戏，都是以文件的形式存在的。学会如何在 Python 中进行文件操作，将会让你的编程技能更加强大，让你可以轻松处理各种数据。</p><h2 id="打开和关闭文件" tabindex="-1"><a class="header-anchor" href="#打开和关闭文件"><span>打开和关闭文件</span></a></h2><p>在进行文件操作之前，我们首先需要打开文件，就好像打开一本书一样。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 打开一个文件</span>
<span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;example.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 这里可以对文件进行一些操作</span>

<span class="token comment"># 最后，别忘了关闭文件</span>
<span class="token builtin">file</span><span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在上面的例子中，我们用 <code>open</code> 函数打开了一个名为 <code>example.txt</code> 的文件。参数 <code>&#39;r&#39;</code> 表示我们要以只读模式打开它。当我们完成了对文件的操作后，最后一定要记得关闭它。</p><p><strong>注意：</strong> 如果你打开了文件但忘记关闭它，在 Windows 中可能会导致该文件在一段时间内被“锁定”，其他程序无法对其进行操作，这可能会产生一些问题。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 错误的示范，未关闭文件</span>
<span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;example.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span>
<span class="token comment"># 这里可以对文件进行一些操作，但忘记了关闭文件</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="读取文件内容" tabindex="-1"><a class="header-anchor" href="#读取文件内容"><span>读取文件内容</span></a></h2><p>打开文件之后，我们可以从中读取内容。比如，我们可以逐行读取：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;example.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span>

<span class="token keyword">for</span> line <span class="token keyword">in</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span>

<span class="token builtin">file</span><span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码会逐行打印出 <code>example.txt</code> 文件中的内容。</p><h2 id="写入文件内容" tabindex="-1"><a class="header-anchor" href="#写入文件内容"><span>写入文件内容</span></a></h2><p>除了读取，我们也可以往文件里写入内容：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;new_file.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span>

<span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;Hello, World!\\n&#39;</span><span class="token punctuation">)</span>
<span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;This is a new line.&#39;</span><span class="token punctuation">)</span>

<span class="token builtin">file</span><span class="token punctuation">.</span>close<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码会创建一个新文件 <code>new_file.txt</code>，并往里写入两行文字。</p><h2 id="不关闭文件会怎样" tabindex="-1"><a class="header-anchor" href="#不关闭文件会怎样"><span>不关闭文件会怎样？</span></a></h2><p>如果打开的文件没有被关闭，会导致内存泄露的问题，尤其在处理大量文件时。下面是一个示例：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 错误示例：未关闭文件</span>
<span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token builtin">file</span> <span class="token operator">=</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;file_</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">.txt&#39;</span></span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span>
    <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span><span class="token string">&#39;Some content&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个示例中，我们打开了 1000 个文件，但没有关闭它们。这可能导致程序运行变慢或甚至崩溃，因为操作系统可能会耗尽可用的文件句柄。</p><h2 id="实战例子-制作一个备忘录" tabindex="-1"><a class="header-anchor" href="#实战例子-制作一个备忘录"><span>实战例子：制作一个备忘录</span></a></h2><p>让我们来动手实践一下！我们将制作一个简单的备忘录程序，可以让用户输入备忘录内容，然后将其保存到文件中。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">add_to_memo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    memo <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入备忘录内容：&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;memo.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;a&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
        <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>memo <span class="token operator">+</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;已添加到备忘录！&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">view_memo</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">try</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;memo.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;&amp;#8203;\`\`oaicite:{&quot;</span>numbe<span class="token string">r&quot;:1,&quot;</span>invalid_reason<span class="token string">&quot;:&quot;</span>Malformed citation 【备忘录内容】<span class="token string">&quot;}\`\`&amp;#8203;&quot;</span><span class="token punctuation">)</span>
            <span class="token keyword">for</span> line <span class="token keyword">in</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span>line<span class="token punctuation">.</span>strip<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">except</span> FileNotFoundError<span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;备忘录为空。&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;\\n选择操作：&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;1. 添加备忘录&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;2. 查看备忘录&quot;</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;3. 退出&quot;</span><span class="token punctuation">)</span>

    choice <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入数字选择操作：&quot;</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> choice <span class="token operator">==</span> <span class="token string">&#39;1&#39;</span><span class="token punctuation">:</span>
        add_to_memo<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">elif</span> choice <span class="token operator">==</span> <span class="token string">&#39;2&#39;</span><span class="token punctuation">:</span>
        view_memo<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">elif</span> choice <span class="token operator">==</span> <span class="token string">&#39;3&#39;</span><span class="token punctuation">:</span>
        <span class="token keyword">break</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;无效的输入，请重新选择。&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个程序允许用户添加备忘录并查看已有备忘录。备忘录会被保存在名为 <code>memo.txt</code> 的文件中。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>通过这篇文章，我们学会了如何在 Python 中进行文件操作与管理。我们了解了如何打开、读取和写入文件，还制作了一个简单的备忘录程序，巩固了所学知识。</p><p>希望你现在对文件操作有了更清晰的理解。继续加油，你已经掌握了处理文件的基本技能！</p>`,29),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","9. 文件操作与管理.html.vue"]]),k=JSON.parse('{"path":"/python/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/9.%20%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C%E4%B8%8E%E7%AE%A1%E7%90%86.html","title":"9. 文件操作与管理","lang":"zh-CN","frontmatter":{"description":"9. 文件操作与管理 今天我们将一起探讨如何在 Python 中进行文件操作与管理。我将用简单易懂的方式向你介绍这个话题。 为什么要学习文件操作？ 在计算机世界里，文件是存储和组织数据的重要方式之一。无论是文本文件、图片、视频，甚至你正在玩的游戏，都是以文件的形式存在的。学会如何在 Python 中进行文件操作，将会让你的编程技能更加强大，让你可以轻松...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/python/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/9.%20%E6%96%87%E4%BB%B6%E6%93%8D%E4%BD%9C%E4%B8%8E%E7%AE%A1%E7%90%86.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"9. 文件操作与管理"}],["meta",{"property":"og:description","content":"9. 文件操作与管理 今天我们将一起探讨如何在 Python 中进行文件操作与管理。我将用简单易懂的方式向你介绍这个话题。 为什么要学习文件操作？ 在计算机世界里，文件是存储和组织数据的重要方式之一。无论是文本文件、图片、视频，甚至你正在玩的游戏，都是以文件的形式存在的。学会如何在 Python 中进行文件操作，将会让你的编程技能更加强大，让你可以轻松..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-05T08:45:30.000Z"}],["meta",{"property":"article:author","content":"Golang全栈程序员"}],["meta",{"property":"article:modified_time","content":"2023-10-05T08:45:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"9. 文件操作与管理\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-05T08:45:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Golang全栈程序员\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"为什么要学习文件操作？","slug":"为什么要学习文件操作","link":"#为什么要学习文件操作","children":[]},{"level":2,"title":"打开和关闭文件","slug":"打开和关闭文件","link":"#打开和关闭文件","children":[]},{"level":2,"title":"读取文件内容","slug":"读取文件内容","link":"#读取文件内容","children":[]},{"level":2,"title":"写入文件内容","slug":"写入文件内容","link":"#写入文件内容","children":[]},{"level":2,"title":"不关闭文件会怎样？","slug":"不关闭文件会怎样","link":"#不关闭文件会怎样","children":[]},{"level":2,"title":"实战例子：制作一个备忘录","slug":"实战例子-制作一个备忘录","link":"#实战例子-制作一个备忘录","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1696495530000,"updatedTime":1696495530000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":3.17,"words":952},"filePathRelative":"python/第1章：Python 基础知识/9. 文件操作与管理.md","localizedDate":"2023年10月5日","autoDesc":true}');export{d as comp,k as data};
