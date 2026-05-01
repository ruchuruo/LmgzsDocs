
<!-- 
    返回顶部组件

        过渡动画组件 <transition>
            https://cn.vuejs.org/guide/built-ins/transition
            在 Vue.js 中，过渡动画是通过 Transition 组件实现的。这个组件可以在元素或组件进入和离开 DOM 时应用动画效果
            name="xxx" 的作用是为动画提供一个 "命名空间" 或 "前缀"

            https://cn.vuejs.org/guide/essentials/conditional#v-if
            "v-if" 条件渲染 在 home 页面不渲染

        返回按钮
            "id" 给 "返回图标 滚动百分比进度" aria-labelledby html 无障碍 读取

            https://cn.vuejs.org/guide/essentials/template-syntax.html#attribute-bindings
            "v-bind" Attribute绑定 title 根据变量 buttonMode 切换 鼠标悬停标题

            https://cn.vuejs.org/guide/essentials/conditional#v-show
            "v-show" 条件渲染 根据变量 visible 切换显示 (CSS display 属性)

            https://cn.vuejs.org/guide/essentials/event-handling
            "v-on" 监听事件 点击后 执行函数 togglePagePosition()

        返回图标
            "v-bind" Attribute绑定 class 根据变量 buttonMode 切换 名字

        返回图标 滚动百分比进度
            html 无障碍 role="progressbar"                      这是什么
            html 无障碍 aria-labelledby="back-to-top-button"    这叫什么
            html 无障碍 aria-valuemin="0"                       最小值
            html 无障碍 aria-valuemax="100"                     最大值
            html 无障碍 v-bind:aria-valuenow="scrollProgress"   这现在是多少
 -->

<template>
    <!-- 过渡动画组件 -->
    <transition name="back-to-top-fade"
                v-if="frontmatter.layout !== 'home'"
    >
        <!-- 返回按钮 -->
        <button id=          "back-to-top-button"
                class=       "back-to-top-button"
                v-bind:title="buttonMode === BUTTON_MODES.BACK_TO_TOP ? '返回顶部' : '返回之前浏览'"
                v-show=      "buttonVisible === true"
                v-on:click=  "togglePagePosition()"
        >
            <!-- 返回图标 -->
            <div class=       "back-to-top-icon"
                 v-bind:class="(buttonMode === BUTTON_MODES.BACK_TO_TOP) ? 'is-top' : 'is-return'"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24.008 14.1V42M12 26l12-12 12 12M12 6h24"/></svg>
            </div>

            <!-- 返回图标 滚动百分比进度 (0-100) -->
            <span class=               "back-to-top-scroll-progress"
                  role=                "progressbar"
                  aria-labelledby=     "back-to-top-button"
                  aria-valuemin=       "0"
                  aria-valuemax=       "100"
                  v-bind:aria-valuenow="buttonScrollProgress"
            >
                <svg>
                    <circle 
                        cx=                     "26"
                        cy=                     "26"
                        r=                      "24"
                        fill=                   "none"
                        stroke=                 "currentColor"
                        stroke-width=           "4"
                        v-bind:stroke-dasharray="`${Math.PI * buttonScrollProgress * 0.48} ${Math.PI * (100 - buttonScrollProgress) * 0.48}`"
                    />
                </svg>
            </span>
        </button>
    </transition>
</template>





<!--  -->
<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'



// 定义按钮模式枚举
const BUTTON_MODES = {
    BACK_TO_TOP:        0,
    RETURN_TO_PREVIOUS: 1,
};

// 
const { frontmatter } =        useData();                     // 获取页面 frontmatter, 在 home 页面不渲染
const buttonMode =             ref(BUTTON_MODES.BACK_TO_TOP); // 按钮模式, 0:点击后返回顶部 1:点击后返回之前浏览
const buttonVisible =          ref(false);                    // 返回按钮是否显示
const buttonVisibleThreshold = 600;                           // 按钮显示阈值, 向下滚动 numPx 后显示按钮
const buttonScrollProgress =   ref(0);                        // 滚动百分比进度 (0-100)
const previousPositionY =      ref(0);                        // 上一个位置Y, 记录点击返回顶部时的位置

// 区分 当前是在 程序自动向上滚动 还是 用户手动向下滚动
// 记录上一次滚动位置 判断滚动的方向, 只有在 向下滚动 且超过 xxx 像素时 才取消返回模式
const lastScrollPositionY =    ref(0);                        // 上一次的滚动位置



