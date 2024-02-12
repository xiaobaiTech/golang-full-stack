import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  "/python/",
  "/golang/",

  // {
  //   text: "指南",
  //   icon: "lightbulb",
  //   prefix: "/guide/",
  //   children: [
  //     {
  //       text: "Bar",
  //       icon: "lightbulb",
  //       prefix: "bar/",
  //       children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //     {
  //       text: "Foo",
  //       icon: "lightbulb",
  //       prefix: "foo/",
  //       children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
  //     },
  //   ],
  // },
  {
    text: "blog",
    icon: "book",
    link: "https://xiaobaidebug.top/",
  },
  {
    text: "sitemap",
    icon: "blog",
    link: "https://golangguide.top/sitemap.xml",
  },
]);
