import Analytics from 'analytics-react-native'
import uuid from 'uuid'
import { AsyncStorage } from 'react-native'

var DeviceInfo = require('react-native').NativeModules.RNDeviceInfo;

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
  payload.context = { device: DeviceInfo }  // TODO: smarter way to include this
  analytics.screen(payload)
}

function beginCompositionAction() {
  return (dispatch, getState) => {
    let { currentUser } = getState()
    analytics.track({
      userId: currentUser.id,
      event: 'begin-composition',
    })
  }
}

function submitCompositionAction() {
  return (dispatch, getState) => {
    let { currentUser } = getState()
    analytics.track({
      userId: currentUser.id,
      event: 'submit-composition',
    })
  }
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
    beginComposition: beginCompositionAction,
    submitComposition: submitCompositionAction,
  }
}

