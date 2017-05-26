import { combineReducers } from 'redux';
import entries from './reducer_entries';
import tasks from './reducer_tasks';

const rootReducer = combineReducers({
  entries,
  tasks
});

export default rootReducer;
