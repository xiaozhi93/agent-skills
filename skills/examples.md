# App Distill 示例

## 示例 1：Android 原生 → 精简 MVP

**场景：** 用户有一个 50+ Activity 的 Android 电商 App，只想保留登录 + 商品列表。

**Phase 1 产出：**
- 保留：登录、商品列表
- 排除：支付、推送、聊天、推荐算法
- 技术栈：Kotlin + Jetpack Compose（沿用）
- 路径：`~/Projects/shop-mvp/`

**Phase 2 映射：**
- 登录 → `LoginActivity` / `AuthRepository` / `POST /api/login`
- 列表 → `ProductListFragment` / `ProductViewModel` / `GET /api/products`

**Phase 4 技能搜索：**
- `npx skills find android jetpack compose`
- 加载匹配的最佳实践技能后再 scaffold

---

## 示例 2：复杂 Web App → React MVP

**场景：** Next.js 全栈项目太复杂，用户要一个纯前端的任务管理 MVP。

**Phase 1 产出：**
- 保留：任务 CRUD、列表筛选
- 换栈：Vite + React（简化部署）
- 路径：`~/Projects/tasks-mvp/`

**Phase 4 技能搜索：**
- `npx skills find react best practices`
- 无技能 → `context7-mcp` 查 React 官方文档

---

## 示例 3：后端单体 → 最小 API 服务

**场景：** Spring Boot 单体 30+ 模块，只要用户认证 + 一个 REST 资源。

**Phase 1 产出：**
- 保留：JWT 认证、/items CRUD
- 换栈：FastAPI + SQLite（快速验证）
- 路径：`~/Projects/items-api-mvp/`

**Phase 5 验证：**
- `uvicorn main:app` 启动
- curl 走通 register → login → CRUD 路径
