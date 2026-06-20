# DESIGN.md 规范摘要

本技能整 App 重设计时使用的格式。完整规范：[google-labs-code/design.md](https://github.com/google-labs-code/design.md)

Stitch 官方技能：`design-md`（从 Stitch 反推）、`taste-design`（主动制定）。

## 文件结构

```markdown
---
version: alpha
name: My App
colors:
  primary: "#1A73E8"
  …
typography:
  …
spacing:
  …
rounded:
  …
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    …
---

## Overview
…

## Colors
…

## Typography
…

## Layout
…

## Elevation & Depth
…

## Shapes
…

## Components
…

## Do's and Don'ts
…
```

## 两层分工

| 层 | 格式 | 作用 |
|----|------|------|
| YAML front matter | 机器可读 token | Agent/Stitch 精确取值 |
| Markdown 正文 | 设计 rationale | 解释为何、何时用 |

## 章节顺序

存在的 `##` 章节须按此顺序：Overview → Colors → Typography → Layout → Elevation & Depth → Shapes → Components → Do's and Don'ts。

## 校验与导出

```bash
# 格式与 WCAG 对比度
npx @google/design.md lint DESIGN.md

# 导出 Tailwind（可选）
npx @google/design.md export --format tailwind DESIGN.md
```

lint 失败 → 修复后再进入 Phase 4 审核。

## 仓库位置

| 场景 | 路径 |
|------|------|
| 标准整 App | 项目根 `DESIGN.md` |
| stitch-loop 多页 | `.stitch/DESIGN.md` |

## 与 Stitch 同步

生成或更新 `DESIGN.md` 后，用 `stitch-manage-design-system` 上传到 Stitch 项目，保证后续 `generate_screen_from_text` 自动应用 token。

## 组件 token 属性

合法属性：`backgroundColor`, `textColor`, `typography`, `rounded`, `padding`, `size`, `height`, `width`。

Token 引用：`{colors.primary}`
