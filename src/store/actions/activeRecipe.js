import { FETCH_DETAILS, RESET_ACTIVE_RECIPE } from './actions';
import { fetchData } from '../../utils/apiHelpers';

export const resetActiveRecipe = () => ({ type: RESET_ACTIVE_RECIPE });

export const fetchDetails = (id) => (dispatch, getState) =>
  fetchData(dispatch, FETCH_DETAILS, `/recipes/${id}/`, getState().auth.token);
