import { combineReducers } from 'redux'
import { entitiesReducer, queriesReducer } from 'redux-query'
import { reducers as commonReducers } from 'common'

export default combineReducers({
  compositions: commonReducers.compositions,
  prompts: commonReducers.prompts,
  queries: queriesReducer,
  entities: entitiesReducer
})
