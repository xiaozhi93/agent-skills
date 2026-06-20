# business-impl-unify 重构 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 `business-impl-unify` 从独立六阶段流水线重构为 Superpowers `brainstorming` 薄入口 + 域扩展，产出 spec → writing-plans → subagent-driven 标准链。

**Architecture:** 保留 `skills/business-impl-unify/SKILL.md` 作显式触发路由；新增 `extension/brainstorming-addon.md` 合并原 phases 01–03 及执行约束；删除 `phases/`；manifest/docs 同步。验证靠 `validate-skills.js` + `validate-manifest.js`（本仓库无单元测试）。

**Tech Stack:** Markdown Agent Skills、Node.js 校验脚本、`skills.manifest.json`

**Spec:** [2026-06-20-business-impl-unify-refactor-design.md](../specs/2026-06-20-business-impl-unify-refactor-design.md)

---

## File Map

| 操作 | 文件 | 职责 |
|------|------|------|
| Create | `skills/business-impl-unify/extension/brainstorming-addon.md` | 域扩展：澄清、盘点、差异、spec 章节、执行链、Red Flags |
| Rewrite | `skills/business-impl-unify/SKILL.md` | 薄入口（~80 行） |
| Delete | `skills/business-impl-unify/phases/*.md` | 6 个旧阶段文件 |
| Modify | `skills/business-impl-unify/templates/migration-plan.md` | Phase 4/6 措辞 → Superpowers 链 |
| Modify | `skills/business-impl-unify/templates/standard-proposal.md` | Phase 4 门禁措辞 |
| Modify | `skills/business-impl-unify/examples.md` | 新流程预期行为 |
| Modify | `skills.manifest.json` | requires + description |
| Modify | `docs/dependencies.md` | 依赖表更新 |
| Modify | `docs/dev-testing.md` | 触发语 + 验证清单 |
| Modify | `docs/skill-anatomy.md` | 参考示例加一行 |

---

### Task 1: 创建 brainstorming-addon.md

**Files:**
- Create: `skills/business-impl-unify/extension/brainstorming-addon.md`

- [ ] **Step 1: 创建 extension 目录**

```bash
mkdir -p skills/business-impl-unify/extension
```

- [ ] **Step 2: 写入 brainstorming-addon.md**

创建文件 `skills/business-impl-unify/extension/brainstorming-addon.md`，完整内容如下：

