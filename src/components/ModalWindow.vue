<script setup lang="ts">
import IconClose from './icons/IconClose.vue'

defineProps<{
  title?: string
  closable?: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <div class="modal-window">
    <div class="header" v-if="title || closable">
      <div v-if="title">{{ title }}</div>
      <IconClose v-if="closable" @click="emit('close')" />
    </div>
    <slot></slot>
  </div>
</template>

<style scoped>
.modal-window .header {
  font-size: 1.2rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
