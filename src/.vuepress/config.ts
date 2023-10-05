import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/Newbie-learning-python",

  lang: "zh-CN",
  title: "小白0基础学python",
  description: "我的第一本python书",

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
