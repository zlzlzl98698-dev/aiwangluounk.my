import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read topics
async function loadTopics() {
  const topicsModule = await import('../src/data/topics.ts');
  return topicsModule.ALL_L2_TOPICS;
}

// Intent classifier based on title and angle
function classifyIntent(title) {
  if (title.includes('怎么办') || title.includes('排查') || title.includes('超时') || title.includes('失败') || title.includes('打不开') || title.includes('解决') || title.includes('错误') || title.includes('未生效') || title.includes('断开')) {
    return 'troubleshooting';
  }
  if (title.includes('教程') || title.includes('安装') || title.includes('导入') || title.includes('配置') || title.includes('设置') || title.includes('实操') || title.includes('步骤') || title.includes('怎么用') || title.includes('如何使用')) {
    return 'how_to';
  }
  if (title.includes('对比') || title.includes('比对') || title.includes('比较') || title.includes('区别') || title.includes('横评') || title.includes('取舍') || title.includes('vs') || title.includes('哪个好')) {
    return 'comparison';
  }
  if (title.includes('选') || title.includes('推荐') || title.includes('怎么买') || title.includes('套餐') || title.includes('价格') || title.includes('多少钱') || title.includes('优惠') || title.includes('退款') || title.includes('试错')) {
    return 'commercial_investigation';
  }
  return 'informational';
}

function extractKeyword(title) {
  let kw = title
    .replace(/[？。！，：、]/g, '')
    .replace(/如何|怎么|怎样|为什么|到底|究竟/g, '')
    .trim();
  if (kw.length > 20) {
    kw = kw.slice(0, 20);
  }
  return kw;
}

