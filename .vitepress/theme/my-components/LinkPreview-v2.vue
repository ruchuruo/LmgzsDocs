
<!-- 
    链接预览组件

        传送组件 <Teleport>
            https://cn.vuejs.org/guide/built-ins/teleport
            <Teleport> 是一个内置组件，它可以将一个组件内部的一部分模板“传送”到该组件的 DOM 结构外层的位置去
            <Teleport> 接收一个 to prop 来指定传送的目标。to 的值可以是一个 CSS 选择器字符串，也可以是一个 DOM 元素对象。这段代码的作用就是告诉 Vue“把以下模板片段传送到 body 标签下”

        悬浮窗遮罩
            https://cn.vuejs.org/guide/essentials/event-handling
            "v-on" 监听事件 点击后 执行函数 closePreview()
            "v-on:click.self"
            仅当 event.target 是元素本身时才会触发事件处理器
            例如：事件处理器不来自子元素
            在浏览器中存在 事件冒泡(Event Bubbling) 机制, 用来防止 点击弹窗内容时意外触发关闭弹窗的动作

        icon
            关闭 https://yesicon.app/fa/close
            打开 https://yesicon.app/material-symbols/open-in-new
            打开 https://yesicon.app/material-symbols/open-in-new-down
            预览 https://yesicon.app/qlementine-icons/preview-16
 -->

<template>
    <!-- 传送组件 -->
    <Teleport to="body">
        <!-- 过渡动画组件 -->
        <transition name="link-preview-fade"
                    v-if="frontmatter.layout !== 'home'"
        >
            <!-- 悬浮窗遮罩 -->
            <div class=          "preview-overlay"
                 v-if=           "previewIsVisible === true"
                 v-on:click.self="closePreview()"
            >
                <!-- 悬浮窗主体 -->
                <div class="preview-modal">
                    <!-- 悬浮窗头部 -->
                    <div class="preview-header">
                        <!-- 标题 -->
                        <span class="preview-title">页面预览</span>

                        <!-- 行动 -->
                        <div class="preview-actions">
                            <a class=      "action-btn"
                               title=      "在当前标签页打开"
                               target=     "_self"
                               v-bind:href="previewUrl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v7h-2V5H5v14h7v2zm9 0v-2h3.6L8.3 9.7l1.4-1.4l9.3 9.275V14h2v7z"/></svg>
                            </a>

                            <a class=      "action-btn"
                               title=      "在新标签页打开"
                               target=     "_blank"
                               v-bind:href="previewUrl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413T19 21zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4z"/></svg>
                            </a>

                            <button class=     "action-btn"
                                    title=     "关闭"
                                    v-on:click="closePreview()"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="0.93em" height="1em" viewBox="0 0 1216 1312"><path fill="currentColor" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68"/></svg>
                            </button>
                        </div>
                    </div>

                    <!-- iframe 容器 -->
                    <div class="preview-content">
                        <div class="loading-spinner"
                             v-if= "previewContentIsLoading === true"
                        >加载中...</div>

                        <iframe class=     "preview-iframe"
                                v-show=    "previewContentIsLoading === false"
                                v-bind:src="previewUrl"
                                v-on:load= "onIframeLoad()"
                        ></iframe>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>





<!--  -->
<script setup>
import { ref, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useData, useRoute } from 'vitepress'

const { frontmatter } =         useData();  // 获取页面 frontmatter, 在 home 页面不渲染
const route =                   useRoute(); // 获取当前路由信息
const previewIsVisible =        ref(false); // 预览窗是否可见
const previewContentIsLoading = ref(false); // 预览内容是否正在加载
const previewUrl =              ref('');    // 预览页面 URL
let scrollPositionY =           0;          // 滚动位置，打开预览前记录

let mutationObserver =          null;       // MutationObserver 接口提供了监视对 DOM 树所做更改的能力。它被设计为旧的 Mutation Events 功能的替代品，该功能是 DOM3 Events 规范的一部分

