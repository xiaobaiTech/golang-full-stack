// src/.vuepress/config.ts
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
import { tocPlugin } from "@vuepress/plugin-toc";

// src/.vuepress/theme.ts
import { hopeTheme } from "vuepress-theme-hope";

// src/.vuepress/navbar.ts
import { navbar } from "vuepress-theme-hope";
var navbar_default = navbar([
  "/",
  "/python/",
  // {
  //   text: 'Golang',
  //   // 这里是下拉列表展现形式。
  //   items: [
  //     {
  //       text: '学习路线',
  //       link: '/golang/学习路线'
  //     }, {
  //       text: '基础面试题',
  //       link: '/golang/面试题/1.Go入门'
  //     },{
  //       text: '进阶面试题',
  //       link: '/golang/面试题/2.Go进阶'
  //     }
  //   ]
  // },
  {
    text: "\u8BAD\u7EC3\u8425",
    icon: "campground",
    prefix: "/\u8BAD\u7EC3\u8425/",
    children: [
      {
        text: "\u4ECB\u7ECD",
        icon: "address-card",
        link: "/\u8BAD\u7EC3\u8425/\u4ECB\u7ECD"
      },
      {
        text: "\u5165\u8425\u987B\u77E5",
        icon: "brain",
        link: "/\u8BAD\u7EC3\u8425/\u5165\u8425\u987B\u77E5"
      }
    ]
  },
  {
    text: "\u8BA1\u7B97\u673A\u57FA\u7840",
    icon: "computer",
    prefix: "/\u8BA1\u7B97\u673A\u57FA\u7840/",
    children: [
      {
        text: "\u64CD\u4F5C\u7CFB\u7EDF",
        icon: "server",
        link: "/\u8BA1\u7B97\u673A\u57FA\u7840/\u64CD\u4F5C\u7CFB\u7EDF/"
      },
      {
        text: "\u7F51\u7EDC\u57FA\u7840",
        icon: "wifi",
        link: "/\u8BA1\u7B97\u673A\u57FA\u7840/\u7F51\u7EDC\u57FA\u7840/"
      }
    ]
  },
  {
    text: "\u67B6\u6784",
    icon: "folder-tree",
    prefix: "/\u67B6\u6784/",
    children: [
      {
        text: "Docker",
        icon: "box",
        link: "/\u67B6\u6784/Docker/"
      },
      {
        text: "\u5206\u5E03\u5F0F",
        icon: "manat-sign",
        link: "/\u67B6\u6784/\u5206\u5E03\u5F0F/"
      },
      {
        text: "\u5FAE\u670D\u52A1",
        icon: "microchip",
        link: "/\u67B6\u6784/\u5FAE\u670D\u52A1/"
      },
      {
        text: "\u8FD0\u7EF4",
        icon: "folder-open",
        link: "/\u67B6\u6784/\u8FD0\u7EF4/"
      }
    ]
  },
  {
    text: "\u4E2D\u95F4\u4EF6",
    icon: "align-center",
    prefix: "/\u4E2D\u95F4\u4EF6/",
    children: [
      {
        text: "ES",
        icon: "magnifying-glass",
        link: "/\u4E2D\u95F4\u4EF6/es/"
      },
      {
        text: "Kafka",
        icon: "chess-queen",
        link: "/\u4E2D\u95F4\u4EF6/kafka/"
      },
      {
        text: "Memcached",
        icon: "suitcase",
        link: "/\u4E2D\u95F4\u4EF6/Memcached/"
      },
      {
        text: "ClickHouse",
        icon: "house-laptop",
        link: "/\u4E2D\u95F4\u4EF6/ClickHouse/"
      },
      {
        text: "Mongodb",
        icon: "vr-cardboard",
        link: "/\u4E2D\u95F4\u4EF6/mongodb/"
      },
      {
        text: "Mysql",
        icon: "database",
        link: "/\u4E2D\u95F4\u4EF6/mysql/"
      },
      {
        text: "Nginx",
        icon: "network-wired",
        link: "/\u4E2D\u95F4\u4EF6/nginx/"
      },
      {
        text: "RabbitMQ",
        icon: "frog",
        link: "/\u4E2D\u95F4\u4EF6/rabbitmq/"
      },
      {
        text: "Redis",
        icon: "registered",
        link: "/\u4E2D\u95F4\u4EF6/redis/"
      },
      {
        text: "RocketMQ",
        icon: "rocket",
        link: "/\u4E2D\u95F4\u4EF6/rocketmq/"
      }
    ]
  },
  {
    text: "Golang",
    icon: "lightbulb",
    prefix: "/golang/",
    children: [
      {
        text: "\u5B66\u4E60\u8DEF\u7EBF",
        icon: "map-location-dot",
        prefix: "\u5B66\u4E60\u8DEF\u7EBF",
        link: "/golang/\u5B66\u4E60\u8DEF\u7EBF"
      },
      {
        text: "\u5E38\u7528\u5305\u5927\u5168",
        icon: "book",
        prefix: "\u5E38\u7528\u5305\u5927\u5168",
        link: "/golang/\u5E38\u7528\u5305\u5927\u5168"
      },
      {
        text: "\u57FA\u7840\u9762\u8BD5\u9898",
        icon: "disease",
        link: "/golang/\u9762\u8BD5\u9898/1.Go\u5165\u95E8"
      },
      {
        text: "\u8FDB\u9636\u9762\u8BD5\u9898",
        icon: "clipboard-question",
        link: "/golang/\u9762\u8BD5\u9898/2.Go\u8FDB\u9636"
      }
    ]
  },
  {
    text: "blog",
    icon: "book",
    link: "https://xiaobaidebug.top/"
  },
  {
    text: "sitemap",
    icon: "blog",
    link: "https://golangguide.top/sitemap.xml"
  }
]);

// src/.vuepress/sidebar.ts
import { sidebar } from "vuepress-theme-hope";
var sidebar_default = sidebar({
  "/python/": [
    {
      text: "python\u77E5\u8BC6\u4F53\u7CFB",
      icon: "laptop-code",
      link: "python/",
      children: "structure"
    }
  ],
  "/golang/": [
    {
      text: "golang\u77E5\u8BC6\u4F53\u7CFB",
      icon: "laptop-code",
      link: "golang/",
      children: "structure"
    }
  ],
  "/\u8BA1\u7B97\u673A\u57FA\u7840/": [
    {
      text: "\u8BA1\u7B97\u673A\u57FA\u7840",
      icon: "laptop-code",
      link: "\u8BA1\u7B97\u673A\u57FA\u7840/",
      children: "structure"
    }
  ],
  "/\u67B6\u6784/": [
    {
      text: "\u67B6\u6784",
      icon: "laptop-code",
      link: "\u67B6\u6784/",
      children: "structure"
    }
  ],
  "/\u8BAD\u7EC3\u8425/": [
    {
      text: "\u8BAD\u7EC3\u8425",
      icon: "laptop-code",
      link: "\u8BAD\u7EC3\u8425/",
      children: "structure"
    }
  ],
  "/\u4E2D\u95F4\u4EF6/": [
    {
      text: "\u4E2D\u95F4\u4EF6",
      icon: "laptop-code",
      link: "\u4E2D\u95F4\u4EF6/",
      children: "structure"
    }
  ]
});

