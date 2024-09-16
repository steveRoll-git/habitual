<script setup lang="ts">
import { onMounted, onUnmounted, ref, useTemplateRef } from 'vue'
import IconReset from './icons/IconReset.vue'

const emit = defineEmits<{
  slide: []
}>()

const slider = useTemplateRef('slider')
const sliderButton = useTemplateRef('slider-button')

const dragStart = ref<{ x: number; y: number } | undefined>()

const dragX = ref(0)

const buttonPointerDown = (e: PointerEvent) => {
  dragStart.value = { x: e.clientX, y: e.clientY }
}

const stopDragging = () => {
  dragStart.value = undefined
  dragX.value = 0
}

onMounted(() => {
  const onPointerMove = (e: PointerEvent) => {
    if (dragStart.value) {
      dragX.value = e.pageX - dragStart.value.x
      if (
        slider.value &&
        sliderButton.value &&
        dragX.value >= slider.value.clientWidth - sliderButton.value.clientWidth
      ) {
        stopDragging()
        emit('slide')
      }
    }
  }
  document.addEventListener('pointermove', onPointerMove)

  const onPointerUp = () => {
    if (dragStart.value) {
      stopDragging()
    }
  }
  document.addEventListener('pointerup', onPointerUp)

  onUnmounted(() => {
    document.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerup', onPointerUp)
  })
})
</script>

<template>
  <div class="slider" ref="slider">
    <div class="slider-background"></div>
    <div class="slider-button" ref="slider-button" @pointerdown="buttonPointerDown">
      <IconReset class="icon" />
    </div>
  </div>
</template>

<style scoped>
.slider {
  --slider-height: 74px;
  position: relative;
  border-radius: var(--radius-max);
  background-color: var(--color-frame-background);
  width: 100%;
  height: var(--slider-height);
}

.slider-background {
  position: absolute;
  clip-path: inset(0px calc(100% - v-bind('`${dragX}px`') - var(--slider-height) / 2) 0px 0px);
  border-radius: var(--radius-max);
  background-color: #ff3232;
  width: 100%;
  height: 100%;
}

.slider-button {
  position: absolute;
  left: clamp(0px, v-bind('`${dragX}px`'), calc(100% - var(--slider-height)));
  width: var(--slider-height);
  height: var(--slider-height);
  border-radius: var(--radius-max);
  background-color: var(--color-danger);
  touch-action: none;

  display: flex;
  justify-content: center;
  align-items: center;
}

.slider-button .icon {
  --size: calc(var(--slider-height) * 0.75);
  width: var(--size);
  height: var(--size);
}
</style>
