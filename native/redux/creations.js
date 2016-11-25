import {
  fetchCreations as firebaseFetchCreations,
} from '../firebase.js'
import editor from '../editor'

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
    // TODO: constants from another module ... will this work?
    case editor.constants.SUBMIT:
      return Object.assign({}, state, { posting: true })
    case editor.constants.SUBMIT_SUCCESS:
      return Object.assign({}, state, { posting: false })
    default:
      return state
    }
}
