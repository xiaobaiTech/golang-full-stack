import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as r,c as o,a as n,b as e,d as a,e as p}from"./app-D3PKci_G.js";const l={},d=p(`<figure><img src="https://cdn.xiaobaidebug.top/image/421646663617_.pic_hd.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>关于 32 位和 64 位，这个概念一直让人比较懵。</p><p>在买电脑的时候，我们看到过<strong>32 位和 64 位 CPU</strong>。</p><p>下软件的时候，我们也看到过<strong>32 位或 64 位的软件</strong>。</p><p>就连装虚拟机的时候，我们也看过<strong>32 位和 64 位的系统</strong>。</p><p>在写代码的时候，我们的数值，也可以定义为<strong>int32 或者 int64</strong>。</p><p>我们当然很清楚，装软件的时候，一般 64 位的系统就选 64 位的软件，肯定不出错，但是这又是为什么呢？既然 CPU，软件，操作系统，数值大小都有 32 位和 64 位，他们之间就可以随意组合成各种问题，比如 32 位的系统能装 64 位的软件吗？32 位的系统能计算 int64 的数值吗？他们之间到底有什么关系？这篇文章会尝试解释清楚。</p><br><h2 id="从代码到到可执行文件" tabindex="-1"><a class="header-anchor" href="#从代码到到可执行文件"><span>从代码到到可执行文件</span></a></h2><p>我们从熟悉的场景开始说起，比方说，我们写代码的时候，会在代码编辑器里写入。</p><div class="language-c line-numbers-mode" data-ext="c" data-title="c"><pre class="language-c"><code><span class="token comment">// test.c</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
         <span class="token keyword">int</span> i<span class="token punctuation">,</span>j<span class="token punctuation">;</span>
         i <span class="token operator">=</span> <span class="token number">3</span><span class="token punctuation">;</span>
         j <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
         <span class="token keyword">return</span> i <span class="token operator">+</span> j<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>但这个代码是给人看的，机器可看不懂，于是这段代码，还会经过被编译器转成<strong>汇编码</strong>。</p><p>汇编码就是我们大学的时候学的头秃的这种</p><div class="language-assembly line-numbers-mode" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>	// gcc -S test.c
	pushq	%rbp
	.cfi_def_cfa_offset 16
	.cfi_offset %rbp, -16
	movq	%rsp, %rbp
	.cfi_def_cfa_register %rbp
	movl	$0, -4(%rbp)
	movl	$3, -8(%rbp)
	movl	$2, -12(%rbp)
	movl	-8(%rbp), %eax
	addl	-12(%rbp), %eax
	popq	%rbp
	retq
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>大家也别去看上面的内容，没必要。</p><p>而汇编，总归还是有各种 movl，pushq 这些符号，虽然确实不好看，但说到底<strong>还是给人看的</strong>，而机器 cpu 要的，说到底还是要 0101 这样的<strong>二进制编码</strong>，所以还需要使用汇编器将汇编转成二进制的<strong>机器码</strong>。我们可以看到下面内容分为 3 列，左边是指令地址， 右边是汇编码内容，中间的就是指令机器码，是 16 进制，可以转成二进制 01 串，这就是机器 cpu 能认识的内容了。</p><div class="language-assembly line-numbers-mode" data-ext="assembly" data-title="assembly"><pre class="language-assembly"><code>// objdump -d test
0000000000001125 &lt;main&gt;:
    1125:	55                   	push   %rbp
    1126:	48 89 e5             	mov    %rsp,%rbp
    1129:	c7 45 fc 03 00 00 00 	movl   $0x3,-0x4(%rbp)
    1130:	c7 45 f8 02 00 00 00 	movl   $0x2,-0x8(%rbp)
    1137:	8b 55 fc             	mov    -0x4(%rbp),%edx
    113a:	8b 45 f8             	mov    -0x8(%rbp),%eax
    113d:	01 d0                	add    %edx,%eax
    113f:	5d                   	pop    %rbp
    1140:	c3                   	retq
    1141:	66 2e 0f 1f 84 00 00 	nopw   %cs:0x0(%rax,%rax,1)
    1148:	00 00 00
    114b:	0f 1f 44 00 00       	nopl   0x0(%rax,%rax,1)
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><figure><img src="https://cdn.xiaobaidebug.top/image/从高级语言到机器码.drawio-20220419210021874.png" alt="从高级语言到机器码" tabindex="0" loading="lazy"><figcaption>从高级语言到机器码</figcaption></figure><p>而机器码，最后会放在我们编译生成的<strong>可执行文件</strong>里。</p><p>也就是说我们平时写的代码，最后会变成一堆 01 机器码，放在可执行文件里，躺在磁盘上。</p><br><h2 id="从可执行文件到进程" tabindex="-1"><a class="header-anchor" href="#从可执行文件到进程"><span>从可执行文件到进程</span></a></h2><p>一旦我们执行以下命令</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>./可执行文件名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这个可执行文件就会加载进<strong>内存</strong>中，成为一个<strong>进程</strong>，运行起来。</p><p>可执行文件里的机器码也会被加载到内存中，它就像是一张列满 todo list 的清单，而 CPU 就对照着这张清单，一行行的执行上面的机器码。从效果上来看，进程就动起来了。</p><p>对 CPU 来说，它执行到某个特定的编码数值，就会执行特定的操作。比如计算 2+3，其实就是通过<strong>总线</strong>把数据 2 和 3 从<strong>内存</strong>里读入，然后放到<strong>寄存器</strong>上，再用加法器相加这两个数值并将结果放入到寄存器里，最后将这个数值回写到内存中，以此循环往复，一行行执行机器码直到退出。</p><figure><img src="https://cdn.xiaobaidebug.top/image/进程内存与CPU的执行逻辑.drawio-20220419210036155.png" alt="进程内存与CPU的执行逻辑" tabindex="0" loading="lazy"><figcaption>进程内存与CPU的执行逻辑</figcaption></figure><br><h3 id="cpu-位数的含义" tabindex="-1"><a class="header-anchor" href="#cpu-位数的含义"><span>CPU 位数的含义</span></a></h3><p>上面这个流程里，最重要的几个关键词，分别是<strong>CPU 寄存器，总线，内存</strong>。</p><p>CPU 的寄存器，说白了就是个存放数值的小盒子，盒子的大小，叫<strong>位宽</strong>。32 位 CPU 能放入最大 2^32 的数值。64 位就是最大 2^64 的值。这里的 32 位位宽的 CPU 就是我们常说的 32 位 CPU，同理 64 位 CPU 也是一样。</p><p>而<strong>CPU 跟内存</strong>之间，是用<strong>总线</strong>来进行信号传输的，总线可以分为<strong>数据总线，控制总线，地址总线</strong>。功能如其名，举个例子说明下他们的作用吧。在一个进程的运行过程中，CPU 会根据进程的机器码一行行执行操作。</p><p>比如现在有一行是将 A 地址的数据与 B 地址的数据相加，那么 CPU 就会通过<strong>控制总线</strong>，发送信号给内存这个设备，告诉它，现在 CPU 要通过<strong>地址总线</strong>在内存中找到<strong>A 数据的地址</strong>，然后取得 A 数据的值，假设是 100，那么这个 100，就会通过<strong>数据总线</strong>回传到 CPU 的某个寄存器中。B 也一样，假设 B=200，放到另一个寄存器中，此时 A 和 B 相加后，结果是 300，然后控制 CPU 通过<strong>地址总线</strong>找到返回的参数地址，再把数据结果通过<strong>数据总线</strong>传回内存中。这一存一取，CPU 都是通过<strong>控制总线</strong>对内存发出指令的。</p><figure><img src="https://cdn.xiaobaidebug.top/image/三类总线.png" alt="三类总线" tabindex="0" loading="lazy"><figcaption>三类总线</figcaption></figure><p>而<strong>总线，也可以理解为有个宽度</strong>，比如宽度是 32 位，那么一次可以传 32 个 0 或 1 的信号，那么这个宽度能表达的数值范围就是 0 到 2^32 这么多。</p><p>32 位 CPU 的总线宽度一般是 32 位，因为刚刚上面提到了，CPU 可以利用地址总线在<strong>内存</strong>中进行寻址操作，那么现在这根地址总线，最大能寻址的范围，也就到 2^32，其实就是 4G。</p><p>64 位 CPU，按理说总线宽度是 64 位，但实际上是 48 位（也有看到说是 40 位或 46 位的，没关系，你知道它很大就行了），所以寻址范围能到 2^48 次方，也就是 256T。</p><br><h3 id="系统和软件的位数的含义" tabindex="-1"><a class="header-anchor" href="#系统和软件的位数的含义"><span>系统和软件的位数的含义</span></a></h3><p>上面提到了 32 位 CPU 和 64 位 CPU 的内存寻址范围，那么相应的操作系统，和软件（其实操作系统也能说是软件），也应该按 CPU 所能支持的范围去构建自己的寻址范围。</p><p>比方说下面这个图，在操作系统上运行一个用户态进程，会分为用户态和内核态，并设定一定的内存布局。操作系统和软件都需要以这个内存布局为基础运行程序。比如 32 位，内核态分配了 1 个 G，用户态分配了 3G，这种时候，你总不能将程序的运行内存边界设定在大于 10G 的地方。所以，系统和软件的位数，可以理解为，这个系统或软件内存寻址的范围位数。</p><figure><img src="https://cdn.xiaobaidebug.top/image/32和64位的内存差异.png" alt="32和64位的内存差异" tabindex="0" loading="lazy"><figcaption>32和64位的内存差异</figcaption></figure><p>一般情况下，由于现在我们的 CPU 架构在设计上都是<strong>完全向前兼容</strong>的，别说 32 位了，16 位的都还兼容着，因此 64 位的 CPU 是能装上 32 位操作系统的。</p><p>同理，64 位的操作系统是兼容 32 位的软件的，所以 32 位软件能装在 64 位系统上。</p><p>但反过来，因为 32 位操作系统只支持 4g 的内存，而 64 位的软件在编译的时候就设定自己的内存边界不止 4 个 G，并且 64 位的 CPU 指令集内容比 32 位的要多，所以 32 位操作系统是肯定不能运行 64 位软件的。</p><p>同理，32 位 CPU 也不能装 64 位的操作系统的。</p><br><h3 id="程序数值-int32-和-int64-的含义" tabindex="-1"><a class="header-anchor" href="#程序数值-int32-和-int64-的含义"><span>程序数值 int32 和 int64 的含义</span></a></h3><p>这个我们平时写代码接触的最多，比较好理解了。int32 也就是用 4 个字节，32 位的内存去存储数据，int64 也就是用 8 个字节，64 位去存数据。这个数值就是刚刚 CPU 运行流程中放在<strong>内存里</strong>的数据。</p><br><p>那么问题又来了。</p><br><h3 id="_32-位的-cpu-能进行-int64-位的数值计算吗" tabindex="-1"><a class="header-anchor" href="#_32-位的-cpu-能进行-int64-位的数值计算吗"><span>32 位的 CPU 能进行 int64 位的数值计算吗？</span></a></h3><p>先说结论，<strong>能</strong>。但比起 64 位的 CPU，<strong>性能会慢一些</strong>。</p><p>如果说我用的是 64 位的<strong>CPU</strong>，那么我在计算两个 int64 的<strong>数值</strong>相加时，我就能将数据通过 64 位的<strong>总线</strong>，一次性存入到 64 位的<strong>寄存器</strong>，并在进行计算后返回到内存中。整个过程一步到位，一气呵成。</p><p>但如果我现在用的是 32 位的 CPU，那就憋屈一点了，我虽然在代码里放了个 int64 的数值，但实际上 CPU 的寄存器根本放不下这么大的数据，因此最简单的方法是，将 int64 的数值，拆成前后两半，现在两个 int64 相加，就变成了 4 个 int32 的数值相加，并且后半部分加好了之后，拿到进位，才能去计算前面的部分，这里光是执行的指令数就比 64 位的 CPU 要多。所以理论上，会更慢些。</p><br><h2 id="系统位数会限制内存吗" tabindex="-1"><a class="header-anchor" href="#系统位数会限制内存吗"><span>系统位数会限制内存吗？</span></a></h2><p>上面提到了 CPU 位数，系统位数，软件位数，以及数值位数之间的区别与联系。</p><p>现在，我们回到标题里提到的问题。</p><br><h3 id="_32-位-cpu-和系统插-8g-内存条-能用吗" tabindex="-1"><a class="header-anchor" href="#_32-位-cpu-和系统插-8g-内存条-能用吗"><span>32 位 CPU 和系统插 8g 内存条，能用吗？</span></a></h3><p>系统能正常工作，但<strong>一般用不到 8G</strong>，因为 32 位系统的总线寻址能力为 2 的 32 次方，也就是 4G，<strong>哪怕装了 8G 的内存，真正能被用到的其实只有 4g，多少有点浪费。</strong></p><p>注意上面提到的是<strong>一般</strong>，为什么这么说，因为这里有例外，32 位系统里，有些是可以支持超过 4G 内存的，比如<strong>Windows Server 2003</strong>就能最大支持 64G 的内存，它通过使用 <strong>PAE</strong> （Intel <strong>P</strong>hysical <strong>A</strong>ddress <strong>E</strong>xtension）技术向程序提供更多的物理内存，PAE 本质上是通过<strong>分页管理</strong>的方式将 32 位的总线寻址能力增加到 36 位。因此<strong>理论上</strong>寻址能力达到 2 的 36 次方，也就是 64G。</p><figure><img src="https://cdn.xiaobaidebug.top/image/PAE能让32位系统获得大于4G的内存.drawio.png" alt="PAE能让32位系统获得大于4G的内存" tabindex="0" loading="lazy"><figcaption>PAE能让32位系统获得大于4G的内存</figcaption></figure><p>至于实现细节大家也不用关心，现在用到这玩意的机器也该淘汰的差不多了，而且都是 windows server，注意<strong>Windows Server 2003</strong> 名字里带个<strong>server</strong>，是用来做服务器的，我们一般也用不到，知道这件事，除了能帮助我们更好的装 x 外，就没什么作用了。</p><p>所以，<strong>你当 32 位系统最大只能用到 4G 内存，那也没毛病。</strong></p><br><h3 id="_64-位-cpu-装-32-位操作系统-再插上-8g-的内存条-寻址能力还是-4g-吗" tabindex="-1"><a class="header-anchor" href="#_64-位-cpu-装-32-位操作系统-再插上-8g-的内存条-寻址能力还是-4g-吗"><span>64 位 CPU 装 32 位操作系统，再插上 8g 的内存条，寻址能力还是 4G 吗</span></a></h3><p>上面提到 32 位 CPU 就算插上 8G 内存条，寻址能力也还是 4G，那如果说我现在换用 64 位的 CPU，但装了个 32 位的操作系统，这时候插入 8G 内存条，寻址能力能超过 4G 吗？</p><p>寻址能力，除了受到 cpu 的限制外，还受到操作系统的限制，如果操作系统就是按着 32 位的指令和寻址范围（4G）来编译的话，那么它就会缺少 64 位系统该有的指令，它在运行软件的时候就不能做到超过这个限制，因此<strong>寻址能力还会是 4G。</strong></p><br><p>最后留下一个问题吧。</p><p>上面提到，我们平时写的代码（也就是 C，go，java 这些），先转成汇编，再转成机器码。最后 CPU 执行的是机器码，那么问题来了。</p><p><strong>为什么我们平时写的代码不直接转成机器码，而要先转成汇编，这是不是多此一举？</strong></p><br><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><ul><li>CPU 位数主要指的是寄存器的位宽，</li><li>32 位 CPU 只能装 32 位的系统和软件，且能计算 int64，int32 的数值。内存寻址范围是 4G。</li><li>64 位 CPU，同时兼容 32 位和 64 位的系统和软件，并且进行 int64 数值计算的时候，性能比 32 位 CPU 更好，内存寻址范围可以达到 256T。</li><li>32 位 CPU 和操作系统，插入 8G 的内存，会有点浪费，因为总线寻址范围比较有限，它只能用上 4G 不到的内存。</li><li>64 位 CPU，如果装上 32 位的操作系统，就算插上 8G 的内存，效果也还是只能用上 4G 不到的内存。</li></ul><br><h2 id="最后" tabindex="-1"><a class="header-anchor" href="#最后"><span>最后</span></a></h2><p>刚工作的时候一直觉得 int32，有 21 个亿，这么大的数值肯定够用了吧，结果现实好几次打脸。</p><p>以前做游戏的时候，血量一开始是定义为 int32，游戏设定是可以通过充钱，提升角色的属性，还能提升血量上限，谁也没想到，老板们通过氪金，硬是把血量给打到了 int32 最大值。于是策划提了个一句话需求：&quot;血量要支持到 int64 大小&quot;，这是我见过最简单的策划案，但也让人加班加的最凶。</p><p>那是我第一次感受到了钞能力。</p><img src="https://cdn.xiaobaidebug.top/image/1593863685553.jpg" width="50%" align="center"><br><p>这篇文章老早就想写了，但涉及的知识点有点多，一直很头疼，怎么样才能用最简单的方式把他们表述清楚，于是想着从大家最熟悉的场景开始说起。希望能给大家带来价值。</p><p><strong>如果文章对你有帮助，欢迎.....</strong></p><p>算了。</p><br><h5 id="别说了-一起在知识的海洋里呛水吧" tabindex="-1"><a class="header-anchor" href="#别说了-一起在知识的海洋里呛水吧"><span>别说了，一起在知识的海洋里呛水吧</span></a></h5><p><strong>点击</strong>下方名片，关注公众号:【小白 debug】<br><img src="https://cdn.xiaobaidebug.top/1696069689495.png" alt="" loading="lazy"></p><br><p>不满足于在留言区说骚话？</p><p>加我，我们建了个划水吹牛皮群，在群里，你可以跟你下次跳槽可能遇到的同事或面试官聊点有意思的话题。就<strong>超！开！心！！</strong></p><img src="https://cdn.xiaobaidebug.top/image-20220522162616202.png" width="50%" align="center"><br><h2 id="文章推荐" tabindex="-1"><a class="header-anchor" href="#文章推荐"><span>文章推荐：</span></a></h2>`,98),g={href:"https://www.xiaobaidebug.top/2022/07/19/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/%E6%97%A2%E7%84%B6%E6%9C%89HTTP%E5%8D%8F%E8%AE%AE%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88%E8%BF%98%E8%A6%81%E6%9C%89RPC%E5%8D%8F%E8%AE%AE%EF%BC%9F/",target:"_blank",rel:"noopener noreferrer"},c={href:"https://www.xiaobaidebug.top/2021/03/26/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/TCP%E7%B2%98%E5%8C%85%EF%BC%81%E6%95%B0%E6%8D%AE%E5%8C%85%EF%BC%9A%E6%88%91%E5%8F%AA%E6%98%AF%E7%8A%AF%E4%BA%86%E6%AF%8F%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E9%83%BD%E4%BC%9A%E7%8A%AF%E7%9A%84%E9%94%99%EF%BC%8C%E7%A1%AC%E6%A0%B8%E5%9B%BE%E8%A7%A3/",target:"_blank",rel:"noopener noreferrer"},E={href:"https://www.xiaobaidebug.top/2021/05/25/%E5%9B%BE%E8%A7%A3%E7%BD%91%E7%BB%9C/%E5%8A%A8%E5%9B%BE%E5%9B%BE%E8%A7%A3%EF%BC%81%E6%97%A2%E7%84%B6IP%E5%B1%82%E4%BC%9A%E5%88%86%E7%89%87%EF%BC%8C%E4%B8%BA%E4%BB%80%E4%B9%88TCP%E5%B1%82%E4%B9%9F%E8%BF%98%E8%A6%81%E5%88%86%E6%AE%B5%EF%BC%9F/",target:"_blank",rel:"noopener noreferrer"};function u(b,m){const t=i("ExternalLinkIcon");return r(),o("div",null,[d,n("ul",null,[n("li",null,[n("a",g,[e("既然有 HTTP 协议，为什么还要有 RPC"),a(t)])]),n("li",null,[n("a",c,[e("TCP 粘包 数据包：我只是犯了每个数据包都会犯的错 |硬核图解"),a(t)])]),n("li",null,[n("a",E,[e("动图图解！既然 IP 层会分片，为什么 TCP 层也还要分段？"),a(t)])])])])}const v=s(l,[["render",u],["__file","给32位系统装8g内存条能用吗？为什么？.html.vue"]]),A=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%BB%9932%E4%BD%8D%E7%B3%BB%E7%BB%9F%E8%A3%858g%E5%86%85%E5%AD%98%E6%9D%A1%E8%83%BD%E7%94%A8%E5%90%97%EF%BC%9F%E4%B8%BA%E4%BB%80%E4%B9%88%EF%BC%9F.html","title":"给32位系统装8g内存条能用吗？为什么？","lang":"zh-CN","frontmatter":{"title":"给32位系统装8g内存条能用吗？为什么？","date":"2022-03-09T22:57:55.000Z","tags":null,"categories":"图解操作系统","description":" 关于 32 位和 64 位，这个概念一直让人比较懵。 在买电脑的时候，我们看到过32 位和 64 位 CPU。 下软件的时候，我们也看到过32 位或 64 位的软件。 就连装虚拟机的时候，我们也看过32 位和 64 位的系统。 在写代码的时候，我们的数值，也可以定义为int32 或者 int64。 我们当然很清楚，装软件的时候，一般 64 位的系统就...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%BB%9932%E4%BD%8D%E7%B3%BB%E7%BB%9F%E8%A3%858g%E5%86%85%E5%AD%98%E6%9D%A1%E8%83%BD%E7%94%A8%E5%90%97%EF%BC%9F%E4%B8%BA%E4%BB%80%E4%B9%88%EF%BC%9F.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"给32位系统装8g内存条能用吗？为什么？"}],["meta",{"property":"og:description","content":" 关于 32 位和 64 位，这个概念一直让人比较懵。 在买电脑的时候，我们看到过32 位和 64 位 CPU。 下软件的时候，我们也看到过32 位或 64 位的软件。 就连装虚拟机的时候，我们也看过32 位和 64 位的系统。 在写代码的时候，我们的数值，也可以定义为int32 或者 int64。 我们当然很清楚，装软件的时候，一般 64 位的系统就..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.xiaobaidebug.top/image/421646663617_.pic_hd.jpg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-19T03:57:35.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"给32位系统装8g内存条能用吗？为什么？"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:published_time","content":"2022-03-09T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-02-19T03:57:35.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"给32位系统装8g内存条能用吗？为什么？\\",\\"image\\":[\\"https://cdn.xiaobaidebug.top/image/421646663617_.pic_hd.jpg\\",\\"https://cdn.xiaobaidebug.top/image/%E4%BB%8E%E9%AB%98%E7%BA%A7%E8%AF%AD%E8%A8%80%E5%88%B0%E6%9C%BA%E5%99%A8%E7%A0%81.drawio-20220419210021874.png\\",\\"https://cdn.xiaobaidebug.top/image/%E8%BF%9B%E7%A8%8B%E5%86%85%E5%AD%98%E4%B8%8ECPU%E7%9A%84%E6%89%A7%E8%A1%8C%E9%80%BB%E8%BE%91.drawio-20220419210036155.png\\",\\"https://cdn.xiaobaidebug.top/image/%E4%B8%89%E7%B1%BB%E6%80%BB%E7%BA%BF.png\\",\\"https://cdn.xiaobaidebug.top/image/32%E5%92%8C64%E4%BD%8D%E7%9A%84%E5%86%85%E5%AD%98%E5%B7%AE%E5%BC%82.png\\",\\"https://cdn.xiaobaidebug.top/image/PAE%E8%83%BD%E8%AE%A932%E4%BD%8D%E7%B3%BB%E7%BB%9F%E8%8E%B7%E5%BE%97%E5%A4%A7%E4%BA%8E4G%E7%9A%84%E5%86%85%E5%AD%98.drawio.png\\",\\"https://cdn.xiaobaidebug.top/1696069689495.png\\"],\\"datePublished\\":\\"2022-03-09T22:57:55.000Z\\",\\"dateModified\\":\\"2024-02-19T03:57:35.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"从代码到到可执行文件","slug":"从代码到到可执行文件","link":"#从代码到到可执行文件","children":[]},{"level":2,"title":"从可执行文件到进程","slug":"从可执行文件到进程","link":"#从可执行文件到进程","children":[{"level":3,"title":"CPU 位数的含义","slug":"cpu-位数的含义","link":"#cpu-位数的含义","children":[]},{"level":3,"title":"系统和软件的位数的含义","slug":"系统和软件的位数的含义","link":"#系统和软件的位数的含义","children":[]},{"level":3,"title":"程序数值 int32 和 int64 的含义","slug":"程序数值-int32-和-int64-的含义","link":"#程序数值-int32-和-int64-的含义","children":[]},{"level":3,"title":"32 位的 CPU 能进行 int64 位的数值计算吗？","slug":"_32-位的-cpu-能进行-int64-位的数值计算吗","link":"#_32-位的-cpu-能进行-int64-位的数值计算吗","children":[]}]},{"level":2,"title":"系统位数会限制内存吗？","slug":"系统位数会限制内存吗","link":"#系统位数会限制内存吗","children":[{"level":3,"title":"32 位 CPU 和系统插 8g 内存条，能用吗？","slug":"_32-位-cpu-和系统插-8g-内存条-能用吗","link":"#_32-位-cpu-和系统插-8g-内存条-能用吗","children":[]},{"level":3,"title":"64 位 CPU 装 32 位操作系统，再插上 8g 的内存条，寻址能力还是 4G 吗","slug":"_64-位-cpu-装-32-位操作系统-再插上-8g-的内存条-寻址能力还是-4g-吗","link":"#_64-位-cpu-装-32-位操作系统-再插上-8g-的内存条-寻址能力还是-4g-吗","children":[]}]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]},{"level":2,"title":"最后","slug":"最后","link":"#最后","children":[]},{"level":2,"title":"文章推荐：","slug":"文章推荐","link":"#文章推荐","children":[]}],"git":{"createdTime":1708315055000,"updatedTime":1708315055000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":13.27,"words":3980},"filePathRelative":"计算机基础/操作系统/核心知识点/给32位系统装8g内存条能用吗？为什么？.md","localizedDate":"2022年3月9日","autoDesc":true}');export{v as comp,A as data};
