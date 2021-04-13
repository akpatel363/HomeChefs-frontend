import {
  FETCH_DETAILS,
  FETCH_MY_RATING,
  FETCH_RATINGS,
  POST_MY_RATING,
  RESET_ACTIVE_RECIPE,
  SET_RATINGS_SEARCH,
} from '../actions/actions';

const initialState = {
  search: null,
  ratings: null,
  count: null,
  myRating: null,
  ratingGroups: null,
};

const ratingsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case RESET_ACTIVE_RECIPE:
      return initialState;
    case SET_RATINGS_SEARCH:
      return { ...state, search: payload };
    case FETCH_DETAILS:
      return {
        ...state,
        ratingGroups: payload.rating_groups.reduce(
          (p, n) => ({ ...p, [n.stars]: n.count }),
          {}
        ),
      };
    case FETCH_RATINGS:
      return { ...state, ratings: payload.results, count: payload.count };
    case FETCH_MY_RATING:
      return { ...state, myRating: payload, myRatingFetched: true };
    case POST_MY_RATING:
      let ratingGroups = {
        ...state.ratingGroups,
        [payload.stars]: (state.ratingGroups[payload.stars] || 0) + 1,
      };
      if (state.myRating) {
        ratingGroups[state.myRating.stars] =
          state.ratingGroups[state.myRating.stars] - 1;
      }
      const ratings = state.ratings.filter(({ id }) => id !== payload.id);
      return {
        ...state,
        ratings: [payload, ...ratings],
        myRating: payload,
        count: state.count + 1,
        ratingGroups,
      };
    default:
      return state;
  }
};

export default ratingsReducer;