// Explicit mapping of 37 published articles to L2 slugs
const EXPLICIT_PUBLISHED = {
  // Existing guides
  'ai-streaming-geoip-routing': { l2Slug: 'streaming', pillarId: 'ai-media', href: '/guides/articles/ai-streaming-geoip-routing/', title: 'AI 与流媒体 GeoIP 分流实战规则' },
  'android-clients-guide': { l2Slug: 'android', pillarId: 'vpn', href: '/guides/articles/android-clients-guide/', title: 'Android 安卓代理客户端选型与配置' },
  'ios-macos-clients-guide': { l2Slug: 'shadowrocket', pillarId: 'clients', href: '/guides/articles/ios-macos-clients-guide/', title: 'iOS 与 macOS 苹果生态代理客户端横评' },
  'linux-openwrt-clients-guide': { l2Slug: 'mihomo', pillarId: 'clients', href: '/guides/articles/linux-openwrt-clients-guide/', title: 'Linux 与 OpenWrt 软路由透明网关实战' },
  'subscription-and-200ok-empty-fix': { l2Slug: 'subscription-failed', pillarId: 'troubleshooting', href: '/guides/articles/subscription-and-200ok-empty-fix/', title: '订阅返回 200 OK 但内容为空故障修复' },
  'time-drift-timeout-troubleshooting': { l2Slug: 'timeout', pillarId: 'troubleshooting', href: '/guides/articles/time-drift-timeout-troubleshooting/', title: '系统时间漂移与节点全部超时排障' },
  'tun-vs-system-proxy-dns': { l2Slug: 'clash-meta', pillarId: 'clients', href: '/guides/articles/tun-vs-system-proxy-dns/', title: 'TUN 模式 vs 系统代理与 DNS 劫持' },
  'windows-clients-guide': { l2Slug: 'v2rayn', pillarId: 'clients', href: '/guides/articles/windows-clients-guide/', title: 'Windows 桌面端代理客户端选型与配置' },
  // Existing comparisons
  '18-yuan-jilian-vs-guangnian': { l2Slug: 'value', pillarId: 'pricing', href: '/compare/18-yuan-jilian-vs-guangnian/', title: '18元月付机场横向对比：极连云 vs 光年梯' },
  '25-yuan-kexin-vs-sujie-vs-sogo': { l2Slug: 'value', pillarId: 'pricing', href: '/compare/25-yuan-kexin-vs-sujie-vs-sogo/', title: '25元档专线对比：可信云 vs 速界 vs SOGO云' },
  'budget-5-6-yuan-tier': { l2Slug: 'cheap', pillarId: 'pricing', href: '/compare/budget-5-6-yuan-tier/', title: '¥5.6 年付折算档低价机场横向对照' },
  'dedicated-client-vs-universal-sub': { l2Slug: 'clash-verge-rev', pillarId: 'clients', href: '/compare/dedicated-client-vs-universal-sub/', title: '自研专属客户端 vs 通用订阅深度对比' },
  'non-expiring-plans-audit': { l2Slug: 'non-expiring', pillarId: 'pricing', href: '/compare/non-expiring-plans-audit/', title: '全库一次性不限时流量包横向审计' },
  // New 24 L3 articles
  'recommend--how-to-choose-checklist': { l2Slug: 'best', pillarId: 'recommend', href: '/guides/articles/recommend--how-to-choose-checklist/', title: '机场推荐指标与选型五步法：IEPL、晚高峰、节点与倍率综合判断' },
  'recommend--newbie-monthly-vs-yearly': { l2Slug: 'best', pillarId: 'recommend', href: '/guides/articles/recommend--newbie-monthly-vs-yearly/', title: '新手买机场选月付还是年付？资金风险、优惠折算与试错成本全算清' },
  'pricing--10-yuan-budget-guide': { l2Slug: 'cheap', pillarId: 'pricing', href: '/guides/articles/pricing--10-yuan-budget-guide/', title: '10元左右机场套餐真实选购指南：月付限制、流量倍率与年付陷阱全算清' },
  'pricing--monthly-vs-non-expiring': { l2Slug: 'non-expiring', pillarId: 'pricing', href: '/guides/articles/pricing--monthly-vs-non-expiring/', title: '月付套餐与不限时按量流量包怎么选？不同使用场景的真实单GB成本计算' },
  'pricing--100gb-usage-estimation': { l2Slug: 'monthly', pillarId: 'pricing', href: '/guides/articles/pricing--100gb-usage-estimation/', title: '100GB 机场流量能用多久？办公、4K 视频与社交媒体实际消耗测算' },
  'brands--how-to-verify-official-site': { l2Slug: 'official-sites', pillarId: 'brands', href: '/guides/articles/brands--how-to-verify-official-site/', title: '如何识别机场虚假镜像官网？域名防冒充、安全核验与支付留痕指南' },
  'vpn--vpn-vs-proxy-difference': { l2Slug: 'compare', pillarId: 'vpn', href: '/guides/articles/vpn--vpn-vs-proxy-difference/', title: 'VPN 与代理有什么区别？协议原理、全局加密与分流场景终极对比' },
  'vpn--free-vpn-risks-and-limits': { l2Slug: 'free', pillarId: 'vpn', href: '/guides/articles/vpn--free-vpn-risks-and-limits/', title: '免费 VPN 的真实限制与隐私风险：日志政策、限速与账号安全排查' },
  'clients--clash-verge-rev-install-guide': { l2Slug: 'clash-verge-rev', pillarId: 'clients', href: '/guides/articles/clients--clash-verge-rev-install-guide/', title: 'Clash Verge Rev 完整安装与配置教程：内核下载、订阅导入与基础分流设置' },
  'clients--clash-verge-tun-mode-setup': { l2Slug: 'clash-meta', pillarId: 'clients', href: '/guides/articles/clients--clash-verge-tun-mode-setup/', title: 'Clash Verge Rev TUN 模式完整配置指南：虚拟网卡、DNS 劫持与游戏局域网放行' },
  'clients--v2rayn-v2rayng-setup-guide': { l2Slug: 'v2rayn', pillarId: 'clients', href: '/guides/articles/clients--v2rayn-v2rayng-setup-guide/', title: 'v2rayN 与 v2rayNG 完整导入与配置教程：Xray 内核选择与路由规则优化' },
  'clients--shadowrocket-ios-setup-guide': { l2Slug: 'shadowrocket', pillarId: 'clients', href: '/guides/articles/clients--shadowrocket-ios-setup-guide/', title: 'Shadowrocket（小火箭）完整配置教程：添加订阅、节点测速与分流规则更新' },
  'ai-media--chatgpt-not-available-fix': { l2Slug: 'chatgpt', pillarId: 'ai-media', href: '/guides/articles/ai-media--chatgpt-not-available-fix/', title: 'ChatGPT 访问失败与地区不支持排查指南：IP 纯净度、DNS 泄漏与分流规则修复' },
  'ai-media--claude-gemini-connection-fix': { l2Slug: 'claude', pillarId: 'ai-media', href: '/guides/articles/ai-media--claude-gemini-connection-fix/', title: 'Claude 与 Gemini 连接失败怎么解决？IP 判定、节点地区与住宅 IP 伪装解析' },
  'ai-media--netflix-disney-unlock-troubleshoot': { l2Slug: 'netflix', pillarId: 'ai-media', href: '/guides/articles/ai-media--netflix-disney-unlock-troubleshoot/', title: 'Netflix 与 Disney+ 解锁失败排查：非自制剧缺失、代理检测与住宅 IP 验证' },
  'routes--iepl-vs-iplc-difference': { l2Slug: 'iepl', pillarId: 'routes', href: '/guides/articles/routes--iepl-vs-iplc-difference/', title: 'IEPL 与 IPLC 专线有什么区别？技术原理、过境机制、延迟与商业造假识别' },
  'routes--multiplier-calculation-and-traps': { l2Slug: 'multiplier', pillarId: 'routes', href: '/guides/articles/routes--multiplier-calculation-and-traps/', title: '机场节点倍率怎么算？0.1x 到 10x 的流量扣除陷阱与高倍率识别' },
  'routes--hk-vs-jp-node-latency': { l2Slug: 'hong-kong', pillarId: 'routes', href: '/guides/articles/routes--hk-vs-jp-node-latency/', title: '香港节点与日本节点怎么选？延迟、丢包率、晚高峰稳定性与应用场景对比' },
  'troubleshooting--all-nodes-timeout-fix': { l2Slug: 'timeout', pillarId: 'troubleshooting', href: '/guides/articles/troubleshooting--all-nodes-timeout-fix/', title: '所有机场节点突然全部超时？系统时间漂移、端口占用与本地防火墙全排查' },
  'troubleshooting--connected-but-no-internet': { l2Slug: 'dns', pillarId: 'troubleshooting', href: '/guides/articles/troubleshooting--connected-but-no-internet/', title: '节点连接成功但网页打不开？DNS 污染、代理端口未放行与 TUN 冲突修复' },
  'risks--airport-shutdown-recovery-guide': { l2Slug: 'shutdowns', pillarId: 'risks', href: '/guides/articles/risks--airport-shutdown-recovery-guide/', title: '机场突然跑路/停运怎么办？维权证据保留、止损流程与备用应急方案' },
  'risks--subscription-url-leak-and-reset': { l2Slug: 'privacy', pillarId: 'risks', href: '/guides/articles/risks--subscription-url-leak-and-reset/', title: '机场订阅链接泄露有什么后果？重置安全码、流量防盗刷与多设备管理' },
  'compare--guangsuyun-vs-feimao': { l2Slug: 'by-use', pillarId: 'recommend', href: '/compare/guangsuyun-vs-feimao/', title: '光速云对比飞猫云：自研客户端 vs 通用订阅、专线质量与新手体验深度横评' },
  'compare--guangsuyun-vs-ermaoyun': { l2Slug: 'value', pillarId: 'pricing', href: '/compare/guangsuyun-vs-ermaoyun/', title: '光速云对比二猫云：同价位主力专线横评、多设备支持与套餐性价比分析' },
};

