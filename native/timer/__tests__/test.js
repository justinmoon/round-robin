import timer from '../index.js'


describe('selectors', () => {
  // it('should create an action to add a todo', () => {
  //   const text = 'Finish docs'
  //   const expectedAction = {
  //     type: types.ADD_TODO,
  //     text
  //   }
  //   expect(actions.addTodo(text)).toEqual(expectedAction)
  // })

  const state = {
    timer: {
      remaining: 5 * 60 * 1000,
      duration: 5 * 60 * 1000,
    }
  }

  it('remaining', () => {
    const expected = state.timer.remaining
    console.log(timer.selectors)
    expect(timer.selectors.remaining(state)).toEqual(expected)
  })

  it('minutes', () => {
    const expected = 5
    expect(timer.selectors.minutes(state.timer.remaining)).toEqual(expected)
  })

  it('seconds', () => {
    const expected = 0
    expect(timer.selectors.seconds(state.timer.remaining)).toEqual(expected)
  })

  it('minutesRemaining', () => {
    const expected = 5
    expect(timer.selectors.minutesRemaining(state)).toEqual(expected)
  })

  it('secondsRemaining', () => {
    const expected = 0
    expect(timer.selectors.secondsRemaining(state)).toEqual(expected)
  })

  it('formattedTimeRemainingSelector', () => {
    const expected = '5:00'
    expect(timer.selectors.formattedTimeRemainingSelector(state)).toEqual(expected)
  })

})
