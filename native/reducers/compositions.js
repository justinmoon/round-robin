import editor from '../editor'
import community from '../community'

export default function reducer(state = {
  // fixme: make the whole state an array
  fetching: false,
  posting: false,
  compositions: [],
}, action) {
  switch (action.type) {
    // FIXME: NETWORK REDUCER
    case community.actionTypes.REQUEST_COMPOSITIONS:
      return Object.assign({}, state, { fetching: true })
    case community.actionTypes.RECEIVE_COMPOSITIONS:
      return Object.assign({}, state, {
        compositions: action.compositions,
        // FIXME: NETWORK REDUCER
        fetching: false,
      })
    // TODO: constants from another module ... will this work?
    // Functionally, these don't accomplish much ...
    // FIXME: NETWORK REDUCER
    case editor.actionTypes.SUBMIT:
      return Object.assign({}, state, { posting: true })
    // FIXME: NETWORK REDUCER
    case editor.actionTypes.SUBMIT_SUCCESS:
      return Object.assign({}, state, { posting: false })
    default:
      return state
    }
}
