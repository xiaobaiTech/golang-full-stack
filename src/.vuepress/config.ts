import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import { tocPlugin } from '@vuepress/plugin-toc'
import theme from "./theme.js";
import { googleAnalyticsPlugin } from '@vuepress/plugin-google-analytics'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "golang全栈指南",
  description: "深入探索Golang全栈开发的世界，本网站提供了从基础到高级的全面学习资源，涵盖数据库、微服务、Kubernetes、Docker等关键技术，以及源码分析、开发工具和读书笔记等实用资料，旨在帮助开发者构建扎实的技术基础，掌握现代软件架构的核心原理。",
  bundler: viteBundler({
    viteOptions: {
      plugins: [
        viteCompression({ algorithm: 'brotliCompress' }),
        viteCompression({ algorithm: 'gzip' }),
        viteImagemin({
          gifsicle: { optimizationLevel: 3 },
          mozjpeg: { quality: 75 },
          pngquant: { quality: [0.6, 0.8] },
          svgo: {}
        })
      ]
    },
    vuePluginOptions: {},
  }),
    head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" }],
    ["link", { rel: "dns-prefetch", href: "https://cdn.xiaobaidebug.top" }],
    ["link", { rel: "preconnect", href: "https://cdn.xiaobaidebug.top", crossorigin: true }],
    ["link", { rel: "alternate", type: "application/rss+xml", title: "RSS", href: "/feed.xml" }],
    ["link", { rel: "alternate", hreflang: "zh-CN", href: "https://golangguide.top/" }],
    ["link", { rel: "preload", as: "image", href: "/new_logo.png" }],
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
    ["meta", { property: "og:locale", content: "zh_CN" }],
    ["meta", { property: "og:type", content: "website" }],

    ["meta", { property: "og:title", content: "golang全栈指南 - 数据库/微服务/Kubernetes/Docker 等全站资源" }],
    ["meta", { name: "og:description", content: "系统化学习 Golang 全栈：数据库、微服务、Kubernetes、Docker、CI/CD、分布式与中间件等核心知识与实践。" }],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: "golang全栈指南" }],
    ["meta", { name: "twitter:description", content: "Golang 全栈开发从基础到架构的系统资源集合。" }],
    ["meta", { name: "twitter:image:alt", content: "golangguide" }],

    ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png" }],
    ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png" }],
    ["link", { rel: "manifest", href: "/site.webmanifest" }],
    ["link", { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#1E69FF" }],
    ["link", { rel: "shortcut icon", href: "/favicon.ico" }],
    ["meta", { name: "msapplication-TileColor", content: "#1E69FF" }],
    ["meta", { name: "msapplication-config", content: "/browserconfig.xml" }],
    ["meta", { name: "theme-color", content: "#1755F4" }],
  ],
  plugins: [
    tocPlugin({
      // 配置项
    }),
    ...(process.env.NODE_ENV === 'production' ? [googleAnalyticsPlugin({ id: 'G-K56SJCYRN9' })] : []),
  ],
  theme,

  // Enable it with pwa
  shouldPrefetch: false,
});
