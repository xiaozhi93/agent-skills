# Agent Skills 仓库设计与维护方案

**日期：** 2026-06-20  
**状态：** 已批准，待实现  
**仓库：** `xiaozhi93/agent-skills`  
**范围：** 4 个技能的 GitHub 托管、Cursor 分发、find-skills 集成、CI 校验

---

## 1. 背景与目标

### 1.1 现状

用户已开发 4 个 Agent Skill，分散在本地目录，未纳入 Git 版本管理：

| 技能 | 当前位置 | 行数 | 阶段 |
|------|----------|------|------|
| `app-distill` | `~/.cursor/skills/` | ~669 | 5 阶段 MVP 蒸馏 |
| `app-ui-redesign` | `~/.cursor/skills/` | ~1068 | 6 阶段 UI 重设计 |
| `repo-feature-distill` | `~/.cursor/skills/` | ~713 | 5 阶段跨仓功能迁移 |
| `conversation-to-article` | `~/.agents/skills/` | ~709 | 4 阶段对话转文章 |

### 1.2 目标

1. **公开 GitHub 仓库** `xiaozhi93/agent-skills` 统一管理 4 个技能
2. **v1 分发平台：** Cursor（`~/.cursor/skills/`）
3. **安装方式：** `npx skills add`（不上架 skills.sh）
4. **发现方式：** 更新 `find-skills`，指向仓库地址并给出安装命令
5. **本地开发：** symlink 到本地 clone，改文件即测
6. **CI：** 完整校验（结构 + manifest + smoke install）

### 1.3 非目标（v1 不做）

- 上架 skills.sh 索引
- Claude Plugin Marketplace / Gemini CLI 等多平台 TOML 同步
- 自建 `install.sh` 作为主安装路径（由 `npx skills` 替代）
- 将外部依赖技能（gitnexus-* 等）打包进本仓库

---

## 2. 方案选择

### 2.1 候选方案

| 方案 | 描述 | 结论 |
|------|------|------|
| 纯 Markdown 仓库 | 只有 skills/ + README | 扩展性差，find-skills 需硬编码 |
| **Manifest 驱动（选用）** | skills/ + manifest + npx skills CLI | 发现、安装、CI 均可自动化 |
| addyosmani 全量复刻 | plugin + commands + hooks + 多平台 | v1 过度设计 |

### 2.2 选用理由

- `npx skills` CLI 原生支持 GitHub URL、`--skill` 单装、`--all` 全装、本地路径 symlink
- `skills.manifest.json` 为 find-skills 提供 triggers/requires 元数据（CLI `--list` 只有 name/description）
- 完整 CI 可保障 phases/ 链接和 manifest 一致性

---

## 3. 仓库结构

```
xiaozhi93/agent-skills/
├── skills/
│   ├── app-distill/
│   │   ├── SKILL.md
│   │   ├── examples.md
│   │   └── phases/
│   ├── app-ui-redesign/
│   │   ├── SKILL.md
│   │   ├── examples.md
│   │   ├── phases/
│   │   └── reference/
│   ├── conversation-to-article/
│   │   ├── SKILL.md
│   │   ├── example-output.md
│   │   └── phases/
│   └── repo-feature-distill/
│       ├── SKILL.md
│       ├── phases/
│       └── templates/
├── skills.manifest.json
├── scripts/
│   ├── validate-skills.js
│   ├── validate-manifest.js
│   └── dev-link.sh              # 薄封装：npx skills add .
├── docs/
│   ├── skill-anatomy.md         # 本仓库技能规范
│   ├── cursor-setup.md          # 用户安装说明
│   ├── dev-testing.md           # 本地测试触发语
│   ├── dependencies.md          # 外部技能依赖
│   └── superpowers/specs/       # 设计文档
├── .github/workflows/
│   └── validate.yml
├── CONTRIBUTING.md
├── LICENSE                        # MIT
└── README.md
```

### 3.1 skills.manifest.json 格式

