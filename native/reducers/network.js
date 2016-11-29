import login from '../login'
import connected from '../connected'

const initialState = {
  connected: false,
  login: {
    inProgress: false,
    error: undefined,
  },
  logout: {
    inProgress: false,
    error: undefined,
  },
}

export default function reducer(state = initialState, action) {
  let loginState, logoutState
  switch (action.type) {

  case connected.CONNECTIVITY_CHANGE:
    return Object.assign({}, state, { connected: action.connected })

  case login.actionTypes.LOGIN.ATTEMPT:
    loginState = {
      inProgress: true,
      error: undefined,
    }
    return Object.assign({}, state, { login: loginState })

  case login.actionTypes.LOGIN.SUCCESS:
    loginState = {
      inProgress: false,
      error: undefined,
    }
    return Object.assign({}, state, { login: loginState })

  case login.actionTypes.LOGIN.ERROR:
    loginState = {
      inProgress: false,
      error: action.error,
    }
    return Object.assign({}, state, { login: loginState })

  case login.actionTypes.LOGOUT.ATTEMPT:
    logoutState = {
      inProgress: true,
      error: undefined,
    }
    return Object.assign({}, state, { logout: logoutState })

  case login.actionTypes.LOGOUT.SUCCESS:
    logoutState = {
      inProgress: false,
      error: undefined,
    }
    return Object.assign({}, state, { logout: logoutState })

  case login.actionTypes.LOGOUT.ERROR:
    logoutState = {
      inProgress: false,
      error: action.error,
    }
    return Object.assign({}, state, { logout: logoutState })

  default:
    return state
  }
}
