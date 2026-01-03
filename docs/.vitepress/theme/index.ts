import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress'
import { useRoute } from 'vitepress';

// 选项卡 vitepress-plugin-tabs
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

// 图片查看 vitepress-plugin-image-viewer
import imageViewer from 'vitepress-plugin-image-viewer';

// 引入样式
import 'viewerjs/dist/viewer.min.css';

// 引入自定义样式
import "./styles/home-page.css";              // 主页样式
import "./styles/class-VPNavBar.css";         // 导航栏样式
import "./styles/element-body-background.css" // 元素 body样式 背景
import "./styles/id-app-background.css"       // id app的背景
import "./styles/fonts.css"                   // 字体



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
  }

} satisfies Theme;