# Reference — 目录规范与命名约定

## Feature Slug

格式：`<YYYY-MM-DD>-<kebab-case-name>`

示例：`2026-06-30-sap-reimbursement`

- 日期：需求 kickoff 日或用户指定
- 名称：2–4 个英文词，与后续 `docs/superpowers/specs/` 文件名对齐

## 标准目录树

```
docs/requirements/<feature-slug>/
├── prd.md              # 归一化需求文档（文字为主）
├── roadmap.md          # Phase 划分（Phase 0 核心产出）
├── api.md              # 本需求 API 契约
├── MIGRATION.md        # 迁移审计（源 → 目标，原路径已删）
└── assets/
    ├── README.md       # 资产索引
    ├── 00-flow-main.png
    └── ...
```

## api.md 处理策略

按优先级选择一种（在 `MIGRATION.md` 注明）：

| 情况 | 做法 |
|------|------|
| 接口文档专属于本需求 | 迁入为 `api.md` 或 `api/*.md` |
| 全局 API 文档（如 `docs/frontend-api.md`）含本需求章节 | **移动**相关章节到 `api.md`；从原文件删除已迁章节；若原文件变空则删除原文件 |
| 全局文档多 feature 共用、无法拆分 | 不移动原文件；本目录写 `api-ref.md` 仅含章节索引 + 摘录字段表 |

用户要求「原目录不要留」时，**优先拆分迁出**；仅当拆分破坏其他 feature 时走 `api-ref.md` 例外路径，且须用户确认。

## 图片命名

```
{platform}-{page}-{scene}.png
```

| 段 | 示例 |
|----|------|
| platform | `pc`, `h5`, `base`, `flow` |
| page | `statistics`, `create`, `handle`, `todo` |
| scene | `list`, `drawer`, `readonly-qty` |

流程图固定：`00-flow-main.png`（排序靠前，Phase 0 默认引用）

## assets/README.md 索引列

| 列 | 说明 |
|----|------|
| 文件 | 相对 `assets/` 的文件名 |
| PRD 章节 | 如 `§3 报销单统计表` |
| 用于 Phase | 如 `Phase 2 PC`（Phase 0 不加载的图也须登记） |
| 说明 | 一行 UI/交互要点 |

## roadmap.md Phase 条目必填字段

每个 Phase 须包含：

- **Goal** — 一句话可验收目标
- **Repos** — `panasonic` / `digital-mobile-h5` / `cool-front-micro-base`
- **PRD 章节** — 引用范围
- **视觉参考** — `assets/` 相对路径列表（非 Phase 0 执行用，供 Phase N @）
- **API 参考** — `api.md` 章节或字段列表
- **Out of scope** — 明确不做
- **Depends on** — 前置 Phase（可无）

## 常见散落位置（扫描提示）

```
docs/**/*.md
docs/**/*.{png,jpg,jpeg,webp,gif}
docs/frontend-api.md
**/docs/**/*.{png,md}
用户 @ 的任意路径
PRD 内 AliDocs / 语雀 OSS 外链
```

## Phase 0 上下文策略

| 材料 | Phase 0 对话是否 @ |
|------|-------------------|
| `prd.md`（文字） | ✅ |
| `00-flow-main.png` | ✅ |
| `assets/README.md` | ✅ |
| 各页面细图 | ❌ 仅写入 roadmap 引用路径 |
| `api.md` 全文 | ⚠️ 读章节标题即可，不全文塞上下文 |

## Git 策略（方案 A：同目录切分支）

本项目默认 **不用 worktree**。各子仓库（`panasonic`、`digital-mobile-h5`、`cool-front-micro-base`）在 **Plan approve 后、Task 1 前** 从 `master`/`main` 创建 `feature/<slug>`。

| 阶段 | Git 操作 |
|------|----------|
| Phase 0 kickoff | 无（requirements 无 git） |
| brainstorm / plan | 无 |
| 实现 Task 1+ | Step 0 各 repo 建分支 → 禁止在 master commit |

`roadmap.md` 必须含 **Git 策略** 表（模板见 `templates/git-strategy.md`）。`writing-plans` 产出应在 header 重复该表。

## 与 superpowers 产物的关系

```
docs/requirements/<feature>/     ← 本技能（Phase 0）
docs/superpowers/specs/          ← brainstorming（Phase N）
docs/superpowers/plans/          ← writing-plans（Phase N）
```

requirements 是**需求真相源**；spec/plan 是**实现真相源**。spec 应链接回 `requirements/` 而非重复粘贴 PRD。
