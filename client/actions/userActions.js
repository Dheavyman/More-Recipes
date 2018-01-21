import axios from 'axios';

import * as actionTypes from './actionTypes';

// const URL = 'https://more-recipes-25.herokuapp.com/api/v1/';

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

const signupUser = (values, closeSignupModal) => (dispatch) => {
  dispatch(userSignupRequest());
  axios.post('http://127.0.0.1:3000/api/v1/users/signup', values)
    .then((response) => {
      const { data } = response;
      dispatch(userSignupSuccess(data));
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

const fetchUserProfile = userId => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };
  dispatch(fetchUserProfileRequest());
  axios.get(`http://127.0.0.1:3000/api/v1/users/${userId}`, { headers: token })
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
  axios.put(`http://127.0.0.1:3000/api/v1/users/${userId}`, values,
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

const editProfilePicture = (userId, imagefile) => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };
  dispatch(editProfilePictureRequest());
  axios.put(`http://127.0.0.1:3000/api/v1/users/${userId}`, imagefile,
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
  return axios.post('https://api.cloudinary.com/v1_1/heavyman/image/upload',
    value)
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

export { signupUser, signinUser, logoutUser, fetchUserProfile,
  editUserProfile, editProfilePicture, uploadUserImage };
