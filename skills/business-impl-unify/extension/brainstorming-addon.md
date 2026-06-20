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

```markdown
## 业务域简报

**业务域：** …
**范围：** 单仓 `{path}` / 跨仓 `{A}` + `{B}`
**已知实现（草案）：**
| # | 位置 | 负责人/来源 | 备注 |
|---|------|-------------|------|
| 1 | … | … | … |

**Canonical 倾向：** 中立对比 / 以 #{n} 为基准演进
**成功标准：** …
**Out of scope：** …
```

<HARD-GATE>
Do NOT proceed to Inventory until the user explicitly approves the business domain brief.
</HARD-GATE>

## Inventory（澄清后、提方案前）

**必须**遵循 `gitnexus-exploring`（可用时）。不可用时：`Grep` + 语义搜索 + `Read`。

### GitNexus 路径

```
1. READ gitnexus://repos → 确认目标仓已索引
2. gitnexus_query({query: "<业务关键词>"})
3. gitnexus_context({name: "<关键 symbol>"})
4. Read 源文件 → 确认同一业务域
```

### 盘点清单

- [ ] 每套实现的入口（API、组件、Handler）
- [ ] 核心文件（≤20/套）
- [ ] 外部依赖差异
- [ ] 与 out of scope 边界一致
- [ ] 无遗漏的同业务代码

### 实现清单格式（写入 spec §2）

```markdown
## 实现清单

**业务域：** …
**共 N 套实现**

### 实现 #1 — {标签}
| 项 | 内容 |
|----|------|
| 位置 | `{repo}/{path}` |
| 入口 | … |
| 核心文件 | … |
| 依赖摘要 | … |

### 关系图
{ASCII 或 mermaid}

### 遗漏检查
- [ ] 与业务域简报一致
```

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

```markdown
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
```

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
