# Step 3.5: Smoke — 登录 fixture 目录

**目标：** 创建 `smoke/` 最小骨架；将用户提供的角色登录按平台写入 `auth/`。

**不测什么、不测哪些项** — 由 Phase N 完成后的 **`docs/superpowers/plans/<phase-plan>.md`** 决定（联调验收清单 / Task 验证步骤）。本步只解决 **登录**（及可选 **datasets**）。

在 [03-scaffold.md](03-scaffold.md) 生成 roadmap 后、handoff 前执行。

## 3.5.1 创建目录

```
docs/requirements/<slug>/smoke/
├── README.md
├── roles.md
└── auth/
    ├── .gitignore
    ├── pc/
    └── h5/
```

从 [templates/smoke/](../templates/smoke/) 复制 `README.md`、`roles.md` 与 `auth/.gitignore`。

**不要**创建 `manifest.yaml`、`manual.md`。

可选（用户日后自加，Phase 0 不生成）：`datasets.yaml` — 存放 `unifyTaskId` 等 golden 数据，供冒烟时替换 plan 里的 URL。

## 3.5.2 收集登录信息

用户在 Phase 0 可能提供：

- 「PC 管理员：{...localStorage...}」
- 「H5 门店执行人：{...}」

**一次一问（若未提供）：** 冒烟需要哪些角色？请提供 dev 环境下 PC（8000）/ H5（8001）的 localStorage。

## 3.5.3 解析并保存

1. **platform**：`pc` | `h5`
2. **role-slug**：`admin`、`store-executor` 等（kebab-case）
3. 写入 `smoke/auth/<platform>/<role-slug>.json`

```json
{
  "role": "admin",
  "roleLabel": "管理员",
  "platform": "pc",
  "origin": "http://localhost:8000",
  "user": "<从 USERINFO/mobile 提取>",
  "localStorage": { },
  "sessionStorage": { }
}
```

4. 更新 `smoke/roles.md`

<HARD-GATE>
Do NOT commit `auth/**/*.json`（含 token）。确认 `auth/.gitignore` 已就位。
</HARD-GATE>

## 3.5.4 roadmap 联动

Phase 块引用 **plan**，不引用 manifest：

```markdown
- **Smoke:** 见 `docs/superpowers/plans/<phase-plan>.md` 联调/验收清单；登录 `smoke/auth/`
```

`roadmap.md` 的 **Spec / Plan 索引** 已有 plan 路径即可。

## 3.5.5 输出摘要

```markdown
## Smoke 登录就绪 — <feature-slug>

| 平台 | 角色 | auth 文件 | 状态 |
|------|------|-----------|------|
| pc | admin | auth/pc/admin.json | ✅ / ⏳ 待提供 |

**测什么：** Phase N 完成后 @ 对应 plan，按 plan 验收步骤冒烟（见 phases/smoke-run.md）。
```
