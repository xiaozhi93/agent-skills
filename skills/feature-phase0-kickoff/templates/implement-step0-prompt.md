# 实现对话 — Step 0 + 执行开场白

Plan approve 后使用。替换 `<>` 占位符。

## 同对话 Subagent-Driven

```markdown
@docs/superpowers/plans/<plan-file>.md
@docs/requirements/<feature-slug>/roadmap.md

Plan 已 approve。方案 A（同目录切分支）。

**Step 0（Task 1 之前，每个 roadmap Git 策略表中的 repo）：**
1. git fetch && checkout master && pull
2. checkout -b feature/<slug>（或检出已有分支）
3. 报告 git branch --show-current，确认不在 master
4. 禁止在 master 上写代码

Step 0 完成后，使用 Subagent-Driven Development 执行全部 Task。
```

## 新开对话 executing-plans

```markdown
@docs/superpowers/plans/<plan-file>.md
@docs/superpowers/specs/<spec-file>.md
@docs/requirements/<feature-slug>/roadmap.md

使用 executing-plans skill。方案 A（同目录切分支）。

先完成 Step 0（见 roadmap Git 策略表），再按 Task 顺序实现。
Task <N> 完成后停下来 review。
```
