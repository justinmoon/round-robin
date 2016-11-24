import { createSelector } from 'reselect'

export const remaining = state => state.timer.remaining
export const minutes = milliseconds => Math.floor(milliseconds / (60 * 1000))
export const seconds = milliseconds => (milliseconds / 1000) % 60
export const zeroPad = (num, places) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
export const formatSecondsAndMinutes = (seconds, minutes) => {
  return `${minutes}:${zeroPad(seconds, 2)}`
}

export const secondsRemaining = createSelector(
  remaining,
  seconds,
)

export const minutesRemaining = createSelector(
  remaining,
  minutes,
)

export const formattedTimeRemainingSelector = createSelector(
  secondsRemaining,
  minutesRemaining,
  formatSecondsAndMinutes,
)
