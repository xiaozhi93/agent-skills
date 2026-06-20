# Agent Skills

个人 Agent Skill 集合：应用蒸馏、UI 重设计、对话转文章、跨仓功能迁移、引导式创建技能、业务实现统一。

通过 [`npx skills`](https://github.com/vercel-labs/skills) 安装到 Cursor，由 [`skills.manifest.json`](skills.manifest.json) 驱动发现与 CI 校验。

## 技能列表

| 技能 | 说明 | 触发词示例 |
|------|------|-----------|
| [app-distill](skills/app-distill/SKILL.md) | 从复杂应用蒸馏 MVP | 蒸馏 MVP、提取核心功能 |
| [app-ui-redesign](skills/app-ui-redesign/SKILL.md) | UI 重设计（Stitch + TDD） | UI 重设计、换皮、DESIGN.md |
| [conversation-to-article](skills/conversation-to-article/SKILL.md) | 对话转文章 | 对话转文章、整理成文章 |
| [repo-feature-distill](skills/repo-feature-distill/SKILL.md) | 跨仓功能蒸馏 | 蒸馏功能、迁移功能、复刻功能 |
| [creating-skills-guided](skills/creating-skills-guided/SKILL.md) | 引导式创建 Agent Skill | 引导式创建技能、创建技能、guided skill creation |
| [business-impl-unify](skills/business-impl-unify/SKILL.md) | 统一多套业务实现（Superpowers brainstorming 扩展） | 统一业务实现、多套实现、business-impl-unify |

## 快速安装

```bash
# 安装全部技能
npx skills add https://github.com/xiaozhi93/agent-skills --all -g -a cursor -y

# 安装单个技能
npx skills add https://github.com/xiaozhi93/agent-skills --skill app-distill -g -a cursor -y
```

## 文档

| 文档 | 内容 |
|------|------|
| [docs/cursor-setup.md](docs/cursor-setup.md) | 安装、更新、卸载、本地开发 |
| [docs/dev-testing.md](docs/dev-testing.md) | 测试触发语与验证清单 |
| [docs/dependencies.md](docs/dependencies.md) | 外部技能与 MCP 依赖 |
| [docs/skill-anatomy.md](docs/skill-anatomy.md) | 技能编写规范 |
| [CONTRIBUTING.md](CONTRIBUTING.md) | 贡献流程与 CI 校验 |

## 本地开发

```bash
git clone git@github.com:xiaozhi93/agent-skills.git
cd agent-skills
./scripts/dev-link.sh --all   # symlink 到 ~/.cursor/skills/
```

## 校验

```bash
node scripts/validate-manifest.js
node scripts/validate-skills.js
```

## 许可证

[MIT](LICENSE)
