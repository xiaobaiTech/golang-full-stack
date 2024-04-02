import{_ as c}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as n,o as t,c as l,a as r,b as e,d as o,e as i}from"./app-dLjv2thc.js";const d="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.029.jpeg",s="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.030.jpeg",p="/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.031.jpeg",k={},h=i('<h1 id="容器技术面试题" tabindex="-1"><a class="header-anchor" href="#容器技术面试题"><span><strong>容器技术面试题</strong></span></a></h1><h2 id="为什么需要-devops" tabindex="-1"><a class="header-anchor" href="#为什么需要-devops"><span>为什么需要 DevOps</span></a></h2><p>在微服务架构大背景下，原来的单体服务被越拆越小，每个服务都需要完整经历编译，构建，发布等流程，非常繁琐。<br> 为了解决这个痛点，就需要用到DevOps。<br> DevOps 是一种软件开发和运维的文化和实践方法。落地到实践中，大概率就是一个基于k8s的服务管理平台。<br> 程序员直接在界面上点点几下，就能完成服务的构建部署和扩容等操作。</p><p>具体来说，DevOps有以下几个优点：</p><ul><li><p>增加软件布署的频率</p></li><li><p>降低新发布版本的失败率</p></li><li><p>缩短修复缺陷的交付时间</p></li><li><p>加快解决版本冲突的问题</p></li></ul><p>从更高维度来说，DevOps 可以降低运维的成本，增加开发自个部署运维服务的效率，同时也能保证较高的服务质量。真降本增效神器。</p><h2 id="docker-是什么" tabindex="-1"><a class="header-anchor" href="#docker-是什么"><span>Docker 是什么？</span></a></h2><p>Docker 本质上就是一个将<strong>程序和环境打包并运行</strong>的工具软件。具体点来说就是，它通过 Dockerfile 描述环境和应用程序的依赖关系， docker build 构建镜像， docker pull/push 跟 Docker Registry 交互实现存储和分发镜像，docker run 命令基于镜像启动容器，基于容器技术运行程序和它对应的环境，从而解决环境依赖导致的各种问题。<br><a href="/%E6%9E%B6%E6%9E%84/%E4%BA%91%E5%8E%9F%E7%94%9F/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/docker%E6%98%AF%E4%BB%80%E4%B9%88docker%E5%92%8Ckubernetes(k8s)%E4%B9%8B%E9%97%B4%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB">Docker 是什么</a></p><h2 id="docker-与虚拟机有何不同" tabindex="-1"><a class="header-anchor" href="#docker-与虚拟机有何不同"><span>Docker 与虚拟机有何不同？</span></a></h2><p><strong>Docker容器</strong>是不是很像我们用 vmware 或 kvm 整出来的<strong>传统虚拟机</strong>？<br> 但不同的是，传统虚拟机自带一个完整操作系统，而容器本身不带完整操作系统，容器的基础镜像实际上只包含了操作系统的核心依赖库和配置文件等必要组件。<br> 它利用一个叫 <strong>Namespace</strong> 的能力让它看起来就像是一个独立操作系统一样。再利用一个叫 <strong>Cgroup</strong> 的能力限制它能使用的计算资源。</p><figure><img src="https://cdn.xiaobaidebug.top/1711882143210.jpeg" alt="Docker和虚拟机的区别" tabindex="0" loading="lazy"><figcaption>Docker和虚拟机的区别</figcaption></figure><p>所以说，容器本质上只是个自带独立运行环境的<strong>特殊进程</strong>，底层用的其实是<strong>宿主机的操作系统内核</strong>。</p><figure><img src="https://cdn.xiaobaidebug.top/1711882187702.jpeg" alt="容器本质是一个特殊进程" tabindex="0" loading="lazy"><figcaption>容器本质是一个特殊进程</figcaption></figure><p>参考：<a href="/%E6%9E%B6%E6%9E%84/%E4%BA%91%E5%8E%9F%E7%94%9F/%E6%A0%B8%E5%BF%83%E7%9F%A5%E8%AF%86%E7%82%B9/docker%E6%98%AF%E4%BB%80%E4%B9%88docker%E5%92%8Ckubernetes(k8s)%E4%B9%8B%E9%97%B4%E6%98%AF%E4%BB%80%E4%B9%88%E5%85%B3%E7%B3%BB%E6%9C%89%E4%BB%80%E4%B9%88%E5%8C%BA%E5%88%AB">Docker 是什么</a></p><h2 id="什么是-docker-镜像" tabindex="-1"><a class="header-anchor" href="#什么是-docker-镜像"><span>什么是 Docker 镜像？</span></a></h2><p>Docker 镜像是 Docker 容器的源代码，Docker 镜像用于创建容器。使用build 命令创建镜像。</p><h2 id="什么是-docker-容器" tabindex="-1"><a class="header-anchor" href="#什么是-docker-容器"><span>什么是 Docker 容器？</span></a></h2><p>Docker 容器包括应用程序及其所有依赖项，作为操作系统的独立进程运行。</p><h2 id="docker-容器有几种状态" tabindex="-1"><a class="header-anchor" href="#docker-容器有几种状态"><span>Docker 容器有几种状态？</span></a></h2><p>四种状态：运行、已暂停、重新启动、已退出。</p><h2 id="dockerfile-中最常见的指令是什么" tabindex="-1"><a class="header-anchor" href="#dockerfile-中最常见的指令是什么"><span>Dockerfile 中最常见的指令是什么？</span></a></h2><p>FROM：指定基础镜像</p><p>LABEL：功能是为镜像指定标签</p><p>RUN：运行指定的命令CMD：容器启动时要运行的命令</p><h2 id="dockerfile-中的命令-copy-和-add-命令有什么区别" tabindex="-1"><a class="header-anchor" href="#dockerfile-中的命令-copy-和-add-命令有什么区别"><span>Dockerfile 中的命令 COPY 和 ADD 命令有什么区别？</span></a></h2><p>COPY 与 ADD 的区别： COPY 的 SRC 只能是本地文件，其他用法一致。</p><h2 id="解释一下-dockerfile-的-onbuild-指令" tabindex="-1"><a class="header-anchor" href="#解释一下-dockerfile-的-onbuild-指令"><span>解释一下 Dockerfile 的 ONBUILD 指令？</span></a></h2><p>当镜像用作另一个镜像构建的基础时，ONBUILD 指令向镜像添加将在稍后执行的触发指令。如果要构建将用作构建其他镜像的基础的镜像（例如，可以使用特定于用户的配置自定义的应用程序构建环境或守护程序），这将非常有用。</p><h2 id="什么是-docker-swarm" tabindex="-1"><a class="header-anchor" href="#什么是-docker-swarm"><span>什么是 Docker Swarm？</span></a></h2><p>Docker Swarm 是 Docker 的本机群集。它将 Docker 主机池转变为单个虚拟Docker 主机。Docker Swarm 提供标准的 Docker API，任何已经与 Docker守护进程通信的工具都可以使用 Swarm 透明地扩展到多个主机。</p><h2 id="如何在生产中监控-docker" tabindex="-1"><a class="header-anchor" href="#如何在生产中监控-docker"><span>如何在生产中监控 Docker？</span></a></h2><p>Docker 提供 docker stats 和 docker 事件等工具来监控生产中的 Docker。我们可以使用这些命令获取重要统计数据的报告。</p><p>Docker 统计数据：当我们使用容器 ID 调用 docker stats 时，我们获得容器的CPU，内存使用情况等。它类似于 Linux 中的 top 命令。</p><p>Docker 事件：Docker 事件是一个命令，用于查看 Docker 守护程序中正在进</p><p>行的活动流。</p><p>一些常见的 Docker 事件：attach，commit，die，detach，rename，</p><p>destroy 等。我们还可以使用各种选项来限制或过滤我们感兴趣的事件。</p><h2 id="devops-有哪些优势" tabindex="-1"><a class="header-anchor" href="#devops-有哪些优势"><span>DevOps 有哪些优势？</span></a></h2><p>技术优势: 持续的软件交付能力修复问题变得简单更快得解决问题</p><p>商业优势: 更快交付的特性，更稳定的操作系统环境更多时间可用于创造价值(而不是修复/维护)</p><h2 id="ci-服务有什么用途" tabindex="-1"><a class="header-anchor" href="#ci-服务有什么用途"><span>CI 服务有什么用途？</span></a></h2><p>CI （Continuous Integration）--持续集成服务--主要用于整合团队开发中不同开发者提交到开发仓库中的项目代码变化，并即时整合编译，检查整合编译错误的服务。它需要一天中多次整合编译代码的能力，若出现整合错误，可以优异地准确定位提交错误源。</p><h2 id="如何使用-docker-技术创建与环境无关的容器系统" tabindex="-1"><a class="header-anchor" href="#如何使用-docker-技术创建与环境无关的容器系统"><span>如何使用 Docker 技术创建与环境无关的容器系统？</span></a></h2><p>Docker 技术有三中主要的技术途径辅助完成此需求：存储卷（Volumes）</p><p>环境变量（Environment variable）注入</p><p>只读（Read-only）文件系统</p><h2 id="dockerfile-配置文件中的-copy-和-add-指令有什么不同" tabindex="-1"><a class="header-anchor" href="#dockerfile-配置文件中的-copy-和-add-指令有什么不同"><span>Dockerfile 配置文件中的 COPY 和 ADD 指令有什么不同？</span></a></h2><p>虽然 ADD 和 COPY 功能相似，推荐 COPY 。</p><p>那是因为 COPY 比 ADD 更直观易懂。 COPY 只是将本地文件拷入容器这么简单，而 ADD 有一些其它特性功能（诸如，本地归档解压和支持远程网址访问等），这些特性在指令本身体现并不明显。因此，有必要使用 ADD 指令的最好例子是需要在本地自动解压归档文件到容器中的情况，如 ADD rootfs.tar.xz 。</p><h2 id="docker-映像-image-是什么" tabindex="-1"><a class="header-anchor" href="#docker-映像-image-是什么"><span>Docker 映像（image）是什么？</span></a></h2>',50),g={href:"http://registry.hub.docker.com",target:"_blank",rel:"noopener noreferrer"},D=i(`<h2 id="docker-容器-container-是什么" tabindex="-1"><a class="header-anchor" href="#docker-容器-container-是什么"><span>Docker 容器（container）是什么？</span></a></h2><p>Docker containers -- Docker 容器--是包含其所有运行依赖环境，但与其它容器共享操作系统内核的应用，它运行在独立的主机操作系统用户空间进程中。Docker 容器并不紧密依赖特定的基础平台：可运行在任何配置的计算机，任何平台以及任何云平台上。</p><h2 id="docker-中心-hub-什么概念" tabindex="-1"><a class="header-anchor" href="#docker-中心-hub-什么概念"><span>Docker 中心（hub）什么概念？</span></a></h2><p>Docker hub 是云基础的 Docker 注册服务平台，它允许用户进行访问 Docker 中心资源库，创建自己的 Docker 映像并测试，推送并存储创建好的 Docker 映像，连接 Docker 云平台将已创建好的指定 Docker 映像布署到本地主机等任务。它提供了一个查找发现 Docker 映像，发布 Docker 映像及控制变化升级的资源中心，成为用户组或团队协作开发中保证自动化开发流程的有效技术途径。</p><h2 id="在任意给定时间点指出一个-docker-容器可能存在的运行阶段" tabindex="-1"><a class="header-anchor" href="#在任意给定时间点指出一个-docker-容器可能存在的运行阶段"><span>在任意给定时间点指出一个 Docker 容器可能存在的运行阶段？</span></a></h2><p>在任意时间点，一个 Docker 容器可能存在以下运行阶段：</p><p>运行中（Running）已暂停（Paused）重启中（Restarting）</p><p>已退出（Exited）</p><h2 id="有什么方法确定一个-docker-容器运行状态" tabindex="-1"><a class="header-anchor" href="#有什么方法确定一个-docker-容器运行状态"><span>有什么方法确定一个 Docker 容器运行状态？</span></a></h2><p>使用如下命令行命令确定一个 Docker 容器的运行状态</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>$ docker ps –a 
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这将列表形式输出运行在主机上的所有 Docker 容器及其运行状态。从这个列表中很容易找到想要的容器及其运行状态。</p><h2 id="在-dockerfile-配置文件中最常用的指令有哪些" tabindex="-1"><a class="header-anchor" href="#在-dockerfile-配置文件中最常用的指令有哪些"><span>在 Dockerfile 配置文件中最常用的指令有哪些？</span></a></h2><p>一些最常用的指令如下：</p><p>FROM：使用 FROM 为后续的指令建立基础映像。在所有有效的 Dockerfile 中， FROM 是第一条指令。</p><p>LABEL：LABEL 指令用于组织项目映像，模块，许可等。在自动化布署方面 LABEL 也有很大用途。在 LABEL 中指定一组键值对，可用于程序化配置或布署 Docker 。</p><p>RUN：RUN 指令可在映像当前层执行任何命令并创建一个新层，用于在映像层中添加功能层，也许最来的层会依赖它。</p><p>CMD：使用 CMD 指令为执行的容器提供默认值。在 Dockerfile 文件中，若添加多个 CMD 指令，只有最后的 CMD 指令运行。</p><h2 id="什么类型的应用-无状态性或有状态性-更适合-docker-容器技术" tabindex="-1"><a class="header-anchor" href="#什么类型的应用-无状态性或有状态性-更适合-docker-容器技术"><span>什么类型的应用（无状态性或有状态性）更适合 Docker 容器技术？</span></a></h2><p>对于 Docker 容器创建无状态性（Stateless）的应用更可取。通过从应用项目中将与状态相关的信息及配置提取掉，我们可以在项目环境外建立不依赖项目环境的 Docker 容器。这样，我们可以在任意产品中运行同一容器，只需根据产品需要像问&amp;答（QA）一样给其配置环境即可。这帮助我们在不同场景重用相同的 Docker 映像。另外，使用无状态性（Stateless）容器应用相比有状态性（Stateful）容器应用更具伸缩性，也容易创建。</p><h2 id="解释基本-docker-应用流程" tabindex="-1"><a class="header-anchor" href="#解释基本-docker-应用流程"><span>解释基本 Docker 应用流程</span></a></h2><p>初始，所有都有赖于 Dockerfile 配置文件。Dockerfile 配置文件就是创建 Docker image (映像)的源代码。</p><p>一旦 Dockerfile 配置好了，就可以创建（build）并生成&#39;image（映像）&#39;，&#39;image&#39;就是 Dockerfile 配置文件中「源代码」的「编译」版本。一旦有了&#39;image&#39;，就可以在 registry（注册中心）发布它。&#39;registry&#39;类似 git 的资源库--你可以推送你的映像（image），也可取回库中的映像</p><ul><li>image）。</li></ul><p>之后，你就可以使用 image 去启动运行&#39;containers（容器）&#39;。运行中的容器在许多方面，与虚拟机非常相似，但容器的运行不需要虚拟管理软件的运行。</p><h2 id="docker-image-和-docker-layer-层-有什么不同" tabindex="-1"><a class="header-anchor" href="#docker-image-和-docker-layer-层-有什么不同"><span>Docker Image 和 Docker Layer (层)有什么不同？</span></a></h2><p>Image：一个 Docker Image 是由一系列 Docker 只读层（read-only Layer）创建出来的。</p><p>Layer：在 Dockerfile 配置文件中完成的一条配置指令，即表示一个 Docker 层（Layer）。</p><p>如下 Dockerfile 文件包含4 条指令，每条指令创建一个层（Layer）。</p><div class="language-text line-numbers-mode" data-ext="text" data-title="text"><pre class="language-text"><code>FROM ubuntu:15.04 

COPY ./app 

RUN make /app 

CMD python /app/app.py
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>重点，每层只对其前一层进行一（某）些进化。</p><h2 id="虚拟化技术是什么" tabindex="-1"><a class="header-anchor" href="#虚拟化技术是什么"><span>虚拟化技术是什么？</span></a></h2><p>最初的构想，virtualisation（虚拟化）被认为是逻辑划分大型主机使得多个应用可以并行运行的一种技术方案。然而，随着技术公司及开源社区的推进，现实发生了戏剧性的转变，以致产生了以一种或某种方式操作特权指令可以在单台基于 x86 硬件的系统上同时运行多个（种）操作系统的技术。</p><p>实质的效果是，虚拟化技术允许你在一个硬件平台下运行2 个完全不同的操作系统。每个客户操作系统可完成像系统自检、启动、载入系统内核等像在独立硬件上的一切动作。同时也具备坚实的安全基础，例如，客户操作系统不能获取完全访问主机或其它客户系统的权限，及其它涉及安全，可能把系统搞坏的操作。</p><p>基于对客户操作系统虚拟硬件、运行环境模拟方法的不同，对虚拟化技术进行分类，主要的有如下3 种虚拟化技术种类：</p><ul><li>全模拟（Emulation）</li><li>半虚拟（Paravirtualization）</li><li>基于容器的虚拟化（Container-based virtualization）</li></ul><h2 id="虚拟管理层-程序-是什么" tabindex="-1"><a class="header-anchor" href="#虚拟管理层-程序-是什么"><span>虚拟管理层（程序）是什么？</span></a></h2><p>hypervisor --虚拟管理层（程序）--负责创建客户虚拟机系统运行所需虚拟硬件环境。它监管客户虚拟操作系统的运行，并为客户系统提供必要的运行资源，保证客户虚拟系统的运行。虚拟管理层（程序）驻留在物理主机系统和虚拟客户系统之间，为虚拟客户系统提供必要的虚拟服务。如何理解它，它侦听运行在虚拟机中的客户操作系统的操作并在主机操作系统中模拟客户操作系统所需硬件资源请求。满足客户机的运行需求。</p><p>虚拟化技术的快速发展，主要在云平台，由于在虚拟管理程序的帮助下，可允许在单台物理服务器上生成多个虚拟服务器，驱动着虚拟化技术快速发展及广泛应用。诸如， Xen，VMware，KVM 等，以及商业化的处理器硬件生产厂商也加入在硬件层面支持虚拟化技术的支持。诸如，Intel 的 VT 和 AMD-V 。</p><h2 id="docker-群-swarm-是什么" tabindex="-1"><a class="header-anchor" href="#docker-群-swarm-是什么"><span>Docker 群（Swarm）是什么？</span></a></h2><p>Docker Swarm -- Docker 群--是原生的 Docker 集群服务工具。它将一群 Docker 主机集成为单一一个虚拟 Docker 主机。利用一个 Docker 守护进程，通过标准的 Docker API 和任何完善的通讯工具，Docker Swarm 提供透明地将 Docker 主机扩散到多台主机上的服务。</p><h2 id="在使用-docker-技术的产品中如何监控其运行" tabindex="-1"><a class="header-anchor" href="#在使用-docker-技术的产品中如何监控其运行"><span>在使用 Docker 技术的产品中如何监控其运行？</span></a></h2><p>Docker 在产品中提供如运行统计和 Docker 事件的工具。可以通过这些工具命令获取 Docker 运行状况的统计信息或报告。</p><p>Docker stats ：通过指定的容器 id 获取其运行统计信息，可获得容器对 CPU，内存使用情况等的统计信息，类似 Linux 系统中的 top 命令。 Docker events ：Docker 事件是一个命令，用于观察显示运行中的 Docker 一系列的行为活动。</p><p>一般的 Docker 事件有：attach（关联），commit（提交），die（僵死）， detach（取消关联），rename（改名），destory（销毁）等。也可使用多个选项对事件记录筛选找到想要的事件信息。</p><h2 id="什么是孤儿卷及如何删除它" tabindex="-1"><a class="header-anchor" href="#什么是孤儿卷及如何删除它"><span>什么是孤儿卷及如何删除它？</span></a></h2><p>孤儿卷是未与任何容器关联的卷。在 Docker v。1.9 之前的版本中，删除这些孤儿卷存在很大问题。</p><h2 id="什么是半虚拟化-paravirtualization" tabindex="-1"><a class="header-anchor" href="#什么是半虚拟化-paravirtualization"><span>什么是半虚拟化（Paravirtualization）？</span></a></h2><p>Paravirtualization，也称为第1 类虚拟机管理（层）程序，其直接在硬件或裸机（bare-metal）上运行，提供虚拟机直接使用物理硬件的服务，它帮助主机操作系统，虚拟化硬件和实际硬件进行协作以实现最佳性能。这种虚拟层管理技术的程序一般占用系统资源较小，其本身并不需要占用大量系统资源。</p><figure><img src="https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.028.jpeg" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>这种虚拟层管理程序有 Xen, KVM 等。</p><h2 id="docker-技术与虚拟机技术有何不同" tabindex="-1"><a class="header-anchor" href="#docker-技术与虚拟机技术有何不同"><span>Docker 技术与虚拟机技术有何不同？</span></a></h2><p>Docker 不是严格意义上的虚拟化硬件的技术。它依赖 container-based virtualization（基于容器的虚拟化）的技术实现工具，或可以认为它是操作系统用户运行级别的虚拟化。因此， Docker 最初使用 LXC 驱动它，后来移至由 libcontainer 基础库驱动它，现已更名为 runc 。 Docker 主要致力于应用容器内的应用程序的自动化部署。应用容器设计用于包装和运行单一服务，而操作系统设计用于运行多进程任务，提供多种运算服务的能力。如虚拟机中等同完全操作系统的能力。因此，Docker 被认为是容器化系统上管理容器及应用容器化的布署工具。</p><figure><img src="`+d+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><ul><li>与虚拟机不同，容器无需启动操作系统内核，因此，容器可在不到1 秒钟时间内运行起来。这个特性，使得容器化技术比其它虚拟化技术更具有独特性及可取性。</li><li>由于容器化技术很少或几乎不给主机系统增加负载，因此，基于容器的虚拟化技术具有近乎原生的性能表现。</li><li>基于容器的虚拟化，与其他硬件虚拟化不同，运行时不需要其他额外的虚拟管理层软件。</li><li>主机上的所有容器共享主机操作系统上的进程调度，从而节省了额外的资源的需求。</li><li>与虚拟机 image 相比，容器（Docker 或 LXC images）映像较小，因此，容器映像易于分发。</li><li>容器中的资源分配由 Cgroups 实现。 Cgroup 不会让容器占用比给它们分配的更多的资源。但是，现在其它的虚拟化技术，对于虚拟机，主机的所有资源都可见，但无法使用。这可以通过在容器和主机上同时运行 top 或 htop 来观察到。在两个环境中的输出看起来相同。</li></ul><h2 id="请解释一下-docerfile-配置文件中的-onbuild-指令的用途含义" tabindex="-1"><a class="header-anchor" href="#请解释一下-docerfile-配置文件中的-onbuild-指令的用途含义"><span>请解释一下 docerfile 配置文件中的 ONBUILD 指令的用途含义？</span></a></h2><p>配置文件中的 ONBUILD 指令为创建的 Docker image （映像）加入在将来执行的指令（译注：在当前配置文件生成的映像中并不执行），用于在以这个创建的映像为基础的创建的子映像（image）中执行或定制。举例，以基映像创建自己的映像时，可定制创建特有的用户化的配置环境。</p><ul><li>译注：由于原文较短，关于这个问题容易迷惑。译者认为，总体来说关键理解--以基础映像创建自有的映像过程中，基础映像中所有的创建层或指令是以整体或固化的方式导入自有映像中的，自有映像是不能对这个过程进行自有定制。而 ONBUILD 指令提供了将某些层从基础映像中剥离出来提供给之后以自有映像为基础映像派生新的映像的可定制途径。这对发布映像而普适在不同的运行环境定制非常有用。不当之处，请指正！）</li></ul><h2 id="有否在创建有状态性的-docker-应用的较好实践-最适合的场景有什么" tabindex="-1"><a class="header-anchor" href="#有否在创建有状态性的-docker-应用的较好实践-最适合的场景有什么"><span>有否在创建有状态性的 Docker 应用的较好实践？最适合的场景有什么？</span></a></h2><p>有状态性 Docker 应用的问题关键在于状态数据保存在哪儿的问题。若所有数据保存在容器内，当更新软件版本或想将 Docker 容器移到其它机器上时，找回这些在运行中产生的状态数据将非常困难。</p><p>您需要做的是将这些表达运行状态的数据保存在永久卷中。参考如下3 种模式。</p><figure><img src="'+s+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>译注：</p><p>1 图中文字：数据保存在容器中，当容器停止运行时，运行状态数据丢失！</p><p>2 图中文字：数据保存在主机卷（Host Volume）中，当主机停机时，运行状态数据将无法访问</p><p>3 图中文字：数据保存在网络文件系统卷中，数据访问不依赖容器的运行与主机的运行</p><p>若您使用：docker run -v hostFolder:/containerfolder 命令运行您的容器，容器运行中任何对/containerfolder 目录下数据的改变，将永久保存在主机的 hostfolder 目录下。使用网络文件系统（nfs）与此类似。那样您就可以运行您的容器在任何主机上且其运行状态数据被保存在网络文件系统上。</p><h2 id="在-windows-系统上可以运行原生的-docker-容器吗" tabindex="-1"><a class="header-anchor" href="#在-windows-系统上可以运行原生的-docker-容器吗"><span>在 Windows 系统上可以运行原生的 Docker 容器吗？</span></a></h2>',68),u={href:"http://xn--fiq0i9is4gn7dqpgcsbe2z6xfg13g.NET",target:"_blank",rel:"noopener noreferrer"},m={href:"http://xn--fhqg92h63bgwpjsdy26ahdv626a.NET",target:"_blank",rel:"noopener noreferrer"},f=i('<h2 id="在非-linux-操作系统平台上如何运行-docker" tabindex="-1"><a class="header-anchor" href="#在非-linux-操作系统平台上如何运行-docker"><span>在非 Linux 操作系统平台上如何运行 Docker ?</span></a></h2><p>容器化虚拟技术概念可能来源于，在 Linux 内核版本2.6.24 上加入的对命名空间（ namespace）的技术支持特性。容器化进程加入其进程 ID 到其创建的每个进程上并且对每个进程中的系统级调用进行访问控制及审查。其本身是由系统级调用 clone ()克隆出来的进程，允许其创建属于自己命名空间的进程实例，而区别于之前的，归属与整个本机系统的进程实例。</p><p>如果上述在 Linux 系统内核上的技术实现成为可能，那么明显的问题是如何在非 Linux 系统上运行容器化的 Docker 。过去， Mac 和 Windows 系统上运行 Docker 容器都使用 Linux 虚拟机（VMs）技术， Docker 工具箱使用的容器运行在 Virtual Box 虚拟机上。现在，最新的情况是， Windows 平台上使用的是 Hyper-V 产品技术，Mac 平台上使用的是 Hypervisor.framework （框架）产品技术。</p><h2 id="容器化技术在底层的运行原理" tabindex="-1"><a class="header-anchor" href="#容器化技术在底层的运行原理"><span>容器化技术在底层的运行原理？</span></a></h2><p>2006 年前后，人们，包括一些谷歌的雇员，在 Linux 内核级别上实现了一种新的名为命名空间（namespace）的技术（实际上这种概念在 FreeBSD 系统上由来已久）。我们知道，操作系统的一个功能就是进程共享公共资源，诸如，网络和硬盘空间等。但是，如果一些公共资源被包装在一个命名空间中，只允许属于这个命名空间中的进程访问又如何呢？也就是说，可以分配一大块硬盘空间给命名空间 X 供其使用，但是，命名空间 Y 中的进程无法看到或访问这部分资源。同样地，命名空间 Y 中分配的资源，命名空间 X 中的进程也无法访问。当然， X 中的进程无法与 Y 中的进程进行交互。这提供了某种对公共资源的虚拟化和隔离的技术。</p><p>这就是 Docker 技术的底层工作原理：每个容器运行在它自己的命名空间中，但是，确实与其它运行中的容器共用相同的系统内核。隔离的产生是由于系统内核清楚地知道命名空间及其中的进程，且这些进程调用系统 API 时，内核保证进程只能访问属于其命名空间中的资源。</p><figure><img src="'+p+'" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>图上文字说明：运行中的容器是隔离的。准确地说，各容器共享操作系统内核及操作系统 API。</p><h2 id="说说容器化技术与虚拟化技术的优缺点" tabindex="-1"><a class="header-anchor" href="#说说容器化技术与虚拟化技术的优缺点"><span>说说容器化技术与虚拟化技术的优缺点</span></a></h2><p>仅有下面的一些对比：</p><p>不能像虚拟机那样在容器上运行与主机完全不同的操作系统。然而，可以在容器上运行不同的 Linux 发布版，由于容器共享系统内核的缘故。容器的隔离性没有虚拟机那么健壮。事实上，在早期容器化技术实现上，存在某种方法使客户容器可接管整个主机系统。也可看到，载入新容器并运行，并不会像虚拟机那样装载一个新的操作系统进来。</p><p>所有的容器共享同一系统内核，这也就是容器被认为非常轻量化的原因。同样的原因，不像虚拟机，你不须为容器预分配大量的内存空间，因为它不是运行新的整个的操作系统。这使得在一个操作系统主机上，可以同时运行成百上千个容器应用，在运行完整操作系统的虚拟机上，进行这么多的并行沙箱实验是不可能的。</p><h2 id="如何使-docker-适应多种运行环境" tabindex="-1"><a class="header-anchor" href="#如何使-docker-适应多种运行环境"><span>如何使 Docker 适应多种运行环境？</span></a></h2><p>您必然想改变您的 Docker 应用配置以更适应现实运行环境的变化。下面包含一些修改建议：</p><p>移除应用代码中对任何固定存储卷的绑定，由于代码驻留在容器内部，而不能从外部进行修正。</p><p>绑定应用端口到主机上的不同端口</p><p>差异化设置环境变量（例如：减少日志冗余或者使能发电子邮件）设定重启策略（例如： restart: always ），避免长时间宕机加入额外的服务（例如： log aggregator）</p><p>由于以上原因，您更需要一个 Compose 配置文件，大概叫</p><p>production.yml ，它配置了恰当的产品整合服务。这个配置文件只需包含您选择的合适的原始 Compose 配置文件中，你改动的部分。</p><p>docker-compose -f docker-com</p><h2 id="为什么-docker-compose-采取的是并不等待前面依赖服务项的容器启动就绪后再启动的组合容器启动策略" tabindex="-1"><a class="header-anchor" href="#为什么-docker-compose-采取的是并不等待前面依赖服务项的容器启动就绪后再启动的组合容器启动策略"><span>为什么 Docker compose 采取的是并不等待前面依赖服务项的容器启动就绪后再启动的组合容器启动策略？</span></a></h2><p>Docker 的 Compose 配置总是以依赖启动序列来启动或停止 Compose 中的服务容器，依赖启动序列是由 Compose 配置文件中的 depends_on ， links ， volumes_from 和 network_mode: &quot;service : ...&quot;等这些配置指令所确定的。</p><p>然而， Compose 启动中，各容器的启动并不等待其依赖容器（这必定是你整个应用中的某个依赖的服务或应用）启动就绪后才启动。使用这种策略较好的理由如下：</p><p>等待一个数据库服务（举例）就绪这样的问题，在大型分布式系统中仅是相比其它大问题的某些小问题。在实际发布产品运维中，您的数据库服务会由于各种原因，或者迁移宿主机导致其不可访问。您发布的产品需要有应对这样状况的弹性。</p><p>掌控这些，开发设计您的应用，使其在访问数据库失效的情况下，能够试图重连数据库，直至其连接到数据库为止。最佳的解决方案是在您的应用代码中检查是否有应对意外的发生，无论是任何原因导致的启动或连接失效都应考虑在内。</p>',25);function b(v,E){const a=n("ExternalLinkIcon");return t(),l("div",null,[h,r("p",null,[e("Docker image 是 Docker 容器的源。换言之，Docker images 用于创建 Docker 容器（containers）。映像（Images）通过 Docker build 命令创建，当 run 映像时，它启动成一个容器（container）进程。做好的映像由于可能非常庞大，常注册存储在诸如 "),r("a",g,[e("registry.hub.docker.com"),o(a)]),e(" 这样的公共平台上。映像常被分层设计，每层可单独成为一个小映像，由多层小映像再构成大映像，这样碎片化的设计为了使映像在互联网上共享时，最小化传输数据需求。")]),D,r("p",null,[e("在'Windows Server 2016'系统上，你可以运行 Windows 的原生容器，微软推出其映像是'Windows Nano Server'，一个轻量级的运行在容器中的 Windows 原生系统。"),r("a",u,[e("您可以在其中布署基于.NET"),o(a)]),e(" 的应用。")]),r("p",null,[e("译注：结合 Docker 的基本技术原理，参考后面的问题26 和问题27，可推测，微软在系统内核上开发了对 Docker 的支持，支持其闭源系统的容器化虚拟技术。但译者认为， Windows 系统本就是闭源紧耦合的系统，"),r("a",m,[e("好像你在本机上不装.NET"),o(a)]),e(" 组件，各应用能很好运行似的。何必再弄个容器，浪费资源。这只是译者自己之孔见，想喷就喷！另： Windows Server 2016 版本之后的都可支持这种原生 Docker 技术，如 Windows Server 2018 版。")]),f])}const y=c(k,[["render",b],["__file","面试题.html.vue"]]),A=JSON.parse('{"path":"/%E6%9E%B6%E6%9E%84/%E4%BA%91%E5%8E%9F%E7%94%9F/%E9%9D%A2%E8%AF%95%E9%A2%98.html","title":"容器技术面试题","lang":"zh-CN","frontmatter":{"description":"容器技术面试题 为什么需要 DevOps 在微服务架构大背景下，原来的单体服务被越拆越小，每个服务都需要完整经历编译，构建，发布等流程，非常繁琐。 为了解决这个痛点，就需要用到DevOps。 DevOps 是一种软件开发和运维的文化和实践方法。落地到实践中，大概率就是一个基于k8s的服务管理平台。 程序员直接在界面上点点几下，就能完成服务的构建部署和扩...","head":[["meta",{"property":"og:url","content":"https://golangguide.top/%E6%9E%B6%E6%9E%84/%E4%BA%91%E5%8E%9F%E7%94%9F/%E9%9D%A2%E8%AF%95%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"容器技术面试题"}],["meta",{"property":"og:description","content":"容器技术面试题 为什么需要 DevOps 在微服务架构大背景下，原来的单体服务被越拆越小，每个服务都需要完整经历编译，构建，发布等流程，非常繁琐。 为了解决这个痛点，就需要用到DevOps。 DevOps 是一种软件开发和运维的文化和实践方法。落地到实践中，大概率就是一个基于k8s的服务管理平台。 程序员直接在界面上点点几下，就能完成服务的构建部署和扩..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:image","content":"https://cdn.xiaobaidebug.top/1711882143210.jpeg"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-02T01:07:51.000Z"}],["meta",{"name":"twitter:card","content":"summary_large_image"}],["meta",{"name":"twitter:image:alt","content":"容器技术面试题"}],["meta",{"property":"article:author","content":"小白debug"}],["meta",{"property":"article:modified_time","content":"2024-04-02T01:07:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"容器技术面试题\\",\\"image\\":[\\"https://cdn.xiaobaidebug.top/1711882143210.jpeg\\",\\"https://cdn.xiaobaidebug.top/1711882187702.jpeg\\",\\"https://cdn.jsdelivr.net/gh/xiaobaiTech/image/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.028.jpeg\\",\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.029.jpeg\\",\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.030.jpeg\\",\\"https://golangguide.top/assets/image/docs/Aspose.Words.51b43265-f45e-4206-a945-0b7c10078cb5.031.jpeg\\"],\\"dateModified\\":\\"2024-04-02T01:07:51.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"小白debug\\",\\"url\\":\\"https://xiaobaidebug.top/\\"}]}"],["link",{"rel":"canonical","href":"https://golangguide.top/%E6%9E%B6%E6%9E%84/%E4%BA%91%E5%8E%9F%E7%94%9F/%E9%9D%A2%E8%AF%95%E9%A2%98.html"}],["meta",{"property":"og:url","content":"https://golangguide.top/%E6%9E%B6%E6%9E%84/%E4%BA%91%E5%8E%9F%E7%94%9F/%E9%9D%A2%E8%AF%95%E9%A2%98.html"}],["meta",{"property":"og:site_name","content":"golang全栈指南"}],["meta",{"property":"og:title","content":"容器技术面试题"}],["meta",{"property":"og:description","content":"容器技术面试题 为什么需要 DevOps 在微服务架构大背景下，原来的单体服务被越拆越小，每个服务都需要完整经历编译，构建，发布等流程，非常繁琐。 为了解决这个痛点，就需要用到DevOps。 DevOps 是一种软件开发和运维的文化和实践方法。落地到实践中，大概率就是一个基于k8s的服务管理平台。 程序员直接在界面上点点几下，就能完成服务的构建部署和扩..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-04-02T01:07:51.000Z"}],["meta",{"property":"article:modified_time","content":"2024-04-02T01:07:51.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"容器技术面试题\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-04-02T01:07:51.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"为什么需要 DevOps","slug":"为什么需要-devops","link":"#为什么需要-devops","children":[]},{"level":2,"title":"Docker 是什么？","slug":"docker-是什么","link":"#docker-是什么","children":[]},{"level":2,"title":"Docker 与虚拟机有何不同？","slug":"docker-与虚拟机有何不同","link":"#docker-与虚拟机有何不同","children":[]},{"level":2,"title":"什么是 Docker 镜像？","slug":"什么是-docker-镜像","link":"#什么是-docker-镜像","children":[]},{"level":2,"title":"什么是 Docker 容器？","slug":"什么是-docker-容器","link":"#什么是-docker-容器","children":[]},{"level":2,"title":"Docker 容器有几种状态？","slug":"docker-容器有几种状态","link":"#docker-容器有几种状态","children":[]},{"level":2,"title":"Dockerfile 中最常见的指令是什么？","slug":"dockerfile-中最常见的指令是什么","link":"#dockerfile-中最常见的指令是什么","children":[]},{"level":2,"title":"Dockerfile 中的命令 COPY 和 ADD 命令有什么区别？","slug":"dockerfile-中的命令-copy-和-add-命令有什么区别","link":"#dockerfile-中的命令-copy-和-add-命令有什么区别","children":[]},{"level":2,"title":"解释一下 Dockerfile 的 ONBUILD 指令？","slug":"解释一下-dockerfile-的-onbuild-指令","link":"#解释一下-dockerfile-的-onbuild-指令","children":[]},{"level":2,"title":"什么是 Docker Swarm？","slug":"什么是-docker-swarm","link":"#什么是-docker-swarm","children":[]},{"level":2,"title":"如何在生产中监控 Docker？","slug":"如何在生产中监控-docker","link":"#如何在生产中监控-docker","children":[]},{"level":2,"title":"DevOps 有哪些优势？","slug":"devops-有哪些优势","link":"#devops-有哪些优势","children":[]},{"level":2,"title":"CI 服务有什么用途？","slug":"ci-服务有什么用途","link":"#ci-服务有什么用途","children":[]},{"level":2,"title":"如何使用 Docker 技术创建与环境无关的容器系统？","slug":"如何使用-docker-技术创建与环境无关的容器系统","link":"#如何使用-docker-技术创建与环境无关的容器系统","children":[]},{"level":2,"title":"Dockerfile 配置文件中的 COPY 和 ADD 指令有什么不同？","slug":"dockerfile-配置文件中的-copy-和-add-指令有什么不同","link":"#dockerfile-配置文件中的-copy-和-add-指令有什么不同","children":[]},{"level":2,"title":"Docker 映像（image）是什么？","slug":"docker-映像-image-是什么","link":"#docker-映像-image-是什么","children":[]},{"level":2,"title":"Docker 容器（container）是什么？","slug":"docker-容器-container-是什么","link":"#docker-容器-container-是什么","children":[]},{"level":2,"title":"Docker 中心（hub）什么概念？","slug":"docker-中心-hub-什么概念","link":"#docker-中心-hub-什么概念","children":[]},{"level":2,"title":"在任意给定时间点指出一个 Docker 容器可能存在的运行阶段？","slug":"在任意给定时间点指出一个-docker-容器可能存在的运行阶段","link":"#在任意给定时间点指出一个-docker-容器可能存在的运行阶段","children":[]},{"level":2,"title":"有什么方法确定一个 Docker 容器运行状态？","slug":"有什么方法确定一个-docker-容器运行状态","link":"#有什么方法确定一个-docker-容器运行状态","children":[]},{"level":2,"title":"在 Dockerfile 配置文件中最常用的指令有哪些？","slug":"在-dockerfile-配置文件中最常用的指令有哪些","link":"#在-dockerfile-配置文件中最常用的指令有哪些","children":[]},{"level":2,"title":"什么类型的应用（无状态性或有状态性）更适合 Docker 容器技术？","slug":"什么类型的应用-无状态性或有状态性-更适合-docker-容器技术","link":"#什么类型的应用-无状态性或有状态性-更适合-docker-容器技术","children":[]},{"level":2,"title":"解释基本 Docker 应用流程","slug":"解释基本-docker-应用流程","link":"#解释基本-docker-应用流程","children":[]},{"level":2,"title":"Docker Image 和 Docker Layer (层)有什么不同？","slug":"docker-image-和-docker-layer-层-有什么不同","link":"#docker-image-和-docker-layer-层-有什么不同","children":[]},{"level":2,"title":"虚拟化技术是什么？","slug":"虚拟化技术是什么","link":"#虚拟化技术是什么","children":[]},{"level":2,"title":"虚拟管理层（程序）是什么？","slug":"虚拟管理层-程序-是什么","link":"#虚拟管理层-程序-是什么","children":[]},{"level":2,"title":"Docker 群（Swarm）是什么？","slug":"docker-群-swarm-是什么","link":"#docker-群-swarm-是什么","children":[]},{"level":2,"title":"在使用 Docker 技术的产品中如何监控其运行？","slug":"在使用-docker-技术的产品中如何监控其运行","link":"#在使用-docker-技术的产品中如何监控其运行","children":[]},{"level":2,"title":"什么是孤儿卷及如何删除它？","slug":"什么是孤儿卷及如何删除它","link":"#什么是孤儿卷及如何删除它","children":[]},{"level":2,"title":"什么是半虚拟化（Paravirtualization）？","slug":"什么是半虚拟化-paravirtualization","link":"#什么是半虚拟化-paravirtualization","children":[]},{"level":2,"title":"Docker 技术与虚拟机技术有何不同？","slug":"docker-技术与虚拟机技术有何不同","link":"#docker-技术与虚拟机技术有何不同","children":[]},{"level":2,"title":"请解释一下 docerfile 配置文件中的 ONBUILD 指令的用途含义？","slug":"请解释一下-docerfile-配置文件中的-onbuild-指令的用途含义","link":"#请解释一下-docerfile-配置文件中的-onbuild-指令的用途含义","children":[]},{"level":2,"title":"有否在创建有状态性的 Docker 应用的较好实践？最适合的场景有什么？","slug":"有否在创建有状态性的-docker-应用的较好实践-最适合的场景有什么","link":"#有否在创建有状态性的-docker-应用的较好实践-最适合的场景有什么","children":[]},{"level":2,"title":"在 Windows 系统上可以运行原生的 Docker 容器吗？","slug":"在-windows-系统上可以运行原生的-docker-容器吗","link":"#在-windows-系统上可以运行原生的-docker-容器吗","children":[]},{"level":2,"title":"在非 Linux 操作系统平台上如何运行 Docker ?","slug":"在非-linux-操作系统平台上如何运行-docker","link":"#在非-linux-操作系统平台上如何运行-docker","children":[]},{"level":2,"title":"容器化技术在底层的运行原理？","slug":"容器化技术在底层的运行原理","link":"#容器化技术在底层的运行原理","children":[]},{"level":2,"title":"说说容器化技术与虚拟化技术的优缺点","slug":"说说容器化技术与虚拟化技术的优缺点","link":"#说说容器化技术与虚拟化技术的优缺点","children":[]},{"level":2,"title":"如何使 Docker 适应多种运行环境？","slug":"如何使-docker-适应多种运行环境","link":"#如何使-docker-适应多种运行环境","children":[]},{"level":2,"title":"为什么 Docker compose 采取的是并不等待前面依赖服务项的容器启动就绪后再启动的组合容器启动策略？","slug":"为什么-docker-compose-采取的是并不等待前面依赖服务项的容器启动就绪后再启动的组合容器启动策略","link":"#为什么-docker-compose-采取的是并不等待前面依赖服务项的容器启动就绪后再启动的组合容器启动策略","children":[]}],"git":{"createdTime":1712020071000,"updatedTime":1712020071000,"contributors":[{"name":"xiaobai","email":"xiaobaidebug@gmail.com","commits":1}]},"readingTime":{"minutes":22.61,"words":6784},"filePathRelative":"架构/云原生/面试题.md","localizedDate":"2024年4月2日","autoDesc":true}');export{y as comp,A as data};
