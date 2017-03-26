import { AsyncStorage } from 'react-native'
import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducers'
import { setAnonymousId } from './actions'
import { queryMiddleware } from 'redux-query'

export const getQueries = (state) => state.queries
export const getEntities = (state) => state.entities

// FIXME: What the hell is this for???
AsyncStorage.clear()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, queryMiddleware(getQueries, getEntities)),
)

const store = createStore(
  rootReducer,
  enhancer,
  autoRehydrate(),
)

persistStore(
  store,
  { whitelist: ['anonymousId'], storage: AsyncStorage },
  () => {
    // Set the anonymousId value
    AsyncStorage.getItem('anonymousId', (err, id) => {
      if (err) {
        console.log('unhandled error')
      }
      if (!id) {
        store.dispatch(setAnonymousId())
      }
    })
  }
)

export default store