// 更新按钮状态
function updateButtonState() {

    const currentPositionY = window.scrollY;                                         // 获取窗口当前位置Y
    const isScrollingDown = currentPositionY > lastScrollPositionY.value;            // 当前是否正在向下滚动
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight; // 页面总高度 - 窗口高度 = 可滚动的总高度

    // 更新上一次的滚动位置
    lastScrollPositionY.value = currentPositionY;

    // 计算 滚动百分比进度 (0-100)
    if (scrollHeight > 0) {
        buttonScrollProgress.value = Math.min(100, Math.max(0, (currentPositionY / scrollHeight) * 100));
    } else {
        buttonScrollProgress.value = 0;
    }

    // 如果用户在顶部手动往下滑动了一段距离 则取消 "返回之前浏览" 模式
    if (buttonMode.value === BUTTON_MODES.RETURN_TO_PREVIOUS && 
        currentPositionY > 300 &&
        isScrollingDown === true // 防止平滑返回顶部(向上滚动) 时触发误判
    ) {
        buttonMode.value = BUTTON_MODES.BACK_TO_TOP;
    }

    // 根据当前模式更新按钮可见性
    switch (buttonMode.value) {

        // 模式0: 返回顶部
        // 超过设定距离显示按钮
        case BUTTON_MODES.BACK_TO_TOP:
            buttonVisible.value = currentPositionY > buttonVisibleThreshold;
            break;

        // 模式1: 返回之前浏览
        // 按钮始终保持显示
        case BUTTON_MODES.RETURN_TO_PREVIOUS:
            buttonVisible.value = true;
            break;
    }

    // console.log(`当前模式: ${buttonMode.value === BUTTON_MODES.BACK_TO_TOP ? '返回顶部' : '返回之前浏览'}, 当前Y: ${currentPositionY}, 按钮可见: ${buttonVisible.value}`);
}

// 页面滚动处理
function handleScroll() {
    updateButtonState();
}

// 按钮点击 切换页面位置
function togglePagePosition() {

    switch (buttonMode.value) {

        // 模式0: 返回顶部
        case BUTTON_MODES.BACK_TO_TOP:
            previousPositionY.value = window.scrollY; // 记录当前位置
            buttonMode.value = BUTTON_MODES.RETURN_TO_PREVIOUS;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            break;

        // 模式1: 返回之前浏览
        case BUTTON_MODES.RETURN_TO_PREVIOUS:
            buttonMode.value = BUTTON_MODES.BACK_TO_TOP;
            window.scrollTo({ top: previousPositionY.value, behavior: 'smooth' });
            break;
    }
}

// 生命周期钩子 组件挂载
onMounted(() => {
    // 添加滚动事件监听
    window.addEventListener('scroll', handleScroll);
});

// 生命周期钩子 组件卸载
onUnmounted(() => {
    // 移除滚动事件监听
    window.removeEventListener('scroll', handleScroll);
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



/* 按钮 */
.back-to-top-button {
    position: fixed;
    inset-inline-end: 1rem;
    bottom: 4rem;
    z-index: 100;

    width: 48px;
    height: 48px;
    padding: 12px;
    border-width: 0;
    border-radius: 50%;

    background: var(--vp-c-bg);
    color: var(--vp-c-purple-1);
    box-shadow: 0px 0px 10px 4px var(--vp-c-shadow-1, rgba(0, 0, 0, 0.1));

    cursor: pointer;

    transition: 0.33s;

    @media (max-width: 959px) {
        transform: scale(0.8);
        transform-origin: 100% 100%;
    }

    @media print {
        display: none;
    }

    &:hover {
        color: var(--vp-c-green-1);
    }

    .back-to-top-icon {
        overflow: hidden;

        width: 24px;
        height: 24px;
        margin: 0 auto;

        background: var(--vp-c-bg);

        mask-image: var(--vp-c-bg);
        mask-position: 50%;
        mask-size: cover;
    }
}



/* 按钮 图标 */
.back-to-top-icon {
    transition: 0.33s;
}

/* 模式0: 返回顶部 */
.back-to-top-icon.is-top {
  transform: rotate(0deg);
}

/* 模式1: 返回之前浏览 */
.back-to-top-icon.is-return {
  transform: rotateX(180deg);
}



/* 进度条 */
.back-to-top-scroll-progress {
    position: absolute;
    inset-inline-end: -2px;
    bottom: -2px;

    width: 52px;
    height: 52px;

    svg {
        width: 100%;
        height: 100%;
    }

    circle {
        opacity: 0.9;
        transform: rotate(-90deg);
        transform-origin: 50% 50%;
    }
}

</style>