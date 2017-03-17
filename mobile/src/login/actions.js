import * as network from '../network'
import * as t from './actionTypes'
import { Actions } from 'react-native-router-flux'
import users from '../users'
import analytics from '../analytics'
import OneSignal from 'react-native-onesignal'

const fetchSessionAttempt = { type: t.SESSION.ATTEMPT }
const fetchSessionSuccess = { type: t.SESSION.SUCCESS }
const fetchLoginFailure = { type: t.SESSION.FAILURE }

const loginAttempt = { type: t.LOGIN.ATTEMPT }
const loginComplete = { type: t.LOGIN.COMPLETE }
const loginError = error => ({ type: t.LOGIN.ERROR, error })

const logoutAttempt = { type: t.LOGOUT.ATTEMPT }
const logoutComplete = { type: t.LOGOUT.COMPLETE }
const logoutError = error => ({ type: t.LOGOUT.ERROR, error })

function fetchCurrentUser() {
  return dispatch => {
    dispatch(fetchSessionAttempt)
    return network.fetchCurrentUser()
      .then(user => {
        dispatch(users.actions.receiveCurrentUser(user))
        // To make sure this is always up-to-date
        OneSignal.sendTag('id', String(user.id))
      })
      .then(() => dispatch(fetchSessionSuccess))
  }
}

const login = () => {
  return dispatch => {
    dispatch(loginAttempt)
    return network.login()
      .then(user => {
        dispatch(users.actions.receiveCurrentUser(user))
        return user 
      })
      .then(user => OneSignal.sendTag('id', String(user.id)))
      .then(() => dispatch(analytics.actions.signup()))
      .then(() => dispatch(loginComplete))
      .catch(error => {
        dispatch(loginError(error))
        throw error
      })
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
  fetchCurrentUser,
  login,
  logout,
}