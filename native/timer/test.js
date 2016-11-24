import timer from './index.js'


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
    const expected = state.remaining
    expect(remaining(state)).toEqual(expected)
  })

  it('remaining', () => {
    const expected = 5
    expect(minutes(state.remaining)).toEqual(expected)
  })
})
