# 外部依赖

本仓库的 4 个技能在运行时依赖以下**外部**技能与 MCP 服务。这些依赖**不会**随 `npx skills add` 自动安装，使用前请单独配置。

依赖关系来自 [`skills.manifest.json`](../skills.manifest.json) 中的 `requires` 与 `requires_mcp` 字段。

---

## 依赖总览

| 外部依赖 | 类型 | 使用者 | 用途 |
|----------|------|--------|------|
| `find-skills` | 技能 | app-distill | Phase 4 搜索并加载技术栈最佳实践技能 |
| `gitnexus-exploring` | 技能 | app-distill, app-ui-redesign, repo-feature-distill | 结构化探索源码、追踪执行流 |
| `verification-before-completion` | 技能 | 全部 4 个技能 | 完成前运行验证命令，证据先于断言 |
| `frontend-design` | 技能 | app-ui-redesign | UI 美学与设计方向指导 |
| `test-driven-development` | 技能 | app-ui-redesign | 实现阶段遵循 TDD 红绿重构 |
| `brainstorming` | 技能 | app-ui-redesign | 创意设计前探索方案与需求 |
| `user-stitch` | MCP | app-ui-redesign | Google Stitch 设计生成与 DESIGN.md 管理 |

---

## 按技能分列

### app-distill

| 字段 | 依赖 |
|------|------|
| `requires` | `find-skills`, `gitnexus-exploring`, `verification-before-completion` |

### app-ui-redesign

| 字段 | 依赖 |
|------|------|
| `requires` | `gitnexus-exploring`, `frontend-design`, `test-driven-development`, `verification-before-completion`, `brainstorming` |
| `requires_mcp` | `user-stitch` |

### conversation-to-article

| 字段 | 依赖 |
|------|------|
| `requires` | `verification-before-completion` |

### repo-feature-distill

| 字段 | 依赖 |
|------|------|
| `requires` | `gitnexus-exploring`, `verification-before-completion` |

---

## 安装说明

### Superpowers 插件技能

以下技能通常随 Cursor **Superpowers** 插件提供：

- `verification-before-completion`
- `test-driven-development`
- `brainstorming`

确保 Cursor 已启用 Superpowers 插件，或在对话中通过 `find-skills` 搜索安装。

### GitNexus 技能

- `gitnexus-exploring` — 通常位于 `~/.agents/skills/gitnexus-exploring/`
- 需安装 [GitNexus](https://github.com/...) CLI 并配置 MCP（`user-gitnexus`）以获得完整能力

### find-skills

- 位于 `~/.agents/skills/find-skills/`
- 用于发现与安装其他 Agent Skill
- `app-distill` Phase 4 依赖此技能搜索技术栈最佳实践

### frontend-design

- 通常位于 `~/.agents/skills/frontend-design/`
- 提供 UI 设计美学与反模式指导

### Stitch MCP（user-stitch）

`app-ui-redesign` 的设计阶段需要 Google Stitch MCP：

1. 在 Cursor Settings → MCP 中配置 `user-stitch` 服务器
2. 确保 Agent 可调用 Stitch 相关工具（生成设计、管理 DESIGN.md 等）
3. 未配置 MCP 时，技能会降级为纯代码层 UI 改造，无法使用 Stitch 设计流程

---

## find-skills 集成说明

`find-skills` 技能（本地配置，不在本仓库）包含 **Personal Skills Registry** 章节，指向本仓库 manifest。当用户触发词匹配 manifest 中的 `triggers` 时，`find-skills` 会给出 `npx skills add` 安装命令，并提示上述外部依赖需单独安装。

Manifest raw URL（供 find-skills 或脚本读取）：

```
https://raw.githubusercontent.com/xiaozhi93/agent-skills/main/skills.manifest.json
```

---

## 缺失依赖时的表现

| 缺失依赖 | 可能影响 |
|----------|----------|
| `gitnexus-exploring` | 探索阶段退化为通用代码搜索，深度分析能力下降 |
| `find-skills` | app-distill 无法自动加载技术栈最佳实践技能 |
| `verification-before-completion` | Agent 可能在未运行测试/构建的情况下宣告完成 |
| `user-stitch` | app-ui-redesign 无法使用 Stitch 设计生成流程 |
| `frontend-design` / `brainstorming` / `test-driven-development` | app-ui-redesign 设计质量与 TDD 流程不完整 |

建议在安装本仓库技能后，对照上表补齐依赖，再用 [dev-testing.md](dev-testing.md) 验证完整流程。
