# 加载变量

::: info 依赖
- node:fs
- `.env`变量文件
:::
::: info 权限
- 读文件
:::





## 介绍
读取变量文件中的键值，可将变量键值添加到 环境变量`NodeJS.Process.env` 或是 返回一个包含环境变量的对象





## 使用
::: code-group
```ts
// 示例

import myLoadEnv from './load-env'

// 只获取环境变量 不添加到 "process.env" 中
const envObj: { [key: string]: string } | void = myLoadEnv('./.env.public.development', 'utf-8', false);

// 添加到 "process.env" 中
myLoadEnv('./.env.public.development', 'utf-8', true);
```
:::
