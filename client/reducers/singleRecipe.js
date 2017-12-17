import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  recipe: {},
  reviews: [],
  error: {}
};

const singleRecipe = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipe: action.payload,
        reviews: action.payload.Reviews,
        error: {},
      };
    case actionTypes.FETCH_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.POST_REVIEW_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.POST_REVIEW_SUCCESS:
      return {
        ...state,
        isLoading: false,
        reviews: [
          ...state.reviews,
          action.payload,
        ]
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

export default singleRecipe;
