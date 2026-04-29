<template>
  <transition name="fade-in" v-if="frontmatter.layout !== 'home'">
    <button 
      v-show="isVisible" 
      class="vp-back-to-top-button" 
      @click="togglePosition"
      :title="isReturnMode ? '返回之前浏览' : '返回顶部'"
    >
      <span class="vp-scroll-progress" role="progressbar" :aria-valuenow="scrollProgress">
        <svg>
          <circle 
            cx="26" 
            cy="26" 
            r="24" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="4" 
            :stroke-dasharray="`${Math.PI * scrollProgress * 0.48} ${Math.PI * (100 - scrollProgress) * 0.48}`"
          />
        </svg>
      </span>
      
      <div class="back-to-top-icon" :class="{ 'is-return': isReturnMode }">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" d="M24.008 14.1V42M12 26l12-12 12 12M12 6h24"/>
        </svg>
      </div>
    </button>
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
const threshold = 300 // 参照 VuePress，通常显示阈值会小一点，这里设为 300px
let scrollTimeout = null

// 记录滚动百分比进度 (0-100)
const scrollProgress = ref(0)

const updateState = () => {
  const currentY = window.scrollY
  
  // 计算进度
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
  if (scrollHeight > 0) {
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
/* 核心按钮样式复刻 */
.vp-back-to-top-button {
  position: fixed;
  right: 1rem;
  bottom: 4rem;
  z-index: 100;
  
  width: 48px;
  height: 48px;
  padding: 12px;
  border-width: 0;
  border-radius: 50%;

  /* 适配 VitePress 的主题变量 */
  background: var(--vp-c-bg);
  color: var(--vp-c-brand-1);
  box-shadow: 2px 2px 10px 4px var(--vp-c-shadow-3, rgba(0, 0, 0, 0.1));

  cursor: pointer;
  transition: color 0.3s, transform 0.2s;
}

/* 移动端缩小 */
@media (max-width: 959px) {
  .vp-back-to-top-button {
    transform: scale(0.8);
    transform-origin: 100% 100%;
  }
}

@media print {
  .vp-back-to-top-button {
    display: none;
  }
}

.vp-back-to-top-button:hover {
  color: var(--vp-c-brand-2);
}

.vp-back-to-top-button:active {
  transform: scale(0.95);
}

/* 图标容器样式 */
.back-to-top-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

/* 当处于“准备返回之前浏览位置”模式时，通过翻转图标实现方向朝下 */
.back-to-top-icon.is-return {
  transform: rotate(180deg);
}

/* 进度条外部包裹层复刻 */
.vp-scroll-progress {
  position: absolute;
  right: -2px;
  bottom: -2px;
  width: 52px;
  height: 52px;
  pointer-events: none;
}

.vp-scroll-progress svg {
  width: 100%;
  height: 100%;
}

.vp-scroll-progress circle {
  opacity: 0.9;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dasharray 0.1s ease-out;
}

/* 动画效果适配 */
.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-in-enter-from,
.fade-in-leave-to {
  opacity: 0;
  transform: translateY(15px);
}
</style>