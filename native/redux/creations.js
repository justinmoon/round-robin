import Symbol from 'es6-symbol'
import {
  submitCreation as firebaseSubmitCreation,
  fetchCreations as firebaseFetchCreations,
} from '../firebase.js'

/**
 * Fetch creations
 */

const REQUEST_CREATIONS = Symbol()
const RECEIVE_CREATIONS = Symbol()

function receiveCreationsActionCreator(creations) {
  return {
    type: RECEIVE_CREATIONS,
    creations,
  }
}

const requestCreationsAction = { type: REQUEST_CREATIONS }

export function fetchCreations() {
  return dispatch => {
    dispatch(requestCreationsAction)
    firebaseFetchCreations()
      .then(creations => {
        dispatch(receiveCreationsActionCreator(creations))
      })
  }
}

/**
 * Submit creations
 */

const SUBMIT_CREATION = Symbol()
const SUBMIT_CREATION_SUCCESS = Symbol()

const submitCreationAction = { type: SUBMIT_CREATION }
const submitCreationSuccessAction = { type: SUBMIT_CREATION_SUCCESS }

export function submitCreation(payload) {
  return dispatch => {
    dispatch(submitCreationAction)
    return firebaseSubmitCreation(payload, () => dispatch(submitCreationSuccessAction))
  }
}

/**
 * Reducer
 */

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
    case SUBMIT_CREATION:
      return Object.assign({}, state, { posting: true })
    case SUBMIT_CREATION_SUCCESS:
      return Object.assign({}, state, { posting: false })
    default:
      return state
    }
}
