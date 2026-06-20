# Phase 3: Stitch 设计

**目标：** 在 Stitch 中产出与映射表对齐的设计稿；整 App 重设计时同步产出并校验 `DESIGN.md`。

**前置：**

1. 确认 Stitch MCP（`user-stitch`）可用：`list_projects`
2. 读取 [reference/stitch-skills-map.md](../reference/stitch-skills-map.md)，按场景加载官方 stitch-skills
3. 美学方向不明确时 → 加载 `frontend-design`

## 3.1 准备 Stitch 项目

1. `list_projects` 查找目标项目；无则 `create_project`
2. 记录 `projectId` 供后续阶段使用

## 3.2 现有代码迁入 Stitch（推荐首步）

若原应用可构建（Web/React）或需从源码提取视觉语言：

| 步骤 | 技能 |
|------|------|
| 代码 → Stitch 全流程 | `stitch-code-to-design` |
| 仅源码提取 DESIGN.md（跑不起来时） | `stitch-extract-design-md` |

Web 应用：先 build，再 `stitch-extract-static-html` → 上传。

移动端（RN / 原生）：Phase 2 映射 + 参考截图/描述，用 `stitch-generate-design` 生成；必要时用户上传现有界面截图作为输入。

## 3.3 设计系统与 DESIGN.md

**整 App 重设计（必须）：**

| 路径 | 技能 | 说明 |
|------|------|------|
| 已有 Stitch 屏幕，反推规范 | `design-md` | 从 Stitch 项目生成语义化 DESIGN.md |
| 无参考，主动制定高品位规范 | `taste-design` | 反 AI 味 typography 与禁止项 |
| 应用到全项目 | `stitch-manage-design-system` | 上传并应用 DESIGN.md |

写入仓库：

- 默认：项目根 `DESIGN.md`
- 多页站点流程：`.stitch/DESIGN.md`（配合 `stitch-loop`）

校验：

```bash
npx @google/design.md lint DESIGN.md
```

规范详见 [reference/design-md.md](../reference/design-md.md)。

**部分功能重设计：** 不强制完整 DESIGN.md，但须：

- 在 Stitch 中生成/编辑对应屏幕
- 写屏幕级 spec（颜色、字体、组件约定），可追加到 `docs/ui-redesign/<screen>.md`

## 3.4 生成与编辑屏幕

对每个映射表中的屏幕：

1. **Prompt 增强** → 加载 `enhance-prompt`，润色需求
2. **生成** → 加载 `stitch-generate-design`
   - 有 design system 时：**不要**在 prompt 里重复颜色/字体（项目级已应用）
   - 无 design system 时：先完成 3.3 再生成
3. **迭代** → `edit_screens`、`generate_variants`（如 dark mode）

生成前对照 Phase 1 参考设计与 `frontend-design` 原则，避免 generic AI 默认皮。

## 3.5 产出清单

Phase 3 结束前确认：

- [ ] Stitch `projectId` 已记录
- [ ] 每个 Must 屏幕在 Stitch 中有对应 screen（`list_screens` 可核对）
- [ ] 整 App → `DESIGN.md` 已写入仓库且 lint 通过
- [ ] 关键屏幕截图已下载或可在 Phase 4 展示（`get_screen` → screenshot URL）

## 3.6 Stitch 不可用

**禁止**切换 Pencil 或其他设计工具。排查：

1. `STITCH_API_KEY` 与 MCP 配置
2. 网络：`curl -I --connect-timeout 5 https://stitch.googleapis.com`
3. Cursor MCP Reload

修复后重试 Phase 3。

## 门禁

设计产出清单全部就绪 → Phase 4。