// 链接插入的图标
const linkInsertIcon =          `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M12 4.57a.5.5 0 0 0-.024-.235l-.013-.063a1.5 1.5 0 0 0-.18-.434c-.092-.15-.222-.28-.482-.54L8.711.707c-.259-.26-.389-.39-.54-.483a1.5 1.5 0 0 0-.496-.193a.5.5 0 0 0-.235-.024C7.329.004 7.194.004 7.015.004h-2.21c-1.68 0-2.52 0-3.16.327a3.02 3.02 0 0 0-1.31 1.31C.008 2.283.008 3.12.008 4.8v6.4c0 1.68 0 2.52.327 3.16a3.02 3.02 0 0 0 1.31 1.31c.642.327 1.48.327 3.16.327h2.423c.401 0 .602-.523.347-.832a.45.45 0 0 0-.345-.168H4.8c-.857 0-1.44-.001-1.89-.038c-.438-.036-.663-.1-.819-.18a2 2 0 0 1-.874-.874c-.08-.156-.145-.38-.18-.819c-.036-.45-.037-1.03-.037-1.89v-6.4c0-.857 0-1.44.037-1.89c.036-.438.101-.663.18-.819c.192-.376.498-.682.874-.874c.156-.08.381-.145.82-.18C3.36.997 3.94.997 4.8.997H7v3.5a.5.5 0 0 0 .5.5H11v.547c0 .25.207.45.456.473c.285.025.543-.188.543-.474V4.99c0-.178 0-.313-.005-.425zM8 1.41L10.59 4H8z" clip-rule="evenodd"/><path fill="currentColor" fill-rule="evenodd" d="M11 15c.834 0 1.61-.255 2.25-.691l1.47 1.47a.749.749 0 1 0 1.06-1.06l-1.47-1.47c.436-.641.691-1.41.691-2.25c0-2.21-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0-1c1.66 0 3-1.34 3-3s-1.34-3-3-3s-3 1.34-3 3s1.34 3 3 3" clip-rule="evenodd"/></svg>`;

// iframe 内部页面 需要隐藏的选择器列表
const selectorsHidedList =      ['.VPNav', '.VPFooter', '.VPLocalNav', '.VPSidebar', '.VPDocFooter > .prev-next'];



// 重置变量数值
function resetVariable() {
    previewIsVisible.value =        false;
    previewContentIsLoading.value = false;
    previewUrl.value =              '';
}

// 阻止主页面滚动
function preventMainPageScroll() {

    // 记录 滚动位置
    scrollPositionY = window.scrollY;

    // 计算滚动条宽度
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth || 0;

    // 样式
    document.body.style.position = 'fixed';                                     // 阻止页面滚动
    document.body.style.top = `-${scrollPositionY}px`;                          // 滚动位置固定
    document.getElementById("app").style.paddingRight = `${scrollBarWidth}px`;  // 填充 防止内容偏移
}

// 恢复主页面滚动
function restoreMainPageScroll() {

    // 延时执行 (避免 VitePress 路由干扰)
    setTimeout(() => {
        // 样式
        document.body.style.position = '';
        document.body.style.top = '';
        document.getElementById("app").style.paddingRight = '';

        // 滚回 滚动位置
        window.scrollTo(0, scrollPositionY);
    }, 100)
}

// 打开预览窗
function openPreview(url) {
    previewIsVisible.value = true;
    previewContentIsLoading.value = true;
    previewUrl.value = url;

    // 阻止主页面滚动
    preventMainPageScroll();

    // 向浏览器历史栈推入一个带有 标识(previewModalOpen) 的新状态
    history.pushState({ previewModalOpen: true }, '');
}

// 关闭预览窗
function closePreview() {
    previewIsVisible.value = false;
    previewContentIsLoading.value = false;
    previewUrl.value = '';

    // 恢复主页面滚动
    restoreMainPageScroll();

    // 通过点击按钮或遮罩层主动关闭的
    // 需要检查当前历史状态是否是主动推入的那个
    if (history.state && history.state.previewModalOpen) {
        // 是 主动回退一步
        history.back();
    }
}

