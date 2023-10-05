import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    {
      text: "小白0基础入门Python",
      icon: "laptop-code",
      prefix: "python/",
      link: "python/",
      children: "structure",
    },
  ],
});
