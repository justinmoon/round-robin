import Analytics from 'analytics-react-native'
import uuid from 'uuid'
import { AsyncStorage } from 'react-native'

const analytics = new Analytics('OCymMIWSscaApOCoDZZ2ZATREPEnIe0L')

function signup(user, anonymousId) {
  analytics.identify({
    anonymousId,
    userId: user.id,
    traits: {
      name: user.name,
    }
  });
}

function screen(route, user, anonymousId, properties) {
  let payload = { name: route }
  if (properties) {
    payload.properties = properties
  }
  if (user) {
    payload.userId = user.id
  } else {
    payload.anonymousId = anonymousId
  }
  analytics.screen(payload)
}

function screenAction(route, payload) {
  return (dispatch, getState) => {
    let { currentUser, anonymousId } = getState()
    return screen(route, currentUser, anonymousId, payload)
  }
}

function signupAction(user) {
  return (dispatch, getState) => {
    const { anonymousId, currentUser } = getState()
    return signup(currentUser, anonymousId)
  }
}

export default {
  actions: {
    screen: screenAction,
    signup: signupAction,
  }
}

