import * as t from './actionTypes.js'

export const setTargetDuration = targetDuration => {
  return {
    type: t.SET_TARGET_DURATION,
    targetDuration,
  }
}

export const start = () => {
  return {
    type: t.START,
    now: new Date().getTime(),
  }
}

export const stop = () => {
  return {
    type: t.STOP,
    now: new Date().getTime(),
  }
}

export const tick = () => {
  return {
    type: t.TICK,
    tick: new Date().getTime(),
  }
}