```markdown
# Brainstorming Extension: Business Impl Unify

本文件扩展 Superpowers `brainstorming`。`business-impl-unify` 触发后**必须先读本文**，再 invoke `brainstorming`。

## 注入 brainstorming 检查清单

在标准 brainstorming 流程中插入以下步骤（★ = 域增量）：

| 顺序 | 标准 brainstorming | 域扩展 |
|------|-------------------|--------|
| 1 | Explore project context | + 遵循 `gitnexus-exploring` |
| 2 | Ask clarifying questions | + 域专属 6 问（见下） |
| 3 | — | ★ Inventory：实现清单 + 关系图 |
| 4 | — | ★ Divergence：差异矩阵 + 特性对照 |
| 5 | Propose 2-3 approaches | 必须基于盘点事实 |
| 6 | Present design | 含统一标准草案 |
| 7 | Write design doc (spec) | 必填域章节（见 Spec 结构） |
| 8 | Self-review + user review | 标准流程 |
| 9+ | — | spec 批准后 → `writing-plans` → 实现 → 验证 |

## 域专属澄清（一次一问）

1. **业务域** — 要统一的具体业务（如「订单创建」）
2. **范围类型** — 单仓多模块 / 跨多仓
3. **已知实现** — 用户是否已知多套实现位置
4. **Canonical 倾向** — 中立对比 / 以某套为基准演进
5. **成功标准** — 测试、接口一致、删除重复、团队认可
6. **排除项** — 不合并什么（遗留分支、实验代码等）

### 业务域简报格式（写入 spec §1）

\`\`\`markdown
## 业务域简报

**业务域：** …
**范围：** 单仓 \`{path}\` / 跨仓 \`{A}\` + \`{B}\`
**已知实现（草案）：**
| # | 位置 | 负责人/来源 | 备注 |
|---|------|-------------|------|
| 1 | … | … | … |

**Canonical 倾向：** 中立对比 / 以 #{n} 为基准演进
**成功标准：** …
**Out of scope：** …
\`\`\`

<HARD-GATE>
Do NOT proceed to Inventory until the user explicitly approves the business domain brief.
</HARD-GATE>

## Inventory（澄清后、提方案前）

**必须**遵循 `gitnexus-exploring`（可用时）。不可用时：`Grep` + 语义搜索 + `Read`。

### GitNexus 路径

\`\`\`
1. READ gitnexus://repos → 确认目标仓已索引
2. gitnexus_query({query: "<业务关键词>"})
3. gitnexus_context({name: "<关键 symbol>"})
4. Read 源文件 → 确认同一业务域
\`\`\`

### 盘点清单

- [ ] 每套实现的入口（API、组件、Handler）
- [ ] 核心文件（≤20/套）
- [ ] 外部依赖差异
- [ ] 与 out of scope 边界一致
- [ ] 无遗漏的同业务代码

### 实现清单格式（写入 spec §2）

\`\`\`markdown
## 实现清单

**业务域：** …
**共 N 套实现**

### 实现 #1 — {标签}
| 项 | 内容 |
|----|------|
| 位置 | \`{repo}/{path}\` |
| 入口 | … |
| 核心文件 | … |
| 依赖摘要 | … |

### 关系图
{ASCII 或 mermaid}

### 遗漏检查
- [ ] 与业务域简报一致
\`\`\`

## Divergence（Inventory 后、提方案前）

对比维度：行为、结构、依赖、测试、运维。

使用模板：[templates/divergence-report.md](../templates/divergence-report.md) → spec §3

统一标准必须回答：保留什么、废弃什么、迁移策略、适配规则、风险与回滚。

使用模板：[templates/standard-proposal.md](../templates/standard-proposal.md) → spec §4（含迁移计划表）

<HARD-GATE>
Do NOT invoke writing-plans until the user explicitly approves the spec (including unified standard and migration strategy).
Do NOT propose approaches before Inventory and Divergence are complete.
</HARD-GATE>

## Spec 必填章节

路径：`docs/superpowers/specs/YYYY-MM-DD-{business-domain}-impl-unify-design.md`

\`\`\`markdown
# {业务域} 实现收敛 Spec

> **For agentic workers:** REQUIRED SUB-SKILL: subagent-driven-development (when migration steps ≥ 2)

## 1. 业务域简报
## 2. 实现清单
## 3. 差异报告
## 4. 统一标准（含迁移计划表）
## 5. 架构与组件
## 6. 数据流与错误处理
## 7. 测试策略
## 8. 回滚方案
\`\`\`

**早停：** 用户说「只要报告不要改代码」→ spec 批准后停止，不 invoke `writing-plans`。

## Spec 批准后的执行链

| 阶段 | 技能 | 条件 |
|------|------|------|
| Plan | `writing-plans` | spec 用户批准 |
| 实现 | `subagent-driven-development` + `test-driven-development` | 迁移 ≥2 步；单步 trivial 可 inline |
| 验证 | `verification-before-completion` | 实现完成 |
| 配套 Skill | `creating-skills-guided` | **仅**用户明确要求 |

### 实现约束（writing-plans / 子代理阶段）

- 行为对等、代码适配；**禁止** 1:1 整文件复制
- 迁移 ≥2 步：**必须** `subagent-driven-development`，主会话逐步派发，禁止一口气改完
- 每步：TDD、spec 合规 review → code quality review
- 跨仓：先 `move_agent_to_root` 到对应 workspace
- 验证清单：测试/构建通过、入口行为一致、冗余已删或 deprecated

### 可选：配套 Skill（用户要求时）

1. Announce 转入 `creating-skills-guided`
2. 输入：spec §4 统一标准 + 验证报告
3. 命名建议：`{business-domain}-dev` 或 `{business-domain}-pattern`
4. **禁止**裸写 SKILL.md

## Red Flags — STOP

- 「很明显留 A 删 B，直接改」→ 回到 Divergence，补 spec
- 「先合并再补测试」→ 回到 TDD
- 「顺便把支付也统一了」→ 回到澄清，一次一域
- 「≥2 步主会话一口气改完」→ 必须 subagent-driven-development
- 「Skill 随便写一段」→ 必须 creating-skills-guided
- spec 未批就 invoke writing-plans → 禁止

## 技能路由（When NOT to use 域场景）

| 场景 | 用 |
|------|-----|
| A 仓复制能力到 B 仓（B 原先没有） | `repo-feature-distill` |
| 单套代码结构重构 | `gitnexus-refactoring` |
| 只分析不收敛 | `gitnexus-exploring` |
| 无业务收敛，只写 Skill | `creating-skills-guided` |
| 蒸馏整应用 MVP | `app-distill` |
```

