import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as n,o as r,c as o,b as e,d as t,e as l,a}from"./app-BEl3s6_b.js";const p="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.021.jpeg",d="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.023.jpeg",c="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.024.jpeg",h="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.025.jpeg",g="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.026.jpeg",u={},f=a('<h1 id="微服务面试题" tabindex="-1"><a class="header-anchor" href="#微服务面试题"><span><strong>微服务面试题</strong></span></a></h1><h2 id="您对微服务有何了解" tabindex="-1"><a class="header-anchor" href="#您对微服务有何了解"><span>您对微服务有何了解？</span></a></h2><p>微服务，又称微服务架构，是一种架构风格，它将应用程序构建为以业务领域为模型的小型自治服务集合。通俗地说，你必须看到蜜蜂如何通过对齐六角形蜡细胞来构建它们的蜂窝状物。他们最初从使用各种材料的小部分开始，并继续从中构建一个大型蜂箱。这些细胞形成图案，产生坚固的结构，将蜂窝的特定部分固定在一起。这里，每个细胞独立于另一个细胞，但它也与其他细胞相关。这意味着对一个细胞的损害不会损害其他细胞，因此，蜜蜂可以在不影响完整蜂箱的情况下重建这些细胞。</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图1：微服务的蜂窝表示–微服务访谈问题</p><p>请参考上图。这里，每个六边形形状代表单独的服务组件。与蜜蜂的工作类似，每个敏捷团队都使用可用的框架和所选的技术堆栈构建单独的服务组件。就像在蜂箱中一样，每个服务组件形成一个强大的微服务架构，以提供更好的可扩展性。此外，敏捷团队可以单独处理每个服务组件的问题，而对整个应用程序没有影响或影响最小。</p><h2 id="说说微服务架构的优势" tabindex="-1"><a class="header-anchor" href="#说说微服务架构的优势"><span>说说微服务架构的优势</span></a></h2><table><thead><tr><th style="text-align:left;"></th><th style="text-align:left;"></th></tr></thead><tbody><tr><td style="text-align:left;">优势</td><td style="text-align:left;">说明</td></tr><tr><td style="text-align:left;"></td><td style="text-align:left;"></td></tr><tr><td style="text-align:left;">独立开发</td><td style="text-align:left;">所有微服务都可以根据各自的功能轻松开发</td></tr><tr><td style="text-align:left;">独立部署根据他们所提供的服务，可以在任何应用中单独部署故障隔离即使应用中的一个服务不起作用，系统仍然继续运行混合技术栈可以用不同的语言和技术来构建同一应用程序的不同服务粒度缩放各个组件可根据需要进行扩展，无需将所有组件融合到一起</td><td style="text-align:left;"></td></tr></tbody></table><h2 id="微服务有哪些特点" tabindex="-1"><a class="header-anchor" href="#微服务有哪些特点"><span>微服务有哪些特点？</span></a></h2><ul><li>解耦—系统内的服务很大程度上是分离的。因此，整个应用程序可以轻松构建，更改和扩展</li><li>组件化—微服务被视为可以轻松更换和升级的独立组件</li><li>业务能力—微服务非常简单，专注于单一功能</li><li>自治—开发人员和团队可以彼此独立工作，从而提高速度</li><li>持续交付—通过软件创建，测试和批准的系统自动化，允许频繁发布软件</li><li>责任—微服务不关注应用程序作为项目。相反，他们将应用程序视为他们负责的产品</li><li>分散治理—重点是使用正确的工具来做正确的工作。这意味着没有标准化模式或任何技术模式。开发人员可以自由选择最有用的工具来解决他们的问题</li><li>敏捷—微服务支持敏捷开发。任何新功能都可以快速开发并再次丢弃</li></ul><h2 id="微服务架构是什么样子的" tabindex="-1"><a class="header-anchor" href="#微服务架构是什么样子的"><span>微服务架构是什么样子的?</span></a></h2><p>通常传统的项目体积庞大，需求、设计、开发、测试、部署流程固定。新功能需要在原项目上做修改。</p><p>但是微服务可以看做是对大项目的拆分，是在快速迭代更新上线的需求下产生的。新的功能模块会发布成新的服务组件，与其他已发布的服务组件一同协作。 服务内部有多个生产者和消费者，通常以http rest的方式调用，服务总体以一个（或几个）服务的形式呈现给客户使用。</p><p>微服务架构是一种思想对微服务架构我们没有一个明确的定义，但简单来说微服务架构是：</p><p>采用一组服务的方式来构建一个应用，服务独立部署在不同的进程中，不同服务通过一些轻量级交互机制来通信，例如 RPC、HTTP 等，服务可独立扩展伸缩，每个服务定义了明确的边界，不同的服务甚至可以采用不同的编程语言来实现，由独立的团队来维护。</p>',15),m={href:"https://gokit.io/",target:"_blank",rel:"noopener noreferrer"},b=a("<p>微服务架构设计包括：</p><ol><li>服务熔断降级限流机制 熔断降级的概念(Rate Limiter 限流器,Circuit breaker 断路器).</li><li>框架调用方式解耦方式 Kit 或 Istio 或 Micro 服务发现(consul zookeeper kubeneters etcd ) RPC调用框架.</li><li>链路监控,zipkin和prometheus.</li><li>多级缓存.</li><li>网关 (kong gateway).</li><li>Docker部署管理 Kubenetters.</li><li>自动集成部署 CI/CD 实践.</li><li>自动扩容机制规则.</li><li>压测 优化.</li><li>Trasport 数据传输(序列化和反序列化).</li><li>Logging 日志.</li><li>Metrics 指针对每个请求信息的仪表盘化.</li></ol><p>微服务架构介绍详细的可以参考:</p>",3),x={href:"http://www.pst.ifi.lmu.de/Lehre/wise-14-15/mse/microservice-architectures.pdf",target:"_blank",rel:"noopener noreferrer"},_=a('<h2 id="微服务架构如何运作" tabindex="-1"><a class="header-anchor" href="#微服务架构如何运作"><span>微服务架构如何运作？</span></a></h2><p>微服务架构具有以下组件：</p><ul><li>客户端–来自不同设备的不同用户发送请求。</li><li>身份提供商–验证用户或客户身份并颁发安全令牌。</li><li>API 网关–处理客户端请求。</li><li>静态内容–容纳系统的所有内容。</li><li>管理–在节点上平衡服务并识别故障。</li><li>服务发现–查找微服务之间通信路径的指南。</li><li>内容交付网络–代理服务器及其数据中心的分布式网络。</li><li>远程服务–启用驻留在 IT 设备网络上的远程访问信息。</li></ul><h2 id="微服务架构的优缺点是什么" tabindex="-1"><a class="header-anchor" href="#微服务架构的优缺点是什么"><span>微服务架构的优缺点是什么？</span></a></h2><p>微服务架构的优点微服务架构的缺点自由使用不同的技术增加故障排除挑战每个微服务都侧重于单一功能由于远程呼叫而增加延迟支持单个可部署单元增加了配置和其他操作的工作量允许经常发布软件难以保持交易安全确保每项服务的安全性艰难地跨越各种便捷跟踪数据多个服务是并行开发和部署的难以在服务之间进行编码</p><h2 id="单片-soa-和微服务架构有什么区别" tabindex="-1"><a class="header-anchor" href="#单片-soa-和微服务架构有什么区别"><span>单片，SOA 和微服务架构有什么区别？</span></a></h2><figure><img src="'+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>单片 SOA 和微服务之间的比较–微服务访谈问题</p><ul><li>单片架构类似于大容器，其中应用程序的所有软件组件组装在一起并紧密封装。</li><li>一个面向服务的架构是一种相互通信服务的集合。通信可以涉及简单的数据传递，也可以涉及两个或多个协调某些活动的服务。</li><li>微服务架构是一种架构风格，它将应用程序构建为以业务域为模型的小型自治服务集合。</li></ul><h2 id="怎么做弹性扩缩容-原理是什么" tabindex="-1"><a class="header-anchor" href="#怎么做弹性扩缩容-原理是什么"><span>怎么做弹性扩缩容，原理是什么?</span></a></h2><p>弹性伸缩（Auto Scaling）根据您的业务需求和伸缩策略，为您自动调整计算资源。您可设置定时、周期或监控策略，恰到好处地增加或减少CVM实例，并完成实例配置，保证业务平稳健康运行。在需求高峰期时，弹性伸缩自动增加CVM实例的数量，以保证性能不受影响；当需求较低时，则会减少CVM实例数量以降低成本。弹性伸缩既适合需求稳定的应用程序，同时也适合每天、每周、每月使用量不停波动的应用程序。</p><h2 id="说一下中间件原理" tabindex="-1"><a class="header-anchor" href="#说一下中间件原理"><span>说一下中间件原理.</span></a></h2><p>中间件（middleware）是基础软件的一大类，属于可复用软件的范畴。中间件处于操作系统软件与用户的应用软件的中间。中间件在操作系统、网络和数据库之上，应用软件的下层，总的作用是为处于自己上层的应用软件提供运行与开发的环境，帮助用户灵活、高效地开发和集成复杂的应用软件 IDC的定义是：中间件是一种独立的系统软件或服务程序，分布式应用软件借助这种软件在不同的技术之间共享资源，中间件位于客户机服务器的操作系统之上，管理计算资源和网络通信。</p><p>中间件解决的问题是：</p><p>在中间件产生以前，应用软件直接使用操作系统、网络协议和数据库等开发，这些都是计算机最底层的东西，越底层越复杂，开发者不得不面临许多很棘手的问题，如操作系统的多样性，繁杂的网络程序设计、管理，复杂多变的网络环境，数据分散处理带来的不一致性问题、性能和效率、安全，等等。这些与用户的业务没有直接关系，但又必须解决，耗费了大量有限的时间和精力。于是，有人提出能不能将应用软件所要面临的共性问题进行提炼、抽象，在操作系统之上再形成一个可复用的部分，供成千上万的应用软件重复使用。这一技术思想最终构成了中间件这类的软件。中间件屏蔽了底层操作系统的复杂性，使程序开发人员面对一个简单而统一的开发环境，减少程序设计的复杂性，将注意力集中在自己的业务上，不必再为程序在不同系统软件上的移植而重复工作，从而大大减少了技术上的负担。</p><h2 id="在使用微服务架构时-您面临哪些挑战" tabindex="-1"><a class="header-anchor" href="#在使用微服务架构时-您面临哪些挑战"><span>在使用微服务架构时，您面临哪些挑战？</span></a></h2><p>开发一些较小的微服务听起来很容易，但开发它们时经常遇到的挑战如下。</p><ul><li>自动化组件：难以自动化，因为有许多较小的组件。因此，对于每个组件，我们必须遵循 Build，Deploy 和 Monitor 的各个阶段。</li><li>易感性：将大量组件维护在一起变得难以部署，维护，监控和识别问题。它需要在所有组件周围具有很好的感知能力。</li><li>配置管理：有时在各种环境中维护组件的配置变得困难。</li><li>调试：很难找到错误的每一项服务。维护集中式日志记录和仪表板以调试问题至关重要。</li></ul><h2 id="soa-和微服务架构之间的主要区别是什么" tabindex="-1"><a class="header-anchor" href="#soa-和微服务架构之间的主要区别是什么"><span>SOA 和微服务架构之间的主要区别是什么？</span></a></h2><p>SOA 和微服务之间的主要区别如下：</p><p>SOA 微服务</p><p>遵循“尽可能多的共享”架构方法遵循“尽可能少分享”架构方法重要性在于“业务功能”重用重要性在于“有界背景”的概念它们有共同的治理和标准它们专注于人们的合作和其他选择的自由使用企业服务总线（ESB）进行通信简单的消息系统</p><p>它们支持多种消息协议它们使用轻量级协议，如 HTTP/REST 等</p><p>单线程，通常使用 Event Loop 功能进行非多线程，有跟多的开销来处理 I/O</p><p>锁定 I/O 处理</p><p>最大化应用程序服务可重用性专注于解耦</p><p>传统的关系数据库更常用现代关系数据库更常用</p><p>系统的变化需要修改整体系统的变化是创造一种新的服务</p><p>DevOps/Continuous Delivery 正在变得流</p><p>专注于 DevOps/持续交付行，但还不是主流</p><h2 id="微服务有什么特点" tabindex="-1"><a class="header-anchor" href="#微服务有什么特点"><span>微服务有什么特点？</span></a></h2><p>您可以列出微服务的特征，如下所示：</p><figure><img src="'+c+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图7：微服务的特征–微服务访谈问题</p><h2 id="什么是领域驱动设计" tabindex="-1"><a class="header-anchor" href="#什么是领域驱动设计"><span>什么是领域驱动设计？</span></a></h2><figure><img src="'+h+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图8： DDD 原理–微服务面试问题</p><h2 id="为什么需要域驱动设计-ddd" tabindex="-1"><a class="header-anchor" href="#为什么需要域驱动设计-ddd"><span>为什么需要域驱动设计（DDD）？</span></a></h2><figure><img src="'+g+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图9：我们需要 DDD 的因素–微服务面试问题</p><h2 id="什么是无所不在的语言" tabindex="-1"><a class="header-anchor" href="#什么是无所不在的语言"><span>什么是无所不在的语言？</span></a></h2><p>如果您必须定义泛在语言（UL），那么它是特定域的开发人员和用户使用的通用语言，通过该语言可以轻松解释域。无处不在的语言必须非常清晰，以便它将所有团队成员放在同一页面上，并以机器可以理解的方式进行翻译。</p><h2 id="什么是凝聚力" tabindex="-1"><a class="header-anchor" href="#什么是凝聚力"><span>什么是凝聚力？</span></a></h2><p>模块内部元素所属的程度被认为是凝聚力。</p><h2 id="什么是耦合" tabindex="-1"><a class="header-anchor" href="#什么是耦合"><span>什么是耦合？</span></a></h2><p>组件之间依赖关系强度的度量被认为是耦合。一个好的设计总是被认为具有高内聚力和低耦合性。</p><h2 id="什么是-rest-restful-以及它的用途是什么" tabindex="-1"><a class="header-anchor" href="#什么是-rest-restful-以及它的用途是什么"><span>什么是 REST / RESTful 以及它的用途是什么？</span></a></h2><p>Representational State Transfer（REST）/ RESTful Web 服务是一种帮助计算机系统通过 Internet 进行通信的架构风格。这使得微服务更容易理解和实现。</p><p>微服务可以使用或不使用 RESTful API 实现，但使用 RESTful API 构建松散耦合的微服务总是更容易。</p><h2 id="什么是不同类型的微服务测试" tabindex="-1"><a class="header-anchor" href="#什么是不同类型的微服务测试"><span>什么是不同类型的微服务测试？</span></a></h2><p>在使用微服务时，由于有多个微服务协同工作，测试变得非常复杂。因此，测试分为不同的级别。</p><ul><li>在底层，我们有面向技术的测试，如单元测试和性能测试。这些是完全自动化的。</li><li>在中间层面，我们进行了诸如压力测试和可用性测试之类的探索性测试。</li><li>在顶层，我们的验收测试数量很少。这些验收测试有助于利益相关者理解和验证软件功能。</li></ul>',52);function E(A,y){const i=n("ExternalLinkIcon");return r(),o("div",null,[f,e("p",null,[t("Golang的微服务框架"),e("a",m,[t("kit"),l(i)]),t("中有详细的微服务的例子,可以参考学习.")]),b,e("ul",null,[e("li",null,[e("a",x,[t("Microservice Architectures"),l(i)])])]),_])}const D=s(u,[["render",E],["__file","面试题.html.vue"]]),T=JSON.parse('{"path":"/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E6%9C%8D%E5%8A%A1/%E9%9D%A2%E8%AF%95%E9%A2%98.html","title":"微服务面试题","lang":"zh-CN","frontmatter":{"description":"微服务面试题 您对微服务有何了解？ 微服务，又称微服务架构，是一种架构风格，它将应用程序构建为以业务领域为模型的小型自治服务集合。通俗地说，你必须看到蜜蜂如何通过对齐六角形蜡细胞来构建它们的蜂窝状物。他们最初从使用各种材料的小部分开始，并继续从中构建一个大型蜂箱。这些细胞形成图案，产生坚固的结构，将蜂窝的特定部分固定在一起。这里，每个细胞独立于另一个细...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E6%9E%B6%E6%9E%84/%E5%BE%AE%E6%9C%8D%E5%8A%A1/%E9%9D%A2%E8%AF%95%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"微服务面试题"}],["meta",{"property":"og:description","content":"微服务面试题 您对微服务有何了解？ 微服务，又称微服务架构，是一种架构风格，它将应用程序构建为以业务领域为模型的小型自治服务集合。通俗地说，你必须看到蜜蜂如何通过对齐六角形蜡细胞来构建它们的蜂窝状物。他们最初从使用各种材料的小部分开始，并继续从中构建一个大型蜂箱。这些细胞形成图案，产生坚固的结构，将蜂窝的特定部分固定在一起。这里，每个细胞独立于另一个细..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.021.jpeg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-02-13T08:18:41.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"微服务面试题"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-02-13T08:18:41.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"微服务面试题\\",\\"image\\":[\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.021.jpeg\\",\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.023.jpeg\\",\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.024.jpeg\\",\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.025.jpeg\\",\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.026.jpeg\\"],\\"dateModified\\":\\"2024-02-13T08:18:41.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"]]},"headers":[{"level":2,"title":"您对微服务有何了解？","slug":"您对微服务有何了解","link":"#您对微服务有何了解","children":[]},{"level":2,"title":"说说微服务架构的优势","slug":"说说微服务架构的优势","link":"#说说微服务架构的优势","children":[]},{"level":2,"title":"微服务有哪些特点？","slug":"微服务有哪些特点","link":"#微服务有哪些特点","children":[]},{"level":2,"title":"微服务架构是什么样子的?","slug":"微服务架构是什么样子的","link":"#微服务架构是什么样子的","children":[]},{"level":2,"title":"微服务架构如何运作？","slug":"微服务架构如何运作","link":"#微服务架构如何运作","children":[]},{"level":2,"title":"微服务架构的优缺点是什么？","slug":"微服务架构的优缺点是什么","link":"#微服务架构的优缺点是什么","children":[]},{"level":2,"title":"单片，SOA 和微服务架构有什么区别？","slug":"单片-soa-和微服务架构有什么区别","link":"#单片-soa-和微服务架构有什么区别","children":[]},{"level":2,"title":"怎么做弹性扩缩容，原理是什么?","slug":"怎么做弹性扩缩容-原理是什么","link":"#怎么做弹性扩缩容-原理是什么","children":[]},{"level":2,"title":"说一下中间件原理.","slug":"说一下中间件原理","link":"#说一下中间件原理","children":[]},{"level":2,"title":"在使用微服务架构时，您面临哪些挑战？","slug":"在使用微服务架构时-您面临哪些挑战","link":"#在使用微服务架构时-您面临哪些挑战","children":[]},{"level":2,"title":"SOA 和微服务架构之间的主要区别是什么？","slug":"soa-和微服务架构之间的主要区别是什么","link":"#soa-和微服务架构之间的主要区别是什么","children":[]},{"level":2,"title":"微服务有什么特点？","slug":"微服务有什么特点","link":"#微服务有什么特点","children":[]},{"level":2,"title":"什么是领域驱动设计？","slug":"什么是领域驱动设计","link":"#什么是领域驱动设计","children":[]},{"level":2,"title":"为什么需要域驱动设计（DDD）？","slug":"为什么需要域驱动设计-ddd","link":"#为什么需要域驱动设计-ddd","children":[]},{"level":2,"title":"什么是无所不在的语言？","slug":"什么是无所不在的语言","link":"#什么是无所不在的语言","children":[]},{"level":2,"title":"什么是凝聚力？","slug":"什么是凝聚力","link":"#什么是凝聚力","children":[]},{"level":2,"title":"什么是耦合？","slug":"什么是耦合","link":"#什么是耦合","children":[]},{"level":2,"title":"什么是 REST / RESTful 以及它的用途是什么？","slug":"什么是-rest-restful-以及它的用途是什么","link":"#什么是-rest-restful-以及它的用途是什么","children":[]},{"level":2,"title":"什么是不同类型的微服务测试？","slug":"什么是不同类型的微服务测试","link":"#什么是不同类型的微服务测试","children":[]}],"git":{"createdTime":1707812321000,"updatedTime":1707812321000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":11.56,"words":3468},"filePathRelative":"架构/微服务/面试题.md","localizedDate":"2024年2月13日","autoDesc":true}');export{D as comp,T as data};
