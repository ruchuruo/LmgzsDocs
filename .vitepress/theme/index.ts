import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress'
import { useRoute } from 'vitepress';
import { h } from 'vue'

// 选项卡 vitepress-plugin-tabs
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

// 图片查看 vitepress-plugin-image-viewer
import imageViewer from 'vitepress-plugin-image-viewer';

// 引入样式
import 'viewerjs/dist/viewer.min.css';

// 引入自定义样式
import "./my-styles/home-page.css";              // 主页样式
import "./my-styles/class-VPNavBar.css";         // 导航栏样式
import "./my-styles/element-body-background.css" // 元素 body样式 背景
import "./my-styles/id-app-background.css"       // id app的背景
import "./my-styles/fonts.css"                   // 字体

// 引入自定义组件
import BackToTop from './my-components/BackToTop-v2.vue'
import LinkPreview from './my-components/LinkPreview-v2.vue'
import ArticleHistory from './my-components/ArticleHistory-v1.vue'



export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    enhanceAppWithTabs(app);
  },

  setup() {
    // 获取路由
    const route = useRoute();

    // 使用 imageViewer
    imageViewer(route);
  },

  Layout() {
    return h(DefaultTheme.Layout, null, {

      // 将组件插入到底部插槽
      'layout-bottom': () => [
        h(BackToTop),
        h(LinkPreview)
      ],

      // 在文档正文内容之前插入
      'doc-before': () => h(ArticleHistory)
    })
  },

} satisfies Theme;