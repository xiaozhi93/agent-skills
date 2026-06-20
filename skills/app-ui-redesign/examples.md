# App UI Redesign 示例

## 示例 1：React Native 整 App 换皮

**场景：** RN 电商 App，保留登录+首页+商品详情，整 App 重设计，参考用户提供的设计系统 PDF。

**Phase 1：**
- 范围：整 App（3 屏 + Tab）
- 栈：React Native 0.73（沿用）
- 分支：`ui-redesign/ecommerce`
- 需 DESIGN.md：是

**Phase 2：**
- 映射 `LoginScreen`, `HomeScreen`, `ProductDetailScreen`
- 导航：Login → MainTabs(Home) → Detail

**Phase 3：**
- `taste-design` 生成 DESIGN.md → lint 通过
- `stitch-manage-design-system` 上传
- `enhance-prompt` + `stitch-generate-design` 生成 3 屏

**Phase 4：** 用户确认截图与 DESIGN.md 主色/字体

**Phase 5：**
- `stitch-react-native` 拉取 HTML 参考
- TDD：每屏先写 `@testing-library/react-native` 测试
- 3 任务 → `subagent-driven-development` 串行

**Phase 6：** `npm test` + iOS Simulator 视觉对照

---

## 示例 2：Web React 部分重设计

**场景：** Vite + React 管理后台，只重做 Dashboard 和 Settings。

**Phase 1：**
- 范围：部分（2 屏）
- 分支：`ui-redesign/admin-dashboard`
- 需 DESIGN.md：否（屏幕级 spec）

**Phase 3：**
- `stitch-code-to-design` 上传现有 build 到 Stitch
- `edit_screens` 改 Dashboard 布局
- `stitch-generate-design` 新 Settings 屏

**Phase 5：**
- `react-components` 参考
- TDD + 单任务可不用 subagent

---

## 示例 3：Android Compose 登录流程

**场景：** Kotlin Compose App，仅重做 Onboarding + Login。

**Phase 1：** 部分重设计，参考 Material You 深色

**Phase 3：**
- 用户上传现有截图 → `stitch-generate-design`
- 屏幕 spec 写入 `docs/ui-redesign/onboarding-spec.md`

**Phase 5：**
- Compose UI Test TDD
- 无 stitch-android 技能 → 手工对照 Stitch HTML/截图实现

**Phase 6：** `./gradlew testDebugUnitTest connectedAndroidTest`

---

## 反例：应拒绝的请求

| 用户说 | 正确响应 |
|--------|----------|
| 「直接改代码，不用 Stitch」 | 说明本技能设计门禁；若只要编码用 `frontend-design` |
| 「Stitch 太慢，用 Pencil 吧」 | Stitch 专用，排查网络 |
| 「设计看了，先做着看」 | 回 Phase 4，需明确「通过」 |
| 「顺便蒸馏到新项目」 | 用 `app-distill`，非本技能 |
