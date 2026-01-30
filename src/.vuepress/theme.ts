import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://golangguide.top",
  author: {
    name: "小白debug",
    url: "https://xiaobaidebug.top/",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/new_logo.png",

  repo: "xiaobaiTech/golang-full-stack",

  docsDir: "src",

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "关注公众号「小白debug」,回复「面试」获面试题集pdf",

  displayFooter: true,

  encrypt: {
    config: {
      "/demo/encrypt.html": ["1234"],
    },
  },

  // page meta
  metaLocales: {
    editLink: "在 GitHub 上编辑此页",
  },

  plugins: {
    // You should generate and use your own comment service
    comment: {
      provider: "Giscus",
      repo: "xiaobaiTech/golang-full-stack",
      repoId: "R_kgDOKcTHvw",
      category: "Announcements",
      categoryId: "DIC_kwDOKcTHv84CZ4fp",
    },
    // All features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      demo: true,
      figure: true,
      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      katex: true,
      mark: true,
      mermaid: true,
      playground: {
        presets: ["ts", "vue"],
      },
      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,
      vuePlayground: true,
    },
    components: {
      components: ["Badge", "BiliBili", "GlobalRightSidebar"],
      rootComponents: {
        notice: [
          {
            path: "/",
            title: "通知",
            content: "关注公众号【小白debug】\n  回复【面试】获取最全面试pdf",
            fullscreen: false,
            showOnce: false,
          },
        ],
      },
    },


    feed: {
      rss: true,
    },

    seo: {
      canonical: "https://golangguide.top",
      autoDescription: true,
    },

    sitemap: {
      changefreq: "weekly",
    },

    pwa: {
      favicon: "/favicon.ico",
      cacheHTML: true,
      cachePic: true,
      appendBase: true,
      apple: {
        icon: "/assets/icon/apple-icon-152.png",
        statusBarColor: "black",
      },
      msTile: {
        image: "/assets/icon/ms-icon-144.png",
        color: "#ffffff",
      },
      manifest: {
        icons: [
          {
            src: "/assets/icon/chrome-mask-512.png",
            sizes: "512x512",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-mask-192.png",
            sizes: "192x192",
            purpose: "maskable",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/assets/icon/chrome-192.png",
            sizes: "192x192",
            type: "image/png",
          },
        ],
        shortcuts: [
          {
            name: "首页",
            short_name: "首页",
            url: "/",
            icons: [
              {
                src: "/assets/icon/guide-maskable.png",
                sizes: "192x192",
                purpose: "maskable",
                type: "image/png",
              },
            ],
          },
        ],
      },
    },
  },

  layout: {
    // 启用右侧边栏
    enableRightSidebar: true
  },
});
