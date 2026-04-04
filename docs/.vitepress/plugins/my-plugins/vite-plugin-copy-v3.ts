
/**
vite 插件 复制目录

    参数说明
        mode   : 模式
        src    : 源路径
        dest   : 目标路径
        exclude: 排除 源路径 中的 指定内容 (可选)

    使用示例
        复制 指定的 文件 或 目录 到指定地方
            mode   : "file"
            src    : "./docs/public/apaxy/htaccess.txt"
            dest   : "./docs/.vitepress/dist/.htaccess"
            exclude: ""

        递归复制 指定目录内 指定类型 的 所有文件 到 指定目录 的相同位置
            mode   : "fileType"
            src    : "./docs/*.pdf"
            dest   : "./docs/.vitepress/dist/"
            exclude: "./docs/.vitepress/"




 */


import fs from 'fs';
import path from 'path';


