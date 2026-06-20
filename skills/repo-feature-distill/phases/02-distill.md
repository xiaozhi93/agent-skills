# Phase 2: 蒸馏源仓库

**目标：** 产出「蒸馏报告」——架构模式、目录结构、核心流程、关键依赖。

**前置：** Phase 1 功能边界简报已确认；Agent 位于源仓库工作区（或可读源仓路径）。

## 探索工作流

优先 GitNexus；不可用时降级为 `Grep` + `Read` + 目录浏览。

### GitNexus 路径

```
1. READ gitnexus://repos                              → 确认源仓已索引
2. READ gitnexus://repo/{name}/context                → 概览，检查 staleness
3. gitnexus_query({query: "<Phase 1 功能关键词>"})     → 相关 execution flows
4. gitnexus_context({name: "<关键 symbol>"})           → 调用关系
5. READ gitnexus://repo/{name}/process/{name}         → 完整执行 trace
6. Read 源文件                                        → 实现细节
```

> Index stale → 在源仓目录运行 `npx gitnexus analyze`。

### 蒸馏清单

```
- [ ] 定位功能入口（路由、CLI、导出函数、主组件）
- [ ] 识别设计模式（分层、DI、策略、工厂、中间件等）
- [ ] 列出核心文件及职责（≤15 个，超出则分组）
- [ ] 追踪主流程（请求/事件 → 处理 → 输出）
- [ ] 记录外部依赖（包、服务、配置项）
- [ ] 标注与 Phase 1 Out of scope 无关的代码（不蒸馏）
```

## 输出蒸馏报告

```markdown
## 蒸馏报告

**功能：** …
**源仓库：** `{path}`

### 架构摘要

{2-4 句：分层结构、模块边界、核心抽象}

### 设计模式

| 模式 | 位置 | 作用 |
|------|------|------|
| … | `{path}` | … |

### 核心文件

| 路径 | 职责 | 优先级 |
|------|------|--------|
| `{path}` | … | P0 / P1 |

### 主流程

{编号步骤或 mermaid sequenceDiagram}

1. …
2. …

### 依赖清单

| 依赖 | 用途 | 可替代性 |
|------|------|----------|
| … | … | 必须 / 可替换 |

### 关键代码片段

{仅摘录不可替代的核心逻辑，附路径与行号引用；不全文复制}

### 待确认
- [ ] 蒸馏范围是否完整？有无遗漏？
```

## Canvas 要求

蒸馏完成后，**在 Phase 3 前**准备好架构可视化素材（模块关系图、主流程图）。Phase 2 可先用 mermaid 草稿，Phase 3 正式输出 Canvas。

## 门禁

用户明确确认蒸馏报告后 → Phase 3。

**禁止：**

- 未读源码就臆造文件路径
- 蒸馏范围超出 Phase 1 In scope
- 跳过 GitNexus 直接通读全仓（除非 GitNexus 不可用）
