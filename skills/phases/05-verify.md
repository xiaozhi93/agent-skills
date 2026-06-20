# Phase 5: 验证与交付

**目标：** 确认 MVP 可构建、可运行、核心路径可用，然后交付。

**参考：** `verification-before-completion`

## 验证清单

### 构建验证

- [ ] 依赖安装成功
- [ ] 构建/编译通过（无 error）
- [ ] 无阻塞性 lint 错误

### 运行验证

- [ ] 应用/服务可启动
- [ ] 至少一条核心用户路径可手动走通
- [ ] 关键错误有基本处理（不 crash）

### 范围验证

- [ ] 仅包含 Phase 1 确认的保留功能
- [ ] 未实现 Won't have 项
- [ ] 原仓库未被修改

### 文档验证

- [ ] `docs/MVP-SPEC.md` 存在且与实现一致
- [ ] README 含构建/运行说明

## 平台特定命令（示例）

| 平台 | 构建 | 运行 |
|------|------|------|
| Android | `./gradlew assembleDebug` | `./gradlew installDebug` |
| iOS | `xcodebuild` | Simulator |
| Web (Vite) | `npm run build` | `npm run dev` |
| Node 后端 | `npm run build` | `npm start` |

**必须实际运行命令**，用输出作为证据，不可仅凭「应该能跑」宣告完成。

## 交付报告

```markdown
## MVP 已交付

**项目路径：** /absolute/path/to/mvp/
**技术栈：** …
**保留功能：** …

### 验证证据
- 构建：`<命令>` → 成功
- 运行：`<命令>` → 成功
- 核心路径：…

### 已知限制
- …

### 后续扩展建议
- …
```

## 门禁

全部必检项 ✅ 后宣告完成。验证失败 → 回流 Phase 4 修复。
