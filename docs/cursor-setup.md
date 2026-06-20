# Cursor 安装指南

本仓库通过 [vercel-labs/skills](https://github.com/vercel-labs/skills) CLI 将技能安装到 Cursor 全局技能目录 `~/.cursor/skills/`。安装后，在新对话中输入对应触发语即可激活技能。

**前提条件：**

- 已安装 [Node.js](https://nodejs.org/)（建议 v18+）
- 已安装 [Cursor](https://cursor.com/)

---

## 安装单个技能

将 `app-distill` 替换为任意技能名（见 [README](../README.md) 技能列表）：

```bash
npx skills add https://github.com/xiaozhi93/agent-skills --skill app-distill -g -a cursor -y
```

| 参数 | 说明 |
|------|------|
| `-g` | 安装到全局目录（`~/.cursor/skills/`） |
| `-a cursor` | 目标平台为 Cursor |
| `-y` | 跳过交互确认 |
| `--skill <name>` | 只安装指定技能 |

---

## 安装全部技能

```bash
npx skills add https://github.com/xiaozhi93/agent-skills --all -g -a cursor -y
```

---

## 列出可用技能

不执行安装，仅查看仓库中有哪些技能：

```bash
npx skills add https://github.com/xiaozhi93/agent-skills --list
```

---

## 更新已安装技能

从远程仓库拉取最新版本并覆盖本地安装：

```bash
npx skills update app-distill -g -y
```

更新全部已安装技能时，对每个技能名分别执行，或重新运行 `--all` 安装命令。

---

## 卸载技能

```bash
npx skills remove app-distill -g -y
```

---

## 本地开发（symlink）

克隆仓库后，将本地 `skills/` 目录 symlink 到 Cursor，修改文件后在新对话中立即生效，无需重新安装：

```bash
git clone git@github.com:xiaozhi93/agent-skills.git ~/Projects/agent-skills
cd ~/Projects/agent-skills

# 链接单个技能
./scripts/dev-link.sh app-distill

# 链接全部技能
./scripts/dev-link.sh --all
```

等价于：

```bash
npx skills add . --skill app-distill -g -a cursor -y
```

验证 symlink 是否生效：

```bash
ls -la ~/.cursor/skills/app-distill
# 应指向 ~/Projects/agent-skills/skills/app-distill
```

---

## 外部依赖

部分技能依赖本仓库未打包的外部技能或 MCP 服务，安装后需单独配置。详见 [dependencies.md](dependencies.md)。

---

## 测试安装是否成功

1. 重启 Cursor 或开启新对话
2. 使用 [dev-testing.md](dev-testing.md) 中的测试触发语
3. Agent 应读取对应 `SKILL.md` 并按阶段流程执行

---

## 常见问题

**`npx skills add` 超时或 clone 失败**

网络问题时可改用手动 clone + 本地路径安装：

```bash
git clone git@github.com:xiaozhi93/agent-skills.git ~/Projects/agent-skills
cd ~/Projects/agent-skills
./scripts/dev-link.sh --all
```

**技能未出现在对话中**

- 确认安装路径：`ls ~/.cursor/skills/`
- 确认使用了新对话（已有对话可能未加载新技能）
- 检查 Cursor Settings → Rules → Agent Skills 是否启用

**需要 Superpowers 插件技能**

本仓库多个技能依赖 Superpowers 插件（如 `verification-before-completion`）。确保 Cursor 已安装 [Superpowers 插件](https://github.com/obra/superpowers)，或通过 `find-skills` 搜索安装。详见 [dependencies.md](dependencies.md)。
