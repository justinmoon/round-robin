import actionTypes from './actionTypes.js'
import api from '../api'

const requestPrompts = { type: actionTypes.REQUEST_PROMPTS }

export function fetchPrompts(dispatch) {
  return dispatch => {
    dispatch(requestPrompts)
    return api.fetchPrompts()
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
const successfulSubmitAction = { type: actionTypes.SUBMIT_SUCCESS }

export function submit(payload) {
  return dispatch => {
    dispatch(submitAction)
    return api.submitComposition(payload, () => dispatch(successfulSubmitAction))
  }
}
