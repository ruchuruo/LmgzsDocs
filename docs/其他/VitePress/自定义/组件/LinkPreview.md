# 链接预览

::: info 依赖
- vue
- vitepress
:::





## 介绍

在非`home`页面内部链接添加按钮 用于预览页面





## 使用
::: code-group
```ts [index.ts]
// .vitepress/theme/index.ts
// 示例

import LinkPreview from './<dir>/LinkPreview-{ver}.vue'

export default {
    Layout() {
        return h(DefaultTheme.Layout, null, {
            'layout-bottom': () => h(LinkPreview)
        })
    }
}
```
:::





## 效果
[./BackToTop.md](./BackToTop.md)

[./LinkPreview.md](./LinkPreview.md)

[./ArticleHistory.md](./ArticleHistory.md)
