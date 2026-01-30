# SEO 外部提交与站长平台操作指南

以下步骤不在代码仓内自动执行，你可按需完成：

## 1. 站点验证
- Google Search Console：选择“HTML 标签”验证，在站点首页 head 中加入提供的 `<meta name="google-site-verification" ...>`。当前已支持在 src/.vuepress/config.ts 注入 head。
- Bing Webmaster / 百度站长 / 360：同理使用 meta 标签验证。

## 2. 提交资源
- Sitemap：提交 `https://golangguide.top/sitemap.xml`。
- RSS：作为可选补充，提交 `https://golangguide.top/feed.xml`。
- robots.txt：已在仓内提供，确保可访问 `https://golangguide.top/robots.txt`。

## 3. 结构化数据测试
- 使用 Google Rich Results / 百度结构化数据测试工具：
  - Article：检查 headline、datePublished、author、image、keywords。
  - FAQPage（面试题/Q&A）：检查 name 与 acceptedAnswer。
  - BreadcrumbList：按 sidebar 层级测试。

## 4. 监控与指标
- 建议关注：索引覆盖率、点击率、平均排名、抓取异常、Core Web Vitals（LCP/CLS/FID）。
- 定期导出周报：新增/更新页面数、热门入口、退出页、内链健康度。

## 5. 广告与分析
- Google Analytics：已在生产环境条件注入，确保属性 ID 正确。
- Google Ads：仅在白名单路由（示例：/训练营/）加载，避免首屏性能影响。

## 6. 常见排错
- 如果抓取延迟或重复收录：检查 canonical、hreflang 与 hostname 一致性。
- 如果页面摘要不准确：补齐 frontmatter 的 title/description，并确保首段文本清晰。
- 如果富结果未显示：校验 JSON‑LD 字段完整性与图片尺寸（至少 1200px 宽的封面最佳）。 
