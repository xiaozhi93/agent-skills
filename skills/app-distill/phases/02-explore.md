# Phase 2: 原仓探索

**目标：** 产出「原仓功能映射表」——每个保留功能在原代码中的入口、关键文件、依赖关系。

## 探索策略

### GitNexus 可用（优先）

遵循 `gitnexus-exploring` 工作流：

```
1. READ gitnexus://repos
2. READ gitnexus://repo/{name}/context
3. gitnexus_query({query: "<保留功能关键词>"})
4. gitnexus_context({name: "<关键符号>"})
5. READ gitnexus://repo/{name}/process/{name}
```

### GitNexus 不可用（降级）

```
1. 读 README、build 文件、入口点（MainActivity / index / main）
2. Grep 功能关键词（页面名、路由、API 路径）
3. 追踪 2-3 条核心用户路径的调用链
4. 记录外部依赖（SDK、API、数据库）
```

## 映射表模板

```markdown
## 原仓功能映射表

| 功能 | 入口 | 关键文件 | 数据/API | 外部依赖 | 复杂度 |
|------|------|----------|----------|----------|--------|
| 用户登录 | LoginActivity | auth/LoginViewModel.kt | POST /api/login | Firebase Auth | 中 |
| 商品列表 | ProductFragment | ui/product/* | GET /api/products | Retrofit | 低 |
```

**复杂度：** 低 / 中 / 高 — 帮助 Phase 3 排优先级。

## 探索深度

| 功能优先级 | 探索深度 |
|------------|----------|
| 核心（必保留） | 完整调用链 + 数据模型 + 错误处理 |
| 次要（可选） | 入口 + 关键文件即可 |
| 已排除 | 不探索 |

## 产出检查

- [ ] 每个保留功能至少有一条映射记录
- [ ] 识别共享模块（网络层、数据库、通用 UI 组件）
- [ ] 标注可砍的间接依赖（Analytics、Crashlytics 等）
- [ ] 标注换栈时的等价替代方案（如 Room → SQLite / Prisma）

## 门禁

映射表完成且覆盖所有保留功能 → Phase 3。
