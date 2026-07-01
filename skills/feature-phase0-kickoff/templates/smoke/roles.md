# 角色与登录 — <feature-slug>

| role slug | 平台 | auth 文件 | 用户/说明 | 用于 Phase |
|-----------|------|-----------|-----------|-----------|
| admin | pc | `auth/pc/admin.json` | 待 Phase 0 填入 | Phase 1 PC |
| store-executor | h5 | `auth/h5/store-executor.json` | 待 Phase 0 填入 | Phase 3 H5 |

Phase 0 kickoff 时用户提供某角色登录 JSON → 写入对应 `auth/<platform>/<role-slug>.json` → 更新本表。
