import {
  FETCH_DETAILS,
  RESET_ACTIVE_RECIPE,
  EDIT_RECIPE,
} from '../actions/actions';

const initialState = {
  id: null,
  details: null,
};

const activeRecipeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_ACTIVE_RECIPE:
      return initialState;
    case FETCH_DETAILS:
      return {
        ...state,
        details: payload.recipe,
        id: payload.recipe.id,
      };
    case EDIT_RECIPE:
      return { ...state, details: payload };
    default:
      return state;
  }
};

export default activeRecipeReducer;
