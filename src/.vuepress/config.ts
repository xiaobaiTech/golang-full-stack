import { defineUserConfig } from "vuepress";
import { viteBundler } from '@vuepress/bundler-vite'
import { tocPlugin } from '@vuepress/plugin-toc'
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "golang全栈指南",
  description: "超级好用的golang面试指南，面试前到golang guide补补",
  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),
  plugins: [
    tocPlugin({
      // 配置项
    }),
  ],
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
