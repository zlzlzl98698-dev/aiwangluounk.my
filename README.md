<div align="center">

  <img src="public/avatar.webp" alt="网络AI Logo" width="96" height="96" style="border-radius: 50%; box-shadow: 0 4px 12px rgba(0,0,0,0.15);" />

  # 网络AI (aiwangluounk.my)

  **中文网络服务与代理工具知识库 · 31 家机场品牌结构化评测数据库 · 客观决策参考平台**

  <p>
    <a href="https://aiwangluounk.my"><img src="https://img.shields.io/badge/Production-aiwangluounk.my-2563eb?style=flat-square&logo=google-chrome&logoColor=white" alt="Production Site" /></a>
    <a href="https://astro.build"><img src="https://img.shields.io/badge/Built%20with-Astro%20v6-BC52EE?style=flat-square&logo=astro&logoColor=white" alt="Astro v6" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/Language-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
    <a href="https://pagefind.app"><img src="https://img.shields.io/badge/Search-Pagefind%20v1.6-10B981?style=flat-square" alt="Pagefind" /></a>
    <img src="https://img.shields.io/badge/SEO%20Health-98.5%20%2F%20100%20(A%2B)-brightgreen?style=flat-square" alt="SEO Score" />
    <img src="https://img.shields.io/badge/Dead%20Links-0%20%2F%2043%2C375-success?style=flat-square" alt="Zero Dead Links" />
    <img src="https://img.shields.io/badge/License-MIT-blue?style=flat-square" alt="License MIT" />
  </p>

  <p>
    <a href="#-核心项目特色">项目特色</a> •
    <a href="#-全站栏目与内容拓扑">内容矩阵</a> •
    <a href="#-技术栈与架构设计">架构设计</a> •
    <a href="#-本地运行与构建">快速上手</a> •
    <a href="#-自动化质量工程-qa">质量工程</a> •
    <a href="#-搜索引擎与-geo-合规">SEO/GEO 体系</a>
  </p>

</div>

---

## 📖 项目愿景与定位

长期以来，中文网络代理工具与服务商推荐生态充斥着严重的营销污染：千篇一律的 AI 批量换词软文、未标注测试时间与宽带运营商的过时跑分截图、隐瞒退款与倍率陷阱的绝对化承诺。

**网络AI（aiwangluounk.my）** 旨在用**软件工程与网络协议审计员的标准**重构中文网络服务资料库：
1. **证据分级明确**：严格将「品牌官方宣称（Vendor）」、「历史归档数据（Historical）」与「独立抓包实测（Measured）」彻底拆开；
2. **数据冲突公开**：遇到商家套餐配额不一致、双推广码或协议宣称矛盾，如实双列版本并在前台明确披露风险边界；
3. **商业关系透明**：商业外链 100% 走内部隔离网关（`/go/{slug}/`），强制绑定 `rel="nofollow sponsored noopener"`，评测不受商业佣金左右；
4. **Answer-First 先给结论**：全站所有技术指南与评测均在首屏给出受条件约束的明确结论（TL;DR），绝不废话。

---

## ✨ 核心项目特色

| 模块 | 特色说明 |
| :--- | :--- |
| ⚡ **极致纯静态构建 (SSG)** | 基于 Astro v6 全静态预渲染 180 个页面，构建耗时低于 5 秒，TTFB 与 FCP 达到物理极限。 |
| 🔍 **隐私保护型本地搜索** | 深度集成 Pagefind v1.6，对全站 102,000+ 字进行 WASM 客户端离线分片检索，**不向任何服务器回传用户搜索历史**。 |
| 🛡️ **`/go/` 商业外链隔离网关** | 针对 31 家外部商业合作站建立 307 网关与 robots.txt 屏蔽，在爬虫源码中彻底消除第三方返利落地页特征，阻断站群连坐风险。 |
| 🌐 **GEO & 生成式大模型优化** | 100% 采用 Answer-First 段落结构，89.9% 页面配备机器友好的 `<table>` 矩阵，31 家品牌标配可见的“2026年Q1”基准徽标。 |
| 🏷️ **428 个结构化数据 (JSON-LD)** | 全面覆盖 `WebSite`、`Organization`、`CollectionPage`、`BreadcrumbList`、`Article`、`FAQPage`，与 DOM 文本 100% 匹配。 |
| 🧪 **零缺陷自动化质检 (QA)** | 内置三大自动化校验脚本，持续保障 43,375 处内部链接 0 死链、全站 0 重复 Title / Description、0 假下载占位。 |

