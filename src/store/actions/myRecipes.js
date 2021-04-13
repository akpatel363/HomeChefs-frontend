import {
  DELETE_RECIPE,
  EDIT_RECIPE,
  FETCH_MY_RECIPES,
  POST_RECIPE,
} from './actions';
import {
  fetchData,
  getFormData,
  handleError,
  patchData,
  postData,
} from '../../utils/apiHelpers';
import { startTask } from './task';
import axios from '../../utils/axios';

export const fetchMyRecipes = () => async (dispatch, getState) => {
  const token = getState().auth.token;
  if (!token) return;
  fetchData(dispatch, FETCH_MY_RECIPES, '/recipes/my/', token);
};

export const postRecipe = ({ image, ...data }, cb) => async (
  dispatch,
  getState
) => {
  const token = getState().auth.token;
  const formData = getFormData(image, data);
  postData(dispatch, POST_RECIPE, '/recipes/', formData, token, cb);
};

export const deleteRecipe = (id, cb) => async (dispatch, getState) => {
  const token = getState().auth.token;
  dispatch(startTask(DELETE_RECIPE));
  try {
    await axios.delete(`recipes/${id}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    cb();
    dispatch({ type: DELETE_RECIPE, payload: id });
  } catch (err) {
    handleError(err, dispatch, DELETE_RECIPE);
  }
};

export const editRecipe = (image, data, cb) => async (dispatch, getState) => {
  const {
    auth: { token },
    activeRecipe: { id },
  } = getState();
  let formData = getFormData(image, data, false);
  patchData(dispatch, EDIT_RECIPE, `/recipes/${id}/`, formData, token, cb);
};
