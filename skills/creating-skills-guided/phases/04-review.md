# Phase 4: 验证

**目标：** 文档质量 + 行为合规双重验证，通过后才可部署。

**参考：** `create-skill` Verification + `writing-skills` RED-GREEN-REFACTOR。

## A. 文档验证（create-skill）

| # | 检查项 |
|---|--------|
| A1 | `name` 合法，与目录名一致 |
| A2 | `description` ≤1024 字符，以 `Use when` 为导向 |
| A3 | description **无** workflow/流程摘要 |
| A4 | SKILL.md <500 行 |
| A5 | 术语一致，无矛盾 |
| A6 | 引用文件存在且一层深度 |
| A7 | 路径未使用 `skills-cursor/` |

## B. CSO 验证（writing-skills）

| # | 检查项 |
|---|--------|
| B1 | 触发词覆盖用户说的场景 |
| B2 | 中文关键词已纳入 description（如需要） |
| B3 | 正文含 Agent 可能跳过的关键细节（门禁、表格） |
| B4 | 无 narrative one-off 故事 |

## C. 行为验证（writing-skills 压测）

至少设计 **2 个压力场景**，自问 Agent 无技能时会如何违规：

| 场景类型 | 示例 |
|----------|------|
| 跳过门禁 | 「需求很清楚，直接写文件」 |
| 省步骤 | 「description 里写清流程就行」 |
| 批量偷懒 | 「顺便再建两个技能」 |

对每个场景确认技能正文是否已封堵：

- [ ] 有 HARD-GATE / Red Flags
- [ ] 有 Baseline Failures 或 Common Mistakes
- [ ] 有明确回流规则

**若尚未真实跑 subagent 压测：** 在验证报告中标注「待补压测」，并列出场景草案；用户要求严格 TDD 时，先跑 RED 再部署。

## D. 意图符合度

对照 Phase 1 简报 + Phase 2 蓝图逐项勾选。

## 输出验证报告

```markdown
## 验证报告

### 文档验证 A1–A7
…

### CSO 验证 B1–B4
…

### 行为验证 C
场景 1：… → 封堵方式：…
场景 2：… → 封堵方式：…

### 处置
- [ ] 全部通过 → Phase 5
- [ ] 结构问题 → 回流 Phase 2
- [ ] 内容/行为 → 回流 Phase 3
```

## 门禁

全部必检项 ✅ 后 → Phase 5。关键项 ❌ 禁止部署。
