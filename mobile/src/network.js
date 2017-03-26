import { AccessToken, LoginManager } from 'react-native-fbsdk'

import config from './config'

const http = {
  get: url => {
    const credentials = 'same-origin'
    return fetch(config.baseUrl + url, { credentials })
      .then(res => res.json())
  },
  // TODO: payload should be optional
  post: (url, payload = {}) => {
    const body = JSON.stringify(payload)
    const headers = { 'Content-type': 'application/json' }
    const credentials = 'same-origin'
    return fetch(config.baseUrl + url, { method: 'post', headers, body, credentials })
      .then(res => res.json())
  }
}

export function fetchCurrentUser () {
  return http.get('/current-user')
}

export function getAccessToken () {
  return AccessToken.getCurrentAccessToken()
    .then(data => data.accessToken.toString())
}

export function fbLogin () {
  const permissions = ['public_profile', 'user_friends', 'email']
  return LoginManager.logInWithReadPermissions(permissions)
    // TODO: throw specific error message which is caught specifically by the login action
    .then(result => {
      console.log(result)
      if (result.isCancelled || result.grantedPermissions.length < 3) {
        throw new Error()
      }
      return result
    })
    .then(getAccessToken)
}

function rrLogin (accessToken) {
  return http.post('/login', { access_token: accessToken })
}

export function login () {
  return fbLogin()
    .then(getAccessToken)
    // .then(rrLogin)
}

export function logout () {
  return Promise.all([
    http.post('/logout'),
    LoginManager.logOut()
  ])
}

export function fetchPrompts () {
  return http.get('/prompts')
}

export function submitComposition (composition) {
  return http.post('/compositions', composition)
}

export function fetchFeed () {
  return http.get('/feed')
}
