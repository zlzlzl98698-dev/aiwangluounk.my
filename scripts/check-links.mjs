#!/usr/bin/env node
/**
 * 构建后全站链接与推广合规检查脚本 (Pure Node ESM, Zero External Dependencies)
 *
 * 扫描 dist 目录下的全部 HTML 文件：
 * 1. 所有内部 href="/..." 指向实际存在的静态文件或目录 index.html（无死链）
 * 2. 所有外部 aff 推广链接具备 target="_blank" 与 rel="nofollow sponsored noopener"
 * 3. 外部 aff 推广链接周边（上下文窗口）存在佣金披露文本
 * 4. 全站无 [GitHub](GitHub) 等假下载链接或占位符 href
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();

function parseArgs(argv) {
  let distDir = path.join(ROOT, 'dist');
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--dist' && argv[i + 1]) {
      distDir = path.resolve(ROOT, argv[++i]);
    }
  }
  return { distDir };
}

function loadAffHostnames() {
  const linksPath = path.join(ROOT, 'src/data/links.ts');
  const hosts = new Set();
  if (!fs.existsSync(linksPath)) return hosts;
  const src = fs.readFileSync(linksPath, 'utf8');
  const matches = src.match(/https?:\/\/[^'"`\s/?#]+/gi) || [];
  for (const m of matches) {
    hosts.add(m.replace(/^https?:\/\//i, '').toLowerCase());
  }
  return hosts;
}

function walkHtmlFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'pagefind') continue;
      out.push(...walkHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      out.push(full);
    }
  }
  return out;
}

function parseAttributes(attrString) {
  const attrs = {};
  const attrRe = /([a-zA-Z_:.-]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  let m;
  while ((m = attrRe.exec(attrString)) !== null) {
    const key = m[1].toLowerCase();
    const val = m[2] ?? m[3] ?? m[4] ?? '';
    attrs[key] = val;
  }
  return attrs;
}

function resolveInternalTarget(distDir, href) {
  const clean = href.split('#')[0].split('?')[0];
  if (!clean || clean === '/') {
    return fs.existsSync(path.join(distDir, 'index.html'));
  }
  const rel = clean.replace(/^\/+/, '');
  const exactPath = path.join(distDir, rel);
  const indexInDir = path.join(distDir, rel, 'index.html');
  if (clean.endsWith('/')) {
    return fs.existsSync(indexInDir);
  }
  return (
    (fs.existsSync(exactPath) && fs.statSync(exactPath).isFile()) ||
    fs.existsSync(indexInDir)
  );
}

function isAffiliateHref(href, affHostnames) {
  if (!/^https?:\/\//i.test(href)) return false;
  const hostMatch = href.match(/^https?:\/\/([^/?#]+)/i);
  const host = hostMatch ? hostMatch[1].toLowerCase() : '';
  return (
    affHostnames.has(host) ||
    /aff\.(com|cc)\b/i.test(host) ||
    /[?#]\/?(?:register)?\?code=/i.test(href)
  );
}

function main() {
  const { distDir } = parseArgs(process.argv);
  if (!fs.existsSync(distDir)) {
    console.error(`错误: 未找到构建目录 ${distDir}，请先运行 npm run build`);
    process.exit(1);
  }

  const affHostnames = loadAffHostnames();
  const htmlFiles = walkHtmlFiles(distDir);
  if (htmlFiles.length === 0) {
    console.error(`错误: ${distDir} 中没有任何 HTML 文件`);
    process.exit(1);
  }

  const errors = [];
  let internalChecked = 0;
  let affChecked = 0;

  const anchorRe = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi;
  const fakeMarkdownLinkRe = /\[(?:GitHub|App Store|下载|Download)\]\((?:GitHub|github|App Store|下载|TODO|#)\)/i;
  const fakeHrefValues = new Set(['github', 'app store', 'download', '下载', 'todo', 'tbd', 'placeholder']);

  for (const file of htmlFiles) {
    const relFile = path.relative(distDir, file);
    const html = fs.readFileSync(file, 'utf8');

    // Check unrendered fake markdown links in text
    if (fakeMarkdownLinkRe.test(html)) {
      errors.push(`${relFile}: 检测到未渲染或假下载链接模式 ([GitHub](GitHub) 等)`);
    }

    anchorRe.lastIndex = 0;
    let m;
    while ((m = anchorRe.exec(html)) !== null) {
      const attrs = parseAttributes(m[1]);
      const innerText = m[2].replace(/<[^>]+>/g, '').trim();
      const href = (attrs.href || '').trim();

      if (!href) continue;

      // Fake / placeholder download href check
      const bareHref = href.replace(/^\//, '').toLowerCase();
      if (fakeHrefValues.has(bareHref) || (href === '#' && /github|下载|release|apk/i.test(innerText))) {
        errors.push(`${relFile}: 检测到假下载/占位链接 <a href="${href}">${innerText}</a>`);
        continue;
      }

      // Skip fragments / non-http schemes
      if (
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        href.startsWith('javascript:') ||
        href.startsWith('data:')
      ) {
        continue;
      }

      // 1. Internal links
      if (href.startsWith('/') && !href.startsWith('//')) {
        internalChecked++;
        if (!resolveInternalTarget(distDir, href)) {
          errors.push(`${relFile}: 内部死链 href="${href}"`);
        }
        continue;
      }

      // 2. External affiliate links
      if (isAffiliateHref(href, affHostnames)) {
        affChecked++;
        if (attrs.target !== '_blank') {
          errors.push(`${relFile}: 推广链接缺少 target="_blank" (${href})`);
        }
        const relTokens = new Set(
          (attrs.rel || '')
            .toLowerCase()
            .split(/\s+/)
            .filter(Boolean)
        );
        for (const reqToken of ['nofollow', 'sponsored', 'noopener']) {
          if (!relTokens.has(reqToken)) {
            errors.push(`${relFile}: 推广链接 rel 缺少 "${reqToken}" (${href})`);
          }
        }

        // Check nearby disclosure text (window around link)
        const winStart = Math.max(0, m.index - 1200);
        const winEnd = Math.min(html.length, m.index + m[0].length + 1200);
        const windowText = html.slice(winStart, winEnd).replace(/<[^>]+>/g, ' ');
        if (!/(含推广链接|商业关系披露|佣金|推广关系)/.test(windowText)) {
          errors.push(`${relFile}: 推广链接周边未检测到佣金披露文本 (${href})`);
        }
      }
    }
  }

  console.log('=== Check Links Report ===');
  console.log(`HTML files scanned     : ${htmlFiles.length}`);
  console.log(`Internal links checked : ${internalChecked}`);
  console.log(`Affiliate links checked: ${affChecked}`);
  console.log(`Errors                 : ${errors.length}`);

  for (const e of errors) console.error(`  ERR: ${e}`);

  if (errors.length > 0) {
    process.exit(1);
  }
  console.log('PASS: 全站内部链接无死链、外部推广链接属性与披露合规、无假下载链接。');
}

main();
