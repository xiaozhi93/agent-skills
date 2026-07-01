# Step 4: Handoff — 交付与下阶段衔接

**目标：** 确认 Phase 0 完成，给出 Phase N `/brainstorming` 的标准开场白。

## 4.1 Phase 0 完成清单

逐项勾选并展示给用户：

```markdown
## Phase 0 完成清单 — <feature-slug>

- [ ] `docs/requirements/<slug>/prd.md` 已归一化，图片链接有效
- [ ] `docs/requirements/<slug>/roadmap.md` 已确认
- [ ] `docs/requirements/<slug>/api.md` 已就位
- [ ] `assets/README.md` 索引完整
- [ ] `smoke/roles.md` + `auth/.gitignore` 已创建；登录 json 已保存或标待补
- [ ] `MIGRATION.md` 审计记录完整
- [ ] 原路径无残留副本（例外已记录）
- [ ] 引用修复待办已列出（如有）

**未做（ intentional ）：**
- spec / plan / 代码 / dev 启动 / 联调
```

## 4.2 建议 Git Commit

```bash
git add docs/requirements/<slug>/
git add -u  #  staged deletions from migration
git commit -m "$(cat <<'EOF'
docs: add Phase 0 requirements bundle for <feature-slug>

Consolidate PRD, assets, API docs, and roadmap.
Remove scattered copies at original paths.
EOF
)"
```

仅当用户要求时执行 commit。

## 4.3 生成 Phase N 开场白

从 `roadmap.md` 取 **Phase 1**（或用户指定的下一个 Phase），填充 [templates/phase-n-prompt.md](../templates/phase-n-prompt.md)：

```markdown
## 建议：新开对话，Phase 1 Brainstorm

\`\`\`markdown
@docs/requirements/<slug>/roadmap.md
@docs/requirements/<slug>/prd.md
@docs/requirements/<slug>/assets/<phase1-image-1>.png
@docs/requirements/<slug>/api.md

/brainstorming

本轮只做 **Phase 1：<名称>**（见 roadmap）。
不要涉及 Phase 2+，不要写代码。
\`\`\`

**Git（方案 A）提醒：** roadmap 已含 **Git 策略** 表；plan approve 后、Task 1 前在各 repo 执行 Step 0（见 [templates/implement-step0-prompt.md](../templates/implement-step0-prompt.md)）。

**Execution mode 提醒（plan 完成后）：**
- 同对话继续 → Step 0 → Subagent-Driven
- 新开对话 → Step 0 → executing-plans + @plan

**冒烟（Phase N 完成后）：** [templates/smoke-run-prompt.md](../templates/smoke-run-prompt.md)
```

## 4.4 会话结束

Phase 0 技能任务完成。不要在本对话继续 brainstorm 或实现，除非用户明确要求。
