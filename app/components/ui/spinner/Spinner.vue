<script setup lang="ts">

interface SpinnerProps {
  size?: number
  color?: string
  speed?: number
}

withDefaults(defineProps<SpinnerProps>(), {
  size: 32,
  color: "text-primary",
  speed: 1.2
})
</script>

<template>
  <div
    class="relative inline-block"
    :class="color"
    :style="{ width: `${size}px`, height: `${size}px` }"
    role="status"
    aria-label="Loading">
    <div
      class="absolute w-3/4 h-3/4 top-[12.5%] left-[12.5%] border-4 border-solid border-current border-t-transparent rounded-full animate-spin"
      :style="{ animationDuration: `${speed}s` }"></div>
  </div>
</template>
