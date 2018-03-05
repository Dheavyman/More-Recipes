import axios from 'axios';

import * as actionTypes from './actionTypes';
import config from '../config';

const { SERVER_URL } = config;

/**
 * Post review request action creator
 *
 * @return {object} Post review request action
 */
const postReviewRequest = () => ({
  type: actionTypes.POST_REVIEW_REQUEST,
});

/**
 * Post review success action creator
 *
 * @param {object} review - Review content
 *
 * @returns {object} Post review success action
 */
const postReviewSuccess = review => ({
  type: actionTypes.POST_REVIEW_SUCCESS,
  payload: review,
});

/**
 * Post review failure action creator
 *
 * @param {pbject} error - Error posting review
 *
 * @returns {object} Post review failure action
 */
const postReviewFailure = error => ({
  type: actionTypes.POST_REVIEW_FAILURE,
  payload: error,
});

/**
 * Post review async action creator
 *
 * @param {any} recipeId - Id of recipe
 * @param {any} reviewContent - Review content
 *
 * @returns {object} Dispatch necessary action
 */
const postReview = (recipeId, reviewContent) => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };

  dispatch(postReviewRequest());
  return axios.post(`${SERVER_URL}/recipes/${recipeId}/reviews`,
    reviewContent, { headers: token })
    .then((response) => {
      const { data } = response;
      const { data: { review } } = data;
      dispatch(postReviewSuccess(review));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(postReviewFailure(data));
    });
};

export default postReview;
