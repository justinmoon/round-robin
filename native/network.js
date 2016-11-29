import * as firebase from 'firebase';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import config from './config';

const firebaseApp = firebase.initializeApp(config.firebase);
const database = firebase.database()

const facebookLogin = () => {
  const permissions = ['public_profile', 'user_friends', 'email']
  return LoginManager.logInWithReadPermissions(permissions)
    .then(r => {
      return r
    })
}

const logout = () => {
  // TODO: is it ok that these two fire simultaneously?
  return Promise.all([
    LoginManager.logOut(),
    firebase.auth().signOut(),
  ])
}

const firebaseLogin = () => {
  return AccessToken.getCurrentAccessToken().then(
    (data) => {
      var access_token = data.accessToken.toString()
      var credential = firebase.auth.FacebookAuthProvider.credential(access_token);
      return firebase.auth().signInWithCredential(credential)
        .then(r => {
          // TODO
          return r
        })
        .catch(error => {
          // TODO
          console.log(error)
        })
    }
  )
}

const login = () => {
  return facebookLogin()
    .then(firebaseLogin)
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
  login,
  logout,
  firebaseLogin,
  submitComposition,
  fetchCompositions,
  fetchPrompts,
}
