import * as actionTypes from './actionTypes.js'
import * as network from './network'

const _fetchPrompts = { type: actionTypes.prompts.FETCH }

export function fetchPrompts(dispatch) {
  return dispatch => {
    dispatch(_fetchPrompts)
    return network.fetchPrompts()
      .then(prompts => dispatch(receivePrompts(prompts)))
  }
}

function receivePrompts(prompts) {
  return {
    type: actionTypes.prompts.RECEIVE,
    prompts,
  }
}

const submitAction = { type: actionTypes.compositions.SUBMIT }

const successfulSubmitAction = composition => ({
  type: actionTypes.compositions.SUBMIT_SUCCESS, composition
})

export function submit(payload) {
  return dispatch => {
    dispatch(submitAction)
    return network.submitComposition(payload)
      .then(composition => dispatch(successfulSubmitAction(composition)))
      .then(console.log) // FIXME: this fails without this!!!
  }
}

const _fetchCompositions = { type: actionTypes.compositions.FETCH }

function receiveCompositions(compositions) {
  return {
    type: actionTypes.compositions.RECEIVE,
    compositions,
  }
}

export function fetchCompositions() {
  return dispatch => {
    dispatch(_fetchCompositions)
    network.fetchFeed()
      .then(compositions => {
        dispatch(receiveCompositions(compositions))
      })
  }
}
