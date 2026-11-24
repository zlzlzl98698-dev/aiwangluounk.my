# 网络AI（aiwangluounk.my）｜二级专题内链图谱与死链/锚点审计报告

- 构建后整站链接检测（`node scripts/check-links.mjs`）：扫描 **125 个 HTML 页面**，校验 **37,290 条站内链接**与 **62 处外部推广链接**，**0 错误**。
- 本次 60 个二级专题正文共植入 **3,150 处**合规站内内链，所有锚点（`#toc`、`#answer-first`、`#topic-data-matrix`、`#l3-clusters`、`#topic-faq` 及正文标题 ID）在 60 个构建 HTML 中的失效数为 **0**。
- 推广链接治理：`src/content/secondary-topics/*.mdx` 严格保持 **0 条硬编码外部 aff URL**、**0 条虚假 `[GitHub](GitHub)` 下载链接**；商业转化统一导向对应 `/brands/{slug}/` 或站内比价页，并受 `src/data/links.ts` + `rel="nofollow sponsored noopener"` 统一管辖。

## 二级专题对核心商业与品牌页的引流频次（被不同 L2 页面唯一引用次数 Top 25）

| 目标站内路径 | 引用它的不同 L2 页面数 | 页面角色 |
| :--- | ---: | :--- |
| `/brands/guangsuyun/` | 58 / 60 | 独立品牌主评测页 |
| `/brands/yifan/` | 55 / 60 | 独立品牌主评测页 |
| `/brands/sogo/` | 50 / 60 | 独立品牌主评测页 |
| `/brands/yinxingren/` | 49 / 60 | 独立品牌主评测页 |
| `/brands/feimao/` | 47 / 60 | 独立品牌主评测页 |
| `/brands/xingdaomeng/` | 46 / 60 | 独立品牌主评测页 |
| `/brands/weitu/` | 46 / 60 | 独立品牌主评测页 |
| `/brands/wuyou/` | 45 / 60 | 独立品牌主评测页 |
| `/brands/firefly/` | 45 / 60 | 独立品牌主评测页 |
| `/brands/kexin/` | 43 / 60 | 独立品牌主评测页 |
| `/brands/quanqiu/` | 42 / 60 | 独立品牌主评测页 |
| `/brands/lingmao/` | 41 / 60 | 独立品牌主评测页 |
| `/brands/shanyue/` | 41 / 60 | 独立品牌主评测页 |
| `/brands/lingdongyun/` | 41 / 60 | 独立品牌主评测页 |
| `/brands/tiziyun/` | 38 / 60 | 独立品牌主评测页 |
| `/brands/dalaoyun/` | 38 / 60 | 独立品牌主评测页 |
| `/brands/jilian/` | 38 / 60 | 独立品牌主评测页 |
| `/brands/guangnian/` | 37 / 60 | 独立品牌主评测页 |
| `/brands/ermao/` | 36 / 60 | 独立品牌主评测页 |
| `/brands/sujie/` | 33 / 60 | 独立品牌主评测页 |
| `/brands/shandianshu/` | 33 / 60 | 独立品牌主评测页 |
| `/clients/clash-verge-rev/` | 30 / 60 | 一/二级专题枢纽页 |
| `/brands/yunjiexian/` | 29 / 60 | 独立品牌主评测页 |
| `/brands/liulianyun/` | 29 / 60 | 独立品牌主评测页 |
| `/brands/huanqiuti/` | 29 / 60 | 独立品牌主评测页 |

## 各二级专题正文外链、内链与唯一目标统计

