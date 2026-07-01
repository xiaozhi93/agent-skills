# Step 2: Migrate — 迁移归集

**目标：** 将所有资源**移动**到 `docs/requirements/<feature-slug>/`，原路径**不留副本**。

## 2.1 输出迁移清单

在 Step 1 清单基础上，补充精确目标路径：

```markdown
## 迁移清单 — 请确认

**目标根目录：** `docs/requirements/<feature-slug>/`

| # | 源路径 | 目标路径 | 操作 |
|---|--------|----------|------|
| 1 | docs/【松下】报销单.md | docs/requirements/.../prd.md | git mv + 规范化 |
| 2 | docs/image.png | docs/requirements/.../assets/pc-xxx.png | git mv + 重命名 |
| 3 | docs/frontend-api.md L100-200 | docs/requirements/.../api.md | 提取后删原章节 |

**将删除的原路径（迁移后）：**
- docs/【松下】报销单.md
- docs/image.png

**外链下载：**
- [ ] https://alidocs.../xxx.png → assets/00-flow-main.png

---
回复「确认迁移」后执行。如需保留某项在原处，请说明编号。
```

<HARD-GATE>
用户明确回复「确认迁移」或等价确认后，方可执行移动/删除/下载。
</HARD-GATE>

## 2.2 执行顺序

1. **创建目标目录**（若不存在）
   ```
   docs/requirements/<feature-slug>/
   docs/requirements/<feature-slug>/assets/
   ```

2. **Git 仓库内** — 优先 `git mv`：
   ```bash
   git mv "docs/old-prd.md" "docs/requirements/<slug>/prd.md"
   ```

3. **重命名** — 按 [reference.md](../reference.md) 命名规范

4. **API 拆分** — 从全局 `frontend-api.md` 提取本需求章节到 `api.md`，**从原文件删除已迁章节**；更新其他 feature 若曾引用该章节 → 记入 `MIGRATION.md` 的「引用修复待办」

5. **外链图片** — 下载到 `assets/`：
   ```bash
   curl -L "<url>" -o "docs/requirements/<slug>/assets/<name>.png"
   ```
   失败则在 `assets/README.md` 标注 `⚠️ 下载失败，需手动`，保留 URL 于 `MIGRATION.md`

6. **清理** — 确认原路径无残留；删除因此变空的目录

7. **禁止** `cp` 留备份（用户明确要求例外时须在 `MIGRATION.md` 记录）

## 2.3 写入 MIGRATION.md

```markdown
# Migration Record — <feature-slug>

**Date:** YYYY-MM-DD
**Operator:** Agent + User confirmed

## Moved

| 源路径 | 目标路径 | 方式 |
|--------|----------|------|

## Downloaded (external)

| URL | 目标路径 |
|-----|----------|

## Deleted / Removed from source

| 路径 | 说明 |
|------|------|

## Exceptions (not moved)

| 路径 | 原因 |

## Reference fix TODO

| 文件 | 旧引用 | 新引用 | 状态 |
|------|--------|--------|------|
```

## 2.4 门禁

- 所有清单项执行完毕
- 原路径抽查无副本（共享例外除外）
- `MIGRATION.md` 已写入

→ 进入 [03-scaffold.md](03-scaffold.md)
