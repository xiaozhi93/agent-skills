# 本地测试触发语

在新 Cursor 对话中使用以下触发语，验证技能是否正确安装并激活。Agent 应读取对应 `SKILL.md`，进入阶段流程，而非给出泛化回答。

---

## 测试触发语

| 技能 | 测试触发语 | 预期行为 |
|------|-----------|----------|
| `app-distill` | 「从这个项目蒸馏 MVP，只要登录功能」 | 进入 Phase 1 澄清：确认功能清单与技术栈，不直接写代码 |
| `app-ui-redesign` | 「重设计这个 App 的 UI，用 Stitch」 | 进入 Phase 1 澄清：了解重设计范围，提及 Stitch / DESIGN.md |
| `conversation-to-article` | 「把这段对话整理成文章」 | 进入 Phase 1 澄清：确认文章类型、受众、风格，不直接写正文 |
| `repo-feature-distill` | 「从 A 仓库蒸馏 X 功能到 B 仓库」 | 进入 Phase 1 澄清：确认源仓、目标仓、功能边界 |
| `creating-skills-guided` | 「帮我引导式创建一个技能」 | 进入 Phase 1 访谈：产出技能意图简报，不直接写 SKILL.md |

---

## 验证清单

- [ ] Agent 明确引用技能名称或阶段流程
- [ ] Phase 1 会提出澄清问题，遵守 HARD-GATE（用户确认前不进入下一阶段）
- [ ] 未跳过 `## Red Flags` 中列出的反模式
- [ ] 依赖外部技能时（如 `gitnexus-exploring`），Agent 尝试加载或说明需要该技能

---

## manifest 触发词参考

以下为 `skills.manifest.json` 中登记的触发词，也可用于测试：

| 技能 | 触发词 |
|------|--------|
| `app-distill` | 蒸馏 MVP、提取核心功能、精简重写、app-distill、最小可运行 |
| `app-ui-redesign` | UI 重设计、界面重做、换皮、DESIGN.md、app-ui-redesign |
| `conversation-to-article` | 对话转文章、整理成文章、提取对话精华、conversation-to-article |
| `repo-feature-distill` | 蒸馏功能、迁移功能、复刻功能、移植功能、repo-feature-distill |
| `creating-skills-guided` | 引导式创建技能、创建技能、guided skill creation、creating-skills-guided、先澄清再写技能 |

---

## 本地开发测试流程

```bash
# 1. symlink 本地仓库
./scripts/dev-link.sh app-distill

# 2. 修改 skills/app-distill/SKILL.md 或 phases/

# 3. 开启新 Cursor 对话，发送上表测试触发语

# 4. 确认 Agent 行为符合修改预期
```

修改 manifest 或 frontmatter 后，建议运行校验脚本：

```bash
node scripts/validate-skills.js
node scripts/validate-manifest.js
```
