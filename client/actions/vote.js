import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';

const { SERVER_URL } = config;

/**
 * Upvote recipe request action creator
 *
 * @returns {object} Upvote recipe request action
 */
const upvoteRecipeRequest = () => ({
  type: actionTypes.UPVOTE_RECIPE_REQUEST,
});

/**
 * Upvote recipe success action creator
 *
 * @param {any} data - The new vote status
 *
 * @returns {object} Upvote recipe success action
 */
const upvoteRecipeSuccess = data => ({
  type: actionTypes.UPVOTE_RECIPE_SUCCESS,
  payload: data,
});

/**
 * Upvote recipe Failure action creator
 *
 * @param {any} error - Error in upvoting recipe
 *
 * @returns {object} Upvote recipe failure action
 */
const upvoteRecipeFailure = error => ({
  type: actionTypes.UPVOTE_RECIPE_FAILURE,
  payload: error,
});

/**
 * Downvote recipe request action creator
 *
 * @returns {object} Downvote recipe request action
 */
const downvoteRecipeRequest = () => ({
  type: actionTypes.DOWNVOTE_RECIPE_REQUEST,
});

/**
 * Downvote recipe success action creator
 *
 * @param {any} data - The new vote status
 *
 * @returns {object} Downvote recipe success action
 */
const downvoteRecipeSuccess = data => ({
  type: actionTypes.DOWNVOTE_RECIPE_SUCCESS,
  payload: data,
});

/**
 * Downvote recipe failure action creator
 *
 * @param {any} error - Error in downvoting recipe
 *
 * @returns {object} Downvote recipe failure action
 */
const downvoteRecipeFailure = error => ({
  type: actionTypes.DOWNVOTE_RECIPE_FAILURE,
  payload: error,
});

/**
 * Upvote recipe async action creator
 *
 * @param {any} recipeId - Id of recipe
 *
 * @returns {object} Dispatch necessary action
 */
const upvoteRecipe = recipeId => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(upvoteRecipeRequest());
  return axios.put(`${SERVER_URL}/recipes/${recipeId}/upvotes`, {},
    { headers: token })
    .then((response) => {
      const { data } = response;
      dispatch(upvoteRecipeSuccess(data));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(upvoteRecipeFailure(data));
    });
};

/**
 * Downvote recipe async action creator
 *
 * @param {any} recipeId - Id of recipe
 *
 * @returns {object} Dispatch necessary action
 */
const downvoteRecipe = recipeId => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(downvoteRecipeRequest());
  return axios.put(`${SERVER_URL}/recipes/${recipeId}/downvotes`, {},
    { headers: token })
    .then((response) => {
      const { data } = response;
      dispatch(downvoteRecipeSuccess(data));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(downvoteRecipeFailure(data));
    });
};

export { upvoteRecipe, downvoteRecipe };
