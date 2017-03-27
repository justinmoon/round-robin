// Conventions:
//
// action creators are verbs: login()
// actions are nouns: loginAttempt()

import {
  SET_ANONYMOUS_ID,
  login
} from './actionTypes'

export const setAnonymousId = anonymousId => ({ type: SET_ANONYMOUS_ID, anonymousId })

export const loginAttempt = () => ({ type: login.ATTEMPT })
export const loginSuccess = () => ({ type: login.SUCCESS })
export const loginFailure = () => ({ type: login.FAILURE })
