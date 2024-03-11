import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-DWfSWoLm.js";const p={},e=t(`<h1 id="语法找错题" tabindex="-1"><a class="header-anchor" href="#语法找错题"><span>语法找错题</span></a></h1><h2 id="写出以下代码出现的问题" tabindex="-1"><a class="header-anchor" href="#写出以下代码出现的问题"><span>写出以下代码出现的问题</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">var</span> x <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token boolean">nil</span>
    <span class="token keyword">if</span> x <span class="token operator">==</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
        x <span class="token operator">=</span> <span class="token string">&quot;default&quot;</span>
    <span class="token punctuation">}</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>x<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>golang 中字符串是不能赋值 <code>nil</code> 的，也不能跟 <code>nil</code> 比较。</p><h2 id="写出以下打印内容" tabindex="-1"><a class="header-anchor" href="#写出以下打印内容"><span>写出以下打印内容</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code>   <span class="token keyword">package</span> main
   <span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
   <span class="token keyword">const</span> <span class="token punctuation">(</span>
       a <span class="token operator">=</span> <span class="token boolean">iota</span>
       b <span class="token operator">=</span> <span class="token boolean">iota</span>
   <span class="token punctuation">)</span>
   <span class="token keyword">const</span> <span class="token punctuation">(</span>
       name <span class="token operator">=</span> <span class="token string">&quot;menglu&quot;</span>
       c    <span class="token operator">=</span> <span class="token boolean">iota</span>
       d    <span class="token operator">=</span> <span class="token boolean">iota</span>
   <span class="token punctuation">)</span>
   <span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
       fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>a<span class="token punctuation">)</span>
       fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span>
       fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>c<span class="token punctuation">)</span>
       fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>d<span class="token punctuation">)</span>
   <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="找出下面代码的问题" tabindex="-1"><a class="header-anchor" href="#找出下面代码的问题"><span>找出下面代码的问题</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span>
