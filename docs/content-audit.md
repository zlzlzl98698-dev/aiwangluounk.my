# 项目内容与信息架构审计报告（Content Audit）

本文档记录 **网络AI（aiwangluounk.my）** 从空白内容目录出发构建全站信息架构的完整盘点，涵盖原有目录状态、全部规范 URL、目标关键词、搜索意图、证据资源可用性与核验队列。

---

## 1. 原有目录与初始化基准审计

1. **原有内容目录状态**：在项目建站初始阶段，[`src/content/`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/src/content.config.ts) 原有目录为空，无历史遗留坏链、无旧版洗稿正文、无跨页面关键词历史包袱。
2. **数据先行与内容分层架构**：
   - 全站先在 `src/data/` 建立强类型单源数据层（`brandsPart1.ts`、`brandsPart2.ts`、`links.ts`、`navigation.ts`、`topicsPart1.ts`、`topicsPart2.ts`、`clients.ts`）。
   - 随后在 `src/content/` 新建 **44 篇** 独立 MDX 内容文件：`brands/`（31 篇，覆盖全部 31 个唯一品牌）、`comparisons/`（5 篇横向对比）、`guides/`（8 篇跨平台客户端与排障深挖教程）。
   - 全部 10 个一级专题与 60 个二级落地页由 `navigation.ts` + `topics.ts` + `TopicPillarView.astro` / `TopicL2View.astro` 驱动生成，并预先规划了 120 个 L3 专题集群（共 720 个潜在扩展选题），待后续按真实搜索数据按需补齐。

---

## 2. 全站页面与规范 URL 统计总览

| 页面层级 | 数量 | 路由模式 | 关键词映射状态 | 说明 |
| --- | ---: | --- | --- | --- |
| 首页 | 1 | `/` | 已映射 | 全站总入口与数据审计概览 |
| 一级专题页（L1） | 10 | `/{pillar}/` | 10/10 已映射 | `recommend` / `pricing` / `brands` / `vpn` / `clients` / `ai-media` / `routes` / `guides` / `troubleshooting` / `risks` |
| 二级决策落地页（L2） | 60 | `/{pillar}/{topic}/` | 60/60 已映射 | 含 `brands/` 下 6 个独立页面（`directory` / `reviews` / `official-sites` / `plan-data` / `coupons` / `alternatives`）与 54 个动态 `[pillar]/[topic]` 页 |
| 唯一品牌主评测页 | 31 | `/brands/{slug}/` | 31/31 已映射 | 100% 绑定唯一 `slug` 与 `src/content/brands/{slug}.mdx`（已合并 Firefly） |
| 横向对比中心与对比文 | 6 | `/compare/` 与 `/compare/{slug}/` | 6/6 已映射 | 1 个索引页 + 5 篇深度横向对比 MDX |
| 深度教程与排障指南 | 8 | `/guides/articles/{slug}/` | 8/8 已映射 | 覆盖 Windows/iOS/Mac/Android/Linux/OpenWrt、AI 分流、订阅 200 OK 与 Timeout 排障 |
| 站点治理与信息透明页 | 8 | `/about/`, `/fact-checking/`, `/changelog/`, `/disclosure/` 等 | 3 个核心页已纳入关键词映射 | 全部 8 个页脚治理页面均实装可访问 |
| 错误页与索引文件 | 3 | `/404.html`, `/rss.xml`, `/sitemap-index.xml` | 排除 SEO 审计统计 | 供托管部署与订阅聚合使用 |

---

## 3. 核心栏目、重点页面与资源可用性审计表

### 3.1 十大一级专题（L1 Pillars）

| 规范 URL | 一级专题 | 目标关键词 | 意图 | 资源可用性与组件支撑 | 核验队列 |
| --- | --- | --- | --- | --- | --- |
| `/recommend/` | 01 机场推荐 | `机场推荐` | `commercial_investigation` | 6 个 L2 决策页 + 跨专题内链 | 随月度品牌复测更新顺位说明 |
| `/pricing/` | 02 价格与套餐 | `机场价格套餐对比` | `commercial_investigation` | 全库 31 品牌价格矩阵 + 不限时单价核算 | 核对季付/年付折扣及限时档在售状态 |
| `/brands/` | 03 机场品牌 | `机场品牌数据库` | `navigational` | 交互式 `BrandFilter` + 31 品牌卡片 | 逐步推进 31 家官网探活与测速补录 |
| `/vpn/` | 04 VPN 与加速器 | `VPN与代理加速器区别` | `informational` | 6 个 L2 专题 + 移动端/安卓安全警示 | 跟踪客户端维护状态与安全通告 |
| `/clients/` | 05 客户端软件 | `代理客户端下载与选型` | `informational` | 21 款六大平台客户端矩阵（`clients.ts`） | 联网核实各客户端官方 Release URL |
| `/ai-media/` | 06 AI 与流媒体 | `AI与流媒体节点解锁指南` | `informational` | 光速云 08-19 与灵动云 07-20 解锁样本 | 定期复测 OpenAI/Claude/Gemini/Netflix |
| `/routes/` | 07 线路与节点 | `IEPL与IPLC线路节点科普` | `informational` | `NetworkPathObservatory` 架构示意图 | 补录三网晚高峰端到端延迟采样 |
| `/guides/` | 08 使用教程 | `机场与代理客户端使用教程` | `informational` | 6 个 L2 + 8 篇实操 MDX 指南 | 随 Mihomo / sing-box 内核版本迭代校验 |
| `/troubleshooting/` | 09 故障排查 | `代理与机场故障排查` | `informational` | 五步定位决策树 + 回退恢复指南 | 持续补充常见报错日志样本 |
| `/risks/` | 10 风险与替代 | `机场避坑与停运核查` | `commercial_investigation` | 全库冲突队列 + 避坑清单 + 退款边界 | 每月复核高风险/链接异常品牌 |

