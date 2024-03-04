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
      canonical: "https://golangguide.top",
      autoDescription: true
    }),
    tocPlugin({
      // 配置项
    })
  ],
  theme: theme_default
  // Enable it with pwa
  // shouldPrefetch: false,
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3JjLy52dWVwcmVzcy9jb25maWcudHMiLCAic3JjLy52dWVwcmVzcy90aGVtZS50cyIsICJzcmMvLnZ1ZXByZXNzL25hdmJhci50cyIsICJzcmMvLnZ1ZXByZXNzL3NpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9wcm9qZWN0L2dvbGFuZy1mdWxsLXN0YWNrL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L3Byb2plY3QvZ29sYW5nLWZ1bGwtc3RhY2svc3JjLy52dWVwcmVzcy9jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvcHJvamVjdC9nb2xhbmctZnVsbC1zdGFjay9zcmMvLnZ1ZXByZXNzL2NvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZVVzZXJDb25maWcgfSBmcm9tIFwidnVlcHJlc3NcIjtcbmltcG9ydCB7IHZpdGVCdW5kbGVyIH0gZnJvbSAnQHZ1ZXByZXNzL2J1bmRsZXItdml0ZSdcbmltcG9ydCB7IHRvY1BsdWdpbiB9IGZyb20gJ0B2dWVwcmVzcy9wbHVnaW4tdG9jJ1xuaW1wb3J0IHRoZW1lIGZyb20gXCIuL3RoZW1lLmpzXCI7XG5pbXBvcnQgeyBzZW9QbHVnaW4gfSBmcm9tIFwidnVlcHJlc3MtcGx1Z2luLXNlbzJcIjtcbmltcG9ydCB7IHB3YVBsdWdpbiB9IGZyb20gXCJ2dWVwcmVzcy1wbHVnaW4tcHdhMlwiO1xuaW1wb3J0IHBrZyBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWdvb2dsZS1hbmFseXRpY3MnO1xuY29uc3QgeyBnb29nbGVBbmFseXRpY3NQbHVnaW4gfSA9IHBrZztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lVXNlckNvbmZpZyh7XG4gIGJhc2U6IFwiL1wiLFxuXG4gIGxhbmc6IFwiemgtQ05cIixcbiAgdGl0bGU6IFwiZ29sYW5nXHU1MTY4XHU2ODA4XHU2MzA3XHU1MzU3XCIsXG4gIGRlc2NyaXB0aW9uOiBcIlx1OEQ4NVx1N0VBN1x1NTk3RFx1NzUyOFx1NzY4NGdvbGFuZ1x1OTc2Mlx1OEJENVx1NjMwN1x1NTM1N1x1RkYwQ1x1OTc2Mlx1OEJENVx1NTI0RFx1NTIzMGdvbGFuZyBndWlkZVx1ODg2NVx1ODg2NVwiLFxuICBidW5kbGVyOiB2aXRlQnVuZGxlcih7XG4gICAgdml0ZU9wdGlvbnM6IHt9LFxuICAgIHZ1ZVBsdWdpbk9wdGlvbnM6IHt9LFxuICB9KSxcbiAgICBoZWFkOiBbXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJwcmVjb25uZWN0XCIsIGhyZWY6IFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbVwiIH1dLFxuICAgIFtcImxpbmtcIiwgeyByZWw6IFwicHJlY29ubmVjdFwiLCBocmVmOiBcImh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb21cIiwgY3Jvc3NvcmlnaW46IHRydWUgfV0sXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJzdHlsZXNoZWV0XCIsIGhyZWY6IFwiaHR0cHM6Ly9mb250cy5nb29nbGVhcGlzLmNvbS9jc3MyP2ZhbWlseT1JbnRlcjp3Z2h0QDQwMDs1MDA7NzAwJmRpc3BsYXk9c3dhcFwiIH1dLFxuICAgIFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAge1xuICAgICAgICBuYW1lOiBcImtleXdvcmRzXCIsXG4gICAgICAgIGNvbnRlbnQ6XG4gICAgICAgICAgXCJcdTk3NjJcdThCRDUsIFx1N0EwQlx1NUU4Rlx1NTQ1OCwgZ29sYW5nLCBnb2xhbmdcdTYzMDdcdTUzNTcsIG15c3FsLCByZWRpcywgZWxhc3RpYyBzZWFyY2gsIGthZmthLCByb2NrZXRtcSwgXHU1RkFFXHU2NzBEXHU1MkExLCBcdTUyMDZcdTVFMDNcdTVGMEYsIERvY2tlclwiLFxuICAgICAgfSxcbiAgICBdLFxuICAgIFtcbiAgICAgIFwibWV0YVwiLFxuICAgICAgeyBuYW1lOiBcImRlc2NyaXB0aW9uXCIsIGNvbnRlbnQ6IFwiXHU0RjYwXHU5NzAwXHU4OTgxXHU3Njg0XHU1MTczXHU0RThFIGdvbGFuZyBcdTUxNjhcdTY4MDhcdTU0MEVcdTdBRUZcdTVGMDBcdTUzRDFcdTc2ODRcdTYyNDBcdTY3MDlcdTRGRTFcdTYwNkZcdUZGMENcdTUzMDVcdTYyRUNcdTRGNDZcdTRFMERcdTk2NTBcdTRFOEVteXNxbCwgcmVkaXMsIGVsYXN0aWNzZWFyY2hcdUZGMENcdTVGQUVcdTY3MERcdTUyQTFcdUZGMENrYWZrYSwgXHU4QkExXHU3Qjk3XHU2NzNBXHU3RjUxXHU3RURDXHVGRjBDXHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGXHU3QjQ5XHU0RkUxXHU2MDZGXCIgfSxcbiAgICBdLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcImF1dGhvclwiLCBjb250ZW50OiBcImh0dHBzOi8vd3d3LnhpYW9iYWlkZWJ1Zy50b3AvXCIgfV0sXG5cbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJvZzppbWFnZVwiLCBjb250ZW50OiBcImh0dHBzOi8vZ29sYW5nZ3VpZGUudG9wL25ld19sb2dvLnBuZ1wiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzppbWFnZVwiLCBjb250ZW50OiBcImh0dHBzOi8vZ29sYW5nZ3VpZGUudG9wL25ld19sb2dvLnBuZ1wiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcIm9nOmltYWdlOnNlY3VyZV91cmxcIiwgY29udGVudDogXCJodHRwczovL2dvbGFuZ2d1aWRlLnRvcC9uZXdfbG9nby5wbmdcIiB9XSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJvZzp1cmxcIiwgY29udGVudDogXCJodHRwczovL2dvbGFuZ2d1aWRlLnRvcC9cIiB9XSxcblxuICAgIFtcIm1ldGFcIiwgeyBwcm9wZXJ0eTogXCJvZzp0aXRsZVwiLCBjb250ZW50OiBcIlx1NkIyMlx1OEZDRVx1Njc2NVx1NTIzMCBnb2xhbmdndWlkZSAtIFx1NEY2MFx1OTcwMFx1ODk4MVx1NzY4NFx1NTE3M1x1NEU4RSBnb2xhbmcgXHU1MTY4XHU2ODA4XHU1NDBFXHU3QUVGXHU1RjAwXHU1M0QxXHU3Njg0XHU2MjQwXHU2NzA5XHU0RkUxXHU2MDZGXHVGRjBDXHU1MzA1XHU2MkVDXHU0RjQ2XHU0RTBEXHU5NjUwXHU0RThFbXlzcWwsIHJlZGlzLCBlbGFzdGljc2VhcmNoXHVGRjBDXHU1RkFFXHU2NzBEXHU1MkExXHVGRjBDa2Fma2FcdTdCNDlcdTRGRTFcdTYwNkZcIiB9XSxcbiAgICBbXG4gICAgICBcIm1ldGFcIixcbiAgICAgIHtcbiAgICAgICAgbmFtZTogXCJvZzpkZXNjcmlwdGlvblwiLFxuICAgICAgICBjb250ZW50OiBcImdvbGFuZ2d1aWRlIERvY3MgYnJpbmcgeW91IGFsbCBpbmZvcm1hdGlvbiB5b3UgbmVlZCBhYm91dCBvdXIgcHJvdG9jb2wsIEFQSXMsIFNES3MsIFpLIFN0YWNrLCBhbmQgaHlwZXJjaGFpbnMuIFN0YXJ0IHdpdGggb3VyIGd1aWRlcyBhbmQgdHV0b3JpYWxzLCBvciBnbyBkZWVwIGludG8gb3VyIGFyY2hpdGVjdHVyZSBhbmQgcHJvdG9jb2wgc3BlY2lmaWNhdGlvbi5cIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmNhcmRcIiwgY29udGVudDogXCJzdW1tYXJ5XCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidHdpdHRlcjp0aXRsZVwiLCBjb250ZW50OiBcIldlbGNvbWUgdG8gb3VyIERvY3MgLSBBbGwgaW5mb3JtYXRpb24geW91IG5lZWQgYWJvdXQgZ29sYW5nZ3VpZGUgYW5kIFpLIFN0YWNrXCIgfV0sXG4gICAgW1xuICAgICAgXCJtZXRhXCIsXG4gICAgICB7XG4gICAgICAgIG5hbWU6IFwidHdpdHRlcjpkZXNjcmlwdGlvblwiLFxuICAgICAgICBjb250ZW50OiBcImdvbGFuZ2d1aWRlIERvY3MgYnJpbmcgeW91IGFsbCBpbmZvcm1hdGlvbiB5b3UgbmVlZCBhYm91dCBvdXIgcHJvdG9jb2wsIEFQSXMsIFNES3MsIFpLIFN0YWNrLCBhbmQgaHlwZXJjaGFpbnMuIFN0YXJ0IHdpdGggb3VyIGd1aWRlcyBhbmQgdHV0b3JpYWxzLCBvciBnbyBkZWVwIGludG8gb3VyIGFyY2hpdGVjdHVyZSBhbmQgcHJvdG9jb2wgc3BlY2lmaWNhdGlvbi5cIixcbiAgICAgIH0sXG4gICAgXSxcbiAgICBbXCJtZXRhXCIsIHsgbmFtZTogXCJ0d2l0dGVyOmltYWdlOmFsdFwiLCBjb250ZW50OiBcImdvbGFuZ2d1aWRlIFx1MjAxNCBBY2NlbGVyYXRpbmcgdGhlIG1hc3MgYWRvcHRpb24gb2YgY3J5cHRvIGZvciBwZXJzb25hbCBzb3ZlcmVpZ250eVwiIH1dLFxuXG4gICAgW1wibGlua1wiLCB7IHJlbDogXCJhcHBsZS10b3VjaC1pY29uXCIsIHNpemVzOiBcIjE4MHgxODBcIiwgaHJlZjogXCIvYXBwbGUtdG91Y2gtaWNvbi5wbmdcIiB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgdHlwZTogXCJpbWFnZS9wbmdcIiwgc2l6ZXM6IFwiMzJ4MzJcIiwgaHJlZjogXCIvZmF2aWNvbi0zMngzMi5wbmdcIiB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcImljb25cIiwgdHlwZTogXCJpbWFnZS9wbmdcIiwgc2l6ZXM6IFwiMTZ4MTZcIiwgaHJlZjogXCIvZmF2aWNvbi0xNngxNi5wbmdcIiB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcIm1hbmlmZXN0XCIsIGhyZWY6IFwiL3NpdGUud2VibWFuaWZlc3RcIiB9XSxcbiAgICBbXCJsaW5rXCIsIHsgcmVsOiBcIm1hc2staWNvblwiLCBocmVmOiBcIi9zYWZhcmktcGlubmVkLXRhYi5zdmdcIiwgY29sb3I6IFwiIzFFNjlGRlwiIH1dLFxuICAgIFtcImxpbmtcIiwgeyByZWw6IFwic2hvcnRjdXQgaWNvblwiLCBocmVmOiBcIi9mYXZpY29uLmljb1wiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcIm1zYXBwbGljYXRpb24tVGlsZUNvbG9yXCIsIGNvbnRlbnQ6IFwiIzFFNjlGRlwiIH1dLFxuICAgIFtcIm1ldGFcIiwgeyBuYW1lOiBcIm1zYXBwbGljYXRpb24tY29uZmlnXCIsIGNvbnRlbnQ6IFwiL2Jyb3dzZXJjb25maWcueG1sXCIgfV0sXG4gICAgW1wibWV0YVwiLCB7IG5hbWU6IFwidGhlbWUtY29sb3JcIiwgY29udGVudDogXCIjMTc1NUY0XCIgfV0sXG5cbiAgICBbXG4gICAgICBcInNjcmlwdFwiLFxuICAgICAge30sXG4gICAgICBgXG4gICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBsZXQgY29udHJpYnV0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnRyaWJ1dG9yJyk7XG4gICAgICAgIGxldCBjb250cmlidXRvckFyciA9IEFycmF5LmZyb20oY29udHJpYnV0b3JzKTtcbiAgICAgICAgbGV0IHRvcEZpdmUgPSBjb250cmlidXRvckFyci5zbGljZSgwLCA1KTtcbiAgICAgIFxuICAgICAgICB0b3BGaXZlLmZvckVhY2goZnVuY3Rpb24oY29udHJpYnV0b3IpIHtcbiAgICAgICAgICBjb250cmlidXRvci50ZXh0Q29udGVudCA9IGNvbnRyaWJ1dG9yLnRleHRDb250ZW50LnJlcGxhY2UoJywnLCAnJyk7XG4gICAgICAgIH0pO1xuICAgICAgXG4gICAgICAgIGxldCBsYXN0Q29tbWEgPSBjb250cmlidXRvckFycls0XTtcbiAgICAgICAgbGFzdENvbW1hLnRleHRDb250ZW50ID0gbGFzdENvbW1hLnRleHRDb250ZW50LnJlcGxhY2UoJywnLCAnJyk7XG4gICAgICBcbiAgICAgICAgbGV0IHVwZGF0ZWRMaXN0ID0gdG9wRml2ZS5tYXAoZnVuY3Rpb24oY29udHJpYnV0b3IpIHtcbiAgICAgICAgICByZXR1cm4gY29udHJpYnV0b3IudGV4dENvbnRlbnQ7XG4gICAgICAgIH0pLmpvaW4oJywgJyk7XG4gICAgICAgICAgXG4gICAgICAgIGxldCBjb250cmlidXRvcnNEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJpYnV0b3JzJyk7XG4gICAgICAgIGNvbnRyaWJ1dG9yc0Rpdi5pbm5lckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPkNvbnRyaWJ1dG9yczogPC9zcGFuPicgKyB1cGRhdGVkTGlzdDtcbiAgICAgIFxuICAgICAgfSk7XG5cbiAgICAgIGAsXG4gICAgXSxcbiAgXSxcbiAgcGx1Z2luczogW1xuICAgIHNlb1BsdWdpbih7XG4gICAgICBob3N0bmFtZTogXCJodHRwczovL2dvbGFuZ2d1aWRlLnRvcFwiLFxuICAgICAgY2Fub25pY2FsOiBcImh0dHBzOi8vZ29sYW5nZ3VpZGUudG9wXCIsXG4gICAgICBhdXRvRGVzY3JpcHRpb246IHRydWUsXG4gICAgfSksXG4gICAgdG9jUGx1Z2luKHtcbiAgICAgIC8vIFx1OTE0RFx1N0Y2RVx1OTg3OVxuICAgIH0pLFxuICBdLFxuICB0aGVtZSxcblxuICAvLyBFbmFibGUgaXQgd2l0aCBwd2FcbiAgLy8gc2hvdWxkUHJlZmV0Y2g6IGZhbHNlLFxufSk7XG5cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvcHJvamVjdC9nb2xhbmctZnVsbC1zdGFjay9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9wcm9qZWN0L2dvbGFuZy1mdWxsLXN0YWNrL3NyYy8udnVlcHJlc3MvdGhlbWUudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvcHJvamVjdC9nb2xhbmctZnVsbC1zdGFjay9zcmMvLnZ1ZXByZXNzL3RoZW1lLnRzXCI7aW1wb3J0IHsgaG9wZVRoZW1lIH0gZnJvbSBcInZ1ZXByZXNzLXRoZW1lLWhvcGVcIjtcbmltcG9ydCBuYXZiYXIgZnJvbSBcIi4vbmF2YmFyLmpzXCI7XG5pbXBvcnQgc2lkZWJhciBmcm9tIFwiLi9zaWRlYmFyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGhvcGVUaGVtZSh7XG4gIGhvc3RuYW1lOiBcImh0dHBzOi8vZ29sYW5nZ3VpZGUudG9wXCIsXG4gIGdsb2JhbExheW91dDogJy4vdGhlbWUvbGF5b3V0cy9HbG9iYWx6TGF5b3V0LnZ1ZScsXG4gIGF1dGhvcjoge1xuICAgIG5hbWU6IFwiXHU1QzBGXHU3NjdEZGVidWdcIixcbiAgICB1cmw6IFwiaHR0cHM6Ly94aWFvYmFpZGVidWcudG9wL1wiLFxuICB9LFxuXG4gIGljb25Bc3NldHM6IFwiZm9udGF3ZXNvbWUtd2l0aC1icmFuZHNcIixcblxuICBsb2dvOiBcIi9uZXdfbG9nby5wbmdcIixcblxuICByZXBvOiBcInhpYW9iYWlUZWNoL2dvbGFuZy1mdWxsLXN0YWNrXCIsXG5cbiAgZG9jc0RpcjogXCJzcmNcIixcblxuICAvLyBuYXZiYXJcbiAgbmF2YmFyLFxuXG4gIC8vIHNpZGViYXJcbiAgc2lkZWJhcixcblxuICBmb290ZXI6IFwiXHU5RUQ4XHU4QkE0XHU5ODc1XHU4MTFBXCIsXG5cbiAgZGlzcGxheUZvb3RlcjogdHJ1ZSxcblxuICBlbmNyeXB0OiB7XG4gICAgY29uZmlnOiB7XG4gICAgICBcIi9kZW1vL2VuY3J5cHQuaHRtbFwiOiBbXCIxMjM0XCJdLFxuICAgIH0sXG4gIH0sXG5cbiAgLy8gcGFnZSBtZXRhXG4gIG1ldGFMb2NhbGVzOiB7XG4gICAgZWRpdExpbms6IFwiXHU1NzI4IEdpdEh1YiBcdTRFMEFcdTdGMTZcdThGOTFcdTZCNjRcdTk4NzVcIixcbiAgfSxcblxuICBwbHVnaW5zOiB7XG4gICAgLy8gWW91IHNob3VsZCBnZW5lcmF0ZSBhbmQgdXNlIHlvdXIgb3duIGNvbW1lbnQgc2VydmljZVxuICAgIGNvbW1lbnQ6IHtcbiAgICAgIHByb3ZpZGVyOiBcIkdpc2N1c1wiLFxuICAgICAgcmVwbzogXCJ4aWFvYmFpVGVjaC9nb2xhbmctZnVsbC1zdGFja1wiLFxuICAgICAgcmVwb0lkOiBcIlJfa2dET0tjVEh2d1wiLFxuICAgICAgY2F0ZWdvcnk6IFwiQW5ub3VuY2VtZW50c1wiLFxuICAgICAgY2F0ZWdvcnlJZDogXCJESUNfa3dET0tjVEh2ODRDWjRmcFwiLFxuICAgIH0sXG4gICAgLy8gQWxsIGZlYXR1cmVzIGFyZSBlbmFibGVkIGZvciBkZW1vLCBvbmx5IHByZXNlcnZlIGZlYXR1cmVzIHlvdSBuZWVkIGhlcmVcbiAgICBtZEVuaGFuY2U6IHtcbiAgICAgIGFsaWduOiB0cnVlLFxuICAgICAgYXR0cnM6IHRydWUsXG4gICAgICBjaGFydDogdHJ1ZSxcbiAgICAgIGNvZGV0YWJzOiB0cnVlLFxuICAgICAgZGVtbzogdHJ1ZSxcbiAgICAgIGVjaGFydHM6IHRydWUsXG4gICAgICBmaWd1cmU6IHRydWUsXG4gICAgICBmbG93Y2hhcnQ6IHRydWUsXG4gICAgICBnZm06IHRydWUsXG4gICAgICBpbWdMYXp5bG9hZDogdHJ1ZSxcbiAgICAgIGltZ1NpemU6IHRydWUsXG4gICAgICBpbmNsdWRlOiB0cnVlLFxuICAgICAga2F0ZXg6IHRydWUsXG4gICAgICBtYXJrOiB0cnVlLFxuICAgICAgbWVybWFpZDogdHJ1ZSxcbiAgICAgIHBsYXlncm91bmQ6IHtcbiAgICAgICAgcHJlc2V0czogW1widHNcIiwgXCJ2dWVcIl0sXG4gICAgICB9LFxuICAgICAgcmV2ZWFsSnM6IFtcImhpZ2hsaWdodFwiLCBcIm1hdGhcIiwgXCJzZWFyY2hcIiwgXCJub3Rlc1wiLCBcInpvb21cIl0sXG4gICAgICBzdHlsaXplOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBtYXRjaGVyOiBcIlJlY29tbWVuZGVkXCIsXG4gICAgICAgICAgcmVwbGFjZXI6ICh7IHRhZyB9KSA9PiB7XG4gICAgICAgICAgICBpZiAodGFnID09PSBcImVtXCIpXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGFnOiBcIkJhZGdlXCIsXG4gICAgICAgICAgICAgICAgYXR0cnM6IHsgdHlwZTogXCJ0aXBcIiB9LFxuICAgICAgICAgICAgICAgIGNvbnRlbnQ6IFwiUmVjb21tZW5kZWRcIixcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHN1YjogdHJ1ZSxcbiAgICAgIHN1cDogdHJ1ZSxcbiAgICAgIHRhYnM6IHRydWUsXG4gICAgICB2UHJlOiB0cnVlLFxuICAgICAgdnVlUGxheWdyb3VuZDogdHJ1ZSxcbiAgICB9LFxuICAgIGNvbXBvbmVudHM6IHtcbiAgICAgIGNvbXBvbmVudHM6IFtcIkJhZGdlXCIsIFwiQmlsaUJpbGlcIl0sXG4gICAgICByb290Q29tcG9uZW50czoge1xuICAgICAgICBub3RpY2U6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBwYXRoOiBcIi9cIixcbiAgICAgICAgICAgIHRpdGxlOiBcIlx1OTAxQVx1NzdFNVwiLFxuICAgICAgICAgICAgY29udGVudDogXCJcdTUxNzNcdTZDRThcdTUxNkNcdTRGMTdcdTUzRjdcdTMwMTBcdTVDMEZcdTc2N0RkZWJ1Z1x1MzAxMVxcbiAgXHU1NkRFXHU1OTBEXHUzMDEwXHU5NzYyXHU4QkQ1XHUzMDExXHU4M0I3XHU1M0Q2XHU2NzAwXHU1MTY4XHU5NzYyXHU4QkQ1cGRmXCIsXG4gICAgICAgICAgICBmdWxsc2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgIHNob3dPbmNlOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICB9LFxuXG5cbiAgICBmZWVkOiB7XG4gICAgICByc3M6IHRydWUsXG4gICAgfSxcblxuICAgIHNpdGVtYXA6IHtcbiAgICAgIGNoYW5nZWZyZXE6IFwid2Vla2x5XCIsXG4gICAgfSxcblxuICAgIC8vIHVuY29tbWVudCB0aGVzZSBpZiB5b3Ugd2FudCBhIHB3YVxuICAgIC8vIHB3YToge1xuICAgIC8vICAgZmF2aWNvbjogXCIvZmF2aWNvbi5pY29cIixcbiAgICAvLyAgIGNhY2hlSFRNTDogdHJ1ZSxcbiAgICAvLyAgIGNhY2hlUGljOiB0cnVlLFxuICAgIC8vICAgYXBwZW5kQmFzZTogdHJ1ZSxcbiAgICAvLyAgIGFwcGxlOiB7XG4gICAgLy8gICAgIGljb246IFwiL2Fzc2V0cy9pY29uL2FwcGxlLWljb24tMTUyLnBuZ1wiLFxuICAgIC8vICAgICBzdGF0dXNCYXJDb2xvcjogXCJibGFja1wiLFxuICAgIC8vICAgfSxcbiAgICAvLyAgIG1zVGlsZToge1xuICAgIC8vICAgICBpbWFnZTogXCIvYXNzZXRzL2ljb24vbXMtaWNvbi0xNDQucG5nXCIsXG4gICAgLy8gICAgIGNvbG9yOiBcIiNmZmZmZmZcIixcbiAgICAvLyAgIH0sXG4gICAgLy8gICBtYW5pZmVzdDoge1xuICAgIC8vICAgICBpY29uczogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stNTEyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiNTEyeDUxMlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLW1hc2stMTkyLnBuZ1wiLFxuICAgIC8vICAgICAgICAgc2l6ZXM6IFwiMTkyeDE5MlwiLFxuICAgIC8vICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgdHlwZTogXCJpbWFnZS9wbmdcIixcbiAgICAvLyAgICAgICB9LFxuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIHNyYzogXCIvYXNzZXRzL2ljb24vY2hyb21lLTUxMi5wbmdcIixcbiAgICAvLyAgICAgICAgIHNpemVzOiBcIjUxMng1MTJcIixcbiAgICAvLyAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgfSxcbiAgICAvLyAgICAgICB7XG4gICAgLy8gICAgICAgICBzcmM6IFwiL2Fzc2V0cy9pY29uL2Nocm9tZS0xOTIucG5nXCIsXG4gICAgLy8gICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICB0eXBlOiBcImltYWdlL3BuZ1wiLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICAgIHNob3J0Y3V0czogW1xuICAgIC8vICAgICAgIHtcbiAgICAvLyAgICAgICAgIG5hbWU6IFwiRGVtb1wiLFxuICAgIC8vICAgICAgICAgc2hvcnRfbmFtZTogXCJEZW1vXCIsXG4gICAgLy8gICAgICAgICB1cmw6IFwiL2RlbW8vXCIsXG4gICAgLy8gICAgICAgICBpY29uczogW1xuICAgIC8vICAgICAgICAgICB7XG4gICAgLy8gICAgICAgICAgICAgc3JjOiBcIi9hc3NldHMvaWNvbi9ndWlkZS1tYXNrYWJsZS5wbmdcIixcbiAgICAvLyAgICAgICAgICAgICBzaXplczogXCIxOTJ4MTkyXCIsXG4gICAgLy8gICAgICAgICAgICAgcHVycG9zZTogXCJtYXNrYWJsZVwiLFxuICAgIC8vICAgICAgICAgICAgIHR5cGU6IFwiaW1hZ2UvcG5nXCIsXG4gICAgLy8gICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICBdLFxuICAgIC8vICAgICAgIH0sXG4gICAgLy8gICAgIF0sXG4gICAgLy8gICB9LFxuICAgIC8vIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvcHJvamVjdC9nb2xhbmctZnVsbC1zdGFjay9zcmMvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9wcm9qZWN0L2dvbGFuZy1mdWxsLXN0YWNrL3NyYy8udnVlcHJlc3MvbmF2YmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9yb290L3Byb2plY3QvZ29sYW5nLWZ1bGwtc3RhY2svc3JjLy52dWVwcmVzcy9uYXZiYXIudHNcIjtpbXBvcnQgeyBuYXZiYXIgfSBmcm9tIFwidnVlcHJlc3MtdGhlbWUtaG9wZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBuYXZiYXIoW1xuICBcIi9cIixcbiAgXCIvcHl0aG9uL1wiLFxuICAvLyB7XG4gIC8vICAgdGV4dDogJ0dvbGFuZycsXG4gIC8vICAgLy8gXHU4RkQ5XHU5MUNDXHU2NjJGXHU0RTBCXHU2MkM5XHU1MjE3XHU4ODY4XHU1QzU1XHU3M0IwXHU1RjYyXHU1RjBGXHUzMDAyXG4gIC8vICAgaXRlbXM6IFtcbiAgLy8gICAgIHtcbiAgLy8gICAgICAgdGV4dDogJ1x1NUI2Nlx1NEU2MFx1OERFRlx1N0VCRicsXG4gIC8vICAgICAgIGxpbms6ICcvZ29sYW5nL1x1NUI2Nlx1NEU2MFx1OERFRlx1N0VCRidcbiAgLy8gICAgIH0sIHtcbiAgLy8gICAgICAgdGV4dDogJ1x1NTdGQVx1Nzg0MFx1OTc2Mlx1OEJENVx1OTg5OCcsXG4gIC8vICAgICAgIGxpbms6ICcvZ29sYW5nL1x1OTc2Mlx1OEJENVx1OTg5OC8xLkdvXHU1MTY1XHU5NUU4J1xuICAvLyAgICAgfSx7XG4gIC8vICAgICAgIHRleHQ6ICdcdThGREJcdTk2MzZcdTk3NjJcdThCRDVcdTk4OTgnLFxuICAvLyAgICAgICBsaW5rOiAnL2dvbGFuZy9cdTk3NjJcdThCRDVcdTk4OTgvMi5Hb1x1OEZEQlx1OTYzNidcbiAgLy8gICAgIH1cbiAgLy8gICBdXG4gIC8vIH0sXG4gIHtcbiAgICB0ZXh0OiBcIlx1OEJBRFx1N0VDM1x1ODQyNVwiLFxuICAgIGljb246IFwiY2FtcGdyb3VuZFwiLFxuICAgIHByZWZpeDogXCIvXHU4QkFEXHU3RUMzXHU4NDI1L1wiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU0RUNCXHU3RUNEXCIsXG4gICAgICAgIGljb246IFwiYWRkcmVzcy1jYXJkXCIsXG4gICAgICAgIGxpbms6ICcvXHU4QkFEXHU3RUMzXHU4NDI1L1x1NEVDQlx1N0VDRCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU1MTY1XHU4NDI1XHU5ODdCXHU3N0U1XCIsXG4gICAgICAgIGljb246IFwiYnJhaW5cIixcbiAgICAgICAgbGluazogJy9cdThCQURcdTdFQzNcdTg0MjUvXHU1MTY1XHU4NDI1XHU5ODdCXHU3N0U1J1xuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJcdThCQTFcdTdCOTdcdTY3M0FcdTU3RkFcdTc4NDBcIixcbiAgICBpY29uOiBcImNvbXB1dGVyXCIsXG4gICAgcHJlZml4OiBcIi9cdThCQTFcdTdCOTdcdTY3M0FcdTU3RkFcdTc4NDAvXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdTY0Q0RcdTRGNUNcdTdDRkJcdTdFREZcIixcbiAgICAgICAgaWNvbjogXCJzZXJ2ZXJcIixcbiAgICAgICAgbGluazogJy9cdThCQTFcdTdCOTdcdTY3M0FcdTU3RkFcdTc4NDAvXHU2NENEXHU0RjVDXHU3Q0ZCXHU3RURGLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU3RjUxXHU3RURDXHU1N0ZBXHU3ODQwXCIsXG4gICAgICAgIGljb246IFwid2lmaVwiLFxuICAgICAgICBsaW5rOiAnL1x1OEJBMVx1N0I5N1x1NjczQVx1NTdGQVx1Nzg0MC9cdTdGNTFcdTdFRENcdTU3RkFcdTc4NDAvJ1xuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJcdTY3QjZcdTY3ODRcIixcbiAgICBpY29uOiBcImZvbGRlci10cmVlXCIsXG4gICAgcHJlZml4OiBcIi9cdTY3QjZcdTY3ODQvXCIsXG4gICAgY2hpbGRyZW46IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJEb2NrZXJcIixcbiAgICAgICAgaWNvbjogXCJib3hcIixcbiAgICAgICAgbGluazogJy9cdTY3QjZcdTY3ODQvRG9ja2VyLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU1MjA2XHU1RTAzXHU1RjBGXCIsXG4gICAgICAgIGljb246IFwibWFuYXQtc2lnblwiLFxuICAgICAgICBsaW5rOiAnL1x1NjdCNlx1Njc4NC9cdTUyMDZcdTVFMDNcdTVGMEYvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJcdTVGQUVcdTY3MERcdTUyQTFcIixcbiAgICAgICAgaWNvbjogXCJtaWNyb2NoaXBcIixcbiAgICAgICAgbGluazogJy9cdTY3QjZcdTY3ODQvXHU1RkFFXHU2NzBEXHU1MkExLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU4RkQwXHU3RUY0XCIsXG4gICAgICAgIGljb246IFwiZm9sZGVyLW9wZW5cIixcbiAgICAgICAgbGluazogJy9cdTY3QjZcdTY3ODQvXHU4RkQwXHU3RUY0LydcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwiXHU0RTJEXHU5NUY0XHU0RUY2XCIsXG4gICAgaWNvbjogXCJhbGlnbi1jZW50ZXJcIixcbiAgICBwcmVmaXg6IFwiL1x1NEUyRFx1OTVGNFx1NEVGNi9cIixcbiAgICBjaGlsZHJlbjogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkVTXCIsXG4gICAgICAgIGljb246IFwibWFnbmlmeWluZy1nbGFzc1wiLFxuICAgICAgICBsaW5rOiAnL1x1NEUyRFx1OTVGNFx1NEVGNi9lcy8nXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiBcIkthZmthXCIsXG4gICAgICAgIGljb246IFwiY2hlc3MtcXVlZW5cIixcbiAgICAgICAgbGluazogJy9cdTRFMkRcdTk1RjRcdTRFRjYva2Fma2EvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJNZW1jYWNoZWRcIixcbiAgICAgICAgaWNvbjogXCJzdWl0Y2FzZVwiLFxuICAgICAgICBsaW5rOiAnL1x1NEUyRFx1OTVGNFx1NEVGNi9NZW1jYWNoZWQvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJDbGlja0hvdXNlXCIsXG4gICAgICAgIGljb246IFwiaG91c2UtbGFwdG9wXCIsXG4gICAgICAgIGxpbms6ICcvXHU0RTJEXHU5NUY0XHU0RUY2L0NsaWNrSG91c2UvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJNb25nb2RiXCIsXG4gICAgICAgIGljb246IFwidnItY2FyZGJvYXJkXCIsXG4gICAgICAgIGxpbms6ICcvXHU0RTJEXHU5NUY0XHU0RUY2L21vbmdvZGIvJ1xuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogXCJNeXNxbFwiLFxuICAgICAgICBpY29uOiBcImRhdGFiYXNlXCIsXG4gICAgICAgIGxpbms6ICcvXHU0RTJEXHU5NUY0XHU0RUY2L215c3FsLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiTmdpbnhcIixcbiAgICAgICAgaWNvbjogXCJuZXR3b3JrLXdpcmVkXCIsXG4gICAgICAgIGxpbms6ICcvXHU0RTJEXHU5NUY0XHU0RUY2L25naW54LydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiUmFiYml0TVFcIixcbiAgICAgICAgaWNvbjogXCJmcm9nXCIsXG4gICAgICAgIGxpbms6ICcvXHU0RTJEXHU5NUY0XHU0RUY2L3JhYmJpdG1xLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiUmVkaXNcIixcbiAgICAgICAgaWNvbjogXCJyZWdpc3RlcmVkXCIsXG4gICAgICAgIGxpbms6ICcvXHU0RTJEXHU5NUY0XHU0RUY2L3JlZGlzLydcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiUm9ja2V0TVFcIixcbiAgICAgICAgaWNvbjogXCJyb2NrZXRcIixcbiAgICAgICAgbGluazogJy9cdTRFMkRcdTk1RjRcdTRFRjYvcm9ja2V0bXEvJ1xuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogXCJHb2xhbmdcIixcbiAgICBpY29uOiBcImxpZ2h0YnVsYlwiLFxuICAgIHByZWZpeDogXCIvZ29sYW5nL1wiLFxuICAgIGNoaWxkcmVuOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU1QjY2XHU0RTYwXHU4REVGXHU3RUJGXCIsXG4gICAgICAgIGljb246IFwibWFwLWxvY2F0aW9uLWRvdFwiLFxuICAgICAgICBwcmVmaXg6IFwiXHU1QjY2XHU0RTYwXHU4REVGXHU3RUJGXCIsXG4gICAgICAgIGxpbms6ICcvZ29sYW5nL1x1NUI2Nlx1NEU2MFx1OERFRlx1N0VCRidcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU1RTM4XHU3NTI4XHU1MzA1XHU1OTI3XHU1MTY4XCIsXG4gICAgICAgIGljb246IFwiYm9va1wiLFxuICAgICAgICBwcmVmaXg6IFwiXHU1RTM4XHU3NTI4XHU1MzA1XHU1OTI3XHU1MTY4XCIsXG4gICAgICAgIGxpbms6ICcvZ29sYW5nL1x1NUUzOFx1NzUyOFx1NTMwNVx1NTkyN1x1NTE2OCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU1N0ZBXHU3ODQwXHU5NzYyXHU4QkQ1XHU5ODk4XCIsXG4gICAgICAgIGljb246IFwiZGlzZWFzZVwiLFxuICAgICAgICBsaW5rOiAnL2dvbGFuZy9cdTk3NjJcdThCRDVcdTk4OTgvMS5Hb1x1NTE2NVx1OTVFOCdcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6IFwiXHU4RkRCXHU5NjM2XHU5NzYyXHU4QkQ1XHU5ODk4XCIsXG4gICAgICAgIGljb246IFwiY2xpcGJvYXJkLXF1ZXN0aW9uXCIsXG4gICAgICAgIGxpbms6ICcvZ29sYW5nL1x1OTc2Mlx1OEJENVx1OTg5OC8yLkdvXHU4RkRCXHU5NjM2J1xuICAgICAgfVxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiBcImJsb2dcIixcbiAgICBpY29uOiBcImJvb2tcIixcbiAgICBsaW5rOiBcImh0dHBzOi8veGlhb2JhaWRlYnVnLnRvcC9cIixcbiAgfSxcbiAge1xuICAgIHRleHQ6IFwic2l0ZW1hcFwiLFxuICAgIGljb246IFwiYmxvZ1wiLFxuICAgIGxpbms6IFwiaHR0cHM6Ly9nb2xhbmdndWlkZS50b3Avc2l0ZW1hcC54bWxcIixcbiAgfSxcbl0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcm9vdC9wcm9qZWN0L2dvbGFuZy1mdWxsLXN0YWNrL3NyYy8udnVlcHJlc3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9yb290L3Byb2plY3QvZ29sYW5nLWZ1bGwtc3RhY2svc3JjLy52dWVwcmVzcy9zaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9yb290L3Byb2plY3QvZ29sYW5nLWZ1bGwtc3RhY2svc3JjLy52dWVwcmVzcy9zaWRlYmFyLnRzXCI7aW1wb3J0IHsgc2lkZWJhciB9IGZyb20gXCJ2dWVwcmVzcy10aGVtZS1ob3BlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHNpZGViYXIoe1xuICBcIi9weXRob24vXCI6IFtcbiAgICB7XG4gICAgICB0ZXh0OiBcInB5dGhvblx1NzdFNVx1OEJDNlx1NEY1M1x1N0NGQlwiLFxuICAgICAgaWNvbjogXCJsYXB0b3AtY29kZVwiLFxuXG4gICAgICBsaW5rOiBcInB5dGhvbi9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG5cbiAgXSxcbiAgXCIvZ29sYW5nL1wiOiBbXG4gICAge1xuICAgICAgdGV4dDogXCJnb2xhbmdcdTc3RTVcdThCQzZcdTRGNTNcdTdDRkJcIixcbiAgICAgIGljb246IFwibGFwdG9wLWNvZGVcIixcblxuICAgICAgbGluazogXCJnb2xhbmcvXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICBdLFxuICBcIi9cdThCQTFcdTdCOTdcdTY3M0FcdTU3RkFcdTc4NDAvXCI6IFtcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1OEJBMVx1N0I5N1x1NjczQVx1NTdGQVx1Nzg0MFwiLFxuICAgICAgaWNvbjogXCJsYXB0b3AtY29kZVwiLFxuXG4gICAgICBsaW5rOiBcIlx1OEJBMVx1N0I5N1x1NjczQVx1NTdGQVx1Nzg0MC9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gIF0sXG4gIFwiL1x1NjdCNlx1Njc4NC9cIjogW1xuICAgIHtcbiAgICAgIHRleHQ6IFwiXHU2N0I2XHU2Nzg0XCIsXG4gICAgICBpY29uOiBcImxhcHRvcC1jb2RlXCIsXG5cbiAgICAgIGxpbms6IFwiXHU2N0I2XHU2Nzg0L1wiLFxuICAgICAgY2hpbGRyZW46IFwic3RydWN0dXJlXCIsXG4gICAgfSxcbiAgXSxcbiAgXCIvXHU4QkFEXHU3RUMzXHU4NDI1L1wiOiBbXG4gICAge1xuICAgICAgdGV4dDogXCJcdThCQURcdTdFQzNcdTg0MjVcIixcbiAgICAgIGljb246IFwibGFwdG9wLWNvZGVcIixcblxuICAgICAgbGluazogXCJcdThCQURcdTdFQzNcdTg0MjUvXCIsXG4gICAgICBjaGlsZHJlbjogXCJzdHJ1Y3R1cmVcIixcbiAgICB9LFxuICBdLFxuICBcIi9cdTRFMkRcdTk1RjRcdTRFRjYvXCI6IFtcbiAgICB7XG4gICAgICB0ZXh0OiBcIlx1NEUyRFx1OTVGNFx1NEVGNlwiLFxuICAgICAgaWNvbjogXCJsYXB0b3AtY29kZVwiLFxuXG4gICAgICBsaW5rOiBcIlx1NEUyRFx1OTVGNFx1NEVGNi9cIixcbiAgICAgIGNoaWxkcmVuOiBcInN0cnVjdHVyZVwiLFxuICAgIH0sXG4gIF0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBK1MsU0FBUyx3QkFBd0I7QUFDaFYsU0FBUyxtQkFBbUI7QUFDNUIsU0FBUyxpQkFBaUI7OztBQ0ZtUixTQUFTLGlCQUFpQjs7O0FDQXhCLFNBQVMsY0FBYztBQUV0VSxJQUFPLGlCQUFRLE9BQU87QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEVBaUJBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLFVBQVU7QUFBQSxNQUNSO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1IsVUFBVTtBQUFBLE1BQ1I7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixVQUFVO0FBQUEsTUFDUjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixRQUFRO0FBQUEsUUFDUixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFDRixDQUFDOzs7QUNsTGdULFNBQVMsZUFBZTtBQUV6VSxJQUFPLGtCQUFRLFFBQVE7QUFBQSxFQUNyQixZQUFZO0FBQUEsSUFDVjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BRU4sTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUVGO0FBQUEsRUFDQSxZQUFZO0FBQUEsSUFDVjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BRU4sTUFBTTtBQUFBLE1BQ04sVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQUEsRUFDQSxvQ0FBVztBQUFBLElBQ1Q7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUVOLE1BQU07QUFBQSxNQUNOLFVBQVU7QUFBQSxJQUNaO0FBQUEsRUFDRjtBQUFBLEVBQ0Esa0JBQVE7QUFBQSxJQUNOO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFFTixNQUFNO0FBQUEsTUFDTixVQUFVO0FB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
