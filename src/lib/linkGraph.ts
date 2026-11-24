export interface LinkRecommendation {
  title: string;
  href: string;
  category: string;
  reason: string;
}

export const PILLAR_CROSS_LINKS: Record<string, LinkRecommendation[]> = {
  recommend: [
    { title: '机场品牌库检索', href: '/brands/', category: '品牌数据库', reason: '按入门价、周期与资料完整度自助筛选 31 家品牌' },
    { title: '月付机场方案', href: '/pricing/monthly/', category: '价格与套餐', reason: '先按月实测晚高峰再决定是否长期续费' },
    { title: '数据冲突与核验状态说明', href: '/fact-checking/', category: '编辑方法', reason: '了解 vendor、historical 与 measured 标签边界' },
  ],
  pricing: [
    { title: '不限时流量包汇总', href: '/pricing/non-expiring/', category: '价格与套餐', reason: '对比一次性不过期流量包的总价与单 GB 成本' },
    { title: '选购避坑指南', href: '/risks/avoid-scams/', category: '风险与替代', reason: '识别低价年付陷阱、夸大宣称与不退条款' },
    { title: '品牌价格资料档案', href: '/brands/plan-data/', category: '机场品牌', reason: '查看 31 家品牌完整历史套餐与冲突标注' },
  ],
  brands: [
    { title: '综合推荐候选', href: '/recommend/best/', category: '机场推荐', reason: '结合适用人群与客户端生态查看候选对比' },
    { title: '客户端下载与安装矩阵', href: '/clients/', category: '客户端软件', reason: '区分仅专属客户端与支持通用订阅的服务' },
    { title: '优惠码收录核查表', href: '/brands/coupons/', category: '机场品牌', reason: '核对历史优惠码适用限制与记录冲突' },
  ],
  vpn: [
    { title: 'Clash Verge Rev 使用指南', href: '/clients/clash-verge-rev/', category: '客户端软件', reason: '桌面端开源代理客户端配置与分流实践' },
    { title: '隐私与安全边界', href: '/risks/privacy/', category: '风险与替代', reason: '评估免费 VPN 与专属客户端的隐私风险' },
    { title: 'TUN 模式原理解析', href: '/guides/tun/', category: '使用教程', reason: '理解虚拟网卡接管与传统 VPN 隧道的异同' },
  ],
  clients: [
    { title: '订阅导入入门教程', href: '/guides/subscription/', category: '使用教程', reason: '完成首次客户端导入与节点连通性验证' },
    { title: '订阅失败排查树', href: '/troubleshooting/subscription-failed/', category: '故障排查', reason: '解决 200 OK 空内容、证书错误与格式不匹配' },
    { title: '仅专属客户端与通用端对比', href: '/recommend/easy-to-use/', category: '机场推荐', reason: '飞猫云、隐形人等专属端与第三方软件生态差异' },
  ],
  'ai-media': [
    { title: 'ChatGPT 节点风控排查', href: '/ai-media/chatgpt/', category: 'AI 与流媒体', reason: '解决香港节点仅 App 可用及网页端拦截问题' },
    { title: '日本节点特点分析', href: '/routes/japan/', category: '线路与节点', reason: '日本出口在 AI 工具与流媒体间的典型表现' },
    { title: 'YouTube 送中定位方法', href: '/ai-media/youtube/', category: 'AI 与流媒体', reason: '理解地区识别机制及分流策略组调整思路' },
  ],
  routes: [
    { title: '低延迟节点与测速指标', href: '/routes/low-latency/', category: '线路与节点', reason: '区分 TLS RTT、HTTPS Ping 与实际吞吐含义' },
    { title: '香港节点生态观察', href: '/routes/hong-kong/', category: '线路与节点', reason: '香港主力节点低延迟优势与 AI 地区限制权衡' },
    { title: '节点超时排查流程', href: '/troubleshooting/timeout/', category: '故障排查', reason: '系统定位线路抖动、本地出口与时间漂移' },
  ],
  guides: [
    { title: '客户端软件总览', href: '/clients/', category: '客户端软件', reason: '按 Windows/Android/iOS/macOS/Linux/OpenWrt 选软件' },
    { title: 'DNS 故障排查', href: '/troubleshooting/dns/', category: '故障排查', reason: '修复 Fake-IP 冲突与域名解析异常' },
    { title: '跨设备使用配置', href: '/guides/multi-device/', category: '使用教程', reason: '确认设备连接上限与家庭软路由部署条件' },
  ],
  troubleshooting: [
    { title: 'TUN 与系统代理冲突', href: '/troubleshooting/tun-proxy/', category: '故障排查', reason: '解决代理端口残留与多工具抢占网卡问题' },
    { title: '分流规则编写基础', href: '/guides/routing-rules/', category: '使用教程', reason: '通过清晰规则集减少误分流导致的连接失败' },
    { title: '替代方案选择参考', href: '/risks/alternatives/', category: '风险与替代', reason: '当节点长期不可用时评估平滑迁移方案' },
  ],
  risks: [
    { title: '月付机场短周期试错', href: '/pricing/monthly/', category: '价格与套餐', reason: '用最小沉没成本验证线路与客服响应' },
    { title: '事实核查与证据标准', href: '/fact-checking/', category: '编辑方法', reason: '查看本站对停运传闻与商家宣称的审核边界' },
    { title: '数据冲突与更新日志', href: '/changelog/', category: '站点治理', reason: '跟踪 31 品牌待核验清单与历史记录变动' },
  ],
};
