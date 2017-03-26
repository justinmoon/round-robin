import { ActionConst } from 'react-native-router-flux'

const initialState = {
  scene: {},
  lastObserverdTab: 'friends'  // sane default
}

const tabs = ['friends', 'mePrivate', 'mePublished']

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ActionConst.FOCUS:
      return {
        ...state,
        scene: action.scene
      }

    case ActionConst.JUMP:
      let isTab = tabs.includes(action.key)
      let lastObservedTab = isTab ? action.key : state.lastObservedTab
      return {
        ...state,
        lastObservedTab
      }

    default:
      return state
  }
}
