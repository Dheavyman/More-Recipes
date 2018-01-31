import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';

const { SERVER_URL } = config;

const upvoteRecipeRequest = () => ({
  type: actionTypes.UPVOTE_RECIPE_REQUEST,
});

const upvoteRecipeSuccess = data => ({
  type: actionTypes.UPVOTE_RECIPE_SUCCESS,
  payload: data,
});

const upvoteRecipeFailure = error => ({
  type: actionTypes.UPVOTE_RECIPE_FAILURE,
  payload: error,
});

const downvoteRecipeRequest = () => ({
  type: actionTypes.DOWNVOTE_RECIPE_REQUEST,
});

const downvoteRecipeSuccess = data => ({
  type: actionTypes.DOWNVOTE_RECIPE_SUCCESS,
  payload: data,
});

const downvoteRecipeFailure = error => ({
  type: actionTypes.DOWNVOTE_RECIPE_FAILURE,
  payload: error,
});

const upvoteRecipe = recipeId => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(upvoteRecipeRequest());
  axios.put(`${SERVER_URL}/recipes/${recipeId}/upvotes`, {},
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

const downvoteRecipe = recipeId => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(downvoteRecipeRequest());
  axios.put(`${SERVER_URL}/recipes/${recipeId}/downvotes`, {},
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
