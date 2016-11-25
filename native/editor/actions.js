import actionTypes from './actionTypes.js'
import {
  fetchPrompts as firebaseFetchPrompts,
  submitCreation as firebaseSubmitCreation,
} from '../firebase.js'

const requestPrompts = { type: actionTypes.REQUEST_PROMPTS }

export function fetchPrompts(dispatch) {
  return dispatch => {
    dispatch(requestPrompts)
    return firebaseFetchPrompts()
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
    return firebaseSubmitCreation(payload, () => dispatch(successfulSubmitAction))
  }
}
