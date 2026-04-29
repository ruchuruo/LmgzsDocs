<template>
  <transition name="fade" v-if="frontmatter.layout !== 'home'">
    <div 
      v-show="isVisible" 
      class="back-to-top" 
      @click="togglePosition"
      :title="isReturnMode ? '返回之前浏览' : '返回顶部'"
    >
      <svg v-if="isReturnMode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M13 16.172l5.364-5.364 1.414 1.414L12 20.707l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/>
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 3.293l7.778 7.778-1.414 1.414L13 7.828z"/>
      </svg>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
// 核心修改：引入 VitePress 的 useData
import { useData } from 'vitepress'

const { frontmatter } = useData()

const isVisible = ref(false)
const isReturnMode = ref(false) // false: 准备返回顶部; true: 准备返回原处
const previousY = ref(0) // 记录点击返回顶部时的位置
const isScrolling = ref(false) // 滚动锁，防止代码触发的滚动干扰逻辑
const threshold = 1000 // 向下滚动 1000px 后显示按钮
let scrollTimeout = null

// 更新按钮状态
const updateState = () => {
  const currentY = window.scrollY
  
  // 细节优化：如果用户在顶部手动往下滑动了一段距离，自动取消“返回原处”模式
  if (isReturnMode.value && currentY > 100) {
    isReturnMode.value = false
  }
  if (!isReturnMode.value) {
    // 正常模式下，超过设定距离显示按钮
    isVisible.value = currentY > threshold
  } else {
    // 处于返回原处模式时，按钮始终保持显示
    isVisible.value = true
  }
}

// 监听滚动事件
const handleScroll = () => {
  if (isScrolling.value) {
    // 如果是通过点击按钮触发的平滑滚动，通过防抖延迟判断，直到滚动真正停止
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      isScrolling.value = false
      updateState()
    }, 150) 
    return
  }
  updateState()
}

// 点击按钮切换位置
const togglePosition = () => {
  isScrolling.value = true
  if (!isReturnMode.value) {
    // 动作：返回顶部
    previousY.value = window.scrollY
    isReturnMode.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    // 动作：返回之前浏览位置
    isReturnMode.value = false
    window.scrollTo({ top: previousY.value, behavior: 'smooth' })
  }
  
  // 触发防抖锁
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isScrolling.value = false
    updateState()
  }, 150)
}

// 注意 VitePress 是 SSR 渲染，必须在 Mounted 之后访问 window
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  updateState()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  clearTimeout(scrollTimeout)
})
</script>

<style scoped>
.back-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--vp-c-brand-1); /* 使用 VitePress 主题色 */
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  transition: background-color 0.3s, transform 0.2s;
}

.back-to-top:hover {
  background-color: var(--vp-c-brand-2);
  transform: scale(1.05);
}

.back-to-top:active {
  transform: scale(0.95);
}

/* Vue 的淡入淡出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>