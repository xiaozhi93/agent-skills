# Smoke — <feature-slug>

本目录**只存登录**（+ 可选测试数据）。**测什么**由 `docs/superpowers/plans/<phase-plan>.md` 的验收清单决定。

## 结构

```
smoke/
├── README.md
├── roles.md              # 角色 ↔ auth 文件
├── datasets.yaml         # 可选，非 Phase 0 生成；golden ID 自备
└── auth/
    ├── .gitignore
    ├── pc/<role>.json
    └── h5/<role>.json
```

## Auth 格式

见技能 `templates/smoke/auth-pc.example.json`、`auth-h5.example.json`。

Phase 0 kickoff：用户提供 localStorage → 写入 `auth/<platform>/<role>.json`。

## 冒烟（Phase plan 完成后）

```markdown
@docs/superpowers/plans/2026-06-30-xxx.md
@docs/requirements/<slug>/smoke/roles.md

按 feature-phase0-kickoff/phases/smoke-run.md：
从 plan 联调验收清单提取用例，注入 smoke/auth/ 后浏览器断言。
缺数据 / 须人工的单独报告。
```

## datasets.yaml（可选）

```yaml
# 冒烟时替换 plan 里的 URL 参数
sap_unify_task_id: 190
sap_store_id: 03eeecb8a6cd4c1ab5fbc177c8adc928
```

无此文件时，Agent 遇缺 ID 的验收项 → 报告「暂不能冒烟」。
