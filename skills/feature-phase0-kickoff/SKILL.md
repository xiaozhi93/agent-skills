---
name: feature-phase0-kickoff
description: >-
  Use when starting a cross-platform feature and the user provides a PRD,
  prototypes, screenshots, or API docs scattered across the repo. Consolidates
  all materials into docs/requirements/, generates roadmap and asset index,
  before brainstorming or implementation. 用户提供 PRD/原型/截图/接口文档、资源散落
  各目录、或要求 Phase 0 / requirements / roadmap 组织时使用。
category: deliver
tags: [workflow, requirements, roadmap, handoff]
source: xiaozhi93/agent-skills
---

# Feature Phase 0 Kickoff

将散落的需求资源（PRD、原型、截图、接口文档）**统一迁入** `docs/requirements/<feature>/`，生成 `roadmap.md` 与 `assets` 索引，为后续 superpowers `/brainstorming` 各 Phase 做准备。

**本技能止于 Phase 0。** 不写 spec、不写 plan、不写代码、不启动 dev、不联调。

## Overview

**核心原则：** 发现 → 清单确认 → 迁移归集 → 文档脚手架 → handoff。单源真相，原路径不留副本。

**产出：**

1. 资源清单 + feature slug（Step 1）
2. 迁移完成 + `MIGRATION.md`（Step 2）
3. `prd.md` / `roadmap.md` / `assets/`（Step 3）
4. 完成清单 + Phase N 开场白（Step 4）

**内嵌能力：**

- 目录与命名规范 → [reference.md](reference.md)
- 模板 → [templates/](templates/)

## When to Use

- 用户开始跨端（PC / H5 / 主应用）大需求，手头有 PRD + 视觉/接口材料
- 资源散落在 `docs/`、子仓库、`*.png` 临时目录等多处，需要**迁入统一管理、原处不留**
- 用户要求「Phase 0」「整理 requirements」「生成 roadmap」

**When NOT to use:**

- 已有完整 `docs/requirements/<feature>/` 且资源已归位 → 直接进入 Phase N `/brainstorming`
- 用户要写的是 spec / plan / 实现代码 → 用 `brainstorming` / `writing-plans`
- 只改一两张图或 PRD 一句话 → 直接编辑，不必走本流程
- 只需生成开发提示词 → 用 `generate-dev-handoff-prompt`

## Execution Spine

**Announce:** "Using feature-phase0-kickoff, starting Phase 0."

按顺序执行，不可跳步：

| Step | 模块 | 产出 |
|------|------|------|
| 1 | [phases/01-intake.md](phases/01-intake.md) | 资源清单 + feature slug |
| 2 | [phases/02-migrate.md](phases/02-migrate.md) | 迁移完成 + `MIGRATION.md` |
| 3 | [phases/03-scaffold.md](phases/03-scaffold.md) | `prd.md` / `roadmap.md` / `assets/` |
| 4 | [phases/04-handoff.md](phases/04-handoff.md) | 完成清单 + 下阶段开场白 |

<HARD-GATE>
Do NOT move or delete any file until the user explicitly approves the migration manifest from Step 2.
Do NOT write spec, plan, or code in this skill.
Do NOT leave copies at original paths after migration — one canonical location only.
Do NOT proceed to `/brainstorming` until the user approves `roadmap.md`.
</HARD-GATE>

## Output Layout

目标目录（详见 [reference.md](reference.md)）：

```
docs/requirements/<YYYY-MM-DD>-<feature-slug>/
├── prd.md
├── roadmap.md
├── api.md              # 或 api/ 子目录
├── MIGRATION.md        # 迁移审计
└── assets/
    ├── README.md
    └── {platform}-{page}-{scene}.png
```

## Resource Migration Rules

1. **发现** — 用户 @ 的路径 + PRD 内外链 + 常见散落位置（见 `01-intake.md`）
2. **清单** — 表格：源路径 → 目标路径 → 类型（PRD / 图 / API）
3. **确认** — 用户回复「确认迁移」后执行
4. **执行** — Git 仓库内优先 `git mv`；非 Git 用 `mv`
5. **清理** — 原路径不得保留副本；删除空目录
6. **修复引用** — 更新 `prd.md` 图片链接为 `assets/` 相对路径
7. **审计** — 写入 `MIGRATION.md`（源路径、目标路径、日期）

**共享文件例外：** 若某文件被多个 feature 共用，不移动；在清单中标注「保留原处 + 本 feature 用相对引用或摘录」，需用户明确确认。

## Quick Reference — 用户开场白

```markdown
@docs/【松下】xxx需求.md
@docs/frontend-api.md
@docs/image.png
@panasonic/docs/某截图.png

/feature-phase0-kickoff

Feature 名称：sap-reimbursement
涉及平台：PC panasonic、H5 digital-mobile-h5、主应用 cool-front-micro-base
请扫描并归集所有相关材料，原目录不要留副本。
```

## Templates

| 文件 | 用途 |
|------|------|
| [templates/roadmap.md](templates/roadmap.md) | `roadmap.md` 骨架 |
| [templates/assets-readme.md](templates/assets-readme.md) | `assets/README.md` 索引表 |
| [templates/phase-n-prompt.md](templates/phase-n-prompt.md) | Phase N brainstorm 开场白 |
| [templates/git-strategy.md](templates/git-strategy.md) | roadmap Git 策略表（方案 A） |
| [templates/implement-step0-prompt.md](templates/implement-step0-prompt.md) | Plan 执行前 Step 0 开场白 |

## Red Flags

| 失误 | 后果 |
|------|------|
| 未出迁移清单就移动文件 | 误删/误移共享资源 |
| 复制而非移动，原处留副本 | 双源真相，后续引用混乱 |
| Phase 0 里写 spec/plan | scope 膨胀，上下文污染 |
| Phase 0 @ 全部截图拆 roadmap | token 浪费，阶段划分质量差 |
| 外链图片不下载 | Agent 后续对话读不到图 |

**STOP 信号：**

- 「资源差不多，直接写 roadmap 吧」→ 回到 Step 1 补清单
- 「原目录留一份备份」→ 违反单源原则，除非用户明确例外
- 「顺便 brainstorm Phase 1」→ 本技能止于 handoff
- 「description 里写清流程就行，不用迁文件」→ 必须执行迁移

## Integration

**下一步（用户 approve roadmap 后）：**

- Phase N → superpowers `brainstorming`（单阶段 scope + 该 Phase 截图）
- 实现 → `writing-plans` → `subagent-driven-development` 或 `executing-plans`

**相关技能：** `brainstorming`（Phase 0 是其前置，不替代）；`generate-dev-handoff-prompt`（分析完成后生成实现提示词）
