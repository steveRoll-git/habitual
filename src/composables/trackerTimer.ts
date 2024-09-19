import type { Tracker } from '@/stores/trackers'
import { getDurationComponents } from '@/util'
import { onMounted, onUnmounted, ref, watch } from 'vue'

/**
 * Given a tracker, returns a ref for the number of milliseconds that have passed since the last reset.
 * @param tracker
 */
export function useTrackerDuration(tracker: Tracker) {
  const duration = ref(0)

  let intervalID: number | undefined = undefined

  const updateTimer = () => {
    duration.value = Date.now() - (tracker.resets[tracker.resets.length - 1] ?? tracker.dateCreated)
  }

  const restartTimer = () => {
    updateTimer()
    clearInterval(intervalID)
    intervalID = setInterval(updateTimer, 1000)
  }

  onMounted(() => {
    restartTimer()

    onUnmounted(() => {
      clearInterval(intervalID)
    })
  })

  return { duration, restartTimer }
}

/**
 * Given a Tracker, returns reactive properties that can be displayed to show this tracker's elapsed time.
 * @param tracker The tracker to show the timer of.
 */
export function useTrackerDurationComponents(tracker: Tracker) {
  const { duration, restartTimer } = useTrackerDuration(tracker)
  const days = ref(0)
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)

  watch(duration, () => {
    const display = getDurationComponents(duration.value)
    days.value = display.days
    hours.value = display.hours
    minutes.value = display.minutes
    seconds.value = display.seconds
  })

  return { days, hours, minutes, seconds, restartTimer }
}
