import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,a as t}from"./app-BsHlUl9v.js";const e={},p=t(`<h1 id="_6-输入与输出" tabindex="-1"><a class="header-anchor" href="#_6-输入与输出"><span>6. 输入与输出</span></a></h1><p>在前面的章节中，我们已经了解了 Python 的一些基础知识，现在让我们来学习一下如何在 Python 中进行输入与输出。</p><h2 id="让程序-说话-输出" tabindex="-1"><a class="header-anchor" href="#让程序-说话-输出"><span>让程序“说话”：输出</span></a></h2><p>首先，我们来学习如何让程序输出一些内容。在 Python 中，你可以使用<code>print</code>函数来实现这个目的。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, World!&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>上面这行代码将在屏幕上显示出 &quot;Hello, World!&quot;。你可以在<code>print</code>函数中放入任何你想要显示的文字或数据。</p><h2 id="与用户互动-从控制台输入" tabindex="-1"><a class="header-anchor" href="#与用户互动-从控制台输入"><span>与用户互动：从控制台输入</span></a></h2><p>接下来，我们来学习如何让程序与用户进行交互。Python 提供了<code>input</code>函数，可以让你从用户那里获取输入的数据。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>name <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入你的名字：&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;你好，&quot;</span> <span class="token operator">+</span> name <span class="token operator">+</span> <span class="token string">&quot;!&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码会提示用户输入名字，然后将用户输入的名字与后面的字符串连接起来并显示出来。</p><h2 id="从文件中获取输入" tabindex="-1"><a class="header-anchor" href="#从文件中获取输入"><span>从文件中获取输入</span></a></h2><p>当你实际写代码的时候，会发现，从控制台输入数据虽然能用，一两次还好，但一直要这么干挺累人的。有没有更轻松的办法可以省去这部分重复工作？</p><p>有。除了从控制台获取输入，你还可以从文件中读取数据。比如，你可以将一些测试数据保存在一个文件中，然后让你的程序读取并进行处理。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;input.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;r&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
    data <span class="token operator">=</span> <span class="token builtin">file</span><span class="token punctuation">.</span>read<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;从文件中读取的数据：&quot;</span><span class="token punctuation">,</span> data<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="将结果写入文件" tabindex="-1"><a class="header-anchor" href="#将结果写入文件"><span>将结果写入文件</span></a></h2><p>另外，你还可以将程序的输出结果写入到文件中，以便后续使用或分析。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>result <span class="token operator">=</span> <span class="token string">&quot;这是要写入文件的内容。&quot;</span>

<span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span><span class="token string">&#39;output.txt&#39;</span><span class="token punctuation">,</span> <span class="token string">&#39;w&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
    <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>result<span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;结果已经写入到文件中。&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实战演练-计算器" tabindex="-1"><a class="header-anchor" href="#实战演练-计算器"><span>实战演练：计算器</span></a></h2><p>现在，让我们来做一个小实战练习，做一个简单的计算器程序。这个程序将会接受两个数字和一个操作符（比如加号、减号等），然后计算结果并输出。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 获取用户输入</span>
num1 <span class="token operator">=</span> <span class="token builtin">float</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入第一个数字：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
operator <span class="token operator">=</span> <span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入操作符（+、-、*、/）：&quot;</span><span class="token punctuation">)</span>
num2 <span class="token operator">=</span> <span class="token builtin">float</span><span class="token punctuation">(</span><span class="token builtin">input</span><span class="token punctuation">(</span><span class="token string">&quot;请输入第二个数字：&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 根据操作符计算结果</span>
<span class="token keyword">if</span> operator <span class="token operator">==</span> <span class="token string">&quot;+&quot;</span><span class="token punctuation">:</span>
    result <span class="token operator">=</span> num1 <span class="token operator">+</span> num2
<span class="token keyword">elif</span> operator <span class="token operator">==</span> <span class="token string">&quot;-&quot;</span><span class="token punctuation">:</span>
    result <span class="token operator">=</span> num1 <span class="token operator">-</span> num2
<span class="token keyword">elif</span> operator <span class="token operator">==</span> <span class="token string">&quot;*&quot;</span><span class="token punctuation">:</span>
    result <span class="token operator">=</span> num1 <span class="token operator">*</span> num2
<span class="token keyword">elif</span> operator <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">:</span>
    result <span class="token operator">=</span> num1 <span class="token operator">/</span> num2
<span class="token keyword">else</span><span class="token punctuation">:</span>
    result <span class="token operator">=</span> <span class="token string">&quot;无效的操作符&quot;</span>

<span class="token comment"># 输出结果</span>
<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;结果：&quot;</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>试试运行这段代码，输入一些数字和操作符，看看你的计算器是不是能正确地工作！</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2><p>通过本文的学习，你已经了解了如何在 Python 中进行简单的输入与输出操作。<code>print</code>函数可以用来显示信息，而<code>input</code>函数可以接受用户的输入。我们还通过实战例子巩固了这些知识，并介绍了从文件中进行输入和输出的方法。</p><p>希望你现在对 Python 的输入输出有了更清晰的认识！这篇文章的目的是让你学会如何在 Python 中进行基本的输入输出操作，包括与用户的交互和文件的读写。在实际开发中，这些技能将会派上用场，特别是在解决 LeetCode 等编程题目时。加油！</p>`,24),o=[p];function i(l,c){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","6. 输入与输出.html.vue"]]),k=JSON.parse('{"path":"/golang/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/6.%20%E8%BE%93%E5%85%A5%E4%B8%8E%E8%BE%93%E5%87%BA.html","title":"6. 输入与输出","lang":"zh-CN","frontmatter":{"description":"6. 输入与输出 在前面的章节中，我们已经了解了 Python 的一些基础知识，现在让我们来学习一下如何在 Python 中进行输入与输出。 让程序“说话”：输出 首先，我们来学习如何让程序输出一些内容。在 Python 中，你可以使用print函数来实现这个目的。 上面这行代码将在屏幕上显示出 \\"Hello, World!\\"。你可以在print函数中...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/golang/%E7%AC%AC1%E7%AB%A0%EF%BC%9APython%20%E5%9F%BA%E7%A1%80%E7%9F%A5%E8%AF%86/6.%20%E8%BE%93%E5%85%A5%E4%B8%8E%E8%BE%93%E5%87%BA.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"6. 输入与输出"}],["meta",{"property":"og:description","content":"6. 输入与输出 在前面的章节中，我们已经了解了 Python 的一些基础知识，现在让我们来学习一下如何在 Python 中进行输入与输出。 让程序“说话”：输出 首先，我们来学习如何让程序输出一些内容。在 Python 中，你可以使用print函数来实现这个目的。 上面这行代码将在屏幕上显示出 \\"Hello, World!\\"。你可以在print函数中..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-12T10:05:49.000Z"}],["meta",{"property":"article:author","content":"Golang全栈程序员"}],["meta",{"property":"article:modified_time","content":"2024-02-12T10:05:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"6. 输入与输出\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-12T10:05:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Golang全栈程序员\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"让程序“说话”：输出","slug":"让程序-说话-输出","link":"#让程序-说话-输出","children":[]},{"level":2,"title":"与用户互动：从控制台输入","slug":"与用户互动-从控制台输入","link":"#与用户互动-从控制台输入","children":[]},{"level":2,"title":"从文件中获取输入","slug":"从文件中获取输入","link":"#从文件中获取输入","children":[]},{"level":2,"title":"将结果写入文件","slug":"将结果写入文件","link":"#将结果写入文件","children":[]},{"level":2,"title":"实战演练：计算器","slug":"实战演练-计算器","link":"#实战演练-计算器","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1707732349000,"updatedTime":1707732349000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":2.75,"words":824},"filePathRelative":"golang/第1章：Python 基础知识/6. 输入与输出.md","localizedDate":"2024年2月12日","autoDesc":true}');export{d as comp,k as data};
