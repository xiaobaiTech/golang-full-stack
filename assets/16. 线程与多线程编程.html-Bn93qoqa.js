import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{o as s,c as a,a as e}from"./app-BsHlUl9v.js";const t={},p=e(`<h1 id="_16-线程与多线程编程" tabindex="-1"><a class="header-anchor" href="#_16-线程与多线程编程"><span>16. 线程与多线程编程</span></a></h1><p>今天我们要聊聊一个有趣而又实用的主题： <strong>线程与多线程编程</strong> 。</p><p>在我们开始之前，让我们先放轻松，别担心，这个话题并不难理解，而且对于你写出更高效的程序非常有用。</p><h2 id="什么是线程" tabindex="-1"><a class="header-anchor" href="#什么是线程"><span>什么是线程？</span></a></h2><p>首先，让我们来解释一下什么是线程。在计算机中，线程可以看作是执行程序的一条执行路径，一个程序可以同时运行多个线程，每个线程负责不同的任务。</p><p>举个例子，想象你在玩一个游戏，同时还可以听音乐，这就是多线程的感觉，你可以同时做多件事情。</p><h2 id="为什么需要多线程" tabindex="-1"><a class="header-anchor" href="#为什么需要多线程"><span>为什么需要多线程？</span></a></h2><p>有了线程，我们可以同时处理多个任务，这样可以提高程序的效率和响应速度。</p><p>比如在一个聊天应用中，你可以同时接收消息、发送消息、显示聊天记录等等。如果所有这些任务都在一个线程中处理，可能会导致程序变得很慢，甚至卡死。</p><h2 id="使用线程" tabindex="-1"><a class="header-anchor" href="#使用线程"><span>使用线程</span></a></h2><p>接下来，我们来看一下如何在 Python 中使用线程。Python 提供了内建的 <code>threading</code> 模块来支持多线程编程。</p><p>首先，我们需要导入 <code>threading</code> 模块：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>接着，我们可以创建一个线程：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">def</span> <span class="token function">print_numbers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span>i<span class="token punctuation">)</span>

<span class="token comment"># 创建一个线程</span>
thread <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>print_numbers<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>现在，我们可以启动这个线程：</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>thread<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这样，线程就开始运行了。在这个例子中，线程会打印出数字 0 到 4。</p><h2 id="为什么要有线程同步" tabindex="-1"><a class="header-anchor" href="#为什么要有线程同步"><span>为什么要有线程同步？</span></a></h2><p>在多线程编程中，有时候会出现多个线程同时访问一个共享资源的情况，这时候就可能会导致数据错乱。</p><p>举个例子，假如你在一个游戏中有一个共享的金币变量，同时有两个线程在进行游戏，一个在增加金币，一个在减少金币。如果没有线程同步，就有可能出现错误的结果。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 错误示例</span>
<span class="token keyword">def</span> <span class="token function">increase_gold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> gold
    gold <span class="token operator">+=</span> <span class="token number">10</span>

<span class="token keyword">def</span> <span class="token function">decrease_gold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> gold
    gold <span class="token operator">-=</span> <span class="token number">5</span>

gold <span class="token operator">=</span> <span class="token number">100</span>

thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>increase_gold<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>decrease_gold<span class="token punctuation">)</span>

thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>gold<span class="token punctuation">)</span>  <span class="token comment"># 可能得到的结果并不是 105</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用锁以保证线程安全" tabindex="-1"><a class="header-anchor" href="#使用锁以保证线程安全"><span>使用锁以保证线程安全</span></a></h2><p>为了解决上面的问题，我们可以使用线程同步的技术，Python 提供了 <code>threading.Lock</code> 来帮助我们实现线程同步。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code>lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">increase_gold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> gold
    lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取锁</span>
    gold <span class="token operator">+=</span> <span class="token number">10</span>
    lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 释放锁</span>

<span class="token keyword">def</span> <span class="token function">decrease_gold</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> gold
    lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 获取锁</span>
    gold <span class="token operator">-=</span> <span class="token number">5</span>
    lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 释放锁</span>

gold <span class="token operator">=</span> <span class="token number">100</span>

thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>increase_gold<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>decrease_gold<span class="token punctuation">)</span>

thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span>gold<span class="token punctuation">)</span>  <span class="token comment"># 现在得到的结果是 105</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="其他线程同步方案" tabindex="-1"><a class="header-anchor" href="#其他线程同步方案"><span>其他线程同步方案</span></a></h2><p>除了使用锁，还有其他的线程同步方案，比如信号量（<code>threading.Semaphore</code>）和事件（<code>threading.Event</code>）。</p><h3 id="信号量-threading-semaphore" tabindex="-1"><a class="header-anchor" href="#信号量-threading-semaphore"><span>信号量（<code>threading.Semaphore</code>）</span></a></h3><p>信号量是一个允许多个线程同时访问共享资源，但限制同时访问的线程数量的工具。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading
<span class="token keyword">import</span> time

<span class="token comment"># 共享资源</span>
shared_resource <span class="token operator">=</span> <span class="token number">0</span>

<span class="token comment"># 创建一个锁</span>
lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 线程函数：访问共享资源</span>
<span class="token keyword">def</span> <span class="token function">access_resource</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> shared_resource
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> lock<span class="token punctuation">:</span>
            shared_resource <span class="token operator">+=</span> <span class="token number">1</span>
            <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;线程 </span><span class="token interpolation"><span class="token punctuation">{</span>threading<span class="token punctuation">.</span>current_thread<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name<span class="token punctuation">}</span></span><span class="token string"> 访问共享资源，当前值为 </span><span class="token interpolation"><span class="token punctuation">{</span>shared_resource<span class="token punctuation">}</span></span><span class="token string">&#39;</span></span><span class="token punctuation">)</span>
            time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>access_resource<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&#39;Thread 1&#39;</span><span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>access_resource<span class="token punctuation">,</span> name<span class="token operator">=</span><span class="token string">&#39;Thread 2&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程结束</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;所有线程执行完毕&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们创建了一个共享资源 <code>shared_resource</code>，并使用了一个锁 <code>lock</code> 来保证在同一时刻只有一个线程可以访问共享资源。每个线程都会在 <code>access_resource</code> 函数中访问共享资源，每次访问后会暂停 1 秒钟，以模拟一些复杂的操作。</p><p>通过这个例子，我们可以清晰地看到两个线程如何交替地访问共享资源，而不会产生竞态条件。</p><h3 id="事件-threading-event" tabindex="-1"><a class="header-anchor" href="#事件-threading-event"><span>事件（<code>threading.Event</code>）</span></a></h3><p>事件用于线程间的通信，一个线程发送事件，其他线程等待事件。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading
<span class="token keyword">import</span> time

<span class="token comment"># 创建一个事件</span>
event <span class="token operator">=</span> threading<span class="token punctuation">.</span>Event<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 线程函数：等待事件并执行任务</span>
<span class="token keyword">def</span> <span class="token function">wait_for_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;线程等待事件&#39;</span><span class="token punctuation">)</span>
    event<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 阻塞直到事件被设置为True</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;事件已触发，执行任务&#39;</span><span class="token punctuation">)</span>

<span class="token comment"># 触发事件</span>
<span class="token keyword">def</span> <span class="token function">trigger_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;事件将在两秒后触发&#39;</span><span class="token punctuation">)</span>
    time<span class="token punctuation">.</span>sleep<span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">)</span>
    event<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>  <span class="token comment"># 设置事件为True，唤醒等待中的线程</span>

<span class="token comment"># 创建线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>wait_for_event<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>trigger_event<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程结束</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;所有线程执行完毕&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在这个例子中，我们创建了一个事件 <code>event</code>，线程 <code>wait_for_event</code> 会在等待事件触发时执行任务。线程 <code>trigger_event</code> 会在两秒后触发事件。通过事件，我们可以在不同线程之间进行同步，实现一些复杂的协作逻辑。</p><h2 id="线程同步方案的比较" tabindex="-1"><a class="header-anchor" href="#线程同步方案的比较"><span>线程同步方案的比较</span></a></h2><ul><li>锁（<code>threading.Lock</code>）：最基本的同步机制，可以保证同一时刻只有一个线程访问共享资源。适用于简单的场景。</li><li>信号量（<code>threading.Semaphore</code>）：允许多个线程同时访问共享资源，但限制同时访问的线程数量。适用于资源有限的情况。</li><li>事件（<code>threading.Event</code>）：可以实现线程间的通信，一个线程发送事件，其他线程等待事件。适用于需要协调多个线程工作的情况。</li></ul><h2 id="实战例子-多线程下载图片" tabindex="-1"><a class="header-anchor" href="#实战例子-多线程下载图片"><span>实战例子：多线程下载图片</span></a></h2><p>让我们用一个实际的例子来总结一下吧！假设我们需要从网上下载一批图片，我们可以使用多线程来提高下载速度。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> requests
<span class="token keyword">import</span> threading

<span class="token keyword">def</span> <span class="token function">download_image</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">:</span>
    response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span>url<span class="token punctuation">)</span>
    <span class="token keyword">with</span> <span class="token builtin">open</span><span class="token punctuation">(</span>filename<span class="token punctuation">,</span> <span class="token string">&#39;wb&#39;</span><span class="token punctuation">)</span> <span class="token keyword">as</span> <span class="token builtin">file</span><span class="token punctuation">:</span>
        <span class="token builtin">file</span><span class="token punctuation">.</span>write<span class="token punctuation">(</span>response<span class="token punctuation">.</span>content<span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&#39;</span><span class="token interpolation"><span class="token punctuation">{</span>filename<span class="token punctuation">}</span></span><span class="token string"> 下载完成&#39;</span></span><span class="token punctuation">)</span>

<span class="token comment"># 图片链接列表</span>
image_urls <span class="token operator">=</span> <span class="token punctuation">[</span>
    <span class="token string">&#39;https://example.com/image1.jpg&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;https://example.com/image2.jpg&#39;</span><span class="token punctuation">,</span>
    <span class="token string">&#39;https://example.com/image3.jpg&#39;</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token comment"># 创建线程来下载图片</span>
threads <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
<span class="token keyword">for</span> i<span class="token punctuation">,</span> url <span class="token keyword">in</span> <span class="token builtin">enumerate</span><span class="token punctuation">(</span>image_urls<span class="token punctuation">)</span><span class="token punctuation">:</span>
    filename <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f&#39;image_</span><span class="token interpolation"><span class="token punctuation">{</span>i<span class="token punctuation">}</span></span><span class="token string">.jpg&#39;</span></span>
    thread <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>download_image<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span>url<span class="token punctuation">,</span> filename<span class="token punctuation">)</span><span class="token punctuation">)</span>
    threads<span class="token punctuation">.</span>append<span class="token punctuation">(</span>thread<span class="token punctuation">)</span>
    thread<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待所有线程结束</span>
<span class="token keyword">for</span> thread <span class="token keyword">in</span> threads<span class="token punctuation">:</span>
    thread<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&#39;所有图片下载完成&#39;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过这个例子，我们学会了如何使用多线程来加速任务的执行，这在网络请求等 IO 密集型任务中非常实用。</p><h2 id="小结" tabindex="-1"><a class="header-anchor" href="#小结"><span>小结</span></a></h2><p>通过这篇文章，我们学习了如何在 Python 中使用线程以及线程同步的重要性。我们了解了锁、信号量和事件等线程同步方案，并通过一个实际的例子加深了理解。</p><p>希望你现在对线程和线程同步有了更清晰的认识。继续加油，你已经掌握了写出高效程序的一部分诀窍！</p><p>如果你学会了如何使用线程，你将能够写出更加高效、响应速度更快的程序，这对于处理大量任务或者高并发的情况非常重要。同时，理解了线程同步，可以避免因多线程访问共享资源而产生的问题，确保程序的稳定性和可靠性。</p>`,47),o=[p];function i(c,l){return s(),a("div",null,o)}const r=n(t,[["render",i],["__file","16. 线程与多线程编程.html.vue"]]),k=JSON.parse('{"path":"/golang/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/16.%20%E7%BA%BF%E7%A8%8B%E4%B8%8E%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B.html","title":"16. 线程与多线程编程","lang":"zh-CN","frontmatter":{"description":"16. 线程与多线程编程 今天我们要聊聊一个有趣而又实用的主题： 线程与多线程编程 。 在我们开始之前，让我们先放轻松，别担心，这个话题并不难理解，而且对于你写出更高效的程序非常有用。 什么是线程？ 首先，让我们来解释一下什么是线程。在计算机中，线程可以看作是执行程序的一条执行路径，一个程序可以同时运行多个线程，每个线程负责不同的任务。 举个例子，想象...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/golang/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/16.%20%E7%BA%BF%E7%A8%8B%E4%B8%8E%E5%A4%9A%E7%BA%BF%E7%A8%8B%E7%BC%96%E7%A8%8B.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"16. 线程与多线程编程"}],["meta",{"property":"og:description","content":"16. 线程与多线程编程 今天我们要聊聊一个有趣而又实用的主题： 线程与多线程编程 。 在我们开始之前，让我们先放轻松，别担心，这个话题并不难理解，而且对于你写出更高效的程序非常有用。 什么是线程？ 首先，让我们来解释一下什么是线程。在计算机中，线程可以看作是执行程序的一条执行路径，一个程序可以同时运行多个线程，每个线程负责不同的任务。 举个例子，想象..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-12T10:05:49.000Z"}],["meta",{"property":"article:author","content":"Golang全栈程序员"}],["meta",{"property":"article:modified_time","content":"2024-02-12T10:05:49.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"16. 线程与多线程编程\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-02-12T10:05:49.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Golang全栈程序员\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"什么是线程？","slug":"什么是线程","link":"#什么是线程","children":[]},{"level":2,"title":"为什么需要多线程？","slug":"为什么需要多线程","link":"#为什么需要多线程","children":[]},{"level":2,"title":"使用线程","slug":"使用线程","link":"#使用线程","children":[]},{"level":2,"title":"为什么要有线程同步？","slug":"为什么要有线程同步","link":"#为什么要有线程同步","children":[]},{"level":2,"title":"使用锁以保证线程安全","slug":"使用锁以保证线程安全","link":"#使用锁以保证线程安全","children":[]},{"level":2,"title":"其他线程同步方案","slug":"其他线程同步方案","link":"#其他线程同步方案","children":[{"level":3,"title":"信号量（threading.Semaphore）","slug":"信号量-threading-semaphore","link":"#信号量-threading-semaphore","children":[]},{"level":3,"title":"事件（threading.Event）","slug":"事件-threading-event","link":"#事件-threading-event","children":[]}]},{"level":2,"title":"线程同步方案的比较","slug":"线程同步方案的比较","link":"#线程同步方案的比较","children":[]},{"level":2,"title":"实战例子：多线程下载图片","slug":"实战例子-多线程下载图片","link":"#实战例子-多线程下载图片","children":[]},{"level":2,"title":"小结","slug":"小结","link":"#小结","children":[]}],"git":{"createdTime":1707732349000,"updatedTime":1707732349000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":5.83,"words":1748},"filePathRelative":"golang/第2章：并发编程/16. 线程与多线程编程.md","localizedDate":"2024年2月12日","autoDesc":true}');export{r as comp,k as data};
