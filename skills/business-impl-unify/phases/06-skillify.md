# Phase 6: 配套 Agent Skill

**目标：** 将收敛后的标准实现固化为 Agent Skill，供团队后续开发对齐。

**前置：** Phase 5 验证通过。

## 强制流程

**禁止**直接编写 SKILL.md。必须：

1. **Announce:** 转入 `creating-skills-guided`
2. 将 Phase 3 统一标准 + Phase 5 验证结论作为 Phase 1 输入材料
3. 走完 creating-skills-guided 五阶段（澄清 → 蓝图 → 实施 → 验证 → 部署）
4. 配套 Skill 建议命名：`{business-domain}-dev` 或 `{business-domain}-pattern`（kebab-case）

## 配套 Skill 应包含

- 标准实现的目录结构与入口
- 新增/修改该业务时的 MUST / MUST NOT
- 与已废弃实现的对比（避免回退分叉）
- 测试要求

## 存放建议

| 场景 | 路径 |
|------|------|
| 团队共享 | 项目 `.cursor/skills/` 或 `agent-skills` 仓库 |
| 个人 | `~/.cursor/skills/` |

若放入 `xiaozhi93/agent-skills` → 同步更新 `skills.manifest.json` 并跑校验脚本。

## 完成

向用户报告：

- 业务收敛摘要
- 配套 Skill 路径与触发语
- 如何 `npx skills add` 或 `dev-link` 安装
