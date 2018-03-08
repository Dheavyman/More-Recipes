import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/vote';
import recipeMockData from '../__mocks__/recipe';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Vote', () => {
  describe('upvote recipe action creator', () => {
    it('should create an action for upvote recipe request', () => {
      const expectedAction = {
        type: actionTypes.UPVOTE_RECIPE_REQUEST,
      };
      expect(actions.upvoteRecipeRequest()).toEqual(expectedAction);
    });
    it('should create an action for upvote recipe success', () => {
      const expectedAction = {
        type: actionTypes.UPVOTE_RECIPE_SUCCESS,
        payload: recipeMockData.voteSuccessResponse,
      };
      expect(actions.upvoteRecipeSuccess(recipeMockData.voteSuccessResponse))
        .toEqual(expectedAction);
    });
    it('should create an action for upvote recipe failure', () => {
      const expectedAction = {
        type: actionTypes.UPVOTE_RECIPE_FAILURE,
        payload: recipeMockData.voteFailureResponse,
      };
      expect(actions.upvoteRecipeFailure(recipeMockData.voteFailureResponse))
        .toEqual(expectedAction);
    });
  });
  describe('downvote recipe action creator', () => {
    it('should create an action for downvote recipe request', () => {
      const expectedAction = {
        type: actionTypes.DOWNVOTE_RECIPE_REQUEST,
      };
      expect(actions.downvoteRecipeRequest()).toEqual(expectedAction);
    });
    it('should create an action for downvote recipe success', () => {
      const expectedAction = {
        type: actionTypes.DOWNVOTE_RECIPE_SUCCESS,
        payload: recipeMockData.voteSuccessResponse,
      };
      expect(actions.downvoteRecipeSuccess(recipeMockData.voteSuccessResponse))
        .toEqual(expectedAction);
    });
    it('should create an action for downvote recipe failure', () => {
      const expectedAction = {
        type: actionTypes.DOWNVOTE_RECIPE_FAILURE,
        payload: recipeMockData.voteFailureResponse,
      };
      expect(actions.downvoteRecipeFailure(recipeMockData.voteFailureResponse))
        .toEqual(expectedAction);
    });
  });
  describe('upvote recipe async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should upvote a recipe', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeMockData.voteSuccessResponse,
        });
      });
      const expectedActions = [
        actions.upvoteRecipeRequest(),
        actions.upvoteRecipeSuccess(
          recipeMockData.voteSuccessResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.upvoteRecipe(recipeMockData.recipeId))
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
          response: recipeMockData.voteFailureResponse,
        });
      });
      const expectedActions = [
        actions.upvoteRecipeRequest(),
        actions.upvoteRecipeFailure(
          recipeMockData.voteFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.upvoteRecipe(recipeMockData.recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('downvote recipe async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should downvote a recipe', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeMockData.voteSuccessResponse,
        });
      });
      const expectedActions = [
        actions.downvoteRecipeRequest(),
        actions.downvoteRecipeSuccess(
          recipeMockData.voteSuccessResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.downvoteRecipe(recipeMockData.recipeId))
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
          response: recipeMockData.voteFailureResponse,
        });
      });
      const expectedActions = [
        actions.downvoteRecipeRequest(),
        actions.downvoteRecipeFailure(
          recipeMockData.voteFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.downvoteRecipe(recipeMockData.recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
