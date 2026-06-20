# Phase 4: 新建项目与实现

**目标：** 在独立目录创建并 implement 可构建的 MVP 核心路径。

## 前置：技能搜索门禁

<HARD-GATE>
写第一行 MVP 代码前必须完成技能搜索：

1. 读取 `find-skills` 技能
2. 运行 `npx skills find "<stack> best practices"` 或等价搜索
3. 检查 [skills.sh leaderboard](https://skills.sh/) 是否有该栈的知名技能
4. 找到高质量技能（1K+ installs 或 vercel-labs / anthropics / microsoft 等官方源）→ **读取 SKILL.md 并遵循**
5. 无匹配技能 → 读取 `context7-mcp` 查官方文档
6. 在回复中简要说明采用了哪个技能/文档作为开发规范
</HARD-GATE>

## 实施步骤

### 4.1 创建独立项目

- 使用 `cursor-app-control` MCP 的 `create_project` 或手动创建目录
- **立即** `move_agent_to_root` 到新项目路径
- 初始化 git（若尚未初始化）
- 按 Phase 3 计划 scaffold 项目

### 4.2 按顺序实现

遵循 Phase 3 实现顺序 + 搜索到的最佳实践技能：

1. 共享基础设施
2. 核心功能路径（一条用户旅程跑通即可）
3. 最小 UI 串联

**纪律：**

- 只实现 Must have，不做 Won't have
- 匹配目标栈的现有惯例（目录、命名、依赖注入方式）
- 不写 Analytics、推送、国际化等非核心功能

### 4.3 同步文档

在新项目中写入 `docs/MVP-SPEC.md`，包含：

- 保留/排除功能清单
- 技术栈与关键依赖
- 已知限制与后续扩展点

## 工作区规则

| 动作 | 要求 |
|------|------|
| 编辑代码 | 仅在新 MVP 项目目录 |
| 参考原仓 | 只读，不修改 |
| 依赖安装 | 最小集，不复制原仓全部依赖 |

## 门禁

项目可成功构建（编译/打包通过）→ Phase 5。
