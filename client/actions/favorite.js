import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';

const { SERVER_URL } = config;

const setFavoriteRequest = () => ({
  type: actionTypes.SET_FAVORITE_REQUEST,
});

const setFavoriteSuccess = data => ({
  type: actionTypes.SET_FAVORITE_SUCCESS,
  payload: data,
});

const setFavoriteFailure = error => ({
  type: actionTypes.SET_FAVORITE_FAILURE,
  payload: error,
});

const setFavorite = recipeId => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(setFavoriteRequest());
  axios.post(`${SERVER_URL}/recipes/${recipeId}/favorites`, {},
    { headers: token })
    .then((response) => {
      const { data } = response;
      dispatch(setFavoriteSuccess(data));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(setFavoriteFailure(data));
    });
};

export default setFavorite;
