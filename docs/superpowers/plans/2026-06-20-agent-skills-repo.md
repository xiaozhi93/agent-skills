# Agent Skills 仓库 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 4 个本地 Agent Skill 迁移到公开 GitHub 仓库 `xiaozhi93/agent-skills`，支持 `npx skills add` 安装、find-skills 发现、完整 CI 校验。

**Architecture:** Manifest 驱动的 monorepo：`skills/<name>/SKILL.md` 为唯一来源，`skills.manifest.json` 提供 triggers/requires 元数据；`npx skills` CLI 负责 symlink 安装到 `~/.cursor/skills/`；Node 校验脚本 + GitHub Actions 保障质量。

**Tech Stack:** Markdown skills、Node.js 校验脚本、GitHub Actions、`npx skills` CLI（vercel-labs/skills）

---

## File Map

| 文件 | 职责 |
|------|------|
| `skills/*/` | 4 个技能源码（从本地迁移） |
| `skills.manifest.json` | find-skills 元数据 + CI 双向校验 |
| `scripts/validate-skills.js` | SKILL.md 结构、frontmatter、链接校验 |
| `scripts/validate-manifest.js` | manifest ↔ 目录一致性 |
| `scripts/dev-link.sh` | 本地开发 symlink 薄封装 |
| `.github/workflows/validate.yml` | CI 三层 job |
| `docs/cursor-setup.md` | 用户安装文档 |
| `docs/dev-testing.md` | 测试触发语 |
| `docs/dependencies.md` | 外部依赖 |
| `docs/skill-anatomy.md` | 贡献规范 |
| `~/.agents/skills/find-skills/SKILL.md` | 新增 Personal Skills Registry 节 |

---

### Task 1: 仓库脚手架

**Files:**
- Create: `.gitignore`
- Create: `LICENSE`
- Create: `README.md`（骨架，Task 8 完善）

- [ ] **Step 1: 创建 `.gitignore`**

```gitignore
.DS_Store
node_modules/
*.log
.skills/
```

- [ ] **Step 2: 创建 MIT LICENSE**

标准 MIT License，Copyright 2026 xiaozhi93

- [ ] **Step 3: 创建 README 骨架**

```markdown
# Agent Skills

个人 Agent Skill 集合：应用蒸馏、UI 重设计、对话转文章、跨仓功能迁移。

## 技能列表

| 技能 | 说明 |
|------|------|
| [app-distill](skills/app-distill/SKILL.md) | 从复杂应用蒸馏 MVP |
| [app-ui-redesign](skills/app-ui-redesign/SKILL.md) | UI 重设计（Stitch + TDD） |
| [conversation-to-article](skills/conversation-to-article/SKILL.md) | 对话转文章 |
| [repo-feature-distill](skills/repo-feature-distill/SKILL.md) | 跨仓功能蒸馏 |

## 快速安装

\`\`\`bash
npx skills add https://github.com/xiaozhi93/agent-skills --all -g -a cursor -y
\`\`\`

详见 [docs/cursor-setup.md](docs/cursor-setup.md)
```

- [ ] **Step 4: Commit**

```bash
git add .gitignore LICENSE README.md
git commit -m "chore: scaffold agent-skills repository"
```

---

### Task 2: 迁移 4 个技能

**Files:**
- Create: `skills/app-distill/**`（从 `~/.cursor/skills/app-distill/`）
- Create: `skills/app-ui-redesign/**`（从 `~/.cursor/skills/app-ui-redesign/`）
- Create: `skills/repo-feature-distill/**`（从 `~/.cursor/skills/repo-feature-distill/`）
- Create: `skills/conversation-to-article/**`（从 `~/.agents/skills/conversation-to-article/`）

- [ ] **Step 1: 复制技能目录**

```bash
cd ~/Projects/agent-skills
cp -R ~/.cursor/skills/app-distill skills/
cp -R ~/.cursor/skills/app-ui-redesign skills/
cp -R ~/.cursor/skills/repo-feature-distill skills/
cp -R ~/.agents/skills/conversation-to-article skills/
```

- [ ] **Step 2: 验证 4 个 SKILL.md 存在**

```bash
ls skills/*/SKILL.md
```

Expected: 4 行输出

