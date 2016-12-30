import { AsyncStorage } from 'react-native'
import { createStore, applyMiddleware } from 'redux';
import { persistStore, autoRehydrate } from 'redux-persist'
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root'
import users from './users'

AsyncStorage.clear()

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware),
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
