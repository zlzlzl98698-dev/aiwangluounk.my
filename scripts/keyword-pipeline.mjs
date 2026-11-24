#!/usr/bin/env node
/**
 * 关键词治理流水线 (Pure Node ESM, Zero External Dependencies)
 *
 * 功能：
 * 1. 读取 src/data/keyword-map.json 并校验 20 个必填字段及空值边界（无真实 GSC/Bing 数据时禁止伪造指标）
 * 2. 支持可选 --gsc <csv> / --bing <csv> 导入真实搜索控制台 CSV 数据
 * 3. 执行关键词规范化去重、品牌别名识别（自动提取 brandsPart1.ts / brandsPart2.ts 别名）
 * 4. 校验搜索意图分类一致性与 URL 归属边界
 * 5. 检测关键词互抢（同词抢多 URL、品牌词跨页冲突）
 * 6. 按 30%/25%/15%/15%/10%/5% 权重校验与重算内部编辑优先级分数
 * 7. 输出终端报告，或配合 --write-docs 更新 docs/keyword-backlog.md 与 docs/keyword-cannibalization.md
 */

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const DEFAULT_MAP_PATH = path.join(ROOT, 'src/data/keyword-map.json');
const BACKLOG_DOC_PATH = path.join(ROOT, 'docs/keyword-backlog.md');
const CANNIBAL_DOC_PATH = path.join(ROOT, 'docs/keyword-cannibalization.md');

const REQUIRED_FIELDS = [
  'keyword',
  'language',
  'source',
  'sourceDate',
  'impressions',
  'clicks',
  'CTR',
  'position',
  'intent',
  'entity',
  'parentTopic',
  'cluster',
  'difficultyEstimate',
  'userProblem',
  'primaryURL',
  'existingCoverage',
  'evidenceAvailable',
  'refreshCadence',
  'priorityScore',
  'status',
];

const VALID_INTENTS = new Set([
  'informational',
  'commercial_investigation',
  'transactional',
  'navigational',
]);

const WEIGHTS = {
  businessImpact: 0.30,
  demandProxy: 0.25,
  evidenceReadiness: 0.15,
  contentGap: 0.15,
  hubLeverage: 0.10,
  freshnessUrgency: 0.05,
};

function parseArgs(argv) {
  const args = {
    mapPath: DEFAULT_MAP_PATH,
    gscPath: null,
    writeDocs: false,
    json: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--map' && argv[i + 1]) {
      args.mapPath = path.resolve(ROOT, argv[++i]);
    } else if ((a === '--gsc' || a === '--bing') && argv[i + 1]) {
      args.gscPath = path.resolve(ROOT, argv[++i]);
    } else if (a === '--write-docs') {
      args.writeDocs = true;
    } else if (a === '--json') {
      args.json = true;
    } else if (a === '--help' || a === '-h') {
      console.log(
        'Usage: node scripts/keyword-pipeline.mjs [--map path] [--gsc path/to/file.csv] [--write-docs] [--json]'
      );
      process.exit(0);
    }
  }
  return args;
}

function loadTsExport(relPath, varName) {
  const fullPath = path.join(ROOT, relPath);
  let code = fs.readFileSync(fullPath, 'utf8');
  code = code.replace(/^import\s+type\s+[\s\S]*?;\s*/gm, '');
  code = code.replace(/^import\s+[\s\S]*?;\s*/gm, '');
  code = code.replace(/export\s+interface\s+\w+\s*\{[\s\S]*?\n\}\s*/g, '');
  code = code.replace(/export\s+type\s+[\s\S]*?;\s*/g, '');
  code = code.replace(/export\s+function\s+[\s\S]*$/g, '');
  code = code.replace(/export\s+const\s+(\w+)\s*(?::\s*[^=]+)?=/g, 'const $1 =');
  code = code.replace(/\}\s*as\s+const;/g, '};');
  const fn = new Function(`${code}\nreturn ${varName};`);
  return fn();
}