```json
{
  "repo": "xiaozhi93/agent-skills",
  "version": "1.0.0",
  "skills": [
    {
      "name": "app-distill",
      "description": "从复杂应用源码蒸馏 MVP 到新项目",
      "triggers": ["蒸馏 MVP", "提取核心功能", "app-distill", "最小可运行"],
      "requires": ["find-skills", "gitnexus-exploring", "verification-before-completion"]
    },
    {
      "name": "app-ui-redesign",
      "description": "从现有应用源码重设计 UI（Stitch + TDD）",
      "triggers": ["UI 重设计", "界面重做", "DESIGN.md", "app-ui-redesign"],
      "requires": ["gitnexus-exploring", "frontend-design", "test-driven-development", "verification-before-completion"],
      "requires_mcp": ["user-stitch"]
    },
    {
      "name": "conversation-to-article",
      "description": "将对话提炼为可分享文章",
      "triggers": ["对话转文章", "整理成文章", "conversation-to-article"],
      "requires": ["verification-before-completion"]
    },
    {
      "name": "repo-feature-distill",
      "description": "跨仓库蒸馏并复刻指定功能",
      "triggers": ["蒸馏功能", "迁移功能", "复刻功能", "repo-feature-distill"],
      "requires": ["gitnexus-exploring", "verification-before-completion"]
    }
  ]
}
```

---

## 4. 安装与更新

### 4.1 用户安装（远程 GitHub）

```bash
# 安装单个技能
npx skills add https://github.com/xiaozhi93/agent-skills --skill app-distill -g -a cursor -y

# 安装全部
npx skills add https://github.com/xiaozhi93/agent-skills --all -g -a cursor -y

# 列出可用技能
npx skills add https://github.com/xiaozhi93/agent-skills --list

# 更新已安装技能
npx skills update app-distill -g -y
```

安装目标：`~/.cursor/skills/<skill-name>/`（symlink 到 CLI 管理的 canonical copy）

### 4.2 本地开发

```bash
git clone git@github.com:xiaozhi93/agent-skills.git ~/Projects/agent-skills
cd ~/Projects/agent-skills

# 链接正在开发的技能（symlink，保存即生效）
npx skills add . --skill app-distill -g -a cursor -y

# 或链接全部
./scripts/dev-link.sh --all

# 不安装，快速验证 SKILL 内容
npx skills use . --skill app-distill
```

### 4.3 迁移策略

1. 从 `~/.cursor/skills/` 复制 3 个技能到仓库 `skills/`
2. 从 `~/.agents/skills/` 复制 `conversation-to-article` 到仓库 `skills/`
3. 运行 `npx skills add . --all -g -a cursor -y` 替换本地副本为 symlink
4. 验证 4 个技能在 Cursor 新对话中可触发

---

## 5. find-skills 集成

### 5.1 改动位置

`~/.agents/skills/find-skills/SKILL.md`（不放入 agent-skills 仓库）

### 5.2 新增章节：Personal Skills Registry

**仓库：** `https://github.com/xiaozhi93/agent-skills`

**触发条件：**

- 用户需求匹配 manifest 中 `triggers`（蒸馏、UI 重设计、对话转文章、跨仓迁移等）
- 用户明确说「安装 xiaozhi93 的技能 / agent-skills」

**Agent 行为：**

1. 读取 manifest（本地 clone 或 raw GitHub URL）
2. 按 triggers/description 匹配用户需求
3. 给出 `npx skills add` 安装命令（单个或 `--all`）
4. 若 `requires` 非空，提示外部依赖需单独安装

**示例输出：**

```
找到技能 app-distill（从复杂应用蒸馏 MVP）。

安装：
npx skills add https://github.com/xiaozhi93/agent-skills --skill app-distill -g -a cursor -y

安装全部 4 个技能：
npx skills add https://github.com/xiaozhi93/agent-skills --all -g -a cursor -y

外部依赖（需单独安装）：gitnexus-exploring, find-skills, verification-before-completion
```

