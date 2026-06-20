---
title: Agent Skill 怎么分类？一套按「工作阶段」划分的通用框架
summary: 技能不该按「写代码还是做 PPT」分，而该按澄清、理解、编排、交付、验证五个阶段分——适用于任何行业，也适用于你自己的技能库建设。
tags: [agent-skill, taxonomy, workflow]
source: conversation
---

# Agent Skill 怎么分类？一套按「工作阶段」划分的通用框架

技能一多就难找：有人按「会不会写代码」分，有人按行业分——但 Agent Skill 的核心不是交付物，而是**知识工作在哪个阶段**。按阶段分类，才能跨行业复用。

## 三层分工

先记住一条原则：**category 管阶段，tags 管交付物，description 管场景。**

- **category**：技能处于哪个认知阶段——与法律、营销、教育、软件开发无关
- **tags**：产出形态——`code`、`doc`、`video`、`presentation` 等
- **description**：具体行业语境——「为谁、解决什么问题」

软件开发的 PPT 技能和市场营销的 PPT 技能，category 都是 `deliver`，靠 tags 和 description 区分。

## 任务层：五类，各生成不同东西

| 阶段 | 生成什么 | 举例 |
|------|----------|------|
| 访谈/澄清 | 共识、需求、边界 | 客户访谈、brainstorming |
| 探索/理解 | 认知、分析、洞察 | 竞品调研、读代码、查文档 |
| 编排 | 计划、结构、调度 | 任务拆解、内容大纲 |
| 实施/交付 | 可使用的成品 | 文章、PPT、视频、代码 |
| 评审/验证 | 质量结论、修改意见 | 审片、校对、Code Review |

关键区分：**编排**生成「怎么做」，**交付**生成「做出来什么」。`writing-plans` 属于编排，不是交付。

## 元层：扩展技能生态

与任务层正交，管技能本身：

- **创建类**：把经验变成可复用技能。典型代表是 `writing-skills`——用 TDD 思路编写和验证 SKILL.md
- **使用元技能**：发现和调度技能，如 `find-skills`

创建类只管「造技能」，不把「做 PPT」「写规则」算进来。

## 落地：frontmatter + 实战案例

给技能打标签，最小 frontmatter：

```yaml
---
name: my-skill
description: Use when …
category: deliver
tags: [doc, workflow]
---
```

**实战案例：`conversation-to-article`**

把杂乱对话变成可分享文章，四步对应任务层：

1. **澄清** — 对齐受众、调性、范围
2. **编排** — 出大纲和素材映射，不按对话时间线堆砌
3. **交付** — 写正文
4. **验证** — 逐项检查后才发布

对话是原料，不是文章。这套流程本身，就是阶段分类的一次实践。

## 结论

**按工作阶段分主类，按交付物分标签，按场景写描述**——一套 category 走天下，不靠行业硬拆。

---

*本文由对话整理生成，使用 `conversation-to-article` 技能产出。*
