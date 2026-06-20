# 示例

## 触发语

| 场景 | 用户说 |
|------|--------|
| 单仓 | 「这个 monorepo 里订单有三套实现，统一一下」 |
| 跨仓 | 「A 项目和 B 项目的登录逻辑不一样，维护太贵，收敛成一套标准」 |
| 带 Skill | 「统一支付实现，最后帮我写个 Skill 给团队用」 |

## 预期 Phase 1 简报片段

**业务域：** 用户登录  
**范围：** 单仓 `apps/web` + `apps/mobile` + `services/auth`  
**成功标准：** 共享 `packages/auth-core`，两套客户端只保留 UI 适配层  

## 多步迁移示例（Phase 3 → 4）

Phase 3 产出步骤表：

| 步骤 | 内容 | 状态 |
|------|------|------|
| 1 | 注册表 + dashboard/message-center | 待做 |
| 2 | 移址 → BizShell B 类 | 待做 |
| … | … | … |
| N | 配套 Skill（Phase 6） | 待做 |

Phase 4：**必须** `subagent-driven-development` — 主会话协调，每步 fresh subagent + 两阶段 review；禁止主会话一口气改完。

## 与相近技能的分工

| 技能 | 何时用 |
|------|--------|
| `business-impl-unify` | 同一业务多套实现 → 合并为标准 |
| `repo-feature-distill` | 从 A 仓复制能力到 B 仓（目标仓原先没有） |
| `gitnexus-refactoring` | 单套代码的结构重构，非「多套同类业务」 |
