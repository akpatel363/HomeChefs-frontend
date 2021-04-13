import {
  FETCH_MY_RATING,
  FETCH_RATINGS,
  POST_MY_RATING,
  SET_RATINGS_SEARCH,
} from './actions';
import { fetchData, postData } from '../../utils/apiHelpers';

export const fetchMyRating = () => (dispatch, getState) => {
  const {
    activeRecipe: { id },
    auth: { token },
  } = getState();
  if (!token) return;
  fetchData(dispatch, FETCH_MY_RATING, `/recipes/${id}/ratings/my/`, token);
};

export const fetchRatings = (search) => async (dispatch, getState) => {
  const {
    activeRecipe: { id },
  } = getState();
  if (!id) return;
  fetchData(
    dispatch,
    FETCH_RATINGS,
    `/recipes/${id}/ratings/${search}`,
    null,
    () => dispatch({ type: SET_RATINGS_SEARCH, payload: search })
  );
};

export const postOrUpdateRating = (data) => async (dispatch, getState) => {
  const {
    activeRecipe: { id },
    auth: { token: t },
  } = getState();
  if (!id || !t) return;
  postData(dispatch, POST_MY_RATING, `/recipes/${id}/ratings/my/`, data, t);
};
