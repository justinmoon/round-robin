import * as firebase from 'firebase'
import { Actions } from 'react-native-router-flux'

const actionTypes = {
  RECEIVE_CURRENT_USER: 'users/receive-current-user',
  RECEIVE_USERS: 'users/receive-users',
}

const actions = {
  receiveUsers: users => ({ type: actionTypes.RECEIVE_USERS, users }),
  receiveCurrentUser: currentUser => ({ type: actionTypes.RECEIVE_CURRENT_USER, currentUser }),
}

const selectors = {
  loggedIn: state => !!state.users.currentUser,
  loggedOut: state => state.users.currentUser === null,
}

const initialState = {
  currentUser: null,
}

function reducer(state = initialState, action) {
  switch (action.type) {
  case actionTypes.RECEIVE_CURRENT_USER:
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