// Create lookup by l2Slug
const L2_TO_PUBLISHED = {};
for (const [slugKey, pub] of Object.entries(EXPLICIT_PUBLISHED)) {
  if (!L2_TO_PUBLISHED[pub.l2Slug]) {
    L2_TO_PUBLISHED[pub.l2Slug] = [];
  }
  L2_TO_PUBLISHED[pub.l2Slug].push({ slugKey, ...pub });
}

async function main() {
  const topics = await loadTopics();
  console.log(`Processing ${topics.length} L2 topics...`);

  const masterRows = [];
  const articleKeywordMap = {};
  const clusterMap = {};
  const priorityRows = [];

  let idCounter = 1;
  const claimedPublished = new Set();

  for (const topic of topics) {
    const { pillarId, slug: l2Slug, href: l2Href, title: l2Title, l3Clusters } = topic;

    if (!clusterMap[pillarId]) {
      clusterMap[pillarId] = {
        pillarId,
        l2Topics: {},
      };
    }

    clusterMap[pillarId].l2Topics[l2Slug] = {
      l2Slug,
      l2Title,
      l2Href,
      clusters: [],
    };

    if (!l3Clusters || !Array.isArray(l3Clusters)) continue;

    const availablePubs = L2_TO_PUBLISHED[l2Slug] ? [...L2_TO_PUBLISHED[l2Slug]] : [];

    for (let cIdx = 0; cIdx < l3Clusters.length; cIdx++) {
      const cluster = l3Clusters[cIdx];
      const clusterId = `${l2Slug}-c${cIdx + 1}`;
      const clusterObj = {
        clusterId,
        clusterName: cluster.clusterName,
        angle: cluster.angle,
        articles: [],
      };

      for (let aIdx = 0; aIdx < cluster.articleTitles.length; aIdx++) {
        const title = cluster.articleTitles[aIdx];
        const id = `LT-${String(idCounter).padStart(3, '0')}`;
        idCounter++;

        const intent = classifyIntent(title);
        const targetKeyword = extractKeyword(title);

        let publishedStatus = 'backlog';
        let targetHref = '';
        let matchedSlug = '';

        // Match against availablePubs for this L2 topic
        if (availablePubs.length > 0) {
          // Find best match or pop first if candidate
          let matchIdx = availablePubs.findIndex(p => p.title.includes(title.slice(0, 6)) || title.includes(p.title.slice(0, 6)));
          if (matchIdx === -1 && availablePubs.length > 0 && aIdx < availablePubs.length) {
            matchIdx = 0;
          }
          if (matchIdx !== -1) {
            const pub = availablePubs.splice(matchIdx, 1)[0];
            publishedStatus = 'published';
            targetHref = pub.href;
            matchedSlug = pub.slugKey;
            claimedPublished.add(pub.slugKey);
          }
        }

        let priority = 'P2';
        if (publishedStatus === 'published') {
          priority = 'P0';
        } else if (aIdx < 2 && (intent === 'how_to' || intent === 'troubleshooting')) {
          priority = 'P1';
        }

        const evidencePrereq = intent === 'troubleshooting'
          ? '需在真实 Windows/macOS/Android 客户端复现对应错误代码与排障截图'
          : intent === 'comparison'
          ? '需同口径套餐价格表与同节点网络延迟数据'
          : intent === 'commercial_investigation'
          ? '需核对品牌最新结算账单与流量倍率'
          : '需核对官方项目文档与协议定义';

        const row = {
          id,
          pillarId,
          pillarTitle: pillarId,
          l2Slug,
          l2Href,
          clusterId,
          clusterName: cluster.clusterName,
          clusterAngle: cluster.angle,
          targetKeyword,
          articleTitle: title,
          searchIntent: intent,
          priority,
          evidenceRequirement: evidencePrereq,
          targetSlug: matchedSlug || `${l2Slug}--${aIdx + 1}`,
          targetHref: targetHref || `${l2Href}#${clusterId}`,
          publishedStatus,
        };

        masterRows.push(row);

        clusterObj.articles.push({
          id,
          title,
          targetKeyword,
          intent,
          priority,
          publishedStatus,
          targetHref: row.targetHref,
        });

        articleKeywordMap[id] = {
          id,
          title,
          targetKeyword,
          secondaryKeywords: [
            `${targetKeyword} 教程`,
            `${targetKeyword} 解决办法`,
            `${targetKeyword} 怎么样`,
          ],
          searchIntent: intent,
          pillarId,
          l2Slug,
          l2Href,
          clusterName: cluster.clusterName,
          priority,
          publishedStatus,
          targetHref: row.targetHref,
        };

        priorityRows.push({
          id,
          priority,
          pillarId,
          l2Slug,
          title,
          targetKeyword,
          intent,
          publishedStatus,
          targetWordCount: priority === 'P0' ? '3000-5000' : '2500-3500',
        });
      }

      clusterMap[pillarId].l2Topics[l2Slug].clusters.push(clusterObj);
    }
  }

  console.log(`Explicitly claimed published articles: ${claimedPublished.size} / ${Object.keys(EXPLICIT_PUBLISHED).length}`);

  // 1. Write longtail-master.csv
  const csvHeaders = [
    'id',
    'pillarId',
    'l2Slug',
    'l2Href',
    'clusterId',
    'clusterName',
    'clusterAngle',
    'targetKeyword',
    'articleTitle',
    'searchIntent',
    'priority',
    'evidenceRequirement',
    'targetSlug',
    'targetHref',
    'publishedStatus',
  ];

  const escapeCsv = (str) => {
    if (typeof str !== 'string') return String(str ?? '');
    if (str.includes(',') || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvLines = [
    csvHeaders.join(','),
    ...masterRows.map((r) => csvHeaders.map((h) => escapeCsv(r[h])).join(',')),
  ];

  const masterCsvPath = path.join(rootDir, 'data', 'keywords', 'longtail-master.csv');
  fs.writeFileSync(masterCsvPath, '\uFEFF' + csvLines.join('\n'), 'utf8');
  console.log(`Saved ${masterCsvPath} (${masterRows.length} rows)`);

  // 2. Write article-keyword-map.json
  const articleMapPath = path.join(rootDir, 'data', 'keywords', 'article-keyword-map.json');
  fs.writeFileSync(articleMapPath, JSON.stringify(articleKeywordMap, null, 2), 'utf8');
  console.log(`Saved ${articleMapPath} (${Object.keys(articleKeywordMap).length} entries)`);

  // 3. Write cluster-map.json
  const clusterMapPath = path.join(rootDir, 'data', 'keywords', 'cluster-map.json');
  fs.writeFileSync(clusterMapPath, JSON.stringify(clusterMap, null, 2), 'utf8');
  console.log(`Saved ${clusterMapPath}`);

  // 4. Write content-priority.csv
  priorityRows.sort((a, b) => {
    const pWeight = { P0: 0, P1: 1, P2: 2 };
    if (pWeight[a.priority] !== pWeight[b.priority]) return pWeight[a.priority] - pWeight[b.priority];
    return a.id.localeCompare(b.id);
  });

  const prioHeaders = [
    'id',
    'priority',
    'pillarId',
    'l2Slug',
    'targetKeyword',
    'title',
    'intent',
    'publishedStatus',
    'targetWordCount',
  ];
  const prioLines = [
    prioHeaders.join(','),
    ...priorityRows.map((r) => prioHeaders.map((h) => escapeCsv(r[h])).join(',')),
  ];
  const prioCsvPath = path.join(rootDir, 'data', 'keywords', 'content-priority.csv');
  fs.writeFileSync(prioCsvPath, '\uFEFF' + prioLines.join('\n'), 'utf8');
  console.log(`Saved ${prioCsvPath} (${priorityRows.length} rows)`);
}

main().catch(console.error);
