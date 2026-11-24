#!/usr/bin/env node
/**
 * 构建后 SEO 与结构化数据审计脚本 (Pure Node ESM, Zero External Dependencies)
 *
 * 扫描 dist 目录下的全部 HTML 文件（排除 /pagefind 与 /404.html）：
 * 1. 统计生成页面总数
 * 2. 校验每页存在唯一非空 <title>
 * 3. 校验每页存在唯一非空 <h1>
 * 4. 校验每页存在唯一非空 <meta name="description">
 * 5. 校验每页存在唯一非空 <link rel="canonical">
 * 6. 校验页面中所有 <script type="application/ld+json"> 为合法可解析 JSON-LD（核心页面须至少包含 1 个）
 * 7. 校验 dist/sitemap-index.xml、dist/robots.txt 及 dist/pagefind/ 索引文件存在性
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

const STATIC_INFO_SLUGS = new Set([
  '/about/',
  '/changelog/',
  '/contact/',
  '/disclosure/',
  '/editorial-policy/',
  '/fact-checking/',
  '/privacy/',
  '/sitemap/',
]);

function parseArgs(argv) {
  let distDir = path.join(ROOT, 'dist');
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--dist' && argv[i + 1]) {
      distDir = path.resolve(ROOT, argv[++i]);
    }
  }
  return { distDir };
}

function walkHtmlFiles(dir, distDir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'pagefind') continue;
      out.push(...walkHtmlFiles(full, distDir));
    } else if (entry.name.endsWith('.html')) {
      const rel = path.relative(distDir, full).replace(/\\/g, '/');
      if (rel === '404.html' || rel.startsWith('pagefind/') || rel.startsWith('go/')) continue;
      out.push(full);
    }
  }
  return out;
}

function toRouteFromDist(file, distDir) {
  const rel = path.relative(distDir, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return `/${rel.slice(0, -'index.html'.length)}`;
  return `/${rel}`;
}

function main() {
  const { distDir } = parseArgs(process.argv);
  if (!fs.existsSync(distDir)) {
    console.error(`错误: 未找到构建目录 ${distDir}，请先运行 npm run build`);
    process.exit(1);
  }

  const errors = [];
  const warnings = [];

  // Global build artifacts check
  const sitemapIndexPath = path.join(distDir, 'sitemap-index.xml');
  const robotsPath = path.join(distDir, 'robots.txt');
  const pagefindDir = path.join(distDir, 'pagefind');

  if (!fs.existsSync(sitemapIndexPath)) {
    errors.push('缺少 dist/sitemap-index.xml');
  }
  if (!fs.existsSync(robotsPath)) {
    errors.push('缺少 dist/robots.txt');
  }
  if (!fs.existsSync(pagefindDir) || !fs.statSync(pagefindDir).isDirectory()) {
    errors.push('缺少 dist/pagefind/ 搜索索引目录（请运行 npx pagefind --site dist）');
  } else {
    const pfFiles = fs.readdirSync(pagefindDir);
    const hasPfIndex = pfFiles.some((f) => f === 'pagefind.js' || f === 'pagefind-entry.json');
    if (!hasPfIndex) {
      errors.push('dist/pagefind/ 目录内缺少 pagefind.js / pagefind-entry.json 索引核心文件');
    }
  }

  const htmlFiles = walkHtmlFiles(distDir, distDir);
  if (htmlFiles.length === 0) {
    errors.push('dist/ 下未找到任何可审计的 HTML 页面');
  }

  let jsonLdTotal = 0;

  for (const file of htmlFiles) {
    const route = toRouteFromDist(file, distDir);
    const html = fs.readFileSync(file, 'utf8');

    // 1. Unique non-empty <title>
    const titles = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];
    if (titles.length !== 1 || !titles[0][1].trim()) {
      errors.push(`${route}: <title> 数量=${titles.length}（要求唯一且非空）`);
    }

    // 2. Unique non-empty <h1>
    const h1s = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)];
    const h1Text = h1s[0]?.[1]?.replace(/<[^>]+>/g, '').trim() ?? '';
    if (h1s.length !== 1 || !h1Text) {
      errors.push(`${route}: <h1> 数量=${h1s.length}（要求唯一且非空）`);
    }

    // 3. Unique non-empty <meta name="description">
    const descs = [
      ...html.matchAll(
        /<meta\b[^>]*name\s*=\s*["']description["'][^>]*content\s*=\s*["']([^"']*)["'][^>]*>|<meta\b[^>]*content\s*=\s*["']([^"']*)["'][^>]*name\s*=\s*["']description["'][^>]*>/gi
      ),
    ];
    const descVal = (descs[0]?.[1] ?? descs[0]?.[2] ?? '').trim();
    if (descs.length !== 1 || !descVal) {
      errors.push(`${route}: <meta name="description"> 数量=${descs.length}（要求唯一且非空）`);
    }

    // 4. Unique non-empty <link rel="canonical">
    const canonicals = [
      ...html.matchAll(
        /<link\b[^>]*rel\s*=\s*["']canonical["'][^>]*href\s*=\s*["']([^"']*)["'][^>]*>|<link\b[^>]*href\s*=\s*["']([^"']*)["'][^>]*rel\s*=\s*["']canonical["'][^>]*>/gi
      ),
    ];
    const canonVal = (canonicals[0]?.[1] ?? canonicals[0]?.[2] ?? '').trim();
    if (canonicals.length !== 1 || !/^https?:\/\//i.test(canonVal)) {
      errors.push(`${route}: <link rel="canonical"> 数量=${canonicals.length} 或地址无效 (${canonVal})`);
    }

    // 5. Valid parseable JSON-LD
    const ldScripts = [
      ...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi),
    ];
    if (ldScripts.length === 0) {
      if (STATIC_INFO_SLUGS.has(route)) {
        warnings.push(`${route}: 静态治理页未附带 JSON-LD（建议后续补充 BreadcrumbList）`);
      } else {
        errors.push(`${route}: 缺少 <script type="application/ld+json"> 结构化数据`);
      }
    }
    for (const s of ldScripts) {
      jsonLdTotal++;
      try {
        const parsed = JSON.parse(s[1].trim());
        if (!parsed || !parsed['@context'] || !parsed['@type']) {
          errors.push(`${route}: JSON-LD 缺少 @context 或 @type`);
        }
      } catch (err) {
        errors.push(`${route}: JSON-LD 解析失败 (${err.message})`);
      }
    }
  }

  const sitemapPath = path.join(distDir, 'sitemap.xml');
  const faviconIcoPath = path.join(distDir, 'favicon.ico');

  console.log('=== Audit SEO Report ===');
  console.log(`Audited HTML pages : ${htmlFiles.length} (excluding /pagefind & /404.html)`);
  console.log(`JSON-LD scripts    : ${jsonLdTotal}`);
  console.log(`sitemap-index.xml  : ${fs.existsSync(sitemapIndexPath) ? 'OK' : 'MISSING'}`);
  console.log(`sitemap.xml        : ${fs.existsSync(sitemapPath) ? 'OK' : 'MISSING'}`);
  console.log(`robots.txt         : ${fs.existsSync(robotsPath) ? 'OK' : 'MISSING'}`);
  console.log(`favicon.ico        : ${fs.existsSync(faviconIcoPath) ? 'OK' : 'MISSING'}`);
  console.log(`pagefind/ index    : ${fs.existsSync(pagefindDir) ? 'OK' : 'MISSING'}`);
  console.log(`Warnings           : ${warnings.length}`);
  console.log(`Errors             : ${errors.length}`);

  for (const w of warnings) console.log(`  WARN: ${w}`);
  for (const e of errors) console.error(`  ERR: ${e}`);

  if (errors.length > 0) {
    process.exit(1);
  }
  console.log('PASS: 全站 SEO 标签、JSON-LD 结构化数据、Sitemap、Robots 与 Pagefind 索引检查全部通过。');
}

main();
