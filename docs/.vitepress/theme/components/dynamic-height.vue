<!-- 
    失效的？
    dynamic-height.vue
    element-body-background.js
-->
<template>
    <div></div>
</template>

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

<style scoped>
/* 组件样式 */
</style>