// src/.vuepress/theme.ts
var theme_default = hopeTheme({
  hostname: "https://golangguide.top",
  globalLayout: "./theme/layouts/GlobalzLayout.vue",
  author: {
    name: "\u5C0F\u767Ddebug",
    url: "https://xiaobaidebug.top/"
  },
  iconAssets: "fontawesome-with-brands",
  logo: "/new_logo.png",
  repo: "xiaobaiTech/golang-full-stack",
  docsDir: "src",
  // navbar
  navbar: navbar_default,
  // sidebar
  sidebar: sidebar_default,
  footer: "\u9ED8\u8BA4\u9875\u811A",
  displayFooter: true,
  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"]
    }
  },
  // page meta
  metaLocales: {
    editLink: "\u5728 GitHub \u4E0A\u7F16\u8F91\u6B64\u9875"
  },
  plugins: {
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "xiaobaiTech/golang-full-stack",
      repoId: "R_kgDOKcTHvw",
      category: "Announcements",
      categoryId: "DIC_kwDOKcTHv84CZ4fp"
    },
    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      chart: true,
      codetabs: true,
      demo: true,
      echarts: true,
      figure: true,
      flowchart: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"]
      },
      revealJs: ["highlight", "math", "search", "notes", "zoom"],
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended"
              };
          }
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true
    },
    components: {
      components: ["Badge", "BiliBili"],
      rootComponents: {
        notice: [
          {
            path: "/",
            title: "\u901A\u77E5",
            content: "\u5173\u6CE8\u516C\u4F17\u53F7\u3010\u5C0F\u767Ddebug\u3011\n  \u56DE\u590D\u3010\u9762\u8BD5\u3011\u83B7\u53D6\u6700\u5168\u9762\u8BD5pdf",
            fullscreen: false,
            showOnce: false
          }
        ]
      }
    },
    feed: {
      rss: true
    },
    sitemap: {
      changefreq: "weekly"
    }
    // uncomment these if you want a pwa
    // pwa: {
    //   favicon: "/favicon.ico",
    //   cacheHTML: true,
    //   cachePic: true,
    //   appendBase: true,
    //   apple: {
    //     icon: "/assets/icon/apple-icon-152.png",
    //     statusBarColor: "black",
    //   },
    //   msTile: {
    //     image: "/assets/icon/ms-icon-144.png",
    //     color: "#ffffff",
    //   },
    //   manifest: {
    //     icons: [
    //       {
    //         src: "/assets/icon/chrome-mask-512.png",
    //         sizes: "512x512",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-mask-192.png",
    //         sizes: "192x192",
    //         purpose: "maskable",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-512.png",
    //         sizes: "512x512",
    //         type: "image/png",
    //       },
    //       {
    //         src: "/assets/icon/chrome-192.png",
    //         sizes: "192x192",
    //         type: "image/png",
    //       },
    //     ],
    //     shortcuts: [
    //       {
    //         name: "Demo",
    //         short_name: "Demo",
    //         url: "/demo/",
    //         icons: [
    //           {
    //             src: "/assets/icon/guide-maskable.png",
    //             sizes: "192x192",
    //             purpose: "maskable",
    //             type: "image/png",
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // },
  }
});