// iframe 加载完成时
function onIframeLoad() {
    previewContentIsLoading.value = false;

    // 隐藏 iframe 内部页面 选择器列表中的元素
    try {
        // 获取 iframe 内部对象
        const iframeDocument = document.querySelector('.preview-iframe').contentDocument;

        // 避免重复注入样式表 检查是否已经有了预览样式表 (通过 id 选择器)
        if (iframeDocument.getElementById('preview-custom-style')) return;

        // 注入静态 CSS 样式表
        const style = iframeDocument.createElement('style');
        style.type = 'text/css';
        style.id = 'preview-custom-style';
        style.innerHTML = `
            ${selectorsHidedList.join(', ')} {
                display: none !important;
            }
            /* 禁用 iframe 内部所有过渡动画 提升流畅度 */
            * {
                transition: none !important;
                animation: none !important;
            }
            /* 修正正文区域边距 防止隐藏后留白 */
            .VPContent.has-sidebar { padding-left: 0 !important; }
        `;
        iframeDocument.head.appendChild(style);

    } catch (error) {
        console.warn('无法访问 iframe 内部文档 可能是跨域问题: ', error);
    }
}

// 判断是否为本站内部链接且非 <h>里的<a class="header-anchor">
function isInternalLink(element) {

    const url = element.href;
    const currentDomain = window.location.hostname;

    try {
        // 解析 URL
        const linkUrl = new URL(url);

        // 是同域名
        const isSameDomain = linkUrl.hostname === currentDomain;

        // 排除标题锚点 VitePress 标题里的 a 标签通常有 header-anchor 类
        const isHeaderAnchor = element.classList.contains('header-anchor');

        if (isSameDomain && !isHeaderAnchor) {
            // 是同域名 并且 没有 header-anchor 类 返回真
            return true;
        }

        return false;

    } catch (error) {
        // 解析 URL 时发生错误
        return false;
    }

}

// 遍历文档插入预览按钮
function insertPreviewButtons() {

    // 在 home 页面不插入
    if (frontmatter.value.layout === 'home') return;

    const linkList = document.querySelectorAll('.vp-doc a');

    // 遍历所有链接
    for (let i = 0; i < linkList.length; i++) {

        const element = linkList[i];

        if (isInternalLink(element)) {
            // 是内部链接

            // 避免重复插入预览按钮 检查后面是否已经有了预览按钮 (按钮是邻居元素)
            if (element.nextSibling &&
                element.nextSibling.classList &&
                element.nextSibling.classList.contains('link-preview-button'))
            {
                return;
            }

            // 制作预览按钮
            const previewBtn = document.createElement('button');
            previewBtn.className = 'link-preview-button';
            previewBtn.title = '预览页面';
            previewBtn.innerHTML = linkInsertIcon;

            // 预览按钮添加点击事件
            previewBtn.onclick = (e) => {
                openPreview(element.href); // 打开预览窗
            };

            // 将预览按钮插入到链接后面
            // Node 接口的 insertBefore() 方法是将一个节点插入到指定父节点的子节点中，并位于参考节点之前
            element.parentNode.insertBefore(previewBtn, element.nextSibling);

            // console.log('插入预览按钮: ', element.href);
        }
    }
}

// 销毁 mutationObserver
function destroyMutationObserver() {
    if (mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
    }
}

// 初始化 mutationObserver
function initMutationObserver() {

    // 清理旧的 确保唯一性
    destroyMutationObserver();

    // 获取正文容器
    const docContainer = document.querySelector('.vp-doc');

    // 没有找到容器 直接返回
    if (!docContainer) return;

    // 创建 mutationObserver 实例 (看到变化后做什么)
    mutationObserver = new MutationObserver(() => {
        insertPreviewButtons();
    });

    // 开始观察 (观察什么变化)
    mutationObserver.observe(docContainer, { childList: true, subtree: true });
}

