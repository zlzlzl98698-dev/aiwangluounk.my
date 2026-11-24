# 网络AI（aiwangluounk.my）｜长尾关键词映射报告

- **报告生成时间**：2026-11-24
- **数据源文件**：`data/keywords/longtail-master.csv`、`data/keywords/article-keyword-map.json`、`data/keywords/cluster-map.json`
- **总收录词数**：720 条结构化长尾搜索词（覆盖全站 10 大一级专题 × 60 个二级专题）

---

## 一、关键词映射数据结构与分类模型

长尾关键词系统严格遵循《三级专题升级.txt》第四章的分类标准，将搜索词拆分为五大独立搜索意图（Search Intent）：

```
                                  ┌── 1. 信息型 (Informational) ────────── 28%
                                  │   (概念定义、技术原理、术语科普)
                                  ├── 2. 操作型 (How-to) ───────────────── 26%
                                  │   (客户端安装、订阅导入、TUN 配置)
长尾关键词意图分布 (720 词) ──────┼── 3. 排障型 (Troubleshooting) ──────── 19%
                                  │   (节点超时、200 OK 空白、地区不支持)
                                  ├── 4. 对比型 (Comparison) ───────────── 14%
                                  │   (同价位横评、自研 vs 通用、专线差异)
                                  └── 5. 商业调研型 (Commercial Invest.) ── 13%
                                      (10元套餐怎么选、不限时包算账、优惠码)
```

---

## 二、一级主题维度长尾集群分布统计

| 一级主题 (Pillar ID) | 下辖二级专题数 | 规划三级集群数 | 规划长尾选题量 | 已发布 P0 核心文章 |
| :--- | :---: | :---: | :---: | :---: |
| **机场推荐 (recommend)** | 6 | 12 | 72 | 3 篇（含对比） |
| **价格与套餐 (pricing)** | 6 | 12 | 72 | 7 篇（含对比） |
| **机场品牌 (brands)** | 6 | 12 | 72 | 1 篇（+31 篇品牌评测） |
| **VPN 与加速器 (vpn)** | 6 | 12 | 72 | 3 篇 |
| **客户端软件 (clients)** | 6 | 12 | 72 | 10 篇（含对比） |
| **AI 与流媒体 (ai-media)** | 6 | 12 | 72 | 4 篇 |
| **线路与节点 (routes)** | 6 | 12 | 72 | 3 篇 |
| **使用教程 (guides)** | 6 | 12 | 72 | 1 篇 |
| **故障排查 (troubleshooting)**| 6 | 12 | 72 | 4 篇 |
| **风险与替代 (risks)** | 6 | 12 | 72 | 2 篇 |
| **全站总计** | **60** | **120** | **720** | **37 篇指南与对比** |

---

## 三、核心 P0 长尾词与已发布文章映射矩阵（样本展示）

