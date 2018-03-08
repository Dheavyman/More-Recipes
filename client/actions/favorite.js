import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';

const { SERVER_URL } = config;

/**
 * Set favorite request action creator
 *
 * @returns {object} Set favorite request action
 */
export const setFavoriteRequest = () => ({
  type: actionTypes.SET_FAVORITE_REQUEST,
});

/**
 * Set favorites success action creator
 *
 * @param {any} data - Response data
 *
 * @returns {object} Set favorite success action
 */
export const setFavoriteSuccess = data => ({
  type: actionTypes.SET_FAVORITE_SUCCESS,
  payload: data,
});

/**
 * Set favorite failure action creator
 *
 * @param {object} error - Error is setting favorite status
 *
 * @returns {object} Set favorite failure action
 */
export const setFavoriteFailure = error => ({
  type: actionTypes.SET_FAVORITE_FAILURE,
  payload: error,
});

/**
 * Set favorite async action creator
 *
 * @param {any} recipeId - Id of the recipe
 *
 * @returns {object} Dispatch necessary action
 */
export const setFavorite = recipeId => (dispatch) => {
  const token = {
    'x-access-token': getToken(),
  };
  dispatch(setFavoriteRequest());
  return axios.post(`${SERVER_URL}/recipes/${recipeId}/favorites`, {},
    { headers: token })
    .then((response) => {
      const { data } = response;
      dispatch(setFavoriteSuccess(data));
      dispatch({
        type: actionTypes.UPDATE_USER_FAVORITE_RECIPES,
        payload: recipeId,
      });
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(setFavoriteFailure(data));
    });
};
