import editor from '../editor'
import community from '../community'

export function reducer(state = {
  fetching: false,
  posting: false,
  creations: [],
}, action) {
  switch (action.type) {
    case community.actionTypes.REQUEST_CREATIONS:
      return Object.assign({}, state, { fetching: true })
    case community.actionTypes.RECEIVE_CREATIONS:
      return Object.assign({}, state, {
        creations: action.creations,
        fetching: false,
      })
    // TODO: constants from another module ... will this work?
    // Functionally, these don't accomplish much ...
    case editor.actionTypes.SUBMIT:
      return Object.assign({}, state, { posting: true })
    case editor.actionTypes.SUBMIT_SUCCESS:
      return Object.assign({}, state, { posting: false })
    default:
      return state
    }
}
