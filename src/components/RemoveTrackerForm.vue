<script setup lang="ts">
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import ModalWindow from './ModalWindow.vue'

const trackerStore = useTrackersStore()

const props = defineProps<{
  tracker: Tracker
}>()

const emit = defineEmits<{
  close: []
}>()

const removeTracker = () => {
  trackerStore.removeTracker(props.tracker)
  emit('close')
}
</script>

<template>
  <ModalWindow :title="`Remove '${tracker.name}'?`">
    <div style="display: flex; gap: var(--margin-m)">
      <button class="action-button" @click="emit('close')">Cancel</button>
      <button class="action-button" @click="removeTracker()">Remove</button>
    </div>
  </ModalWindow>
</template>
