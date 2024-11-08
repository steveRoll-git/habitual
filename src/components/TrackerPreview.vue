<script setup lang="ts">
import { useTrackerDuration } from '@/composables/trackerTimer'
import type { Tracker } from '@/stores/trackers'
import { getDurationString } from '@/util'
import IconDelete from './icons/IconDelete.vue'
import IconEdit from './icons/IconEdit.vue'

const props = defineProps<{
  tracker: Tracker
  editing: boolean
}>()

const emit = defineEmits<{
  remove: [tracker: Tracker]
  rename: [tracker: Tracker]
}>()

const { duration } = useTrackerDuration(props.tracker)
</script>

<template>
  <div style="display: flex; align-items: center; gap: var(--margin-m)">
    <div v-if="editing" style="display: flex; gap: var(--margin-m)">
      <IconDelete width="24" height="24" @click="emit('remove', tracker)" />
      <IconEdit width="24" height="24" @click="emit('rename', tracker)" />
    </div>
    <RouterLink class="tracker" :to="`/tracker/${tracker.id}`">
      {{ tracker.name }}
      <div class="timer">
        {{ getDurationString(duration) }}
      </div>
    </RouterLink>
  </div>
</template>

<style scoped>
.tracker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--margin-m);
  background-color: var(--color-frame-background);
  border-radius: var(--radius-m);
  width: 100%;
}

.timer {
  font-family: monospace;
  font-size: 1.2rem;
}
</style>
