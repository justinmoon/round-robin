import * as actionTypes from './actionTypes.js'
import * as network from '../network'

const requestPrompts = { type: actionTypes.REQUEST_PROMPTS }

export function fetchPrompts(dispatch) {
  return dispatch => {
    dispatch(requestPrompts)
    return network.fetchPrompts()
      .then(prompts => dispatch(receivePrompts(prompts)))
  }
}

function receivePrompts(prompts) {
  return {
    type: actionTypes.RECEIVE_PROMPTS,
    prompts,
  }
}

const submitAction = { type: actionTypes.SUBMIT }

const successfulSubmitAction = composition => ({
  type: actionTypes.SUBMIT_SUCCESS, composition
})

export function submit(payload) {
  return dispatch => {
    dispatch(submitAction)
    return network.submitComposition(payload)
      .then(composition => dispatch(successfulSubmitAction(composition)))
      .then(console.log) // FIXME: this fails without this!!!
  }
}
