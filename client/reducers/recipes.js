import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetchingRecipes: false,
  isFetchingPopularRecipes: false,
  searchPerformed: false,
  recipes: [],
  recipesCount: 0,
  hasMore: true,
  searchResult: [],
  popularRecipes: [],
  errorFetchingRecipes: {},
  errorFetchingPopularRecipes: {},
};

/**
 * Recipes reducer function
 *
 * @param {object} [state=initialState] - The state data
 * @param {object} action - The action that was triggered
 *
 * @returns {object} The new state of data
 */
const recipes = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.RETRIEVE_RECIPES_REQUEST:
      return {
        ...state,
        isFetchingRecipes: true,
      };
    case actionTypes.RETRIEVE_RECIPES_SUCCESS:
      return {
        ...state,
        isFetchingRecipes: false,
        recipes: [
          ...state.recipes,
          ...action.payload.recipes,
        ],
        recipesCount: action.payload.recipesCount,
        errorFetchingRecipes: {},
      };
    case actionTypes.RETRIEVE_RECIPES_FAILURE:
      return {
        ...state,
        isFetchingRecipes: false,
        errorFetchingRecipes: action.payload,
      };
    case actionTypes.RETRIEVED_ALL_RECIPES:
      return {
        ...state,
        hasMore: false,
      };
    case actionTypes.POPULAR_RECIPES_REQUEST:
      return {
        ...state,
        isFetchingPopularRecipes: true,
      };
    case actionTypes.POPULAR_RECIPES_SUCCESS:
      return {
        ...state,
        isFetchingPopularRecipes: false,
        popularRecipes: action.payload,
        errorFetchingPopularRecipes: {},
      };
    case actionTypes.POPULAR_RECIPES_FAILURE:
      return {
        ...state,
        isFetchingPopularRecipes: false,
        errorFetchingPopularRecipes: action.payload,
      };
    case actionTypes.SEARCH_RECIPE_REQUEST:
      return {
        ...state,
        isFetchingRecipes: true,
      };
    case actionTypes.SEARCH_RECIPE_SUCCESS:
      return {
        ...state,
        isFetchingRecipes: false,
        searchResult: action.payload,
        errorFetchingRecipes: {},
      };
    case actionTypes.SEARCH_RECIPE_FAILURE:
      return {
        ...state,
        isFetchingRecipes: false,
        searchResult: [],
        errorFetchingRecipes: action.payload,
      };
    default:
      return state;
  }
};

export default recipes;
