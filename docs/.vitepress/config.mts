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
                            { text: '文件夹', link: ' http://lmgzs.fun:440/files/', target: '_self'},
                            { text: '落梦 Skin (皮肤站)', link: 'http://lmgzs.fun:888/' }
                        ]
                    },
                    {
                        text: '本站壁纸',
                        items: [
                            { text: '115678062_p0', link: 'http://lmgzs.fun:441/imgs/pixiv/115678062_p0.png', target: '_self'},
                            { text: '115678062_p1', link: 'http://lmgzs.fun:441/imgs/pixiv/115678062_p1.png', target: '_self'},
                            { text: '102545981_p0', link: 'http://lmgzs.fun:441/imgs/pixiv/102545981_p0.jpg', target: '_self'}
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
            },
            {
                icon: { svg: '<svg xmlns="http://www.w3.org/2000/svg" width="113" height="128" viewBox="0 0 256 290"><path fill="#FF004F" d="M189.72 104.421c18.678 13.345 41.56 21.197 66.273 21.197v-47.53a67 67 0 0 1-13.918-1.456v37.413c-24.711 0-47.59-7.851-66.272-21.195v96.996c0 48.523-39.356 87.855-87.9 87.855c-18.113 0-34.949-5.473-48.934-14.86c15.962 16.313 38.222 26.432 62.848 26.432c48.548 0 87.905-39.332 87.905-87.857v-96.995zm17.17-47.952c-9.546-10.423-15.814-23.893-17.17-38.785v-6.113h-13.189c3.32 18.927 14.644 35.097 30.358 44.898M69.673 225.607a40 40 0 0 1-8.203-24.33c0-22.192 18.001-40.186 40.21-40.186a40.3 40.3 0 0 1 12.197 1.883v-48.593c-4.61-.631-9.262-.9-13.912-.801v37.822a40.3 40.3 0 0 0-12.203-1.882c-22.208 0-40.208 17.992-40.208 40.187c0 15.694 8.997 29.281 22.119 35.9"/><path d="M175.803 92.849c18.683 13.344 41.56 21.195 66.272 21.195V76.631c-13.794-2.937-26.005-10.141-35.186-20.162c-15.715-9.802-27.038-25.972-30.358-44.898h-34.643v189.843c-.079 22.132-18.049 40.052-40.21 40.052c-13.058 0-24.66-6.221-32.007-15.86c-13.12-6.618-22.118-20.206-22.118-35.898c0-22.193 18-40.187 40.208-40.187c4.255 0 8.356.662 12.203 1.882v-37.822c-47.692.985-86.047 39.933-86.047 87.834c0 23.912 9.551 45.589 25.053 61.428c13.985 9.385 30.82 14.86 48.934 14.86c48.545 0 87.9-39.335 87.9-87.857z"/><path fill="#00F2EA" d="M242.075 76.63V66.516a66.3 66.3 0 0 1-35.186-10.047a66.47 66.47 0 0 0 35.186 20.163M176.53 11.57a68 68 0 0 1-.728-5.457V0h-47.834v189.845c-.076 22.13-18.046 40.05-40.208 40.05a40.06 40.06 0 0 1-18.09-4.287c7.347 9.637 18.949 15.857 32.007 15.857c22.16 0 40.132-17.918 40.21-40.05V11.571zM99.966 113.58v-10.769a89 89 0 0 0-12.061-.818C39.355 101.993 0 141.327 0 189.845c0 30.419 15.467 57.227 38.971 72.996c-15.502-15.838-25.053-37.516-25.053-61.427c0-47.9 38.354-86.848 86.048-87.833"/></svg>' },
                link: 'https://www.douyin.com/user/MS4wLjABAAAAqC8EiHB_LmodlKVZh6wOiL1tTjTPBseGbN34C-tdN0jSAgqNd7Dv-UGV_eKXO979'
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
            copyright: 'Copyright © 2019-present 落梦工作室'
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
