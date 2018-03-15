import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/userActions';
import userMockData from '../__mocks__/user';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('User', () => {
  describe('signup actions creators', () => {
    it('should create an action for user signup request', () => {
      const expectedAction = {
        type: actionTypes.SIGNUP_REQUEST,
      };
      expect(actions.userSignupRequest()).toEqual(expectedAction);
    });
    it('should create an action for user signup success', () => {
      const expectedAction = {
        type: actionTypes.SIGNUP_SUCCESS,
        payload: userMockData.userSignupSuccess,
      };
      expect(actions.userSignupSuccess(userMockData.userSignupSuccess))
        .toEqual(expectedAction);
    });
    it('should create an action for user signup failure', () => {
      const expectedAction = {
        type: actionTypes.SIGNUP_FAILURE,
        payload: userMockData.userSignupFailure,
      };
      expect(actions.userSignupFailure(userMockData.userSignupFailure))
        .toEqual(expectedAction);
    });
  });
  describe('signin action creators', () => {
    it('should create an action for user signin request', () => {
      const expectedAction = {
        type: actionTypes.SIGNIN_REQUEST,
      };
      expect(actions.userSigninRequest()).toEqual(expectedAction);
    });
    it('should create an action for user signin success', () => {
      const expectedAction = {
        type: actionTypes.SIGNIN_SUCCESS,
        payload: userMockData.userSigninSuccess,
      };
      expect(actions.userSigninSuccess(userMockData.userSigninSuccess))
        .toEqual(expectedAction);
    });
    it('should create an action for user signin failure', () => {
      const expectedAction = {
        type: actionTypes.SIGNIN_FAILURE,
        payload: userMockData.userSigninFailure,
      };
      expect(actions.userSigninFailure(userMockData.userSigninFailure))
        .toEqual(expectedAction);
    });
  });
  describe('logout action creators', () => {
    it('should create an action for user logout request', () => {
      const expectedAction = {
        type: actionTypes.LOGOUT_REQUEST,
      };
      expect(actions.userLogoutRequest()).toEqual(expectedAction);
    });
    it('should create an action for user logout success', () => {
      const expectedAction = {
        type: actionTypes.LOGOUT_SUCCESS,
      };
      expect(actions.userLogoutSuccess()).toEqual(expectedAction);
    });
  });
  describe('fetch profile details action creators', () => {
    it('should create an action for fetch user profile request', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_PROFILE_REQUEST,
      };
      expect(actions.fetchUserProfileRequest()).toEqual(expectedAction);
    });
    it('should create an action for fetch user profile success', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_PROFILE_SUCCESS,
        payload: userMockData.userProfileSuccess,
      };
      expect(actions.fetchUserProfileSuccess(userMockData.userProfileSuccess))
        .toEqual(expectedAction);
    });
    it('should create an action for fetch user profile failure', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_PROFILE_FAILURE,
        payload: userMockData.userProfileFailure,
      };
      expect(actions.fetchUserProfileFailure(userMockData.userProfileFailure))
        .toEqual(expectedAction);
    });
  });
  describe('edit profile details action creators', () => {
    it('should create an action for edit user profile request', () => {
      const expectedAction = {
        type: actionTypes.EDIT_USER_PROFILE_REQUEST,
      };
      expect(actions.editUserProfileRequest()).toEqual(expectedAction);
    });
    it('should create an action for edit user profile success', () => {
      const expectedAction = {
        type: actionTypes.EDIT_USER_PROFILE_SUCCESS,
        payload: userMockData.editProfileSuccess,
      };
      expect(actions.editUserProfileSuccess(userMockData.editProfileSuccess))
        .toEqual(expectedAction);
    });
    it('should create an action for edit user profile failure', () => {
      const expectedAction = {
        type: actionTypes.EDIT_USER_PROFILE_FAILURE,
        payload: userMockData.editProfileFailure,
      };
      expect(actions.editUserProfileFailure(userMockData.editProfileFailure))
        .toEqual(expectedAction);
    });
  });
  describe('upload user image acton creators', () => {
    it('should create an action for upload user image request', () => {
      const expectedAction = {
        type: actionTypes.UPLOAD_USER_IMAGE_REQUEST,
      };
      expect(actions.uploadUserImageRequest()).toEqual(expectedAction);
    });
    it('should create an action for upload user image success', () => {
      const expectedAction = {
        type: actionTypes.UPLOAD_USER_IMAGE_SUCCESS,
        payload: userMockData.uploadImageSuccess,
      };
      expect(actions.uploadUserImageSuccess(userMockData.uploadImageSuccess))
        .toEqual(expectedAction);
    });
    it('should create an action for upload user image failure', () => {
      const expectedAction = {
        type: actionTypes.UPLOAD_USER_IMAGE_FAILURE,
        payload: userMockData.uploadImageFailure,
      };
      expect(actions.uploadUserImageFailure(userMockData.uploadImageFailure))
        .toEqual(expectedAction);
    });
  });
  describe('signup async actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should signup a user with valid data', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: userMockData.signupSuccessResponse,
        });
      });
      const expectedActions = [
        actions.userSignupRequest(),
        actions.userSignupSuccess(userMockData.signupSuccessResponse.data.user)
      ];
      const store = mockStore({});

      return store.dispatch(actions.signupUser(userMockData.signupData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should return an error for unsuccessful signup', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 409,
          response: userMockData.signupFailureResponse,
        });
      });
      const expectedActions = [
        actions.userSignupRequest(),
        actions.userSignupFailure(userMockData.signupFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.signupUser(userMockData.invalidSignupData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('signin async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should sign in a user with valid credentials', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 201,
          response: userMockData.signinSuccessResponse,
        });
      });
      const expectedActions = [
        actions.userSigninRequest(),
        actions.userSigninSuccess(userMockData.signinSuccessResponse.data.user)
      ];
      const store = mockStore({});

      return store.dispatch(actions.signinUser(userMockData.signinData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should return error for a user with invalid credentials', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: userMockData.signinFailureResponse,
        });
      });
      const expectedActions = [
        actions.userSigninRequest(),
        actions.userSigninFailure(userMockData.signinFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.signinUser(userMockData.invalidSigninData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('logout async action', () => {
    it('should log out a user', () => {
      const expectedActions = [
        actions.userLogoutRequest(),
        actions.userLogoutSuccess(),
      ];
      const store = mockStore({});

      return store.dispatch(actions.logoutUser())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  });
  describe('fetch user profile async actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should fetch user profile', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: userMockData.fetchProfileSuccessResponse,
        });
      });
      const expectedActions = [
        actions.fetchUserProfileRequest(),
        actions.fetchUserProfileSuccess(
          userMockData.fetchProfileSuccessResponse.data.user)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchUserProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should return an error for unsuccessful request', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 401,
          response: userMockData.fetchProfileFailureResponse,
        });
      });
      const expectedActions = [
        actions.fetchUserProfileRequest(),
        actions.fetchUserProfileFailure(
          userMockData.fetchProfileFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchUserProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('edit user profile async actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should fetch user profile', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: userMockData.editProfileSuccessResponse,
        });
      });
      const expectedActions = [
        actions.editUserProfileRequest(),
        actions.editUserProfileSuccess(
          userMockData.editProfileSuccessResponse.data.user)
      ];
      const store = mockStore({});

      return store.dispatch(actions.editUserProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should return an error for unsuccessful request', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: userMockData.editProfileFailureResponse,
        });
      });
      const expectedActions = [
        actions.editUserProfileRequest(),
        actions.editUserProfileFailure(
          userMockData.editProfileFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.editUserProfile())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('upload user image async actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should upload user image to cloud', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: userMockData.uploadImageSuccessResponse,
        });
      });
      const expectedActions = [
        actions.uploadUserImageRequest(),
        actions.uploadUserImageSuccess(
          userMockData.uploadImageSuccessResponse.secure_url)
      ];
      const store = mockStore({});

      return store.dispatch(actions.uploadUserImage(userMockData.userImageFile))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
    it('should return an error for unsuccessful request', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 400,
          response: userMockData.uploadImageFailureResponse,
        });
      });
      const expectedActions = [
        actions.uploadUserImageRequest(),
        actions.uploadUserImageFailure(
          userMockData.uploadImageFailureResponse.error)
      ];
      const store = mockStore({});

      return store.dispatch(actions.uploadUserImage())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('reset authentication action', () => {
    it('should dispatch action to reset user authentication status', () => {
      const expectedAction = [{
        type: actionTypes.RESET_AUTHENTICATION,
      }];
      const store = mockStore({});
      store.dispatch(actions.resetAuthentication());
      expect(store.getActions()).toEqual(expectedAction);
    });
  });
});
