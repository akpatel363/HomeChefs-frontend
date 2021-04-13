import { TASK_START, RESET_TASK, TASK_ERROR } from '../actions/actions';

const taskReducer = (state = {}, action) => {
  if (action.type in state) {
    return { ...state, [action.type]: { loading: false } };
  }
  switch (action.type) {
    case TASK_START:
      return {
        ...state,
        [action.task]: { loading: true },
      };
    case RESET_TASK:
      const { [action.task]: _, ...rest } = state;
      return rest;
    case TASK_ERROR:
      return {
        ...state,
        [action.task]: { loading: false, error: action.error },
      };
    default:
      return state;
  }
};

export default taskReducer;
