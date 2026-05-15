# 预处理 在页面的 frontmatter 中注入文件的 Git 时间戳

::: info 依赖
- vitepress
- [./get-file-git-timestamps](../工具/get-file-git-timestamps.md)
:::
::: info 权限
- 读文件
- 执行命令
:::





## 介绍
在预处理阶段 在页面的 frontmatter 中注入文件的 Git 时间戳

没有 frontmatter 将会添加 frontmatter





## 使用
::: code-group
```ts [config.mts]
// .vitepress/config.mts
// 示例

import prePageFrontmatterInjectionTimestamp from './plugins/<dir>/vitepress-plugin-pre-page-frontmatter-injection-timestamp.ts'

export default defineConfig({
    vite: {
        plugins: [
            prePageFrontmatterInjectionTimestamp({
                fileExtensionArray: ['.md']
            })
        ]
    }
})
```
:::





## 效果
::: code-group
```yaml [doc.md]
---
layout: home
hero:
    name: "doc.md"
---
```
:::
↓
::: code-group
```yaml [doc.md]
---
layout: home
hero:
    name: "doc.md"
myGitArticleData:
    createTime: 3376656000
    updateTime: 3376656000
    editCount: 6
---
```
:::





## 注意事项
无
