// import Analytics from 'analytics-react-native'
import Analytics from './node_modules/analytics-react-native/lib/'
// import Analytics from '~/code/clones/analytics-react-native/src'
import uuid from 'uuid'
import { AsyncStorage } from 'react-native'

const analytics = new Analytics('OCymMIWSscaApOCoDZZ2ZATREPEnIe0L')

function signup(anonymousId, user) {
  analytics.identify({
    anonymousId,
    userId: user.id,
    traits: {
      name: user.name,
    }
  });
}

function page(user, name, anonymousId) {
  let payload = { name: 'mobile:' + name }
  if (user) {
    payload.userId = user.id
  } else {
    payload.anonymousId = anonymousId
  }
  analytics.screen(payload)
}

function viewPage(name, state) {
  let { currentUser, anonymousId } = state

  // TODO: assertion that one of these is defined ...
  if (!!currentUser) {
    return page(currentUser, name)
  }

  if (!!anonymousId) {
    return page(undefined, name, anonymousId)
  }
}

function pageAction() {
  // TODO
}

function basePayload(state) {
  const { anonymousId, currentUser } = state
  return (currentUser) ? { userId: currentUser.id } : { anonymousId }
}

function signupAction(user) {
  return (dispatch, getState) => {
    const { anonymousId, currentUser } = getState()
    return signup(anonymousId, currentUser)
  }
}

export default {
  page: viewPage,
  rawPage: analytics.page,
  actions: {
    signup: signupAction,
  }
}

