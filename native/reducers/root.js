import { combineReducers } from 'redux';
import { reducer as creations } from './compositions.js';
import timer from '../timer'
import editor from '../editor'

export default combineReducers({
  creations,
  timer: timer.reducer,
  // FIXME: what should we call this???
  prompts: editor.reducer,
})
