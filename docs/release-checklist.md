# 发布前检查与 Apache 部署清单（Release Checklist）

本清单用于指导 **网络AI（aiwangluounk.my）** 在构建、QA 自动化校验及 Apache 静态托管上线前的逐项验收。

---

## 1. 静态构建与搜索索引验证

- [ ] **TypeScript 与 Astro 模板检查**：执行 `npm run check`（`astro check`），确认 0 类型错误与 0 模板错误。
- [ ] **全站静态构建与 Pagefind 索引生成**：执行 `npm run build`（即 `astro build && npx pagefind --site dist`），确认：
  - `dist/sitemap-index.xml` 与 `dist/sitemap-0.xml` 已生成（且已排除 `/search/` 与 `/404`）。
  - `dist/robots.txt` 已输出至构建根目录，指向 `https://aiwangluounk.my/sitemap-index.xml`。
  - `dist/pagefind/` 目录存在且包含 `pagefind.js`、`pagefind-entry.json` 及索引分片文件。
  - `dist/404.html` 存在。

---

## 2. 自动化 QA 流水线验证（`npm run qa`）

执行 `npm run qa`，确认三项脚本全部以退出码 `0` 通过：

- [ ] `node scripts/validate-brands.mjs`
  - 31 个唯一品牌（`brandsPart1` 15 个 + `brandsPart2` 16 个），无重复 `slug` 或 `id`。
  - Firefly 已合并为单一 `slug: "firefly"` 实体，且在 `links.ts` 中保留双 code 备选记录。
  - `src/data/links.ts` 统一管理 31 条推广链接，全部应用 `AFFILIATE_DISCLOSURE` 与 `rel="nofollow sponsored noopener"`、`target="_blank"`。
  - `src/content/**/*.mdx` 中无任何硬编码散落的外部推广 URL。
- [ ] `node scripts/check-links.mjs`
  - 全站 `dist/**/*.html` 所有内部 `href="/..."` 均指向实际存在的静态 HTML 或资产文件（0 死链）。
  - 所有外部 `aff` 推广链接具备 `target="_blank"` 与完整 `rel="nofollow sponsored noopener"`。
  - 每个推广链接上下文窗口内存在明确的佣金/推广关系披露文本。
  - 全站无 `[GitHub](GitHub)` 等假下载链接或占位符链接。
- [ ] `node scripts/audit-seo.mjs`
  - 扫描 `dist/**/*.html`（排除 `/pagefind` 与 `/404.html`），统计生成页面总数。
  - 每页具备唯一非空 `<title>`、唯一非空 `<h1>`、唯一 `<meta name="description">`、唯一 `<link rel="canonical">`（`https://aiwangluounk.my/...`）。
  - 所有 `<script type="application/ld+json">` 均合法可解析且含 `@context` 与 `@type`。
- [ ] `node scripts/keyword-pipeline.mjs`
  - 全部 119 条关键词映射通过字段校验，0 互抢冲突，无真实 GSC 数据前保持搜索指标为 `null`。

---

## 3. Apache `.htaccess` 部署注意事项（对照 [`public/.htaccess`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/public/.htaccess)）

1. **启用 `AllowOverride` 与必需模块**：
   - Apache 虚拟主机配置需允许 `.htaccess`（`AllowOverride All` 或至少 `FileInfo Indexes`），否则重写规则、压缩和缓存头不会生效。
   - 确认已启用模块：`mod_rewrite`、`mod_headers`、`mod_deflate`、`mod_expires`。
2. **HTTPS 强制跳转与反向代理防循环**：
   - `.htaccess` 同时检查了 `%{HTTPS} !=on` 与 `%{HTTP:X-Forwarded-Proto} !https`。
   - **上线前必查**：若前端挂载 Cloudflare 或 Nginx 反向代理且回源采用 HTTP，请确保代理层透传 `X-Forwarded-Proto: https`；若代理层本身已强制 HTTPS，可按主机环境注释该段以免触发 301 重定向循环。
3. **目录末尾斜杠规范化与 Pagefind 放行**：
   - Astro 配置为 `trailingSlash: 'always'` + `build.format: 'directory'`。
   - `.htaccess` 已在重写条件中显式排除 `.html|xml|txt|css|js|json|svg|png|jpg|jpeg|webp|woff2|ico|pf_meta|pf_fragment|pf_index|pagefind` 等后缀，确保 `dist/pagefind/` 索引分片不被误加末尾斜杠导致全站站内搜索失效。
4. **自定义 404 与安全响应头验证**：
   - 上线后访问一个不存在的随机路径（如 `/not-exist-test/`），验证返回 HTTP `404` 状态码并渲染 `ErrorDocument 404 /404.html`。
   - 检查响应头包含 `X-Content-Type-Options: nosniff`、`Referrer-Policy: strict-origin-when-cross-origin`、`X-Frame-Options: SAMEORIGIN`。
5. **HTML 与静态资源缓存策略**：
   - `text/html` 设置为 1 小时短缓存，便于价格更新与纠偏快速生效；CSS/JS/图片资源为 1 年缓存。
