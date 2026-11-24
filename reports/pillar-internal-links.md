# 一级专题内部链接矩阵报告（`pillar-internal-links.md`）

**检验日期**：2026-11-23｜**扫描脚本**：`node scripts/check-links.mjs` & `node scripts/audit-pillars.mjs`

## 一、实测内链数据总览

全站 125 个 HTML 页面共校验 **33,476 条**内部链接，**0 死链、0 假下载链接**。十大一级专题各自正文内链实测统计如下：

| 一级专题 | 正文内链总数 | 正文唯一内链数 | 覆盖下级与关联类型 |
|---|---:|---:|---|
| 01 `/recommend/` | 180 | 79 | 6 个二级专题 + 全部 31 个品牌重点代表 + 5 篇 `/compare/*` + `/pricing/` + `/routes/` + `/clients/` + `/risks/` |
| 02 `/pricing/` | 177 | 49 | 6 个二级专题 + `/compare/budget-5-6-yuan-tier/` + `/compare/non-expiring-plans-audit/` + 代表品牌价目页 |
| 03 `/brands/` | 163 | 50 | 6 个二级专题 + 31 家 `/brands/{slug}/` 全部直达 + 对比中心 + `/fact-checking/` + `/risks/updates/` |
| 04 `/vpn/` | 38 | 24 | 6 个二级专题 + `/clients/` + `/guides/articles/tun-vs-system-proxy-dns/` + `/guides/articles/android-clients-guide/` + `/risks/privacy/` |
| 05 `/clients/` | 45 | 38 | 6 个二级专题 + 4 篇 OS 三级详文 + `/compare/dedicated-client-vs-universal-sub/` + `/guides/` + `/troubleshooting/` |
| 06 `/ai-media/` | 30 | 18 | 6 个二级专题 + `/guides/articles/ai-streaming-geoip-routing/` + 光速云/灵动云/可信云/速界等评测 |
| 07 `/routes/` | 26 | 19 | 6 个二级专题 + 光速云/灵动云/一翻云/SOGO/唯兔等实测档案 + `/ai-media/` + `/troubleshooting/timeout/` |
| 08 `/guides/` | 53 | 44 | 6 个二级专题 + 全部 8 篇 `/guides/articles/*` 深度教程 + `/clients/*` + `/troubleshooting/*` |
| 09 `/troubleshooting/` | 52 | 29 | 6 个二级专题 + 24 个页内诊断锚点 + `/guides/articles/*` 排障详文 + `/risks/alternatives/` |
| 10 `/risks/` | 80 | 47 | 6 个二级专题 + `/brands/official-sites/` + `/fact-checking/` + `/changelog/` + `/disclosure/` + 对位品牌评测 |

## 二、核心跨专题转化路径核查

- `机场推荐 (/recommend/)` → `价格与套餐 (/pricing/)` → `机场品牌 (/brands/)` → 31 个独立品牌评测 `/brands/{slug}/` → `AffiliateCTA`（`links.ts` 集中管理）
- `机场推荐 (/recommend/)` → `线路与节点 (/routes/)` → 光速云/灵动云测速实证页
- `VPN 与加速器 (/vpn/)` → `客户端软件 (/clients/)` → `使用教程 (/guides/)` → 8 篇系统与配置三级详文
- `客户端软件 (/clients/)` → `使用教程 (/guides/)` → `故障排查 (/troubleshooting/)`
- `AI 与流媒体 (/ai-media/)` → `线路与节点 (/routes/)` → 节点分流实战教程与品牌评测
- `风险与替代 (/risks/)` → `机场品牌 (/brands/)` → 按场景对位替代方案（无机械单一引流）