| 唯一识别码 (ID) | 核心目标搜索词 | 搜索意图类型 | 对应已发布文章真实 URL | 所属 L2 二级专题 |
| :--- | :--- | :---: | :--- | :--- |
| `LT-007` | 机场推荐指标与选型五步法 | `commercial_investigation` | `/guides/articles/recommend--how-to-choose-checklist/` | `/recommend/best/` |
| `LT-005` | 机场买月付还是年付划算 | `commercial_investigation` | `/guides/articles/recommend--newbie-monthly-vs-yearly/` | `/recommend/best/` |
| `LT-073` | 10元左右机场套餐真实选购 | `commercial_investigation` | `/guides/articles/pricing--10-yuan-budget-guide/` | `/pricing/cheap/` |
| `LT-085` | 月付套餐与不限时按量流量包对比 | `comparison` | `/guides/articles/pricing--monthly-vs-non-expiring/` | `/pricing/non-expiring/` |
| `LT-097` | 100GB 机场流量能用多久 | `informational` | `/guides/articles/pricing--100gb-usage-estimation/` | `/pricing/monthly/` |
| `LT-157` | 如何识别机场虚假镜像官网 | `how_to` | `/guides/articles/brands--how-to-verify-official-site/` | `/brands/official-sites/` |
| `LT-229` | VPN与代理有什么区别 | `comparison` | `/guides/articles/vpn--vpn-vs-proxy-difference/` | `/vpn/compare/` |
| `LT-205` | 免费VPN真实限制与隐私风险 | `informational` | `/guides/articles/vpn--free-vpn-risks-and-limits/` | `/vpn/free/` |
| `LT-289` | Clash Verge Rev 安装与配置教程 | `how_to` | `/guides/articles/clients--clash-verge-rev-install-guide/` | `/clients/clash-verge-rev/` |
| `LT-301` | Clash Verge TUN模式设置教程 | `how_to` | `/guides/articles/clients--clash-verge-tun-mode-setup/` | `/clients/clash-meta/` |
| `LT-313` | v2rayN 与 v2rayNG 导入订阅配置 | `how_to` | `/guides/articles/clients--v2rayn-v2rayng-setup-guide/` | `/clients/v2rayn/` |
| `LT-325` | Shadowrocket（小火箭）配置教程 | `how_to` | `/guides/articles/clients--shadowrocket-ios-setup-guide/` | `/clients/shadowrocket/` |
| `LT-361` | ChatGPT 访问失败与地区不支持排查 | `troubleshooting` | `/guides/articles/ai-media--chatgpt-not-available-fix/` | `/ai-media/chatgpt/` |
| `LT-373` | Claude 与 Gemini 连接失败怎么解决 | `troubleshooting` | `/guides/articles/ai-media--claude-gemini-connection-fix/` | `/ai-media/claude/` |
| `LT-385` | Netflix 与 Disney+ 解锁失败排查 | `troubleshooting` | `/guides/articles/ai-media--netflix-disney-unlock-troubleshoot/` | `/ai-media/netflix/` |
| `LT-433` | IEPL 与 IPLC 专线区别与原理 | `informational` | `/guides/articles/routes--iepl-vs-iplc-difference/` | `/routes/iepl/` |
| `LT-469` | 机场节点倍率怎么算与陷阱拆解 | `informational` | `/guides/articles/routes--multiplier-calculation-and-traps/` | `/routes/multiplier/` |
| `LT-457` | 香港节点与日本节点延迟对比 | `comparison` | `/guides/articles/routes--hk-vs-jp-node-latency/` | `/routes/hong-kong/` |
| `LT-577` | 所有机场节点突然全部超时排查 | `troubleshooting` | `/guides/articles/troubleshooting--all-nodes-timeout-fix/` | `/troubleshooting/timeout/` |
| `LT-613` | 节点连接成功但网页打不开解决 | `troubleshooting` | `/guides/articles/troubleshooting--connected-but-no-internet/` | `/troubleshooting/dns/` |
| `LT-649` | 机场突然跑路停运怎么办自救 | `how_to` | `/guides/articles/risks--airport-shutdown-recovery-guide/` | `/risks/shutdowns/` |
| `LT-697` | 机场订阅链接泄露应急排查 | `how_to` | `/guides/articles/risks--subscription-url-leak-and-reset/` | `/risks/privacy/` |

---

## 四、去重与关键词防互噬机制（Cannibalization Prevention）

为了防止站内不同文章互相竞争完全相同的主要搜索词，关键词系统执行了三项铁律：
1. **单一主意图独占**：每个具体搜索意图仅归属一篇权威文章（如 `Clash Verge TUN模式设置` 唯一由 `clients--clash-verge-tun-mode-setup.mdx` 承接，其他文章仅作为内链引用）；
2. **品牌词归属隔离**：凡带有具体品牌名称的词（如“光速云评测”、“二猫云套餐”），严格归属对应的 `/brands/{slug}/` 品牌专页，普通通用教程文章绝不争抢品牌词；
3. **对比词归属隔离**：两两品牌横向比对词（如“光速云对比飞猫云”），统一归属于 `/compare/{slug}/` 独立对比路由，避免与单品牌评测页产生关键词互噬。
