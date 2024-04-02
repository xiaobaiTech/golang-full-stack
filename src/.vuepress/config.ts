import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import { tocPlugin } from '@vuepress/plugin-toc'
import theme from "./theme.js";
import { seoPlugin } from "vuepress-plugin-seo2";
import { pwaPlugin } from "vuepress-plugin-pwa2";


export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "golang全栈指南",
  description: "深入探索Golang全栈开发的世界，本网站提供了从基础到高级的全面学习资源，涵盖数据库、微服务、Kubernetes、Docker等关键技术，以及源码分析、开发工具和读书笔记等实用资料，旨在帮助开发者构建扎实的技术基础，掌握现代软件架构的核心原理。",
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
    head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" }],
    [
      "meta",
      {
        name: "keywords",
        content:
          "Golang基础, Golang源码, 数据库原理, MySQL, ElasticSearch, 微服务架构, Kafka消息队列, Nginx服务器, Redis缓存, RocketMQ, Kubernetes, Docker容器化, k8s集群管理, CI/CD持续集成, Linux操作系统, DevOps文化, 分布式系统, 中间件技术, 开发工具集, Git版本控制, IDE集成开发环境, 源码阅读技巧, 读书笔记分享, 开源项目资源",
      },
    ],
    [
      "meta",
      { name: "description", content: "深入探索Golang全栈开发的世界，本网站提供了从基础到高级的全面学习资源，涵盖数据库、微服务、Kubernetes、Docker等关键技术，以及源码分析、开发工具和读书笔记等实用资料，旨在帮助开发者构建扎实的技术基础，掌握现代软件架构的核心原理。" },
    ],
    ["meta", { name: "author", content: "https://www.xiaobaidebug.top/" }],

    ["meta", { name: "og:image", content: "https://golangguide.top/new_logo.png" }],
    ["meta", { property: "og:image", content: "https://golangguide.top/new_logo.png" }],
    ["meta", { name: "og:image:secure_url", content: "https://golangguide.top/new_logo.png" }],
    ["meta", { name: "og:url", content: "https://golangguide.top/" }],

    ["meta", { property: "og:title", content: "欢迎来到 golangguide - 你需要的关于 golang 全栈后端开发的所有信息，包括但不限于mysql, redis, elasticsearch，微服务，kafka等信息" }],
    [
      "meta",
      {
        name: "og:description",
        content: "golangguide Docs bring you all information you need about our protocol, APIs, SDKs, ZK Stack, and hyperchains. Start with our guides and tutorials, or go deep into our architecture and protocol specification.",
      },
    ],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: "Welcome to our Docs - All information you need about golangguide and ZK Stack" }],
    [
      "meta",
      {
        name: "twitter:description",
        content: "golangguide Docs bring you all information you need about our protocol, APIs, SDKs, ZK Stack, and hyperchains. Start with our guides and tutorials, or go deep into our architecture and protocol specification.",
      },
    ],
    ["meta", { name: "twitter:image:alt", content: "golangguide — Accelerating the mass adoption of crypto for personal sovereignty" }],

    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#1E69FF" }],
    ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
    ["meta", { name: "msapplication-TileColor", content: "#1E69FF" }],
    ["meta", { name: "msapplication-config", content: "/browserconfig.xml" }],
    ["meta", { name: "theme-color", content: "#1755F4" }],

    [
      "script",
      {},
      `
      window.addEventListener('load', function() {
        let contributors = document.querySelectorAll('.contributor');
        let contributorArr = Array.from(contributors);
        let topFive = contributorArr.slice(0, 5);
      
        topFive.forEach(function(contributor) {
          contributor.textContent = contributor.textContent.replace(',', '');
        });
      
        let lastComma = contributorArr[4];
        lastComma.textContent = lastComma.textContent.replace(',', '');
      
        let updatedList = topFive.map(function(contributor) {
          return contributor.textContent;
        }).join(', ');
          
        let contributorsDiv = document.querySelector('.contributors');
        contributorsDiv.innerHTML = '<span class="label">Contributors: </span>' + updatedList;
      
      });

      `,
    ],
    [
      'script',
      {},
      `
      <!-- Google tag (gtag.js) -->
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-K56SJCYRN9"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-K56SJCYRN9');
      </script>
      `
    ],   
  ],
  plugins: [
    seoPlugin({
      hostname: "https://golangguide.top",
      canonical: "https://golangguide.top",
      autoDescription: true,
    }),
    tocPlugin({
      // 配置项
    }),
  ],
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});

