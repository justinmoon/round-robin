import Symbol from 'es6-symbol'
import { fetchPrompts as firebaseFetchPrompts } from '../firebase.js'

const REQUEST_PROMPTS = Symbol()

const requestPrompts = { type: REQUEST_PROMPTS }

const RECEIVE_PROMPTS = Symbol()

function receivePrompts(prompts) {
  return {
    type: RECEIVE_PROMPTS,
    prompts,
  }
}

export function fetchPrompts() {
  return dispatch => {
    dispatch(requestPrompts)
    return firebaseFetchPrompts()
      .then(prompts => dispatch(receivePrompts(prompts)))
  }
}

export function reducer(state = {
  requesting: false,
  prompts: {},
}, action) {
  switch (action.type) {
    case REQUEST_PROMPTS:
      return Object.assign({}, state, {
        fetching: true,
      })
    case RECEIVE_PROMPTS:
      return Object.assign({}, state, {
        prompts: action.prompts,
        fetching: false,
      })
    default:
      return state
    }
}
