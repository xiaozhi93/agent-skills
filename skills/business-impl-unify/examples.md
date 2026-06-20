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

## 与相近技能的分工

| 技能 | 何时用 |
|------|--------|
| `business-impl-unify` | 同一业务多套实现 → 合并为标准 |
| `repo-feature-distill` | 从 A 仓复制能力到 B 仓（目标仓原先没有） |
| `gitnexus-refactoring` | 单套代码的结构重构，非「多套同类业务」 |
