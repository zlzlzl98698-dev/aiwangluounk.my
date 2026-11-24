#!/usr/bin/env node
/**
 * 品牌数据与推广链接治理校验脚本 (Pure Node ESM, Zero External Dependencies)
 *
 * 校验内容：
 * 1. 解析 src/data/brandsPart1.ts、src/data/brandsPart2.ts、src/data/links.ts
 * 2. 校验共 31 个唯一品牌、id/slug 无重复、affiliateSlug 与 links.ts 1-to-1 对应
 * 3. 校验 Firefly 与 Firefly 萤火虫已合并为唯一实体 slug="firefly"，无第二条 Firefly 记录
 * 4. 校验 links.ts 包含 AFFILIATE_DISCLOSURE 与 AFFILIATE_REL='nofollow sponsored noopener' 常量，且每条记录均应用
 * 5. 校验无硬编码 aff URL 散落于 src/content 下的 .mdx 文件（若目录存在）
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function loadTsModule(relPath, exportNames) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`缺少必需源文件: ${relPath}`);
  }
  let code = fs.readFileSync(fullPath, 'utf8');
  code = code.replace(/^import\s+type\s+[\s\S]*?;\s*/gm, '');
  code = code.replace(/^import\s+[\s\S]*?;\s*/gm, '');
  code = code.replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\n\}\s*/g, '');
  code = code.replace(/export\s+type\s+[\s\S]*?;\s*/g, '');
  code = code.replace(/export\s+function\s+[\s\S]*$/g, '');
  code = code.replace(/export\s+const\s+(\w+)\s*(?::\s*[^=]+)?=/g, 'const $1 =');
  code = code.replace(/('[^']*'|"[^"]*")\s+as\s+const;/g, '$1;');
  code = code.replace(/\}\s*as\s+const;/g, '};');
  const fn = new Function(`${code}\nreturn { ${exportNames.join(', ')} };`);
  return fn();
}

function walkFiles(dir, extFilter) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(full, extFilter));
    } else if (!extFilter || extFilter.some((ext) => entry.name.endsWith(ext))) {
      results.push(full);
    }
  }
  return results;
}

