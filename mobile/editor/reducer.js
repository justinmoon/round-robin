import * as actionTypes from './actionTypes'

export default function reducer(state = {
  requesting: false,
  prompts: {},
}, action) {
  switch (action.type) {
  case actionTypes.REQUEST_PROMPTS:
    return Object.assign({}, state, {
      fetching: true,
    })
  case actionTypes.RECEIVE_PROMPTS:
    return Object.assign({}, state, {
      prompts: action.prompts,
      fetching: false,
    })
  default:
    return state
  }
}
