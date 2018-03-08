import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/favorite';
import recipeMockData from '../__mocks__/recipe';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Favorite', () => {
  describe('set favorite action creator', () => {
    it('should create an action for set favorite request', () => {
      const expectedAction = {
        type: actionTypes.SET_FAVORITE_REQUEST,
      };
      expect(actions.setFavoriteRequest()).toEqual(expectedAction);
    });
    it('should create an action for set favorite success', () => {
      const expectedAction = {
        type: actionTypes.SET_FAVORITE_SUCCESS,
        payload: recipeMockData.setFavoriteSuccessResponse,
      };
      expect(actions.setFavoriteSuccess(
        recipeMockData.setFavoriteSuccessResponse)).toEqual(expectedAction);
    });
    it('should create an action for add recipe failure', () => {
      const expectedAction = {
        type: actionTypes.SET_FAVORITE_FAILURE,
        payload: recipeMockData.setFavoriteFailureResponse,
      };
      expect(actions.setFavoriteFailure(
        recipeMockData.setFavoriteFailureResponse)).toEqual(expectedAction);
    });
  });
  describe('set favorite async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should set a recipe as favorite', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipeMockData.setFavoriteSuccessResponse,
        });
      });
      const expectedActions = [
        actions.setFavoriteRequest(),
        actions.setFavoriteSuccess(
          recipeMockData.setFavoriteSuccessResponse),
        {
          type: actionTypes.UPDATE_USER_FAVORITE_RECIPES,
          payload: recipeMockData.recipeId,
        }
      ];
      const store = mockStore({});

      return store.dispatch(actions.setFavorite(recipeMockData.recipeId))
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
          response: recipeMockData.setFavoriteFailureResponse,
        });
      });
      const expectedActions = [
        actions.setFavoriteRequest(),
        actions.setFavoriteFailure(
          recipeMockData.setFavoriteFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.setFavorite(recipeMockData.recipeId))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
