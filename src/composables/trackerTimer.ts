import type { Tracker } from '@/stores/trackers'
import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Given a Tracker, returns reactive properties that can be displayed to show this tracker's elapsed time.
 * @param tracker The tracker to show the timer of.
 */
export function useTrackerTimer(tracker: Tracker) {
  const days = ref<number>(0)
  const hours = ref<number>(0)
  const minutes = ref<number>(0)
  const seconds = ref<number>(0)

  let intervalID: number | undefined = undefined

  const updateTimer = () => {
    const diffMs = Date.now() - tracker.dateReset

    const secondsElapsed = Math.floor(diffMs / 1000)
    const minutesElapsed = Math.floor(secondsElapsed / 60)
    const hoursElapsed = Math.floor(minutesElapsed / 60)
    const daysElapsed = Math.floor(hoursElapsed / 24)

    days.value = daysElapsed
    hours.value = hoursElapsed % 24
    minutes.value = minutesElapsed % 60
    seconds.value = secondsElapsed % 60
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

  return { days, hours, minutes, seconds, restartTimer }
}
