import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';

const { SERVER_URL, CLOUDINARY_URL } = config;

/**
 * Add recipe request action creator
 *
 * @returns {object} Add recipe request action
 */
export const addRecipeRequest = () => ({
  type: actionTypes.ADD_RECIPE_REQUEST,
});

/**
 * Add recipe success action creator
 *
 * @param {object} recipe - Recipe returned from server
 *
 * @returns {object} Add recipe success action
 */
export const addRecipeSuccess = recipe => ({
  type: actionTypes.ADD_RECIPE_SUCCESS,
  payload: recipe,
});

/**
 * Add recipe failure action creator
 *
 * @param {object} error - Error in adding recipe
 *
 * @returns {object} Add recipe action
 */
export const addRecipeFailure = error => ({
  type: actionTypes.ADD_RECIPE_FAILURE,
  payload: error,
});

/**
 * Edit recipe request action creator
 *
 * @returns {object} Edit recipe request action
 */
export const editRecipeRequest = () => ({
  type: actionTypes.EDIT_RECIPE_REQUEST,
});

/**
 * Edit recipe success action creator
 *
 * @param {number} id - Id of the recipe
 * @param {object} recipe - Recipe details
 *
 * @returns {object} Edit recipe success action
 */
export const editRecipeSuccess = (id, recipe) => ({
  type: actionTypes.EDIT_RECIPE_SUCCESS,
  id,
  payload: recipe,
});

/**
 * Edit recipe failure action creator
 *
 * @param {object} error - Error in editing recipe
 *
 * @returns {object} Edit recipe failure action
 */
export const editRecipeFailure = error => ({
  type: actionTypes.EDIT_RECIPE_FAILURE,
  payload: error,
});

/**
 * Delete recipe request action creator
 *
 * @returns {object} Delete recipe request action
 */
export const deleteRecipeRequest = () => ({
  type: actionTypes.DELETE_RECIPE_REQUEST,
});

/**
 * Delete recipe success action creator
 *
 * @param {number} id - Id of the recipe
 *
 * @returns {object} Delete recipe success action
 */
export const deleteRecipeSuccess = id => ({
  type: actionTypes.DELETE_RECIPE_SUCCESS,
  payload: id,
});

/**
 * Delete recipe failure action creator
 *
 * @param {object} error - Error in deleting recipe
 *
 * @returns {object} Delete recipe failure action
 */
export const deleteRecipeFailure = error => ({
  type: actionTypes.DELETE_RECIPE_FAILURE,
  payload: error,
});

/**
 * Upload image request action creator
 *
 * @returns {object} Upload image request action
 */
export const uploadImageRequest = () => ({
  type: actionTypes.UPLOAD_IMAGE_REQUEST,
});

/**
 * Upload image success action creator
 *
 * @param {string} imageUrl - Image url
 *
 * @returns {object} Upload image success action
 */
export const uploadImageSuccess = imageUrl => ({
  type: actionTypes.UPLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

/**
 * Upload image failure action creator
 *
 * @param {any} error - Error in uploading image
 *
 * @returns {object} Upload image failure action
 */
export const uploadImageFailure = error => ({
  type: actionTypes.UPLOAD_IMAGE_FAILURE,
  payload: error,
});

/**
 * Add recipe async action creator
 *
 * @param {object} values - Recipe details
 *
 * @returns {any} Dispatch necessary action
 */
const addRecipe = values => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };

  dispatch(addRecipeRequest());
  return axios.post(`${SERVER_URL}/recipes`, values,
    { headers: token })
    .then((response) => {
      const { data } = response;
      const { data: { recipe } } = data;
      dispatch(addRecipeSuccess(recipe));
      dispatch({
        type: actionTypes.UPDATE_USER_RECIPES_COUNT,
      });
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(addRecipeFailure(data));
    });
};

/**
 * Edit recipe async action creator
 *
 * @param {number} recipeId - Id of recipe
 * @param {object} values - Recipe details
 *
 * @returns {any} Dispatch necessary action
 */
const editRecipe = (recipeId, values) => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(editRecipeRequest());
  return axios.put(`${SERVER_URL}/recipes/${recipeId}`, values,
    { headers: token })
    .then((response) => {
      const { data } = response;
      const { data: { recipe } } = data;
      dispatch(editRecipeSuccess(recipeId, recipe));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(editRecipeFailure(data));
    });
};

/**
 * Delete recipe async action creator
 *
 * @param {number} recipeId - Id of recipe
 *
 * @returns {any} Dispatch necessary action
 */
const deleteRecipe = recipeId => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(deleteRecipeRequest());
  return axios.delete(`${SERVER_URL}/recipes/${recipeId}`,
    { headers: token })
    .then(() => {
      dispatch(deleteRecipeSuccess(recipeId));
      dispatch({
        type: actionTypes.UPDATE_USER_FAVORITE_RECIPES,
        payload: recipeId,
      });
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(deleteRecipeFailure(data));
    });
};

/**
 * Upload image async action creator
 *
 * @param {object} value - Image details
 *
 * @returns {any} Dispatch necessary action
 */
const uploadImage = value => (dispatch) => {
  dispatch(uploadImageRequest());
  return axios.post(`${CLOUDINARY_URL}`,
    value)
    .then((response) => {
      const { data } = response;
      const { secure_url } = data;
      dispatch(uploadImageSuccess(secure_url));
    })
    .catch((errorMessage) => {
      const { response: { data: { error } } } = errorMessage;
      dispatch(uploadImageFailure(error));
    });
};

export { addRecipe, editRecipe, deleteRecipe, uploadImage };