---

## 🗂 全站栏目与内容拓扑

网站构建了三层扁平化网状互联结构（全站点击深度严格不超过 3 层）：

```
首页 (/) ──┬── 01. 机场推荐 (/recommend/) ──> 综合推荐、排行榜、靠谱、稳定、易用、按用途选型
           ├── 02. 价格与套餐 (/pricing/) ────> 便宜、一元、一分、月付、不限时不过期、性价比精算
           ├── 03. 机场品牌库 (/brands/) ─────> 31 个去重权威实体评测、品牌目录、官网识别、优惠码
           ├── 04. VPN与加速器 (/vpn/) ──────> 传统隧道对比、免费风险、手机端、游戏低延迟
           ├── 05. 客户端软件 (/clients/) ────> Clash Verge Rev、Mihomo、v2rayN、Shadowrocket、sing-box
           ├── 06. AI与流媒体 (/ai-media/) ───> ChatGPT仅APP(HK)、Claude封号隔离、Gemini、Netflix、YouTube
           ├── 07. 线路与节点 (/routes/) ─────> IEPL、IPLC专线、香港、日本、真低延迟辨析、倍率陷阱
           ├── 08. 使用教程 (/guides/) ───────> 订阅导入、YAML结构与覆写、规则集、TUN模式、装机核验
           ├── 09. 故障排查 (/troubleshooting/) > 节点全超时、连接无网、DNS解析残留、启动闪退、TUN互斥
           ├── 10. 风险与替代 (/risks/) ──────> 跑路排查、防骗套路、平替推荐、退款维权、全站冲突动态
           └── 11. 横向对比 (/compare/) ──────> 同价位横评、5-6元档横评、专属端vs通用订阅横评
```

---

## 🛠 技术栈与架构设计

