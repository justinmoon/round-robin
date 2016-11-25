import { combineReducers } from 'redux';
import compositions from './compositions';
import timer from '../timer'
import editor from '../editor'

export default combineReducers({
  compositions,
  timer: timer.reducer,
  // FIXME: what should we call this???
  prompts: editor.reducer,
})
