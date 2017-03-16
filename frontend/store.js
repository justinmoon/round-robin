import { AsyncStorage } from 'react-native'
import { compose, createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root'
import users from './users'
import { queryMiddleware } from 'redux-query';


export const getQueries = (state) => state.queries;
export const getEntities = (state) => state.entities;

AsyncStorage.clear()

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunkMiddleware, queryMiddleware(getQueries, getEntities)),
);


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
      if (!id) {
        store.dispatch(users.actions.setAnonymousId())
      }
    })
  }
)

export default store
