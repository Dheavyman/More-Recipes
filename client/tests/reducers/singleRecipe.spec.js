import singleRecipeReducer, {
  initialState } from '../../reducers/singleRecipe';
import * as actionTypes from '../../actions/actionTypes';
import recipesMockData from '../__mocks__/recipe';
import reviewMockData from '../__mocks__/review';

describe('Single recipe reducer', () => {
  it('should return the default initial state', () => {
    expect(singleRecipeReducer(initialState, {})).toEqual(initialState);
  });
  describe('fetch single recipe', () => {
    it('should handle fetch recipe request', () => {
      const action = {
        type: actionTypes.FETCH_RECIPE_REQUEST,
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isFetching: true,
        voteMessage: null,
        favoriteMessage: null,
      });
    });
    it('should handle fetch recipe success', () => {
      const action = {
        type: actionTypes.FETCH_RECIPE_SUCCESS,
        payload: recipesMockData.fetchRecipeSuccess
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isFetching: false,
        recipe: action.payload,
        reviews: action.payload.Reviews,
        favoritedUsers: action.payload.Favorites,
        voters: action.payload.Votes,
        error: {},
      });
    });
    it('should handle fetch recipe failure', () => {
      const action = {
        type: actionTypes.FETCH_RECIPE_FAILURE,
        payload: recipesMockData.fetchRecipeFailure
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isFetching: false,
        error: action.payload,
      });
    });
  });
  describe('fetch recipe reviews', () => {
    it('should handle fetch reviews request', () => {
      const action = {
        type: actionTypes.FETCH_REVIEWS_REQUEST,
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isLoadingReviews: true,
        hasMoreReviews: true,
      });
    });
    it('should handle fetch reviews success', () => {
      const action = {
        type: actionTypes.FETCH_REVIEWS_SUCCESS,
        payload: {
          reviews: reviewMockData.fetchReviewsSuccess.reviews,
          reviewsCount: reviewMockData.fetchReviewsSuccess.reviewsCount,
        },
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isLoadingReviews: false,
        reviews: [
          ...initialState.reviews,
          ...action.payload.reviews,
        ],
        reviewsCount: action.payload.reviewsCount,
      });
    });
    it('should handle fetch reviews failure', () => {
      const action = {
        type: actionTypes.FETCH_REVIEWS_FAILURE,
        payload: recipesMockData.fetchReviewsFailure
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isLoadingReviews: false,
        error: action.payload,
      });
    });
    it('should handle fetched all reviews', () => {
      const action = {
        type: actionTypes.FETCHED_ALL_REVIEWS,
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        hasMoreReviews: false,
      });
    });
    it('should handle clear all reviews', () => {
      const action = {
        type: actionTypes.CLEAR_ALL_REVIEWS,
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        reviews: [],
      });
    });
  });
  describe('post review', () => {
    it('should handle post review request', () => {
      const action = {
        type: actionTypes.POST_REVIEW_REQUEST,
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should handle post review success', () => {
      const action = {
        type: actionTypes.POST_REVIEW_SUCCESS,
        payload: reviewMockData.postReviewSuccess
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        ...initialState.reviews.unshift(action.payload)
      });
    });
    it('should handle post review failure', () => {
      const action = {
        type: actionTypes.POST_REVIEW_FAILURE,
        payload: reviewMockData.postReviewFailure
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        error: action.payload,
      });
    });
  });
  describe('Delete review', () => {
    it('should handle deleting user review', () => {
      const action = {
        type: actionTypes.DELETE_REVIEW,
        payload: 2,
      };
      const newState = {
        ...initialState,
        reviews: [{
          id: 1,
        }, {
          id: 2
        }],
      };
      expect(singleRecipeReducer(newState, action)).toEqual({
        ...newState,
        reviews: [newState.reviews[0]],
      });
    });
  });
  describe('upvote recipe', () => {
    it('should handle upvote recipe request', () => {
      const action = {
        type: actionTypes.UPVOTE_RECIPE_REQUEST,
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: true,
      });
    });
    it('should handle upvote recipe success', () => {
      const action = {
        type: actionTypes.UPVOTE_RECIPE_SUCCESS,
        payload: recipesMockData.voteSuccessResponse
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: false,
        voteMessage: action.payload.message,
        recipe: {
          ...initialState.recipe,
          ...action.payload.data,
        }
      });
    });
    it('should handle upvote recipe failure', () => {
      const action = {
        type: actionTypes.UPVOTE_RECIPE_FAILURE,
        payload: recipesMockData.voteFailureResponse
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: false,
        error: action.payload,
      });
    });
  });
  describe('downvote recipe', () => {
    it('should handle downvote recipe request', () => {
      const action = {
        type: actionTypes.DOWNVOTE_RECIPE_REQUEST,
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: true,
      });
    });
    it('should handle downvote recipe success', () => {
      const action = {
        type: actionTypes.DOWNVOTE_RECIPE_SUCCESS,
        payload: recipesMockData.voteSuccessResponse
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: false,
        voteMessage: action.payload.message,
        recipe: {
          ...initialState.recipe,
          ...action.payload.data,
        }
      });
    });
    it('should handle downvote recipe failure', () => {
      const action = {
        type: actionTypes.DOWNVOTE_RECIPE_FAILURE,
        payload: recipesMockData.voteFailureResponse
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: false,
        error: action.payload,
      });
    });
  });
  describe('set favorite recipe', () => {
    it('should handle set favorite recipe request', () => {
      const action = {
        type: actionTypes.SET_FAVORITE_REQUEST,
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: true,
      });
    });
    it('should handle set favorite recipe success', () => {
      const action = {
        type: actionTypes.SET_FAVORITE_SUCCESS,
        payload: recipesMockData.setFavoriteSuccessResponse
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: false,
        favoriteMessage: action.payload.message,
        recipe: {
          ...initialState.recipe,
          ...action.payload.data,
        }
      });
    });
    it('should handle set favorite recipe failure', () => {
      const action = {
        type: actionTypes.SET_FAVORITE_FAILURE,
        payload: recipesMockData.setFavoriteFailureResponse
      };
      expect(singleRecipeReducer(initialState, action)).toEqual({
        ...initialState,
        isActing: false,
        error: action.payload,
      });
    });
  });
});