### 3.2 重点二级页、横向对比与深度教程（核心节点）

> 完整 119 条关键词与 URL 映射明细见 [`src/data/keyword-map.json`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/src/data/keyword-map.json) 与 [`docs/keyword-backlog.md`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/docs/keyword-backlog.md)。

| 规范 URL | 类型 | 目标关键词 | 意图 | 现有资源可用性 | 核验/维护动作 |
| --- | --- | --- | --- | --- | --- |
| `/brands/guangsuyun/` | 旗舰品牌主评测 | `光速云机场评测` | `commercial_investigation` | 7 档套餐 + 2026-08-19 5 张真实 MiaoKo 截图 + 08-19/10-19 数据 + 冲突审计 | 核实轻量版 59GB vs 69GB、AMM 折扣率及 2026-11 晚高峰实测 |
| `/brands/lingdongyun/` | 高证据品牌评测 | `灵动云机场评测` | `commercial_investigation` | 9 档套餐 + 2026-07-20/21 珠海联通 9Gbps 实测摘要 + MDX 长文 | 需重测近 30 日速度并核实优惠码与美国01 修复状态 |
| `/brands/firefly/` | 合并实体评测 | `Firefly萤火虫机场评测` | `commercial_investigation` | 合并双档案 + 6 档多周期报价 + 10-19 简表 + MDX 长文 | 确认主推广码授权（`2n7VURre` vs `jTp9wSgZ`）与微信支付 |
| `/pricing/non-expiring/` | L2 价格聚合 | `不限时一次性流量包机场` | `transactional` | 动态汇总 12 家品牌一次性流量包与单 GB 成本 | 月度核验包月/一次性在售状态 |
| `/brands/official-sites/` | L2 链接审计 | `机场官网入口识别防仿冒` | `navigational` | 31 家历史推广入口原文 + 3 家异常 URL 警告 | 在线连通性探活，确认主站域名 |
| `/compare/budget-5-6-yuan-tier/` | 横向对比 MDX | `5.6元便宜机场对比` | `commercial_investigation` | 5 家同系品牌字段交叉表 + URL 异常审计 | 补齐 5 家完整价格、节点与测速 |
| `/compare/dedicated-client-vs-universal-sub/` | 横向对比 MDX | `机场专属客户端好还是通用订阅好` | `commercial_investigation` | 专属端阵营 vs 通用端阵营全库对照 | 跟踪 2026-10 客户端策略变更品牌 |
| `/compare/non-expiring-plans-audit/` | 横向对比 MDX | `不限时机场流量包对比` | `commercial_investigation` | 五强单 GB 成本核算与服务存续风险对比 | 复核各家特殊不退条款 |
| `/guides/articles/ai-streaming-geoip-routing/` | 深度教程 MDX | `ChatGPT Gemini YouTube 送中分流规则` | `informational` | 结合 08-19 与 07-20 真实样本的分流规则 | 随 OpenAI/Google 策略定期更新 |
| `/guides/articles/subscription-and-200ok-empty-fix/` | 深度排障 MDX | `机场订阅导入失败 200 OK 空内容` | `informational` | UA/TLS/代理更新/离线导入完整排障流 | 适配新版 V2Board/XBoard UA 规则 |
| `/guides/articles/linux-openwrt-clients-guide/` | 深度教程 MDX | `OpenWrt 软路由代理插件推荐` | `informational` | OpenClash / PassWall2 / Nikki (24.10+) / HomeProxy 对比 | 核实官方 GitHub Release URL |

---

## 4. 全库 31 品牌证据可用性与核验队列分级

| 核验梯队 | 数量 | 涵盖品牌（Slug） | 现有可用资源 | 下一步核验队列优先级 |
| --- | ---: | --- | --- | --- |
| **T1 · 高实证/截图归档** | 2 | `guangsuyun`, `lingdongyun` | 完整套餐表 + 多节点实测截图/测试摘要 + 冲突完整记录 | **P0**：核实 59/69GB、更新 2026-11 晚高峰实测、复核优惠码 |
| **T2 · 完整套餐 + 历史简表** | 17 | `muguang`, `feimao`, `weifeng`, `xingdaomeng`, `ermao`, `wuyou`, `weitu`, `firefly`, `u1s1`, `lingmao`, `yifan`, `sogo`, `shanyue`, `quanqiu`, `yinxingren`（空表占位）, `edgenova`（无简表有全周期表）, `wangwang`（有全周期表无测速） | 注：`yinxingren` 测速占位、`edgenova`/`wangwang` 无测速；其余 14 家含 2026-10-19 非晚高峰简表与完整套餐 | **P1**：优先核实双优惠码冲突、客户端订阅变更与实际晚高峰表现 |
| **T3 · 基础种子/严重缺口** | 12 | `dalaoyun`, `yuzhou`, `jilian`, `guangnian`, `kexin`, `sujie`, `shandianshu`, `yunjiexian`, `liulianyun`, `shenxing`, `huanqiuti`, `tiziyun` | 仅含单档起价/折算价及基础特性声明，缺节点列表、月付全表与测速数据（其中 3 家 URL 格式异常） | **P2**：先探活 `yunjiexian`/`huanqiuti`/`liulianyun` 推广入口，再补全套餐与协议节点表 |
