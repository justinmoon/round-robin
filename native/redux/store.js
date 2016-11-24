import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer as creations } from './creations.js';
import { reducer as prompts } from './prompts.js';
import timer from '../timer'

const rootReducer = combineReducers({
  creations,
  prompts,
  timer: timer.reducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
