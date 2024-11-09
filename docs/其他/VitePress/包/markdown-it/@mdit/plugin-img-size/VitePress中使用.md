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
import { imgSize } from "@mdit/plugin-img-size";

// const mdIt = MarkdownIt().use(imgSize);

// mdIt.render("![image](https://example.com/image.png =300x200)");
```
```js
const MarkdownIt = require("markdown-it");
const { imgSize } = require("@mdit/plugin-img-size");

// const mdIt = MarkdownIt().use(imgSize);

// mdIt.render("![image](https://example.com/image.png =300x200)");
```
:::
::: info .vitepress/config.mts
```ts
export default defineConfig({
    markdown: {
        config(md: MarkdownIt) {
            md.use(imgSize);
        }
    }
})
```
:::

## 使用
```md
![Alt](/example.png =200x300)
![Alt](/example.jpg "Image title" =200x)
![Alt](/example.bmp =x300)
```

会被解析为
```html
<img src="/example.png" width="200" height="300" />
<img src="/example.jpg" title="Image title" width="200" />
<img src="/example.bmp" height="300" />
```
