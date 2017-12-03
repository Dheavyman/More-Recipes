import axios from 'axios';

import * as actionTypes from './actionTypes';

const postReviewRequest = () => ({
  type: actionTypes.POST_REVIEW_FAILURE,
});

const postReviewSuccess = review => ({
  type: actionTypes.POST_REVIEW_SUCCESS,
  payload: review,
});

const postReviewFailure = error => ({
  type: actionTypes.POST_REVIEW_SUCCESS,
  payload: error,
});

const postReview = (recipeId, review) => (dispatch) => {
  dispatch(postReviewRequest());
  axios.post(`http://127.0.0.1:3000/api/v1/recipes/${recipeId}/review`, review)
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
