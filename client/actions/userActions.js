import axios from 'axios';

import * as actionTypes from './actionTypes';

const userSignupRequest = () => ({
  type: actionTypes.SIGNUP_REQUEST,
});

const userSignupSuccess = data => ({
  type: actionTypes.SIGNUP_SUCCESS,
  payload: data,
});

const userSignupFailure = error => ({
  type: actionTypes.SIGNUP_FAILURE,
  payload: error,
});

const userSigninRequest = () => ({
  type: actionTypes.SIGNIN_REQUEST,
});

const userSigninSuccess = data => ({
  type: actionTypes.SIGNIN_SUCCESS,
  payload: data,
});

const userSigninFailure = error => ({
  type: actionTypes.SIGNIN_FAILURE,
  payload: error,
});

const userLogoutRequest = () => ({
  type: actionTypes.LOGOUT_REQUEST,
});

const userLogoutSuccess = () => ({
  type: actionTypes.LOGOUT_SUCCESS
});

const signupUser = (values, closeSignupModal) => (dispatch) => {
  dispatch(userSignupRequest());
  axios.post('http://127.0.0.1:3000/api/v1/users/signup', values)
    .then((response) => {
      dispatch(userSignupSuccess(response.data));
      closeSignupModal();
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(userSignupFailure(data));
    });
};

const signinUser = (values, closeSigninModal) => (dispatch) => {
  dispatch(userSigninRequest());
  axios.post('http://127.0.0.1:3000/api/v1/users/signin', values)
    .then((response) => {
      const { data } = response;
      const { data: { token } } = data;
      dispatch(userSigninSuccess(data));
      localStorage.setItem('token', token);
      closeSigninModal();
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(userSigninFailure(data));
    });
};

const logoutUser = () => (dispatch) => {
  dispatch(userLogoutRequest());
  localStorage.removeItem('token');
  dispatch(userLogoutSuccess());
};

export { signupUser, signinUser, logoutUser };
