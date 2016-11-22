import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer as creations } from './creations.js';
import { reducer as prompts } from './prompts.js';

const rootReducer = combineReducers({
  creations,
  prompts,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
