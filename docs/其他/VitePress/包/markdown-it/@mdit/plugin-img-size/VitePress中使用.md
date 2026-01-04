# VitePress中使用

## 安装

::: code-group

```sh [npm]
npm i -D @mdit/plugin-img-size
```

```sh [pnpm]
pnpm add -D @mdit/plugin-img-size
```

```sh [yarn]
yarn add -D @mdit/plugin-img-size
```

:::

## 导入
::: info .vitepress/config.mts
::: code-group
```ts
import MarkdownIt from "markdown-it";
import { legacyImgSize, imgSize, obsidianImgSize } from "@mdit/plugin-img-size";

// 新格式
const mdNew = MarkdownIt().use(imgSize);
mdNew.render("![image =300x200](https://example.com/image.png =300x200)");

// Obsidian 格式
const mdObsidian = MarkdownIt().use(obsidianImgSize);
mdObsidian.render("![image|300x200](https://example.com/image.png)");

// 旧格式
const mdLegacy = MarkdownIt().use(legacyImgSize);
mdLegacy.render("![image](https://example.com/image.png =300x200)");
```
:::
::: info .vitepress/config.mts
```ts
export default defineConfig({
    markdown: {
        config(md) {
            md.use(imgSize);
        }
    }
})
```
:::

## 语法

### 新语法

在图片替代文字后面添加 `=widthxheight`，并用空格分隔。

`width` 和 `height` 都应该是数字，单位为像素，并且都是可选的。

```md
![替代文字 =200x300](/example.png)
![替代文字 =200x](/example.jpg "标题")
![替代文字 =x300](/example.bmp)
```

渲染为 ↓

```html
<img src="/example.png" alt="替代文字" width="200" height="300" />
<img src="/example.jpg" alt="替代文字" title="标题" width="200" />
<img src="/example.bmp" alt="替代文字" height="300" />
```
