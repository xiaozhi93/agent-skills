---
name: app-distill
description: >-
  Use when the user has a complex application codebase and wants to extract
  selected core features into a minimal runnable MVP in a new project. Triggers
  on 蒸馏 MVP、提取核心功能、精简重写、应用太复杂、最小可运行、app-distill.
category: deliver
tags: [workflow, code, planning, handoff]
version: 1.0.0
source: local
---

# App Distill

从复杂应用源码中蒸馏用户选定的核心功能，在新目录/新仓库实现最小可运行（MVP）应用。

## Overview

**核心原则：** 先对齐「保留什么、用什么栈」，再探索原仓、规划 MVP、搜索技术栈最佳实践技能后实现，最后验证可运行。

**产出：** 独立目录下的可构建、可运行的 MVP 应用 + MVP 规格文档。

**内嵌能力：**

- Phase 2 探索 → GitNexus 可用时遵循 `gitnexus-exploring`，否则通用代码探索
- Phase 4 交付 → 技术栈确认后**必须**搜索并加载最佳实践技能（`find-skills`）
- Phase 5 验证 → 遵循 `verification-before-completion`

## When to Use

- 用户提供复杂应用源码（Android / iOS / Web / 后端等），希望精简为核心 MVP
- 用户说「蒸馏 MVP」「提取核心功能」「应用太复杂想重写」「最小可运行版本」
- 用户需要：选功能 → 选技术栈 → 新项目实施

**When NOT to use:**

- 在原仓库内精简/重构 → 用 `gitnexus-refactoring`
- 只做代码分析不做实现 → 用 `gitnexus-exploring` + `writing-plans`
- 全量迁移或 1:1 复刻整个应用
- 创建 Agent Skill → 用 `creating-skills-guided`

## Baseline Failures

| 失误 | 后果 |
|------|------|
| 跳过功能确认直接写代码 | MVP 范围膨胀或遗漏核心路径 |
| 不搜索技术栈最佳实践技能 | 违背框架惯例、结构混乱 |
| 在原仓直接改 | 污染原项目、难以对比 |
| 探索不充分就规划 | 遗漏关键依赖与边界 |
| 未验证构建/运行就宣告完成 | 交付不可运行的 MVP |

## Five-Phase Pipeline

```dot
digraph pipeline {
    rankdir=LR;
    node [shape=box];

    p1 [label="Phase 1\n功能+技术栈"];
    p2 [label="Phase 2\n原仓探索"];
    p3 [label="Phase 3\nMVP 规划"];
    p4 [label="Phase 4\n新建+实现"];
    p5 [label="Phase 5\n验证"];

    p1 -> p2 -> p3 -> p4 -> p5;
    p4 -> p3 [label="计划变更", style=dashed];
    p5 -> p4 [label="验证失败", style=dashed];
}
```

| Phase | 模块 | 产出 | 门禁 |
|-------|------|------|------|
| 1 | [phases/01-clarify.md](phases/01-clarify.md) | 功能清单 + 技术栈决策 | 用户确认 → Phase 2 |
| 2 | [phases/02-explore.md](phases/02-explore.md) | 原仓功能映射表 | 映射表完成 → Phase 3 |
| 3 | [phases/03-plan.md](phases/03-plan.md) | MVP 规格 + 实现计划 | 用户确认 → Phase 4 |
| 4 | [phases/04-deliver.md](phases/04-deliver.md) | 新目录 MVP 代码 | 可构建 → Phase 5 |
| 5 | [phases/05-verify.md](phases/05-verify.md) | 验证报告 | 通过 → 完成 |

<HARD-GATE>
Do NOT enter Phase 2 until the user confirms the feature list and tech stack.
Do NOT enter Phase 4 until the user approves the MVP plan.
Do NOT write the first line of MVP code until Phase 4 skill-search gate passes (see phases/04-deliver.md).
Do NOT declare completion until Phase 5 verification passes.
</HARD-GATE>

## Skill Search Gate

技术栈确认后、写第一行 MVP 代码前：

1. 读取 `find-skills` 技能
2. 搜索 `"<stack> best practices"` / `"<framework> development"`
3. 若有高质量技能（1K+ installs 或官方源）→ 读取并遵循其开发规范
4. 若无匹配技能 → 用 `context7-mcp` 查官方文档，再继续

## Execution Spine

1. **Announce:** "Using app-distill, starting Phase 1: Clarify."
2. **Phase 1** → 功能清单 + 技术栈 → **wait for approval**
3. **Phase 2** → 原仓探索 → 功能映射表
4. **Phase 3** → MVP 规格 + 计划 → **wait for approval**
5. **Phase 4** → 技能搜索门禁 → 新建项目 → 实现核心路径
6. **Phase 5** → 构建/运行验证 → 交付报告

## Quick Reference

| 用户说 | 动作 |
|--------|------|
| 「从这个 Android 项目提取登录和列表」 | Phase 1 列模块让用户勾选 |
| 「换 React Native 重写」 | Phase 1 记录换栈决策 |
| 「直接开始写吧」 | 拒绝，回到 Phase 1/3 门禁 |
| 「在原项目里改」 | 说明超出范围，建议新建 MVP |

## Red Flags — STOP

- 「功能很清楚，直接写代码」
- 「不用搜技能，我知道怎么写」
- 「在原仓库改就行」
- 「先实现全部功能再精简」
- 「能跑就行不用验证」

**出现以上任一，回到对应 Phase。**

## Additional Resources

- 示例路径：[examples.md](examples.md)
- 分类规范：`~/.agents/skills/SKILL-TAXONOMY.md`
