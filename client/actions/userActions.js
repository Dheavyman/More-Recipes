import axios from 'axios';

import { USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS,
  USER_SIGNUP_FAILURE, USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS, USER_SIGNIN_FAILURE } from './actionTypes';

const userSignupRequest = () => ({
  type: USER_SIGNUP_REQUEST,
});

const userSignupSuccess = data => ({
  type: USER_SIGNUP_SUCCESS,
  payload: data,
});

const userSignupFailure = error => ({
  type: USER_SIGNUP_FAILURE,
  payload: error,
});

const userSigninRequest = () => ({
  type: USER_SIGNIN_REQUEST,
});

const userSigninSuccess = data => ({
  type: USER_SIGNIN_SUCCESS,
  payload: data,
});

const userSigninFailure = error => ({
  type: USER_SIGNIN_FAILURE,
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
