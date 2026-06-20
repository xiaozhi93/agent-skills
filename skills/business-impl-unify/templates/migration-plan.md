# 迁移步骤计划模板

> 迁移步骤表写入 spec §4「迁移计划」。`writing-plans` 从 spec 读取，不扩展 writing-plans 技能本身。

**业务域：** {name}
**分支：** `{branch}`（从 `{base}` 切出）
**基于：** [统一标准提案](standard-proposal.md)

---

## 步骤表

| 步骤 | 内容 | 依赖 | 状态 |
|------|------|------|------|
| 1 | {如：注册表 + dashboard/message-center} | — | 待做 |
| 2 | {如：移址 → BizShell B 类 + 补移移动端} | 1 | 待做 |
| 3 | … | 2 | 待做 |
| N | 配套 Skill（可选，走 creating-skills-guided） | N-1 | 待做 |

**规则：**

- 每步可独立 review、独立 commit（或用户指定 batch commit）
- 2 步及以上 → **必须**走 `subagent-driven-development`
- 单步且 trivial（≤3 文件）→ 可主会话 inline + TDD，但仍需 verification

---

## 子代理驱动约定（≥2 步时）

```
spec 用户批准 → writing-plans
    ↓
主会话：TodoWrite 列出全部步骤 + 提取每步完整上下文
    ↓
For each 步骤:
    1. 派发 implementer 子代理（隔离上下文，附本步全文 spec）
    2. spec 合规 review → 不通过则 fix + 重审
    3. code quality review → 不通过则 fix + 重审
    4. 标记步骤完成；询问/执行 commit（按用户偏好）
    ↓
全部步骤完成 → verification-before-completion
```

**禁止：** 主会话一口气改完所有步骤而不派子代理（≥2 步时）。
