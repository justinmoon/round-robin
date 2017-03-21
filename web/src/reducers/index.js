import { combineReducers } from 'redux'
import { entitiesReducer, queriesReducer } from 'redux-query'
import { routerReducer } from 'react-router-redux'


export default combineReducers({
  queries: queriesReducer,
  entities: entitiesReducer,
  router: routerReducer
})
