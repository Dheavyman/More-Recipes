import axios from 'axios';

import * as actionTypes from './actionTypes';

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
  const review = {
      content: reviewContent,
    },
    token = {
      'x-access-token': localStorage.getItem('token'),
    };

  dispatch(postReviewRequest());
  return axios.post(`http://127.0.0.1:3000/api/v1/recipes/${recipeId}/reviews`,
    review, { headers: token })
    .then((response) => {
      const { data } = response;
      dispatch(postReviewSuccess(data));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(postReviewFailure(data));
    });
};

export default postReview;
