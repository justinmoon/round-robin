import * as t from './actionTypes.js'
import { State } from './model';

const initialState = {
  duration: 5 * 60 * 1000,  // what to put here???
  remaining: 5 * 60 * 1000,
  running: false
}

// what's wrong with this syntax?
const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
  case t.TICK:
    const remaining = Math.max(0, state.remaining - 1000)
    return Object.assign({}, state, { remaining })
  case t.START:
    return state
  case t.PAUSE:
    return state
  case t.STOP:
    // whose responsibility is this???
    return state
  case t.RESTART:
    return state
  default:
    return state
  }
}

export default reducer
