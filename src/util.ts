/**
 * Returns the number of days, hours, minutes and seconds needed to display the
 * given duration.
 * @param duration A duration in milliseconds.
 */
export const getDurationDisplay = (duration: number) => {
  const secondsElapsed = Math.floor(duration / 1000)
  const minutesElapsed = Math.floor(secondsElapsed / 60)
  const hoursElapsed = Math.floor(minutesElapsed / 60)
  const daysElapsed = Math.floor(hoursElapsed / 24)

  return {
    days: daysElapsed,
    hours: hoursElapsed % 24,
    minutes: minutesElapsed % 60,
    seconds: secondsElapsed % 60
  }
}

/**
 * Returns a string representing the given duration, with the days, hours,
 * minutes and seconds zero-padded and separated with a colon.
 * @param duration
 */
export const getDurationDisplayString = (duration: number) => {
  const display = getDurationDisplay(duration)
  return (
    `${display.days.toString().padStart(2, '0')}:` +
    `${display.hours.toString().padStart(2, '0')}:` +
    `${display.minutes.toString().padStart(2, '0')}:` +
    `${display.seconds.toString().padStart(2, '0')}`
  )
}