---

## 6. CI 校验

### 6.1 Workflow（`.github/workflows/validate.yml`）

| Job | 命令 | 阻塞 |
|-----|------|------|
| validate-skills | `node scripts/validate-skills.js` | 是 |
| validate-manifest | `node scripts/validate-manifest.js` | 是 |
| smoke-install | `npx skills add . --list` + copy 安装测试 | 是 |

### 6.2 validate-skills.js 检查项

**Errors（阻塞 CI）：**

- 每个 `skills/<name>/` 目录存在 `SKILL.md`
- YAML frontmatter 含 `name`、`description`
- frontmatter `name` === 目录名
- `description` ≤ 1024 字符
- 必需章节：Overview、When to Use、Red Flags、Verification（Common Rationalizations 可选但推荐）
- `SKILL.md` 和 `phases/*.md` 中的相对链接目标存在
- manifest 中声明的 skill 在目录中存在

**Warnings（不阻塞）：**

- 跨 skill 引用（`` `skill-name` ``）指向未知 skill
- manifest `requires` 中的外部技能无法在本仓库验证

### 6.3 validate-manifest.js 检查项

- manifest JSON 合法
- `skills[].name` 与 `skills/` 目录双向一致
- 无重复 name
- `triggers` 数组非空

### 6.4 smoke-install

```bash
npx skills add . --list                    # 应列出 4 个技能
npx skills add . --skill app-distill -g -a cursor -y --copy  # CI 用 copy 避免 symlink 问题
```

---

## 7. 文档计划

| 文件 | 内容 |
|------|------|
| `README.md` | 技能表格、快速安装、链接到 docs/ |
| `docs/cursor-setup.md` | 完整 npx skills 安装/更新/卸载说明 |
| `docs/dev-testing.md` | 每个技能的测试触发语和预期行为 |
| `docs/dependencies.md` | 外部技能/MCP 依赖及安装方式 |
| `docs/skill-anatomy.md` | 本仓库 SKILL 编写规范（phases 结构、HARD-GATE 等） |
| `CONTRIBUTING.md` | 新增/修改 skill 流程、CI 要求 |

---

## 8. 外部依赖

本仓库技能运行时依赖以下外部资源（不打包、不自动安装）：

| 外部依赖 | 使用者 |
|----------|--------|
| `gitnexus-exploring` | app-distill, app-ui-redesign, repo-feature-distill |
| `find-skills` | app-distill |
| `verification-before-completion` | 全部 |
| `frontend-design` | app-ui-redesign |
| `test-driven-development` | app-ui-redesign |
| `brainstorming` | app-ui-redesign |
| Stitch MCP (`user-stitch`) | app-ui-redesign |

---

## 9. 实现顺序

1. 创建 GitHub 仓库 `xiaozhi93/agent-skills`
2. 迁移 4 个技能到 `skills/`
3. 编写 `skills.manifest.json`
4. 编写校验脚本 + CI workflow
5. 编写 README 和 docs/
6. 更新 `find-skills/SKILL.md`
7. 本地 `npx skills add . --all` 验证
8. push 到 GitHub，确认 CI 通过
9. 远程 `npx skills add https://github.com/...` 验证安装

---

## 10. 风险与缓解

| 风险 | 缓解 |
|------|------|
| `npx skills add` clone 超时（网络） | README 说明可手动 clone + 本地路径安装；CI 用本地路径 |
| conversation-to-article 原在 `~/.agents/skills/` | 统一安装到 `~/.cursor/skills/`（Cursor 全局路径） |
| 外部依赖未安装导致技能运行不完整 | manifest `requires` + find-skills 安装时提示 |
| phases/ 链接断裂 | CI validate-skills 强制检查 |

---

## 11. 后续扩展（v2+）

- Claude Plugin Marketplace（`plugin.json` + `.claude-plugin/`）
- Gemini CLI / Antigravity 命令同步
- skills.sh 上架（可选）
- 更多技能加入 manifest
