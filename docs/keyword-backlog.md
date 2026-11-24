# 关键词优先级待办队列（Keyword Backlog）

本文档记录全站 **119 个** 规范页面的目标关键词排期与待补核验队列。所有排序均由 [`scripts/keyword-pipeline.mjs`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/scripts/keyword-pipeline.mjs) 按 **30% / 25% / 15% / 15% / 10% / 5%** 内部编辑权重自动计算并同步。

## 1. 全站关键词优先级总表

<!-- PIPELINE:BACKLOG_TABLE:START -->
> 自动生成时间：2026-11-23 · 总映射词条：**119**（含 31 品牌、10 一级专题、60 二级页面及重点对比/教程/治理页）。
> 注：无真实 GSC/Bing 搜索数据时，搜索量相关列留空（`null`），下表按 **30%/25%/15%/15%/10%/5%** 内部编辑权重排序。

| 顺位 | 目标关键词 | 唯一首选 URL | 意图 | 覆盖状态 | 内部优先级分 | 状态 |
| ---: | --- | --- | --- | --- | ---: | --- |
| 1 | `机场推荐与代理工具知识库` | `/` | commercial_investigation | covered_page | **94.2** | active |
| 2 | `光速云机场评测` | `/brands/guangsuyun/` | commercial_investigation | covered_mdx | **93.2** | needs_verification |
| 3 | `机场品牌数据库` | `/brands/` | navigational | covered_page | **89.1** | active |
| 4 | `机场推荐` | `/recommend/` | commercial_investigation | covered_page | **88.1** | active |
| 5 | `机场价格套餐对比` | `/pricing/` | commercial_investigation | covered_page | **88.1** | active |
| 6 | `代理客户端下载与选型` | `/clients/` | informational | covered_page | **88.1** | active |
| 7 | `ChatGPT Gemini YouTube 送中分流规则` | `/guides/articles/ai-streaming-geoip-routing/` | informational | covered_mdx | **87.3** | active |
| 8 | `2026机场综合推荐` | `/recommend/best/` | commercial_investigation | covered_page | **86.9** | active |
| 9 | `便宜机场推荐与价格核算` | `/pricing/cheap/` | commercial_investigation | covered_page | **85.9** | active |
| 10 | `机场选购避坑十大清单` | `/risks/avoid-scams/` | commercial_investigation | covered_page | **85.3** | active |
| 11 | `Clash Verge Rev使用教程` | `/clients/clash-verge-rev/` | informational | covered_page | **85.1** | active |
| 12 | `Shadowrocket小火箭使用指南` | `/clients/shadowrocket/` | informational | covered_page | **85.1** | active |
| 13 | `月付机场推荐清单` | `/pricing/monthly/` | transactional | covered_page | **85** | active |
| 14 | `不限时机场流量包对比` | `/compare/non-expiring-plans-audit/` | commercial_investigation | covered_mdx | **84.8** | active |
| 15 | `机场排行榜与候选顺位` | `/recommend/rankings/` | commercial_investigation | covered_page | **84.6** | active |
| 16 | `机场官网入口识别防仿冒` | `/brands/official-sites/` | navigational | covered_page | **84.5** | active |
| 17 | `机场优惠码查询汇总` | `/brands/coupons/` | transactional | covered_page | **84.3** | active |
| 18 | `ChatGPT机场节点解锁排查` | `/ai-media/chatgpt/` | informational | covered_page | **84.2** | active |
| 19 | `v2rayN下载配置与选核指南` | `/clients/v2rayn/` | informational | covered_page | **84** | active |
| 20 | `机场避坑与停运核查` | `/risks/` | commercial_investigation | covered_page | **83.6** | active |
| 21 | `机场停运跑路核查准则` | `/risks/shutdowns/` | informational | covered_page | **83.5** | active |
| 22 | `机场品牌横向对比评测` | `/compare/` | commercial_investigation | covered_page | **83.1** | active |
| 23 | `靠谱稳定机场怎么选` | `/recommend/reliable/` | commercial_investigation | covered_page | **83** | active |
| 24 | `机场订阅导入失败 200 OK 空内容` | `/guides/articles/subscription-and-200ok-empty-fix/` | informational | covered_mdx | **82.9** | active |
| 25 | `不限时一次性流量包机场` | `/pricing/non-expiring/` | transactional | covered_page | **82.7** | active |
| 26 | `VPN与代理加速器区别` | `/vpn/` | informational | covered_page | **82.6** | active |
| 27 | `AI与流媒体节点解锁指南` | `/ai-media/` | informational | covered_page | **82.6** | active |
| 28 | `IEPL与IPLC线路节点科普` | `/routes/` | informational | covered_page | **82.6** | active |
| 29 | `机场与代理客户端使用教程` | `/guides/` | informational | covered_page | **82.6** | active |
| 30 | `代理与机场故障排查` | `/troubleshooting/` | informational | covered_page | **82.6** | active |
| 31 | `高性价比机场评估` | `/pricing/value/` | commercial_investigation | covered_page | **82.4** | active |
| 32 | `Windows 代理客户端推荐` | `/guides/articles/windows-clients-guide/` | informational | covered_mdx | **82.4** | active |
| 33 | `机场订阅链接导入教程` | `/guides/subscription/` | informational | covered_page | **82** | active |
| 34 | `Android 代理客户端推荐` | `/guides/articles/android-clients-guide/` | informational | covered_mdx | **82** | active |
| 35 | `一元机场真实情况` | `/pricing/one-yuan/` | commercial_investigation | covered_page | **81.9** | active |
| 36 | `暮光加速评测` | `/brands/muguang/` | commercial_investigation | covered_mdx | **81.9** | needs_verification |
| 37 | `机场专属客户端好还是通用订阅好` | `/compare/dedicated-client-vs-universal-sub/` | commercial_investigation | covered_mdx | **81.9** | active |
| 38 | `iOS macOS 代理客户端推荐` | `/guides/articles/ios-macos-clients-guide/` | informational | covered_mdx | **81.9** | active |
| 39 | `5.6元便宜机场对比` | `/compare/budget-5-6-yuan-tier/` | commercial_investigation | covered_mdx | **81.6** | active |
| 40 | `TUN 模式和系统代理区别` | `/guides/articles/tun-vs-system-proxy-dns/` | informational | covered_mdx | **81.6** | active |
| 41 | `稳定低延迟机场推荐` | `/recommend/stable/` | commercial_investigation | covered_page | **81.5** | active |
| 42 | `订阅更新失败200 OK空内容排查` | `/troubleshooting/subscription-failed/` | informational | covered_page | **81.5** | active |
| 43 | `机场节点全部超时 Timeout 排查` | `/guides/articles/time-drift-timeout-troubleshooting/` | informational | covered_mdx | **81.5** | active |
| 44 | `机场节点全部超时Timeout排查` | `/troubleshooting/timeout/` | informational | covered_page | **81.4** | active |
| 45 | `Claude访问风控与节点选择` | `/ai-media/claude/` | informational | covered_page | **81.3** | active |
| 46 | `31家机场数据冲突与核验追踪` | `/risks/updates/` | navigational | covered_page | **81.2** | active |
| 47 | `机场品牌评测汇总` | `/brands/reviews/` | commercial_investigation | covered_page | **81** | active |
| 48 | `微风网络机场评测` | `/brands/weifeng/` | commercial_investigation | covered_mdx | **81** | needs_verification |
| 49 | `机场停运替代方案对照` | `/brands/alternatives/` | commercial_investigation | covered_page | **80.9** | active |
| 50 | `Clash配置文件与覆写教程` | `/guides/clash-config/` | informational | covered_page | **80.9** | active |
| 51 | `TUN模式原理与系统代理区别` | `/guides/tun/` | informational | covered_page | **80.9** | active |
| 52 | `Mihomo内核与OpenWrt指南` | `/clients/mihomo/` | informational | covered_page | **80.8** | active |
| 53 | `sing-box客户端配置指南` | `/clients/sing-box/` | informational | covered_page | **80.8** | active |
| 54 | `六大系统代理客户端安装导航` | `/guides/install/` | informational | covered_page | **80.8** | active |
| 55 | `代理连不上打不开网页排查` | `/troubleshooting/cannot-connect/` | informational | covered_page | **80.8** | active |
| 56 | `Clash Meta内核与安卓端说明` | `/clients/clash-meta/` | informational | covered_page | **80.7** | active |
| 57 | `Gemini地区限制与新加坡分流` | `/ai-media/gemini/` | informational | covered_page | **80.4** | active |
| 58 | `Netflix流媒体解锁与跨区识别` | `/ai-media/netflix/` | informational | covered_page | **80.3** | active |
| 59 | `机场受限迁移与替代方案` | `/risks/alternatives/` | commercial_investigation | covered_page | **80.3** | active |
| 60 | `安卓VPN与APK安全指南` | `/vpn/android/` | informational | covered_page | **80.1** | active |
| 61 | `YouTube送中排查与4K带宽` | `/ai-media/youtube/` | informational | covered_page | **80** | active |
| 62 | `好用免配置机场对比` | `/recommend/easy-to-use/` | commercial_investigation | covered_page | **79.9** | active |
| 63 | `31家机场品牌目录` | `/brands/directory/` | navigational | covered_page | **79.9** | active |
| 64 | `代理分流规则编写教程` | `/guides/routing-rules/` | informational | covered_page | **79.8** | active |
| 65 | `Clash DNS错误与Fake-IP排障` | `/troubleshooting/dns/` | informational | covered_page | **79.8** | active |
| 66 | `隐形人机场评测` | `/brands/yinxingren/` | commercial_investigation | covered_mdx | **79.8** | needs_verification |
| 67 | `VPN推荐与机场区别` | `/vpn/best/` | commercial_investigation | covered_page | **79.6** | active |
| 68 | `二猫云机场评测` | `/brands/ermao/` | commercial_investigation | covered_mdx | **79.2** | needs_verification |
| 69 | `机场历史套餐价格档案` | `/brands/plan-data/` | commercial_investigation | covered_page | **79** | active |
| 70 | `手机VPN与移动端代理` | `/vpn/mobile/` | commercial_investigation | covered_page | **79** | active |
| 71 | `无忧链接机场评测` | `/brands/wuyou/` | commercial_investigation | covered_mdx | **78.9** | needs_verification |
| 72 | `按用途选择机场方案` | `/recommend/by-use/` | commercial_investigation | covered_page | **78.8** | active |
| 73 | `Disney+与TikTok解锁检测` | `/ai-media/streaming/` | informational | covered_page | **78.7** | active |
| 74 | `TUN与系统代理断网残留修复` | `/troubleshooting/tun-proxy/` | informational | covered_page | **78.7** | active |
| 75 | `代理与专属客户端隐私安全` | `/risks/privacy/` | informational | covered_page | **78.7** | active |
| 76 | `OpenWrt 软路由代理插件推荐` | `/guides/articles/linux-openwrt-clients-guide/` | informational | covered_mdx | **78.6** | active |
| 77 | `一分机场风险与真相` | `/pricing/one-cent/` | informational | covered_page | **78.5** | active |
| 78 | `免费VPN风险与替代` | `/vpn/free/` | informational | covered_page | **78.4** | active |
| 79 | `IEPL专线原理与核验边界` | `/routes/iepl/` | informational | covered_page | **78.2** | active |
| 80 | `IPLC国际专线与IEPL区别` | `/routes/iplc/` | informational | covered_page | **78.2** | active |
| 81 | `飞猫云机场评测` | `/brands/feimao/` | commercial_investigation | covered_mdx | **78** | needs_verification |
| 82 | `Firefly萤火虫机场评测` | `/brands/firefly/` | commercial_investigation | covered_mdx | **78** | needs_verification |
| 83 | `代理客户端无法启动闪退修复` | `/troubleshooting/app-startup/` | informational | covered_page | **77.6** | active |
| 84 | `商业VPN与通用机场对比` | `/vpn/compare/` | commercial_investigation | covered_page | **77.5** | active |
| 85 | `机场香港节点延迟与AI限制` | `/routes/hong-kong/` | informational | covered_page | **77.1** | active |
| 86 | `机场多设备并发与软路由配置` | `/guides/multi-device/` | informational | covered_page | **77.1** | active |
| 87 | `机场退款规则与支付纠纷自保` | `/risks/refunds/` | informational | covered_page | **77.1** | active |
| 88 | `机场日本节点表现分析` | `/routes/japan/` | informational | covered_page | **76.6** | active |
| 89 | `机场节点倍率扣费机制` | `/routes/multiplier/` | informational | covered_page | **76.5** | active |
| 90 | `星岛梦机场评测` | `/brands/xingdaomeng/` | commercial_investigation | covered_mdx | **76.5** | needs_verification |
| 91 | `游戏加速器与机场代理区别` | `/vpn/gaming/` | informational | covered_page | **75.3** | active |
| 92 | `灵动云机场评测` | `/brands/lingdongyun/` | commercial_investigation | covered_mdx | **75** | needs_verification |
| 93 | `TLS RTT与HTTPS延迟区别` | `/routes/low-latency/` | informational | covered_page | **74.9** | active |
| 94 | `唯兔云机场评测` | `/brands/weitu/` | commercial_investigation | covered_mdx | **74.6** | needs_verification |
| 95 | `U1S1机场评测` | `/brands/u1s1/` | commercial_investigation | covered_mdx | **73.5** | needs_verification |
| 96 | `灵猫网络机场评测` | `/brands/lingmao/` | commercial_investigation | covered_mdx | **73.5** | needs_verification |
| 97 | `一翻云机场评测` | `/brands/yifan/` | commercial_investigation | covered_mdx | **73.5** | needs_verification |
| 98 | `SOGO云机场评测` | `/brands/sogo/` | commercial_investigation | covered_mdx | **73.5** | needs_verification |
| 99 | `全球云机场评测` | `/brands/quanqiu/` | commercial_investigation | covered_mdx | **73.5** | needs_verification |
| 100 | `25元机场推荐 可信云 速界 SOGO云` | `/compare/25-yuan-kexin-vs-sujie-vs-sogo/` | commercial_investigation | covered_mdx | **73** | active |
| 101 | `大佬云机场评测` | `/brands/dalaoyun/` | commercial_investigation | covered_with_gaps | **72** | needs_verification |
| 102 | `31家机场品牌数据更新日志与待核验清单` | `/changelog/` | navigational | covered_page | **71.4** | active |
| 103 | `闪跃机场评测` | `/brands/shanyue/` | commercial_investigation | covered_mdx | **69.9** | needs_verification |
| 104 | `极连云对比光年梯 18元机场` | `/compare/18-yuan-jilian-vs-guangnian/` | commercial_investigation | covered_mdx | **69** | active |
| 105 | `机场评测事实核查与证据分级办法` | `/fact-checking/` | informational | covered_page | **69** | active |
| 106 | `推广链接与商业佣金关系披露说明` | `/disclosure/` | navigational | covered_page | **63.3** | active |
| 107 | `浪网机场评测` | `/brands/wangwang/` | commercial_investigation | covered_with_gaps | **62.7** | needs_verification |
| 108 | `边缘节点EdgeNova评测` | `/brands/edgenova/` | commercial_investigation | covered_with_gaps | **62.7** | needs_verification |
| 109 | `梯子云机场评测` | `/brands/tiziyun/` | commercial_investigation | covered_with_gaps | **60** | needs_verification |
| 110 | `宇宙云机场评测` | `/brands/yuzhou/` | commercial_investigation | covered_with_gaps | **56.4** | needs_verification |
| 111 | `云界线机场评测` | `/brands/yunjiexian/` | commercial_investigation | covered_with_gaps | **56.4** | needs_verification |
| 112 | `榴莲云机场评测` | `/brands/liulianyun/` | commercial_investigation | covered_with_gaps | **56.4** | needs_verification |
| 113 | `环球梯机场评测` | `/brands/huanqiuti/` | commercial_investigation | covered_with_gaps | **56.4** | needs_verification |
| 114 | `极连云机场评测` | `/brands/jilian/` | commercial_investigation | covered_with_gaps | **53.8** | needs_verification |
| 115 | `光年梯机场评测` | `/brands/guangnian/` | commercial_investigation | covered_with_gaps | **53.8** | needs_verification |
| 116 | `可信云机场评测` | `/brands/kexin/` | commercial_investigation | covered_with_gaps | **53.8** | needs_verification |
| 117 | `速界机场评测` | `/brands/sujie/` | commercial_investigation | covered_with_gaps | **53.8** | needs_verification |
| 118 | `闪电鼠机场评测` | `/brands/shandianshu/` | commercial_investigation | covered_with_gaps | **53.8** | needs_verification |
| 119 | `神行加速机场评测` | `/brands/shenxing/` | commercial_investigation | covered_with_gaps | **53.8** | needs_verification |
<!-- PIPELINE:BACKLOG_TABLE:END -->

## 2. 下一阶段扩展与补录建议（待 GSC/Bing 数据接入后）

1. **接入真实搜索控制台数据**：上线收录后导出首月 GSC / Bing Queries CSV，执行 `node scripts/keyword-pipeline.mjs --gsc <file.csv>`，识别高展示低点击（CTR 偏低）与着陆页偏离词条。
2. **品牌证据升级队列**：对 31 家品牌中当前标记为 `needs_verification` 的条目，优先围绕前 11 位编辑候选与冲突较多品牌（光速云、暮光加速、微风网络、灵猫网络、Firefly、隐形人、云界线、榴莲云、环球梯）补齐当期联网连通性与晚高峰实测。
3. **L3 长尾文章扩展**：60 个二级页面下的 `l3Clusters` 已规划 120 组共 720 个 L3 选题方向；后续仅在真实搜索需求或用户问题反馈明确时，从高优先级集群（如 AI 分流、不限时单价、订阅 200 OK 排障）按需落地，绝不批量套模板堆砌薄内容。
