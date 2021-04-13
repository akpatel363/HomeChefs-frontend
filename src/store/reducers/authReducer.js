import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_SET_REDIRECT,
  UPDATE_PROFILE,
} from '../actions/actions';

const initialState = {
  redirect: null,
  token: null,
  user: null,
};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_LOGIN:
      return { ...state, token: payload.token, user: payload.user };
    case AUTH_SET_REDIRECT:
      return { ...state, redirect: payload };
    case AUTH_LOGOUT:
      return initialState;
    case UPDATE_PROFILE:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default authReducer;
