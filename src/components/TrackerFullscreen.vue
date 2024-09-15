<script setup lang="ts">
import { useTrackerTimer } from '@/composables/trackerTimer'
import { useTrackersStore, type Tracker } from '@/stores/trackers'

const store = useTrackersStore()

const props = defineProps<{
  tracker: Tracker
}>()

const { days, hours, minutes, seconds, restartTimer } = useTrackerTimer(props.tracker)

const resetTracker = () => {
  store.resetTracker(props.tracker)
  restartTimer()
}
</script>

<template>
  <div class="tracker-fullscreen">
    <div class="timer-group">
      <div class="timer-frame">
        {{ days.toString().padStart(2, '0') }}:<!--
        -->{{ hours.toString().padStart(2, '0') }}:<!--
        -->{{ minutes.toString().padStart(2, '0') }}:<!--
        -->{{ seconds.toString().padStart(2, '0') }}
      </div>
      <div class="tracker-purpose">
        without
        <div class="name">{{ tracker.name }}</div>
      </div>
    </div>
    <div class="slider-container">
      <button @click="resetTracker">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.tracker-fullscreen {
  position: relative;
  height: 100%;
}

.timer-group {
  padding-top: 126px;
  padding-left: var(--margin-m);
  padding-right: var(--margin-m);
  text-align: center;
}

.timer-frame {
  font-family: monospace;
  font-size: 48px;
  background-color: var(--color-frame-background);
  border-radius: var(--radius-l);
}

.tracker-purpose {
  padding-top: var(--margin-m);
  font-size: 1rem;
  line-height: 1;
}

.tracker-purpose .name {
  font-size: 200%;
}

.slider-container {
  position: absolute;
  bottom: var(--margin-l);
  padding-left: var(--margin-l);
  padding-right: var(--margin-l);
  width: 100%;
  height: 74px;
}

.slider-container button {
  width: 100%;
  height: 100%;
}
</style>
