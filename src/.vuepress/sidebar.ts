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
});
