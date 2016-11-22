import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

// import { reducer as creationsReducer } from './creations.js';
import { reducer as prompts } from './prompts.js';
// import { reducer as usersReducer } from './users.js';

const rootReducer = combineReducers({
  // creationsReducer,
  prompts
})

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

export default store
