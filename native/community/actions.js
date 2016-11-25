import * as t from './actionTypes'
import api from '../api.js'

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
    api.fetchCompositions()     // FIXME
      .then(compositions => {
        dispatch(receiveCompositions(compositions))
      })
  }
}
