<template>
  <div class="custom-layout">
    <DynamicHeight />
    <slot />
  </div>
</template>

<script setup>
import DynamicHeight from './components/DynamicHeight.vue'
</script>

<style scoped>
/* 你可以在这里添加一些全局样式 */
</style>