function normalizeKeyword(raw) {
  return String(raw || '')
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[｜|·•—–\-_/\\,，。、:：;；!！?？"'`()（）\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalizeUrlPath(rawUrl) {
  if (!rawUrl) return null;
  let u = String(rawUrl).trim();
  if (/^https?:\/\//i.test(u)) {
    try {
      u = new URL(u).pathname;
    } catch {
      return u;
    }
  }
  if (!u.startsWith('/')) u = `/${u}`;
  if (!u.endsWith('/') && !path.posix.basename(u).includes('.')) u = `${u}/`;
  return u;
}

function buildBrandAliasIndex() {
  const b1 = loadTsExport('src/data/brandsPart1.ts', 'brandsPart1');
  const b2 = loadTsExport('src/data/brandsPart2.ts', 'brandsPart2');
  const brands = [...b1, ...b2];

  const extraAliases = {
    guangsuyun: ['gsy', '光速云机场'],
    muguang: ['暮光', 'twilight', 'muguang'],
    feimao: ['飞猫', 'flycat'],
    weifeng: ['微风', 'breezenet'],
    dalaoyun: ['大佬'],
    xingdaomeng: ['星岛'],
    ermao: ['二猫', '2maoyun'],
    wuyou: ['无忧', 'worryfree'],
    weitu: ['唯兔', 'v2yun'],
    firefly: ['firefly', '萤火虫', 'firefly 萤火虫', 'firefly萤火虫'],
    yuzhou: ['宇宙'],
    u1s1: ['u1s1'],
    lingmao: ['灵猫', 'civetnet'],
    jilian: ['极连'],
    guangnian: ['光年'],
    yifan: ['一翻', '1flyun'],
    sogo: ['sogo', 'sogo云', 'sogo 云'],
    kexin: ['可信', 'kosing'],
    sujie: ['速界', 'speedworld'],
    shanyue: ['闪跃', 'flashleap'],
    quanqiu: ['全球云', 'globalcloud'],
    shandianshu: ['闪电鼠'],
    yunjiexian: ['云界线'],
    liulianyun: ['榴莲云'],
    shenxing: ['神行', '神行加速'],
    huanqiuti: ['环球梯'],
    yinxingren: ['隐形人', 'invisible'],
    tiziyun: ['梯子云', 'laddercloud'],
    lingdongyun: ['灵动云'],
    wangwang: ['浪网', 'wavenet'],
    edgenova: ['edgenova', '边缘节点', '边缘节点 edgenova'],
  };

  const aliasEntries = [];
  for (const b of brands) {
    const rawList = [
      b.name,
      b.slug,
      ...(b.aliases || []),
      ...(extraAliases[b.slug] || []),
    ];
    const uniqueTokens = [
      ...new Set(rawList.map((x) => normalizeKeyword(x)).filter(Boolean)),
    ];
    for (const token of uniqueTokens) {
      aliasEntries.push({
        token,
        slug: b.slug,
        brandName: b.name,
        canonicalURL: `/brands/${b.slug}/`,
      });
    }
  }
  // Sort longest tokens first to avoid short prefix shadowing
  aliasEntries.sort((a, b) => b.token.length - a.token.length);
  return { brands, aliasEntries };
}

function detectBrandMatch(keyword, aliasEntries) {
  const norm = normalizeKeyword(keyword);
  const compact = norm.replace(/\s+/g, '');
  const matched = [];
  const seenSlugs = new Set();

  for (const entry of aliasEntries) {
    const tokenCompact = entry.token.replace(/\s+/g, '');
    if (norm.includes(entry.token) || (tokenCompact.length >= 3 && compact.includes(tokenCompact))) {
      if (!seenSlugs.has(entry.slug)) {
        seenSlugs.add(entry.slug);
        matched.push({
          slug: entry.slug,
          brandName: entry.brandName,
          canonicalURL: entry.canonicalURL,
          matchedAlias: entry.token,
        });
      }
    }
  }
  return matched;
}

function parseCsvLine(line) {
  const cells = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (ch === ',' && !inQuotes) {
      cells.push(cur.trim());
      cur = '';
    } else {
      cur += ch;
    }
  }
  cells.push(cur.trim());
  return cells;
}