| L2 路径 | 正文内链总数 | 唯一目标页数 | 外部 aff URL | 失效锚点 |
| :--- | ---: | ---: | ---: | ---: |
| `/recommend/best/` | 189 | 46 | 0 | 0 |
| `/recommend/rankings/` | 78 | 36 | 0 | 0 |
| `/recommend/reliable/` | 128 | 38 | 0 | 0 |
| `/recommend/stable/` | 57 | 29 | 0 | 0 |
| `/recommend/easy-to-use/` | 61 | 37 | 0 | 0 |
| `/recommend/by-use/` | 46 | 26 | 0 | 0 |
| `/pricing/cheap/` | 71 | 38 | 0 | 0 |
| `/pricing/one-yuan/` | 58 | 28 | 0 | 0 |
| `/pricing/one-cent/` | 41 | 29 | 0 | 0 |
| `/pricing/monthly/` | 99 | 42 | 0 | 0 |
| `/pricing/non-expiring/` | 45 | 21 | 0 | 0 |
| `/pricing/value/` | 142 | 44 | 0 | 0 |
| `/brands/directory/` | 103 | 44 | 0 | 0 |
| `/brands/reviews/` | 43 | 36 | 0 | 0 |
| `/brands/official-sites/` | 88 | 42 | 0 | 0 |
| `/brands/plan-data/` | 103 | 39 | 0 | 0 |
| `/brands/coupons/` | 42 | 35 | 0 | 0 |
| `/brands/alternatives/` | 96 | 44 | 0 | 0 |
| `/vpn/best/` | 132 | 61 | 0 | 0 |
| `/vpn/free/` | 78 | 42 | 0 | 0 |
| `/vpn/mobile/` | 42 | 35 | 0 | 0 |
| `/vpn/android/` | 46 | 37 | 0 | 0 |
| `/vpn/gaming/` | 22 | 16 | 0 | 0 |
| `/vpn/compare/` | 38 | 26 | 0 | 0 |
| `/clients/clash-verge-rev/` | 34 | 30 | 0 | 0 |
| `/clients/clash-meta/` | 31 | 21 | 0 | 0 |
| `/clients/v2rayn/` | 29 | 23 | 0 | 0 |
| `/clients/shadowrocket/` | 31 | 28 | 0 | 0 |
| `/clients/mihomo/` | 30 | 24 | 0 | 0 |
| `/clients/sing-box/` | 22 | 19 | 0 | 0 |
| `/ai-media/chatgpt/` | 48 | 39 | 0 | 0 |
| `/ai-media/claude/` | 40 | 39 | 0 | 0 |
| `/ai-media/gemini/` | 45 | 39 | 0 | 0 |
| `/ai-media/netflix/` | 49 | 39 | 0 | 0 |
| `/ai-media/youtube/` | 40 | 29 | 0 | 0 |
| `/ai-media/streaming/` | 40 | 30 | 0 | 0 |
| `/routes/iepl/` | 64 | 32 | 0 | 0 |
| `/routes/iplc/` | 37 | 22 | 0 | 0 |
| `/routes/hong-kong/` | 74 | 46 | 0 | 0 |
| `/routes/japan/` | 13 | 10 | 0 | 0 |
| `/routes/low-latency/` | 24 | 20 | 0 | 0 |
| `/routes/multiplier/` | 55 | 43 | 0 | 0 |
| `/guides/subscription/` | 48 | 45 | 0 | 0 |
| `/guides/clash-config/` | 44 | 30 | 0 | 0 |
| `/guides/routing-rules/` | 40 | 26 | 0 | 0 |
| `/guides/tun/` | 11 | 7 | 0 | 0 |
| `/guides/install/` | 41 | 35 | 0 | 0 |
| `/guides/multi-device/` | 75 | 50 | 0 | 0 |
| `/troubleshooting/timeout/` | 17 | 14 | 0 | 0 |
| `/troubleshooting/subscription-failed/` | 25 | 24 | 0 | 0 |
| `/troubleshooting/cannot-connect/` | 11 | 11 | 1 | 0 |
| `/troubleshooting/dns/` | 17 | 15 | 0 | 0 |
| `/troubleshooting/app-startup/` | 23 | 23 | 0 | 0 |
| `/troubleshooting/tun-proxy/` | 8 | 8 | 0 | 0 |
| `/risks/shutdowns/` | 39 | 35 | 0 | 0 |
| `/risks/avoid-scams/` | 27 | 25 | 0 | 0 |
| `/risks/alternatives/` | 71 | 53 | 0 | 0 |
| `/risks/refunds/` | 48 | 36 | 0 | 0 |
| `/risks/privacy/` | 29 | 23 | 7 | 0 |
| `/risks/updates/` | 22 | 17 | 0 | 0 |
