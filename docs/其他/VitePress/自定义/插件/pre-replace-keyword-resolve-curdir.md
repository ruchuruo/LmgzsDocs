# 预处理 替换关键字 为 当前目录 (相对路径)

::: info 依赖
- vitepress
- node:path
- `.env`变量文件
- [./get-env-value](../工具/get-env-value.md)
:::
::: info 权限
- 读文件
:::





## 介绍
在预处理阶段替换关键字 为当前目录

从给定的 `.env` 变量文件中读取 网站的项目根目录，用于计算相对路径

用于搭配 [vitepress-plugin-pre-replace-keyword.ts](./pre-replace-keyword.md) 插件使用

**为什么要这么做?**

简化填写

当 静态资源目录 和 文档目录 同时更改后 无需修改文档内容





## 使用
::: code-group
```txt [.env.public.development]
# .env.public.development
# 示例

# VitePress 网站的项目根目录 (在 VitePress 初始化时 默认为 "./docs")
VITEPRESS_PROJECT_ROOT_PATH=./docs
```
:::
::: code-group
```ts [config.mts]
// .vitepress/config.mts
// 示例

import preReplaceKeywordResolveCurdir from './plugins/<dir>/vitepress-plugin-pre-replace-keyword-resolve-curdir.ts';

export default defineConfig({
    vite: {
        plugins: [
            preReplaceKeywordResolveCurdir({
                devEnvFilePath:     './.env.public.development',
                buildEnvFilePath:   './.env.public.production',
                encoding:           'utf-8',
                fileExtensionArray: ['.md'],
                keyword:            "__cUR_DIR__",
                envKey:             "VITEPRESS_PROJECT_ROOT_PATH"
            })
        ]
    }
})
```
:::
::: code-group
```md [doc.md]
__cUR_DIR__

__lmgzsDocs_STATIC_ASSET_SERVER__/__cUR_DIR__

[文件](__lmgzsDocs_STATIC_ASSET_SERVER__/__cUR_DIR__/file.zip)

![图片](__lmgzsDocs_STATIC_ASSET_SERVER__/__cUR_DIR__/image.png)
```
:::





## 效果
- 假设当前文档目录为 `d1/d11/d11.md`
- 假设当前文件目录为 `d1/d11/files/file.zip`
- 假设当前图片目录为 `d1/d11/images/image.png`
::: code-group
```md [doc.md]
__cUR_DIR__

__lmgzsDocs_STATIC_ASSET_SERVER__/__cUR_DIR__

[文件](__lmgzsDocs_STATIC_ASSET_SERVER__/__cUR_DIR__/files/file.zip)

![图片](__lmgzsDocs_STATIC_ASSET_SERVER__/__cUR_DIR__/images/image.png)
```
:::
↓
::: code-group
```html [doc.html]
<p>d1/d11</p>

<p><a href="http://127.0.0.1:5500/d1/d11" target="_blank" rel="noreferrer">http://127.0.0.1:5500/d1/d11</a></p>

<p><a href="http://127.0.0.1:5500/d1/d11/files/file.zip" target="_blank" rel="noreferrer">文件</a></p>

<p><img src="http://127.0.0.1:5500/d1/d11/images/image.png" alt="图片"></p>
```
:::





## 注意事项
会替换给定文件中的所有关键字

修改 变量文件 后 需要重启开发服务器

确保 变量文件 不包含敏感内容 替换后的内容将直接暴露在前端页面源码中

静态资源目录 和 文档目录 结构必须相同