- [ ] **Step 3: 验证 addon 链接可达**

```bash
node scripts/validate-skills.js 2>&1 | grep business-impl-unify || true
```

预期：可能仍有 SKILL.md 指向旧 phases 的 ERROR；Task 2 后应消除 addon 链接问题。

---

### Task 2: 重写 SKILL.md 为薄入口

**Files:**
- Modify: `skills/business-impl-unify/SKILL.md`

- [ ] **Step 1: 替换 SKILL.md 全文**

```markdown
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
```

- [ ] **Step 2: 运行链接校验**

```bash
node scripts/validate-skills.js
```

预期：`business-impl-unify` 无 ERROR（phases 链接可能仍报错直到 Task 3）

---

### Task 3: 删除旧 phases 目录

**Files:**
- Delete: `skills/business-impl-unify/phases/01-clarify.md`
- Delete: `skills/business-impl-unify/phases/02-explore.md`
- Delete: `skills/business-impl-unify/phases/03-standardize.md`
- Delete: `skills/business-impl-unify/phases/04-converge.md`
- Delete: `skills/business-impl-unify/phases/05-verify.md`
- Delete: `skills/business-impl-unify/phases/06-skillify.md`

- [ ] **Step 1: 删除 phases 文件**

```bash
rm -f skills/business-impl-unify/phases/01-clarify.md \
      skills/business-impl-unify/phases/02-explore.md \
      skills/business-impl-unify/phases/03-standardize.md \
      skills/business-impl-unify/phases/04-converge.md \
      skills/business-impl-unify/phases/05-verify.md \
      skills/business-impl-unify/phases/06-skillify.md
rmdir skills/business-impl-unify/phases 2>/dev/null || true
```

- [ ] **Step 2: 确认 validate-skills 通过**

```bash
node scripts/validate-skills.js
```

预期：`✓  business-impl-unify`，整库 0 errors

---

### Task 4: 更新 templates 措辞

**Files:**
- Modify: `skills/business-impl-unify/templates/standard-proposal.md`
- Modify: `skills/business-impl-unify/templates/migration-plan.md`

- [ ] **Step 1: 修改 standard-proposal.md 底部门禁**

将：

```markdown
- [ ] 批准按此标准进入 Phase 4 收敛
```

替换为：

```markdown
- [ ] 批准按此标准写入 spec 并进入 writing-plans / 实现阶段
```

- [ ] **Step 2: 修改 migration-plan.md**

将文件开头说明和规则中的 Phase 引用更新：

1. 标题下增加一行：`> 迁移步骤表写入 spec §4「迁移计划」。writing-plans 从 spec 读取，不扩展 writing-plans 技能本身。`

2. 步骤表最后一行示例从 `合并 Skill（Phase 6，走 creating-skills-guided）` 改为 `配套 Skill（可选，走 creating-skills-guided）`

3. 规则中 `2 步及以上 → Phase 4 **必须**走 subagent-driven-development` 改为 `2 步及以上 → **必须**走 subagent-driven-development`

