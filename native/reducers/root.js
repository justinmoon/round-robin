import { combineReducers } from 'redux';
import compositions from './compositions';
import network from './network';
import router from './router';
import timer from '../timer'
import editor from '../editor'
import users from '../users'
import appState from '../appState'

export default combineReducers({
  compositions,
  network,
  router,
  currentUser: users.currentUserReducer,
  anonymousId: users.anonymousIdReducer,
  appState: appState.reducer,
  timer: timer.reducer,
  prompts: editor.reducer,
})
