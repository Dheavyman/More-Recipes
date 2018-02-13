import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isFetchingRecipes: false,
  isFetchingPopularRecipes: false,
  recipes: [],
  popularRecipes: [],
  errorFetchingRecipes: {},
  errorFetchingPopularRecipes: {},
};

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
        recipes: action.payload,
        errorFetchingRecipes: {},
      };
    case actionTypes.RETRIEVE_RECIPES_FAILURE:
      return {
        ...state,
        isFetchingRecipes: false,
        errorFetchingRecipes: action.payload,
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
    default:
      return state;
  }
};

export default recipes;

