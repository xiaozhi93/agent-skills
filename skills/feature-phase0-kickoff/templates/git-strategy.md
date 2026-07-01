# Git 策略 — 方案 A（同目录切分支）

> 写入 `roadmap.md`，Phase 0 handoff 时根据涉及仓库预填；实现 Phase 开始前用户确认。

**策略：** 方案 A — 在各子仓库目录内 `git checkout -b feature/<slug>`，不使用 worktree。

**Base 分支：** `master`（若仓库默认分支为 `main` 则改为 `main`）

| Repo | Branch | Base | 状态 | 备注 |
|------|--------|------|------|------|
| `panasonic` | `feature/<feature-slug>` | master | 待创建 | PC 改动 |
| `digital-mobile-h5` | `feature/<feature-slug>` | master | 待创建 | H5 改动 |
| `cool-front-micro-base` | `feature/<feature-slug>` | master | 待创建 | 路由/通知 |
| — | — | — | — | 未涉及的 repo 删行 |

**命名：** `<feature-slug>` 与 requirements 目录一致，如 `sap-reimbursement` → `feature/sap-reimbursement`。H5 仓库若习惯 `feat/` 前缀可写 `feat/<feature-slug>`，但同一需求各仓库 slug 须对齐。

## Step 0 命令（Plan 执行前，Agent 对每个「状态=待创建」的 repo 执行）

```bash
cd <repo>
git fetch origin
git checkout master && git pull origin master
git checkout -b feature/<feature-slug>   # 已存在则 checkout + pull
git branch --show-current
git status -sb
```

**门禁：** 报告各 repo 当前分支，全部不在 master/main 后才开始 Task 1。
