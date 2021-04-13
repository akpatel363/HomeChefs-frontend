import { fetchData, postData } from '../../utils/apiHelpers';
import {
  FETCH_QUESTIONS,
  POST_ANSWER,
  POST_QUESTION,
  SET_SEARCH,
} from './actions';

export const fetchQuestions = (newSearch) => (dispatch, getState) => {
  const {
    activeRecipe: { id },
    questions: { search },
  } = getState();
  if (!id || search === newSearch) return;
  fetchData(
    dispatch,
    FETCH_QUESTIONS,
    `/recipes/${id}/questions/${newSearch}`,
    null,
    () => dispatch({ type: SET_SEARCH, payload: newSearch })
  );
};

export const postQuestion = (data) => (dispatch, getState) => {
  const {
    auth: { token },
    activeRecipe: { id },
  } = getState();
  if (!token || !id) return;
  postData(dispatch, POST_QUESTION, `/recipes/${id}/questions/`, data, token);
};

export const postAnswer = (response, id, cb) => (dispatch, getState) => {
  const token = getState().auth.token;
  postData(
    dispatch,
    POST_ANSWER,
    `/questions/${id}/answer/`,
    { response },
    token,
    cb
  );
};
