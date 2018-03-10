import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  isFetching: false,
  isLoading: false,
  isLoadingReviews: false,
  recipe: {},
  reviews: [],
  reviewsCount: 0,
  hasMoreReviews: true,
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
        isFetching: true,
        voteMessage: null,
        favoriteMessage: null,
      };
    case actionTypes.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        isFetching: false,
        recipe: action.payload,
        favoritedUsers: action.payload.Favorites,
        voters: action.payload.Votes,
        error: {},
      };
    case actionTypes.FETCH_RECIPE_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case actionTypes.FETCH_REVIEWS_REQUEST:
      return {
        ...state,
        isLoadingReviews: true,
        hasMoreReviews: true,
      };
    case actionTypes.FETCH_REVIEWS_SUCCESS:
      return {
        ...state,
        isLoadingReviews: false,
        reviews: [
          ...state.reviews,
          ...action.payload.reviews,
        ],
        reviewsCount: action.payload.reviewsCount,
      };
    case actionTypes.FETCH_REVIEWS_FAILURE:
      return {
        ...state,
        isLoadingReviews: false,
        error: action.payload,
      };
    case actionTypes.FETCHED_ALL_REVIEWS:
      return {
        ...state,
        hasMoreReviews: false,
      };
    case actionTypes.CLEAR_ALL_REVIEWS:
      return {
        ...state,
        reviews: [],
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
        ...state.reviews.unshift(action.payload)
      };
    case actionTypes.POST_REVIEW_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.DELETE_REVIEW: {
      let reviews = state.reviews.slice();
      reviews = reviews.filter(review =>
        review.id !== action.payload);

      return {
        ...state,
        reviews,
      };
    }
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
