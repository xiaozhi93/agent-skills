# Phase 2: 原仓探索

**目标：** 产出「功能/UI 映射表」——屏幕、组件、导航、现有样式来源，供 Stitch 设计使用。

**纪律：** 此阶段**只读**，不修改原仓代码。

## 步骤

### 2.1 选择探索方式

- GitNexus 可用 → 读取并遵循 `gitnexus-exploring`
- 否则 → 按路由/导航/页面目录逐屏梳理

### 2.2 映射每个目标屏幕

对 Phase 1 确认的每个屏幕/模块记录：

| 字段 | 说明 |
|------|------|
| 屏幕 ID | 如 `login`, `home`, `settings` |
| 源码入口 | 文件路径 + 组件名 |
| 用户旅程 | 从哪来、到哪去 |
| 关键 UI 元素 | 表单、列表、Tab、Modal 等 |
| 现有样式来源 | Theme、StyleSheet、Tailwind config、Design tokens |
| 数据依赖 | 仅 UI 相关：mock 可否、是否需保留 loading/error 态 |

### 2.3 导航与信息架构

```markdown
## 信息架构

Home → Settings
Home → Detail → Edit
Login → Home（成功）
```

### 2.4 现有视觉语言快照（可选）

若存在 theme/colors/typography 配置，摘录关键 token，供 Phase 3 对比或 `stitch-extract-design-md` 输入。

### 2.5 输出功能/UI 映射表

```markdown
## 功能/UI 映射表

| 屏幕 | 源码 | 重设计优先级 | Stitch 屏幕名（草案） |
|------|------|-------------|----------------------|
| 登录 | src/screens/Login.tsx | Must | Login |
| 首页 | src/screens/Home.tsx | Must | Home |
| … | … | … | … |

## 导航结构
…

## 待 Stitch 设计的屏幕清单
1. Login
2. Home
…
```

## 门禁

映射表覆盖 Phase 1 确认的全部范围 → Phase 3。
