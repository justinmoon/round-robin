import { combineReducers } from 'redux'
import network from './network'
import router from './router'
import appState from '../appState'

import { entitiesReducer, queriesReducer } from 'redux-query'

import { reducers as commonReducers } from 'common'

export default combineReducers({
  compositions: commonReducers.compositions,
  prompts: commonReducers.prompts,
  network,
  router,
  // anonymousId: commonReducers.anonymousId,
  appState: appState.reducer,
  queries: queriesReducer,
  entities: entitiesReducer
})
