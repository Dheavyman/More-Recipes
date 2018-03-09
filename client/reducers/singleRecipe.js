import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  recipe: {},
  reviews: [],
  favoritedUsers: [],
  voters: [],
  voteMessage: null,
  favoriteMessage: null,
  error: {}
};

/**
 * Single recipe reducer
 *
 * @param {object} [state=initialState] - State data
 * @param {object} action - Action dispatched
 *
 * @returns {object} New state data
 */
const singleRecipe = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
        voteMessage: null,
        favoriteMessage: null,
      };
    case actionTypes.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipe: action.payload,
        reviews: action.payload.Reviews,
        favoritedUsers: action.payload.Favorites,
        voters: action.payload.Votes,
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
    case actionTypes.UPVOTE_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.UPVOTE_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        voteMessage: action.payload.message,
        recipe: {
          ...state.recipe,
          ...action.payload.data,
        }
      };
    case actionTypes.UPVOTE_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.DOWNVOTE_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DOWNVOTE_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        voteMessage: action.payload.message,
        recipe: {
          ...state.recipe,
          ...action.payload.data,
        }
      };
    case actionTypes.DOWNVOTE_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.SET_FAVORITE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SET_FAVORITE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        favoriteMessage: action.payload.message,
        recipe: {
          ...state.recipe,
          ...action.payload.data,
        }
      };
    case actionTypes.SET_FAVORITE_FAILURE:
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
