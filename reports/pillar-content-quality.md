# 一级专题内容质量与 SEO/GEO 检查报告（`pillar-content-quality.md`）

**检查脚本**：`node scripts/audit-pillars.mjs`、`node scripts/audit-seo.mjs`、`node scripts/validate-brands.mjs`

## 一、字数、结构与 Schema 实测明细

| 序号 | 专题路径 | 纯正文汉字数 | 含导读+FAQ总编辑汉字数 | H1 | H2 / H3 | 对比表格 | 可见 FAQ | JSON-LD 类型 |
|---|---|---:|---:|---:|---:|---:|---:|---|
| 01 | `/recommend/` | 10,743 | 12,769 | 1 | 11 / 21 | 2 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 02 | `/pricing/` | 9,919 | 11,779 | 1 | 9 / 26 | 3 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 03 | `/brands/` | 10,253 | 11,834 | 1 | 13 / 16 | 3 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 04 | `/vpn/` | 10,215 | 11,895 | 1 | 13 / 10 | 3 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 05 | `/clients/` | 10,716 | 12,597 | 1 | 8 / 20 | 6 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 06 | `/ai-media/` | 10,463 | 12,309 | 1 | 8 / 20 | 3 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 07 | `/routes/` | 10,445 | 11,902 | 1 | 12 / 24 | 7 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 08 | `/guides/` | 10,101 | 11,505 | 1 | 12 / 22 | 7 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 09 | `/troubleshooting/` | 9,916 | 11,306 | 1 | 13 / 69 | 4 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| 10 | `/risks/` | 10,995 | 12,635 | 1 | 10 / 18 | 6 | 11 | `BreadcrumbList, CollectionPage, ItemList, FAQPage` |
| **合计** | **10 大一级专题** | **103,766** | **120,531** | **10** | **109 / 246** | **44** | **110** | **全部有效且与页面内容一致** |

## 二、GEO/AEO 与事实核查合规说明

1. **来源分级与时间明确**：全站严格区分 `Measured`、`Historical`、`Vendor` 与 `Pending`，例如 2026-10-19 非晚高峰表、2026-08-19 光速云 MiaoKo 截图、2026-07-20/21 灵动云珠海联通样本均标明原日期与网络条件；`2026.6.1 飞猫云样例` 明确隔离为设计模板参考。
2. **禁止捏造与冲突直面**：如实记录库内无 1 元与 0.01 元档位；明确光速云 59GB/69GB 冲突、云界线/环球梯/榴莲云 URL 异常、Firefly 双推广码合并及多家双优惠码冲突。
3. **MDX 与安全合规**：54 篇 MDX 文件经脚本校验 **0 处外部推广 URL 硬编码**，**0 处假 GitHub 下载链接**，排障章节绝不输出破坏性系统重置脚本。
