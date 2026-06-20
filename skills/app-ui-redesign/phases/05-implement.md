# Phase 5: 原仓 TDD 实现

**目标：** 在**原仓库 feature 分支**内，按已通过的设计与 TDD 纪律落地新 UI 代码。

## 前置

- Phase 4 设计审核已通过
- 读取并遵循 `test-driven-development`（**强制**）
- 多屏幕/多组件 → 读取 `writing-plans` 拆计划，再 `subagent-driven-development` 执行

## 5.1 工作区准备

1. 在原仓创建并 checkout feature 分支（Phase 1 已命名）
2. 可选：读取 `using-git-worktrees` 做隔离
3. **禁止**在 main/master 直接改 UI（除非用户明确要求）

## 5.2 技能搜索门禁

写第一行 UI 代码前：

1. 读取 `find-skills`
2. 搜索目标栈最佳实践（如 `"react native best practices"`）
3. 有高质量技能 → 读取并遵循
4. 无匹配 → `context7-mcp` 查官方文档

## 5.3 Stitch → 代码参考（可选起点）

Stitch 出码技能提供 HTML/组件参考，**不能替代 TDD**：

| 栈 | 技能 | 用途 |
|----|------|------|
| React Native | `stitch-react-native` | 拉取 screen HTML/截图，映射 StyleSheet |
| Web React | `react-components` | Vite + React 组件参考 |
| shadcn/ui | `shadcn-ui` | Tailwind + Radix 栈 |

流程：

1. 用 stitch 技能下载目标屏幕 HTML + 截图到 `.stitch/designs/`
2. **视觉 audit** 对照 Phase 4 批准稿
3. 以 DESIGN.md tokens + 映射表为准，**TDD 重写**到原仓目录结构（勿整段粘贴生成代码跳过测试）

## 5.4 TDD 纪律

<HARD-GATE>
Do NOT write production UI code before a failing test exists.

对每个行为变更：

1. **RED** — 写失败测试（组件渲染、交互、导航、无障碍）
2. **Verify RED** — 运行测试，确认因功能缺失失败
3. **GREEN** — 最小实现通过测试
4. **Verify GREEN** — 全量测试绿
5. **REFACTOR** — 对齐 DESIGN.md token 与项目惯例
</HARD-GATE>

UI 测试策略（按栈选可用工具）：

- React / RN：`@testing-library/react` / `@testing-library/react-native`
- iOS：XCTest / ViewInspector（项目已有则沿用）
- Android：Compose UI Test / Espresso

无 UI 测试框架时：先添加最小测试 harness，再写第一个失败测试。

## 5.5 多任务：子代理驱动

屏幕 ≥2 或改动跨多模块时：

1. `writing-plans` 产出实现计划（每任务含：屏幕、测试文件、源码路径、DESIGN.md 引用）
2. `subagent-driven-development` 逐任务执行：
   - Dispatch implementer（完整任务文本 + DESIGN.md 摘要 + 映射表行）
   - Spec compliance review → 必须 ✅
   - Code quality review → 必须 ✅
   - **串行** dispatch，不并行多个 implementer
3. 每任务遵守 TDD，implementer 不得跳过测试

## 5.6 实现顺序

1. 共享主题/ThemeProvider（对齐 DESIGN.md tokens）
2. 按用户旅程顺序：Login → Home → …
3. 导航串联
4. Loading / Empty / Error 态（映射表已标记的）

**纪律：**

- 只改 Phase 1 确认范围内的屏幕
- 不改后端/API（除非 UI 强依赖且用户批准）
- 样式值从 DESIGN.md 或 Stitch design system 引用，避免硬编码漂移

## 5.7 同步文档

更新或创建：

- `docs/ui-redesign/IMPLEMENTATION.md` — 已改文件、测试命令、已知限制
- 整 App — 确保 `DESIGN.md` 与实现一致

## 门禁

所有新增/变更测试通过 + 项目可构建（compile/bundle）→ Phase 6。