4. 删除「Phase 3 批准」「全部步骤完成 → Phase 5 整体验证」等 Phase 编号段落，改为：

```markdown
## 子代理驱动约定（≥2 步时）

spec 用户批准 → writing-plans → 主会话 TodoWrite 列出步骤 → 逐步派发子代理 → 全部完成后 verification-before-completion
```

- [ ] **Step 3: 链接校验**

```bash
node scripts/validate-skills.js
```

预期：PASS

---

### Task 5: 更新 examples.md

**Files:**
- Modify: `skills/business-impl-unify/examples.md`

- [ ] **Step 1: 替换 examples.md 全文**

```markdown
# 示例

## 触发语

| 场景 | 用户说 |
|------|--------|
| 单仓 | 「这个 monorepo 里订单有三套实现，统一一下」 |
| 跨仓 | 「A 项目和 B 项目的登录逻辑不一样，维护太贵，收敛成一套标准」 |
| 带 Skill | 「统一支付实现，最后帮我写个 Skill 给团队用」 |
| 仅分析 | 「三套登录逻辑，先出差异报告和标准方案，不要改代码」 |

## 预期流程（brainstorming + addon）

1. Announce `business-impl-unify` → 读 addon → invoke `brainstorming`
2. 域澄清 → Inventory → Divergence → 2–3 收敛方案
3. 写入 spec（含清单、差异、统一标准）
4. 用户批准 spec → `writing-plans` → 实现 → 验证
5. [可选] 用户要求 → `creating-skills-guided`

## 预期 spec 片段（§1 业务域简报）

**业务域：** 用户登录  
**范围：** 单仓 `apps/web` + `apps/mobile` + `services/auth`  
**成功标准：** 共享 `packages/auth-core`，两套客户端只保留 UI 适配层  

## 多步迁移（spec §4 → writing-plans → 子代理）

| 步骤 | 内容 | 状态 |
|------|------|------|
| 1 | 注册表 + dashboard/message-center | 待做 |
| 2 | 移址 → BizShell B 类 | 待做 |
| N | 配套 Skill（可选） | 待做 |

≥2 步：**必须** `subagent-driven-development`；禁止主会话一口气改完。

## 与相近技能的分工

| 技能 | 何时用 |
|------|--------|
| `business-impl-unify` | 同一业务多套实现 → 合并为标准 |
| `repo-feature-distill` | 从 A 仓复制能力到 B 仓（目标仓原先没有） |
| `gitnexus-refactoring` | 单套代码的结构重构 |
```

---

### Task 6: 更新 skills.manifest.json

**Files:**
- Modify: `skills.manifest.json`

- [ ] **Step 1: 替换 business-impl-unify 条目**

将现有 `business-impl-unify` JSON 块替换为：

```json
    {
      "name": "business-impl-unify",
      "description": "统一同一业务多套实现（Superpowers brainstorming 域扩展）",
      "triggers": ["统一业务实现", "多套实现", "实现分叉", "收敛实现", "business-impl-unify"],
      "requires": [
        "brainstorming",
        "writing-plans",
        "gitnexus-exploring",
        "test-driven-development",
        "subagent-driven-development",
        "verification-before-completion"
      ]
    }
```

- [ ] **Step 2: 运行 manifest 校验**

```bash
node scripts/validate-manifest.js
```

预期：PASSED

---

### Task 7: 更新 docs/dependencies.md

**Files:**
- Modify: `docs/dependencies.md`

- [ ] **Step 1: 更新依赖总览表**

在「依赖总览」表中：

- 新增行：`brainstorming` | 技能 | business-impl-unify | 设计阶段主链
- 新增行：`writing-plans` | 技能 | business-impl-unify | spec 批准后生成 plan
- 删除或修改：`creating-skills-guided` 从 business-impl-unify 使用者列移除

- [ ] **Step 2: 更新 business-impl-unify 分列**

替换为：