// src/.vuepress/config.ts
import { seoPlugin } from "vuepress-plugin-seo2";
import pkg from "@vuepress/plugin-google-analytics";
var { googleAnalyticsPlugin } = pkg;
var config_default = defineUserConfig({
  base: "/",
  lang: "zh-CN",
  title: "golang\u5168\u6808\u6307\u5357",
  description: "\u8D85\u7EA7\u597D\u7528\u7684golang\u9762\u8BD5\u6307\u5357\uFF0C\u9762\u8BD5\u524D\u5230golang guide\u8865\u8865",
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {}
  }),
  head: [
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    ["link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true }],
    ["link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" }],
    [
      "meta",
      {
        name: "keywords",
        content: "\u9762\u8BD5, \u7A0B\u5E8F\u5458, golang, golang\u6307\u5357, mysql, redis, elastic search, kafka, rocketmq, \u5FAE\u670D\u52A1, \u5206\u5E03\u5F0F, Docker"
      }
    ],
    [
      "meta",
      { name: "description", content: "\u4F60\u9700\u8981\u7684\u5173\u4E8E golang \u5168\u6808\u540E\u7AEF\u5F00\u53D1\u7684\u6240\u6709\u4FE1\u606F\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8Emysql, redis, elasticsearch\uFF0C\u5FAE\u670D\u52A1\uFF0Ckafka, \u8BA1\u7B97\u673A\u7F51\u7EDC\uFF0C\u64CD\u4F5C\u7CFB\u7EDF\u7B49\u4FE1\u606F" }
    ],
    ["meta", { name: "author", content: "https://www.xiaobaidebug.top/" }],
    ["meta", { name: "og:image", content: "https://golangguide.top/new_logo.png" }],
    ["meta", { property: "og:image", content: "https://golangguide.top/new_logo.png" }],
    ["meta", { name: "og:image:secure_url", content: "https://golangguide.top/new_logo.png" }],
    ["meta", { name: "og:url", content: "https://golangguide.top/" }],
    ["meta", { property: "og:title", content: "\u6B22\u8FCE\u6765\u5230 golangguide - \u4F60\u9700\u8981\u7684\u5173\u4E8E golang \u5168\u6808\u540E\u7AEF\u5F00\u53D1\u7684\u6240\u6709\u4FE1\u606F\uFF0C\u5305\u62EC\u4F46\u4E0D\u9650\u4E8Emysql, redis, elasticsearch\uFF0C\u5FAE\u670D\u52A1\uFF0Ckafka\u7B49\u4FE1\u606F" }],
    [
      "meta",
      {
        name: "og:description",
        content: "golangguide Docs bring you all information you need about our protocol, APIs, SDKs, ZK Stack, and hyperchains. Start with our guides and tutorials, or go deep into our architecture and protocol specification."
      }
    ],
    ["meta", { name: "twitter:card", content: "summary" }],
    ["meta", { name: "twitter:title", content: "Welcome to our Docs - All information you need about golangguide and ZK Stack" }],
    [
      "meta",
      {
        name: "twitter:description",
        content: "golangguide Docs bring you all information you need about our protocol, APIs, SDKs, ZK Stack, and hyperchains. Start with our guides and tutorials, or go deep into our architecture and protocol specification."
      }
    ],
    ["meta", { name: "twitter:image:alt", content: "golangguide \u2014 Accelerating the mass adoption of crypto for personal sovereignty" }],
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

      `
    ]
  ],
  plugins: [
    seoPlugin({
      hostname: "https://golangguide.top",
      canonical: "https://golangguide.top"
    }),
    tocPlugin({
      // 配置项
    }),
    googleAnalyticsPlugin({
      id: "G-XXXXXXXXXX"
    })
  ],
  theme: theme_default
  // Enable it with pwa
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9wcm9qZWN0L2dvbGFuZy1mdWxsLXN0YWNrL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L3Byb2plY3QvZ29sYW5nLWZ1bGwtc3RhY2svc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvcHJvamVjdC9nb2xhbmctZnVsbC1zdGFjay9zcmMvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tIFwidnVlcHJlc3NcIjtcbmltcG9ydCB7IHZpdGVCdW5kbGVyIH0gZnJvbSAnQHZ1ZXByZXNzL2J1bmRsZXItdml0ZSdcbmltcG9ydCB7IHRvY1BsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tdG9jJ1xuaW1wb3J0IHRoZW1lIGZyb20gXCIuL3RoZW1lLmpzXCI7XG5pbXBvcnQgeyBzZW9QbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLXNlbzJcIjtcbmltcG9ydCB7IHB3YVBsdWdpbiB9IGZyb20gXCJ2dWVwcmVzcy1wbHVnaW4tcHdhMlwiO1xuaW1wb3J0IHBrZyBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWdvb2dsZS1hbmFseXRpY3MnO1xuY29uc3QgeyBnb29nbGVBbmFseXRpY3NQbHVnaW4gfSA9IHBrZztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIGJhc2U6IFwiL1wiLFxuXG4gIGxhbmc6IFwiemgtQ05cIixcbiAgdGl0bGU6IFwiZ29sYW5nXHU1MTY4XHU2ODA4XHU2MzA3XHU1MzU3XCIsXG4gIGRlc2NyaXB0aW9uOiBcIlx1OEQ4NVx1N0VBN1x1NTk3RFx1NzUyOFx1NzY4NGdvbGFuZ1x1OTc2Mlx1OEJENVx1NjMwN1x1NTM1N1x1RkYwQ1x1OTc2Mlx1OEJENVx1NTI0RFx1NTIzMGdvbGFuZyBndWlkZVx1ODg2NVx1ODg2NVwiLFxuICBidW5kbGVyOiB2aXRlQnVuZGxlcih7XG4gICAgdml0ZU9wdGlvbnM6IHt9LFxuICAgIHZ1ZVBsdWdpbk9wdGlvbnM6IHt9LFxuICB9KSxcbiAgICBoZWFkOiBbXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJwcmVjb25uZWN0XCIsIGhyZWY6IFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbVwiIH1dLFxuICAgIFtcImxpbmtcIiwgeyByZWw6IFwicHJlY29ubmVjdFwiLCBocmVmOiBcImh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb21cIiwgY3Jvc3NvcmlnaW46IHRydWUgfV0sXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJzdHlsZXNoZWV0XCIsIGhyZWY6IFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JbnRlcjp3Z2h0QDQwMDs1MDA7NzAwJmRpc3BsYXk9c3dhcFwiIH1dLFxuICAgIFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAge1xuICAgICAgICBuYW1lOiBcImtleXdvcmRzXCIsXG4gICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgXCJcdTk3NjJcdThCRDUsIFx1N0EwQlx1NUU4Rlx1NTQ1OCwgZ29sYW5nLCBnb2xhbmdcdTYzMDdcdTUzNTcsIG15c3FsLCByZWRpcywgZWxhc3RpYyBzZWFyY2gsIGthZmthLCByb2NrZXRtcSwgXHU1RkFFXHU2NzBEXHU1MkExLCBcdTUyMDZcdTVFMDNcdTVGMEYsIERvY2tlclwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAgeyBuYW1lOiBcImRlc2NyaXB0aW9uXCIsIGNvbnRlbnQ6IFwiXHU0RjYwXHU5NzAwXHU4OTgxXHU3Njg0XHU1MTczXHU0RThFIGdvbGFuZyBcdTUxNjhcdTY4MDhcdTU0MEVcdTdBRUZcdTVGMDBcdTUzRDFcdTc2ODRcdTYyNDBcdTY3MDlcdTRGRTFcdTYwNkZcdUZGMENcdTUzMDVcdTYyRUNcdTRGNDZcdTRFMERcdTk2NTBcdTRFOEVteXNxbCwgcmVkaXMsIGVsYXN0aWNzZWFyY2hcdUZGMENcdTVGQUVcdTY3MERcdTUyQTFcdUZGMENrYWZrYSwgXHU4QkExXHU3Qjk3XHU2NzNBXHU3RjUxXHU3RURDXHVGRjBDXHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGXHU3QjQ5XHU0RkUxXHU2MDZGXCIgfSxcbiAgICBdLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcImF1dGhvclwiLCBjb250ZW50OiBcImh0dHBzOi8vd3d3LnhpYW9iYWlkZWJ1Zy50b3AvXCIgfV0sXG5cbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJvZzppbWFnZVwiLCBjb250ZW50OiBcImh0dHBzOi8vZ29sYW5nZ3VpZGUudG9wL25ld19sb2dvLnBuZ1wiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzppbWFnZVwiLCBjb250ZW50OiBcImh0dHBzOi8vZ29sYW5nZ3VpZGUudG9wL25ld19sb2dvLnBuZ1wiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcIm9nOmltYWdlOnNlY3VyZV91cmxcIiwgY29udGVudDogXCJodHRwczovL2dvbGFuZ2d1aWRlLnRvcC9uZXdfbG9nby5wbmdcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJvZzp1cmxcIiwgY29udGVudDogXCJodHRwczovL2dvbGFuZ2d1aWRlLnRvcC9cIiB9XSxcblxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzp0aXRsZVwiLCBjb250ZW50OiBcIlx1NkIyMlx1OEZDRVx1Njc2NVx1NTIzMCBnb2xhbmdndWlkZSAtIFx1NEY2MFx1OTcwMFx1ODk4MVx1NzY4NFx1NTE3M1x1NEU4RSBnb2xhbmcgXHU1MTY4XHU2ODA4XHU1NDBFXHU3QUVGXHU1RjAwXHU1M0QxXHU3Njg0XHU2MjQwXHU2NzA5XHU0RkUxXHU2MDZGXHVGRjBDXHU1MzA1XHU2MkVDXHU0RjQ2XHU0RTBEXHU5NjUwXHU0RThFbXlzcWwsIHJlZGlzLCBlbGFzdGljc2VhcmNoXHVGRjBDXHU1RkFFXHU2NzBEXHU1MkExXHVGRjBDa2Fma2FcdTdCNDlcdTRGRTFcdTYwNkZcIiB9XSxcbiAgICBbXG4gICAgICBcIm1ldGFcIixcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJvZzpkZXNjcmlwdGlvblwiLFxuICAgICAgICBjb250ZW50OiBcImdvbGFuZ2d1aWRlIERvY3MgYnJpbmcgeW91IGFsbCBpbmZvcm1hdGlvbiB5b3UgbmVlZCBhYm91dCBvdXIgcHJvdG9jb2wsIEFQSXMsIFNES3MsIFpLIFN0YWNrLCBhbmQgaHlwZXJjaGFpbnMuIFN0YXJ0IHdpdGggb3VyIGd1aWRlcyBhbmQgdHV0b3JpYWxzLCBvciBnbyBkZWVwIGludG8gb3VyIGFyY2hpdGVjdHVyZSBhbmQgcHJvdG9jb2wgc3BlY2lmaWNhdGlvbi5cIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmNhcmRcIiwgY29udGVudDogXCJzdW1tYXJ5XCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidHdpdHRlcjp0aXRsZVwiLCBjb250ZW50OiBcIldlbGNvbWUgdG8gb3VyIERvY3MgLSBBbGwgaW5mb3JtYXRpb24geW91IG5lZWQgYWJvdXQgZ29sYW5nZ3VpZGUgYW5kIFpLIFN0YWNrXCIgfV0sXG4gICAgW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwidHdpdHRlcjpkZXNjcmlwdGlvblwiLFxuICAgICAgICBjb250ZW50OiBcImdvbGFuZ2d1aWRlIERvY3MgYnJpbmcgeW91IGFsbCBpbmZvcm1hdGlvbiB5b3UgbmVlZCBhYm91dCBvdXIgcHJvdG9jb2wsIEFQSXMsIFNES3MsIFpLIFN0YWNrLCBhbmQgaHlwZXJjaGFpbnMuIFN0YXJ0IHdpdGggb3VyIGd1aWRlcyBhbmQgdHV0b3JpYWxzLCBvciBnbyBkZWVwIGludG8gb3VyIGFyY2hpdGVjdHVyZSBhbmQgcHJvdG9jb2wgc3BlY2lmaWNhdGlvbi5cIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmltYWdlOmFsdFwiLCBjb250ZW50OiBcImdvbGFuZ2d1aWRlIFx1MjAxNCBBY2NlbGVyYXRpbmcgdGhlIG1hc3MgYWRvcHRpb24gb2YgY3J5cHRvIGZvciBwZXJzb25hbCBzb3ZlcmVpZ250eVwiIH1dLFxuXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJhcHBsZS10b3VjaC1pY29uXCIsIHNpemVzOiBcIjE4MHgxODBcIiwgaHJlZjogXCIvYXBwbGUtdG91Y2gtaWNvbi5wbmdcIiB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgdHlwZTogXCJpbWFnZS9wbmdcIiwgc2l6ZXM6IFwiMzJ4MzJcIiwgaHJlZjogXCIvZmF2aWNvbi0zMngzMi5wbmdcIiB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgdHlwZTogXCJpbWFnZS9wbmdcIiwgc2l6ZXM6IFwiMTZ4MTZcIiwgaHJlZjogXCIvZmF2aWNvbi0xNngxNi5wbmdcIiB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcIm1hbmlmZXN0XCIsIGhyZWY6IFwiL3NpdGUud2VibWFuaWZlc3RcIiB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcIm1hc2staWNvblwiLCBocmVmOiBcIi9zYWZhcmktcGlubmVkLXRhYi5zdmdcIiwgY29sb3I6IFwiIzFFNjlGRlwiIH1dLFxuICAgIFtcImxpbmtcIiwgeyByZWw6IFwic2hvcnRjdXQgaWNvblwiLCBocmVmOiBcIi9mYXZpY29uLmljb1wiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcIm1zYXBwbGljYXRpb24tVGlsZUNvbG9yXCIsIGNvbnRlbnQ6IFwiIzFFNjlGRlwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcIm1zYXBwbGljYXRpb24tY29uZmlnXCIsIGNvbnRlbnQ6IFwiL2Jyb3dzZXJjb25maWcueG1sXCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidGhlbWUtY29sb3JcIiwgY29udGVudDogXCIjMTc1NUY0XCIgfV0sXG5cbiAgICBbXG4gICAgICBcInNjcmlwdFwiLFxuICAgICAge30sXG4gICAgICBgXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY29udHJpYnV0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRyaWJ1dG9yJyk7XG4gICAgICAgIGxldCBjb250cmlidXRvckFyciA9IEFycmF5LmZyb20oY29udHJpYnV0b3JzKTtcbiAgICAgICAgbGV0IHRvcEZpdmUgPSBjb250cmlidXRvckFyci5zbGljZSgwLCA1KTtcbiAgICAgIFxuICAgICAgICB0b3BGaXZlLmZvckVhY2goZnVuY3Rpb24oY29udHJpYnV0b3IpIHtcbiAgICAgICAgICBjb250cmlidXRvci50ZXh0Q29udGVudCA9IGNvbnRyaWJ1dG9yLnRleHRDb250ZW50LnJlcGxhY2UoJywnLCAnJyk7XG4gICAgICAgIH0pO1xuICAgICAgXG4gICAgICAgIGxldCBsYXN0Q29tbWEgPSBjb250cmlidXRvckFycls0XTtcbiAgICAgICAgbGFzdENvbW1hLnRleHRDb250ZW50ID0gbGFzdENvbW1hLnRleHRDb250ZW50LnJlcGxhY2UoJywnLCAnJyk7XG4gICAgICBcbiAgICAgICAgbGV0IHVwZGF0ZWRMaXN0ID0gdG9wRml2ZS5tYXAoZnVuY3Rpb24oY29udHJpYnV0b3IpIHtcbiAgICAgICAgICByZXR1cm4gY29udHJpYnV0b3IudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pLmpvaW4oJywgJyk7XG4gICAgICAgICAgXG4gICAgICAgIGxldCBjb250cmlidXRvcnNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJpYnV0b3JzJyk7XG4gICAgICAgIGNvbnRyaWJ1dG9yc0Rpdi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPkNvbnRyaWJ1dG9yczogPC9zcGFuPicgKyB1cGRhdGVkTGlzdDtcbiAgICAgIFxuICAgICAgfSk7XG5cbiAgICAgIGAsXG4gICAgXSxcbiAgXSxcbiAgcGx1Z2luczogW1xuICAgIHNlb1BsdWdpbih7XG4gICAgICBob3N0bmFtZTogXCJodHRwczovL2dvbGFuZ2d1aWRlLnRvcFwiLFxuICAgICAgY2Fub25pY2FsOiBcImh0dHBzOi8vZ29sYW5nZ3VpZGUudG9wXCIsXG4gICAgfSksXG4gICAgdG9jUGx1Z2luKHtcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OTg3OVxuICAgIH0pLFxuICAgIGdvb2dsZUFuYWx5dGljc1BsdWdpbih7XG4gICAgICBpZDogXCJHLVhYWFhYWFhYWFhcIixcbiAgICB9KSxcbiAgXSxcbiAgdGhlbWUsXG5cbiAgLy8gRW5hYmxlIGl0IHdpdGggcHdhXG4gIC8vIHNob3VsZFByZWZldGNoOiBmYWxzZSxcbn0pO1xuXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9yb290L3Byb2plY3QvZ29sYW5nLWZ1bGwtc3RhY2svc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvcHJvamVjdC9nb2xhbmctZnVsbC1zdGFjay9zcmMvLnZ1ZXByZXNzL3RoZW1lLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9yb290L3Byb2plY3QvZ29sYW5nLWZ1bGwtc3RhY2svc3JjLy52dWVwcmVzcy90aGVtZS50c1wiO2ltcG9ydCB7IGhvcGVUaGVtZSB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5pbXBvcnQgbmF2YmFyIGZyb20gXCIuL25hdmJhci5qc1wiO1xuaW1wb3J0IHNpZGViYXIgZnJvbSBcIi4vc2lkZWJhci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBob3BlVGhlbWUoe1xuICBob3N0bmFtZTogXCJodHRwczovL2dvbGFuZ2d1aWRlLnRvcFwiLFxuICBnbG9iYWxMYXlvdXQ6ICcuL3RoZW1lL2xheW91dHMvR2xvYmFsekxheW91dC52dWUnLFxuICBhdXRob3I6IHtcbiAgICBuYW1lOiBcIlx1NUMwRlx1NzY3RGRlYnVnXCIsXG4gICAgdXJsOiBcImh0dHBzOi8veGlhb2JhaWRlYnVnLnRvcC9cIixcbiAgfSxcblxuICBpY29uQXNzZXRzOiBcImZvbnRhd2Vzb21lLXdpdGgtYnJhbmRzXCIsXG5cbiAgbG9nbzogXCIvbmV3X2xvZ28ucG5nXCIsXG5cbiAgcmVwbzogXCJ4aWFvYmFpVGVjaC9nb2xhbmctZnVsbC1zdGFja1wiLFxuXG4gIGRvY3NEaXI6IFwic3JjXCIsXG5cbiAgLy8gbmF2YmFyXG4gIG5hdmJhcixcblxuICAvLyBzaWRlYmFyXG4gIHNpZGViYXIsXG5cbiAgZm9vdGVyOiBcIlx1OUVEOFx1OEJBNFx1OTg3NVx1ODExQVwiLFxuXG4gIGRpc3BsYXlGb290ZXI6IHRydWUsXG5cbiAgZW5jcnlwdDoge1xuICAgIGNvbmZpZzoge1xuICAgICAgXCIvZGVtby9lbmNyeXB0Lmh0bWxcIjogW1wiMTIzNFwiXSxcbiAgICB9LFxuICB9LFxuXG4gIC8vIHBhZ2UgbWV0YVxuICBtZXRhTG9jYWxlczoge1xuICAgIGVkaXRMaW5rOiBcIlx1NTcyOCBHaXRIdWIgXHU0RTBBXHU3RjE2XHU4RjkxXHU2QjY0XHU5ODc1XCIsXG4gIH0sXG5cbiAgcGx1Z2luczoge1xuICAgIC8vIFlvdSBzaG91bGQgZ2VuZXJhdGUgYW5kIHVzZSB5b3VyIG93biBjb21tZW50IHNlcnZpY2VcbiAgICBjb21tZW50OiB7XG4gICAgICBwcm92aWRlcjogXCJHaXNjdXNcIixcbiAgICAgIHJlcG86IFwieGlhb2JhaVRlY2gvZ29sYW5nLWZ1bGwtc3RhY2tcIixcbiAgICAgIHJlcG9JZDogXCJSX2tnRE9LY1RIdndcIixcbiAgICAgIGNhdGVnb3J5OiBcIkFubm91bmNlbWVudHNcIixcbiAgICAgIGNhdGVnb3J5SWQ6IFwiRElDX2t3RE9LY1RIdjg0Q1o0ZnBcIixcbiAgICB9LFxuICAgIC8vIEFsbCBmZWF0dXJlcyBhcmUgZW5hYmxlZCBmb3IgZGVtbywgb25seSBwcmVzZXJ2ZSBmZWF0dXJlcyB5b3UgbmVlZCBoZXJlXG4gICAgbWRFbmhhbmNlOiB7XG4gICAgICBhbGlnbjogdHJ1ZSxcbiAgICAgIGF0dHJzOiB0cnVlLFxuICAgICAgY2hhcnQ6IHRydWUsXG4gICAgICBjb2RldGFiczogdHJ1ZSxcbiAgICAgIGRlbW86IHRydWUsXG4gICAgICBlY2hhcnRzOiB0cnVlLFxuICAgICAgZmlndXJlOiB0cnVlLFxuICAgICAgZmxvd2NoYXJ0OiB0cnVlLFxuICAgICAgZ2ZtOiB0cnVlLFxuICAgICAgaW1nTGF6eWxvYWQ6IHRydWUsXG4gICAgICBpbWdTaXplOiB0cnVlLFxuICAgICAgaW5jbHVkZTogdHJ1ZSxcbiAgICAgIGthdGV4OiB0cnVlLFxuICAgICAgbWFyazogdHJ1ZSxcbiAgICAgIG1lcm1haWQ6IHRydWUsXG4gICAgICBwbGF5Z3JvdW5kOiB7XG4gICAgICAgIHByZXNldHM6IFtcInRzXCIsIFwidnVlXCJdLFxuICAgICAgfSxcbiAgICAgIHJldmVhbEpzOiBbXCJoaWdobGlnaHRcIiwgXCJtYXRoXCIsIFwic2VhcmNoXCIsIFwibm90ZXNcIiwgXCJ6b29tXCJdLFxuICAgICAgc3R5bGl6ZTogW1xuICAgICAgICB7XG4gICAgICAgICAgbWF0Y2hlcjogXCJSZWNvbW1lbmRlZFwiLFxuICAgICAgICAgIHJlcGxhY2VyOiAoeyB0YWcgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRhZyA9PT0gXCJlbVwiKVxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHRhZzogXCJCYWRnZVwiLFxuICAgICAgICAgICAgICAgIGF0dHJzOiB7IHR5cGU6IFwidGlwXCIgfSxcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgICBzdWI6IHRydWUsXG4gICAgICBzdXA6IHRydWUsXG4gICAgICB0YWJzOiB0cnVlLFxuICAgICAgdlByZTogdHJ1ZSxcbiAgICAgIHZ1ZVBsYXlncm91bmQ6IHRydWUsXG4gICAgfSxcbiAgICBjb21wb25lbnRzOiB7XG4gICAgICBjb21wb25lbnRzOiBbXCJCYWRnZVwiLCBcIkJpbGlCaWxpXCJdLFxuICAgICAgcm9vdENvbXBvbmVudHM6IHtcbiAgICAgICAgbm90aWNlOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgcGF0aDogXCIvXCIsXG4gICAgICAgICAgICB0aXRsZTogXCJcdTkwMUFcdTc3RTVcIixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFwiXHU1MTczXHU2Q0U4XHU1MTZDXHU0RjE3XHU1M0Y3XHUzMDEwXHU1QzBGXHU3NjdEZGVidWdcdTMwMTFcXG4gIFx1NTZERVx1NTkwRFx1MzAxMFx1OTc2Mlx1OEJENVx1MzAxMVx1ODNCN1x1NTNENlx1NjcwMFx1NTE2OFx1OTc2Mlx1OEJENXBkZlwiLFxuICAgICAgICAgICAgZnVsbHNjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICBzaG93T25jZTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSxcblxuXG4gICAgZmVlZDoge1xuICAgICAgcnNzOiB0cnVlLFxuICAgIH0sXG5cbiAgICBzaXRlbWFwOiB7XG4gICAgICBjaGFuZ2VmcmVxOiBcIndlZWtseVwiLFxuICAgIH0sXG5cbiAgICAvLyB1bmNvbW1lbnQgdGhlc2UgaWYgeW91IHdhbnQgYSBwd2FcbiAgICAvLyBwd2E6IHtcbiAgICAvLyAgIGZhdmljb246IFwiL2Zhdmljb24uaWNvXCIsXG4gICAgLy8gICBjYWNoZUhUTUw6IHRydWUsXG4gICAgLy8gICBjYWNoZVBpYzogdHJ1ZSxcbiAgICAvLyAgIGFwcGVuZEJhc2U6IHRydWUsXG4gICAgLy8gICBhcHBsZToge1xuICAgIC8vICAgICBpY29uOiBcIi9hc3NldHMvaWNvbi9hcHBsZS1pY29uLTE1Mi5wbmdcIixcbiAgICAvLyAgICAgc3RhdHVzQmFyQ29sb3I6IFwiYmxhY2tcIixcbiAgICAvLyAgIH0sXG4gICAgLy8gICBtc1RpbGU6IHtcbiAgICAvLyAgICAgaW1hZ2U6IFwiL2Fzc2V0cy9pY29uL21zLWljb24tMTQ0LnBuZ1wiLFxuICAgIC8vICAgICBjb2xvcjogXCIjZmZmZmZmXCIsXG4gICAgLy8gICB9LFxuICAgIC8vICAgbWFuaWZlc3Q6IHtcbiAgICAvLyAgICAgaWNvbnM6IFtcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS1tYXNrLTUxMi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAvLyAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS1tYXNrLTE5Mi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjE5MngxOTJcIixcbiAgICAvLyAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS01MTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCI1MTJ4NTEyXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgICAge1xuICAgIC8vICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9jaHJvbWUtMTkyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICBdLFxuICAgIC8vICAgICBzaG9ydGN1dHM6IFtcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBuYW1lOiBcIkRlbW9cIixcbiAgICAvLyAgICAgICAgIHNob3J0X25hbWU6IFwiRGVtb1wiLFxuICAgIC8vICAgICAgICAgdXJsOiBcIi9kZW1vL1wiLFxuICAgIC8vICAgICAgICAgaWNvbnM6IFtcbiAgICAvLyAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vZ3VpZGUtbWFza2FibGUucG5nXCIsXG4gICAgLy8gICAgICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgICAgIHB1cnBvc2U6IFwibWFza2FibGVcIixcbiAgICAvLyAgICAgICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgXSxcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICBdLFxuICAgIC8vICAgfSxcbiAgICAvLyB9LFxuICB9LFxufSk7XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9yb290L3Byb2plY3QvZ29sYW5nLWZ1bGwtc3RhY2svc3JjLy52dWVwcmVzc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvcHJvamVjdC9nb2xhbmctZnVsbC1zdGFjay9zcmMvLnZ1ZXByZXNzL25hdmJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC9wcm9qZWN0L2dvbGFuZy1mdWxsLXN0YWNrL3NyYy8udnVlcHJlc3MvbmF2YmFyLnRzXCI7aW1wb3J0IHsgbmF2YmFyIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcblxuZXhwb3J0IGRlZmF1bHQgbmF2YmFyKFtcbiAgXCIvXCIsXG4gIFwiL3B5dGhvbi9cIixcbiAgLy8ge1xuICAvLyAgIHRleHQ6ICdHb2xhbmcnLFxuICAvLyAgIC8vIFx1OEZEOVx1OTFDQ1x1NjYyRlx1NEUwQlx1NjJDOVx1NTIxN1x1ODg2OFx1NUM1NVx1NzNCMFx1NUY2Mlx1NUYwRlx1MzAwMlxuICAvLyAgIGl0ZW1zOiBbXG4gIC8vICAgICB7XG4gIC8vICAgICAgIHRleHQ6ICdcdTVCNjZcdTRFNjBcdThERUZcdTdFQkYnLFxuICAvLyAgICAgICBsaW5rOiAnL2dvbGFuZy9cdTVCNjZcdTRFNjBcdThERUZcdTdFQkYnXG4gIC8vICAgICB9LCB7XG4gIC8vICAgICAgIHRleHQ6ICdcdTU3RkFcdTc4NDBcdTk3NjJcdThCRDVcdTk4OTgnLFxuICAvLyAgICAgICBsaW5rOiAnL2dvbGFuZy9cdTk3NjJcdThCRDVcdTk4OTgvMS5Hb1x1NTE2NVx1OTVFOCdcbiAgLy8gICAgIH0se1xuICAvLyAgICAgICB0ZXh0OiAnXHU4RkRCXHU5NjM2XHU5NzYyXHU4QkQ1XHU5ODk4JyxcbiAgLy8gICAgICAgbGluazogJy9nb2xhbmcvXHU5NzYyXHU4QkQ1XHU5ODk4LzIuR29cdThGREJcdTk2MzYnXG4gIC8vICAgICB9XG4gIC8vICAgXVxuICAvLyB9LFxuICB7XG4gICAgdGV4dDogXCJcdThCQURcdTdFQzNcdTg0MjVcIixcbiAgICBpY29uOiBcImNhbXBncm91bmRcIixcbiAgICBwcmVmaXg6IFwiL1x1OEJBRFx1N0VDM1x1ODQyNS9cIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1NEVDQlx1N0VDRFwiLFxuICAgICAgICBpY29uOiBcImFkZHJlc3MtY2FyZFwiLFxuICAgICAgICBsaW5rOiAnL1x1OEJBRFx1N0VDM1x1ODQyNS9cdTRFQ0JcdTdFQ0QnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1NTE2NVx1ODQyNVx1OTg3Qlx1NzdFNVwiLFxuICAgICAgICBpY29uOiBcImJyYWluXCIsXG4gICAgICAgIGxpbms6ICcvXHU4QkFEXHU3RUMzXHU4NDI1L1x1NTE2NVx1ODQyNVx1OTg3Qlx1NzdFNSdcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiXHU4QkExXHU3Qjk3XHU2NzNBXHU1N0ZBXHU3ODQwXCIsXG4gICAgaWNvbjogXCJjb21wdXRlclwiLFxuICAgIHByZWZpeDogXCIvXHU4QkExXHU3Qjk3XHU2NzNBXHU1N0ZBXHU3ODQwL1wiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGXCIsXG4gICAgICAgIGljb246IFwic2VydmVyXCIsXG4gICAgICAgIGxpbms6ICcvXHU4QkExXHU3Qjk3XHU2NzNBXHU1N0ZBXHU3ODQwL1x1NjRDRFx1NEY1Q1x1N0NGQlx1N0VERi8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1N0Y1MVx1N0VEQ1x1NTdGQVx1Nzg0MFwiLFxuICAgICAgICBpY29uOiBcIndpZmlcIixcbiAgICAgICAgbGluazogJy9cdThCQTFcdTdCOTdcdTY3M0FcdTU3RkFcdTc4NDAvXHU3RjUxXHU3RURDXHU1N0ZBXHU3ODQwLydcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiXHU2N0I2XHU2Nzg0XCIsXG4gICAgaWNvbjogXCJmb2xkZXItdHJlZVwiLFxuICAgIHByZWZpeDogXCIvXHU2N0I2XHU2Nzg0L1wiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiRG9ja2VyXCIsXG4gICAgICAgIGljb246IFwiYm94XCIsXG4gICAgICAgIGxpbms6ICcvXHU2N0I2XHU2Nzg0L0RvY2tlci8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1NTIwNlx1NUUwM1x1NUYwRlwiLFxuICAgICAgICBpY29uOiBcIm1hbmF0LXNpZ25cIixcbiAgICAgICAgbGluazogJy9cdTY3QjZcdTY3ODQvXHU1MjA2XHU1RTAzXHU1RjBGLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU1RkFFXHU2NzBEXHU1MkExXCIsXG4gICAgICAgIGljb246IFwibWljcm9jaGlwXCIsXG4gICAgICAgIGxpbms6ICcvXHU2N0I2XHU2Nzg0L1x1NUZBRVx1NjcwRFx1NTJBMS8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1OEZEMFx1N0VGNFwiLFxuICAgICAgICBpY29uOiBcImZvbGRlci1vcGVuXCIsXG4gICAgICAgIGxpbms6ICcvXHU2N0I2XHU2Nzg0L1x1OEZEMFx1N0VGNC8nXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcIlx1NEUyRFx1OTVGNFx1NEVGNlwiLFxuICAgIGljb246IFwiYWxpZ24tY2VudGVyXCIsXG4gICAgcHJlZml4OiBcIi9cdTRFMkRcdTk1RjRcdTRFRjYvXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJFU1wiLFxuICAgICAgICBpY29uOiBcIm1hZ25pZnlpbmctZ2xhc3NcIixcbiAgICAgICAgbGluazogJy9cdTRFMkRcdTk1RjRcdTRFRjYvZXMvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJLYWZrYVwiLFxuICAgICAgICBpY29uOiBcImNoZXNzLXF1ZWVuXCIsXG4gICAgICAgIGxpbms6ICcvXHU0RTJEXHU5NUY0XHU0RUY2L2thZmthLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiTWVtY2FjaGVkXCIsXG4gICAgICAgIGljb246IFwic3VpdGNhc2VcIixcbiAgICAgICAgbGluazogJy9cdTRFMkRcdTk1RjRcdTRFRjYvTWVtY2FjaGVkLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiQ2xpY2tIb3VzZVwiLFxuICAgICAgICBpY29uOiBcImhvdXNlLWxhcHRvcFwiLFxuICAgICAgICBsaW5rOiAnL1x1NEUyRFx1OTVGNFx1NEVGNi9DbGlja0hvdXNlLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiTW9uZ29kYlwiLFxuICAgICAgICBpY29uOiBcInZyLWNhcmRib2FyZFwiLFxuICAgICAgICBsaW5rOiAnL1x1NEUyRFx1OTVGNFx1NEVGNi9tb25nb2RiLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiTXlzcWxcIixcbiAgICAgICAgaWNvbjogXCJkYXRhYmFzZVwiLFxuICAgICAgICBsaW5rOiAnL1x1NEUyRFx1OTVGNFx1NEVGNi9teXNxbC8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIk5naW54XCIsXG4gICAgICAgIGljb246IFwibmV0d29yay13aXJlZFwiLFxuICAgICAgICBsaW5rOiAnL1x1NEUyRFx1OTVGNFx1NEVGNi9uZ2lueC8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlJhYmJpdE1RXCIsXG4gICAgICAgIGljb246IFwiZnJvZ1wiLFxuICAgICAgICBsaW5rOiAnL1x1NEUyRFx1OTVGNFx1NEVGNi9yYWJiaXRtcS8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlJlZGlzXCIsXG4gICAgICAgIGljb246IFwicmVnaXN0ZXJlZFwiLFxuICAgICAgICBsaW5rOiAnL1x1NEUyRFx1OTVGNFx1NEVGNi9yZWRpcy8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlJvY2tldE1RXCIsXG4gICAgICAgIGljb246IFwicm9ja2V0XCIsXG4gICAgICAgIGxpbms6ICcvXHU0RTJEXHU5NUY0XHU0RUY2L3JvY2tldG1xLydcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiR29sYW5nXCIsXG4gICAgaWNvbjogXCJsaWdodGJ1bGJcIixcbiAgICBwcmVmaXg6IFwiL2dvbGFuZy9cIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1NUI2Nlx1NEU2MFx1OERFRlx1N0VCRlwiLFxuICAgICAgICBpY29uOiBcIm1hcC1sb2NhdGlvbi1kb3RcIixcbiAgICAgICAgcHJlZml4OiBcIlx1NUI2Nlx1NEU2MFx1OERFRlx1N0VCRlwiLFxuICAgICAgICBsaW5rOiAnL2dvbGFuZy9cdTVCNjZcdTRFNjBcdThERUZcdTdFQkYnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1NUUzOFx1NzUyOFx1NTMwNVx1NTkyN1x1NTE2OFwiLFxuICAgICAgICBpY29uOiBcImJvb2tcIixcbiAgICAgICAgcHJlZml4OiBcIlx1NUUzOFx1NzUyOFx1NTMwNVx1NTkyN1x1NTE2OFwiLFxuICAgICAgICBsaW5rOiAnL2dvbGFuZy9cdTVFMzhcdTc1MjhcdTUzMDVcdTU5MjdcdTUxNjgnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1NTdGQVx1Nzg0MFx1OTc2Mlx1OEJENVx1OTg5OFwiLFxuICAgICAgICBpY29uOiBcImRpc2Vhc2VcIixcbiAgICAgICAgbGluazogJy9nb2xhbmcvXHU5NzYyXHU4QkQ1XHU5ODk4LzEuR29cdTUxNjVcdTk1RTgnXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIlx1OEZEQlx1OTYzNlx1OTc2Mlx1OEJENVx1OTg5OFwiLFxuICAgICAgICBpY29uOiBcImNsaXBib2FyZC1xdWVzdGlvblwiLFxuICAgICAgICBsaW5rOiAnL2dvbGFuZy9cdTk3NjJcdThCRDVcdTk4OTgvMi5Hb1x1OEZEQlx1OTYzNidcbiAgICAgIH1cbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJibG9nXCIsXG4gICAgaWNvbjogXCJib29rXCIsXG4gICAgbGluazogXCJodHRwczovL3hpYW9iYWlkZWJ1Zy50b3AvXCIsXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcInNpdGVtYXBcIixcbiAgICBpY29uOiBcImJsb2dcIixcbiAgICBsaW5rOiBcImh0dHBzOi8vZ29sYW5nZ3VpZGUudG9wL3NpdGVtYXAueG1sXCIsXG4gIH0sXG5dKTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvcHJvamVjdC9nb2xhbmctZnVsbC1zdGFjay9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9wcm9qZWN0L2dvbGFuZy1mdWxsLXN0YWNrL3NyYy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC9wcm9qZWN0L2dvbGFuZy1mdWxsLXN0YWNrL3NyYy8udnVlcHJlc3Mvc2lkZWJhci50c1wiO2ltcG9ydCB7IHNpZGViYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBzaWRlYmFyKHtcbiAgXCIvcHl0aG9uL1wiOiBbXG4gICAge1xuICAgICAgdGV4dDogXCJweXRob25cdTc3RTVcdThCQzZcdTRGNTNcdTdDRkJcIixcbiAgICAgIGljb246IFwibGFwdG9wLWNvZGVcIixcblxuICAgICAgbGluazogXCJweXRob24vXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuXG4gIF0sXG4gIFwiL2dvbGFuZy9cIjogW1xuICAgIHtcbiAgICAgIHRleHQ6IFwiZ29sYW5nXHU3N0U1XHU4QkM2XHU0RjUzXHU3Q0ZCXCIsXG4gICAgICBpY29uOiBcImxhcHRvcC1jb2RlXCIsXG5cbiAgICAgIGxpbms6IFwiZ29sYW5nL1wiLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgXSxcbiAgXCIvXHU4QkExXHU3Qjk3XHU2NzNBXHU1N0ZBXHU3ODQwL1wiOiBbXG4gICAge1xuICAgICAgdGV4dDogXCJcdThCQTFcdTdCOTdcdTY3M0FcdTU3RkFcdTc4NDBcIixcbiAgICAgIGljb246IFwibGFwdG9wLWNvZGVcIixcblxuICAgICAgbGluazogXCJcdThCQTFcdTdCOTdcdTY3M0FcdTU3RkFcdTc4NDAvXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICBdLFxuICBcIi9cdTY3QjZcdTY3ODQvXCI6IFtcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1NjdCNlx1Njc4NFwiLFxuICAgICAgaWNvbjogXCJsYXB0b3AtY29kZVwiLFxuXG4gICAgICBsaW5rOiBcIlx1NjdCNlx1Njc4NC9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gIF0sXG4gIFwiL1x1OEJBRFx1N0VDM1x1ODQyNS9cIjogW1xuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU4QkFEXHU3RUMzXHU4NDI1XCIsXG4gICAgICBpY29uOiBcImxhcHRvcC1jb2RlXCIsXG5cbiAgICAgIGxpbms6IFwiXHU4QkFEXHU3RUMzXHU4NDI1L1wiLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgXSxcbiAgXCIvXHU0RTJEXHU5NUY0XHU0RUY2L1wiOiBbXG4gICAge1xuICAgICAgdGV4dDogXCJcdTRFMkRcdTk1RjRcdTRFRjZcIixcbiAgICAgIGljb246IFwibGFwdG9wLWNvZGVcIixcblxuICAgICAgbGluazogXCJcdTRFMkRcdTk1RjRcdTRFRjYvXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICBdLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQStTLFNBQVMsd0JBQXdCO0FBQ2hWLFNBQVMsbUJBQW1CO0FBQzVCLFNBQVMsaUJBQWlCOzs7QUNGbVIsU0FBUyxpQkFBaUI7OztBQ0F4QixTQUFTLGNBQWM7QUFFdFUsSUFBTyxpQkFBUSxPQUFPO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQWlCQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQ0YsQ0FBQzs7O0FDbExnVCxTQUFTLGVBQWU7QUFFelUsSUFBTyxrQkFBUSxRQUFRO0FBQUEsRUFDckIsWUFBWTtBQUFBLElBQ1Y7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUVOLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFFRjtBQUFBLEVBQ0EsWUFBWTtBQUFBLElBQ1Y7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUVOLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0Esb0NBQVc7QUFBQSxJQUNUO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFFTixNQUFNO0FBQUEsTUFDTixVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGtCQUFRO0FBQUEsSUFDTjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04s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
