---
layout: home
hero:
    name: "友情链接"
---

<!-- # 友情链接 -->

<script setup>
    import templatewrapper from './friendship-card/template-wrapper.md'
    import nagiblogicsintop from './friendship-card/nagi.blog.icsin.top.md'
</script>



<div class="friendship-links-grid">
    <nagiblogicsintop />
    <!-- <templatewrapper /> -->
    <!-- <templatewrapper /> -->
</div>



<!-- 私有样式 -->
<style scoped>
/* 友情链接容器布局 Grid 响应式多列 */
.friendship-links-grid {
    display: grid;

    /* 调整 minmax 的值 以增加或减少卡片 */
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

    /* 网格行和列之间的间距 */
    /* gap: 1%; */

    /* margin: 0; */
    /* padding: 0; */
}
</style>
