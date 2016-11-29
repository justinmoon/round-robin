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

export default { listen, connectivityChange, CONNECTIVITY_CHANGE }
