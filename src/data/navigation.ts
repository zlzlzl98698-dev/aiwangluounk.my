export interface NavSubItem {
  title: string;
  href: string;
  description: string;
  badge?: string;
}

export interface NavPillar {
  id: string;
  code: string;
  title: string;
  href: string;
  summary: string;
  children: NavSubItem[];
}

export const NAV_PILLARS: NavPillar[] = [
  {
    id: 'recommend',
    code: '01',
    title: '机场推荐',
    href: '/recommend/',
    summary: '按使用场景、预算区间与证据完整度筛选网络服务方案，明确测试条件与数据边界。',
    children: [
      { title: '综合推荐', href: '/recommend/best/', description: '按资料完整度与适用场景整理的编辑候选参考。' },
      { title: '机场排行', href: '/recommend/rankings/', description: '公开候选排序依据、数据年份与不可横向定榜说明。' },
      { title: '靠谱机场', href: '/recommend/reliable/', description: '从运营记录、协议透明度与售后机制评估可靠性。' },
      { title: '稳定机场', href: '/recommend/stable/', description: '关注晚高峰实测口径、多网兼容与历史测速表现。' },
      { title: '好用机场', href: '/recommend/easy-to-use/', description: '自研客户端一键登录与通用订阅导入的上手门槛对比。' },
      { title: '按用途推荐', href: '/recommend/by-use/', description: 'AI 工具、流媒体解锁、跨境电商与轻度办公分类选择。' },
    ],
  },
  {
    id: 'pricing',
    code: '02',
    title: '价格与套餐',
    href: '/pricing/',
    summary: '拆解月付、年付折算月价与一次性流量包的真实计费差异，避免低价误区。',
    children: [
      { title: '便宜机场', href: '/pricing/cheap/', description: '年付折算 5.6–12 元/月档位的真实流量与协议拆解。' },
      { title: '一元机场', href: '/pricing/one-yuan/', description: '低价入门方案的风险边界、实际成本与筛选标准。' },
      { title: '一分机场', href: '/pricing/one-cent/', description: '解析一分钱营销词背后的真实市场现状与安全警示。' },
      { title: '月付机场', href: '/pricing/monthly/', description: '按月续费方案对比，适合先短期实测晚高峰的用户。' },
      { title: '不限时机场', href: '/pricing/non-expiring/', description: '一次性流量包总价、不过期条件与备用场景核算。' },
      { title: '性价比机场', href: '/pricing/value/', description: '结合单 GB 成本、客户端生态与线路宣称综合核算。' },
    ],
  },
  {
    id: 'brands',
    code: '03',
    title: '机场品牌',
    href: '/brands/',
    summary: '31 个独立机场品牌档案库：支持多维筛选、来源级别标识与冲突数据审计。',
    children: [
      { title: '品牌目录', href: '/brands/directory/', description: '31 家品牌结构化总览表与索引状态快速查阅。' },
      { title: '品牌评测', href: '/brands/reviews/', description: '按资料完备度与编辑优先级浏览各品牌独立主评测。' },
      { title: '官网识别', href: '/brands/official-sites/', description: '推广入口核对、URL 格式异常提示与防仿冒核查方法。' },
      { title: '价格资料', href: '/brands/plan-data/', description: '全库品牌历史套餐档案、冲突记录与日期标注。' },
      { title: '优惠码查询', href: '/brands/coupons/', description: '收录各品牌历史优惠码、适用限制与冲突口径汇总。' },
      { title: '停运与替代', href: '/brands/alternatives/', description: '数据缺失品牌风险提醒与同类规格替代方案对照。' },
    ],
  },
  {
    id: 'vpn',
    code: '04',
    title: 'VPN 与加速器',
    href: '/vpn/',
    summary: '厘清传统 VPN、代理机场与游戏加速器的技术架构差异与合规适用边界。',
    children: [
      { title: 'VPN 推荐', href: '/vpn/best/', description: '传统加密隧道 VPN 与代理机场的选型边界说明。' },
      { title: '免费 VPN', href: '/vpn/free/', description: '免费服务的带宽限制、隐私审计要点与安全风险。' },
      { title: '手机 VPN', href: '/vpn/mobile/', description: 'iOS 与 Android 移动端系统代理、耗电与后台保活对比。' },
      { title: '安卓 VPN', href: '/vpn/android/', description: 'Android 端 APK 签名核验、Google Play 仿冒避坑。' },
      { title: '游戏加速器', href: '/vpn/gaming/', description: 'UDP 转发、FullCone NAT 与游戏路由分流的机制区别。' },
      { title: 'VPN 对比', href: '/vpn/compare/', description: '协议开销、分流粒度、计费方式与多设备适配对比。' },
    ],
  },
  {
    id: 'clients',
    code: '05',
    title: '客户端软件',
    href: '/clients/',
    summary: '覆盖 Windows、Android、iOS、macOS、Linux 与 OpenWrt 的开源及主流客户端指南。',
    children: [
      { title: 'Clash Verge Rev', href: '/clients/clash-verge-rev/', description: '基于 Mihomo 内核的跨平台桌面端配置与 TUN 模式指南。' },
      { title: 'Clash Meta', href: '/clients/clash-meta/', description: 'Mihomo / Clash Meta 内核演进与 Android 生态说明。' },
      { title: 'v2rayN', href: '/clients/v2rayn/', description: '支持 Xray 与 sing-box 多核心的桌面客户端与选核要点。' },
      { title: 'Shadowrocket', href: '/clients/shadowrocket/', description: 'iOS/iPadOS 规则代理工具的订阅导入、分流与定价提示。' },
      { title: 'Mihomo', href: '/clients/mihomo/', description: '规则引擎内核参数、覆写脚本与常见客户端生态梳理。' },
      { title: 'sing-box', href: '/clients/sing-box/', description: '现代通用代理平台在桌面、移动端与软路由中的配置思路。' },
    ],
  },
  {
    id: 'ai-media',
    code: '06',
    title: 'AI 与流媒体',
    href: '/ai-media/',
    summary: '按节点地区、检测工具与日期拆解 AI 生产力平台和海外流媒体的真实访问条件。',
    children: [
      { title: 'ChatGPT', href: '/ai-media/chatgpt/', description: '网页端与 App 端风控差异、香港节点限制与分流排查。' },
      { title: 'Claude', href: '/ai-media/claude/', description: 'IP 风险分值、地区限制与账号风控隔离实用建议。' },
      { title: 'Gemini', href: '/ai-media/gemini/', description: '不同出口地区对 Gemini 的支持差异与常见失败原因。' },
      { title: 'Netflix', href: '/ai-media/netflix/', description: '自制剧与非自制剧解锁状态、原生 IP 与跨区识别解析。' },
      { title: 'YouTube', href: '/ai-media/youtube/', description: '4K/8K 吞吐要求与 YouTube 送中（CN）定位及规避方法。' },
      { title: 'Disney+ 与其他', href: '/ai-media/streaming/', description: 'Disney+、HBO Max、TikTok 与 Spotify 多平台检测方法。' },
    ],
  },
  {
    id: 'routes',
    code: '07',
    title: '线路与节点',
    href: '/routes/',
    summary: '客观区分商业宣称与可观测事实，解析 IEPL、IPLC、BGP 中转与节点倍率机制。',
    children: [
      { title: 'IEPL', href: '/routes/iepl/', description: '以太网专线概念、品牌宣称边界与不可凭公网 IP 推断原则。' },
      { title: 'IPLC', href: '/routes/iplc/', description: '国际私用出租线路架构示意图、时延特征与核验难度。' },
      { title: '香港节点', href: '/routes/hong-kong/', description: '低延迟主力枢纽的延迟特征与 AI/流媒体限制权衡。' },
      { title: '日本节点', href: '/routes/japan/', description: '东京/大阪出口在流媒体、AI 与跨太平洋路由中的表现。' },
      { title: '低延迟节点', href: '/routes/low-latency/', description: 'TLS RTT 与 HTTPS Ping 延迟差异及运营商晚高峰影响。' },
      { title: '线路倍率', href: '/routes/multiplier/', description: '1x 与高倍率节点流量扣费机制及账单核对方法。' },
    ],
  },
  {
    id: 'guides',
    code: '08',
    title: '使用教程',
    href: '/guides/',
    summary: '面向新手与进阶用户的分步操作教程，附带前置条件、验证方式与回退指引。',
    children: [
      { title: '订阅入门', href: '/guides/subscription/', description: '通用订阅链接格式、专属客户端区别与安全保存规范。' },
      { title: 'Clash 配置', href: '/guides/clash-config/', description: 'YAML 配置文件结构、策略组与测速选点实操。' },
      { title: '分流规则', href: '/guides/routing-rules/', description: '国内直连、AI 独立分流与流媒体策略组配置逻辑。' },
      { title: 'TUN 模式', href: '/guides/tun/', description: '虚拟网卡全局接管原理、权限要求与系统代理区别。' },
      { title: '客户端安装', href: '/guides/install/', description: '六大操作系统 CPU 架构识别、安装包校验与首次启动。' },
      { title: '跨设备使用', href: '/guides/multi-device/', description: '电脑、手机与软路由协同配置及设备数量限制避坑。' },
    ],
  },
  {
    id: 'troubleshooting',
    code: '09',
    title: '故障排查',
    href: '/troubleshooting/',
    summary: '基于“症状→定位→分叉→恢复验证”的决策树排查工具，避免破坏性系统操作。',
    children: [
      { title: '节点超时', href: '/troubleshooting/timeout/', description: '区分本地网络波动、时间漂移与落地节点失效。' },
      { title: '订阅失败', href: '/troubleshooting/subscription-failed/', description: '排查 200 OK 返回 0 字节、UA 拦截与 TLS 证书异常。' },
      { title: '连接不上', href: '/troubleshooting/cannot-connect/', description: '端口占用、系统代理冲突、到期配额与防火墙排查。' },
      { title: 'DNS 错误', href: '/troubleshooting/dns/', description: 'Fake-IP 污染、Redir-Host 解析异常与局域网回环修复。' },
      { title: '客户端无法启动', href: '/troubleshooting/app-startup/', description: '内核权限不足、杀毒拦截与损坏配置回滚步骤。' },
      { title: 'TUN 与系统代理故障', href: '/troubleshooting/tun-proxy/', description: '混合模式下网关冲突、WSL/Docker 异常与网卡重置。' },
    ],
  },
  {
    id: 'risks',
    code: '10',
    title: '风险与替代',
    href: '/risks/',
    summary: '坚持证据与日期标注，客观看待品牌停运传闻、退款规则、隐私边界与替代路径。',
    children: [
      { title: '机场停运与跑路', href: '/risks/shutdowns/', description: '区分临时维护、域名更换与确认停运的核查依据。' },
      { title: '选购避坑', href: '/risks/avoid-scams/', description: '识别夸大带宽宣称、虚假永久承诺与高风险年付诱饵。' },
      { title: '替代方案', href: '/risks/alternatives/', description: '当某服务不可用或仅支持专属端时的合理迁移对照。' },
      { title: '退款与纠纷', href: '/risks/refunds/', description: '特殊套餐不退条款、支付渠道差异与下单前试错策略。' },
      { title: '隐私和安全', href: '/risks/privacy/', description: '专属客户端权限审查、仿冒安装包风险与最小信任原则。' },
      { title: '风险动态', href: '/risks/updates/', description: '全站 31 品牌链接异常、数据冲突与核验状态追踪日志。' },
    ],
  },
];

export const FOOTER_META_LINKS = [
  { title: '关于我们', href: '/about/' },
  { title: '编辑原则', href: '/editorial-policy/' },
  { title: '事实核查办法', href: '/fact-checking/' },
  { title: '品牌数据更新日志', href: '/changelog/' },
  { title: '广告与推广披露', href: '/disclosure/' },
  { title: '隐私说明', href: '/privacy/' },
  { title: '联系我们', href: '/contact/' },
  { title: '全站地图', href: '/sitemap/' },
];

export function getAllL2Routes(): { pillar: NavPillar; item: NavSubItem }[] {
  return NAV_PILLARS.flatMap((pillar) =>
    pillar.children.map((item) => ({ pillar, item }))
  );
}
