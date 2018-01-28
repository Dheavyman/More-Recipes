import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';

const { SERVER_URL, CLOUDINARY_URL } = config;

const addRecipeRequest = () => ({
  type: actionTypes.ADD_RECIPE_REQUEST,
});

const addRecipeSuccess = recipe => ({
  type: actionTypes.ADD_RECIPE_SUCCESS,
  payload: recipe,
});

const addRecipeFailure = error => ({
  type: actionTypes.ADD_RECIPE_FAILURE,
  payload: error,
});

const editRecipeRequest = () => ({
  type: actionTypes.EDIT_RECIPE_REQUEST,
});

const editRecipeSuccess = (id, recipe) => ({
  type: actionTypes.EDIT_RECIPE_SUCCESS,
  id,
  payload: recipe,
});

const editRecipeFailure = error => ({
  type: actionTypes.EDIT_RECIPE_FAILURE,
  payload: error,
});

const deleteRecipeRequest = () => ({
  type: actionTypes.DELETE_RECIPE_REQUEST,
});

const deleteRecipeSuccess = id => ({
  type: actionTypes.DELETE_RECIPE_SUCCESS,
  id,
});

const deleteRecipeFailure = error => ({
  type: actionTypes.DELETE_RECIPE_FAILURE,
  payload: error,
});

const uploadImageRequest = () => ({
  type: actionTypes.UPLOAD_IMAGE_REQUEST,
});

const uploadImageSuccess = imageUrl => ({
  type: actionTypes.UPLOAD_IMAGE_SUCCESS,
  payload: imageUrl,
});

const uploadImageFailure = error => ({
  type: actionTypes.UPLOAD_IMAGE_FAILURE,
  payload: error,
});

const addRecipe = (values, closeAddRecipeModal) => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };

  dispatch(addRecipeRequest());
  return axios.post(`${SERVER_URL}/recipes`, values,
    { headers: token })
    .then((response) => {
      const { data } = response,
        { data: { recipe } } = data;
      dispatch(addRecipeSuccess(recipe));
      closeAddRecipeModal();
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(addRecipeFailure(data));
    });
};

const editRecipe = (recipeId, values, closeEditRecipeModal) => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(editRecipeRequest());
  return axios.put(`${SERVER_URL}/recipes/${recipeId}`, values,
    { headers: token })
    .then((response) => {
      const { data } = response,
        { data: { recipe } } = data;
      dispatch(editRecipeSuccess(recipeId, recipe));
      closeEditRecipeModal();
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(editRecipeFailure(data));
    });
};

const deleteRecipe = (recipeId, closeDeleteRecipeModal) => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(deleteRecipeRequest());
  return axios.delete(`${SERVER_URL}/recipes/${recipeId}`,
    { headers: token })
    .then(() => {
      dispatch(deleteRecipeSuccess(recipeId));
      closeDeleteRecipeModal();
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(deleteRecipeFailure(data));
    });
};

const uploadImage = value => (dispatch) => {
  dispatch(uploadImageRequest());
  return axios.post(`${CLOUDINARY_URL}`,
    value)
    .then((response) => {
      const { data } = response,
        { secure_url } = data;
      dispatch(uploadImageSuccess(secure_url));
    })
    .catch((errorMessage) => {
      const { response: { data: { error } } } = errorMessage;
      dispatch(uploadImageFailure(error));
    });
};

export { addRecipe, editRecipe, deleteRecipe, uploadImage };