- [ ] **Step 3: 统一 frontmatter `source` 字段**

在每个 `skills/*/SKILL.md` frontmatter 中，将 `source: local` 改为 `source: xiaozhi93/agent-skills`（conversation-to-article 若无 source 则添加）。

- [ ] **Step 4: Commit**

```bash
git add skills/
git commit -m "feat: migrate four agent skills into monorepo"
```

---

### Task 3: skills.manifest.json

**Files:**
- Create: `skills.manifest.json`

- [ ] **Step 1: 创建 manifest**

```json
{
  "repo": "xiaozhi93/agent-skills",
  "version": "1.0.0",
  "install_url": "https://github.com/xiaozhi93/agent-skills",
  "skills": [
    {
      "name": "app-distill",
      "description": "从复杂应用源码蒸馏 MVP 到新项目",
      "triggers": ["蒸馏 MVP", "提取核心功能", "精简重写", "app-distill", "最小可运行"],
      "requires": ["find-skills", "gitnexus-exploring", "verification-before-completion"]
    },
    {
      "name": "app-ui-redesign",
      "description": "从现有应用源码重设计 UI（Stitch + TDD）",
      "triggers": ["UI 重设计", "界面重做", "换皮", "DESIGN.md", "app-ui-redesign"],
      "requires": ["gitnexus-exploring", "frontend-design", "test-driven-development", "verification-before-completion", "brainstorming"],
      "requires_mcp": ["user-stitch"]
    },
    {
      "name": "conversation-to-article",
      "description": "将对话提炼为可分享文章",
      "triggers": ["对话转文章", "整理成文章", "提取对话精华", "conversation-to-article"],
      "requires": ["verification-before-completion"]
    },
    {
      "name": "repo-feature-distill",
      "description": "跨仓库蒸馏并复刻指定功能",
      "triggers": ["蒸馏功能", "迁移功能", "复刻功能", "移植功能", "repo-feature-distill"],
      "requires": ["gitnexus-exploring", "verification-before-completion"]
    }
  ]
}
```

- [ ] **Step 2: Commit**

```bash
git add skills.manifest.json
git commit -m "feat: add skills manifest for discovery and CI"
```

---

### Task 4: validate-manifest.js

**Files:**
- Create: `scripts/validate-manifest.js`

- [ ] **Step 1: 创建校验脚本**

```javascript
#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const MANIFEST_PATH = path.join(ROOT, 'skills.manifest.json');
const SKILLS_DIR = path.join(ROOT, 'skills');

function main() {
  const errors = [];

  if (!fs.existsSync(MANIFEST_PATH)) {
    console.error('ERROR: skills.manifest.json not found');
    process.exit(1);
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
  } catch (err) {
    console.error(`ERROR: invalid JSON in skills.manifest.json: ${err.message}`);
    process.exit(1);
  }

  if (!manifest.repo) errors.push("Missing top-level field: 'repo'");
  if (!Array.isArray(manifest.skills) || manifest.skills.length === 0) {
    errors.push("'skills' must be a non-empty array");
  }

  const dirNames = fs.existsSync(SKILLS_DIR)
    ? fs.readdirSync(SKILLS_DIR).filter(d =>
        fs.statSync(path.join(SKILLS_DIR, d)).isDirectory()
      )
    : [];

  const manifestNames = new Set();
  for (const skill of manifest.skills || []) {
    if (!skill.name) {
      errors.push('Skill entry missing name');
      continue;
    }
    if (manifestNames.has(skill.name)) {
      errors.push(`Duplicate manifest name: ${skill.name}`);
    }
    manifestNames.add(skill.name);

    if (!skill.description) errors.push(`${skill.name}: missing description`);
    if (!Array.isArray(skill.triggers) || skill.triggers.length === 0) {
      errors.push(`${skill.name}: triggers must be a non-empty array`);
    }
    if (!dirNames.includes(skill.name)) {
      errors.push(`${skill.name}: in manifest but missing directory skills/${skill.name}/`);
    }
  }

  for (const dir of dirNames) {
    if (!manifestNames.has(dir)) {
      errors.push(`${dir}: directory exists but missing from manifest`);
    }
  }

  if (errors.length > 0) {
    for (const e of errors) console.error(`  ERROR: ${e}`);
    console.error(`\nFAILED — ${errors.length} error(s)`);
    process.exit(1);
  }

  console.log(`PASSED — ${manifest.skills.length} skills in manifest, ${dirNames.length} directories`);
}

main();
```

