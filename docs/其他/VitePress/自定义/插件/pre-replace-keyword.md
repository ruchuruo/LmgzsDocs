# 预处理 替换关键字

::: info 依赖
- vitepress
- `.env`变量文件
- [./get-env-value](../工具/get-env-value.md)
:::
::: info 权限
- 读文件
:::





## 介绍
在预处理阶段替换关键字

从给定的 `.env` 变量文件中读取 键值，将 关键字 替换为 变量的值

用于替换 静态资源文件 引用链接

**为什么要这么做?**
<p>VitePress 是一个<a href="https://en.wikipedia.org/wiki/Static_site_generator" target="_blank" rel="noreferrer">静态站点生成器</a> (SSG)，专为构建快速、以内容为中心的站点而设计。</p>

有两种方式可以简单的存放 静态资源文件:
1. VitePress 官方推荐的做法是将 静态资源文件 放到 `./docs/public` 目录。
2. 将 静态资源文件 放到 外部Web服务器。

以上两种方式都有缺点:
1. 存放 `public` 目录。文件数量日益增长，让 下载、上传、构建 时处理这些文件耗费大量时间。
2. 外部Web服务器。如果服务器域名更改，将会是一件麻烦的事。

所以就有了现在这样的方法

在引用资源时填写关键字，在预处理阶段就能替换为实际的内容





## 使用
::: code-group
```txt [.env.public.development]
# .env.public.development
# 示例

# 静态资源服务器 URL
STATIC_ASSET_SERVER_URL=http://127.0.0.1:5500
```
:::
::: code-group
```ts [config.mts]
// .vitepress/config.mts
// 示例

import preReplaceKeyword from './plugins/<dir>/vitepress-plugin-pre-replace-keyword.ts';

export default defineConfig({
    vite: {
        plugins: [
            preReplaceKeyword({
                devEnvFilePath:     './.env.public.development',
                buildEnvFilePath:   './.env.public.production',
                encoding:           'utf-8',
                fileExtensionArray: ['.md', '.css'],
                keyAndEnv:          {
                    '__lmgzsDocs_STATIC_ASSET_SERVER__'          : 'DOCS_STATIC_ASSET_SERVER',
                    '__lmgzsDocs_BACKGROUND_IMAGE_LIGHT_SERVER__': 'BACKGROUND_IMAGE_LIGHT_SERVER',
                    '__lmgzsDocs_BACKGROUND_IMAGE_DARK_SERVER__' : 'BACKGROUND_IMAGE_DARK_SERVER'
                }
            })
        ]
    }
})
```
:::
::: code-group
```md [doc.md]
__lmgzsDocs_STATIC_ASSET_SERVER__

[文件](__lmgzsDocs_STATIC_ASSET_SERVER__/files/file.zip)

![图片](__lmgzsDocs_STATIC_ASSET_SERVER__/images/image.png)
```
:::





## 效果
::: code-group
```md [doc.md]
__lmgzsDocs_STATIC_ASSET_SERVER__

[文件](__lmgzsDocs_STATIC_ASSET_SERVER__/files/file.zip)

![图片](__lmgzsDocs_STATIC_ASSET_SERVER__/images/image.png)
```
:::
↓
::: code-group
```html [doc.html]
<p><a href="http://127.0.0.1:5500" target="_blank" rel="noreferrer">http://127.0.0.1:5500</a></p>

<p><a href="http://127.0.0.1:5500/files/file.zip" target="_blank" rel="noreferrer">文件</a></p>

<p><img src="http://127.0.0.1:5500/images/image.png" alt="图片"></p>
```
:::





## 注意事项
会替换给定文件中的所有关键字

修改 变量文件 后 需要重启开发服务器

确保 变量文件 不包含敏感内容 替换后的内容将直接暴露在前端页面源码中
