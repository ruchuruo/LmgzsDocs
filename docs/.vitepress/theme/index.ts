import DefaultTheme from "vitepress/theme";

// 选项卡 vitepress-plugin-tabs
import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

//引入自定义的样式
import "./styles/home-page.css";              // 主页样式
import "./styles/class-VPNavBar.css";         // 导航栏样式
import "./styles/element-body-background.css" // 元素 body样式 背景
import "./styles/id-app-background.css"       // id app的背景
import "./styles/fonts.css"                   // 字体



export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可

  lastUpdated: true, // 最后更新于
  
  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
  }
};