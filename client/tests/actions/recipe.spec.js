import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';

import * as actionTypes from '../../actions/actionTypes';
import * as actions from '../../actions/recipe';
import recipesMockData from '../__mocks__/recipe';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Recipe', () => {
  describe('retrieve recipes action creator', () => {
    it('should create action for retrieve recipes request', () => {
      const expectedAction = {
        type: actionTypes.RETRIEVE_RECIPES_REQUEST,
      };
      expect(actions.retrieveRecipesRequest()).toEqual(expectedAction);
    });
    it('should create action for retrieve recipes success', () => {
      const expectedAction = {
        type: actionTypes.RETRIEVE_RECIPES_SUCCESS,
        payload: {
          recipes: recipesMockData.retrieveRecipesSuccess.recipes,
          recipesCount: recipesMockData.retrieveRecipesSuccess.recipesCount,
        }
      };
      expect(actions.retrieveRecipesSuccess(
        recipesMockData.retrieveRecipesSuccess.recipes,
        recipesMockData.retrieveRecipesSuccess.recipesCount,
      ))
        .toEqual(expectedAction);
    });
    it('should create action for retrieve recipes failure', () => {
      const expectedAction = {
        type: actionTypes.RETRIEVE_RECIPES_FAILURE,
        payload: recipesMockData.retrieveRecipesFailure,
      };
      expect(actions.retrieveRecipesFailure(
        recipesMockData.retrieveRecipesFailure)).toEqual(expectedAction);
    });
  });
  describe('retrieve popular recipes action creator', () => {
    it('should create action for popular recipes request', () => {
      const expectedAction = {
        type: actionTypes.POPULAR_RECIPES_REQUEST,
      };
      expect(actions.popularRecipesRequest()).toEqual(expectedAction);
    });
    it('should create action for popular recipes success', () => {
      const expectedAction = {
        type: actionTypes.POPULAR_RECIPES_SUCCESS,
        payload: recipesMockData.popularRecipesSuccess
      };
      expect(actions.popularRecipesSuccess(
        recipesMockData.popularRecipesSuccess)).toEqual(expectedAction);
    });
    it('should create action for popular recipes failure', () => {
      const expectedAction = {
        type: actionTypes.POPULAR_RECIPES_FAILURE,
        payload: recipesMockData.popularRecipesFailure,
      };
      expect(actions.popularRecipesFailure(
        recipesMockData.popularRecipesFailure)).toEqual(expectedAction);
    });
  });
  describe('fetch recipe request action creator', () => {
    it('should create action for fetch recipe request', () => {
      const expectedAction = {
        type: actionTypes.FETCH_RECIPE_REQUEST,
      };
      expect(actions.fetchRecipeRequest()).toEqual(expectedAction);
    });
    it('should create action for fetch recipe success', () => {
      const expectedAction = {
        type: actionTypes.FETCH_RECIPE_SUCCESS,
        payload: recipesMockData.fetchRecipeSuccess
      };
      expect(actions.fetchRecipeSuccess(recipesMockData.fetchRecipeSuccess))
        .toEqual(expectedAction);
    });
    it('should create action for fetch recipe failure', () => {
      const expectedAction = {
        type: actionTypes.FETCH_RECIPE_FAILURE,
        payload: recipesMockData.fetchRecipeFailure,
      };
      expect(actions.fetchRecipeFailure(recipesMockData.fetchRecipeFailure))
        .toEqual(expectedAction);
    });
  });
  describe('fetch user recipes request action creator', () => {
    it('should create action for fetch user recipes request', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_RECIPES_REQUEST,
      };
      expect(actions.fetchUserRecipesRequest()).toEqual(expectedAction);
    });
    it('should create action for fetch user recipes success', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_RECIPES_SUCCESS,
        payload: {
          recipes: recipesMockData.fetchUserRecipesSuccess.recipes,
          recipesCount: recipesMockData.fetchUserRecipesSuccess.recipesCount,
        }
      };
      expect(actions.fetchUserRecipesSuccess(
        recipesMockData.fetchUserRecipesSuccess.recipes,
        recipesMockData.fetchUserRecipesSuccess.recipesCount
      ))
        .toEqual(expectedAction);
    });
    it('should create action for fetch  user recipes failure', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_RECIPES_FAILURE,
        payload: recipesMockData.fetchUserRecipesFailure,
      };
      expect(actions.fetchUserRecipesFailure(
        recipesMockData.fetchUserRecipesFailure)).toEqual(expectedAction);
    });
  });
  describe('fetch user favorites request action creator', () => {
    it('should create action for fetch user favorites request', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_FAVORITES_REQUEST,
      };
      expect(actions.fetchUserFavoritesRequest()).toEqual(expectedAction);
    });
    it('should create action for fetch user recipes success', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_FAVORITES_SUCCESS,
        payload: {
          favorites: recipesMockData.fetchUserFavoritesSuccess.favorites,
          favoritesCount: recipesMockData.fetchUserFavoritesSuccess
            .favoritesCount,
        }
      };
      expect(actions.fetchUserFavoritesSuccess(
        recipesMockData.fetchUserFavoritesSuccess.favorites,
        recipesMockData.fetchUserFavoritesSuccess.favoritesCount,
      ))
        .toEqual(expectedAction);
    });
    it('should create action for fetch  user favorites failure', () => {
      const expectedAction = {
        type: actionTypes.FETCH_USER_FAVORITES_FAILURE,
        payload: recipesMockData.fetchUserFavoritesFailure,
      };
      expect(actions.fetchUserFavoritesFailure(
        recipesMockData.fetchUserRecipesFailure)).toEqual(expectedAction);
    });
  });
  describe('search recipes action creator', () => {
    it('should create action for search recipes request', () => {
      const expectedAction = {
        type: actionTypes.SEARCH_RECIPE_REQUEST,
      };
      expect(actions.searchRecipesRequest()).toEqual(expectedAction);
    });
    it('should create action for retrieve recipes success', () => {
      const expectedAction = {
        type: actionTypes.SEARCH_RECIPE_SUCCESS,
        payload: recipesMockData.searchRecipesSuccess,
      };
      expect(actions.searchRecipesSuccess(recipesMockData.searchRecipesSuccess))
        .toEqual(expectedAction);
    });
    it('should create action for retrieve recipes failure', () => {
      const expectedAction = {
        type: actionTypes.SEARCH_RECIPE_FAILURE,
        payload: recipesMockData.searchRecipesFailure,
      };
      expect(actions.searchRecipesFailure(recipesMockData.searchRecipesFailure))
        .toEqual(expectedAction);
    });
  });
  describe('retrieve recipes async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should retrieve recipes', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipesMockData.retrieveRecipesSuccessResponse,
        });
      });
      const expectedActions = [
        actions.retrieveRecipesRequest(),
        { type: actionTypes.RETRIEVED_ALL_RECIPES },
        actions.retrieveRecipesSuccess(
          recipesMockData.retrieveRecipesSuccessResponse.data.recipes,
          recipesMockData.retrieveRecipesSuccessResponse.data.recipesCount),
      ];
      const store = mockStore({});

      return store.dispatch(actions.retrieveRecipes())
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
          response: recipesMockData.retrieveRecipesFailureResponse,
        });
      });
      const expectedActions = [
        actions.retrieveRecipesRequest(),
        actions.retrieveRecipesFailure(
          recipesMockData.retrieveRecipesFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.retrieveRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('retrieve popular recipes async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should retrieve popular recipes', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipesMockData.popularRecipesSuccessResponse,
        });
      });
      const expectedActions = [
        actions.popularRecipesRequest(),
        actions.popularRecipesSuccess(
          recipesMockData.popularRecipesSuccessResponse.data.recipes)
      ];
      const store = mockStore({});

      return store.dispatch(actions.retrievePopularRecipes())
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
          response: recipesMockData.popularRecipesFailureResponse,
        });
      });
      const expectedActions = [
        actions.popularRecipesRequest(),
        actions.popularRecipesFailure(
          recipesMockData.popularRecipesFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.retrievePopularRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('fetch recipe async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should fetch a single recipe', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipesMockData.fetchRecipeSuccessResponse,
        });
      });
      const expectedActions = [
        actions.fetchRecipeRequest(),
        actions.fetchRecipeSuccess(
          recipesMockData.fetchRecipeSuccessResponse.data.recipe)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchRecipe())
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
          response: recipesMockData.fetchRecipeFailureResponse,
        });
      });
      const expectedActions = [
        actions.fetchRecipeRequest(),
        actions.fetchRecipeFailure(
          recipesMockData.fetchRecipeFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchRecipe())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('fetch user recipes async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should fetch user recipes', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipesMockData.userRecipesSuccessResponse,
        });
      });
      const expectedActions = [
        actions.fetchUserRecipesRequest(),
        actions.fetchUserRecipesSuccess(
          recipesMockData.userRecipesSuccessResponse.data.recipes,
          recipesMockData.userRecipesSuccessResponse.data.recipesCount)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchUserRecipes())
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
          response: recipesMockData.userRecipesFailureResponse,
        });
      });
      const expectedActions = [
        actions.fetchUserRecipesRequest(),
        actions.fetchUserRecipesFailure(
          recipesMockData.userRecipesFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchUserRecipes())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('fetch user favorite recipes async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should fetch user favorite recipes', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipesMockData.userFavoritesSuccessResponse,
        });
      });
      const expectedActions = [
        actions.fetchUserFavoritesRequest(),
        actions.fetchUserFavoritesSuccess(
          recipesMockData.userFavoritesSuccessResponse.data.favorites,
          recipesMockData.userFavoritesSuccessResponse.data.favoritesCount)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchUserFavorites())
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
          response: recipesMockData.userFavoritesFailureResponse,
        });
      });
      const expectedActions = [
        actions.fetchUserFavoritesRequest(),
        actions.fetchUserFavoritesFailure(
          recipesMockData.userFavoritesFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.fetchUserFavorites())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
  describe('search recipes async action', () => {
    beforeEach(() => moxios.install());
    afterEach(() => moxios.uninstall());

    it('should search for recipes', (done) => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: recipesMockData.searchRecipesSuccessResponse,
        });
      });
      const expectedActions = [
        actions.searchRecipesRequest(),
        actions.searchRecipesSuccess(
          recipesMockData.searchRecipesSuccessResponse.data.recipes)
      ];
      const store = mockStore({});

      return store.dispatch(actions.searchRecipe())
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
          response: recipesMockData.searchRecipesFailureResponse,
        });
      });
      const expectedActions = [
        actions.searchRecipesRequest(),
        actions.searchRecipesFailure(
          recipesMockData.searchRecipesFailureResponse)
      ];
      const store = mockStore({});

      return store.dispatch(actions.searchRecipe())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
          done();
        });
    });
  });
});
