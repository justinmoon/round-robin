import * as actions from '../src/actions'
import * as types from '../src/actionTypes'
import * as reducers from '../src/reducers'

describe('async reducer', () => {
  it('should update "logginIn" for actions.loginAttempt', () => {
    const action = actions.loginAttempt()
    const initialState = { loggingIn: false }
    const expectedState = { loggingIn: true }
    const actualState = reducers.asyncReducer(initialState, action)
    expect(actualState).toEqual(expectedState)
  })
  it('should update "logginIn" for actions.loginSuccess', () => {
    const action = actions.loginSuccess()
    const initialState = { loggingIn: true }
    const expectedState = { loggingIn: false }
    const actualState = reducers.asyncReducer(initialState, action)
    expect(actualState).toEqual(expectedState)
  })
  it('should update "logginIn" for actions.loginFailure', () => {
    const action = actions.loginFailure()
    const initialState = { loggingIn: true }
    const expectedState = { loggingIn: false }
    const actualState = reducers.asyncReducer(initialState, action)
    expect(actualState).toEqual(expectedState)
  })
})
