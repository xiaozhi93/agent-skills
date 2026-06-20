# Phase 6: 验证

**目标：** 用证据确认新 UI 可构建、测试通过、与 Stitch 设计一致，再宣告完成。

**前置：** 读取并遵循 `verification-before-completion`。

## 验证清单

### 6.1 构建与测试

| 检查 | 命令示例 | 要求 |
|------|----------|------|
| 单元/UI 测试 | `npm test` / `./gradlew test` / `xcodebuild test` | 全绿 |
| 构建 | `npm run build` / `./gradlew assemble` | 成功 |
| Lint（若项目有） | 项目惯例命令 | 无新增错误 |

**禁止**在未运行命令的情况下声称「测试通过」。

### 6.2 设计一致性

- [ ] Must 屏幕均已实现
- [ ] 主色、字体、圆角与 `DESIGN.md`（或屏幕 spec）一致
- [ ] 对照 Stitch 截图：布局与关键组件无遗漏
- [ ] Phase 1 参考设计意图已体现

有浏览器/模拟器时：运行应用并对照 Stitch 截图做视觉检查。

### 6.3 范围符合度

对照 Phase 1 简报：

- [ ] 仅改动确认范围内的屏幕
- [ ] 未引入未请求的 backend/功能
- [ ] feature 分支可提交/PR

### 6.4 产出验证报告

```markdown
## UI 重设计验证报告

**分支：** ui-redesign/xxx
**Stitch 项目：** projects/xxx

### 构建/测试
- 命令：…
- 结果：✅ / ❌

### 设计一致性
- 屏幕覆盖：…
- DESIGN.md lint：✅ / N/A

### 范围
- 已实现：…
- 已知限制：…

### 结论
- [ ] 通过，可合并/PR
- [ ] 需回流 Phase 5
```

## 门禁

全部必检项 ✅ → 完成。任一项 ❌ → 回流 Phase 5，修复后重新验证。

## 完成后

可选：读取 `finishing-a-development-branch` 引导合并/PR/清理。
