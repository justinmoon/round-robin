import network from '../network'
import * as t from './actionTypes'
import { Actions } from 'react-native-router-flux'


const loginAttempt = { type: t.LOGIN.ATTEMPT }
const loginComplete = { type: t.LOGIN.COMPLETE }
const loginError = error => ({ type: t.LOGIN.ERROR, error })

const logoutAttempt = { type: t.LOGOUT.ATTEMPT }
const logoutComplete = { type: t.LOGOUT.COMPLETE }
const logoutError = error => ({ type: t.LOGOUT.ERROR, error })

const login = () => {
  return dispatch => {
    dispatch(loginAttempt)
    return network.login()
      .then(() => dispatch(loginComplete))
      .catch(error => dispatch(loginError(error)))
  }
}

const logout = () => {
  return dispatch => {
    dispatch(logoutAttempt)
    return network.logout()
      .then(() => dispatch(logoutComplete))
      .catch(error => dispatch(logoutError(error)))
  }
}

export {
  login,
  logout,
}
