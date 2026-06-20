# Phase 2: 探索盘点

**目标：** 产出「实现清单」——列全同一业务域的所有实现及其入口、依赖、关系。

**前置：** Phase 1 已确认；Agent 位于相关仓库工作区。

## 探索工作流

**必须**读取并遵循 `gitnexus-exploring`（GitNexus 可用时）。不可用时：`Grep` + 语义搜索 + `Read` + 目录浏览。

### GitNexus 路径（摘要）

```
1. READ gitnexus://repos → 确认目标仓已索引
2. gitnexus_query({query: "<Phase 1 业务关键词>"}) → 相关 flows
3. gitnexus_context({name: "<关键 symbol>"}) → 调用关系
4. Read 源文件 → 确认是否为同一业务域
```

> Index stale → 在对应仓运行 `npx gitnexus analyze`。

## 盘点清单

```
- [ ] 每个实现的入口（API、组件、命令、Handler）
- [ ] 核心文件列表（≤20/套，超出分组）
- [ ] 外部依赖差异（包、配置、中间件）
- [ ] 与 Phase 1 Out of scope 的边界
- [ ] 是否遗漏 Phase 1 未列出的实现
```

## 输出实现清单

```markdown
## 实现清单

**业务域：** …
**共 N 套实现**

### 实现 #1 — {标签}

| 项 | 内容 |
|----|------|
| 位置 | `{repo}/{path}` |
| 入口 | … |
| 核心文件 | … |
| 依赖摘要 | … |

### 实现 #2 — …

### 关系图（ASCII 或 mermaid）

{各实现如何被调用、是否共享底层}

### 遗漏检查

- [ ] 与 Phase 1 简报一致
- [ ] 无未登记的同业务代码
```

## 门禁

清单完整、无遗漏疑问 → Phase 3。若发现遗漏 → 更新 Phase 1 简报并请用户确认后再继续。
