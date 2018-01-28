import axios from 'axios';

import * as actionTypes from './actionTypes';
import config from '../config';

const { SERVER_URL } = config;

const postReviewRequest = () => ({
  type: actionTypes.POST_REVIEW_REQUEST,
});

const postReviewSuccess = review => ({
  type: actionTypes.POST_REVIEW_SUCCESS,
  payload: review,
});

const postReviewFailure = error => ({
  type: actionTypes.POST_REVIEW_FAILURE,
  payload: error,
});

const postReview = (recipeId, reviewContent) => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };

  dispatch(postReviewRequest());
  return axios.post(`${SERVER_URL}/recipes/${recipeId}/reviews`,
    reviewContent, { headers: token })
    .then((response) => {
      const { data } = response,
        { data: { review } } = data;
      dispatch(postReviewSuccess(review));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(postReviewFailure(data));
    });
};

export default postReview;
