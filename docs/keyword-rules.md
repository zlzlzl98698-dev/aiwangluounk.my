# 关键词治理规则（Keyword Governance Rules）

本文档定义 **网络AI（aiwangluounk.my）** 站内关键词映射、标准化、意图校验、防互抢（Cannibalization）与内部编辑优先级评分规范，配套自动化脚本 [`scripts/keyword-pipeline.mjs`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/scripts/keyword-pipeline.mjs) 与主映射表 [`src/data/keyword-map.json`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/src/data/keyword-map.json) 执行。

---

## 1. 数据真实性底线（严禁编造搜索量）

1. 在未导入真实 **Google Search Console (GSC)** 或 **Bing Webmaster Tools** 导出 CSV 前，所有词条的 `impressions`、`clicks`、`CTR`、`position`、`difficultyEstimate` **一律设为 `null`**。
2. 禁止使用估算值、第三方拍脑袋数值或测试占位数字填充上述五个真实指标字段；`keyword-pipeline.mjs` 会在校验阶段直接阻断非 `gsc` / `bing` 来源的伪造搜索指标。
3. 本站仅允许使用 **内部编辑优先级分数（`priorityScore`，0–100）** 对词条排期，且必须明确标注为内部编辑权重打分，不得等同于真实搜索量或商业排名承诺。

---

## 2. 内部编辑优先级评分模型（30% / 25% / 15% / 15% / 10% / 5%）

每条记录的 `priorityScore` 按以下六个内部因子加权计算，保留 1 位小数：

| 因子字段 | 权重 | 含义与打分口径（0–100） |
| --- | ---: | --- |
| `businessImpact` | **30%** | 商业与决策影响度（站内编辑候选优先级、核心转介决策枢纽、预算/品牌直接落地价值） |
| `demandProxy` | **25%** | 用户问题紧迫度与需求代理（基于常见中文代理求助与选型高频痛点评估，非真实 GSC 搜索量） |
| `evidenceReadiness` | **15%** | 现有证据完备度（是否具备多档套餐表、历史截图、实测样本或完整步骤文档） |
| `contentGap` | **15%** | 内容缺口与纠偏机会（澄清误区、揭露资料冲突、替代行业洗稿内容的差异化空间） |
| `hubLeverage` | **10%** | 内链枢纽杠杆（一级专题、二级决策页或品牌聚合页对全站内链图谱的拉动作用） |
| `freshnessUrgency` | **5%** | 时效与核验紧迫度（存在双码冲突、价格冲突、URL 异常或过期实测需要持续跟踪） |

计算公式：

```text
priorityScore = round(
  businessImpact * 0.30 +
  demandProxy * 0.25 +
  evidenceReadiness * 0.15 +
  contentGap * 0.15 +
  hubLeverage * 0.10 +
  freshnessUrgency * 0.05,
  1
)
```

---

## 3. 标准化与品牌别名识别规范

执行查重与互抢检测前，脚本对关键词执行统一标准化：

1. **Unicode NFKC 归一化**与 ASCII 全小写转换。
2. **标点符号与空白清洗**：去除中英文标点（`｜ | · — - _ / , ， 。 ： ( ) [ ]` 等）并折叠连续空格。
3. **品牌别名映射**：自动从 [`src/data/brandsPart1.ts`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/src/data/brandsPart1.ts) 与 [`src/data/brandsPart2.ts`](file:///c:/Users/Pro%20User/Desktop/aiwangluounk.my/src/data/brandsPart2.ts) 读取全库 31 个唯一品牌的 `name`、`slug`、`aliases`，并补充中英文简称映射（如 `GSY` → `光速云`、`Firefly 萤火虫` → `Firefly（萤火虫）`、`EdgeNova` → `边缘节点 EdgeNova`、`小火箭` → `Shadowrocket`、`CivetNet` → `灵猫网络` 等）。
4. **单品牌词路由红线**：任何仅指向单一品牌的查询（评测、套餐、优惠码、官网入口）必须收敛到唯一权威页 `/brands/{slug}/`，不得另建重复二级页或独立评测页抢夺流量。

---

## 4. 搜索意图（Intent）分类规范

| `intent` 枚举值 | 适用页面类型 | 示例 |
| --- | --- | --- |
| `commercial_investigation` | 品牌主评测 `/brands/{slug}/`、综合/排行/对比页 `/recommend/*`、`/compare/*`、避坑页 | `光速云机场评测`、`5.6元便宜机场对比` |
| `transactional` | 明确筛选购买条件（月付、不限时流量包、优惠码）的决策页 | `月付机场推荐清单`、`机场优惠码查询汇总` |
| `informational` | 教程、客户端安装、AI/流媒体排障、线路科普、风险与隐私原则页 | `Clash Verge Rev使用教程`、`机场订阅导入失败 200 OK 空内容` |
| `navigational` | 品牌数据库目录、官网入口识别、更新日志、风险追踪面板、披露页 | `31家机场品牌目录`、`机场官网入口识别防仿冒` |

---

## 5. 流水线脚本运行方式

```bash
# 1. 仅执行全量校验、去重、别名识别与冲突报告
node scripts/keyword-pipeline.mjs

# 2. 导入真实 GSC 或 Bing Webmaster 导出 CSV 进行交叉校验与着陆页偏离检测
node scripts/keyword-pipeline.mjs --gsc path/to/gsc-queries.csv

# 3. 同步更新 docs/keyword-backlog.md 与 docs/keyword-cannibalization.md
node scripts/keyword-pipeline.mjs --write-docs

# 4. 输出 JSON 格式审计报告供 CI 解析
node scripts/keyword-pipeline.mjs --json
```
