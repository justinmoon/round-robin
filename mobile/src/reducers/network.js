import connected from '../connected'

const initialState = {
  connected: false
}

export default function reducer (state = initialState, action) {
  let loginState, logoutState
  switch (action.type) {
    case connected.CONNECTIVITY_CHANGE:
      return Object.assign({}, state, { connected: action.connected })
    default:
      return state
  }
}
