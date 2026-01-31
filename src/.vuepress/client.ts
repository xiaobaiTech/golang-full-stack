import { defineClientConfig, useRoute } from "vuepress/client";
import GlobalRightSidebar from "./components/GlobalRightSidebar.vue";
import { onMounted } from "vue";

export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("GlobalRightSidebar", GlobalRightSidebar);
  },
  setup() {
    const route = useRoute();
    onMounted(() => {
      const isProd = typeof window !== "undefined" && process.env.NODE_ENV === "production";
      const adsWhitelist = ["/训练营/"];
      if (isProd && adsWhitelist.some((p) => route.path.startsWith(p))) {
        const s = document.createElement("script");
        s.async = true;
        s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5798115398774565";
        s.crossOrigin = "anonymous";
        document.head.appendChild(s);
      }
      const contributorsDiv = document.querySelector(".contributors");
      if (contributorsDiv) {
        const contributors = document.querySelectorAll(".contributor");
        const arr = Array.from(contributors).slice(0, 5).map((n) => (n.textContent || "").replace(",", ""));
        if (arr.length) {
          contributorsDiv.innerHTML = '<span class="label">Contributors: </span>' + arr.join(", ");
        }
      }
    });
  },
  rootComponents: [GlobalRightSidebar],
}); 
