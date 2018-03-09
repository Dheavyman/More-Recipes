import * as actionTypes from '../actions/actionTypes';

export const initialState = {
  isFectchingUserRecipes: false,
  isFetchingUserFavorites: false,
  isLoading: false,
  imageUploading: false,
  imageUploaded: false,
  imageUrl: null,
  userAddedRecipes: [],
  userAddedRecipesCount: 0,
  userFavorites: [],
  userFavoritesCount: 0,
  errorFetchingUserRecipes: {},
  errorFetchingUserFavorites: {},
  error: {}
};

/**
 * User recipes reducer
 *
 * @param {object} [state=initialState] - The state data
 * @param {object} action - Action dispatched
 *
 * @returns {object} The new state of data
 */
const userRecipes = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_RECIPES_REQUEST:
      return {
        ...state,
        isFectchingUserRecipes: true,
        userAddedRecipes: [],
        userAddedRecipesCount: 0,
      };
    case actionTypes.FETCH_USER_RECIPES_SUCCESS:
      return {
        ...state,
        isFectchingUserRecipes: false,
        userAddedRecipes: action.payload.recipes,
        userAddedRecipesCount: action.payload.recipesCount,
        errorFetchingUserRecipes: {},
      };
    case actionTypes.FETCH_USER_RECIPES_FAILURE:
      return {
        ...state,
        isFectchingUserRecipes: false,
        errorFetchingUserRecipes: action.payload,
      };
    case actionTypes.FETCH_USER_FAVORITES_REQUEST:
      return {
        ...state,
        isFetchingUserFavorites: true,
        userFavorites: [],
        userFavoritesCount: 0,
      };
    case actionTypes.FETCH_USER_FAVORITES_SUCCESS:
      return {
        ...state,
        isFetchingUserFavorites: false,
        userFavorites: action.payload.favorites,
        userFavoritesCount: action.payload.favoritesCount,
        errorFetchingUserFavorites: {},
      };
    case actionTypes.FETCH_USER_FAVORITES_FAILURE:
      return {
        ...state,
        isFetchingUserFavorites: false,
        errorFetchingUserFavorites: action.payload,
      };
    case actionTypes.UPDATE_USER_FAVORITE_RECIPES: {
      let userFavorites = state.userFavorites.slice();
      userFavorites = userFavorites.filter(recipe =>
        recipe.Recipe.id !== action.payload);
      return {
        ...state,
        userFavorites,
      };
    }
    case actionTypes.ADD_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        imageUploaded: false,
        userAddedRecipes: [
          ...state.userAddedRecipes,
          action.payload,
        ],
        error: {},
      };
    case actionTypes.ADD_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.UPDATE_USER_RECIPES_COUNT:
      return {
        ...state,
        userAddedRecipesCount: state.userAddedRecipesCount + 1,
      };
    case actionTypes.EDIT_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.EDIT_RECIPE_SUCCESS: {
      const userAddedRecipes = state.userAddedRecipes.map((recipe) => {
        if (recipe.id !== action.id) {
          return recipe;
        }
        return {
          ...recipe,
          ...action.payload,
        };
      });
      return {
        ...state,
        isLoading: false,
        imageUploaded: false,
        userAddedRecipes,
        error: {},
      };
    }
    case actionTypes.EDIT_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.DELETE_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.DELETE_RECIPE_SUCCESS: {
      let userAddedRecipes = state.userAddedRecipes.slice();
      userAddedRecipes = userAddedRecipes.filter(recipe =>
        recipe.id !== action.id);
      return {
        ...state,
        isLoading: false,
        userAddedRecipes,
        error: {},
      };
    }
    case actionTypes.DELETE_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case actionTypes.UPLOAD_IMAGE_REQUEST:
      return {
        ...state,
        imageUploading: true,
        imageUploaded: false,
      };
    case actionTypes.UPLOAD_IMAGE_SUCCESS:
      return {
        ...state,
        imageUploading: false,
        imageUploaded: true,
        imageUrl: action.payload,
        error: {},
      };
    case actionTypes.UPLOAD_IMAGE_FAILURE:
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

export default userRecipes;
