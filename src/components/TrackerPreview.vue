<script setup lang="ts">
import { useTrackerDuration } from '@/composables/trackerTimer'
import type { Tracker } from '@/stores/trackers'
import { getDurationString } from '@/util'

const props = defineProps<{
  tracker: Tracker
}>()

const { duration } = useTrackerDuration(props.tracker)
</script>

<template>
  <RouterLink class="tracker" :to="`/tracker/${tracker.id}`">
    {{ tracker.name }}
    <div class="timer">
      {{ getDurationString(duration) }}
    </div>
  </RouterLink>
</template>

<style scoped>
.tracker {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--margin-m);
  background-color: var(--color-frame-background);
  border-radius: var(--radius-m);
}

.timer {
  font-family: monospace;
  font-size: 1.2rem;
}
</style>
