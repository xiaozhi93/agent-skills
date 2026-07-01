# 冒烟测试 — 开场白（基于 Plan）

```markdown
@docs/superpowers/plans/<YYYY-MM-DD>-<phase-name>.md
@docs/superpowers/specs/<YYYY-MM-DD>-<phase-name>-design.md
@docs/requirements/<feature-slug>/smoke/roles.md
@docs/requirements/<feature-slug>/smoke/datasets.yaml

按 feature-phase0-kickoff/phases/smoke-run.md 执行冒烟：
- 验收项来自 plan（联调清单 / Task 验证），不要另建 manifest
- 登录从 smoke/auth/ 注入浏览器
- 缺测试数据 → 报告「暂不能冒烟」并说明需要什么
- 外部系统/提交上传等 → 报告「须人工」
- 结束输出完整 Smoke 报告
```
