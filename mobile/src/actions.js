import { fbLogin } from './network'
import { selectors, queries } from 'common'
import analytics from './analytics'
import OneSignal from 'react-native-onesignal'

export const login = () => (dispatch, getState) => fbLogin()
  .then(access_token => dispatch(queries.login({ access_token })))
  .then(user => {
    const currentUser = selectors.getCurrentUser(getState())
    console.log(getState())
    console.log(currentUser)
    OneSignal.sendTag('id', String(currentUser.id))
    // FIXME: Analytics are currently broken
    // dispatch(analytics.actions.signup(currentUser))
  })
