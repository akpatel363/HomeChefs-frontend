import { RESET_TASK, TASK_START, TASK_ERROR } from './actions';

export const resetTask = (task) => ({
  type: RESET_TASK,
  task,
});

export const startTask = (task) => ({
  type: TASK_START,
  task,
});

export const taskFailed = (task, error) => ({
  type: TASK_ERROR,
  task,
  error,
});
