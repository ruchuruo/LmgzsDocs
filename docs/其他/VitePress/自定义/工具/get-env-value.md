# 获取变量值

::: info 依赖
- `.env`变量文件
- [./load-env](./load-env.md)
:::
::: info 权限
- 读文件
:::





## 介绍
获取给定的 键 对应的 值, 返回 值 字符串

根据环境选择合适的 `.env`变量文件





## 使用
::: code-group
```ts
// 示例

import getEnvValue from './utils/<dir>/get-env-value'

const finalEnvValue = getEnvValue({
        devEnvFilePath:   './.env.public.development',
        buildEnvFilePath: './.env.public.production',
        encoding:         'utf-8',
        envKey:           '__lmgzsDocs_STATIC_ASSET_SERVER__',
    })
```
:::
