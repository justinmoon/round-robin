import analytics from './analytics'

const actionTypes = {
  SET_APP_STATE: 'app-state/set',
}

const actions = {
  appStateChange: (state) => {
    console.log('fuck')
    return (dispatch, getState) => {
      const { appState } = getState()

      // First change is noise
      if (appState) {
        dispatch(analytics.actions.appStateChange(state))
      }

      dispatch({ type: actionTypes.SET_APP_STATE, state })
    }
  },
}

const appState = null

function reducer(state = appState, action) {
  switch (action.type) {
  case actionTypes.SET_APP_STATE:
    return action.state
  default:
    return state
  }
}

export default {
  actionTypes,
  actions,
  reducer,
}
