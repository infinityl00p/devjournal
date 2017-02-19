import { combineReducers } from 'redux';
import entries from './reducer_entries';
// import tags from './reducer_tags';

const rootReducer = combineReducers({
  entries,
  // tags
});

export default rootReducer;
