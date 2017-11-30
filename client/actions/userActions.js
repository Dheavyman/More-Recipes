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

const signupUser = values => (dispatch) => {
  dispatch(userSignupRequest());
  return axios.post('http://127.0.0.1:3000/api/v1/users/signup', values);
};

const signinUser = values => (dispatch) => {
  dispatch(userSigninRequest());
  return axios.post('http://127.0.0.1:3000/api/v1/users/signin', values);
};

export { userSignupRequest, userSignupSuccess, userSignupFailure,
  userSigninSuccess, userSigninFailure, signupUser, signinUser };
