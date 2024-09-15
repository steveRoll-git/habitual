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
        <div class="digit-label-group">
          {{ days.toString().padStart(2, '0') }}
          <div class="label">Days</div>
        </div>
        :
        <div class="digit-label-group">
          {{ hours.toString().padStart(2, '0') }}
          <div class="label">Hours</div>
        </div>
        :
        <div class="digit-label-group">
          {{ minutes.toString().padStart(2, '0') }}
          <div class="label">Minutes</div>
        </div>
        :
        <div class="digit-label-group">
          {{ seconds.toString().padStart(2, '0') }}
          <div class="label">Seconds</div>
        </div>
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
  position: fixed;
  width: 100vw;
  height: 100%;
}

.timer-group {
  padding-top: 126px;
  padding-left: var(--margin-m);
  padding-right: var(--margin-m);
  text-align: center;
}

.timer-frame {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: var(--margin-m);
  padding-bottom: var(--margin-m);
  font-family: monospace;
  font-size: 48px;
  line-height: 1;
  background-color: var(--color-frame-background);
  border-radius: var(--radius-l);
}

.digit-label-group .label {
  margin-top: var(--margin-s);
  font-family: var(--font-ui);
  font-size: 14px;
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
