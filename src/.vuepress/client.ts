import { defineClientConfig } from "vuepress/client";
import GlobalRightSidebar from "./components/GlobalRightSidebar.vue";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("GlobalRightSidebar", GlobalRightSidebar);
  },
  setup() {
    // ...
  },
  rootComponents: [
    // 这里可以添加需要在根节点渲染的组件
    GlobalRightSidebar,
  ],
}); 