<span class="token keyword">type</span> query <span class="token keyword">func</span><span class="token punctuation">(</span><span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span>

<span class="token keyword">func</span> <span class="token function">exec</span><span class="token punctuation">(</span>name <span class="token builtin">string</span><span class="token punctuation">,</span> vs <span class="token operator">...</span>query<span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
    ch <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token builtin">string</span><span class="token punctuation">)</span>
    fn <span class="token operator">:=</span> <span class="token keyword">func</span><span class="token punctuation">(</span>i <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        ch <span class="token operator">&lt;-</span> vs<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">for</span> i<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> <span class="token keyword">range</span> vs <span class="token punctuation">{</span>
        <span class="token keyword">go</span> <span class="token function">fn</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token operator">&lt;-</span>ch
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    ret <span class="token operator">:=</span> <span class="token function">exec</span><span class="token punctuation">(</span><span class="token string">&quot;111&quot;</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>n <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">+</span> <span class="token string">&quot;func1&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>n <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">+</span> <span class="token string">&quot;func2&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>n <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">+</span> <span class="token string">&quot;func3&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span> <span class="token keyword">func</span><span class="token punctuation">(</span>n <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token builtin">string</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span> n <span class="token operator">+</span> <span class="token string">&quot;func4&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>ret<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>上面的代码有严重的内存泄漏问题，出错的位置是 <code>go fn(i)</code>，实际上代码执行后会启动 4 个协程，但是因为 <code>ch</code> 是非缓冲的，只可能有一个协程写入成功。而其他三个协程会一直在后台等待写入。</p><h2 id="写出以下打印结果-并解释下为什么这么打印的。" tabindex="-1"><a class="header-anchor" href="#写出以下打印结果-并解释下为什么这么打印的。"><span>写出以下打印结果，并解释下为什么这么打印的。</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    str1 <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;a&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;b&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;c&quot;</span><span class="token punctuation">}</span>
    str2 <span class="token operator">:=</span> str1<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">:</span><span class="token punctuation">]</span>
    str2<span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token string">&quot;new&quot;</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str1<span class="token punctuation">)</span>
    str2 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>str2<span class="token punctuation">,</span> <span class="token string">&quot;z&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;x&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;y&quot;</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>str1<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>golang 中的切片底层其实使用的是数组。当使用<code>str1[1:]</code> 使，<code>str2</code> 和 <code>str1</code> 底层共享一个数组，这回导致 <code>str2[1] = &quot;new&quot;</code> 语句影响 <code>str1</code>。</p><p>而 <code>append</code> 会导致底层数组扩容，生成新的数组，因此追加数据后的 <code>str2</code> 不会影响 <code>str1</code>。</p><p>但是为什么对 <code>str2</code> 复制后影响的确实 <code>str1</code> 的第三个元素呢？这是因为切片 <code>str2</code> 是从数组的第二个元素开始，<code>str2</code> 索引为 1 的元素对应的是 <code>str1</code> 索引为 2 的元素。</p><h2 id="写出以下打印结果" tabindex="-1"><a class="header-anchor" href="#写出以下打印结果"><span>写出以下打印结果</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Name <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Student<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;menglu&quot;</span><span class="token punctuation">}</span> <span class="token operator">==</span> <span class="token operator">&amp;</span>Student<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;menglu&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>Student<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;menglu&quot;</span><span class="token punctuation">}</span> <span class="token operator">==</span> Student<span class="token punctuation">{</span>Name<span class="token punctuation">:</span> <span class="token string">&quot;menglu&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>个人理解：指针类型比较的是指针地址，非指针类型比较的是每个属性的值。</p><h2 id="写出以下代码的问题" tabindex="-1"><a class="header-anchor" href="#写出以下代码的问题"><span>写出以下代码的问题</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">}</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token operator">...</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">}</span> <span class="token operator">==</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token string">&quot;1&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>数组只能与相同纬度长度以及类型的其他数组比较，切片之间不能直接比较。。</p><h2 id="下面代码写法有什么问题" tabindex="-1"><a class="header-anchor" href="#下面代码写法有什么问题"><span>下面代码写法有什么问题？</span></a></h2><div class="language-go line-numbers-mode" data-ext="go" data-title="go"><pre class="language-go"><code><span class="token keyword">package</span> main
<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">&quot;fmt&quot;</span>
<span class="token punctuation">)</span>
<span class="token keyword">type</span> Student <span class="token keyword">struct</span> <span class="token punctuation">{</span>
    Age <span class="token builtin">int</span>
<span class="token punctuation">}</span>
<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    kv <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span>Student<span class="token punctuation">{</span><span class="token string">&quot;menglu&quot;</span><span class="token punctuation">:</span> <span class="token punctuation">{</span>Age<span class="token punctuation">:</span> <span class="token number">21</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
    kv<span class="token punctuation">[</span><span class="token string">&quot;menglu&quot;</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Age <span class="token operator">=</span> <span class="token number">22</span>
    s <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>Student<span class="token punctuation">{</span><span class="token punctuation">{</span>Age<span class="token punctuation">:</span> <span class="token number">21</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
    s<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span>Age <span class="token operator">=</span> <span class="token number">22</span>
    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>kv<span class="token punctuation">,</span> s<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>golang中的<code>map</code> 通过<code>key</code>获取到的实际上是两个值，第一个是获取到的值，第二个是是否存在该<code>key</code>。因此不能直接通过<code>key</code>来赋值对象。</p>`,23),o=[e];function c(i,l){return s(),a("div",null,o)}const d=n(p,[["render",c],["__file","语法找错题.html.vue"]]),k=JSON.parse('{"path":"/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E8%AF%AD%E6%B3%95%E6%89%BE%E9%94%99%E9%A2%98.html","title":"语法找错题","lang":"zh-CN","frontmatter":{"description":"语法找错题 写出以下代码出现的问题 golang 中字符串是不能赋值 nil 的，也不能跟 nil 比较。 写出以下打印内容 找出下面代码的问题 上面的代码有严重的内存泄漏问题，出错的位置是 go fn(i)，实际上代码执行后会启动 4 个协程，但是因为 ch 是非缓冲的，只可能有一个协程写入成功。而其他三个协程会一直在后台等待写入。 写出以下打印结果...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E8%AF%AD%E6%B3%95%E6%89%BE%E9%94%99%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"语法找错题"}],["meta",{"property":"og:description","content":"语法找错题 写出以下代码出现的问题 golang 中字符串是不能赋值 nil 的，也不能跟 nil 比较。 写出以下打印内容 找出下面代码的问题 上面的代码有严重的内存泄漏问题，出错的位置是 go fn(i)，实际上代码执行后会启动 4 个协程，但是因为 ch 是非缓冲的，只可能有一个协程写入成功。而其他三个协程会一直在后台等待写入。 写出以下打印结果..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-11T04:42:17.000Z"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-03-11T04:42:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"语法找错题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-11T04:42:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E8%AF%AD%E6%B3%95%E6%89%BE%E9%94%99%E9%A2%98.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/golang/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E8%AF%AD%E6%B3%95%E6%89%BE%E9%94%99%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"语法找错题"}],["meta",{"property":"og:description","content":"语法找错题 写出以下代码出现的问题 golang 中字符串是不能赋值 nil 的，也不能跟 nil 比较。 写出以下打印内容 找出下面代码的问题 上面的代码有严重的内存泄漏问题，出错的位置是 go fn(i)，实际上代码执行后会启动 4 个协程，但是因为 ch 是非缓冲的，只可能有一个协程写入成功。而其他三个协程会一直在后台等待写入。 写出以下打印结果..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-03-11T04:42:17.000Z"}],["meta",{"property":"article:modified_time","content":"2024-03-11T04:42:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"语法找错题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-03-11T04:42:17.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"写出以下代码出现的问题","slug":"写出以下代码出现的问题","link":"#写出以下代码出现的问题","children":[]},{"level":2,"title":"写出以下打印内容","slug":"写出以下打印内容","link":"#写出以下打印内容","children":[]},{"level":2,"title":"找出下面代码的问题","slug":"找出下面代码的问题","link":"#找出下面代码的问题","children":[]},{"level":2,"title":"写出以下打印结果，并解释下为什么这么打印的。","slug":"写出以下打印结果-并解释下为什么这么打印的。","link":"#写出以下打印结果-并解释下为什么这么打印的。","children":[]},{"level":2,"title":"写出以下打印结果","slug":"写出以下打印结果","link":"#写出以下打印结果","children":[]},{"level":2,"title":"写出以下代码的问题","slug":"写出以下代码的问题","link":"#写出以下代码的问题","children":[]},{"level":2,"title":"下面代码写法有什么问题？","slug":"下面代码写法有什么问题","link":"#下面代码写法有什么问题","children":[]}],"git":{"createdTime":1710132137000,"updatedTime":1710132137000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":2.18,"words":655},"filePathRelative":"golang/核心知识点/语法找错题.md","localizedDate":"2024年3月11日","autoDesc":true}');export{d as comp,k as data};
