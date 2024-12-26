import{_ as s,c as a,a as t,o as e}from"./app-Dkl-ToTD.js";const p={};function o(c,n){return e(),a("div",null,n[0]||(n[0]=[t(`<h1 id="_19-并发编程中的常见问题与解决方案" tabindex="-1"><a class="header-anchor" href="#_19-并发编程中的常见问题与解决方案"><span>19. 并发编程中的常见问题与解决方案</span></a></h1><p>我们将深入探讨并发编程中可能会遇到的一些常见问题，以及如何巧妙地解决它们。我们将以简单易懂的方式向您介绍这些概念，让您能够在编写 Python 代码时更加从容。</p><h2 id="问题-1-竞态条件" tabindex="-1"><a class="header-anchor" href="#问题-1-竞态条件"><span>问题 1：竞态条件</span></a></h2><h3 id="问题描述" tabindex="-1"><a class="header-anchor" href="#问题描述"><span>问题描述：</span></a></h3><p>在并发编程中，当两个或多个线程同时访问共享资源时，由于执行顺序的不确定性，可能会导致程序的行为出现问题。</p><h4 id="问题示例代码" tabindex="-1"><a class="header-anchor" href="#问题示例代码"><span>问题示例代码：</span></a></h4><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

shared_resource <span class="token operator">=</span> <span class="token number">0</span>

<span class="token keyword">def</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> shared_resource
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        shared_resource <span class="token operator">+=</span> <span class="token number">1</span>

<span class="token keyword">def</span> <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> shared_resource
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        shared_resource <span class="token operator">-=</span> <span class="token number">1</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>increment<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>decrement<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Shared Resource:&quot;</span><span class="token punctuation">,</span> shared_resource<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="问题原因" tabindex="-1"><a class="header-anchor" href="#问题原因"><span>问题原因：</span></a></h4><p>在上述代码中，<code>shared_resource += 1</code> 和 <code>shared_resource -= 1</code> 这两行代码并不是一个原子操作，它们在底层会被拆分成多个步骤，因此可能会导致竞态条件。</p><h3 id="解决方案" tabindex="-1"><a class="header-anchor" href="#解决方案"><span>解决方案：</span></a></h3><p>使用锁（Lock）来保护共享资源，确保同一时刻只有一个线程能够访问它。</p><h4 id="解决方案示例代码" tabindex="-1"><a class="header-anchor" href="#解决方案示例代码"><span>解决方案示例代码：</span></a></h4><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

shared_resource <span class="token operator">=</span> <span class="token number">0</span>
lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">increment</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> shared_resource
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
        shared_resource <span class="token operator">+=</span> <span class="token number">1</span>
        lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">decrement</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> shared_resource
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">1000000</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
        shared_resource <span class="token operator">-=</span> <span class="token number">1</span>
        lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>increment<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>decrement<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Shared Resource:&quot;</span><span class="token punctuation">,</span> shared_resource<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题-2-死锁" tabindex="-1"><a class="header-anchor" href="#问题-2-死锁"><span>问题 2：死锁</span></a></h2><h3 id="问题描述-1" tabindex="-1"><a class="header-anchor" href="#问题描述-1"><span>问题描述：</span></a></h3><p>当多个线程同时等待某些资源的释放时，可能会发生死锁，导致程序无法继续执行。</p><h4 id="问题示例代码-1" tabindex="-1"><a class="header-anchor" href="#问题示例代码-1"><span>问题示例代码：</span></a></h4><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

<span class="token comment"># 创建两个锁</span>
lock1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>
lock2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">acquire_lock1_then_lock2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    lock1<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock2<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock2<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock1<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">acquire_lock2_then_lock1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    lock2<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock1<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock1<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock2<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>acquire_lock1_then_lock2<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>acquire_lock2_then_lock1<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Execution Completed&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="问题原因-1" tabindex="-1"><a class="header-anchor" href="#问题原因-1"><span>问题原因：</span></a></h4><p>在上述代码中，<code>acquire_lock1_then_lock2</code> 函数先尝试获取 <code>lock1</code>，再尝试获取 <code>lock2</code>，而 <code>acquire_lock2_then_lock1</code> 函数则相反，先尝试获取 <code>lock2</code>，再尝试获取 <code>lock1</code>，这可能会导致死锁。</p><h3 id="解决方案-1" tabindex="-1"><a class="header-anchor" href="#解决方案-1"><span>解决方案：</span></a></h3><p>避免使用多个锁，并确保在获取锁的顺序上保持一致。</p><h4 id="解决方案示例代码-1" tabindex="-1"><a class="header-anchor" href="#解决方案示例代码-1"><span>解决方案示例代码：</span></a></h4><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

<span class="token comment"># 创建一个锁</span>
lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">acquire_lock1_then_lock2</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">acquire_lock2_then_lock1</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>acquire_lock1_then_lock2<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>acquire_lock2_then_lock1<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Execution Completed&quot;</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题-3-数据竞争" tabindex="-1"><a class="header-anchor" href="#问题-3-数据竞争"><span>问题 3：数据竞争</span></a></h2><h3 id="问题描述-2" tabindex="-1"><a class="header-anchor" href="#问题描述-2"><span>问题描述：</span></a></h3><p>当多个线程同时修改一个共享的数据结构时，可能会导致数据的不一致性。</p><h4 id="问题示例代码-2" tabindex="-1"><a class="header-anchor" href="#问题示例代码-2"><span>问题示例代码：</span></a></h4><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">from</span> threading <span class="token keyword">import</span> Thread<span class="token punctuation">,</span> Lock

<span class="token keyword">class</span> <span class="token class-name">ThreadSafeList</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>

    <span class="token keyword">def</span> <span class="token function">append</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>value<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">pop</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">return</span> self<span class="token punctuation">.</span>_list<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 使用线程安全的列表</span>
my_list <span class="token operator">=</span> ThreadSafeList<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">add_to_list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        my_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>i<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">remove_from_list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        value <span class="token operator">=</span> my_list<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Removed:&quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>add_to_list<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>remove_from_list<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="问题原因-2" tabindex="-1"><a class="header-anchor" href="#问题原因-2"><span>问题原因：</span></a></h4><p>上述代码中，由于没有使用锁保护 <code>_list</code> 的修改，可能会导致数据的不一致性。</p><h3 id="解决方案-2" tabindex="-1"><a class="header-anchor" href="#解决方案-2"><span>解决方案：</span></a></h3><p>使用线程安全的数据结构，如<code>threading.ThreadSafeList</code>或者使用锁来保护数据的访问。</p><h4 id="解决方案示例代码-2" tabindex="-1"><a class="header-anchor" href="#解决方案示例代码-2"><span>解决方案示例代码：</span></a></h4><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">from</span> threading <span class="token keyword">import</span> Thread<span class="token punctuation">,</span> Lock

<span class="token keyword">class</span> <span class="token class-name">ThreadSafeList</span><span class="token punctuation">:</span>
    <span class="token keyword">def</span> <span class="token function">__init__</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        self<span class="token punctuation">.</span>_list <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span>
        self<span class="token punctuation">.</span>_lock <span class="token operator">=</span> Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">append</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> value<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> self<span class="token punctuation">.</span>_lock<span class="token punctuation">:</span>
            self<span class="token punctuation">.</span>_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>value<span class="token punctuation">)</span>

    <span class="token keyword">def</span> <span class="token function">pop</span><span class="token punctuation">(</span>self<span class="token punctuation">)</span><span class="token punctuation">:</span>
        <span class="token keyword">with</span> self<span class="token punctuation">.</span>_lock<span class="token punctuation">:</span>
            <span class="token keyword">return</span> self<span class="token punctuation">.</span>_list<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 使用线程安全的列表</span>
my_list <span class="token operator">=</span> ThreadSafeList<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">add_to_list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> i <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        my_list<span class="token punctuation">.</span>append<span class="token punctuation">(</span>i<span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">remove_from_list</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">for</span> _ <span class="token keyword">in</span> <span class="token builtin">range</span><span class="token punctuation">(</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
        value <span class="token operator">=</span> my_list<span class="token punctuation">.</span>pop<span class="token punctuation">(</span><span class="token punctuation">)</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Removed:&quot;</span><span class="token punctuation">,</span> value<span class="token punctuation">)</span>

<span class="token comment"># 创建两个线程</span>
thread1 <span class="token operator">=</span> Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>add_to_list<span class="token punctuation">)</span>
thread2 <span class="token operator">=</span> Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>remove_from_list<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题-4-使用-event-进行线程同步" tabindex="-1"><a class="header-anchor" href="#问题-4-使用-event-进行线程同步"><span>问题 4：使用 Event 进行线程同步</span></a></h2><h3 id="问题描述-3" tabindex="-1"><a class="header-anchor" href="#问题描述-3"><span>问题描述：</span></a></h3><p>在某些情况下，我们需要在多个线程之间进行同步，以便在特定条件满足时通知其他线程。</p><h4 id="问题示例代码-3" tabindex="-1"><a class="header-anchor" href="#问题示例代码-3"><span>问题示例代码：</span></a></h4><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

event <span class="token operator">=</span> threading<span class="token punctuation">.</span>Event<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">wait_for_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Thread is waiting for event...&quot;</span><span class="token punctuation">)</span>
    event<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Event has been set!&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">set_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;no Setting the event...&quot;</span><span class="token punctuation">)</span>


<span class="token comment"># 创建一个线程等待事件</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>wait_for_event<span class="token punctuation">)</span>

<span class="token comment"># 创建另一个线程设置事件</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>set_event<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="问题原因-3" tabindex="-1"><a class="header-anchor" href="#问题原因-3"><span>问题原因：</span></a></h4><p>上述代码中，<code>wait_for_event</code> 函数会等待 <code>event</code> 被设置，但由于没有设置事件，所以会导致第一个线程一直等待。</p><h3 id="解决方案-3" tabindex="-1"><a class="header-anchor" href="#解决方案-3"><span>解决方案：</span></a></h3><p>使用<code>threading.Event()</code>来创建一个事件对象，可以在需要时设置它以通知其他线程。</p><h4 id="解决方案示例代码-3" tabindex="-1"><a class="header-anchor" href="#解决方案示例代码-3"><span>解决方案示例代码：</span></a></h4><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

event <span class="token operator">=</span> threading<span class="token punctuation">.</span>Event<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">wait_for_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Thread is waiting for event...&quot;</span><span class="token punctuation">)</span>
    event<span class="token punctuation">.</span>wait<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Event has been set!&quot;</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">set_event</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">&quot;Setting the event...&quot;</span><span class="token punctuation">)</span>
    event<span class="token punctuation">.</span><span class="token builtin">set</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 创建一个线程等待事件</span>
thread1 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>wait_for_event<span class="token punctuation">)</span>

<span class="token comment"># 创建另一个线程设置事件</span>
thread2 <span class="token operator">=</span> threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>set_event<span class="token punctuation">)</span>

<span class="token comment"># 启动线程</span>
thread1<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待两个线程执行完毕</span>
thread1<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
thread2<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="实战例子-模拟抢票系统" tabindex="-1"><a class="header-anchor" href="#实战例子-模拟抢票系统"><span>实战例子：模拟抢票系统</span></a></h2><p>让我们通过一个简单的实例来巩固所学知识。我们将创建一个抢票系统，多个用户同时尝试购买一张票，然后检查是否会发生竞态条件。</p><div class="language-python line-numbers-mode" data-ext="py" data-title="py"><pre class="language-python"><code><span class="token keyword">import</span> threading

available_tickets <span class="token operator">=</span> <span class="token number">10</span>
lock <span class="token operator">=</span> threading<span class="token punctuation">.</span>Lock<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">def</span> <span class="token function">buy_ticket</span><span class="token punctuation">(</span>user<span class="token punctuation">)</span><span class="token punctuation">:</span>
    <span class="token keyword">global</span> available_tickets
    lock<span class="token punctuation">.</span>acquire<span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">if</span> available_tickets <span class="token operator">&gt;</span> <span class="token number">0</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>user<span class="token punctuation">}</span></span><span class="token string"> bought a ticket!&quot;</span></span><span class="token punctuation">)</span>
        available_tickets <span class="token operator">-=</span> <span class="token number">1</span>
    <span class="token keyword">else</span><span class="token punctuation">:</span>
        <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f&quot;</span><span class="token interpolation"><span class="token punctuation">{</span>user<span class="token punctuation">}</span></span><span class="token string"> couldn&#39;t get a ticket. Tickets sold out.&quot;</span></span><span class="token punctuation">)</span>
    lock<span class="token punctuation">.</span>release<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 创建多个用户线程</span>
users <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token string">&quot;Alice&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Bob&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Charlie&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;David&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;Eve&quot;</span><span class="token punctuation">]</span>
threads <span class="token operator">=</span> <span class="token punctuation">[</span>threading<span class="token punctuation">.</span>Thread<span class="token punctuation">(</span>target<span class="token operator">=</span>buy_ticket<span class="token punctuation">,</span> args<span class="token operator">=</span><span class="token punctuation">(</span>user<span class="token punctuation">,</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">for</span> user <span class="token keyword">in</span> users<span class="token punctuation">]</span>

<span class="token comment"># 启动线程</span>
<span class="token keyword">for</span> thread <span class="token keyword">in</span> threads<span class="token punctuation">:</span>
    thread<span class="token punctuation">.</span>start<span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token comment"># 等待所有线程执行完毕</span>
<span class="token keyword">for</span> thread <span class="token keyword">in</span> threads<span class="token punctuation">:</span>
    thread<span class="token punctuation">.</span>join<span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="问题-竞态条件和数据竞争的区别是啥" tabindex="-1"><a class="header-anchor" href="#问题-竞态条件和数据竞争的区别是啥"><span>问题：竞态条件和数据竞争的区别是啥</span></a></h2><h3 id="区别" tabindex="-1"><a class="header-anchor" href="#区别"><span>区别：</span></a></h3><p><strong>竞态条件</strong>通常指的是在多个线程或者进程中，由于执行顺序的不确定性导致程序行为出现问题的情况。例如，多个线程尝试同时修改一个共享变量。</p><p><strong>数据竞争</strong>是指在多个线程同时访问共享资源时，由于缺乏同步机制导致数据的不一致性。</p><p>竞态条件通常是一种导致数据竞争的情况。虽然二者看起来相似，但竞态条件更侧重于程序执行时的逻辑问题，而数据竞争则更关注数据的正确性。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>通过这篇文章，我们深入了解了并发编程中的常见问题以及相应的解决方案。我们学会了如何使用锁来处理竞态条件，避免死锁，以及如何保护共享资源。</p><p>同时，我们还通过一个抢票系统的实例加深了对这些概念的理解。希望通过这篇文章，你能够更加从容地处理并发编程中的问题，写出更加稳定和可靠的代码。</p>`,57)]))}const l=s(p,[["render",o],["__file","19. 并发编程中的常见问题与解决方案.html.vue"]]),u=JSON.parse('{"path":"/script/python/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/19.%20%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E4%B8%AD%E7%9A%84%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html","title":"19. 并发编程中的常见问题与解决方案","lang":"zh-CN","frontmatter":{"description":"19. 并发编程中的常见问题与解决方案 我们将深入探讨并发编程中可能会遇到的一些常见问题，以及如何巧妙地解决它们。我们将以简单易懂的方式向您介绍这些概念，让您能够在编写 Python 代码时更加从容。 问题 1：竞态条件 问题描述： 在并发编程中，当两个或多个线程同时访问共享资源时，由于执行顺序的不确定性，可能会导致程序的行为出现问题。 问题示例代码：...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/script/python/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/19.%20%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E4%B8%AD%E7%9A%84%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"19. 并发编程中的常见问题与解决方案"}],["meta",{"property":"og:description","content":"19. 并发编程中的常见问题与解决方案 我们将深入探讨并发编程中可能会遇到的一些常见问题，以及如何巧妙地解决它们。我们将以简单易懂的方式向您介绍这些概念，让您能够在编写 Python 代码时更加从容。 问题 1：竞态条件 问题描述： 在并发编程中，当两个或多个线程同时访问共享资源时，由于执行顺序的不确定性，可能会导致程序的行为出现问题。 问题示例代码：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-17T02:00:57.000Z"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-05-17T02:00:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"19. 并发编程中的常见问题与解决方案\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-17T02:00:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/script/python/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/19.%20%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E4%B8%AD%E7%9A%84%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/script/python/%E7%AC%AC2%E7%AB%A0%EF%BC%9A%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B/19.%20%E5%B9%B6%E5%8F%91%E7%BC%96%E7%A8%8B%E4%B8%AD%E7%9A%84%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98%E4%B8%8E%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"19. 并发编程中的常见问题与解决方案"}],["meta",{"property":"og:description","content":"19. 并发编程中的常见问题与解决方案 我们将深入探讨并发编程中可能会遇到的一些常见问题，以及如何巧妙地解决它们。我们将以简单易懂的方式向您介绍这些概念，让您能够在编写 Python 代码时更加从容。 问题 1：竞态条件 问题描述： 在并发编程中，当两个或多个线程同时访问共享资源时，由于执行顺序的不确定性，可能会导致程序的行为出现问题。 问题示例代码：..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-17T02:00:57.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-17T02:00:57.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"19. 并发编程中的常见问题与解决方案\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-05-17T02:00:57.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"问题 1：竞态条件","slug":"问题-1-竞态条件","link":"#问题-1-竞态条件","children":[{"level":3,"title":"问题描述：","slug":"问题描述","link":"#问题描述","children":[]},{"level":3,"title":"解决方案：","slug":"解决方案","link":"#解决方案","children":[]}]},{"level":2,"title":"问题 2：死锁","slug":"问题-2-死锁","link":"#问题-2-死锁","children":[{"level":3,"title":"问题描述：","slug":"问题描述-1","link":"#问题描述-1","children":[]},{"level":3,"title":"解决方案：","slug":"解决方案-1","link":"#解决方案-1","children":[]}]},{"level":2,"title":"问题 3：数据竞争","slug":"问题-3-数据竞争","link":"#问题-3-数据竞争","children":[{"level":3,"title":"问题描述：","slug":"问题描述-2","link":"#问题描述-2","children":[]},{"level":3,"title":"解决方案：","slug":"解决方案-2","link":"#解决方案-2","children":[]}]},{"level":2,"title":"问题 4：使用 Event 进行线程同步","slug":"问题-4-使用-event-进行线程同步","link":"#问题-4-使用-event-进行线程同步","children":[{"level":3,"title":"问题描述：","slug":"问题描述-3","link":"#问题描述-3","children":[]},{"level":3,"title":"解决方案：","slug":"解决方案-3","link":"#解决方案-3","children":[]}]},{"level":2,"title":"实战例子：模拟抢票系统","slug":"实战例子-模拟抢票系统","link":"#实战例子-模拟抢票系统","children":[]},{"level":2,"title":"问题：竞态条件和数据竞争的区别是啥","slug":"问题-竞态条件和数据竞争的区别是啥","link":"#问题-竞态条件和数据竞争的区别是啥","children":[{"level":3,"title":"区别：","slug":"区别","link":"#区别","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1715911257000,"updatedTime":1715911257000,"contributors":[{"name":"xiaobai-tech","email":"948485496@qq.com","commits":1}]},"readingTime":{"minutes":5.57,"words":1672},"filePathRelative":"script/python/第2章：并发编程/19. 并发编程中的常见问题与解决方案.md","localizedDate":"2024年5月17日","autoDesc":true}');export{l as comp,u as data};
