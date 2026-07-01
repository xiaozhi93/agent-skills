# Step 1: Intake — 收集与清点

**目标：** 弄清 feature 边界，列出所有待归集资源，确定 `feature-slug`。

## 1.1 一次一问（未澄清时）

按顺序提问，**每次只问一个**：

1. Feature 名称 / slug 草案？
2. 涉及哪些平台/仓库？（PC / H5 / 主应用 / 后端文档）
3. PRD 主文件路径？（或用户粘贴）
4. 是否还有未 @ 的散落资源目录？

已答项跳过。

## 1.2 扫描范围

1. 用户 `@` 的所有文件与目录
2. 仓库内常见位置（见 [reference.md](../reference.md)）
3. PRD 内图片引用：外链 URL 或仓库内相对 path（标准 Markdown 图片语法）
4. 外链（AliDocs、语雀 OSS 等）— 标记为「需下载到 assets/」

## 1.3 输出资源清单

```markdown
## 资源清单 — <feature-slug>

**Feature slug（草案）：** `YYYY-MM-DD-<name>`
**平台/仓库：** …

### 待归集文件

| # | 源路径 | 类型 | 建议目标 | 备注 |
|---|--------|------|----------|------|
| 1 | docs/xxx.md | PRD | prd.md | 主需求 |
| 2 | docs/foo.png | 截图 | assets/pc-xxx-list.png | |
| 3 | docs/frontend-api.md §X | API | api.md | 需拆分章节 |

### 外链待下载

| # | URL | 建议文件名 | PRD 章节 |
|---|-----|-----------|----------|

### 共享/例外（不移动）

| 源路径 | 原因 | 处理方式 |
|--------|------|----------|

### 待用户确认
- [ ] feature-slug 是否正确？
- [ ] 清单是否完整？
```

## 1.4 门禁

用户确认清单完整、slug 正确 → 进入 [02-migrate.md](02-migrate.md)。

**禁止**在未完成清单前创建 `docs/requirements/` 目录或移动文件。
