import {
  AUTH_LOGOUT,
  DELETE_RECIPE,
  EDIT_RECIPE,
  FETCH_MY_RECIPES,
  POST_RECIPE,
} from '../actions/actions';

const myRecipesReducer = (state = null, { type, payload }) => {
  switch (type) {
    case FETCH_MY_RECIPES:
      return payload;
    case POST_RECIPE:
      return state
        ? [{ ...payload, ratings_count: 0, questions_count: 0 }, ...state]
        : null;
    case EDIT_RECIPE:
      return state
        ? state.map((r) => (r.id === payload.id ? { ...r, ...payload } : r))
        : null;
    case DELETE_RECIPE:
      return state.filter(({ id }) => id !== payload);
    case AUTH_LOGOUT:
      return null;
    default:
      return state;
  }
};

export default myRecipesReducer;
