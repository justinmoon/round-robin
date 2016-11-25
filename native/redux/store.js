import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { reducer as creations } from '../reducers/compositions.js';
import timer from '../timer'
import editor from '../editor'

const rootReducer = combineReducers({
  creations,
  timer: timer.reducer,
  // FIXME: what should we call this???
  prompts: editor.reducer,
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
