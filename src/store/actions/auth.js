import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_REDIRECT,
  UPDATE_PROFILE,
} from './actions';
import { patchData, postData } from '../../utils/apiHelpers';

export const setRedirect = (url) => ({ type: AUTH_SET_REDIRECT, payload: url });

export const authSuccess = (data) => {
  localStorage.setItem('data', JSON.stringify(data));
  return { type: AUTH_LOGIN, payload: data };
};

export const logOut = () => {
  localStorage.removeItem('data');
  return {
    type: AUTH_LOGOUT,
  };
};

export const authenticate = (data, history, method = 'login') => (
  dispatch,
  getState
) =>
  postData(dispatch, AUTH_LOGIN, `/auth/${method}/`, data, null, (payload) => {
    localStorage.setItem('data', JSON.stringify(payload));
    history.replace(getState().auth.redirect || '/dashboard');
  });

export const updateProfile = (obj, cb) => (dispatch, getState) => {
  const token = getState().auth.token;
  patchData(dispatch, UPDATE_PROFILE, '/auth/user/', obj, token, (profile) => {
    const data = JSON.parse(localStorage.getItem('data')) || {};
    data['user'] = profile;
    localStorage.setItem('data', JSON.stringify(data));
    cb && cb();
  });
};
