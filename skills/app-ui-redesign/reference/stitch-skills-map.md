# Stitch 技能路由

Stitch MCP 提供工具；stitch-skills 提供 workflow。Phase 3/5 按场景**读取对应 SKILL.md** 再执行。

技能路径：`~/.agents/skills/` 或项目 `.agents/skills/`。

## MCP 工具（user-stitch）

| 工具 | 用途 |
|------|------|
| `list_projects` / `create_project` / `get_project` | 项目管理 |
| `list_screens` / `get_screen` | 屏幕查询 |
| `generate_screen_from_text` | 文本生成界面 |
| `edit_screens` / `generate_variants` | 编辑与变体 |
| `list_design_systems` / `create_design_system` | 设计系统 |
| `upload_design_md` / `apply_design_system` | DESIGN.md 上传与应用 |

调用前 `list_tools` 确认 MCP 前缀（如 `user-stitch`）。

## Phase 3 — 设计

| 场景 | 技能 | 说明 |
|------|------|------|
| 现有 Web 代码迁入 Stitch | `stitch-code-to-design` | 编排 extract-html → extract-design-md → upload |
| 源码提取 DESIGN.md（无法运行） | `stitch-extract-design-md` | 从本地源码反推 |
| 静态 HTML 快照 | `stitch-extract-static-html` | build 产物提取 |
| 大文件上传 | `stitch-upload-to-stitch` | 绕过 MCP base64 限制 |
| Prompt 润色 | `enhance-prompt` | 生成前必做 |
| 生成/编辑屏幕 | `stitch-generate-design` | 核心生成技能 |
| 从 Stitch 反推 DESIGN.md | `design-md` | 已有 Stitch 屏幕 |
| 主动制定高品位 DESIGN.md | `taste-design` | 无参考、反 AI 味 |
| 设计系统上传/应用 | `stitch-manage-design-system` | 应用到全项目 |
| 多页自主生成 | `stitch-loop` | 需 `.stitch/DESIGN.md` + `SITE.md` |

### 推荐路径

**路径 A — 有 Web 构建产物：**

```
stitch-code-to-design → stitch-generate-design（补屏） → design-md → stitch-manage-design-system
```

**路径 B — 移动端 / 无 build：**

```
taste-design 或 design-md → stitch-manage-design-system → enhance-prompt → stitch-generate-design
```

**路径 C — 仅部分屏幕：**

```
enhance-prompt → stitch-generate-design → edit_screens
```

## Phase 5 — 出码参考

| 栈 | 技能 |
|----|------|
| React Native | `stitch-react-native` |
| Web React (Vite) | `react-components` |
| shadcn/ui | `shadcn-ui` |
| Demo 视频 | `remotion` |

出码技能产出参考实现；**必须**在原仓用 TDD 重写集成，不可跳过测试。

## 易混淆对比

| 对比 | 区别 |
|------|------|
| `design-md` vs `stitch-extract-design-md` | 前者分析 **Stitch 项目**；后者从 **本地源码** |
| `design-md` vs `taste-design` | 前者反推；后者主动制定 |
| `stitch-generate-design` vs `stitch-loop` | 单屏/变体 vs 多页自主迭代 |
| MCP vs Skills | MCP 是工具 API；Skills 是流程说明书 |

## 故障排查

| 现象 | 处理 |
|------|------|
| MCP 超时 | 查网络/VPN，`curl -I https://stitch.googleapis.com` |
| 插件装了 Agent 不识别 | 以 `.agents/skills/` 为准，Reload Window |
| 大文件上传失败 | `stitch-upload-to-stitch` 脚本 |

详见：`docs/articles/cursor-google-stitch-ai-design.md`（cool-jsapi 项目内）。
