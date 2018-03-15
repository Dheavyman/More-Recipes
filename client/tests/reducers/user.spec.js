import userReducer, { initialState } from '../../reducers/user';
import * as actionTypes from '../../actions/actionTypes';
import userMockData from '../__mocks__/user';

describe('User reducer', () => {
  it('should return the default initial state', () => {
    expect(userReducer(initialState, {})).toEqual(initialState);
  });
  describe('signup user', () => {
    it('should handle user signup request', () => {
      const action = {
        type: actionTypes.SIGNUP_REQUEST,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should handle user signup success', () => {
      const action = {
        type: actionTypes.SIGNUP_SUCCESS,
        payload: userMockData.userSignupSuccess,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        isAuthenticated: true,
        userAuthentication: action.payload,
        error: {},
      });
    });
    it('should handle user signup failure', () => {
      const action = {
        type: actionTypes.SIGNUP_FAILURE,
        payload: userMockData.userSignupFailure,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      });
    });
  });
  describe('signin user', () => {
    it('should handle user signin request', () => {
      const action = {
        type: actionTypes.SIGNIN_REQUEST,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should handle user signup success', () => {
      const action = {
        type: actionTypes.SIGNIN_SUCCESS,
        payload: userMockData.signinSuccessResponse,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        isAuthenticated: true,
        userAuthentication: action.payload,
        error: {},
      });
    });
    it('should handle user signin failure', () => {
      const action = {
        type: actionTypes.SIGNIN_FAILURE,
        payload: userMockData.userSigninFailure,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      });
    });
  });
  describe('user logout', () => {
    it('should handle user logout request', () => {
      const action = {
        type: actionTypes.LOGOUT_REQUEST,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should handle user logout success', () => {
      const action = {
        type: actionTypes.LOGOUT_SUCCESS,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        isAuthenticated: false,
        userAuthentication: {},
      });
    });
  });
  describe('fetch user profile', () => {
    it('should handle fetch user profile request', () => {
      const action = {
        type: actionTypes.FETCH_USER_PROFILE_REQUEST,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
        errorFetchingProfile: {},
        userProfile: {},
      });
    });
    it('should handle fetch user profile success', () => {
      const action = {
        type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
        payload: userMockData.fetchProfileSuccessResponse
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        userProfile: action.payload,
        errorFetchingProfile: {},
      });
    });
    it('should handle fetch user profile failure', () => {
      const action = {
        type: actionTypes.FETCH_USER_PROFILE_FAILURE,
        payload: userMockData.fetchProfileFailureResponse
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        errorFetchingProfile: action.payload,
      });
    });
  });
  describe('edit user profile', () => {
    it('should handle edit user profile request', () => {
      const action = {
        type: actionTypes.EDIT_USER_PROFILE_REQUEST,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: true,
      });
    });
    it('should handle edit user profile success', () => {
      const action = {
        type: actionTypes.EDIT_USER_PROFILE_SUCCESS,
        payload: userMockData.editProfileSuccessResponse
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        userProfile: {
          ...initialState.userProfile,
          ...action.payload,
        },
        error: {},
      });
    });
    it('should handle edit user profile failure', () => {
      const action = {
        type: actionTypes.EDIT_USER_PROFILE_FAILURE,
        payload: userMockData.editProfileFailureResponse
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isLoading: false,
        error: action.payload,
      });
    });
  });
  describe('upload user profile picture', () => {
    it('should handle upload user profile request', () => {
      const action = {
        type: actionTypes.UPLOAD_USER_IMAGE_REQUEST,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        imageUploading: true,
        imageUploaded: false,
      });
    });
    it('should handle edit user profile success', () => {
      const action = {
        type: actionTypes.UPLOAD_USER_IMAGE_SUCCESS,
        payload: userMockData.uploadImageSuccessResponse
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        imageUploading: false,
        imageUploaded: true,
        userImageUrl: action.payload,
        error: {},
      });
    });
    it('should handle edit user profile failure', () => {
      const action = {
        type: actionTypes.UPLOAD_USER_IMAGE_FAILURE,
        payload: userMockData.uploadImageFailureResponse
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        imageUploading: false,
        imageUploaded: false,
        error: action.payload,
      });
    });
  });
  describe('reset authentication', () => {
    it('should reset authentication to false', () => {
      const action = {
        type: actionTypes.RESET_AUTHENTICATION,
      };
      expect(userReducer(initialState, action)).toEqual({
        ...initialState,
        isAuthenticated: false,
      });
    });
  });
});