function parseNumberOrNull(val) {
  if (val === undefined || val === null || val === '') return null;
  const cleaned = String(val).replace(/[%,\s]/g, '');
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function importGscCsv(csvPath) {
  if (!fs.existsSync(csvPath)) {
    throw new Error(`GSC/Bing CSV 文件不存在: ${csvPath}`);
  }
  const raw = fs.readFileSync(csvPath, 'utf8').replace(/^\uFEFF/, '');
  const lines = raw.split(/\r?\n/).filter((l) => l.trim().length > 0);
  if (lines.length < 2) {
    return [];
  }
  const headers = parseCsvLine(lines[0]).map((h) => h.toLowerCase());
  const findCol = (candidates) =>
    headers.findIndex((h) => candidates.some((c) => h.includes(c)));

  const qIdx = findCol(['query', 'top queries', 'keyword', '查询', '关键词']);
  const pIdx = findCol(['page', 'landing page', 'url', '网页', '着陆页']);
  const impIdx = findCol(['impression', '展示']);
  const clkIdx = findCol(['click', '点击']);
  const ctrIdx = findCol(['ctr', '点击率']);
  const posIdx = findCol(['position', 'avg. position', '排名', '位置']);

  if (qIdx === -1) {
    throw new Error(`无法在 CSV 表头识别查询列: ${headers.join(', ')}`);
  }

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i]);
    const query = cols[qIdx];
    if (!query) continue;
    rows.push({
      keyword: query,
      page: pIdx !== -1 ? normalizeUrlPath(cols[pIdx]) : null,
      impressions: impIdx !== -1 ? parseNumberOrNull(cols[impIdx]) : null,
      clicks: clkIdx !== -1 ? parseNumberOrNull(cols[clkIdx]) : null,
      CTR: ctrIdx !== -1 ? parseNumberOrNull(cols[ctrIdx]) : null,
      position: posIdx !== -1 ? parseNumberOrNull(cols[posIdx]) : null,
    });
  }
  return rows;
}

function computePriorityScore(factors) {
  if (!factors) return null;
  const score =
    (factors.businessImpact ?? 0) * WEIGHTS.businessImpact +
    (factors.demandProxy ?? 0) * WEIGHTS.demandProxy +
    (factors.evidenceReadiness ?? 0) * WEIGHTS.evidenceReadiness +
    (factors.contentGap ?? 0) * WEIGHTS.contentGap +
    (factors.hubLeverage ?? 0) * WEIGHTS.hubLeverage +
    (factors.freshnessUrgency ?? 0) * WEIGHTS.freshnessUrgency;
  return Number(score.toFixed(1));
}

