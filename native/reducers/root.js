import { combineReducers } from 'redux';
import compositions from './compositions';
import network from './network';
import timer from '../timer'
import editor from '../editor'
import users from '../users'

export default combineReducers({
  compositions,
  network,
  users: users.reducer,
  timer: timer.reducer,
  prompts: editor.reducer,
})