- **Core Engine**: [Astro 6.0](https://astro.build/) (Static Site Generation, Directory URL Formatting)
- **Content System**: Astro Content Collections (`src/content/`) + MDX
- **Search Engine**: [Pagefind Extended 1.6](https://pagefind.app/) (Multilingual Tokenizer, Offline WASM Search)
- **Styling**: Modern Semantic CSS + CSS Grid & Flexbox + System Font Stack
- **SEO & Social**: Automated Canonical, Dynamic XML Sitemap, Open Graph, Twitter Cards, KaTeX Math Formatting
- **Data Validation**: [Zod](https://zod.dev/) Schema Enforcement

---

## 📁 目录结构组织

```text
aiwangluounk.my/
├── .env.example              # 搜索引擎站长平台所有权验证环境变量模板
├── astro.config.mjs          # Astro 全局静态配置与 Sitemap 过滤器
├── package.json              # 依赖与脚本编排 (npm)
├── tsconfig.json             # TypeScript 类型定义配置
├── public/                   # 纯静态资源
│   ├── avatar.webp           # 站点 Logo / 头像
│   ├── favicon.ico / .svg    # 适配多端的多尺寸 Favicon
│   └── robots.txt            # 主流爬虫规则与 Sitemap 索引声明
├── src/
│   ├── assets/               # 优化图片资源 (MiaoKo 实测截图、测试照片)
│   ├── components/           # 高复用 UI 与语义卡片组件
│   │   ├── AffiliateCTA.astro        # 内部 /go/ 网关商业转化组件 (带合规披露)
│   │   ├── BrandSnapshot.astro       # 品牌核心资料卡
│   │   ├── MegaMenu.astro            # 桌面端主导航下拉大菜单
│   │   └── SearchModal.astro         # Pagefind 本地搜索模态弹窗
│   ├── content/              # MDX 内容合集 (严密 Zod 类型校验)
│   │   ├── brands/                   # 31 家唯一品牌深度主评测
│   │   ├── comparisons/              # 7 篇多维度横向对比评测
│   │   ├── guides/                   # 30 篇 Level-3 深度长尾技术实战指南
│   │   ├── pillars/                  # 9 大核心主题 Pillar 文档
│   │   └── secondary-topics/         # 54 个二级专题 Cluster 文档
│   ├── data/                 # 权威结构化数据字典
│   │   ├── brands.ts / Part2.ts      # 31 家品牌结构化规格与冲突台账
│   │   ├── links.ts                  # 全站商业引流外链集中治理字典
│   │   └── navigation.ts             # 导航栏拓扑配置
│   ├── layouts/              # 页面总布局 (BaseLayout.astro)
│   ├── lib/                  # 纯函数工具库 (schema.ts, seo.ts, slug.ts)
│   └── pages/                # 路由入口
│       ├── [pillar]/                 # 一级 Pillar 动态路由
│       ├── brands/                   # 品牌库与 [slug].astro 档案
│       ├── go/[slug].astro           # 商业外链 307 重定向网关
│       └── about.astro / contact...  # E-E-A-T 治理与公信力页面
├── scripts/                  # 自动化质检验收引擎
│   ├── audit-seo.mjs         # SEO 标签与 JSON-LD 语法审计器
│   ├── check-links.mjs       # 全站 43,000+ 内外链接死链检查器
│   └── validate-brands.mjs   # 品牌实体去重与链接集中治理校验器
└── reports/                  # 全站十余份审计、关键词矩阵与交付诊断报告
```

---

## 🚀 本地运行与构建

### 1. 环境准备
确保您的本地环境已安装 **Node.js >= 18.14.1**。

```bash
# 克隆仓库
git clone https://github.com/zlzlzl98698-dev/aiwangluounk.my.git
cd aiwangluounk.my

# 安装依赖
npm install
```

### 2. 启动本地开发服务器
```bash
npm run dev
# 浏览器访问 http://localhost:4321/
```

### 3. 执行生产构建与离线检索索引
```bash
npm run build
# 执行 Astro 静态预渲染，并在 dist/pagefind/ 下生成 Pagefind 索引
```

### 4. 预览生产构建产物
```bash
npm run preview
# 本地预览静态站点 http://localhost:4321/
```

---

## 🧪 自动化质量工程 (QA)

项目内置了严格的测试验证管线，保证每次代码修改后均无技术暗伤：

```bash
npm run qa
```

执行后将依次跑通三个只读检查器：
1. **`validate-brands.mjs`**：
   - 校验 31 个品牌实体完全去重（杜绝换词同质化）；
   - 校验所有推广链接集中保存在 `src/data/links.ts`，严禁正文散落外链；
2. **`check-links.mjs`**：
   - 扫描全站全部 HTML，校验 43,000+ 内部链接 100% 可达（0 死链）；
   - 校验推广外链 100% 包裹 `target="_blank" rel="nofollow sponsored noopener"` 与披露声明；
   - 杜绝假下载、伪链接（如 `[GitHub](GitHub)`）占位；
3. **`audit-seo.mjs`**：
   - 检查全站每个页面的 `<title>`、`<h1>`、`<meta name="description">`、`<link rel="canonical">` 唯一性与非空；
   - 解析全站 428 个 JSON-LD 结构化数据，确保语法 100% 正确。

---

## 📈 搜索引擎与 GEO 合规标准

全站通过了高级预防性技术 SEO 与生成式大模型检索（GEO）审计，核心指标：

- **Canonical 矩阵**：100% 绝对地址自引用，强制尾斜杠，协议统一为 `https://`；
- **Sitemap 清单**：包含 `sitemap-index.xml` 与 `sitemap-0.xml`，收录 148 个有效 200 状态码页面，排除 404 及 `/go/` 网关；
- **爬虫放行覆盖**：`robots.txt` 统一放行 Googlebot、bingbot、Baiduspider 及 yisouspider（神马搜索），阻断垃圾接口；
- **SERP 展示安全**：所有 Title 均控制在 42–56 字符内，Description 控制在 115–145 字符内，杜绝移动端/桌面端搜索结果被 `...` 截断；
- **E-E-A-T 治理背书**：`/about/`、`/editorial-policy/`、`/fact-checking/`、`/disclosure/` 详述独立实验室测试环境（三大运营商千兆宽带、OpenWrt 24.10+ x86 软路由测试基准）与 72 小时勘误时效机制。

---

## 📄 开源许可证

本项目基于 [MIT License](LICENSE) 开源发布。文档与评测数据保留原创权利，转载请注明出处来源于 [网络AI（aiwangluounk.my）](https://aiwangluounk.my)。
