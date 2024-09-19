<script setup lang="ts">
import IconAdd from './icons/IconAdd.vue'

const emit = defineEmits<{
  newTrackerClick: []
}>()
</script>

<template>
  <div class="modal-window">
    <div>Looks like you don't have any trackers yet.</div>
    <button class="action-button" @click="emit('newTrackerClick')"><IconAdd />Add Tracker</button>
  </div>
</template>

<style scoped>
.modal-window {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--margin-m);
}

.action-button {
  display: flex;
  align-items: center;
  gap: var(--margin-s);
  padding: var(--margin-s);
  border-radius: var(--radius-s);
  width: fit-content;
}
</style>
