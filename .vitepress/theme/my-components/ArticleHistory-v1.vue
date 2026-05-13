
<!-- 
    文章历史组件

    icon
        https://yesicon.app/gridicons/create
        https://yesicon.app/material-symbols/update
        https://yesicon.app/material-symbols/edit
 -->

<template>
    <div class="article-history"
         v-if="frontmatter.layout !== 'home' && articleData"
    >
        <div class="history-item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5v2H5v14h14v-5z"/><path fill="currentColor" d="M21 7h-4V3h-2v4h-4v2h4v4h2V9h4z"/></svg></span>
            <span>创建日期: {{ formatDate(articleData.createTime) }}</span>
        </div>

        <div class="history-item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M12 21q-1.875 0-3.512-.712t-2.85-1.925t-1.925-2.85T3 12t.713-3.512t1.924-2.85t2.85-1.925T12 3q2.05 0 3.888.875T19 6.35V4h2v6h-6V8h2.75q-1.025-1.4-2.525-2.2T12 5Q9.075 5 7.038 7.038T5 12t2.038 4.963T12 19q2.625 0 4.588-1.7T18.9 13h2.05q-.375 3.425-2.937 5.713T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z"/></svg></span>
            <span>最后更新: {{ formatDate(articleData.updateTime) }}</span>
        </div>

        <div class="history-item">
            <span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M3 21v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM17.6 7.8L19 6.4L17.6 5l-1.4 1.4z"/></svg></span>
            <span>修订次数: {{ articleData.editCount }}</span>
        </div>
    </div>
</template>





<!--  -->
<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData();                                          // 获取页面 frontmatter
const articleData =     computed(() => frontmatter.value.myGitArticleData); // 获取页面 frontmatter 中的 myGitArticleData (如果目的是为了得到一个值, 用 computed; 如果目的是为了执行一段逻辑, 用 watch)



// 格式化时间 为 "YYYY-MM-DD 时:分:秒" 格式
function formatDate(timestamp) {

    // 时间戳不存在 返回空字符串
    if (!timestamp) return ''

    // 创建 Date 对象
    const date = new Date(timestamp)

    // 格式化日期
    return date.toLocaleString('zh-CN', {
        year:   'numeric',
        month:  '2-digit',
        day:    '2-digit',
        hour:   '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replace(/\//g, '-')
}

</script>





<!-- 私有样式 -->
<style scoped>
.article-history {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 48px;
    font-size: 0.9em;
    color: var(--vp-c-text-2);
    background: var(--vp-c-bg-soft);
    padding: 8px 14px;
    border-radius: 8px;
}

.history-item {
    display: flex;
    gap: 5px;

    @media (max-width: 959px) {
        width: 100%;
    }
}

.icon {
    font-size: 1.5em;
}

</style>





<!-- 
    更新日志
        2026-05-13: v1.0 发布
            - 文章顶部显示历史
 -->