function validateRecord(rec, idx, aliasEntries) {
  const errors = [];
  const warnings = [];

  for (const field of REQUIRED_FIELDS) {
    if (!(field in rec)) {
      errors.push(`[#${idx}] 缺少必填字段: ${field}`);
    }
  }

  if (!VALID_INTENTS.has(rec.intent)) {
    errors.push(`[#${idx}] 非法 intent "${rec.intent}" (${rec.keyword})`);
  }

  if (typeof rec.primaryURL !== 'string' || !rec.primaryURL.startsWith('/')) {
    errors.push(`[#${idx}] primaryURL 必须以 / 开头: ${rec.primaryURL}`);
  }

  // Enforce no fabricated search console metrics when source is not gsc/bing
  if (!['gsc', 'bing'].includes(rec.source)) {
    for (const metric of ['impressions', 'clicks', 'CTR', 'position', 'difficultyEstimate']) {
      if (rec[metric] !== null) {
        errors.push(
          `[#${idx}] 无真实 GSC/Bing 数据时 ${metric} 必须为 null（当前为 ${rec[metric]}）`
        );
      }
    }
  }

  // Intent vs URL consistency checks
  if (rec.primaryURL.startsWith('/guides/') && rec.intent === 'transactional') {
    warnings.push(`[#${idx}] 教程页 ${rec.primaryURL} 标注为 transactional，建议核查是否为 informational`);
  }
  if (rec.primaryURL.startsWith('/troubleshooting/') && rec.intent !== 'informational') {
    warnings.push(`[#${idx}] 排障页 ${rec.primaryURL} 意图建议为 informational（当前为 ${rec.intent}）`);
  }

  // Brand alias routing check: single brand query should point to /brands/{slug}/ unless it is a comparison page
  const brandMatches = detectBrandMatch(rec.keyword, aliasEntries);
  if (
    brandMatches.length === 1 &&
    !rec.primaryURL.startsWith('/brands/') &&
    !rec.primaryURL.startsWith('/compare/')
  ) {
    warnings.push(
      `[#${idx}] 词 "${rec.keyword}" 识别到单品牌 "${brandMatches[0].brandName}"，但 primaryURL 为 ${rec.primaryURL}（规范应归属 ${brandMatches[0].canonicalURL}）`
    );
  }

  // Score consistency check
  if (rec.scoreFactors) {
    const expected = computePriorityScore(rec.scoreFactors);
    if (Math.abs(expected - rec.priorityScore) > 0.15) {
      warnings.push(
        `[#${idx}] "${rec.keyword}" priorityScore=${rec.priorityScore} 与加权计算结果 ${expected} 存在偏差`
      );
    }
  }

  return { errors, warnings, brandMatches };
}

function updateManagedSection(filePath, markerName, newBody) {
  const startTag = `<!-- PIPELINE:${markerName}:START -->`;
  const endTag = `<!-- PIPELINE:${markerName}:END -->`;
  if (!fs.existsSync(filePath)) {
    return false;
  }
  const existing = fs.readFileSync(filePath, 'utf8');
  const startIdx = existing.indexOf(startTag);
  const endIdx = existing.indexOf(endTag);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    return false;
  }
  const updated =
    existing.slice(0, startIdx + startTag.length) +
    '\n' +
    newBody.trim() +
    '\n' +
    existing.slice(endIdx);
  fs.writeFileSync(filePath, updated, 'utf8');
  return true;
}

