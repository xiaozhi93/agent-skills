# 技能编写规范

本仓库 Agent Skill 的结构约定与 CI 校验要求。新增或修改技能前请先阅读本文档。

---

## 目录结构

每个技能位于 `skills/<name>/`，目录名必须与 frontmatter `name` 一致：

```
skills/<name>/
├── SKILL.md              # 入口：概述、阶段表、HARD-GATE、Red Flags
├── examples.md           # 可选：示例输入/输出
├── phases/               # 阶段详情（按序号命名）
│   ├── 01-clarify.md
│   ├── 02-explore.md
│   └── ...
├── reference/            # 可选：参考文档
└── templates/            # 可选：交付模板
```

**规则：**

- `SKILL.md` 是唯一入口，Agent 首先读取此文件
- 阶段细节放在 `phases/`，用相对链接从 `SKILL.md` 引用
- 辅助材料（examples、reference、templates）通过链接引用，不内联大段内容

---

## YAML Frontmatter

`SKILL.md` 必须以 YAML frontmatter 开头：

```yaml
---
name: app-distill
description: >-
  Use when the user has a complex application codebase and wants to extract
  selected core features into a minimal runnable MVP in a new project.
category: deliver
tags: [workflow, code, planning, handoff]
version: 1.0.0
source: xiaozhi93/agent-skills
---
```

| 字段 | 要求 |
|------|------|
| `name` | **必须**与目录名完全一致 |
| `description` | **必须**存在，≤ 1024 字符；英文为主，可含中文触发词 |
| `source` | **必须**为 `xiaozhi93/agent-skills` |
| `category`, `tags`, `version` | 推荐保留 |

---

## 必需章节

CI（`scripts/validate-skills.js`）强制检查以下章节存在于 `SKILL.md`：

| 章节 | 用途 |
|------|------|
| `## Overview` | 核心原则、产出物、内嵌能力摘要 |
| `## When to Use` | 适用场景 + **When NOT to use**（避免误触发） |
| `## Red Flags` | 反模式与常见失误（或等价的 Baseline Failures 表） |

推荐额外包含：

- 阶段流程表（Phase | 模块 | 产出 | 门禁）
- `## Verification` 或验证相关说明
- Common Rationalizations（可选）

---

## phases/ 结构

阶段文件按 `NN-<verb>.md` 命名（两位序号 + 动词）：

```
phases/01-clarify.md
phases/02-explore.md
phases/03-plan.md
...
```

每个 phase 文件应包含：

1. **目标** — 本阶段要达成什么
2. **步骤** — Agent 具体执行动作
3. **产出** — 交付物格式
4. **门禁** — 进入下一阶段的条件

`SKILL.md` 中的阶段表通过 Markdown 链接指向 phase 文件：

```markdown
| 1 | [phases/01-clarify.md](phases/01-clarify.md) | 功能清单 + 技术栈决策 | 用户确认 → Phase 2 |
```

**链接规则：** 所有相对链接目标必须存在，CI 会递归检查 `skills/<name>/` 下全部 `.md` 文件。

---

## HARD-GATE

HARD-GATE 是不可跳过的阶段门禁，用 XML 标签包裹：

```xml
<HARD-GATE>
Do NOT enter Phase 2 until the user confirms the feature list and tech stack.
Do NOT write implementation code during Phase 1.
</HARD-GATE>
```

**约定：**

- 放在 `SKILL.md` 阶段表之后，或在具体 phase 文件的关键位置
- 使用英文祈使句，语义明确、可执行
- 典型门禁：用户确认前不进入下一阶段、确认前不写代码/正文
- Agent 必须遵守；Red Flags 表应引用相关 HARD-GATE 违规场景

---

## 外部技能引用

在正文中引用其他技能时使用反引号：

```markdown
遵循 `gitnexus-exploring` 探索原仓
Phase 5 遵循 `verification-before-completion`
```

引用的外部技能应在 `skills.manifest.json` 的 `requires` 或 `requires_mcp` 中声明。本仓库内技能互相引用时，目录名即为 skill name。

---

## skills.manifest.json 同步

每增加或修改技能，**必须**同步更新 [`skills.manifest.json`](../skills.manifest.json)：

```json
{
  "name": "app-distill",
  "description": "从复杂应用源码蒸馏 MVP 到新项目",
  "triggers": ["蒸馏 MVP", "提取核心功能", "精简重写", "app-distill", "最小可运行"],
  "requires": ["find-skills", "gitnexus-exploring", "verification-before-completion"]
}
```

| 字段 | 要求 |
|------|------|
| `name` | 与目录名一致 |
| `description` | 中文简短描述 |
| `triggers` | 非空数组；供 find-skills 匹配用户意图 |
| `requires` | 可选；外部技能依赖列表 |
| `requires_mcp` | 可选；MCP 服务器标识（如 `user-stitch`） |

**双向一致性：** manifest 中的每个 `name` 必须对应 `skills/<name>/` 目录，反之亦然。`node scripts/validate-manifest.js` 会检查。

---

## 链接与引用校验

`validate-skills.js` 检查项：

**Errors（阻塞 CI）：**

- 缺少 `SKILL.md` 或 frontmatter
- `name` 与目录名不匹配
- 缺少必需章节
- 相对链接目标不存在

**Warnings（不阻塞）：**

- 反引号中的 skill 名无法在本仓库或已知外部列表中识别

---

## 编写检查清单

提交前确认：

- [ ] `skills/<name>/SKILL.md` frontmatter 完整，`source: xiaozhi93/agent-skills`
- [ ] 必需章节齐全（Overview、When to Use、Red Flags）
- [ ] 阶段表链接到 `phases/*.md`，链接均可解析
- [ ] HARD-GATE 覆盖关键不可跳过步骤
- [ ] `skills.manifest.json` 已更新 triggers / requires
- [ ] `node scripts/validate-skills.js` 通过
- [ ] `node scripts/validate-manifest.js` 通过
- [ ] [dev-testing.md](dev-testing.md) 触发语可激活技能

---

## 参考示例

| 技能 | 阶段数 | 特点 |
|------|--------|------|
| [app-distill](../skills/app-distill/SKILL.md) | 5 | find-skills 集成、MVP 规划 |
| [app-ui-redesign](../skills/app-ui-redesign/SKILL.md) | 6 | Stitch MCP、TDD、reference/ |
| [conversation-to-article](../skills/conversation-to-article/SKILL.md) | 4 | 轻量流程、example-output.md |
| [repo-feature-distill](../skills/repo-feature-distill/SKILL.md) | 5 | 跨仓迁移、templates/ |
