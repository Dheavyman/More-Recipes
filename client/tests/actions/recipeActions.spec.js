import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/recipeActions';
import recipeMockData from '../__mocks__/recipe';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Recipe', () => {
  describe('add recipe action creator', () => {
    it('should create an action for add recipe request', () => {
      const expectedAction = {
        type: actionTypes.ADD_RECIPE_REQUEST,
      };
      expect(actions.addRecipeRequest()).toEqual(expectedAction);
    });
    it('should create an action for add recipe success', () => {
      const expectedAction = {
        type: actionTypes.ADD_RECIPE_SUCCESS,
        payload: recipeMockData.addRecipeSuccess,
      };
      expect(actions.addRecipeSuccess(recipeMockData.addRecipeSuccess))
        .toEqual(expectedAction);
    });
    it('should create an action for add recipe failure', () => {
      const expectedAction = {
        type: actionTypes.ADD_RECIPE_FAILURE,
        payload: recipeMockData.addRecipeFailure,
      };
      expect(actions.addRecipeFailure(recipeMockData.addRecipeFailure))
        .toEqual(expectedAction);
    });
  });
  describe('edit recipe action creator', () => {
    it('should create an action for edit recipe request', () => {
      const expectedAction = {
        type: actionTypes.EDIT_RECIPE_REQUEST,
      };
      expect(actions.editRecipeRequest()).toEqual(expectedAction);
    });
    it('should create an action for edit recipe success', () => {
      const expectedAction = {
        type: actionTypes.EDIT_RECIPE_SUCCESS,
        id: recipeMockData.recipeId,
        payload: recipeMockData.editRecipeSuccess,
      };
      expect(actions.editRecipeSuccess(
        recipeMockData.recipeId, recipeMockData.editRecipeSuccess))
        .toEqual(expectedAction);
    });
    it('should create an action for edit recipe failure', () => {
      const expectedAction = {
        type: actionTypes.EDIT_RECIPE_FAILURE,
        payload: recipeMockData.editRecipeFailure,
      };
      expect(actions.editRecipeFailure(recipeMockData.editRecipeFailure))
        .toEqual(expectedAction);
    });
  });
  describe('delete recipe action creator', () => {
    it('should create an action for delete recipe request', () => {
      const expectedAction = {
        type: actionTypes.DELETE_RECIPE_REQUEST,
      };
      expect(actions.deleteRecipeRequest()).toEqual(expectedAction);
    });
    it('should create an action for delete recipe success', () => {
      const expectedAction = {
        type: actionTypes.DELETE_RECIPE_SUCCESS,
        payload: recipeMockData.recipeId,
      };
      expect(actions.deleteRecipeSuccess(recipeMockData.recipeId))
        .toEqual(expectedAction);
    });
    it('should create an action for delete recipe failure', () => {
      const expectedAction = {
        type: actionTypes.DELETE_RECIPE_FAILURE,
        payload: recipeMockData.deleteRecipeFailure,
      };
      expect(actions.deleteRecipeFailure(recipeMockData.deleteRecipeFailure))
        .toEqual(expectedAction);
    });
  });
  describe('upload recipe image action creator', () => {
    it('should create an action for upload recipe image request', () => {
      const expectedAction = {
        type: actionTypes.UPLOAD_IMAGE_REQUEST,
      };
      expect(actions.uploadImageRequest()).toEqual(expectedAction);
    });
    it('should create an action for upload recipe image success', () => {
      const expectedAction = {
        type: actionTypes.UPLOAD_IMAGE_SUCCESS,
        payload: recipeMockData.recipeImageUrl,
      };
      expect(actions.uploadImageSuccess(recipeMockData.recipeImageUrl))
        .toEqual(expectedAction);
    });
    it('should create an action for upload recipe image failure', () => {
      const expectedAction = {
        type: actionTypes.UPLOAD_IMAGE_FAILURE,
        payload: recipeMockData.uploadImageFailure,
      };
      expect(actions.uploadImageFailure(recipeMockData.uploadImageFailure))
        .toEqual(expectedAction);
    });
  });
  describe('add recipe async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should add recipe', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeMockData.addRecipeSuccessResponse,
        });
      });
      const expectedActions = [
        actions.addRecipeRequest(),
        actions.addRecipeSuccess(
          recipeMockData.addRecipeSuccessResponse.data.recipe),
        { type: actionTypes.UPDATE_USER_RECIPES_COUNT, payload: 1 },
      ];
      const store = mockStore({});

      return store.dispatch(actions.addRecipe(recipeMockData.recipeValue))
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
          response: recipeMockData.addRecipeFailureResponse,
        });
      });
      const expectedActions = [
        actions.addRecipeRequest(),
        actions.addRecipeFailure(
          recipeMockData.addRecipeFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.addRecipe(recipeMockData.recipeValue))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('edit recipe async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should edit recipe', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeMockData.editRecipeSuccessResponse,
        });
      });
      const expectedActions = [
        actions.editRecipeRequest(),
        actions.editRecipeSuccess(
          recipeMockData.recipeId,
          recipeMockData.editRecipeSuccessResponse.data.recipe),
      ];
      const store = mockStore({});

      return store.dispatch(actions.editRecipe(
        recipeMockData.recipeId, recipeMockData.recipeValue))
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
          response: recipeMockData.editRecipeFailureResponse,
        });
      });
      const expectedActions = [
        actions.editRecipeRequest(),
        actions.editRecipeFailure(
          recipeMockData.editRecipeFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.editRecipe())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('delete recipe async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should delete recipe', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeMockData.deleteRecipeSuccessResponse,
        });
      });
      const expectedActions = [
        actions.deleteRecipeRequest(),
        actions.deleteRecipeSuccess(recipeMockData.recipeId),
        { type: actionTypes.UPDATE_USER_RECIPES_COUNT, payload: -1, },
        { type: actionTypes.UPDATE_USER_FAVORITE_RECIPES,
          payload: recipeMockData.recipeId }
      ];
      const store = mockStore({});

      return store.dispatch(actions.deleteRecipe(recipeMockData.recipeId))
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
          response: recipeMockData.deleteRecipeFailureResponse,
        });
      });
      const expectedActions = [
        actions.deleteRecipeRequest(),
        actions.deleteRecipeFailure(
          recipeMockData.deleteRecipeFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.deleteRecipe())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('upload recipe image async actions', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should upload recipe image to cloud', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeMockData.uploadImageSuccessResponse,
        });
      });
      const expectedActions = [
        actions.uploadImageRequest(),
        actions.uploadImageSuccess(
          recipeMockData.uploadImageSuccessResponse.secure_url)
      ];
      const store = mockStore({});

      return store.dispatch(actions.uploadImage(recipeMockData.recipeImageData))
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
          response: recipeMockData.uploadImageFailureResponse,
        });
      });
      const expectedActions = [
        actions.uploadImageRequest(),
        actions.uploadImageFailure(
          recipeMockData.uploadImageFailureResponse.error)
      ];
      const store = mockStore({});

      return store.dispatch(actions.uploadImage(recipeMockData.recipeImageData))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
