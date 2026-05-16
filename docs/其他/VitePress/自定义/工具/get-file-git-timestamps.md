# 获取文件Git时间戳

::: info 依赖
- node:fs
- node:path
- node:child_process
:::
::: info 权限
- 执行命令
:::





## 介绍
获取指定文件从创建到最后修改的所有 Git 提交时间戳





## 使用
::: code-group
```ts
// 示例

import getFileGitTimestamps from './utils/<dir>/get-file-git-timestamps'

const timestamps = await getFileGitTimestamps("./doc.md");
```
:::
