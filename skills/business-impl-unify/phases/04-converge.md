# Phase 4: TDD 收敛（子代理驱动）

**目标：** 按 Phase 3 批准的迁移步骤，将多套实现收敛为一套（或共享内核 + 薄适配层）。

**前置：** Phase 3 统一标准 + 迁移步骤计划已用户确认。

## 执行模式选择

| 条件 | 模式 |
|------|------|
| 迁移步骤 ≥ 2 | **必须** `subagent-driven-development` |
| 仅 1 步且 ≤3 文件 | 主会话 inline + `test-driven-development` |

## 强制遵循（所有模式）

**必须**读取并遵循 `test-driven-development`：

1. 为 canonical 行为写/补测试（或 characterization tests）
2. 小步重构，每步测试绿
3. 删除或 deprecated 冗余实现
4. 跨仓时分别在对应仓提交，保持各仓风格

## 子代理驱动（≥2 步时 mandatory）

**必须**读取并遵循 `subagent-driven-development`：

### 主会话（协调者）职责

1. Announce：`Using subagent-driven-development for business-impl-unify Phase 4.`
2. 从 Phase 3 迁移步骤表提取**每步完整 spec**（禁止让子代理自行读计划文件）
3. `TodoWrite` 跟踪全部步骤状态
4. **逐步**派发子代理——禁止并行派发多个 implementer
5. 每步完成后：spec 合规 review → code quality review（见 subagent 技能）
6. 汇报分支状态、已完成步骤、下一步；**询问用户**是否先 commit 再继续（除非用户已指定 batch 策略）

### 每步子代理职责

- 隔离上下文，只执行当前步骤
- TDD 实现 + 自审
- 返回：变更摘要、测试结果、DONE / BLOCKED / NEEDS_CONTEXT

### 禁止

- 主会话一口气改完所有迁移步骤
- 跳过 spec / quality 两阶段 review
- 未标记当前步骤完成就进入下一步

## 收敛原则

| 原则 | 说明 |
|------|------|
| 行为对等 | 对外行为与批准标准一致，不悄悄改语义 |
| 代码适配 | 遵循目标仓命名、分层、依赖惯例 |
| 禁止盲拷 | 不整文件复制粘贴跨仓/跨模块 |
| 小步可审 | 每步/每 commit 可独立 review |

## 产出

- 每步：变更文件列表 + 与 Phase 3 标准的对应关系
- 全部步骤完成后：汇总变更说明

## 门禁

全部迁移步骤完成且可测 → Phase 5。

若发现 Phase 3 标准不可行 → 回流 Phase 3，**不**擅自扩大 scope。
