import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DIST = path.join(ROOT, 'dist');

const PILLARS = [
  { id: 'recommend', route: '/recommend/', name: '01 机场推荐' },
  { id: 'pricing', route: '/pricing/', name: '02 价格与套餐' },
  { id: 'brands', route: '/brands/', name: '03 机场品牌' },
  { id: 'vpn', route: '/vpn/', name: '04 VPN 与加速器' },
  { id: 'clients', route: '/clients/', name: '05 客户端软件' },
  { id: 'ai-media', route: '/ai-media/', name: '06 AI 与流媒体' },
  { id: 'routes', route: '/routes/', name: '07 线路与节点' },
  { id: 'guides', route: '/guides/', name: '08 使用教程' },
  { id: 'troubleshooting', route: '/troubleshooting/', name: '09 故障排查' },
  { id: 'risks', route: '/risks/', name: '10 风险与替代' },
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

function extractMainProse(html) {
  const match = html.match(/<article[^>]*class="[^"]*prose-article[^"]*"[^>]*>([\s\S]*?)<\/article>/i);
  return match ? match[1] : '';
}

function extractMdxBody(mdxPath) {
  if (!fs.existsSync(mdxPath)) return '';
  const raw = fs.readFileSync(mdxPath, 'utf8');
  const fmEnd = raw.indexOf('\n---', 3);
  const body = fmEnd !== -1 ? raw.slice(fmEnd + 4) : raw;
  return body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/[#>*|\-]/g, ' ');
}

const results = [];

for (const p of PILLARS) {
  const htmlPath = path.join(DIST, p.route.replace(/^\//, ''), 'index.html');
  const mdxPath = path.join(ROOT, 'src', 'content', 'pillars', `${p.id}.mdx`);

  if (!fs.existsSync(htmlPath)) {
    console.error(`ERROR: Missing built file ${htmlPath}`);
    process.exitCode = 1;
    continue;
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
  const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  const metaDesc = html.match(/<meta\s+name="description"\s+content="([^"]*)"/i);
  const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i);

  const proseHtml = extractMainProse(html);
  const proseText = stripTagsAndCode(proseHtml);
  const proseHanzi = countChineseChars(proseText);

  const faqSectionMatch = html.match(/<section[^>]*id="(?:pillar|brands)-faq"[^>]*>([\s\S]*?)<\/section>/i);
  const faqHanzi = faqSectionMatch ? countChineseChars(stripTagsAndCode(faqSectionMatch[1])) : 0;
  const answerMatch = html.match(/<aside[^>]*class="[^"]*answer-summary[^"]*"[^>]*>([\s\S]*?)<\/aside>/i);
  const answerHanzi = answerMatch ? countChineseChars(stripTagsAndCode(answerMatch[1])) : 0;

  const mdxHanzi = countChineseChars(extractMdxBody(mdxPath));
  const h2Count = (proseHtml.match(/<h2\b/gi) || []).length;
  const h3Count = (proseHtml.match(/<h3\b/gi) || []).length;
  const tableCount = (proseHtml.match(/<table\b/gi) || []).length;
  const internalLinks = [...html.matchAll(/href="(\/[^"#?]*\/?)"/gi)].map((m) => m[1]);
  const proseLinks = [...proseHtml.matchAll(/href="(\/[^"]*)"/gi)].map((m) => m[1]);

  const jsonLdTypes = [];
  for (const m of html.matchAll(/<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(m[1]);
      if (parsed['@type']) jsonLdTypes.push(parsed['@type']);
    } catch {
      jsonLdTypes.push('INVALID_JSON');
    }
  }

  const faqCount = (html.match(/class="[^"]*\bfaq-idx\b[^"]*"/g) || []).length;

  results.push({
    ...p,
    title: titleMatch ? titleMatch[1] : '',
    h1Count: h1Matches.length,
    hasMetaDesc: Boolean(metaDesc && metaDesc[1].length > 20),
    canonical: canonical ? canonical[1] : '',
    proseHanzi,
    editorialTotalHanzi: proseHanzi + faqHanzi + answerHanzi,
    mdxHanzi,
    h2Count,
    h3Count,
    tableCount,
    proseLinkCount: proseLinks.length,
    uniqueProseLinks: new Set(proseLinks).size,
    totalInternalLinks: new Set(internalLinks).size,
    faqCount,
    jsonLdTypes: jsonLdTypes.join(', '),
  });
}

console.log('=== 10 大一级专题深度与 SEO 审计报告 ===');
let totalProseHanzi = 0;
let totalEditorialHanzi = 0;
for (const r of results) {
  totalProseHanzi += r.proseHanzi;
  totalEditorialHanzi += r.editorialTotalHanzi;
  console.log(
    `${r.name} (${r.route}) | 正文汉字: ${r.proseHanzi} (含导读+FAQ总编辑汉字: ${r.editorialTotalHanzi}) | H2:${r.h2Count} H3:${r.h3Count} | 表格:${r.tableCount} | 正文内链:${r.proseLinkCount}(唯一${r.uniqueProseLinks}) | FAQ:${r.faqCount} | H1:${r.h1Count} | Schema:[${r.jsonLdTypes}]`
  );
}
console.log(`纯正文有效汉字总计: ${totalProseHanzi} | 含导读与结构化问答总计: ${totalEditorialHanzi}`);

if (process.argv.includes('--json')) {
  console.log(JSON.stringify({ totalProseHanzi, results }, null, 2));
}
