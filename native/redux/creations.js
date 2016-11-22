import Symbol from 'es6-symbol'
import { submitCreation as firebaseSubmitCreation } from '../firebase.js'

const REQUEST_CREATIONS = Symbol()
const RECEIVE_CREATIONS = Symbol()

const SUBMITTING_CREATION = Symbol()
const SUBMITTING_CREATION_SUCCESS = Symbol()

function receiveCreations(creations) {
  return {
    type: RECEIVE_CREATIONS,
    creations,
  }
}

export function submitCreation(payload) {
  return dispatch => {
    dispatch({ type: SUBMITTING_CREATION })
    return firebaseSubmitCreation(payload, () => dispatch({ type: SUBMITTING_CREATION_SUCCESS }))
  }
}

export function reducer(state = {
  fetching: false,
  posting: false,
  creations: [],
}, action) {
  switch (action.type) {
    case REQUEST_CREATIONS:
      return Object.assign({}, state, { fetching: true })
    case RECEIVE_CREATIONS:
      return Object.assign({}, state, {
        creations: action.creations,
        fetching: false,
      })
    case SUBMITTING_CREATION:
      return Object.assign({}, state, { posting: true })
    case SUBMITTING_CREATION_SUCCESS:
      return Object.assign({}, state, { posting: false })
    default:
      return state
    }
}
