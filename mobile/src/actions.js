import { AsyncStorage } from 'react-native'
import { fbLogin } from './network'
import { actions, selectors, queries } from 'common'
import OneSignal from 'react-native-onesignal'
import uuid from 'uuid'

export const login = () => (dispatch, getState) => {
  dispatch(actions.loginAttempt())
  return fbLogin()
    .then(accessToken => dispatch(queries.login({ access_token: accessToken })))
    .then(user => {
      // for now, don't dispatch a success b/c it would cause jittery disappearance of spinner
      // dispatch(actions.successfulLogin())

      const currentUser = selectors.getCurrentUser(getState())
      OneSignal.sendTag('id', String(currentUser.id))

      // FIXME: Analytics are currently broken
      // dispatch(analytics.actions.signup(currentUser))
    })
    .catch(e => dispatch(actions.loginFailure()))
}

export const setAnonymousId = () => {
  let anonymousId = uuid.v4()
  AsyncStorage.setItem('anonymousId', anonymousId)
  return actions.setAnonymousId(anonymousId)
}
