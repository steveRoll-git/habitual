<script setup lang="ts">
import { useTrackerDurationComponents } from '@/composables/trackerTimer'
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import ResetSlider from './ResetSlider.vue'
import IconTrophy from './icons/IconTrophy.vue'
import { computed } from 'vue'
import { getDurationString } from '@/util'

const store = useTrackersStore()

const props = defineProps<{
  tracker: Tracker
}>()

const { days, hours, minutes, seconds, restartTimer } = useTrackerDurationComponents(props.tracker)

const best = computed(() => store.trackerBests.get(props.tracker))

const resetTracker = () => {
  store.resetTracker(props.tracker)
  restartTimer()
}
</script>

<template>
  <div class="tracker-fullscreen">
    <div class="timer-group">
      <div class="timer-font timer-frame">
        <div class="digit-colon-group" :class="{ 'low-emphasis': days == 0 }">
          <div class="digit-label-group">
            {{ days.toString().padStart(2, '0') }}
            <div class="label">Days</div>
          </div>
          :
        </div>
        <div class="digit-colon-group" :class="{ 'low-emphasis': hours == 0 && days == 0 }">
          <div class="digit-label-group">
            {{ hours.toString().padStart(2, '0') }}
            <div class="label">Hours</div>
          </div>
          :
        </div>
        <div
          class="digit-colon-group"
          :class="{ 'low-emphasis': minutes == 0 && hours == 0 && days == 0 }"
        >
          <div class="digit-label-group">
            {{ minutes.toString().padStart(2, '0') }}
            <div class="label">Minutes</div>
          </div>
          :
        </div>
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
    <div class="best-frame" v-if="best">
      <div class="frame-header">
        <IconTrophy class="icon" />
        Best
      </div>
      <div class="content">
        <div class="timer-font">{{ getDurationString(best.duration) }}</div>
        Achieved on {{ new Date(best.date).toLocaleDateString() }}
      </div>
    </div>
    <div class="slider-container">
      <ResetSlider @slide="resetTracker" />
    </div>
  </div>
</template>

<style scoped>
.low-emphasis {
  opacity: 0.25;
}

.tracker-fullscreen {
  position: fixed;
  width: 100vw;
  height: 100%;
}

.timer-group {
  padding-top: 10vh;
  padding-left: var(--margin-m);
  padding-right: var(--margin-m);
  text-align: center;
}

.timer-font {
  font-family: monospace;
  line-height: 1;
  text-align: center;
}

.timer-frame {
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: var(--margin-m);
  padding-bottom: var(--margin-m);
  font-size: 48px;
  background-color: var(--color-frame-background);
  border-radius: var(--radius-l);
  box-shadow: 0px 6px 4px -3px rgba(0, 0, 0, 0.2);
}

.digit-colon-group {
  display: flex;
}

.digit-label-group .label {
  margin-top: var(--margin-s);
  font-family: var(--font-ui);
  font-size: 14px;
}

.tracker-purpose {
  padding-top: var(--margin-m);
  font-size: 1rem;
  line-height: 1.2;
}

.tracker-purpose .name {
  font-size: 200%;
}

.best-frame {
  margin-top: var(--margin-l);
  margin-left: var(--margin-l);
  margin-right: var(--margin-l);
  padding: var(--margin-m);
  background-color: var(--color-best);
  border-radius: var(--radius-l);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.best-frame .content {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.best-frame .timer-font {
  font-size: 34px;
}

.frame-header {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.frame-header .icon {
  color: var(--color-text);
  width: 34px;
  height: 34px;
}

.slider-container {
  position: absolute;
  bottom: var(--margin-l);
  padding-left: var(--margin-l);
  padding-right: var(--margin-l);
  width: 100%;
}
</style>
