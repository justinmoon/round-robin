import { NetInfo } from 'react-native'

// Action Types
const CONNECTIVITY_CHANGE = 'connected/connectivity-change'

// Actions
const connectivityChange = connected => ({ type: CONNECTIVITY_CHANGE, connected })

// interface for mapDispatchToProps ...
const listen = (callback) => {
  NetInfo.isConnected.addEventListener(
    'change',
    callback
  )
}

const reducer = (connected = false, action: any): State => {
  switch (action.type) {
    case CONNECTIVITY_CHANGE:
      return action.connected
    default:
      return connected
  }
}

export default { listen, reducer, connectivityChange }
