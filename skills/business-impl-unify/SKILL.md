---
name: business-impl-unify
description: >-
  Use when the user explicitly asks to unify multiple implementations of the
  same business domain. Routes into Superpowers brainstorming with impl-unify
  extension; produces spec → plan → subagent-driven convergence. Optional
  skill creation via creating-skills-guided. Triggers include 统一业务实现、
  多套实现、实现分叉、收敛实现、business-impl-unify. Explicit invocation only.
category: deliver
tags: [workflow, code, architecture, refactoring]
disable-model-invocation: true
source: xiaozhi93/agent-skills
---

# Business Impl Unify

统一同一业务域的多套实现。薄入口 → Superpowers `brainstorming` + [域扩展](extension/brainstorming-addon.md)。

## Overview

**核心原则：** 先盘点、再对比、后定标——**用户确认 spec 前不改代码**；收敛时行为对等、代码适配，禁止 1:1 复制。

**产出：**

1. Spec（含业务域简报、实现清单、差异报告、统一标准）— via `brainstorming` + addon
2. Implementation plan — via `writing-plans`
3. 收敛代码 — via `subagent-driven-development` + `test-driven-development`
4. 验证报告 — via `verification-before-completion`
5. [可选] 配套 Agent Skill — via `creating-skills-guided`

**内嵌能力：**

- 设计阶段 → `brainstorming` + [extension/brainstorming-addon.md](extension/brainstorming-addon.md)
- 盘点 → `gitnexus-exploring`
- Plan → `writing-plans`
- 实现 → `subagent-driven-development` + `test-driven-development`
- 验证 → `verification-before-completion`
- 配套 Skill（可选）→ `creating-skills-guided`

## When to Use

- 用户显式调用（如 `/business-impl-unify`）
- 「统一 XX 业务的实现」「这几套逻辑维护成本太高，收敛一下」
- 单仓多模块或跨仓存在同一业务的重复/分叉实现

**When NOT to use:**

- 跨仓「迁移功能到另一项目」→ `repo-feature-distill`
- 单点重构、非「多套同类实现」→ `gitnexus-refactoring`
- 只分析不收敛 → `gitnexus-exploring` + 报告
- 从零创建 Agent Skill（无业务收敛）→ `creating-skills-guided`
- 蒸馏整应用 MVP → `app-distill`

## Red Flags

| 失误 | 后果 |
|------|------|
| 未读 addon 就进入 brainstorming | 跳过盘点/差异，方案无依据 |
| 跳过澄清直接改代码 | 业务边界不清 |
| spec 未批就 invoke writing-plans | 团队不认可，二次分叉 |
| 1:1 复制某一实现覆盖其他 | 风格冲突、隐性依赖、回归 |
| 一次收敛多个无关业务 | 变更过大，无法验证 |
| ≥2 步迁移主会话一口气改完 | 上下文污染、跳过 review |
| 未验证就写配套 Skill | Skill 描述错误实现 |

<HARD-GATE>
Read extension/brainstorming-addon.md BEFORE invoking brainstorming.
Do NOT invoke writing-plans until the user explicitly approves the spec.
Do NOT execute multi-step migration inline — use subagent-driven-development when migration steps ≥ 2.
Do NOT write companion SKILL.md directly — invoke creating-skills-guided when user requests skill creation.
Do NOT unify more than one business domain per session.
When repos differ, move the agent to the appropriate workspace before reading or writing code.
</HARD-GATE>

## Execution Spine

1. **Announce:** "Using business-impl-unify → Superpowers brainstorming + impl-unify extension."
2. **Read** [extension/brainstorming-addon.md](extension/brainstorming-addon.md)
3. **Invoke** `brainstorming`（addon 注入 Inventory + Divergence）
4. **Spec** 用户批准 → invoke `writing-plans`
5. **Implement** per plan（≥2 步 → `subagent-driven-development`）
6. **Verify** → `verification-before-completion`
7. **[可选]** 用户要求 → `creating-skills-guided`

## Quick Reference

| 用户说 | 动作 |
|--------|------|
| 「统一订单业务的实现」 | addon 域澄清：单仓还是跨仓？ |
| 「三套登录逻辑合并一套」 | Inventory 盘点三套入口 |
| 「只要报告不要改代码」 | spec 批准后停止 |
| 「标准方案可以，开始改」 | writing-plans → subagent-driven（≥2 步） |
| 「收敛完帮我写个 Skill」 | 验证通过后 → creating-skills-guided |

## Additional Resources

- 域扩展：[extension/brainstorming-addon.md](extension/brainstorming-addon.md)
- 差异报告模板：[templates/divergence-report.md](templates/divergence-report.md)
- 统一标准模板：[templates/standard-proposal.md](templates/standard-proposal.md)
- 迁移参考：[templates/migration-plan.md](templates/migration-plan.md)
- 示例：[examples.md](examples.md)
