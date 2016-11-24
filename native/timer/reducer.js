import * as t from './actionTypes.js'
import { State } from './model';

const initialState = {
  startTime: undefined,
  stopTime: undefined,
  targetDuration: undefined,
  now: undefined
}

// what's wrong with this syntax?
const reducer = (state = initialState, action: any): State => {
  switch (action.type) {
    // TODO: es6 syntax for child keys like { [action.duration] }???
    case t.SET_TARGET_DURATION:
      return Object.assign({}, state, { targetDuration: action.targetDuration })
    case t.START:
      return Object.assign({}, state, { startTime: action.now })
    case t.STOP:
      return Object.assign({}, state, { stopTime: action.now })
  case t.TICK:
    return Object.assign({}, state, { now: action.now })
    default:
      return state
  }
}

export default reducer
