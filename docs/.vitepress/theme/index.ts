import DefaultTheme from "vitepress/theme";

import { enhanceAppWithTabs } from 'vitepress-plugin-tabs/client'

//引入自定义的样式
import "./styles/home-page.css"; // 主页样式
import "./styles/navBar.css";    // 导航栏样式





export default {
  extends: DefaultTheme,
  // ...DefaultTheme, //或者这样写也可

  enhanceApp({ app }) {
    enhanceAppWithTabs(app)
  }
};