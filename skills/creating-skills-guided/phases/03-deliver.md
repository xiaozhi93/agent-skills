# Phase 3: 实施交互

**目标：** 按已批准蓝图创建技能文件，并与用户分步交互。

**参考：** `create-skill` Implementation 阶段。

## 路径规则

| 类型 | 路径 | 禁止 |
|------|------|------|
| 个人 | `~/.cursor/skills/skill-name/` | `~/.cursor/skills-cursor/` |
| 项目 | `.cursor/skills/skill-name/` | — |

## 实施顺序

1. **创建目录结构**（按蓝图）
2. **写 SKILL.md**
   - YAML frontmatter：`name` + `description`（必填）
   - 默认加 `disable-model-invocation: true`（除非需自动触发）
   - 正文：Overview → When to Use → 核心指令 → Quick Reference
   - 主文件 **<500 行**；细节放 `phases/` 或 `reference.md`
3. **写附属文件**（如有）
4. **向用户展示：**
   - frontmatter（尤其 description）
   - 目录树
   - HARD-GATE 段落（如有）
   - 询问：「草案是否符合预期？进入验证前有无修改？」

## create-skill 要点清单

- [ ] description 第三人称，含 WHAT 能力词 + WHEN 触发（但 WHEN 为主，无流程摘要）
- [ ] 术语全文一致
- [ ] 链接仅一层深度（SKILL.md → phases/x.md）
- [ ] 无 Windows 反斜杠路径
- [ ] 无时间敏感表述

## writing-skills 要点（实施时预埋）

为 Phase 4 压测预埋：

- 若有门禁 → 写 `<HARD-GATE>` 或 **Red Flags**
- 若有纪律要求 → 写 **Baseline Failures** + **Common Mistakes**
- description 绝不总结正文流程

## 交互规则

- 大改 → 先展示 diff 或关键段落，等用户回应
- 用户中途改 scope → 回流 Phase 1 或 Phase 2
- 完成草案 → 进入 Phase 4（不宣称「已部署」）