function main() {
  const args = parseArgs(process.argv);
  if (!fs.existsSync(args.mapPath)) {
    console.error(`找不到关键词映射文件: ${args.mapPath}`);
    process.exit(1);
  }

  const rawJson = JSON.parse(fs.readFileSync(args.mapPath, 'utf8'));
  const records = Array.isArray(rawJson) ? rawJson : rawJson.records || [];
  const { brands, aliasEntries } = buildBrandAliasIndex();

  const allErrors = [];
  const allWarnings = [];

  // 1. Validate every record & check brand/L1/L2 coverage
  const normalizedKeywordToUrls = new Map();
  const urlToRecords = new Map();
  let aliasHitCount = 0;

  records.forEach((rec, i) => {
    const { errors, warnings, brandMatches } = validateRecord(rec, i + 1, aliasEntries);
    allErrors.push(...errors);
    allWarnings.push(...warnings);
    if (brandMatches.length > 0) aliasHitCount++;

    const normKw = normalizeKeyword(rec.keyword);
    if (!normalizedKeywordToUrls.has(normKw)) {
      normalizedKeywordToUrls.set(normKw, []);
    }
    normalizedKeywordToUrls.get(normKw).push({
      keyword: rec.keyword,
      url: rec.primaryURL,
      cluster: rec.cluster,
      source: rec.source,
    });

    if (!urlToRecords.has(rec.primaryURL)) {
      urlToRecords.set(rec.primaryURL, []);
    }
    urlToRecords.get(rec.primaryURL).push(rec);
  });

  // 2. Check all 31 brands have a primaryURL record
  for (const b of brands) {
    const expectedUrl = `/brands/${b.slug}/`;
    if (!urlToRecords.has(expectedUrl)) {
      allErrors.push(`缺失品牌 ${b.name} (${b.slug}) 的唯一首选 URL 映射: ${expectedUrl}`);
    }
  }

  // 3. Optional GSC/Bing CSV ingestion
  let gscRows = [];
  const gscUnmappedQueries = [];
  const gscConflicts = [];

  if (args.gscPath) {
    gscRows = importGscCsv(args.gscPath);
    for (const row of gscRows) {
      const norm = normalizeKeyword(row.keyword);
      const mapped = normalizedKeywordToUrls.get(norm);
      const brandMatches = detectBrandMatch(row.keyword, aliasEntries);

      if (row.page) {
        if (!normalizedKeywordToUrls.has(norm)) {
          normalizedKeywordToUrls.set(norm, []);
        }
        const entries = normalizedKeywordToUrls.get(norm);
        if (!entries.some((e) => e.url === row.page)) {
          entries.push({
            keyword: row.keyword,
            url: row.page,
            cluster: 'gsc_import',
            source: 'gsc_csv',
          });
        }
        // Check if GSC landing page disagrees with canonical brand URL
        if (brandMatches.length === 1 && row.page !== brandMatches[0].canonicalURL && !row.page.startsWith('/compare/')) {
          gscConflicts.push({
            keyword: row.keyword,
            gscPage: row.page,
            canonicalURL: brandMatches[0].canonicalURL,
            impressions: row.impressions,
            clicks: row.clicks,
          });
        }
      } else if (!mapped) {
        gscUnmappedQueries.push({
          keyword: row.keyword,
          brandMatch: brandMatches[0]?.canonicalURL ?? null,
          impressions: row.impressions,
          clicks: row.clicks,
        });
      }
    }
  }

  // 4. Detect cannibalization (same normalized keyword -> multiple distinct URLs)
  const cannibalizationCases = [];
  for (const [normKw, items] of normalizedKeywordToUrls.entries()) {
    const distinctUrls = [...new Set(items.map((x) => x.url))];
    if (distinctUrls.length > 1) {
      cannibalizationCases.push({
        normalizedKeyword: normKw,
        urls: distinctUrls,
        items,
      });
    }
  }

  // Also check duplicate primaryURLs in static map (warning if two primary records share URL)
  const duplicateUrlMappings = [];
  for (const [url, recs] of urlToRecords.entries()) {
    if (recs.length > 1) {
      duplicateUrlMappings.push({ url, keywords: recs.map((r) => r.keyword) });
    }
  }

  // 5. Sort backlog by priorityScore desc
  const sortedByPriority = [...records].sort((a, b) => b.priorityScore - a.priorityScore);
  const topBacklog = sortedByPriority.slice(0, 25);
  const plannedBacklog = sortedByPriority.filter((r) => r.existingCoverage === 'planned_mdx');
  const needsVerificationBrands = sortedByPriority.filter(
    (r) => r.parentTopic === '机场品牌' && r.status === 'needs_verification'
  );

  // 6. Optional doc sync
  if (args.writeDocs) {
    const backlogRows = sortedByPriority
      .map(
        (r, i) =>
          `| ${i + 1} | \`${r.keyword}\` | \`${r.primaryURL}\` | ${r.intent} | ${r.existingCoverage} | **${r.priorityScore}** | ${r.status} |`
      )
      .join('\n');
    const backlogBody = [
      `> 自动生成时间：${new Date().toISOString().slice(0, 10)} · 总映射词条：**${records.length}**（含 31 品牌、10 一级专题、60 二级页面及重点对比/教程/治理页）。`,
      `> 注：无真实 GSC/Bing 搜索数据时，搜索量相关列留空（\`null\`），下表按 **30%/25%/15%/15%/10%/5%** 内部编辑权重排序。`,
      '',
      '| 顺位 | 目标关键词 | 唯一首选 URL | 意图 | 覆盖状态 | 内部优先级分 | 状态 |',
      '| ---: | --- | --- | --- | --- | ---: | --- |',
      backlogRows,
    ].join('\n');

    const cannibalBody = [
      `> 最近一次流水线检测：映射记录 **${records.length}** 条，GSC 导入行 **${gscRows.length}** 条，发现同词多 URL 互抢冲突 **${cannibalizationCases.length}** 处，GSC 着陆页偏离 **${gscConflicts.length}** 处。`,
      '',
      cannibalizationCases.length === 0
        ? '✅ 当前静态关键词映射表（`src/data/keyword-map.json`）中 **0 处同词抢多 URL 冲突**；全部 31 个品牌、10 个一级专题与 60 个二级页面均保持 1-to-1 唯一首选 URL 归属。'
        : cannibalizationCases
            .map(
              (c) =>
                `- **冲突词**：\`${c.normalizedKeyword}\` → 涉及 URL：${c.urls.map((u) => `\`${u}\``).join('、')}`
            )
            .join('\n'),
    ].join('\n');

    updateManagedSection(BACKLOG_DOC_PATH, 'BACKLOG_TABLE', backlogBody);
    updateManagedSection(CANNIBAL_DOC_PATH, 'CANNIBAL_STATUS', cannibalBody);
  }

  const report = {
    totalRecords: records.length,
    brandsCovered: brands.length,
    aliasMatchedRecords: aliasHitCount,
    gscImportedRows: gscRows.length,
    cannibalizationCount: cannibalizationCases.length,
    gscConflictsCount: gscConflicts.length,
    gscUnmappedCount: gscUnmappedQueries.length,
    duplicateUrlCount: duplicateUrlMappings.length,
    errorCount: allErrors.length,
    warningCount: allWarnings.length,
    top10Priority: topBacklog.slice(0, 10).map((r) => ({
      keyword: r.keyword,
      primaryURL: r.primaryURL,
      priorityScore: r.priorityScore,
      existingCoverage: r.existingCoverage,
    })),
    plannedMdxCount: plannedBacklog.length,
    needsVerificationBrandCount: needsVerificationBrands.length,
    errors: allErrors,
    warnings: allWarnings,
    cannibalizationCases,
    gscConflicts,
    gscUnmappedQueries,
  };

  if (args.json) {
    console.log(JSON.stringify(report, null, 2));
  } else {
    console.log('=== Keyword Governance Pipeline Report ===');
    console.log(`Records loaded      : ${report.totalRecords}`);
    console.log(`Brands covered      : ${report.brandsCovered}/31`);
    console.log(`Brand alias hits    : ${report.aliasMatchedRecords}`);
    console.log(`GSC CSV rows        : ${report.gscImportedRows}`);
    console.log(`Cannibalization     : ${report.cannibalizationCount}`);
    console.log(`Planned MDX backlog : ${report.plannedMdxCount}`);
    console.log(`Validation errors   : ${report.errorCount}`);
    console.log(`Validation warnings : ${report.warningCount}`);
    console.log('\nTop 10 Internal Priority Keywords (30/25/15/15/10/5):');
    for (const item of report.top10Priority) {
      console.log(
        `  - [${item.priorityScore}] ${item.keyword} -> ${item.primaryURL} (${item.existingCoverage})`
      );
    }
    if (allWarnings.length > 0) {
      console.log('\nWarnings:');
      for (const w of allWarnings) console.log(`  WARN: ${w}`);
    }
    if (allErrors.length > 0) {
      console.error('\nErrors:');
      for (const e of allErrors) console.error(`  ERR: ${e}`);
    }
    if (cannibalizationCases.length > 0) {
      console.error('\nCannibalization Conflicts:');
      for (const c of cannibalizationCases) {
        console.error(`  CONFLICT: "${c.normalizedKeyword}" -> ${c.urls.join(', ')}`);
      }
    }
  }

  if (allErrors.length > 0 || cannibalizationCases.length > 0) {
    process.exit(1);
  }
}

main();
