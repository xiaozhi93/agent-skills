# 贡献指南

感谢参与 `xiaozhi93/agent-skills` 的开发。本仓库采用 manifest 驱动的 monorepo 结构，所有变更需通过 CI 校验。

---

## 快速开始

```bash
git clone git@github.com:xiaozhi93/agent-skills.git
cd agent-skills

# 链接技能到 Cursor 进行本地测试
./scripts/dev-link.sh --all
```

---

## 新增技能

1. **创建目录** — `skills/<name>/SKILL.md` 及 `phases/` 等子目录
2. **编写 SKILL.md** — 遵循 [docs/skill-anatomy.md](docs/skill-anatomy.md)
3. **更新 manifest** — 在 `skills.manifest.json` 添加条目（name、description、triggers、requires）
4. **运行校验** — 见下方「本地校验」
5. **测试触发** — 用 [docs/dev-testing.md](docs/dev-testing.md) 中的方式验证（新增技能需补充测试触发语）
6. **提交 PR** — CI 通过后合并

---

## 修改现有技能

1. 编辑 `skills/<name>/` 下的文件
2. 若变更影响触发词或外部依赖，同步更新 `skills.manifest.json`
3. 若 frontmatter `description` 变更，确认仍 ≤ 1024 字符
4. 运行校验脚本
5. 新对话中测试 HARD-GATE 与阶段流程

**不要：**

- 修改 `name` 或目录名而不同步 manifest（会导致 CI 失败）
- 添加指向不存在文件的相对链接
- 删除 HARD-GATE 而不更新 Red Flags

---

## 本地校验

```bash
# 检查 manifest ↔ 目录双向一致
node scripts/validate-manifest.js

# 检查 SKILL.md 结构、frontmatter、链接
node scripts/validate-skills.js
```

预期输出：

```
PASSED — 4 skills in manifest, 4 directories
4 skills — 0 error(s), 0 warning(s) — PASSED
```

可选：模拟 CI smoke install

```bash
npx skills add . --list
npx skills add . --skill app-distill -g -a cursor -y --copy
```

---

## CI

Push 或 PR 触发 [`.github/workflows/validate.yml`](.github/workflows/validate.yml)：

| Job | 命令 | 说明 |
|-----|------|------|
| validate-manifest | `node scripts/validate-manifest.js` | manifest 与目录一致 |
| validate-skills | `node scripts/validate-skills.js` | 内容与链接 |
| smoke-install | `npx skills add . --list` + copy 安装 | CLI 兼容性 |

任一 job 失败则 PR 不可合并。

---

## 文档

| 文件 | 何时更新 |
|------|----------|
| [docs/skill-anatomy.md](docs/skill-anatomy.md) | 变更仓库级编写规范时 |
| [docs/dev-testing.md](docs/dev-testing.md) | 新增技能或变更测试触发语时 |
| [docs/dependencies.md](docs/dependencies.md) | 变更 `requires` / `requires_mcp` 时 |
| [docs/cursor-setup.md](docs/cursor-setup.md) | 变更安装方式或 CLI 参数时 |
| [README.md](README.md) | 技能列表或快速安装变更时 |

---

## 外部依赖

新增 `requires` 或 `requires_mcp` 时，必须更新 [docs/dependencies.md](docs/dependencies.md)。本仓库不打包外部技能；find-skills 集成（`~/.agents/skills/find-skills/`）需单独维护 Personal Skills Registry 章节。

---

## 提交规范

- `feat:` 新技能或 significant 功能
- `fix:` 修复技能逻辑或 CI
- `docs:` 文档变更
- `ci:` CI / 校验脚本变更

示例：

```
docs: add setup, testing, dependencies, and contributing guides
feat: migrate four agent skills into monorepo
```

---

## 许可证

贡献内容以 [MIT License](LICENSE) 发布。
