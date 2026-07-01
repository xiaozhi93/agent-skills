# Step 3: Scaffold — 生成 Phase 0 文档

**目标：** 在迁移完成后，规范化 `prd.md`、生成 `roadmap.md` 与 `assets/README.md`。

## 3.1 规范化 prd.md

1. 统一标题层级、表格格式
2. 所有本地图片链接改为相对路径：`assets/pc-xxx.png`
3. 已下载的外链替换为相对路径；未下载的保留 URL 并标注
4. 文首增加元信息块：

```markdown
---
feature: <feature-slug>
platforms: [panasonic, digital-mobile-h5, cool-front-micro-base]
requirements_root: docs/requirements/<feature-slug>/
---
```

5. **不**在 PRD 内写实现细节（组件名、文件路径）— 留给 spec

## 3.2 生成 assets/README.md

使用 [templates/assets-readme.md](../templates/assets-readme.md)。

- 每张 `assets/` 下图片一行
- 必填：PRD 章节、用于 Phase、说明
- `00-flow-main.png` 标注 `Phase 0`

## 3.3 生成 roadmap.md

使用 [templates/roadmap.md](../templates/roadmap.md)。

**Phase 0 分析输入（仅这些）：**

- `prd.md` 全文（文字）
- `assets/00-flow-main.png`（若有）
- `assets/README.md`
- `api.md` 目录/章节标题（不必全文）

**禁止**在生成 roadmap 时 @ 全部页面截图。

### Phase 划分原则

1. 每 Phase **可独立验收**、可独立 commit
2. 按平台/仓库边界切（PC / H5 / 主应用）优先于按页面切
3. 共享逻辑（工具函数、API 契约）单独成 Phase 0.5 或 Phase 1，若足够小可并入首个实现 Phase
4. 联调/冒烟单独最后一 Phase，**不在 Phase 0 执行**

### 每个 Phase 必须填写

见 [reference.md](../reference.md) — roadmap Phase 条目必填字段。

### Git 策略表（方案 A）

从 [templates/git-strategy.md](../templates/git-strategy.md) 写入 `roadmap.md` 的 **Git 策略** 节：

- 根据 roadmap 各 Phase 的 **Repos** 列，只列出会改代码的仓库
- 分支名：`feature/<feature-slug>`（与 requirements 目录 slug 一致）
- 初始 **状态** 均为「待创建」；实现 Step 0 完成后改为「已检出」

## 3.4 输出 roadmap 摘要供确认

```markdown
## Roadmap 摘要 — 请确认

| Phase | 名称 | 仓库 | 视觉参考数 | 依赖 |
|-------|------|------|-----------|------|
| 1 | … | panasonic | 2 | — |
| 2 | … | digital-mobile-h5 | 1 | Phase 1 API |

完整文件：`docs/requirements/<slug>/roadmap.md`

---
回复「确认 roadmap」进入 handoff；需调整请说明 Phase 编号与修改点。
```

<HARD-GATE>
用户确认 roadmap 后 → 进入 [04-handoff.md](04-handoff.md)。
</HARD-GATE>
