# Phase 4: 设计审核

**目标：** 获得用户对 Stitch 设计与 DESIGN.md 的**明确书面批准**，方可进入实现。

## 步骤

### 4.1 准备审核材料

向用户展示：

1. **Stitch 项目链接/ID** 与屏幕列表
2. **关键屏幕截图**（从 `get_screen` 的 `screenshot.downloadUrl` 或本地 `.stitch/designs/`）
3. **DESIGN.md 摘要**（整 App）：主色、字体、圆角、Do's and Don'ts 要点
4. **部分重设计**：各屏幕 spec 或对比说明（旧 vs 新意图）

### 4.2 结构化审核问题

```markdown
## 设计审核

**Stitch 项目：** projects/xxx
**屏幕：** Login, Home, Settings
**DESIGN.md：** 已提交 / 不适用（部分重设计）

### 请确认
1. 整体风格是否符合预期？
2. 各 Must 屏幕是否齐全？
3. 是否有必须修改项？（列出屏幕 + 修改说明）

### 待确认
- [ ] 设计通过，可以开始实现
- [ ] 需要修改（请说明）
```

### 4.3 处理反馈

| 用户回复 | 动作 |
|----------|------|
| 「通过 / 确认 / 可以写代码」 | 记录审核通过 → Phase 5 |
| 具体修改意见 | 回 Phase 3，用 `edit_screens` 或 `stitch-generate-design` 修改 |
| 「大改方向」 | 回 Phase 1 更新简报 |

### 4.4 记录审核结果

在仓库写入 `docs/ui-redesign/REVIEW.md`（或对话中明确记录）：

```markdown
## 设计审核记录

- **日期：** …
- **结果：** 通过 / 驳回
- **Stitch projectId：** …
- **批准屏幕：** Login, Home, …
- **备注：** …
```

## 门禁

<HARD-GATE>
Do NOT enter Phase 5 unless the user explicitly approves the design
（「通过」「确认」「可以开始实现」等明确表述）。
「差不多」「先做着看」不算通过。
</HARD-GATE>
