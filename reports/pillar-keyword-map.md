# 一级专题关键词与搜索意图边界地图（`pillar-keyword-map.md`）

**维护日期**：2026-11-23｜**原则**：一专题一核心意图，严格避免十个一级专题互相争抢同一搜索词。

| 序号 | 专题页 URL | 主关键词 | 次级关键词 | 核心长尾方向 | 关联实体 | 搜索意图 | 关键词边界（不争抢范围） |
|---|---|---|---|---|---|---|---|
| 01 | `/recommend/` | 机场推荐 | 靠谱机场、稳定机场、好用机场、机场排行 | 2026机场怎么选、新手与多设备机场候选比较 | 光速云、暮光加速、飞猫云、微风网络、星岛梦、Firefly | 选择与比较型 | 不做全库单品价格拆解（归 `/pricing/`），不充当全库字段检索表（归 `/brands/`） |
| 02 | `/pricing/` | 机场价格与套餐对比 | 便宜机场、月付机场、不限时机场、性价比机场 | 年付折算月价怎么算、一元/一分机场真相、一次性流量包单价 | 光速云147套餐、5.6元档、二猫云、星岛梦、唯兔云 | 价格决策型 | 聚焦计费周期、折算公式与单 GB 成本，不做单品牌深度评测 |
| 03 | `/brands/` | 机场品牌数据库 | 机场品牌评测、品牌官网识别、机场优惠码 | 31家机场档案查询、推广链接格式核查、双码冲突检索 | 31唯一实体、Firefly合并档案、云界线、榴莲云、环球梯 | 品牌检索与评测型 | 承担多维筛选检索与资料完整性说明，深度单品细节下沉 `/brands/{slug}/` |
| 04 | `/vpn/` | VPN 与加速器区别 | VPN推荐、免费VPN风险、手机VPN、游戏加速器 | 传统VPN和机场代理技术差异、Android/iOS差异、FullCone NAT | WireGuard、OpenVPN、Mihomo、sing-box、NekoBox | 产品比较与知识型 | 不写具体某家机场报价，重点区分 VPN、规则代理与游戏加速器三类产品 |
| 05 | `/clients/` | 代理客户端软件大全 | Clash Verge Rev、v2rayN、Shadowrocket、Mihomo、sing-box | Windows/Mac/iOS/Android/Linux/OpenWrt客户端选择与架构匹配 | Clash Verge Rev、FlClash、v2rayNG、Stash、Nikki、HomeProxy | 工具选择与操作型 | 聚焦软件选型、内核协议与安全下载源核查，详细配置步骤引导至 `/guides/` |
| 06 | `/ai-media/` | AI 与流媒体解锁指南 | ChatGPT机场、Claude机场、Gemini机场、Netflix解锁、YouTube送中 | 香港节点仅App原因、Gemini地区失败、TikTok与动画疯检测 | OpenAI、Anthropic、Google Gemini、Netflix、YouTube、MiaoKo | 场景兼容与验证型 | 聚焦平台风控、地区识别与测试方法，不替代具体线路物理原理（归 `/routes/`） |
| 07 | `/routes/` | 机场线路与节点解析 | IEPL专线、IPLC专线、香港节点、日本节点、低延迟节点、线路倍率 | TLS RTT与HTTPS延迟区别、1倍倍率核对、晚高峰测试口径 | IEPL、IPLC、BGP中转、ASN、Native IP、IPrisk | 技术知识与测试型 | 聚焦底层网络传输、延迟指标与倍率机制，不作泛品牌推荐榜单 |
| 08 | `/guides/` | 代理订阅与配置教程 | 机场订阅教程、Clash配置、分流规则、TUN模式、客户端安装 | Rule与Global区别、Fake-IP与Redir-Host、多设备与软路由协同 | Subscription Token、YAML、Service Mode、Fake-IP | 分步骤任务型 | 提供全流程导航与路线图，不复制已发布的 8 篇三级详文全文 |
| 09 | `/troubleshooting/` | 代理故障排查诊断中心 | 节点超时、订阅失败、连接不上、DNS错误、客户端无法启动 | 200 OK 0字节原因、系统时间漂移、198.18.x.x残留、TUN与Docker冲突 | HTTP 200、UA、NTP时间、WebView2、Fake-IP、WSL2 | 诊断与问题解决型 | 采用六步排查闭环定位报错，不替代系统初装教程（归 `/guides/`） |
| 10 | `/risks/` | 机场风险识别与替代指南 | 机场跑路核查、机场避坑、机场替代方案、退款条款、代理隐私安全 | 五级风险区分、年付沉没成本、拒装陌生根证书、停服后容灾迁移 | 推广披露、USDT不可逆、MITM根证书、2026.6.1样例隔离 | 风险识别与备选决策型 | 严守证据核查与对位替代逻辑，绝不机械全站推销同一品牌 |
