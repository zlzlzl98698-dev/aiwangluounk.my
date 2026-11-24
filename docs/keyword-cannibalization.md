# 关键词互抢检测与冲突治理报告（Keyword Cannibalization Report）

本文档追踪全站关键词与 URL 映射的唯一性，防止多个页面围绕相同意图与目标词相互竞争，配套 [`scripts/keyword-pipeline.mjs`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/scripts/keyword-pipeline.mjs) 持续审计。

## 1. 自动化互抢冲突检测结果

<!-- PIPELINE:CANNIBAL_STATUS:START -->
> 最近一次流水线检测：映射记录 **119** 条，GSC 导入行 **0** 条，发现同词多 URL 互抢冲突 **0** 处，GSC 着陆页偏离 **0** 处。

✅ 当前静态关键词映射表（`src/data/keyword-map.json`）中 **0 处同词抢多 URL 冲突**；全部 31 个品牌、10 个一级专题与 60 个二级页面均保持 1-to-1 唯一首选 URL 归属。
<!-- PIPELINE:CANNIBAL_STATUS:END -->

## 2. 已执行的结构级防互抢治理措施

1. **Firefly 重复实体合并**：原始资料同时包含第 8 条“Firefly”与补充条目“Firefly 萤火虫”。本站合并为唯一权威页面 `/brands/firefly/`，并将 `Firefly`、`Firefly 萤火虫`、`Firefly萤火虫机场评测` 及双推广码归口至同一实体，消除双页面互抢。
2. **单品牌一页制（`/brands/{slug}/`）**：31 家品牌的评测、套餐价格、优惠码、客户端限制均收敛到唯一 `/brands/{slug}/`；`/brands/coupons/` 与 `/brands/plan-data/` 仅作为跨品牌聚合查询页，不与单品牌主词竞争。
3. **同系低价品牌词隔离**：¥5.6 档五家高度同质化品牌（大佬云、闪电鼠、云界线、榴莲云、环球梯）各自独立保留 `/brands/{slug}/` 承载单品牌查询，同时用唯一横向对比页 `/compare/budget-5-6-yuan-tier/` 承接“5.6元便宜机场对比”类集合词，避免在 5 个品牌页内重复堆砌相同泛词。
4. **L2 专题枢纽 vs L3 深度指南分工**：
   - `/guides/tun/` 承接泛概念检索（“TUN模式原理与系统代理区别”），`/guides/articles/tun-vs-system-proxy-dns/` 承接具体的“DNS 分流、开发容器兼容与回退实操”。
   - `/pricing/non-expiring/` 承接全库 12 家品牌一次性流量包汇总查询，`/compare/non-expiring-plans-audit/` 承接“不限时机场流量包对比”深度五强审计与单 GB 核算。
5. **GSC 着陆页偏离自动巡检**：上线后可通过 `--gsc` 参数自动比对 Google 实际返回着陆页与 `primaryURL` 是否一致；若出现单品牌查询被误导向 `/brands/coupons/` 或 `/compare/`，优先通过调整内链锚文本与摘要首段强化唯一权威页信号。