// 监听浏览器后退事件
function handlePopState(event) {
    if (previewIsVisible.value === true) {
        // 悬浮窗显示 拦截返回行为并关闭悬浮窗
        previewIsVisible.value = false;
        previewContentIsLoading.value = false;
        previewUrl.value = '';

        // 恢复主页面滚动
        restoreMainPageScroll();
    }
}

// 生命周期钩子 组件挂载
onMounted(() => {

    // 遍历文档插入预览按钮
    insertPreviewButtons();

    // 初始化 mutationObserver
    initMutationObserver();

    // 添加 popstate 监听
    window.addEventListener('popstate', handlePopState);
});

// 生命周期钩子 组件卸载
onUnmounted(() => {

    // 销毁 mutationObserver
    destroyMutationObserver();

    // 移除 popstate 监听
    window.removeEventListener('popstate', handlePopState);
});

// 监听 路由变化, VitePress 切换页面时重新插入预览按钮
watch(route, () => {

    // 重置变量数值
    resetVariable();

    // 延迟执行某些操作 直到下一次 DOM 更新循环结束之后再执行
    nextTick(() => {
        insertPreviewButtons(); // 遍历文档插入预览按钮
    });
});

</script>





<!-- 私有样式 -->
<style scoped>

/* 过渡动画组件 进入动画的生效&离开动画的生效状态 状态 */
.back-to-top-fade-enter-active,
.back-to-top-fade-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

/* 过渡动画组件 进入动画的 起始&结束 状态 */
.back-to-top-fade-enter-from,
.back-to-top-fade-leave-to {
    opacity: 0;
    transform: translateY(15px);
}

/* 悬浮窗遮罩 */
.preview-overlay {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(3px);
    z-index: 101;
}

/* 悬浮窗主体 */
.preview-modal {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 85vw;
    height: 85vh;
    max-width: 1200px;
    background-color: var(--vp-c-bg); /* 跟随 VitePress 的暗/亮色主题 */
    border-radius: 12px;
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);

    @media (max-width: 959px) {
        height: 64vh;
    }
}

/* 悬浮窗头部 */
.preview-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    border-bottom: 1px solid var(--vp-c-border);
    background-color: var(--vp-c-bg-soft);
}

.preview-title {
    font-weight: 600;
    color: var(--vp-c-text-1);
}

.preview-actions {
    display: flex;
    gap: 20px;
}

.action-btn {
    color: var(--vp-c-text-1);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px;
    border-radius: 4px;
    transition: 0.33s;
}

.action-btn:hover {
    color: var(--vp-c-brand);
    background-color: var(--vp-c-default-soft);
    transform: scale(1.5);
}

/* iframe 容器 */
.preview-content {
    flex: 1;
    position: relative;
    background-color: var(--vp-c-bg);
}

.loading-spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--vp-c-text-1);
    font-size: 2em;
}

iframe {
    width: 100%;
    height: 100%;
    border: none;
}

</style>



<!-- 全局样式 -->
<style>

/* 链接预览按钮 */
.link-preview-button {
    transform: scale(1.5);
    margin-left: 12px;
}

.link-preview-button:hover {
    transform: scale(2);
    transition: 0.33s;
}

</style>





<!-- 
    更新日志
    2026-07-22: v2.0 更新
        - 修复 在有滚动条的页面 打开预览窗 下层内容偏移 的问题
        - 修复 在有滚动条的页面 关闭预览窗 页面滚动到顶部 的问题

    2026-05-10: v2.0 发布
        - 打开预览窗 阻止主页面滚动
        - 关闭预览窗 重置状态
        - 浏览器返回事件处理 关闭预览窗

    2026-05-08: v1.0 发布
        - 内部链接 添加预览按钮
        - 预览 iframe 内页面可以 在新标签页打开 和 在当前标签页打开
 -->
