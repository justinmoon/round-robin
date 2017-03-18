import { combineReducers } from 'redux'
import { entitiesReducer, queriesReducer } from 'redux-query'

export default combineReducers({
  queries: queriesReducer,
  entities: entitiesReducer
})
