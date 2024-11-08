<script setup lang="ts">
import { useTrackerDurationComponents } from '@/composables/trackerTimer'
import { useTrackersStore, type Tracker } from '@/stores/trackers'
import { getDurationString } from '@/util'
import { computed } from 'vue'
import ResetSlider from './ResetSlider.vue'
import IconHistory from './icons/IconHistory.vue'
import IconTrophy from './icons/IconTrophy.vue'
import IconBack from './icons/IconBack.vue'
import { useRouter } from 'vue-router'

const store = useTrackersStore()

const router = useRouter()

const props = defineProps<{
  tracker: Tracker
}>()

const { days, hours, minutes, seconds, restartTimer } = useTrackerDurationComponents(props.tracker)

const best = computed(() => store.trackerBests.get(props.tracker))

const numHistoryPreviewEntries = 3

const history = computed(() => {
  const entries = []
  const start = Math.max(props.tracker.resets.length - numHistoryPreviewEntries, 0)
  for (let i = start; i < props.tracker.resets.length; i++) {
    entries.push({
      index: i,
      date: props.tracker.resets[i],
      duration:
        props.tracker.resets[i] - (i > 0 ? props.tracker.resets[i - 1] : props.tracker.dateCreated)
    })
  }
  return entries
})

const resetTracker = () => {
  store.resetTracker(props.tracker)
  restartTimer()
}
</script>

<template>
  <div class="tracker-fullscreen">
    <IconBack class="back-button" @click="() => router.back()" />
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
    <div class="info-frame best" v-if="best">
      <div class="frame-header">
        <IconTrophy class="icon" />
        Best
      </div>
      <div class="content">
        <div class="timer-font">{{ getDurationString(best.duration) }}</div>
        Achieved on {{ new Date(best.date).toLocaleDateString() }}
      </div>
    </div>
    <div class="info-frame history" v-if="tracker.resets.length > 0">
      <div class="frame-header">
        <IconHistory class="icon" />
        History
      </div>
      <div class="content">
        <div class="history-entry" v-for="entry in history" :key="entry.date">
          <div class="index">{{ entry.index + 1 }}</div>
          <div>{{ new Date(entry.date).toLocaleDateString() }}</div>
          <div class="timer-font">{{ getDurationString(entry.duration) }}</div>
        </div>
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

.back-button {
  position: absolute;
  left: var(--margin-m);
  top: var(--margin-m);
  width: 32px;
  height: 32px;
}

.tracker-fullscreen {
  position: relative;
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

.info-frame {
  margin-top: var(--margin-l);
  margin-left: var(--margin-l);
  margin-right: var(--margin-l);
  padding: var(--margin-m);
  background-color: var(--color-frame-background);
  border-radius: var(--radius-l);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--margin-m);
}

.info-frame .content {
  flex-grow: 1;
}

.info-frame.best {
  background-color: var(--color-best);
}

.info-frame.best .content {
  display: flex;
  flex-direction: column;
  align-items: end;
}

.info-frame.best .timer-font {
  font-size: 34px;
}

.info-frame.history .content {
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  grid-template-rows: repeat(v-bind('numHistoryPreviewEntries'), auto);
  grid-auto-flow: row;
  column-gap: var(--margin-m);
  text-align: right;
}

.history-entry {
  display: grid;
  grid-column: 1 / 4;
  grid-template-columns: subgrid;
  grid-auto-flow: column;
  align-items: center;
}

.history-entry .index {
  opacity: 0.5;
}

.history-entry .timer-font {
  font-size: 1.1em;
}

.frame-header {
  width: 54px;
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
