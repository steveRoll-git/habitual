import type { Tracker } from '@/stores/trackers'
import { getDurationDisplay } from '@/util'
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
    const display = getDurationDisplay(
      Date.now() - (tracker.resets[tracker.resets.length - 1] ?? tracker.dateCreated)
    )
    days.value = display.days
    hours.value = display.hours
    minutes.value = display.minutes
    seconds.value = display.seconds
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
