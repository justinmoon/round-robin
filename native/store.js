import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers/root'

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store