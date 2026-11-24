import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

const L2_ROUTES = [
  // 01 recommend
  'recommend/best', 'recommend/rankings', 'recommend/reliable', 'recommend/stable', 'recommend/easy-to-use', 'recommend/by-use',
  // 02 pricing
  'pricing/cheap', 'pricing/one-yuan', 'pricing/one-cent', 'pricing/monthly', 'pricing/non-expiring', 'pricing/value',
  // 03 brands
  'brands/directory', 'brands/reviews', 'brands/official-sites', 'brands/plan-data', 'brands/coupons', 'brands/alternatives',
  // 04 vpn
  'vpn/best', 'vpn/free', 'vpn/mobile', 'vpn/android', 'vpn/gaming', 'vpn/compare',
  // 05 clients
  'clients/clash-verge-rev', 'clients/clash-meta', 'clients/v2rayn', 'clients/shadowrocket', 'clients/mihomo', 'clients/sing-box',
  // 06 ai-media
  'ai-media/chatgpt', 'ai-media/claude', 'ai-media/gemini', 'ai-media/netflix', 'ai-media/youtube', 'ai-media/streaming',
  // 07 routes
  'routes/iepl', 'routes/iplc', 'routes/hong-kong', 'routes/japan', 'routes/low-latency', 'routes/multiplier',
  // 08 guides
  'guides/subscription', 'guides/clash-config', 'guides/routing-rules', 'guides/tun', 'guides/install', 'guides/multi-device',
  // 09 troubleshooting
  'troubleshooting/timeout', 'troubleshooting/subscription-failed', 'troubleshooting/cannot-connect', 'troubleshooting/dns', 'troubleshooting/app-startup', 'troubleshooting/tun-proxy',
  // 10 risks
  'risks/shutdowns', 'risks/avoid-scams', 'risks/alternatives', 'risks/refunds', 'risks/privacy', 'risks/updates',
];

function stripTagsAndCode(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<pre[\s\S]*?<\/pre>/gi, ' ')
    .replace(/<code[\s\S]*?<\/code>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z0-9#]+;/gi, ' ');
}

function countChineseChars(text) {
  const matches = text.match(/[\u4e00-\u9fff]/g);
  return matches ? matches.length : 0;
}

const results = [];
let totalProseHanzi = 0;
let totalEditorialHanzi = 0;
let upgradedCount = 0;

for (const rel of L2_ROUTES) {
  const [pillarId, slug] = rel.split('/');
  const htmlPath = path.join(DIST, pillarId, slug, 'index.html');
  const mdxPath = path.join(ROOT, 'src', 'content', 'secondary-topics', `${pillarId}--${slug}.mdx`);
  if (!fs.existsSync(htmlPath)) {
    console.error('MISSING HTML:', htmlPath);
    process.exitCode = 1;
    continue;
  }
  const html = fs.readFileSync(htmlPath, 'utf8');
  const proseMatch = html.match(/<article[^>]*class="[^"]*l2-prose[^"]*"[^>]*>([\s\S]*?)<\/article>/i);
  const proseHtml = proseMatch ? proseMatch[1] : '';
  const proseHanzi = countChineseChars(stripTagsAndCode(proseHtml));

  const faqMatch = html.match(/<section[^>]*id="topic-faq"[^>]*>([\s\S]*?)<\/section>/i);
  const faqHanzi = faqMatch ? countChineseChars(stripTagsAndCode(faqMatch[1])) : 0;
  const answerMatch = html.match(/<aside[^>]*class="[^"]*answer-summary[^"]*"[^>]*>([\s\S]*?)<\/aside>/i);
  const answerHanzi = answerMatch ? countChineseChars(stripTagsAndCode(answerMatch[1])) : 0;

  const h2Count = (proseHtml.match(/<h2\b/gi) || []).length;
  const h3Count = (proseHtml.match(/<h3\b/gi) || []).length;
  const tableCount = (proseHtml.match(/<table\b/gi) || []).length;
  const proseLinks = [...proseHtml.matchAll(/href="(\/[^"]*)"/gi)].map((m) => m[1]);
  const faqCount = (html.match(/class="[^"]*\bfaq-idx\b[^"]*"/g) || []).length;
  const hasMdx = fs.existsSync(mdxPath);
  if (hasMdx) upgradedCount++;

  const editorialTotal = proseHanzi + faqHanzi + answerHanzi;
  totalProseHanzi += proseHanzi;
  totalEditorialHanzi += editorialTotal;

  results.push({
    route: `/${rel}/`,
    pillarId,
    slug,
    hasMdx,
    proseHanzi,
    editorialTotal,
    h2Count,
    h3Count,
    tableCount,
    proseLinkCount: proseLinks.length,
    uniqueProseLinks: new Set(proseLinks).size,
    faqCount,
  });
}

console.log(`=== 60 个二级专题升级审计报告 (已深度升级 MDX: ${upgradedCount}/60) ===`);
for (const r of results) {
  console.log(
    `${r.route.padEnd(36)} | MDX:${r.hasMdx ? 'YES' : 'NO '} | 正文:${String(r.proseHanzi).padStart(5)} (总编辑:${String(r.editorialTotal).padStart(5)}) | H2:${r.h2Count} H3:${r.h3Count} | 表:${r.tableCount} | 内链:${r.proseLinkCount}(唯一${r.uniqueProseLinks}) | FAQ:${r.faqCount}`
  );
}
console.log(`合计纯正文汉字: ${totalProseHanzi} | 合计含导读+FAQ总编辑汉字: ${totalEditorialHanzi}`);

if (process.argv.includes('--json')) {
  fs.writeFileSync(path.join(ROOT, 'reports', '.secondary-audit.json'), JSON.stringify({ upgradedCount, totalProseHanzi, totalEditorialHanzi, results }, null, 2));
}
