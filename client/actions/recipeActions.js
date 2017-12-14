import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';

const addRecipeRequest = () => ({
  type: actionTypes.ADD_RECIPE_REQUEST,
});

const addRecipeSuccess = values => ({
  type: actionTypes.ADD_RECIPE_SUCCESS,
  payload: values,
});

const addRecipeFailure = error => ({
  type: actionTypes.ADD_RECIPE_FAILURE,
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
  return axios.post('http://127.0.0.1:3000/api/v1/recipes', values,
    { headers: token })
    .then((response) => {
      const { data } = response;
      dispatch(addRecipeSuccess(data));
      closeAddRecipeModal();
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(addRecipeFailure(data));
    });
};

const uploadImage = value => (dispatch) => {
  dispatch(uploadImageRequest());
  return axios.post('https://api.cloudinary.com/v1_1/heavyman/image/upload',
    value)
    .then((response) => {
      const { data } = response,
        { secure_url } = data;
      dispatch(uploadImageSuccess(secure_url));
    })
    .catch((errorMessage) => {
      const { response: { data: { error } } } = errorMessage;
      dispatch(uploadImageFailure(error));
      return error;
    });
};

export { addRecipe, uploadImage };
