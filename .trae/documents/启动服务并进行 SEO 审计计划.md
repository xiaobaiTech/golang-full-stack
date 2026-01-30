# 启动服务与 SEO 优化检查计划

我将按照以下步骤启动您的服务，并作为 SEO 专家对项目进行全面检查。

## 1. 启动服务
首先，我将启动本地开发服务器以确保项目正常运行。
- 运行命令：`pnpm run docs:dev`
- 目的：启动 VuePress 开发环境，使网站在本地可访问。

## 2. SEO 专家审计
服务启动后，我将调用 `seo-optimizer` 代理来进行专业的 SEO 分析。重点检查以下方面：

### 技术 SEO 配置检查
- **插件配置**：分析 `src/.vuepress/config.ts` 和 `src/.vuepress/theme.ts`，确认 `vuepress-plugin-seo2`、`sitemap` 等关键 SEO 插件是否已正确配置。
- **Meta 标签**：检查全局和页面级的 Meta 标签（Title, Description, Keywords）设置策略。
- **性能优化**：检查 `package.json` 中的依赖（如 `vite-plugin-compression`, `vite-plugin-imagemin`）及其在构建配置中的使用情况，确保静态资源已优化。

### 内容与关键词优化
- **Frontmatter 规范**：检查 Markdown 文档头部的 Frontmatter 设置，确保每篇文章都有独立的 SEO 描述和关键词。
- **关键词密度与结构**：随机抽取部分核心文档（如 `src/golang/核心知识点/` 下的文件），分析标题层级（H1-H3）和关键词分布是否合理。

### 交付成果
- 完成检查后，我将提供一份包含具体优化建议的报告（例如：缺失的配置、建议添加的 Meta 信息、性能改进点等）。