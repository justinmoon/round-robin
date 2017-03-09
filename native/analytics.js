import Analytics from 'analytics-react-native'
import uuid from 'uuid'
import { AsyncStorage } from 'react-native'
import config from './config'

var DeviceInfo = require('react-native').NativeModules.RNDeviceInfo;

const analytics = new Analytics(config.segmentWriteKey)

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

function appStateChangeAction(state) {
  return (dispatch, getState) => {
    const { currentUser } = getState()
    analytics.track({
      userId: currentUser.id,
      event: 'app-state-change',
      properties: { state: state },
    })
  }
}

const prod = {
  actions: {
    screen: screenAction,
    signup: signupAction,
    beginComposition: beginCompositionAction,
    submitComposition: submitCompositionAction,
    appStateChange: appStateChangeAction,
  }
}

const emptyActionCreator = () => {
  return dispatch => {}
}
const dev = {actions: {}}
Object.keys(prod.actions).forEach(key => dev.actions[key] = emptyActionCreator)

module.exports = (config.makeSegmentCalls == true) ? prod : dev
