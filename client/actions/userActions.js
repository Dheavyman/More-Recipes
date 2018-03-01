import axios from 'axios';

import * as actionTypes from './actionTypes';
import config from '../config';

const { SERVER_URL, CLOUDINARY_URL } = config;

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

const fetchUserProfileRequest = () => ({
  type: actionTypes.FETCH_USER_PROFILE_REQUEST,
});

const fetchUserProfileSuccess = user => ({
  type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
  payload: user,
});

const fetchUserProfileFailure = error => ({
  type: actionTypes.FETCH_USER_PROFILE_FAILURE,
  payload: error,
});

const editUserProfileRequest = () => ({
  type: actionTypes.EDIT_USER_PROFILE_REQUEST,
});

const editUserProfileSuccess = user => ({
  type: actionTypes.EDIT_USER_PROFILE_SUCCESS,
  payload: user,
});

const editUserProfileFailure = error => ({
  type: actionTypes.EDIT_USER_PROFILE_FAILURE,
  payload: error,
});

const editProfilePictureRequest = () => ({
  type: actionTypes.EDIT_PROFILE_PICTURE_REQUEST,
});

const editProfilePictureSuccess = user => ({
  type: actionTypes.EDIT_PROFILE_PICTURE_SUCCESS,
  payload: user,
});

const editProfilePictureFailure = error => ({
  type: actionTypes.EDIT_PROFILE_PICTURE_FAILURE,
  payload: error,
});

const uploadUserImageRequest = () => ({
  type: actionTypes.UPLOAD_USER_IMAGE_REQUEST,
});

const uploadUserImageSuccess = userImageUrl => ({
  type: actionTypes.UPLOAD_USER_IMAGE_SUCCESS,
  payload: userImageUrl,
});

const uploadUserImageFailure = error => ({
  type: actionTypes.UPLOAD_USER_IMAGE_FAILURE,
  payload: error,
});

const signupUser = values => (dispatch) => {
  dispatch(userSignupRequest());
  return axios.post(`${SERVER_URL}/users/signup`, values)
    .then((response) => {
      const { data } = response;
      dispatch(userSignupSuccess(data));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(userSignupFailure(data));
    });
};

const signinUser = values => (dispatch) => {
  dispatch(userSigninRequest());
  return axios.post(`${SERVER_URL}/users/signin`, values)
    .then((response) => {
      const { data } = response;
      const { data: { token } } = data;
      dispatch(userSigninSuccess(data));
      localStorage.setItem('token', token);
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(userSigninFailure(data));
    });
};

const logoutUser = () => (dispatch) => {
  dispatch(userLogoutRequest());
  const loggingOut = new Promise(resolve => resolve());
  return loggingOut.then(() => {
    localStorage.removeItem('token');
    dispatch(userLogoutSuccess());
  });
};

const fetchUserProfile = userId => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };
  dispatch(fetchUserProfileRequest());
  return axios.get(`${SERVER_URL}/users/${userId}`, { headers: token })
    .then((response) => {
      const { data } = response,
        { data: { user } } = data;
      dispatch(fetchUserProfileSuccess(user));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchUserProfileFailure(data));
    });
};

const editUserProfile = (userId, values) => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };
  dispatch(editUserProfileRequest());
  return axios.put(`${SERVER_URL}/users/${userId}`, values,
    { headers: token })
    .then((response) => {
      const { data } = response,
        { data: { user } } = data;
      dispatch(editUserProfileSuccess(user));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(editUserProfileFailure(data));
    });
};

const editProfilePicture = (userId, imageFile) => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };
  dispatch(editProfilePictureRequest());
  return axios.put(`${SERVER_URL}/users/${userId}/image`, imageFile,
    { headers: token })
    .then((response) => {
      const { data } = response,
        { data: { user } } = data;
      dispatch(editProfilePictureSuccess(user));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(editProfilePictureFailure(data));
    });
};

const uploadUserImage = value => (dispatch) => {
  dispatch(uploadUserImageRequest());
  return axios.post(`${CLOUDINARY_URL}`, value)
    .then((response) => {
      const { data } = response,
        { secure_url } = data;
      dispatch(uploadUserImageSuccess(secure_url));
    })
    .catch((errorMessage) => {
      const { response: { data: { error } } } = errorMessage;
      dispatch(uploadUserImageFailure(error));
    });
};

export {
  signupUser, signinUser, logoutUser, fetchUserProfile,
  editUserProfile, editProfilePicture, uploadUserImage
};
