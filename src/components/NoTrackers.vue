<script setup lang="ts">
import IconAdd from './icons/IconAdd.vue'

const emit = defineEmits<{
  newTrackerClick: []
}>()
</script>

<template>
  <div class="no-trackers-message">
    <div>Looks like you don't have any trackers yet.</div>
    <button class="action-button" @click="emit('newTrackerClick')"><IconAdd />Add Tracker</button>
  </div>
</template>

<style scoped>
.no-trackers-message {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--margin-m);
}
</style>
