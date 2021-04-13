import { startTask, taskFailed } from '../store/actions/task';
import { logOut } from '../store/actions/auth';
import axios from './axios';

export const getFormData = (image, data, includeInJSON = true) => {
  let formData = includeInJSON ? { ...data, image: null } : data;
  if (image) {
    formData = new FormData();
    formData.set('image', image);
    for (let key in data) {
      if (typeof data[key] === 'object')
        formData.set(key, JSON.stringify(data[key]));
      else formData.set(key, data[key]);
    }
  }
  return formData;
};

export const getErrorMessage = (error) => {
  if (!error.response)
    return 'Error connecting to server, check your internet connection.';

  switch (error.response.status) {
    case 400:
      const { non_field_errors: errs = false, ...rest } = error.response.data;
      if (errs) return errs.join(', ');
      return rest;
    case 401:
      return error.response.data?.detail || 'You are not authorized.';
    case 403:
      return error.response.data?.detail || 'Request not allowed';
    case 404:
      return error.response.data?.detail || 'Not Found';
    default:
      return 'Unknown error occurred.';
  }
};

export const handleError = (error, dispatch, action) => {
  if (error?.response?.status === 401) dispatch(logOut());
  return dispatch(taskFailed(action, getErrorMessage(error)));
};

export const fetchData = async (dispatch, action, url, token, cb) => {
  dispatch(startTask(action));
  const o = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  try {
    const payload = (await axios.get(url, o)).data;
    dispatch({ type: action, payload });
    cb && cb();
  } catch (err) {
    handleError(err, dispatch, action);
  }
};

export const postData = async (dispatch, action, url, data, token, cb) => {
  dispatch(startTask(action));
  const o = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
  try {
    const payload = (await axios.post(url, data, o)).data;
    dispatch({ type: action, payload });
    cb && cb(payload);
  } catch (err) {
    handleError(err, dispatch, action);
  }
};

export const patchData = async (dispatch, action, url, data, token, cb) => {
  dispatch(startTask(action));
  try {
    const payload = (
      await axios.patch(url, data, {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data;
    dispatch({ type: action, payload });
    cb && cb(payload);
  } catch (err) {
    handleError(err, dispatch, action);
  }
};
