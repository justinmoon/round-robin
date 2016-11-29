import * as t from './actionTypes'
import network from '../network.js'

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
    network.fetchCompositions()     // FIXME
      .then(compositions => {
        dispatch(receiveCompositions(compositions))
      })
  }
}
