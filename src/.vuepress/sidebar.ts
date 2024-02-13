import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/python/": [
    {
      text: "python知识体系",
      icon: "laptop-code",

      link: "python/",
      children: "structure",
    },

  ],
  "/golang/": [
    {
      text: "golang知识体系",
      icon: "laptop-code",

      link: "golang/",
      children: "structure",
    },
  ],
  "/计算机基础/": [
    {
      text: "计算机基础",
      icon: "laptop-code",

      link: "计算机基础/",
      children: "structure",
    },
  ],
  "/架构/": [
    {
      text: "架构",
      icon: "laptop-code",

      link: "架构/",
      children: "structure",
    },
  ],
  "/训练营/": [
    {
      text: "训练营",
      icon: "laptop-code",

      link: "训练营/",
      children: "structure",
    },
  ],
  "/中间件/": [
    {
      text: "中间件",
      icon: "laptop-code",

      link: "中间件/",
      children: "structure",
    },
  ],
});
