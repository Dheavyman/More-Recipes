import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  review: {},
  error: {},
};

const review = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.POST_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.POST_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        review: action.payload,
      };
    case actionTypes.POST_REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default review;
