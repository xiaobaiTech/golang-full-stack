import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,e as t}from"./app-CSVPTWdb.js";const e={},p=t(`<h1 id="_20-线程安全与锁机制" tabindex="-1"><a class="header-anchor" href="#_20-线程安全与锁机制"><span>20. 线程安全与锁机制</span></a></h1><p>今天，我们要谈论的是线程安全和锁机制。这听起来可能有点复杂，但别担心，我会用简单易懂的方式向你介绍这些概念。</p><h2 id="为什么需要线程安全" tabindex="-1"><a class="header-anchor" href="#为什么需要线程安全"><span>为什么需要线程安全？</span></a></h2><p>在并发编程中，如果多个线程同时访问共享的数据，可能会导致意想不到的结果。比如，一个线程正在写入数据，而另一个线程同时尝试读取，就可能读到一些不完整或者不正确的数据。</p><h4 id="问题示例" tabindex="-1"><a class="header-anchor" href="#问题示例"><span>问题示例：</span></a></h4><p>让我们来看一个例子，假设有两个线程分别执行增加和减少的操作：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

<span class="token comment"># 共享的数据</span>
counter <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">def</span> <span class="token function">increase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> counter
    counter <span class="token operator">+=</span> <span class="token number">1</span>

<span class="token keyword">def</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> counter
    counter <span class="token operator">-=</span> <span class="token number">1</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>increase<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>decrease<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Counter 的值为：</span><span class="token interpolation"><span class="token punctuation">{</span>counter<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这段代码会导致 <code>counter</code> 的值可能不是我们预期的结果。因为两个线程同时访问了共享的 <code>counter</code> 变量，导致了竞态条件。</p><h2 id="锁机制的介绍" tabindex="-1"><a class="header-anchor" href="#锁机制的介绍"><span>锁机制的介绍</span></a></h2><p>为了解决这个问题，我们可以使用锁机制。锁允许我们在访问共享资源时进行保护，确保同时只有一个线程能够进行操作。</p><h3 id="解决方案示例" tabindex="-1"><a class="header-anchor" href="#解决方案示例"><span>解决方案示例：</span></a></h3><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

<span class="token comment"># 共享的数据</span>
counter <span class="token operator">=</span> <span class="token number">0</span>

<span class="token comment"># 创建一个锁</span>
lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">increase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> counter
    <span class="token keyword">with</span> lock<span class="token punctuation">:</span>
        counter <span class="token operator">+=</span> <span class="token number">1</span>

<span class="token keyword">def</span> <span class="token function">decrease</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> counter
    <span class="token keyword">with</span> lock<span class="token punctuation">:</span>
        counter <span class="token operator">-=</span> <span class="token number">1</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>increase<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>decrease<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Counter 的值为：</span><span class="token interpolation"><span class="token punctuation">{</span>counter<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这里我们引入了一个 <code>threading.Lock()</code>，使用 <code>with lock</code> 来创建一个锁的上下文环境，保证了在执行临界区代码时只能有一个线程进入。</p><h2 id="读写锁的介绍" tabindex="-1"><a class="header-anchor" href="#读写锁的介绍"><span>读写锁的介绍</span></a></h2><p>除了普通的锁，Python 还提供了读写锁（<code>threading.RLock()</code>）。读写锁允许多个线程同时读取共享资源，但在写入时会进行互斥锁定，确保同时只有一个线程能进行写入。</p><h3 id="读写锁示例" tabindex="-1"><a class="header-anchor" href="#读写锁示例"><span>读写锁示例：</span></a></h3><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

<span class="token comment"># 共享的数据</span>
data <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>RLock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">read_data</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> lock<span class="token punctuation">:</span>
        <span class="token keyword">for</span> item <span class="token keyword">in</span> data<span class="token punctuation">:</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Read item: </span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">write_data</span><span class="token punctuation">(</span>item<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">with</span> lock<span class="token punctuation">:</span>
        data<span class="token punctuation">.</span>append<span class="token punctuation">(</span>item<span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Write item: </span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>read_data<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>write_data<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="使用场景" tabindex="-1"><a class="header-anchor" href="#使用场景"><span>使用场景</span></a></h3><ul><li>数据库连接池的管理</li><li>网络请求时的并发处理</li><li>文件的读写操作</li></ul><h2 id="实战例子-生产者与消费者模型" tabindex="-1"><a class="header-anchor" href="#实战例子-生产者与消费者模型"><span>实战例子：生产者与消费者模型</span></a></h2><p>让我们通过一个实际例子来巩固所学知识。我们将使用线程和锁来创建一个生产者与消费者模型。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading
<span class="token keyword">import</span> queue
<span class="token keyword">import</span> time

<span class="token comment"># 创建一个线程安全的队列</span>
q <span class="token operator">=</span> queue<span class="token punctuation">.</span>Queue<span class="token punctuation">(</span>maxsize<span class="token operator">=</span><span class="token number">5</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">producer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> lock<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> q<span class="token punctuation">.</span>full<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                item <span class="token operator">=</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 生产一个商品</span>
                q<span class="token punctuation">.</span>put<span class="token punctuation">(</span>item<span class="token punctuation">)</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Produced item: </span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">consumer</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">while</span> <span class="token boolean">True</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> lock<span class="token punctuation">:</span>
            <span class="token keyword">if</span> <span class="token keyword">not</span> q<span class="token punctuation">.</span>empty<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
                item <span class="token operator">=</span> q<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;Consumed item: </span><span class="token interpolation"><span class="token punctuation">{</span>item<span class="token punctuation">}</span></span><span class="token string">&quot;</span></span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment"># 创建一个锁</span>
lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 创建生产者线程</span>
thread_producer <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>producer<span class="token punctuation">)</span>

<span class="token comment"># 创建消费者线程</span>
thread_consumer <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>consumer<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread_producer<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread_consumer<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>通过这篇文章，我们学习了如何使用锁机制来保证线程安全。锁可以有效地避免在并发编程中出现竞态条件，保证了程序的正确性。</p><p>希望你现在对线程安全和锁机制有了更清晰的理解。继续加油，你正在成为一名优秀的 Python 开发者！</p>`,25),o=[p];function i(c,l){return s(),a("div",null,o)}const d=n(e,[["render",i],["__file","20. 线程安全与锁机制.html.vue"]]),k=JSON.parse('{"path":"/python/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/20.%20%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E4%B8%8E%E9%94%81%E6%9C%BA%E5%88%B6.html","title":"20. 线程安全与锁机制","lang":"zh-CN","frontmatter":{"description":"20. 线程安全与锁机制 今天，我们要谈论的是线程安全和锁机制。这听起来可能有点复杂，但别担心，我会用简单易懂的方式向你介绍这些概念。 为什么需要线程安全？ 在并发编程中，如果多个线程同时访问共享的数据，可能会导致意想不到的结果。比如，一个线程正在写入数据，而另一个线程同时尝试读取，就可能读到一些不完整或者不正确的数据。 问题示例： 让我们来看一个例子...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/python/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/20.%20%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E4%B8%8E%E9%94%81%E6%9C%BA%E5%88%B6.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"20. 线程安全与锁机制"}],["meta",{"property":"og:description","content":"20. 线程安全与锁机制 今天，我们要谈论的是线程安全和锁机制。这听起来可能有点复杂，但别担心，我会用简单易懂的方式向你介绍这些概念。 为什么需要线程安全？ 在并发编程中，如果多个线程同时访问共享的数据，可能会导致意想不到的结果。比如，一个线程正在写入数据，而另一个线程同时尝试读取，就可能读到一些不完整或者不正确的数据。 问题示例： 让我们来看一个例子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-05T08:45:30.000Z"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2023-10-05T08:45:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"20. 线程安全与锁机制\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-05T08:45:30.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/python/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/20.%20%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E4%B8%8E%E9%94%81%E6%9C%BA%E5%88%B6.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/python/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/20.%20%E7%BA%BF%E7%A8%8B%E5%AE%89%E5%85%A8%E4%B8%8E%E9%94%81%E6%9C%BA%E5%88%B6.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"20. 线程安全与锁机制"}],["meta",{"property":"og:description","content":"20. 线程安全与锁机制 今天，我们要谈论的是线程安全和锁机制。这听起来可能有点复杂，但别担心，我会用简单易懂的方式向你介绍这些概念。 为什么需要线程安全？ 在并发编程中，如果多个线程同时访问共享的数据，可能会导致意想不到的结果。比如，一个线程正在写入数据，而另一个线程同时尝试读取，就可能读到一些不完整或者不正确的数据。 问题示例： 让我们来看一个例子..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-10-05T08:45:30.000Z"}],["meta",{"property":"article:modified_time","content":"2023-10-05T08:45:30.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"20. 线程安全与锁机制\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-10-05T08:45:30.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"为什么需要线程安全？","slug":"为什么需要线程安全","link":"#为什么需要线程安全","children":[]},{"level":2,"title":"锁机制的介绍","slug":"锁机制的介绍","link":"#锁机制的介绍","children":[{"level":3,"title":"解决方案示例：","slug":"解决方案示例","link":"#解决方案示例","children":[]}]},{"level":2,"title":"读写锁的介绍","slug":"读写锁的介绍","link":"#读写锁的介绍","children":[{"level":3,"title":"读写锁示例：","slug":"读写锁示例","link":"#读写锁示例","children":[]},{"level":3,"title":"使用场景","slug":"使用场景","link":"#使用场景","children":[]}]},{"level":2,"title":"实战例子：生产者与消费者模型","slug":"实战例子-生产者与消费者模型","link":"#实战例子-生产者与消费者模型","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1696495530000,"updatedTime":1696495530000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":2.94,"words":882},"filePathRelative":"python/第2章：并发编程/20. 线程安全与锁机制.md","localizedDate":"2023年10月5日","autoDesc":true}');export{d as comp,k as data};
