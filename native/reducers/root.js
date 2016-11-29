import { combineReducers } from 'redux';
import compositions from './compositions';
import timer from '../timer'
import editor from '../editor'
import connected from '../connected'
import users from '../users'

export default combineReducers({
  compositions,
  users: users.reducer,
  timer: timer.reducer,
  // FIXME: what should we call this???
  prompts: editor.reducer,
  connected: connected.reducer,
})
