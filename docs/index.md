---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "落梦工作室"
  text: ""
  tagline: "六杠十二纵，圆你初恋梦！"
  image:
    light: /images/logo/落梦工作室logo_N3_[已裁剪].png
    dark: /images/icon/icon.png
    alt: logo
  actions:
    - theme: brand
      text: 成员
      link: /成员/成员-index
    - theme: alt
      text: 加入我们
      link: /合作须知/合作须知-index

features:
  - title: "落梦工作室"
    details: 公告 帮助 更新日志 3D地图 贡献
    link: /落梦工作室/落梦工作室文档-index

  - title: 啸霄领域
    details: 公告 帮助 更新日志 贡献
    link: /啸霄领域/啸霄领域文档-index
    
  - title: 其他
    details: 我的世界模组 VitePress...
    link: /其他/其他文档-index

  - title: 合作须知
    details: 文档合作 多平台管理员 设备合作
    link: /合作须知/合作须知-index
---

<!-- 
  有效的 设置body::before.height的var值 使其背景图片遮罩能填满整个屏幕
  bug: 当加载更长的页面再返回较短的页面时，
    不会重设body::before.height，需要刷新页面才能重设
-->
<!-- 
<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();

function setBeforeHeight() {
    const root = document.querySelector(":root");
    const DOMW = document.body.clientWidth;
    const DOMH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);

    console.log(DOMW, DOMH, root);

    root.style.setProperty('--body-before-height', `${DOMH}px`);
}

onMounted(() => {
    setBeforeHeight();
    window.addEventListener('resize', setBeforeHeight);

    // 监听路由变化
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' || mutation.type === 'attributes') {
                setBeforeHeight();
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true, attributes: true });
});

onUnmounted(() => {
    window.removeEventListener('resize', setBeforeHeight);
});
</script> 
-->