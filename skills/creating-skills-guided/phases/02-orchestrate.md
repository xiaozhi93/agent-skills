# Phase 2: 编排技能结构

**目标：** 产出「结构蓝图」——目录、模块划分、frontmatter 草案、附属文件计划。

**参考：** `create-skill` Design 阶段 + 渐进披露原则。

## 步骤

### 2.1 定名与 description 草案

- `name`：kebab-case，≤64 字符，仅字母数字连字符
- `description`：**只写 WHEN，不写 workflow**（`writing-skills` CSO 铁律）
  - 以 `Use when` 开头
  - 含触发症状、关键词（含中文触发词如需要）
  - ≤500 字符为佳

```yaml
# ✅ 示例
description: Use when the user mentions X or needs Y, before doing Z.

# ❌ 禁止：流程摘要
description: Use when creating skills - first clarify, then orchestrate, then write files
```

### 2.2 选结构模式

| 模式 | 目录示例 | 适用 |
|------|----------|------|
| 自包含 | `SKILL.md` only | 简单技巧，<200 行 |
| 多阶段 | `SKILL.md` + `phases/*.md` | 有门禁的工作流 |
| 重参考 | `SKILL.md` + `reference.md` | API/长文档 |
| 带工具 | `SKILL.md` + `scripts/` | 需可执行校验 |

### 2.3 输出结构蓝图

```markdown
## 结构蓝图

**目录：**
skill-name/
├── SKILL.md
├── phases/          # 如有
│   ├── 01-….md
│   └── …
└── examples.md      # 如有

**SKILL.md 章节：**
1. Overview
2. When to Use / When NOT
3. [核心模式或 Execution Spine]
4. Quick Reference
5. Common Mistakes
6. Red Flags（如有门禁）

**Frontmatter 草案：**
（贴 YAML）

**category / tags（可选）：** 见 SKILL-TAXONOMY.md

**预计 SKILL.md 行数：** <500

### 待确认
- [ ] 结构与 description 是否批准？
```

## 门禁

用户明确批准后 → Phase 3。**未批准前禁止创建任何文件。**
