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
  description: "超级好用的golang面试指南，面试前到golang guide补补",
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
          "面试, 程序员, golang, golang指南, mysql, redis, elastic search, kafka, rocketmq, 微服务, 分布式, Docker",
      },
    ],
    [
      "meta",
      { name: "description", content: "你需要的关于 golang 全栈后端开发的所有信息，包括但不限于mysql, redis, elasticsearch，微服务，kafka, 计算机网络，操作系统等信息" },
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
  ],
  plugins: [
    seoPlugin({
      hostname: "https://golangguide.top",
      canonical: "https://golangguide.top",
    }),
    tocPlugin({
      // 配置项
    }),
    '@vuepress/google-analytics',
    {
      'ga': 'G-K56SJCYRN9' // UA-00000000-0
    }
  ],
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
