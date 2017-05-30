import * as actionCreators from '../actions/index';

const tasks = (state = null, action) => {
  switch(action.type) {
    case actionCreators.CREATE_TASK:
      var response = action.payload.data;
      return Object.assign({}, state, {
        tasks: [
          ...state.tasks,
          response.task
        ]
      });
    case actionCreators.GET_TASKS:
      // TODO: handle no tasks
      var response = action.payload.data;
      return {
        tasks: response.tasks
      };
    case actionCreators.UPDATE_TASK:
      return state;
    case actionCreators.CREATE_SUBTASK:
      return state;
    case actionCreators.UPDATE_SUBTASK:
      return state;
  }
  return state;
}

export default tasks;