```markdown
### business-impl-unify

| 字段 | 依赖 |
|------|------|
| `requires` | `brainstorming`, `writing-plans`, `gitnexus-exploring`, `test-driven-development`, `subagent-driven-development`, `verification-before-completion` |

**可选（用户明确要求时）：** `creating-skills-guided`
```

- [ ] **Step 3: 在 Superpowers 插件技能列表中确认含 brainstorming、writing-plans**

在「Superpowers 插件技能」 bullet 列表追加：`writing-plans`、`subagent-driven-development`（若未列出）

---

### Task 8: 更新 docs/dev-testing.md

**Files:**
- Modify: `docs/dev-testing.md`

- [ ] **Step 1: 更新 business-impl-unify 测试行**

将表格中：

```markdown
| `business-impl-unify` | 「统一这个 monorepo 里订单的三套实现」 | 进入 Phase 1：业务域简报，不直接改代码 |
```

替换为：

```markdown
| `business-impl-unify` | 「统一这个 monorepo 里订单的三套实现」 | Announce → 读 addon → invoke brainstorming → 域澄清，不直接改代码 |
```

- [ ] **Step 2: 追加测试行**

在测试触发语表末尾追加：

```markdown
| `business-impl-unify` | 「三套登录逻辑，先出差异报告，不要改代码」 | spec 批准后停止，不 invoke writing-plans |
| `business-impl-unify` | 「收敛完帮我写个 Skill」 | 验证通过后 → creating-skills-guided（非默认） |
```

- [ ] **Step 3: 更新验证清单**

将：

```markdown
- [ ] Phase 1 会提出澄清问题，遵守 HARD-GATE（用户确认前不进入下一阶段）
```

替换为：

```markdown
- [ ] 引用 brainstorming + addon，而非「Phase 1–6」
- [ ] 澄清后、提方案前出现实现清单与差异矩阵
- [ ] spec 未批不 invoke writing-plans
- [ ] 未要求时不自动进入 creating-skills-guided
```

---

### Task 9: 更新 docs/skill-anatomy.md 参考示例

**Files:**
- Modify: `docs/skill-anatomy.md`

- [ ] **Step 1: 在参考示例表追加一行**

在「## 参考示例」表格末尾追加：

```markdown
| [business-impl-unify](../skills/business-impl-unify/SKILL.md) | extension/ | Superpowers brainstorming 域扩展（无 phases/） |
```

- [ ] **Step 2: 在 phases/ 结构说明后追加注记**

在「**规则：** phases/ 是唯一…」段落后追加一句：

```markdown
例外：`business-impl-unify` 使用 `extension/brainstorming-addon.md` 扩展 Superpowers brainstorming，不设 `phases/`。
```

---

### Task 10: 最终验证

**Files:**
- Test: `scripts/validate-skills.js`, `scripts/validate-manifest.js`

- [ ] **Step 1: 运行全部校验**

```bash
node scripts/validate-skills.js && node scripts/validate-manifest.js
```

预期：两个脚本均 PASSED，0 errors

- [ ] **Step 2: 人工 smoke 检查**

确认以下文件存在且无 broken link：

```bash
test -f skills/business-impl-unify/extension/brainstorming-addon.md
test -f skills/business-impl-unify/SKILL.md
! test -d skills/business-impl-unify/phases
grep -q 'brainstorming' skills/business-impl-unify/SKILL.md
grep -q 'writing-plans' skills.manifest.json
```

预期：全部 exit 0

---

## Plan Self-Review

| Spec 要求 | 对应 Task |
|-----------|-----------|
| 薄入口 SKILL.md | Task 2 |
| brainstorming-addon.md | Task 1 |
| 删除 phases/ | Task 3 |
| 保留 templates/ | Task 4 |
| manifest requires 更新 | Task 6 |
| creating-skills-guided 可选 | Task 1 addon + Task 7 |
| dev-testing 更新 | Task 8 |
| skill-anatomy 参考 | Task 9 |
| validate 通过 | Task 10 |

无 TBD / 占位符。
