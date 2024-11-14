import { defineConfig } from 'vitepress'

// 插件 vitepress-sidebar
import VitePressSidebar from 'vitepress-sidebar';
import { vitepressSidebarOptions } from "./plugins/vitepress-sidebar/vitepressSidebarOptions.ts";

// 包 markdown-it
import MarkdownIt from "markdown-it";
// 插件 设置图片尺寸 @mdit/plugin-img-size
import { imgSize } from "@mdit/plugin-img-size";
// 选项卡 vitepress-plugin-tabs
import { tabsMarkdownPlugin } from 'vitepress-plugin-tabs';

// 引入自定义 Vite 插件
import copy_directory from './plugins/my-plugins/vite-plugin-copy-directory.ts';





// https://vitepress.dev/reference/site-config
export default defineConfig({
    lang: 'zh-CN',
    // base: "/files/markdown/", // 网站部署在非根路径下使用

    title: "落梦工作室文档",
    description: "A VitePress Site",

    ignoreDeadLinks: true, // 当设置为 true 时，VitePress 不会因为死链而导致构建失败。

    // 主题配置
    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {

        logo: "/images/icon/icon.png",
        
        // 导航栏
        nav: [
            { text: '主页', link: '/' },
            {
                text: '资源',
                items: [
                    {
                        text: '落梦其他网站',
                        items: [
                            { text: '文件夹', link: ' http://lmgzs.fun:444/files/', target: '_self'},
                            { text: '落梦 Skin (皮肤站)', link: 'http://lmgzs.fun:888/' }
                        ]
                    },
                    {
                        text: '本站壁纸',
                        items: [
                            { text: '115678062_p0', link: 'http://lmgzs.fun:444/files/img/115678062_p0.png', target: '_self'},
                            { text: '115678062_p1', link: 'http://lmgzs.fun:444/files/img/115678062_p1.png', target: '_self'},
                            { text: '102545981_p0', link: 'http://lmgzs.fun:444/files/img/102545981_p0.jpg', target: '_self'}
                        ]
                    },
                    {
                        text: '实用网站',
                        items: [
                            { text: '网站收藏夹', link: '/网站收藏夹/网站收藏夹-index' },
                            { text: '静态站点', link: '/静态站点/静态站点-index' }
                        ]
                    }
                ]
            },
            {
                text: '示例',
                items: [
                    { text: 'Markdown Examples', link: '/markdown-examples' },
                    { text: 'API Examples', link: '/api-examples' },
                    { text: '测试', link: '/测试/测试-index' },
                ]
            },
            {
                text: '文档',
                items: [
                    { text: '落梦工作室', link: '/落梦工作室/落梦工作室文档-index' },
                    { text: '啸霄领域', link: '/啸霄领域/啸霄领域文档-index' },
                    { text: '其他', link: '/其他/其他文档-index' },
                    { text: '合作须知', link: '/合作须知/合作须知-index' }
                ]
            }
        ],

        // 搜索框
        search: {
            provider: 'local'
        },

        // 左侧边栏
        sidebar: VitePressSidebar.generateSidebar(vitepressSidebarOptions),
        // sidebar: [// 左侧边栏
        //     {
        //         text: 'Examples',
        //         items: [
        //             { text: 'Markdown Examples', link: '/markdown-examples' },
        //             { text: 'Runtime API Examples', link: '/api-examples' }
        //         ]
        //     }
        // ],

        // 社交链接
        socialLinks: [
            { icon: 'github', link: '/' },
            {
                icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24"><path fill="#0891b2" d="M18.223 3.086a1.25 1.25 0 0 1 0 1.768L17.08 5.996h1.17A3.75 3.75 0 0 1 22 9.747v7.5a3.75 3.75 0 0 1-3.75 3.75H5.75A3.75 3.75 0 0 1 2 17.247v-7.5a3.75 3.75 0 0 1 3.75-3.75h1.166L5.775 4.855a1.25 1.25 0 0 1 1.767-1.768l2.652 2.652q.119.119.198.257h3.213q.08-.14.199-.258l2.651-2.652a1.25 1.25 0 0 1 1.768 0m.027 5.42H5.75a1.25 1.25 0 0 0-1.247 1.157l-.003.094v7.5c0 .659.51 1.198 1.157 1.246l.093.004h12.5a1.25 1.25 0 0 0 1.247-1.157l.003-.093v-7.5c0-.69-.56-1.25-1.25-1.25m-10 2.5c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25m7.5 0c.69 0 1.25.56 1.25 1.25v1.25a1.25 1.25 0 1 1-2.5 0v-1.25c0-.69.56-1.25 1.25-1.25"/></svg>' },
                link: 'https://space.bilibili.com/1915013301'
            }
        ],

        sidebarMenuLabel: "菜单",
        returnToTopLabel: "回到顶部",
        darkModeSwitchLabel: "主题(明/暗)",
        lightModeSwitchTitle: "切换到浅色模式",
        darkModeSwitchTitle: "切换到深色模式",

        outline: {
            level: "deep",
            label: "页面导航",
        },

        docFooter: {
            prev: "上一页",
            next: "下一页",
        },

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2023-present 落梦工作室'
        }
    },

    // Markdown It
    markdown: {
        // 为每个代码块启用行号
        lineNumbers: true,

        config(md: MarkdownIt) {
            // 插件 设置图片尺寸 @mdit/plugin-img-size
            md.use(imgSize);

            // 选项卡 vitepress-plugin-tabs
            md.use(tabsMarkdownPlugin);
        }
    },

    vite: {
        plugins: [

            // vite 插件 复制目录
            copy_directory({
                srcPath: "./docs/public/apaxy/htaccess.txt",
                destPath: "./docs/.vitepress/dist/.htaccess"
            }),
            // copy_directory({
            //     srcPath: "./docs/测试/",
            //     destPath: "./docs/.vitepress/dist/测试/"
            // }),
        ]
    }
})
