import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

const actionTypes = {
  FIREBASE_AUTH_STATE_CHANGED: 'users/firebase-auth-state-changed',
}

function handleInitialAuthStateChange(oldState, newState) {
  // FIXME: how to factor this?
  if (!(selectors.fetchingSession(oldState))) {
    return
  }

  const loggedIn = selectors.loggedIn(newState)
  const loggedOut = selectors.loggedOut(newState)

  if (loggedIn) {
    return Actions.editor()
  } else if (loggedOut) {
    return Actions.login()
  } else {
    return
  }
}

function onSubsequentAuthStateChange() {
  // TODO
  // handle logout?
  return
}

function attachAuthStateListener() {
  return (dispatch, getState) => {
    firebase.auth().onAuthStateChanged(currentUser => {
      const oldState = getState()

      dispatch(actions.firebaseAuthStateChanged(currentUser))  // update the application state

      // const newState = getState()
      // handleInitialAuthStateChange(oldState, newState)

    })
  }
}

const firebaseAuthStateChanged = currentUser => {
  return {
    type: actionTypes.FIREBASE_AUTH_STATE_CHANGED,
    currentUser,
  }
}

const actions = {
  firebaseAuthStateChanged,
  attachAuthStateListener,
}

const selectors = {
  loggedIn: state => !!state.users.currentUser,
  loggedOut: state => state.users.currentUser === null,
  fetchingSession: state => state.users.currentUser === undefined,
}

const initialState = {
  currentUser: undefined,
}

function reducer(state = initialState, action) {
  switch (action.type) {
  case actionTypes.FIREBASE_AUTH_STATE_CHANGED:
    return Object.assign({}, state, { currentUser: action.currentUser })
  default:
    return state
  }
}

export default {
  actionTypes,
  actions,
  reducer,
  selectors,
}
