# Smoke Run — 按 Plan 冒烟（非 manifest）

**何时使用：** 某 Phase superpowers **plan 执行完成**、dev 可访问；或用户要求「按 plan 冒烟」。

**Announce:** "Running smoke tests from plan."

## 输入（必须 @）

1. **`docs/superpowers/plans/<YYYY-MM-DD>-<phase>.md`** — 测什么、怎么验收
2. **`docs/requirements/<slug>/smoke/roles.md`** + `smoke/auth/` — 登录
3. 可选：`docs/requirements/<slug>/smoke/datasets.yaml` — 用户自备的测试 ID（若无则运行中识别缺口）
4. 可选：`docs/superpowers/specs/<phase>-design.md` — 补充预期

## 前置

1. 从 **plan** 提取：
   - 文末「联调验收清单」/ Task 验证步骤 / 「Test plan」类段落
   - 涉及页面路径、预期文案、只读/可编辑等行为
2. 为每条验收项推断：**platform**（pc/h5）、**role**、**是否可浏览器自动化**
3. 启动 dev（plan 或子仓库 README 中的端口；未启动则启动或请用户启动）

## 分类规则（Agent 自行判断，不写 manifest）

| 类型 | 判断 | 动作 |
|------|------|------|
| **可自动** | 打开页面 + 可见性/只读状态断言 | 执行 |
| **暂不能冒烟** | 需要具体 `unifyTaskId`/门店 ID 等且 `datasets.yaml` 与对话均未提供 | 跳过，报告缺什么数据 |
| **须人工** | 外部系统触发、提交上传、批量导入、改派通知等 | 跳过，说明原因与建议步骤 |

## 登录注入（每条用例前或按 platform 切换 role 时）

1. 读 `smoke/auth/<platform>/<role>.json`
2. `goto` `origin`
3. 注入 `localStorage` / `sessionStorage`
4. `goto` 业务 URL（plan 或 spec 中的路径；用 `datasets.yaml` 替换占位符）
5. snapshot / 断言

**PC：** origin `http://localhost:8000`，路径常含 `/panasonic/...`  
**H5：** origin `http://localhost:8001`

auth 文件不存在 → 该 role 相关用例记入「缺少 auth」，提示 Phase 0 补充。

## 不要

- 不要改业务代码（仅报告失败）
- 不要为缺数据硬凑错误 URL
- 不要跳过报告中的「须人工」汇总

## 结束报告（必须）

```markdown
## Smoke 报告 — <feature-slug> — <plan 文件名>

依据：docs/superpowers/plans/…md 验收清单

### ✅ 通过 (n)
- [plan 条目] …

### ⏸ 暂不能冒烟 — 缺数据/缺 auth (n)
- [plan 条目] 需要：unifyTaskId=… → 请提供或写入 smoke/datasets.yaml

### 🧑 须人工验收 (n)
- [plan 条目] 原因：… 建议步骤：…

### ❌ 失败 (n)
- [plan 条目] 预期 … 实际 …
```

**即使全部通过**，也须列出 plan 中判定为「须人工」的项，提醒用户。

## 开场白

见 [templates/smoke-run-prompt.md](../templates/smoke-run-prompt.md)
