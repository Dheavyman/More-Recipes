import recipesReducer, { initialState } from '../../reducers/recipes';
import * as actionTypes from '../../actions/actionTypes';
import recipesMockData from '../__mocks__/recipe';

describe('Recipes reducer', () => {
  it('should return the default initial state', () => {
    expect(recipesReducer(initialState, {})).toEqual(initialState);
  });
  describe('retrieve recipes', () => {
    it('should handle retrieve recipes request', () => {
      const action = {
        type: actionTypes.RETRIEVE_RECIPES_REQUEST,
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingRecipes: true,
      });
    });
    it('should handle retrieve recipes success', () => {
      const action = {
        type: actionTypes.RETRIEVE_RECIPES_SUCCESS,
        payload: {
          recipes: recipesMockData.retrieveRecipesSuccess.recipes,
          recipesCount: recipesMockData.retrieveRecipesSuccessResponse
            .recipesCount
        }
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingRecipes: false,
        recipes: [
          ...initialState.recipes,
          ...action.payload.recipes,
        ],
        recipesCount: action.payload.recipesCount,
        errorFetchingRecipes: {},
      });
    });
    it('should handle retrieve recipes failure', () => {
      const action = {
        type: actionTypes.RETRIEVE_RECIPES_FAILURE,
        payload: recipesMockData.retrieveRecipesFailure
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingRecipes: false,
        errorFetchingRecipes: action.payload,
      });
    });
    it('should handle retrieved all recipe', () => {
      const action = {
        type: actionTypes.RETRIEVED_ALL_RECIPES,
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        hasMore: false,
      });
    });
  });
  describe('retrieve popular recipes', () => {
    it('should handle popular recipes request', () => {
      const action = {
        type: actionTypes.POPULAR_RECIPES_REQUEST,
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingPopularRecipes: true,
      });
    });
    it('should handle popular recipes success', () => {
      const action = {
        type: actionTypes.POPULAR_RECIPES_SUCCESS,
        payload: recipesMockData.popularRecipesSuccess
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingPopularRecipes: false,
        popularRecipes: action.payload,
        errorFetchingPopularRecipes: {},
      });
    });
    it('should handle popular recipes failure', () => {
      const action = {
        type: actionTypes.POPULAR_RECIPES_FAILURE,
        payload: recipesMockData.popularRecipesFailure
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingPopularRecipes: false,
        errorFetchingPopularRecipes: action.payload,
      });
    });
  });
  describe('search recipes', () => {
    it('should handle search recipes request', () => {
      const action = {
        type: actionTypes.SEARCH_RECIPE_REQUEST,
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingRecipes: true,
      });
    });
    it('should handle search recipes success', () => {
      const action = {
        type: actionTypes.SEARCH_RECIPE_SUCCESS,
        payload: recipesMockData.searchRecipeSuccess
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingRecipes: false,
        searchPerformed: true,
        searchResult: action.payload,
        errorFetchingRecipes: {},
      });
    });
    it('should handle search recipes failure', () => {
      const action = {
        type: actionTypes.SEARCH_RECIPE_FAILURE,
        payload: recipesMockData.searchRecipeFailure
      };
      expect(recipesReducer(initialState, action)).toEqual({
        ...initialState,
        isFetchingRecipes: false,
        searchResult: [],
        errorFetchingRecipes: action.payload,
      });
    });
  });
});
