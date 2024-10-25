import{_ as e}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as i,a,o as g}from"./app-Ciq-_e96.js";const o={};function n(p,t){return g(),i("div",null,t[0]||(t[0]=[a(`<figure><img src="https://cdn.xiaobaidebug.top/image/默认文件1616129034230.png" alt="默认文件1616129034230" tabindex="0" loading="lazy"><figcaption>默认文件1616129034230</figcaption></figure><p>事情从一个健身教练说起吧。</p><figure><img src="https://cdn.xiaobaidebug.top/image/0073Cjx6ly1gkbnt17cilj30j60jxgmz.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>李东，自称亚健康终结者，尝试使用互联网+的模式拓展自己的业务。在某款新开发的聊天软件<strong>琛琛</strong>上发布广告。</p><p>键盘说来就来。疯狂发送&quot;李东&quot;，回车发送！，&quot;亚健康终结者&quot;，再回车发送！</p><figure><img src="https://cdn.xiaobaidebug.top/image/9150e4e5jw1fcfryt6ztqg205k041wey.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>还记得<strong>四层网络协议</strong>长什么样子吗？</p><figure><img src="https://cdn.xiaobaidebug.top/image/四层网络协议1.png" alt="四层网络协议" tabindex="0" loading="lazy"><figcaption>四层网络协议</figcaption></figure><p>四层网络模型每层各司其职，消息在进入每一层时都会多加一个<strong>报头</strong>，每多一个报头可以理解为<strong>数据报多戴一顶帽子</strong>。这个报头上面记录着消息从哪来，到哪去，以及消息多长等信息。比如，<strong><code>mac头部</code>记录的是硬件的唯一地址，<code>IP头</code>记录的是从哪来和到哪去，传输层头记录到是到达目的主机后具体去哪个进程</strong>。</p><p>在从消息发到网络的时候给消息带上报头，消息和纷繁复杂的网络中通过这些信息在路由器间流转，最后到达目的机器上，接受者再通过这些报头，一步一步还原出发送者最原始要发送的消息。</p><figure><img src="https://cdn.xiaobaidebug.top/image/四层网络协议对应的消息体变化.png" alt="四层网络协议 (1)" tabindex="0" loading="lazy"><figcaption>四层网络协议 (1)</figcaption></figure><h2 id="为什么要将数据切片" tabindex="-1"><a class="header-anchor" href="#为什么要将数据切片"><span>为什么要将数据切片</span></a></h2><p>软件<strong>琛琛</strong>是属于<strong>应用层</strong>上的。</p><p>而&quot;李东&quot;，&quot;亚健康终结者&quot;这两条消息在进入传输层时使用的是<strong>传输层上的 TCP 协议</strong>。消息在进入**传输层（TCP）**时会被切片为一个个数据包。这个数据包的长度是<code>MSS</code>。</p><p>可以把网络比喻为一个水管，是有一定的<strong>粗细</strong>的，这个粗细由<strong>网络接口层（数据链路层）<strong>提供给</strong>网络层</strong>，一般认为是的<code>MTU</code>（1500），直接传入整个消息，会超过水管的最大承受范围，那么，就需要进行切片，成为一个个数据包，这样消息才能正常通过“水管”。</p><figure><img src="https://cdn.xiaobaidebug.top/image/数据分片1.png" alt="数据分片" tabindex="0" loading="lazy"><figcaption>数据分片</figcaption></figure><h2 id="mtu-和-mss-有什么区别" tabindex="-1"><a class="header-anchor" href="#mtu-和-mss-有什么区别"><span>MTU 和 MSS 有什么区别</span></a></h2><figure><img src="https://cdn.xiaobaidebug.top/image/MSS和MTU的区别.png" alt="MSS和MTU的区别" tabindex="0" loading="lazy"><figcaption>MSS和MTU的区别</figcaption></figure><ul><li><p><strong>MTU: Maximum Transmit Unit</strong>，最大传输单元。 由<strong>网络接口层（数据链路层）<strong>提供给</strong>网络层</strong>最大一次传输数据的大小；一般 MTU=<strong>1500 Byte</strong>。<br> 假设 IP 层有 &lt;= 1500 byte 需要发送，只需要一个 IP 包就可以完成发送任务；假设 IP 层有&gt; 1500 byte 数据需要发送，需要分片才能完成发送，分片后的 IP Header ID 相同。</p></li><li><p><strong>MSS：Maximum Segment Size</strong> 。 TCP 提交给 IP 层最大分段大小，不包含 TCP Header 和 TCP Option，只包含 TCP Payload ，MSS 是 TCP 用来限制应用层最大的发送字节数。<br> 假设 MTU= 1500 byte，那么 <strong>MSS = 1500- 20(IP Header) -20 (TCP Header) = 1460 byte</strong>，如果应用层有 <strong>2000 byte</strong> 发送，那么需要两个切片才可以完成发送，第一个 TCP 切片 = 1460，第二个 TCP 切片 = 540。</p></li></ul><h2 id="什么是粘包" tabindex="-1"><a class="header-anchor" href="#什么是粘包"><span>什么是粘包</span></a></h2><p>那么当李东在手机上键入&quot;李东&quot;&quot;亚健康终结者&quot;的时候，在 TCP 中把消息分成 MSS 大小后，消息顺着网线顺利发出。</p><figure><img src="https://cdn.xiaobaidebug.top/image/发送消息到网络1.jpg" alt="发送消息到网络" tabindex="0" loading="lazy"><figcaption>发送消息到网络</figcaption></figure><p>网络稳得很，将消息分片传到了对端手机 B 上。经过 TCP 层消息重组。变成&quot;李东亚健康终结者&quot;这样的<strong>字节流（stream）</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/image/消息从网络接收.png" alt="消息从网络接收" tabindex="0" loading="lazy"><figcaption>消息从网络接收</figcaption></figure><p>但由于聊天软件<strong>琛琛</strong>是新开发的，而且开发者叫<strong>小白</strong>，完了，是个<strong>臭名昭著的造 bug 工程师</strong>。经过他的代码，在处理<strong>字节流</strong>的时候消息从&quot;李东&quot;，&quot;亚健康终结者&quot;变成了&quot;李东亚&quot;，&quot;健康终结者&quot;。&quot;李东&quot;作为上一个包的内容与下一个包里的&quot;亚&quot;粘在了一起被错误地当成了一个数据包解析了出来。这就是所谓的<strong>粘包</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/image/testcolour-20210319081110880.png" alt="消息对比" tabindex="0" loading="lazy"><figcaption>消息对比</figcaption></figure><p>一个号称<strong>健康终结者</strong>的健身教练，大概运气也不会很差吧，就祝他客源滚滚吧。</p><h2 id="为什么会出现粘包" tabindex="-1"><a class="header-anchor" href="#为什么会出现粘包"><span>为什么会出现粘包</span></a></h2><p>那就要从 TCP 是啥说起。</p><p><strong>TCP，Transmission Control Protocol</strong>。传输控制协议，是一种面向连接的、可靠的、基于<strong>字节流</strong>的传输层通信协议。</p><figure><img src="https://cdn.xiaobaidebug.top/image/tcp是什么.png" alt="TCP是什么" tabindex="0" loading="lazy"><figcaption>TCP是什么</figcaption></figure><p>其中跟<strong>粘包</strong>关系最大的就是<strong>基于字节流</strong>这个特点。</p><p>字节流可以理解为一个双向的通道里流淌的数据，这个<strong>数据</strong>其实就是我们常说的二进制数据，简单来说就是一大堆 01 串。这些 01 串之间<strong>没有任何边界</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/image/二进制字节流.png" alt="二进制字节流" tabindex="0" loading="lazy"><figcaption>二进制字节流</figcaption></figure><p>应用层传到 TCP 协议的数据，不是以<strong>消息报为单位</strong>向目的主机发送，而是以<strong>字节流</strong>的方式发送到下游，这些数据可能被<strong>切割和组装</strong>成各种数据包，接收端收到这些数据包后没有正确还原原来的消息，因此出现粘包现象。</p><h2 id="为什么要组装发送的数据" tabindex="-1"><a class="header-anchor" href="#为什么要组装发送的数据"><span>为什么要组装发送的数据</span></a></h2><p>上面提到 TCP <strong>切割</strong>数据包是为了能顺利通过网络这根水管。相反，还有一个<strong>组装</strong>的情况。如果前后两次 TCP 发的数据都远小于 MSS，比如就几个字节，每次都单独发送这几个字节，就比较<strong>浪费</strong>网络 io 。</p><figure><img src="https://cdn.xiaobaidebug.top/image/正常发送数据包2.png" alt="正常发送数据包" tabindex="0" loading="lazy"><figcaption>正常发送数据包</figcaption></figure><p>比如小白爸让小白出门给买一瓶酱油，小白出去买酱油回来了。小白妈又让小白出门买一瓶醋回来。小白前后结结实实跑了两趟，影响了打游戏的时间。</p><p>优化的方法也比较简单。当小白爸让小白去买酱油的时候，小白先<strong>等待</strong>，继续打会游戏，这时候如果小白妈让小白买瓶醋回来，小白可以一次性带着两个需求出门，再把东西带回来。</p><p>上面说的其实就是<code>TCP</code>的 <strong>Nagle 算法</strong>优化，目的是为了避免发送小的数据包。</p><p>在 Nagle 算法开启的状态下，数据包在以下两个情况会被发送：</p><ul><li>如果包长度达到<code>MSS</code>（或含有<code>Fin</code>包），立刻发送，否则<strong>等待</strong>下一个包到来；如果下一包到来后两个包的总长度超过<code>MSS</code>的话，就会进行拆分发送；</li><li>等待超时（一般为<code>200ms</code>），第一个包没到<code>MSS</code>长度，但是又迟迟等不到第二个包的到来，则立即发送。</li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/negle2.png" alt="Nagle2" tabindex="0" loading="lazy"><figcaption>Nagle2</figcaption></figure><ul><li>由于启动了<strong>Nagle 算法</strong>， msg1 小于 mss ，此时等待<code>200ms</code>内来了一个 msg2 ，msg1 + msg2 &gt; MSS，因此把 msg2 分为 msg2(1) 和 msg2(2)，msg1 + msg2(1) 包的大小为<code>MSS</code>。此时发送出去。</li><li>剩余的 msg2(2) 也等到了 msg3， 同样 msg2(2) + msg3 &gt; MSS，因此把 msg3 分为 msg3(1) 和 msg3(2)，msg2(2) + msg3(1) 作为一个包发送。</li><li>剩余的 msg3(2) 长度不足<code>mss</code>，同时在<code>200ms</code>内没有等到下一个包，等待超时，直接发送。</li><li>此时三个包虽然在图里<strong>颜色不同</strong>，但是实际场景中，他们都是<strong>一整个 01 串</strong>，如果处理开发者把第一个收到的 msg1 + msg2(1) 就当做是一个完整消息进行处理，就会看上去就<strong>像是两个包粘在一起</strong>，就会导致<strong>粘包问题</strong>。</li></ul><h2 id="关掉-nagle-算法就不会粘包了吗" tabindex="-1"><a class="header-anchor" href="#关掉-nagle-算法就不会粘包了吗"><span>关掉 Nagle 算法就不会粘包了吗？</span></a></h2><p><strong>Nagle</strong> 算法其实是个<strong>有些年代</strong>的东西了，诞生于 1984 年。对于应用程序一次发送一字节数据的场景，如果没有 Nagle 的优化，这样的包立马就发出去了，会导致网络由于太多的包而过载。</p><p>但是今天网络环境比以前好太多，Nagle 的优化帮助就没那么大了。而且它的延迟发送，有时候还可能导致调用延时变大，比如打游戏的时候，你操作如此丝滑，但却因为 Nagle 算法延迟发送导致慢了一拍，就问你难受不难受。</p><p>所以现在<strong>一般也会把它关掉</strong>。</p><p>看起来，Nagle 算法的优化作用貌似不大，还会导致<strong>粘包&quot;问题&quot;</strong>。那么是不是关掉这个算法就可以解决掉这个**粘包&quot;问题&quot;**呢？</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>TCP_NODELAY <span class="token operator">=</span> <span class="token number">1</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cdn.xiaobaidebug.top/image/关闭negle就不会粘包了吗.png" alt="关闭Nagle就不会粘包了吗" tabindex="0" loading="lazy"><figcaption>关闭Nagle就不会粘包了吗</figcaption></figure><ul><li>接受端应用层在收到 <strong>msg1</strong> 时立马就取走了，那此时 <strong>msg1</strong> 没粘包问题</li><li>**msg2 **到了后，应用层在忙，没来得及取走，就呆在 <strong>TCP Recv Buffer</strong> 中了</li><li>**msg3 **此时也到了，跟 <strong>msg2</strong> 和 <strong>msg3</strong> 一起放在了 <strong>TCP Recv Buffer</strong> 中</li><li>这时候应用层忙完了，来取数据，图里是两个颜色作区分，但实际场景中<strong>都是 01 串</strong>，此时一起取走，发现还是粘包。</li></ul><p>因此，就算关闭 Nagle 算法，接收数据端的应用层没有及时读取 TCP Recv Buffer 中的数据，还是会发生粘包。</p><figure><img src="https://cdn.xiaobaidebug.top/image/image-20210319125906894.png" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="怎么处理粘包" tabindex="-1"><a class="header-anchor" href="#怎么处理粘包"><span>怎么处理粘包</span></a></h2><p>粘包出现的根本原因是不确定<strong>消息的边界</strong>。接收端在面对**&quot;无边无际&quot;的二进制流<strong>的时候，根本不知道收了多少 01 才算</strong>一个消息**。一不小心拿多了就说是<strong>粘包</strong>。其实粘包根本不是 TCP 的问题，是使用者对于 TCP 的理解有误导致的一个问题。</p><p>只要在发送端每次发送消息的时候给消息<strong>带上识别消息边界的信息</strong>，接收端就可以根据这些信息识别出消息的边界，从而区分出每个消息。</p><p>常见的方法有</p><ul><li><p>加入特殊标志</p><figure><img src="https://cdn.xiaobaidebug.top/image/消息边界头尾标志.png" alt="消息边界头尾标志" tabindex="0" loading="lazy"><figcaption>消息边界头尾标志</figcaption></figure><p>可以通过特殊的标志作为头尾，比如当收到了<code>0xfffffe</code>或者回车符，则认为收到了新消息的头，此时继续取数据，直到收到下一个头标志<code>0xfffffe</code>或者尾部标记，才认为是一个完整消息。类似的像 HTTP 协议里当使用 <strong>chunked 编码</strong> 传输时，使用若干个 chunk 组成消息，最后由一个标明长度为 0 的 chunk 结束。</p></li><li><p>加入消息长度信息</p></li></ul><figure><img src="https://cdn.xiaobaidebug.top/image/消息边界长度标志.png" alt="消息边界长度标志" tabindex="0" loading="lazy"><figcaption>消息边界长度标志</figcaption></figure><p>这个一般配合上面的特殊标志一起使用，在收到头标志时，里面还可以带上消息长度，以此表明在这之后多少 byte 都是属于这个消息的。如果在这之后正好有符合长度的 byte，则取走，作为一个完整消息给应用层使用。在实际场景中，HTTP 中的<code>Content-Length</code>就起了类似的作用，当接收端收到的消息长度小于 Content-Length 时，说明还有些消息没收到。那接收端会一直等，直到拿够了消息或超时，关于这一点<a href="/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%A1%AC%E6%A0%B8%EF%BC%81%E6%BC%AB%E7%94%BB%E5%9B%BE%E8%A7%A3HTTP%E7%9F%A5%E8%AF%86%E7%82%B9_%E9%9D%A2%E8%AF%95%E9%A2%98">上一篇文章</a>里有更详细的说明。</p><figure><img src="https://cdn.xiaobaidebug.top/image/006mowZngy1fu63g3y5g1j309q09g3yu.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可能这时候会有朋友会问，采用<code>0xfffffe</code>标志位，用来标志一个数据包的开头，你就不怕你发的某个数据里正好有这个内容吗？</p><figure><img src="https://cdn.xiaobaidebug.top/image/69db3af78753efb7.gif" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>是的，<strong>怕</strong>，所以一般除了这个标志位，发送端在发送时还会加入各种校验字段（<code>校验和</code>或者对整段完整数据进行 <code>CRC</code> 之后获得的数据）放在标志位后面，在接收端拿到整段数据后校验下确保它就是发送端发来的完整数据。</p><figure><img src="https://cdn.xiaobaidebug.top/image/消息边界头尾加校验标志.png" alt="消息边界头尾加校验标志" tabindex="0" loading="lazy"><figcaption>消息边界头尾加校验标志</figcaption></figure><h2 id="udp-会粘包吗" tabindex="-1"><a class="header-anchor" href="#udp-会粘包吗"><span>UDP 会粘包吗</span></a></h2><p>跟 <code>TCP</code> 同为传输层的另一个协议，<strong>UDP，User Datagram Protocol</strong>。用户数据包协议，是面向无连接，不可靠的，基于<strong>数据报</strong>的传输层通信协议。</p><figure><img src="https://cdn.xiaobaidebug.top/image/udp是什么.png" alt="UDP是什么" tabindex="0" loading="lazy"><figcaption>UDP是什么</figcaption></figure><p>基于<strong>数据报</strong>是指无论应用层交给 UDP 多长的报文，UDP 都照样发送，即一次发送一个报文。至于如果数据包太长，需要分片，那也是 IP 层的事情，大不了效率低一些。UDP 对应用层交下来的报文，既不合并，也不拆分，而是保留这些报文的边界。而接收方在接收数据报的时候，也不会像面对 TCP 无穷无尽的二进制流那样不清楚啥时候能结束。正因为<strong>基于数据报</strong>和<strong>基于字节流</strong>的差异，<strong>TCP 发送端发 10 次字节流数据，而这时候接收端可以分 100 次去取数据，每次取数据的长度可以根据处理能力作调整；但 UDP 发送端发了 10 次数据报，那接收端就要在 10 次收完，且发了多少，就取多少，确保每次都是一个完整的数据报。</strong></p><p>我们先看下<strong>IP 报头</strong></p><figure><img src="https://cdn.xiaobaidebug.top/image/ip报头2.png" alt="ip报头" tabindex="0" loading="lazy"><figcaption>ip报头</figcaption></figure><p>注意这里面是有一个 16 位的总长度的，意味着 IP 报头里记录了整个 IP 包的总长度。接着我们再看下 <strong>UDP 的报头</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/image/udp报头4.png" alt="UDP报头" tabindex="0" loading="lazy"><figcaption>UDP报头</figcaption></figure><p>在报头中有<code>16bit</code>用于指示 <strong>UDP 数据报文的长度</strong>，假设这个长度是 n ，以此作为<strong>数据边界</strong>。因此在接收端的应用层能清晰地将不同的数据报文区分开，从报头开始取 n 位，就是一个<strong>完整的</strong>数据报，从而避免粘包和拆包的问题。</p><p>当然，就算没有这个位（<strong>16 位 UDP 长度</strong>），因为 IP 的头部已经包含了数据的<strong>总长度</strong>信息，此时如果 IP 包（网络层）里放的数据使用的协议是 UDP（传输层），那么这个<strong>总长度</strong>其实就包含了 UDP 的头部和 UDP 的数据。</p><p>因为 UDP 的头部长度固定为 8 字节（ 1 字节= 8 位，8 字节= 64 位，上图中除了<code>数据和选项</code>以外的部分），那么这样就很容易的算出 UDP 的数据的长度了。因此说 UDP 的长度信息其实是冗余的。</p><figure><img src="https://cdn.xiaobaidebug.top/image/UDP数据长度-20210319074710451.png" alt="UDP数据长度" tabindex="0" loading="lazy"><figcaption>UDP数据长度</figcaption></figure><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>UDP Data 的长度 <span class="token operator">=</span> IP 总长度 - IP Header 长度 - UDP Header 长度
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cdn.xiaobaidebug.top/image/cb8849427e15334b.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>可以再来看下 <strong>TCP 的报头</strong></p><figure><img src="https://cdn.xiaobaidebug.top/image/tcp报头2.png" alt="tcp报头2" tabindex="0" loading="lazy"><figcaption>tcp报头2</figcaption></figure><p>TCP 首部里是没有长度这个信息的，跟 UDP 类似，同样可以通过下面的公式获得当前包的 TCP 数据长度。</p><div class="language-bash line-numbers-mode" data-ext="sh" data-title="sh"><pre class="language-bash"><code>TCP Data 的长度 <span class="token operator">=</span> IP 总长度 - IP Header 长度 - TCP Header 长度。
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><figure><img src="https://cdn.xiaobaidebug.top/image/tcp数据长度.png" alt="TCP数据长度" tabindex="0" loading="lazy"><figcaption>TCP数据长度</figcaption></figure><p>跟 UDP 不同在于，TCP 发送端在发的时候就<strong>不保证发的是一个完整的数据报</strong>，仅仅看成一连串无结构的字节流，这串字节流在接收端收到时哪怕知道长度也没用，因为它很可能只是某个完整消息的一部分。</p><h2 id="为什么长度字段冗余还要加到-udp-首部中" tabindex="-1"><a class="header-anchor" href="#为什么长度字段冗余还要加到-udp-首部中"><span>为什么长度字段冗余还要加到 UDP 首部中</span></a></h2><p>关于这一点，查了很多资料，<code>《 TCP-IP 详解（卷2）》</code>里说可能是因为要用于计算校验和。也有的说是因为 UDP 底层使用的可以不是 IP 协议，毕竟 IP 头里带了总长度，正好可以用于计算 UDP 数据的长度，万一 UDP 的底层不是 IP 层协议，而是其他网络层协议，就不能继续这么计算了。</p><p>但我觉得，最重要的原因是，IP 层是网络层的，而 UDP 是传输层的，到了传输层，数据包就已经不存在 IP 头信息了，那么此时的 UDP 数据会被放在 UDP 的 <code>Socket Buffer</code> 中。当应用层来不及取这个 UDP 数据报，那么两个数据报在数据层面其实都是一堆 01 串。此时读取第一个数据报的时候，会先读取到 UDP 头部，<strong>如果这时候 UDP 头不含 UDP 长度信息，那么应用层应该取多少数据才算完整的一个数据报呢</strong>？</p><p>因此 UDP 头的这个长度其实跟 TCP 为了防止粘包而在消息体里加入的边界信息是起一样的作用的。</p><figure><img src="https://cdn.xiaobaidebug.top/image/为什么UDP要冗余一个长度字段.png" alt="为什么UDP要冗余一个长度字段" tabindex="0" loading="lazy"><figcaption>为什么UDP要冗余一个长度字段</figcaption></figure><p>面试的时候咱就把这些全说出去，<strong>显得</strong>咱好像经过了深深的思考一样，面试官可能会觉得咱特别爱思考，<strong>加分加分</strong>。</p><p>如果我说错了，请把我的这篇文章转发给更多的人，让大家记住这个满嘴胡话的人，在关注之后狠狠的私信骂我，拜托了！</p><figure><img src="https://cdn.xiaobaidebug.top/image/dbdbee64f53762c2.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h2 id="ip-层有粘包问题吗" tabindex="-1"><a class="header-anchor" href="#ip-层有粘包问题吗"><span>IP 层有粘包问题吗</span></a></h2><p>IP 层会对大包进行切片，是不是也有粘包问题？</p><p>先说结论，不会。首先前文提到了，粘包其实是由于使用者无法正确区分消息边界导致的一个问题。</p><p>先看看 IP 层的切片分包是怎么回事。</p><figure><img src="https://cdn.xiaobaidebug.top/image/P分包与重组.png" alt="P分包与重组" tabindex="0" loading="lazy"><figcaption>P分包与重组</figcaption></figure><ul><li><p>如果消息过长，<code>IP层</code>会按 <strong>MTU 长度</strong>把消息分成 <strong>N 个切片</strong>，每个切片带有自身在<strong>包里的位置（offset）<strong>和</strong>同样的 IP 头信息</strong>。</p></li><li><p>各个切片在网络中进行传输。每个数据包切片可以在不同的路由中流转，然后<strong>在最后的终点汇合后再组装</strong>。</p></li><li><p>在接收端收到第一个切片包时会申请一块新内存，创建 IP 包的数据结构，等待其他切片分包数据到位。</p></li><li><p>等消息全部到位后就把整个消息包给到上层（传输层）进行处理。</p></li></ul><p>可以看出整个过程，<code>IP 层</code>从按长度切片到把切片组装成一个数据包的过程中，都只管运输，都不需要在意消息的边界和内容，都不在意消息内容了，那就不会有粘包一说了。</p><p><code>IP 层</code>表示：我只管把发送端给我的数据传到接收端就完了，我也不了解里头放了啥东西。</p><p>听起来就像 “<strong>我不管产品的需求傻不傻 X，我实现了就行，我不问，也懒得争了</strong>”，这思路值得每一位优秀的划水程序员学习，<strong>respect</strong>。</p><h2 id="总结" tabindex="-1"><a class="header-anchor" href="#总结"><span>总结</span></a></h2><p>粘包这个问题的根因是由于开发人员没有正确理解 TCP 面向字节流的数据传输方式，本身并不是 TCP 的问题，是开发者的问题。</p><ul><li>TCP 不管发送端要发什么，都基于字节流把数据发到接收端。这个字节流里可能包含上一次想要发的数据的部分信息。接收端根据需要在消息里加上识别消息边界的信息。不加就可能出现粘包问题。</li><li>TCP 粘包跟 Nagle 算法有关系，但关闭 Nagle 算法并不解决粘包问题。</li><li>UDP 是基于数据报的传输协议，不会有粘包问题。</li><li>IP 层也切片，但是因为不关心消息里有啥，因此有不会有粘包问题。</li><li><code>TCP</code> 发送端可以发 <code>10 次</code>字节流数据，接收端可以分 <code>100 次</code>去取；<code>UDP</code> 发送端发了 <code>10 次</code>数据报，那接收端就要在 <code>10 次</code>收完。</li></ul><p>数据包也只是按着 TCP 的方式进行组装和拆分，<strong>如果数据包有错，那数据包也只是犯了每个数据包都会犯的错而已</strong>。</p><p>最后，李东工作没了，而小白表示</p><figure><img src="https://cdn.xiaobaidebug.top/image/9150e4e5ly1frrh7t0l9jj20ey0cxq3a.jpg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><h1 id="文章推荐" tabindex="-1"><a class="header-anchor" href="#文章推荐"><span>文章推荐：</span></a></h1><ul><li><a href="/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/%E7%A1%AC%E6%A0%B8%EF%BC%81%E6%BC%AB%E7%94%BB%E5%9B%BE%E8%A7%A3HTTP%E7%9F%A5%E8%AF%86%E7%82%B9_%E9%9D%A2%E8%AF%95%E9%A2%98">硬核！漫画图解 HTTP 知识点+面试题</a></li></ul><h5 id="别说了-一起在知识的海洋里呛水吧" tabindex="-1"><a class="header-anchor" href="#别说了-一起在知识的海洋里呛水吧"><span>别说了，一起在知识的海洋里呛水吧</span></a></h5><p>关注公众号:【小白 debug】</p>`,114)]))}const d=e(o,[["render",n],["__file","TCP粘包！数据包：我只是犯了每个数据包都会犯的错，硬核图解.html.vue"]]),c=JSON.parse('{"path":"/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/TCP%E7%B2%98%E5%8C%85%EF%BC%81%E6%95%B0%E6%8D%AE%E5%8C%85%EF%BC%9A%E6%88%91%E5%8F%AA%E6%98%AF%E7%8A%AF%E4%BA%86%E6%AF%8F%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E9%83%BD%E4%BC%9A%E7%8A%AF%E7%9A%84%E9%94%99%EF%BC%8C%E7%A1%AC%E6%A0%B8%E5%9B%BE%E8%A7%A3.html","title":"TCP粘包  数据包：我只是犯了每个数据包都会犯的错 |硬核图解","lang":"zh-CN","frontmatter":{"title":"TCP粘包  数据包：我只是犯了每个数据包都会犯的错 |硬核图解","date":"2021-03-26T22:57:55.000Z","tags":null,"categories":"图解网络","description":"默认文件1616129034230默认文件1616129034230 事情从一个健身教练说起吧。 李东，自称亚健康终结者，尝试使用互联网+的模式拓展自己的业务。在某款新开发的聊天软件琛琛上发布广告。 键盘说来就来。疯狂发送\\"李东\\"，回车发送！，\\"亚健康终结者\\"，再回车发送！ 还记得四层网络协议长什么样子吗？ 四层网络协议四层网络协议 四层网络模型每层各...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/TCP%E7%B2%98%E5%8C%85%EF%BC%81%E6%95%B0%E6%8D%AE%E5%8C%85%EF%BC%9A%E6%88%91%E5%8F%AA%E6%98%AF%E7%8A%AF%E4%BA%86%E6%AF%8F%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E9%83%BD%E4%BC%9A%E7%8A%AF%E7%9A%84%E9%94%99%EF%BC%8C%E7%A1%AC%E6%A0%B8%E5%9B%BE%E8%A7%A3.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"TCP粘包  数据包：我只是犯了每个数据包都会犯的错 |硬核图解"}],["meta",{"property":"og:description","content":"默认文件1616129034230默认文件1616129034230 事情从一个健身教练说起吧。 李东，自称亚健康终结者，尝试使用互联网+的模式拓展自己的业务。在某款新开发的聊天软件琛琛上发布广告。 键盘说来就来。疯狂发送\\"李东\\"，回车发送！，\\"亚健康终结者\\"，再回车发送！ 还记得四层网络协议长什么样子吗？ 四层网络协议四层网络协议 四层网络模型每层各..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.xiaobaidebug.top/image/%E9%BB%98%E8%AE%A4%E6%96%87%E4%BB%B61616129034230.png"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-12T13:55:00.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"TCP粘包  数据包：我只是犯了每个数据包都会犯的错 |硬核图解"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:published_time","content":"2021-03-26T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-12T13:55:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TCP粘包  数据包：我只是犯了每个数据包都会犯的错 |硬核图解\\",\\"image\\":[\\"https://cdn.xiaobaidebug.top/image/%E9%BB%98%E8%AE%A4%E6%96%87%E4%BB%B61616129034230.png\\",\\"https://cdn.xiaobaidebug.top/image/0073Cjx6ly1gkbnt17cilj30j60jxgmz.jpg\\",\\"https://cdn.xiaobaidebug.top/image/9150e4e5jw1fcfryt6ztqg205k041wey.gif\\",\\"https://cdn.xiaobaidebug.top/image/%E5%9B%9B%E5%B1%82%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE1.png\\",\\"https://cdn.xiaobaidebug.top/image/四层网络协议对应的消息体变化.png\\",\\"https://cdn.xiaobaidebug.top/image/%E6%95%B0%E6%8D%AE%E5%88%86%E7%89%871.png\\",\\"https://cdn.xiaobaidebug.top/image/MSS和MTU的区别.png\\",\\"https://cdn.xiaobaidebug.top/image/发送消息到网络1.jpg\\",\\"https://cdn.xiaobaidebug.top/image/消息从网络接收.png\\",\\"https://cdn.xiaobaidebug.top/image/testcolour-20210319081110880.png\\",\\"https://cdn.xiaobaidebug.top/image/tcp是什么.png\\",\\"https://cdn.xiaobaidebug.top/image/二进制字节流.png\\",\\"https://cdn.xiaobaidebug.top/image/%E6%AD%A3%E5%B8%B8%E5%8F%91%E9%80%81%E6%95%B0%E6%8D%AE%E5%8C%852.png\\",\\"https://cdn.xiaobaidebug.top/image/negle2.png\\",\\"https://cdn.xiaobaidebug.top/image/关闭negle就不会粘包了吗.png\\",\\"https://cdn.xiaobaidebug.top/image/image-20210319125906894.png\\",\\"https://cdn.xiaobaidebug.top/image/%E6%B6%88%E6%81%AF%E8%BE%B9%E7%95%8C%E5%A4%B4%E5%B0%BE%E6%A0%87%E5%BF%97.png\\",\\"https://cdn.xiaobaidebug.top/image/消息边界长度标志.png\\",\\"https://cdn.xiaobaidebug.top/image/006mowZngy1fu63g3y5g1j309q09g3yu.jpg\\",\\"https://cdn.xiaobaidebug.top/image/69db3af78753efb7.gif\\",\\"https://cdn.xiaobaidebug.top/image/%E6%B6%88%E6%81%AF%E8%BE%B9%E7%95%8C%E5%A4%B4%E5%B0%BE%E5%8A%A0%E6%A0%A1%E9%AA%8C%E6%A0%87%E5%BF%97.png\\",\\"https://cdn.xiaobaidebug.top/image/udp是什么.png\\",\\"https://cdn.xiaobaidebug.top/image/ip%E6%8A%A5%E5%A4%B42.png\\",\\"https://cdn.xiaobaidebug.top/image/udp%E6%8A%A5%E5%A4%B44.png\\",\\"https://cdn.xiaobaidebug.top/image/UDP%E6%95%B0%E6%8D%AE%E9%95%BF%E5%BA%A6-20210319074710451.png\\",\\"https://cdn.xiaobaidebug.top/image/cb8849427e15334b.jpeg\\",\\"https://cdn.xiaobaidebug.top/image/tcp%E6%8A%A5%E5%A4%B42.png\\",\\"https://cdn.xiaobaidebug.top/image/tcp数据长度.png\\",\\"https://cdn.xiaobaidebug.top/image/%E4%B8%BA%E4%BB%80%E4%B9%88UDP%E8%A6%81%E5%86%97%E4%BD%99%E4%B8%80%E4%B8%AA%E9%95%BF%E5%BA%A6%E5%AD%97%E6%AE%B5.png\\",\\"https://cdn.xiaobaidebug.top/image/dbdbee64f53762c2.jpeg\\",\\"https://cdn.xiaobaidebug.top/image/P%E5%88%86%E5%8C%85%E4%B8%8E%E9%87%8D%E7%BB%84.png\\",\\"https://cdn.xiaobaidebug.top/image/9150e4e5ly1frrh7t0l9jj20ey0cxq3a.jpg\\"],\\"datePublished\\":\\"2021-03-26T22:57:55.000Z\\",\\"dateModified\\":\\"2024-05-12T13:55:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/TCP%E7%B2%98%E5%8C%85%EF%BC%81%E6%95%B0%E6%8D%AE%E5%8C%85%EF%BC%9A%E6%88%91%E5%8F%AA%E6%98%AF%E7%8A%AF%E4%BA%86%E6%AF%8F%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E9%83%BD%E4%BC%9A%E7%8A%AF%E7%9A%84%E9%94%99%EF%BC%8C%E7%A1%AC%E6%A0%B8%E5%9B%BE%E8%A7%A3.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9F%BA%E7%A1%80/%E7%BD%91%E7%BB%9C%E5%9F%BA%E7%A1%80/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/TCP%E7%B2%98%E5%8C%85%EF%BC%81%E6%95%B0%E6%8D%AE%E5%8C%85%EF%BC%9A%E6%88%91%E5%8F%AA%E6%98%AF%E7%8A%AF%E4%BA%86%E6%AF%8F%E4%B8%AA%E6%95%B0%E6%8D%AE%E5%8C%85%E9%83%BD%E4%BC%9A%E7%8A%AF%E7%9A%84%E9%94%99%EF%BC%8C%E7%A1%AC%E6%A0%B8%E5%9B%BE%E8%A7%A3.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"TCP粘包  数据包：我只是犯了每个数据包都会犯的错 |硬核图解"}],["meta",{"property":"og:description","content":"默认文件1616129034230默认文件1616129034230 事情从一个健身教练说起吧。 李东，自称亚健康终结者，尝试使用互联网+的模式拓展自己的业务。在某款新开发的聊天软件琛琛上发布广告。 键盘说来就来。疯狂发送\\"李东\\"，回车发送！，\\"亚健康终结者\\"，再回车发送！ 还记得四层网络协议长什么样子吗？ 四层网络协议四层网络协议 四层网络模型每层各..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-05-12T13:55:00.000Z"}],["meta",{"property":"article:published_time","content":"2021-03-26T22:57:55.000Z"}],["meta",{"property":"article:modified_time","content":"2024-05-12T13:55:00.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"TCP粘包  数据包：我只是犯了每个数据包都会犯的错 |硬核图解\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2021-03-26T22:57:55.000Z\\",\\"dateModified\\":\\"2024-05-12T13:55:00.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"为什么要将数据切片","slug":"为什么要将数据切片","link":"#为什么要将数据切片","children":[]},{"level":2,"title":"MTU 和 MSS 有什么区别","slug":"mtu-和-mss-有什么区别","link":"#mtu-和-mss-有什么区别","children":[]},{"level":2,"title":"什么是粘包","slug":"什么是粘包","link":"#什么是粘包","children":[]},{"level":2,"title":"为什么会出现粘包","slug":"为什么会出现粘包","link":"#为什么会出现粘包","children":[]},{"level":2,"title":"为什么要组装发送的数据","slug":"为什么要组装发送的数据","link":"#为什么要组装发送的数据","children":[]},{"level":2,"title":"关掉 Nagle 算法就不会粘包了吗？","slug":"关掉-nagle-算法就不会粘包了吗","link":"#关掉-nagle-算法就不会粘包了吗","children":[]},{"level":2,"title":"怎么处理粘包","slug":"怎么处理粘包","link":"#怎么处理粘包","children":[]},{"level":2,"title":"UDP 会粘包吗","slug":"udp-会粘包吗","link":"#udp-会粘包吗","children":[]},{"level":2,"title":"为什么长度字段冗余还要加到 UDP 首部中","slug":"为什么长度字段冗余还要加到-udp-首部中","link":"#为什么长度字段冗余还要加到-udp-首部中","children":[]},{"level":2,"title":"IP 层有粘包问题吗","slug":"ip-层有粘包问题吗","link":"#ip-层有粘包问题吗","children":[]},{"level":2,"title":"总结","slug":"总结","link":"#总结","children":[]}],"git":{"createdTime":1708315055000,"updatedTime":1715522100000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":3},{"name":"xiaobai-tech","email":"948485496@qq.com","commits":1}]},"readingTime":{"minutes":17.45,"words":5236},"filePathRelative":"计算机基础/网络基础/核心知识点/TCP粘包！数据包：我只是犯了每个数据包都会犯的错，硬核图解.md","localizedDate":"2021年3月26日","autoDesc":true}');export{d as comp,c as data};
