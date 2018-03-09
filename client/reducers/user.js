import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  isLoading: false,
  imageUploading: false,
  imageUploaded: false,
  userImageUrl: null,
  userAuthentication: {},
  userProfile: {},
  isAuthenticated: !!localStorage.getItem('token'),
  error: {},
};

/**
 * User reducer
 *
 * @param {object} [state=initialState] - State data
 * @param {object} action - Action dispatched
 *
 * @returns {object} The new state of data
 */
const user = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        userAuthentication: action.payload,
        error: {},
      };
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload
      };
    case actionTypes.SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        userAuthentication: action.payload,
        error: {},
      };
    case actionTypes.SIGNIN_FAILURE:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload
      };
    case actionTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        userAuthentication: {},
      };
    case actionTypes.FETCH_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
        userProfile: {},
      };
    case actionTypes.FETCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: action.payload,
        error: {},
      };
    case actionTypes.FETCH_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.EDIT_USER_PROFILE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.EDIT_USER_PROFILE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userProfile: {
          ...state.userProfile,
          ...action.payload,
        },
        error: {},
      };
    case actionTypes.EDIT_USER_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.UPLOAD_USER_IMAGE_REQUEST:
      return {
        ...state,
        imageUploading: true,
        imageUploaded: false,
      };
    case actionTypes.UPLOAD_USER_IMAGE_SUCCESS:
      return {
        ...state,
        imageUploading: false,
        imageUploaded: true,
        userImageUrl: action.payload,
        error: {},
      };
    case actionTypes.UPLOAD_USER_IMAGE_FAILURE:
      return {
        ...state,
        imageUploading: false,
        imageUploaded: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default user;