function main() {
  const errors = [];
  const warnings = [];

  const { brandsPart1 } = loadTsModule('src/data/brandsPart1.ts', ['brandsPart1']);
  const { brandsPart2 } = loadTsModule('src/data/brandsPart2.ts', ['brandsPart2']);
  const {
    AFFILIATE_DISCLOSURE,
    AFFILIATE_REL,
    affiliateLinks,
  } = loadTsModule('src/data/links.ts', [
    'AFFILIATE_DISCLOSURE',
    'AFFILIATE_REL',
    'affiliateLinks',
  ]);

  const allBrands = [...brandsPart1, ...brandsPart2];

  // 1. Total count === 31
  if (allBrands.length !== 31) {
    errors.push(`品牌总数应为 31，实际为 ${allBrands.length}`);
  }

  // 2. Unique slugs and IDs
  const seenSlugs = new Set();
  const seenIds = new Set();
  for (const b of allBrands) {
    if (!b.slug || typeof b.slug !== 'string') {
      errors.push(`发现空或非法 slug: ${JSON.stringify(b.name)}`);
      continue;
    }
    if (seenSlugs.has(b.slug)) {
      errors.push(`发现重复品牌 slug: ${b.slug}`);
    }
    seenSlugs.add(b.slug);

    if (seenIds.has(b.id)) {
      errors.push(`发现重复品牌 id: ${b.id}`);
    }
    seenIds.add(b.id);

    if (b.affiliateSlug !== b.slug) {
      errors.push(`品牌 ${b.slug} 的 affiliateSlug (${b.affiliateSlug}) 与 slug 不一致`);
    }
    if (!affiliateLinks[b.affiliateSlug]) {
      errors.push(`links.ts 缺少品牌 ${b.slug} 的推广链接记录`);
    }
  }

  // 3. Firefly merged check
  const fireflyEntries = allBrands.filter(
    (b) =>
      b.slug.includes('firefly') ||
      b.name.toLowerCase().includes('firefly') ||
      b.name.includes('萤火虫')
  );
  if (fireflyEntries.length !== 1 || fireflyEntries[0].slug !== 'firefly') {
    errors.push(
      `Firefly 合并校验失败：期望 1 条 slug="firefly" 记录，实际匹配 ${fireflyEntries.length} 条`
    );
  } else {
    const ffLink = affiliateLinks.firefly;
    if (!ffLink?.alternateUrls || ffLink.alternateUrls.length === 0) {
      errors.push('links.ts 中 firefly 缺少合并后的备选 code 记录 (alternateUrls)');
    }
  }

  // 4. links.ts constants & record governance
  if (
    typeof AFFILIATE_DISCLOSURE !== 'string' ||
    !AFFILIATE_DISCLOSURE.includes('推广链接') ||
    !AFFILIATE_DISCLOSURE.includes('佣金')
  ) {
    errors.push('links.ts 中 AFFILIATE_DISCLOSURE 常量缺失或不合规');
  }
  if (AFFILIATE_REL !== 'nofollow sponsored noopener') {
    errors.push(`links.ts 中 AFFILIATE_REL 应为 "nofollow sponsored noopener"，实际为 "${AFFILIATE_REL}"`);
  }

  const linkSlugs = Object.keys(affiliateLinks);
  if (linkSlugs.length !== 31) {
    errors.push(`links.ts 中 affiliateLinks 数量应为 31，实际为 ${linkSlugs.length}`);
  }

  const affHostnames = new Set();
  const affUrls = new Set();

  for (const [key, rec] of Object.entries(affiliateLinks)) {
    if (rec.slug !== key) {
      errors.push(`links.ts 条目 "${key}" 的 slug 字段 (${rec.slug}) 不一致`);
    }
    if (!seenSlugs.has(key)) {
      errors.push(`links.ts 存在未知品牌键 "${key}"`);
    }
    if (!rec.affiliateUrl || !rec.affiliateUrl.startsWith('https://')) {
      errors.push(`links.ts[${key}] affiliateUrl 非 https 链接: ${rec.affiliateUrl}`);
    } else {
      affUrls.add(rec.affiliateUrl);
      try {
        affHostnames.add(new URL(rec.affiliateUrl).hostname.toLowerCase());
      } catch {
        // format_anomaly_unverified URLs like liulianyunaff.com#/?code=... may still parse in Node URL,
        // fallback extract hostname cleanly
        const m = rec.affiliateUrl.match(/^https?:\/\/([^/?#]+)/i);
        if (m) affHostnames.add(m[1].toLowerCase());
      }
    }
    if (rec.target !== '_blank') {
      errors.push(`links.ts[${key}] target 必须为 "_blank"`);
    }
    if (rec.rel !== 'nofollow sponsored noopener') {
      errors.push(`links.ts[${key}] rel 必须为 "nofollow sponsored noopener"`);
    }
    if (rec.disclosureText !== AFFILIATE_DISCLOSURE) {
      errors.push(`links.ts[${key}] disclosureText 未使用统一常量 AFFILIATE_DISCLOSURE`);
    }
  }

  for (const anomalySlug of ['yunjiexian', 'liulianyun', 'huanqiuti']) {
    if (affiliateLinks[anomalySlug]?.linkStatus !== 'format_anomaly_unverified') {
      errors.push(`links.ts[${anomalySlug}] 必须标记为 format_anomaly_unverified`);
    }
  }

  // 5. Scan src/content/**/*.mdx for hardcoded affiliate URLs
  const contentDir = path.join(ROOT, 'src/content');
  const mdxFiles = walkFiles(contentDir, ['.mdx', '.md']);
  const urlRegex = /https?:\/\/[^\s"'`)<>]+/gi;

  for (const file of mdxFiles) {
    const rel = path.relative(ROOT, file);
    const content = fs.readFileSync(file, 'utf8');
    const urls = content.match(urlRegex) || [];
    for (const u of urls) {
      const lower = u.toLowerCase();
      let host = '';
      const m = lower.match(/^https?:\/\/([^/?#]+)/);
      if (m) host = m[1];
      if (
        affUrls.has(u) ||
        affHostnames.has(host) ||
        /aff\.(com|cc)\b/.test(host) ||
        /[?#]\/?(?:register)?\?code=/i.test(u)
      ) {
        errors.push(`检测到硬编码推广链接散落于 ${rel}: ${u}（应统一通过 links.ts / AffiliateCTA 管理）`);
      }
    }
  }

  if (mdxFiles.length === 0) {
    warnings.push('src/content 下暂未发现 .mdx/.md 文件（跳过 0 个文件扫描）');
  }

  console.log('=== Validate Brands & Links Report ===');
  console.log(`Unique brands      : ${allBrands.length} (Part1: ${brandsPart1.length}, Part2: ${brandsPart2.length})`);
  console.log(`Affiliate links    : ${linkSlugs.length}`);
  console.log(`MDX files scanned  : ${mdxFiles.length}`);
  console.log(`Warnings           : ${warnings.length}`);
  console.log(`Errors             : ${errors.length}`);

  for (const w of warnings) console.log(`  WARN: ${w}`);
  for (const e of errors) console.error(`  ERR: ${e}`);

  if (errors.length > 0) {
    process.exit(1);
  }
  console.log('PASS: 31 个唯一品牌、Firefly 合并、links.ts 统一治理与 MDX 无散落 aff URL 校验全部通过。');
}

main();
