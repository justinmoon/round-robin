import * as t from './actionTypes'
import {
  fetchCreations as firebaseFetchCreations,
} from '../firebase.js'

const requestCompositions = { type: t.REQUEST_COMPOSITIONS }

function receiveCompositions(compositions) {
  return {
    type: t.RECEIVE_COMPOSITIONS,
    compositions,
  }
}

export function fetchCompositions() {
  return dispatch => {
    dispatch(requestCompositions)
    firebaseFetchCreations()     // FIXME
      .then(compositions => {
        dispatch(receiveCompositions(compositions))
      })
  }
}
