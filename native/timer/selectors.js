import { createSelector } from 'reselect'
import timerModule from '.'

const timerSelector = state => state.timer
export const nowSelector = () => new Date().getTime()

const elapsedSelector = createSelector(
  timerSelector,
  timer => new Date().getTime() - timer.startTime
)

// FIXME: any small fuckups and this is undefined ...
const durationSelector = createSelector(
  timerSelector,
  timer => timer.stopTime - timer.startTime
)

export const timerStateSelector = createSelector(
  timerSelector,
  (timer) => {
    if (timer.stopTime) {
      return timerModule.constants.STATE.STOPPED
    } else if (timer.startTime) {
      return timerModule.constants.STATE.STARTED
    } else {
      return timerModule.constants.STATE.UNSTARTED
    }
  }
)

export const timeRemainingSelector = createSelector(
  nowSelector,
  elapsedSelector,
  timerSelector,
  timerStateSelector,
  durationSelector,
  (now, elapsed, timer, timerState, duration) => {
    switch (timerState) {
      case timerModule.constants.STATE.UNSTARTED:
        return timer.targetDuration
      case timerModule.constants.STATE.STARTED:
      const elapsed = new Date().getTime() - timer.startTime
        return timer.targetDuration - elapsed
      case timerModule.constants.STATE.STOPPED:
        const remaining = timer.targetDuration - duration
        // TODO: should this just be negative?
        return Math.max(0, remaining)
      }
  }
)


export const minutes = milliseconds => Math.round(Math.floor(milliseconds / (60 * 1000)))
export const seconds = milliseconds => Math.round((milliseconds / 1000) % 60)
export const zeroPad = (num, places) => {
  var zero = places - num.toString().length + 1;
  return Array(+(zero > 0 && zero)).join("0") + num;
}
export const formatSecondsAndMinutes = (seconds, minutes) => {
    return `${minutes}:${zeroPad(seconds, 2)}`
}

export const secondsRemaining = createSelector(
  timeRemainingSelector,
  seconds,
)

export const minutesRemaining = createSelector(
  timeRemainingSelector,
  minutes,
)

export const formattedTimeRemainingSelector = createSelector(
  secondsRemaining,
  minutesRemaining,
  formatSecondsAndMinutes,
)

export const reachedTargetDurationSelector = createSelector(
  timeRemainingSelector,
  timeRemaining => timeRemaining <= 0
)

export const countingDown = createSelector(
  timeRemainingSelector,
  timeRemaining => {
    // FIXME this should be a constant
    return timeRemaining < 8 * 1000
  }
)
