import { AsyncStorage } from 'react-native'
import { fbLogin } from './network'
import { actions, selectors, queries } from 'common'
import analytics from './analytics'
import OneSignal from 'react-native-onesignal'
import uuid from 'uuid'

export const login = () => (dispatch, getState) => fbLogin()
  .then(access_token => dispatch(queries.login({ access_token })))
  .then(user => {
    const currentUser = selectors.getCurrentUser(getState())
    OneSignal.sendTag('id', String(currentUser.id))
    // FIXME: Analytics are currently broken
    // dispatch(analytics.actions.signup(currentUser))
  })

export const setAnonymousId = () => {
  let anonymousId = uuid.v4()
  AsyncStorage.setItem('anonymousId', anonymousId)
  return actions.setAnonymousId(anonymousId)
}
