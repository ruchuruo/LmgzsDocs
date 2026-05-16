# 文章历史

::: info 依赖
- vue
- vitepress
- [./pre-page-frontmatter-injection-timestamp](../插件/pre-page-frontmatter-injection-timestamp.md)
:::





## 介绍
文章顶部显示历史

创建日期, 最后更新, 修订次数





## 使用
::: code-group
```ts [index.ts]
// .vitepress/theme/index.ts
// 示例

import ArticleHistory from './<dir>/ArticleHistory-{ver}.vue'

export default {
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'doc-before': () => h(ArticleHistory)
        })
    }
}
```
:::





## 效果
注意观察页面顶部
