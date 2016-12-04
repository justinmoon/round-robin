import * as firebase from 'firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import config from './config';

const firebaseApp = firebase.initializeApp(config.firebase);
const database = firebase.database()


function fetchCurrentUser() {
  return fetch(config.baseUrl + '/current-user')
}


// TODO: something with the accepted scopes ...
function fbLogin() {
  const permissions = ['public_profile', 'user_friends', 'email']
  // TODO: this returns {isCancelled: true} if user cancels. I need to handle this.
  return LoginManager.logInWithReadPermissions(permissions)
}

function getAccessToken() {
  return AccessToken.getCurrentAccessToken()
    .then(data => data.accessToken.toString())
}

function rrLogin(accessToken) {
  const body = JSON.stringify({ access_token: accessToken })
  const headers = {'Content-type': 'application/json'}
  return fetch(
    config.baseUrl + '/login',
    { method: 'post', headers, body },
  )
}

function login() {
  return fbLogin()
    .then(getAccessToken)
    .then(rrLogin)
}

function logout() {
  return fetch(config.baseUrl + '/logout', { method: 'post' })
}

const extractSnapshotValue = snapshot => snapshot.val()

const normalizeCompositionsById = compositionsById => {
  return Object.keys(compositionsById).reduce((compositionsArray, id) => {
    const compositionWithId = Object.assign({}, compositionsById[id], { id })
    compositionsArray.push(compositionWithId)
    return compositionsArray
  }, [])
}

const submitComposition = (payload, callback) => {
  // TODO: validate payload shape
  var ref = database.ref();
  // TODO: API rename
  var compositions = ref.child('compositions')
  return compositions.push().set(payload)
}

const fetchCompositions = (callback) => {
  const ref = database.ref()
  const compositions = ref.child('compositions')
  return compositions.once('value')
    .then(extractSnapshotValue)
    .then(normalizeCompositionsById)
}

const fetchPrompts = () =>{
  var ref = database.ref();
  return ref.child('prompts')
    .once("value")
    .then(snapshot => snapshot.val())
}


export default {
  fetchCurrentUser,
  login,
  logout,
  submitComposition,
  fetchCompositions,
  fetchPrompts,
}
