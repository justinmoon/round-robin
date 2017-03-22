import { AsyncStorage } from 'react-native'

const actionTypes = {
  RECEIVE_CURRENT_USER: 'users/receive-current-user',
  RECEIVE_USERS: 'users/receive-users',
  SET_ANONYMOUS_ID: 'users/set-anonymous-id',
}

const actions = {
  setAnonymousId: () => {
    let anonymousId = uuid.v4()
    AsyncStorage.setItem('anonymousId', anonymousId)
    return { type: actionTypes.SET_ANONYMOUS_ID, anonymousId }
  },
  receiveUsers: users => ({ type: actionTypes.RECEIVE_USERS, users }),
  receiveCurrentUser: currentUser => {
    return { type: actionTypes.RECEIVE_CURRENT_USER, currentUser }},
}

const selectors = {
  loggedIn: state => !!state.currentUser,
  loggedOut: state => state.currentUser === null,
}

const currentUser = null

function currentUserReducer(state = currentUser, action) {
  switch (action.type) {
  case actionTypes.RECEIVE_CURRENT_USER:
    return action.currentUser
  default:
    return state
  }
}

const anonymousId = null

function anonymousIdReducer(state = currentUser, action) {
  switch (action.type) {
  case actionTypes.SET_ANONYMOUS_ID:
    return action.anonymousId
  default:
    return state
  }
}

export default {
  actionTypes,
  actions,
  currentUserReducer,
  anonymousIdReducer,
  selectors,
}
