import * as actionTypes from './actionTypes'


export function compositions(state = {
  // fixme: make the whole state an array
  fetching: false,
  submitting: false,
  compositions: [],
}, action) {
  switch (action.type) {
    // FIXME: NETWORK REDUCER
    case actionTypes.compositions.FETCH:
      return Object.assign({}, state, { fetching: true })
    case actionTypes.compositions.RECEIVE:
      return Object.assign({}, state, {
        compositions: action.compositions,
        // FIXME: NETWORK REDUCER
        fetching: false,
      })
    // TODO: constants from another module ... will this work?
    // Functionally, these don't accomplish much ...
    // FIXME: NETWORK REDUCER
    case actionTypes.compositions.SUBMIT:
      return Object.assign({}, state, { submitting: true })
    // FIXME: NETWORK REDUCER
    case actionTypes.compositions.SUBMIT_SUCCESS:
      let compositions = state.compositions
      compositions.unshift(action.composition)
      return Object.assign({}, state, { submitting: false, compositions })
    default:
      return state
    }
}

export function prompts(state = {
  requesting: false,
  prompts: {},
}, action) {
  switch (action.type) {
  case actionTypes.prompts.FETCH:
    return Object.assign({}, state, {
      fetching: true,
    })
  case actionTypes.prompts.RECEIVE:
    return Object.assign({}, state, {
      prompts: action.prompts,
      fetching: false,
    })
  default:
    return state
  }
}

export function anonymousId(state = null, action) {
  switch (action.type) {
    case actionTypes.SET_ANONYMOUS_ID:
      return action.anonymousId
    default:
      return state
  }
}
