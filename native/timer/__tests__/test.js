import timer from '../index.js'

const second = 1 * 1000
const minute = second * 60

const someTime = Date.parse("2016-11-24T17:33:12.400Z")
const threeMinutesTenSeconds = 3 * minute + 9 * second

describe('selectors', () => {
  const baseState = {
    timer: {
      targetDuration: 5 * minute,
      startTime: undefined,
      stopTime: undefined,
    }
  }
  const unstartedState = baseState
  const startedState = {
    timer: {
      targetDuration: 5 * minute,
      startTime: someTime,
      stopTime: undefined,
    }
  }
  const stoppedState = {
    timer: {
      targetDuration: 5 * minute,
      startTime: someTime,
      stopTime: someTime + threeMinutesTenSeconds,
    }
  }

  describe('timerStateSelector', () => {
    it('stopped', () => {
      const expected = timer.constants.STATE.STOPPED
      expect(timer.selectors.timerStateSelector(stoppedState))
        .toEqual(expected)
    })
    it('started', () => {
      const expected = timer.constants.STATE.STARTED
      expect(timer.selectors.timerStateSelector(startedState))
        .toEqual(expected)
    })
    it('unstarted', () => {
      const expected = timer.constants.STATE.UNSTARTED
      expect(timer.selectors.timerStateSelector(unstartedState))
        .toEqual(expected)
    })
  })

  describe('timeRemainingSelector', () => {
    it('unstarted', () => {
      const expected = baseState.timer.targetDuration
      expect(timer.selectors.timeRemainingSelector(unstartedState))
        .toEqual(expected)
    })
    it('started', () => {
      const now = new Date().getTime()
      const elapsed = now - startedState.timer.startTime
      const expected = startedState.timer.targetDuration - elapsed

      result = timer.selectors.timeRemainingSelector(startedState)

      // +/- 10 milliseconds ...
      expect(result).toBeLessThan(expected + 10)
      expect(result).toBeGreaterThan(expected - 10)
    })
  })

  describe('formattedTimeRemainingSelector', () => {
    // 5:00 - 3:09
    const expected = '1:51'
    const result = timer.selectors.formattedTimeRemainingSelector(stoppedState)
    expect(result).toEqual(expected)
  })
})
