import {
  FETCH_QUESTIONS,
  POST_ANSWER,
  POST_QUESTION,
  RESET_ACTIVE_RECIPE,
  SET_SEARCH,
} from '../actions/actions';

const initialState = {
  search: null,
  count: null,
  questions: null,
};

const questionsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_SEARCH:
      return { ...state, search: payload };
    case FETCH_QUESTIONS:
      return { ...state, count: payload.count, questions: payload.results };
    case POST_QUESTION:
      return {
        ...state,
        count: state.count + 1,
        questions: [payload].concat(state.questions),
      };
    case POST_ANSWER:
      return {
        ...state,
        questions: state.questions?.map((q) => {
          if (q.id === payload.question) return { ...q, answer: payload };
          return q;
        }),
      };
    case RESET_ACTIVE_RECIPE:
      return initialState;
    default:
      return state;
  }
};

export default questionsReducer;
