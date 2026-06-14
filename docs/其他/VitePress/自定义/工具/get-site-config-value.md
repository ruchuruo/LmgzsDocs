# 获取网站配置值


::: info 依赖
- `.env`变量文件
- [./get-time](./get-time.md)
- [./get-env-value](./get-env-value.md)
:::
::: info 权限
- 读文件
:::





## 介绍
为 `.vitepress/config.mts` `defineConfig` 部分项获取值





## 使用
::: code-group
```ts
// 示例

import {
    getOutDir,
    getNavLogoServer,
    getFileIndexServer,
    getMinecraftSkinServer
} from './utils/<dir>/get-site-config-value.ts';

export default defineConfig({
    outDir: `./.vitepress/dist/${getOutDir() || 'NoneTime'}`,

    themeConfig: {
        logo: getNavLogoServer(),
    }
})
```
