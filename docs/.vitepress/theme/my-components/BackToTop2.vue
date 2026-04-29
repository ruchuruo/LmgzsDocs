<template>
  <transition name="fade" v-if="frontmatter.layout !== 'home'">
    <div 
      v-show="isVisible" 
      class="back-to-top" 
      @click="togglePosition"
      :title="isReturnMode ? '返回之前浏览' : '返回顶部'"
    >
      <svg class="progress-ring" viewBox="0 0 44 44">
        <circle 
          class="progress-ring-bg" 
          stroke="rgba(255, 255, 255, 0.2)" 
          stroke-width="2" 
          fill="transparent" 
          r="20" 
          cx="22" 
          cy="22" 
        />
        <circle 
          class="progress-ring-bar" 
          stroke="#ffffff" 
          stroke-width="2" 
          fill="transparent" 
          r="20" 
          cx="22" 
          cy="22" 
          :style="{ 
            strokeDasharray: '125.66', 
            strokeDashoffset: 125.66 - (125.66 * scrollProgress) / 100 
          }"
        />
      </svg>

      <div class="icon-wrapper">
        <svg v-if="isReturnMode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M13 16.172l5.364-5.364 1.414 1.414L12 20.707l-7.778-7.778 1.414-1.414L11 16.172V4h2v12.172z"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="currentColor" d="M13 7.828V20h-2V7.828l-5.364 5.364-1.414-1.414L12 3.293l7.778 7.778-1.414 1.414L13 7.828z"/>
        </svg>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useData } from 'vitepress'

const { frontmatter } = useData()

const isVisible = ref(false)
const isReturnMode = ref(false) 
const previousY = ref(0) 
const isScrolling = ref(false) 
const threshold = 1000 
let scrollTimeout = null

// 新增：记录滚动百分比进度 (0-100)
const scrollProgress = ref(0)

// 更新按钮状态与进度
const updateState = () => {
  const currentY = window.scrollY
  
  // 新增：计算当前阅读进度
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  if (scrollHeight > 0) {
    // 限制进度在 0 ~ 100 之间
    scrollProgress.value = Math.min(100, Math.max(0, (currentY / scrollHeight) * 100))
  } else {
    scrollProgress.value = 0
  }
  
  if (isReturnMode.value && currentY > 100) {
    isReturnMode.value = false
  }
  if (!isReturnMode.value) {
    isVisible.value = currentY > threshold
  } else {
    isVisible.value = true
  }
}

const handleScroll = () => {
  if (isScrolling.value) {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      isScrolling.value = false
      updateState()
    }, 150) 
    return
  }
  updateState()
}

const togglePosition = () => {
  isScrolling.value = true
  if (!isReturnMode.value) {
    previousY.value = window.scrollY
    isReturnMode.value = true
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    isReturnMode.value = false
    window.scrollTo({ top: previousY.value, behavior: 'smooth' })
  }
  
  clearTimeout(scrollTimeout)
  scrollTimeout = setTimeout(() => {
    isScrolling.value = false
    updateState()
  }, 150)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  // 新增：监听窗口大小改变（避免由于调整窗口导致的文档高度变化导致进度计算不准）
  window.addEventListener('resize', updateState)
  updateState()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', updateState)
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
  background-color: var(--vp-c-brand-1);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
  transition: background-color 0.3s, transform 0.2s;
  /* 为内部 SVG 绝对定位做准备 */
  overflow: hidden; 
}

.back-to-top:hover {
  background-color: var(--vp-c-brand-2);
  transform: scale(1.05);
}

.back-to-top:active {
  transform: scale(0.95);
}

/* --- 新增：进度环相关样式 --- */
.progress-ring {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* 旋转 -90度，让 SVG 描边进度从 12 点钟方向开始，默认是 3 点钟方向 */
  transform: rotate(-90deg);
}

.progress-ring-bar {
  /* 增加进度条过渡效果，让滚动显示时更加平滑 */
  transition: stroke-dashoffset 0.1s ease-out;
  stroke-linecap: round;
}

/* 图标包裹层：独立出来悬浮在 SVG 进度条上方居中 */
.icon-wrapper {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}
/* ------------------------ */

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