- [ ] **Step 2: 运行校验**

```bash
node scripts/validate-manifest.js
```

Expected: `PASSED — 4 skills in manifest, 4 directories`

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-manifest.js
git commit -m "feat: add manifest validation script"
```

---

### Task 5: validate-skills.js

**Files:**
- Create: `scripts/validate-skills.js`

- [ ] **Step 1: 创建校验脚本**

```javascript
#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SKILLS_DIR = path.join(ROOT, 'skills');
const MAX_DESCRIPTION_LENGTH = 1024;

const REQUIRED_SECTIONS = [
  '## Overview',
  '## When to Use',
  '## Red Flags',
];

const LINK_PATTERN = /\[([^\]]*)\]\(([^)]+)\)/g;

function parseFrontmatter(content) {
  const match = content.match(/^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*\r?\n/);
  if (!match) return null;
  const result = {};
  for (const line of match[1].split(/\r?\n/)) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, '');
    if (key) result[key] = value;
  }
  return result;
}

function isExternalLink(href) {
  return /^(https?:\/\/|mailto:|#)/.test(href);
}

function resolveLink(fromFile, href) {
  if (isExternalLink(href)) return null;
  const decoded = decodeURIComponent(href.split('#')[0]);
  return path.normalize(path.join(path.dirname(fromFile), decoded));
}

function collectMarkdownFiles(skillDir) {
  const files = [];
  function walk(dir) {
    for (const entry of fs.readdirSync(dir)) {
      const full = path.join(dir, entry);
      if (fs.statSync(full).isDirectory()) walk(full);
      else if (entry.endsWith('.md')) files.push(full);
    }
  }
  walk(skillDir);
  return files;
}

function validateLinks(skillDir, errors, warnings) {
  for (const file of collectMarkdownFiles(skillDir)) {
    const content = fs.readFileSync(file, 'utf8');
    let match;
    LINK_PATTERN.lastIndex = 0;
    while ((match = LINK_PATTERN.exec(content)) !== null) {
      const href = match[2].trim();
      const target = resolveLink(file, href);
      if (!target) continue;
      if (!fs.existsSync(target)) {
        errors.push(`${path.relative(ROOT, file)}: broken link '${href}'`);
      }
    }
  }
}

function validateSkill(dirName, knownSkills) {
  const errors = [];
  const warnings = [];
  const skillPath = path.join(SKILLS_DIR, dirName, 'SKILL.md');

  if (!fs.existsSync(skillPath)) {
    errors.push(`${dirName}: missing SKILL.md`);
    return { errors, warnings };
  }

  const content = fs.readFileSync(skillPath, 'utf8');
  const fm = parseFrontmatter(content);
  if (!fm) {
    errors.push(`${dirName}: missing or malformed YAML frontmatter`);
    return { errors, warnings };
  }
  if (!fm.name) errors.push(`${dirName}: frontmatter missing 'name'`);
  else if (fm.name !== dirName) {
    errors.push(`${dirName}: frontmatter name '${fm.name}' != directory '${dirName}'`);
  }
  if (!fm.description) errors.push(`${dirName}: frontmatter missing 'description'`);
  else if (fm.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.push(`${dirName}: description exceeds ${MAX_DESCRIPTION_LENGTH} chars`);
  }

  for (const section of REQUIRED_SECTIONS) {
    if (!content.includes(section)) {
      errors.push(`${dirName}: missing required section '${section}'`);
    }
  }

  validateLinks(path.join(SKILLS_DIR, dirName), errors, warnings);

  const refPattern = /`([a-z][a-z0-9-]*)`/g;
  let m;
  while ((m = refPattern.exec(content)) !== null) {
    const ref = m[1];
    if (ref.endsWith('-development') || ref.endsWith('-exploring') || ref === dirName) continue;
    if (knownSkills.has(ref)) continue;
    if (['brainstorming', 'writing-plans', 'find-skills', 'frontend-design',
         'test-driven-development', 'verification-before-completion',
         'gitnexus-exploring', 'gitnexus-refactoring', 'creating-skills-guided',
         'subagent-driven-development', 'conversation-to-obsidian',
         'generate-dev-handoff-prompt'].includes(ref)) continue;
    warnings.push(`${dirName}: possible external reference '${ref}'`);
  }

  return { errors, warnings };
}

function main() {
  if (!fs.existsSync(SKILLS_DIR)) {
    console.error('ERROR: skills/ not found');
    process.exit(1);
  }

  const skillDirs = fs.readdirSync(SKILLS_DIR)
    .filter(d => fs.statSync(path.join(SKILLS_DIR, d)).isDirectory())
    .sort();

  const knownSkills = new Set(skillDirs);
  let totalErrors = 0;
  let totalWarnings = 0;

  for (const dir of skillDirs) {
    const { errors, warnings } = validateSkill(dir, knownSkills);
    totalErrors += errors.length;
    totalWarnings += warnings.length;
    if (errors.length === 0 && warnings.length === 0) {
      console.log(`  ✓  ${dir}`);
    } else {
      console.log(`${errors.length ? '  ✗' : '  ⚠'}  ${dir}`);
      errors.forEach(e => console.log(`       ERROR: ${e}`));
      warnings.forEach(w => console.log(`       WARN:  ${w}`));
    }
  }

  const status = totalErrors > 0 ? 'FAILED' : 'PASSED';
  console.log(`\n${skillDirs.length} skills — ${totalErrors} error(s), ${totalWarnings} warning(s) — ${status}`);
  if (totalErrors > 0) process.exit(1);
}

main();
```

- [ ] **Step 2: 运行校验**

```bash
node scripts/validate-skills.js
```

Expected: `PASSED`（若有 ERROR 则修复 SKILL.md 后重跑）

- [ ] **Step 3: Commit**

```bash
git add scripts/validate-skills.js
git commit -m "feat: add skill content validation script"
```

---

### Task 6: dev-link.sh

**Files:**
- Create: `scripts/dev-link.sh`

- [ ] **Step 1: 创建开发脚本**

```bash
#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILL="${1:-*}"

if [[ "$SKILL" == "--all" ]]; then
  SKILL="*"
fi

echo "Linking skill(s): $SKILL"
npx skills add "$ROOT" --skill "$SKILL" -g -a cursor -y
echo "Done. Edit files in $ROOT/skills/ and test in a new Cursor chat."
```

- [ ] **Step 2: 添加执行权限**

```bash
chmod +x scripts/dev-link.sh
```

- [ ] **Step 3: Commit**

```bash
git add scripts/dev-link.sh
git commit -m "feat: add dev-link helper for local symlink install"
```

---

### Task 7: GitHub Actions CI

**Files:**
- Create: `.github/workflows/validate.yml`

- [ ] **Step 1: 创建 workflow**

```yaml
name: Validate Skills

on:
  push:
  pull_request:
  workflow_dispatch:

jobs:
  validate-manifest:
    name: Validate manifest
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: node scripts/validate-manifest.js

  validate-skills:
    name: Validate skill content
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: node scripts/validate-skills.js

  smoke-install:
    name: Smoke test skills CLI
    runs-on: ubuntu-latest
    needs: [validate-manifest, validate-skills]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - name: List skills
        run: npx skills add . --list
      - name: Copy-install one skill
        run: npx skills add . --skill app-distill -g -a cursor -y --copy
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/validate.yml
git commit -m "ci: add manifest, content, and smoke-install validation"
```

---

### Task 8: 文档

**Files:**
- Create: `docs/cursor-setup.md`
- Create: `docs/dev-testing.md`
- Create: `docs/dependencies.md`
- Create: `docs/skill-anatomy.md`
- Create: `CONTRIBUTING.md`
- Modify: `README.md`（完善安装表格）

- [ ] **Step 1: 创建 `docs/cursor-setup.md`**

内容要点：
- 单技能：`npx skills add https://github.com/xiaozhi93/agent-skills --skill app-distill -g -a cursor -y`
- 全部：`npx skills add https://github.com/xiaozhi93/agent-skills --all -g -a cursor -y`
- 列出：`npx skills add https://github.com/xiaozhi93/agent-skills --list`
- 更新：`npx skills update app-distill -g -y`
- 卸载：`npx skills remove app-distill -g -y`
- 本地开发：`./scripts/dev-link.sh app-distill`

- [ ] **Step 2: 创建 `docs/dev-testing.md`**

| 技能 | 测试触发语 |
|------|-----------|
| app-distill | 「从这个项目蒸馏 MVP，只要登录功能」 |
| app-ui-redesign | 「重设计这个 App 的 UI，用 Stitch」 |
| conversation-to-article | 「把这段对话整理成文章」 |
| repo-feature-distill | 「从 A 仓库蒸馏 X 功能到 B 仓库」 |

- [ ] **Step 3: 创建 `docs/dependencies.md`**

列出 manifest 中所有 `requires` 和 `requires_mcp`，说明需单独安装。

- [ ] **Step 4: 创建 `docs/skill-anatomy.md` 和 `CONTRIBUTING.md`**

基于设计 spec 第 3 节和规范，说明 phases/ 结构、HARD-GATE、manifest 同步要求。

- [ ] **Step 5: Commit**

```bash
git add docs/ CONTRIBUTING.md README.md
git commit -m "docs: add setup, testing, dependencies, and contributing guides"
```

---

### Task 9: 更新 find-skills

**Files:**
- Modify: `~/.agents/skills/find-skills/SKILL.md`

- [ ] **Step 1: 在 find-skills 末尾新增章节**

标题：`## Personal Skills Registry (xiaozhi93/agent-skills)`

内容：
- 仓库 URL 和 manifest raw URL
- 4 个技能的 triggers 摘要表
- 安装命令模板（单个 / 全部）
- 外部依赖提示
- 明确：不上架 skills.sh，用 GitHub URL 直接安装

- [ ] **Step 2: 验证 find-skills frontmatter 仍合法**

- [ ] **Step 3: 不 commit 到 agent-skills 仓库**（find-skills 在 `~/.agents/skills/`，属本地全局配置；在 agent-skills README 的 dependencies 中注明）

---

### Task 10: 创建 GitHub 远程仓库并推送

**Files:**
- Remote: `git@github.com:xiaozhi93/agent-skills.git`

- [ ] **Step 1: 创建 GitHub 仓库**

```bash
gh repo create xiaozhi93/agent-skills --public --source ~/Projects/agent-skills --remote origin --description "Personal agent skills: app distill, UI redesign, conversation-to-article, repo feature distill"
```

- [ ] **Step 2: 推送**

```bash
cd ~/Projects/agent-skills
git push -u origin main
```

- [ ] **Step 3: 确认 CI 通过**

```bash
gh run list --repo xiaozhi93/agent-skills --limit 1
```

Expected: `completed` / `success`

---

### Task 11: 本地安装验证

- [ ] **Step 1: 本地 symlink 安装**

```bash
cd ~/Projects/agent-skills
./scripts/dev-link.sh --all
```

- [ ] **Step 2: 确认 symlink**

```bash
ls -la ~/.cursor/skills/app-distill
```

Expected: symlink 指向 `~/Projects/agent-skills/skills/app-distill`

- [ ] **Step 3: 远程 URL 安装测试（可选，验证发布后可用）**

```bash
npx skills add https://github.com/xiaozhi93/agent-skills --skill conversation-to-article -g -a cursor -y
```

- [ ] **Step 4: 在 Cursor 新对话中测试一个技能触发**

使用 `docs/dev-testing.md` 中的触发语。

---

## Spec Coverage Check

| Spec 要求 | Task |
|-----------|------|
| GitHub 公开仓库 | Task 10 |
| 4 技能迁移 | Task 2 |
| skills.manifest.json | Task 3 |
| npx skills 安装 | Task 8 docs + Task 11 |
| find-skills 集成 | Task 9 |
| 本地 dev symlink | Task 6 + Task 11 |
| validate-skills | Task 5 |
| validate-manifest | Task 4 |
| CI smoke-install | Task 7 |
| 外部依赖文档 | Task 8 |
| MIT License | Task 1 |

## Self-Review

- [x] 无 TBD / TODO 占位
- [x] 每个 spec 要求有对应 Task
- [x] 校验脚本为完整代码
- [x] 命令与预期输出明确
