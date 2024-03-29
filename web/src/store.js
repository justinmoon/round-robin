import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { queryMiddleware } from 'redux-query'
import { routerMiddleware as makeRouterMiddleware } from 'react-router-redux'
import history from './history'
import { queries } from 'common'

export const getQueries = (state) => state.queries
export const getEntities = (state) => state.entities

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const routerMiddleware = makeRouterMiddleware(history)

const enhancer = composeEnhancers(
  applyMiddleware(
    thunkMiddleware,
    queryMiddleware(getQueries, getEntities),
    routerMiddleware,
  ),
)

const store = createStore(
  rootReducer,
  {
    entities: queries.initialEntities
  },
  enhancer,
)

export default store
