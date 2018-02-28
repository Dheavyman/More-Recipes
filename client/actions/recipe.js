import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';

const { SERVER_URL } = config;

/**
 * Retrieve recipes request action creator
 *
 * @returns {object} Retrieve recipes request action
 */
const retrieveRecipesRequest = () => ({
  type: actionTypes.RETRIEVE_RECIPES_REQUEST,
});

/**
 * Retrieve recipes success action creator
 *
 * @param {array} recipes - Recipes returned from server
 * @param {number} recipesCount - The number of recipes in the database
 *
 * @returns {object} Retrieve recipes success action
 */
const retrieveRecipesSuccess = (recipes, recipesCount) => ({
  type: actionTypes.RETRIEVE_RECIPES_SUCCESS,
  payload: {
    recipes,
    recipesCount,
  },
});

/**
 * Retrieve recipes failure action creator
 *
 * @param {object} error - Error in retrieving recipes
 *
 * @returns {object} Retrieve recipes failure action
 */
const retrieveRecipesFailure = error => ({
  type: actionTypes.RETRIEVE_RECIPES_FAILURE,
  payload: error,
});

/**
 * Popular recipes request action creator
 *
 * @returns {object} Popular recipes request action
 */
const popularRecipesRequest = () => ({
  type: actionTypes.POPULAR_RECIPES_REQUEST,
});

/**
 * Popular recipes success action creator
 *
 * @param {object} recipes - Recipes returned from the server
 *
 * @returns {object} Popular recipes success action
 */
const popularRecipesSuccess = recipes => ({
  type: actionTypes.POPULAR_RECIPES_SUCCESS,
  payload: recipes,
});

/**
 * Popular recipes failure action creator
 *
 * @param {object} error - Error in retrieving recipes
 *
 * @returns {object} Popular recipes failure action
 */
const popularRecipesFailure = error => ({
  type: actionTypes.POPULAR_RECIPES_FAILURE,
  payload: error,
});

/**
 * Fetch recipe request action creator
 *
 * @returns {object} Fetch recipes request action
 */
const fetchRecipeRequest = () => ({
  type: actionTypes.FETCH_RECIPE_REQUEST,
});

/**
 * Fetch recipes success action creator
 *
 * @param {object} recipe - Recipe returned from the server
 *
 * @returns {object} Fetch recipe success action
 */
const fetchRecipeSuccess = recipe => ({
  type: actionTypes.FETCH_RECIPE_SUCCESS,
  payload: recipe,
});

/**
 * Fetch recipe failure action creator
 *
 * @param {object} error - Error in retrieving recipe
 *
 * @returns {object} Fetch recipe failure action
 */
const fetchRecipeFailure = error => ({
  type: actionTypes.FETCH_RECIPE_FAILURE,
  payload: error,
});

/**
 * Fetch user recipes request action creator
 *
 * @returns {object} Fetch user recipes request action
 */
const fetchUserRecipesRequest = () => ({
  type: actionTypes.FETCH_USER_RECIPES_REQUEST,
});

/**
 * Fetch user recipes success action creator
 *
 * @param {array} recipes - Recipes returned from the server
 *
 * @returns {object} Fetch user recipes success action
 */
const fetchUserRecipesSuccess = recipes => ({
  type: actionTypes.FETCH_USER_RECIPES_SUCCESS,
  payload: recipes,
});

/**
 * Fetch user recipes failure action creator
 *
 * @param {object} error - Error in retrieving recipes
 *
 * @returns {object} Fetch user recipes failure action
 */
const fetchUserRecipesFailure = error => ({
  type: actionTypes.FETCH_USER_RECIPES_FAILURE,
  payload: error,
});

/**
 * Fetch user favorites request action creator
 *
 * @returns {object} Fetch user favorites request action
 */
const fetchUserFavoritesRequest = () => ({
  type: actionTypes.FETCH_USER_FAVORITES_REQUEST,
});

/**
 * Fetch user favorites success
 *
 * @param {array} favorites - User favorite recipes returned from the server
 *
 * @returns {object} Fetch user favorites success action
 */
const fetchUserFavoritesSuccess = favorites => ({
  type: actionTypes.FETCH_USER_FAVORITES_SUCCESS,
  payload: favorites
});

/**
 * Fetch user favorites failure action creator
 *
 * @param {object} error - Error in retrieving recipes
 *
 * @returns {object} Fetch user favorites failure action
 */
const fetchUserFavoritesFailure = error => ({
  type: actionTypes.FETCH_USER_FAVORITES_FAILURE,
  payload: error,
});

/**
 * Search recipes request action creator
 *
 * @returns {object} Search recipes request action
 */
const searchRecipesRequest = () => ({
  type: actionTypes.SEARCH_RECIPE_REQUEST,
});

/**
 * Search recipes success action creator
 *
 * @param {array} recipes - Recipes returned from server
 *
 * @returns {object} Search recipes success action
 */
const searchRecipesSuccess = recipes => ({
  type: actionTypes.SEARCH_RECIPE_SUCCESS,
  payload: recipes,
});

/**
 * Search recipes failure action creator
 *
 * @param {any} error - Error in searching for recipes
 *
 * @returns {object} Search recipes failure action
 */
const searchRecipesFailure = error => ({
  type: actionTypes.SEARCH_RECIPE_FAILURE,
  payload: error,
});

/**
 * Retrieve recipes async action creator
 *
 * @param {number} [limit=8] - The number of recipes to retrieve
 * @param {number} [offset=0] - The number of recipes retrieved previously
 *
 * @returns {func} Dispatch necessary action
 */
const retrieveRecipes = (limit = 8, offset = 0) => (dispatch) => {
  dispatch(retrieveRecipesRequest());
  axios.get(`${SERVER_URL}/recipes?limit=${limit}&offset=${offset}`)
    .then((response) => {
      const { data } = response;
      const { data: { recipes, recipesCount } } = data;

      if (recipes.length < limit) {
        dispatch({
          type: actionTypes.RETRIEVED_ALL_RECIPES,
        });
      }
      dispatch(retrieveRecipesSuccess(recipes, recipesCount));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(retrieveRecipesFailure(data));
    });
};

/**
 * Retrieve popular recipes async action creator
 *
 * @returns {func} Dispatch necessary action
 */
const retrievePopularRecipes = () => (dispatch) => {
  dispatch(popularRecipesRequest());
  axios.get(`${SERVER_URL}/recipes/popular`)
    .then((response) => {
      const { data } = response;
      const { data: { recipes } } = data;
      dispatch(popularRecipesSuccess(recipes));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(popularRecipesFailure(data));
    });
};

/**
 * Fetch recipe async action creator
 *
 * @param {number} recipeId - The id of the recipe
 *
 * @returns {func} Dispatch necessary action
 */
const fetchRecipe = recipeId => (dispatch) => {
  dispatch(fetchRecipeRequest());
  axios.get(`${SERVER_URL}/recipes/${recipeId}`, {
    headers: {
      'x-access-token': getToken(),
    } })
    .then((response) => {
      const { data } = response;
      const { data: { recipe } } = data;
      dispatch(fetchRecipeSuccess(recipe));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchRecipeFailure(data));
    });
};

/**
 * Fetch user recipes async action creator
 *
 * @param {number} userId - The id of the user
 *
 * @returns {func} Dispatch necessary action
 */
const fetchUserRecipes = userId => (dispatch) => {
  dispatch(fetchUserRecipesRequest());
  axios.get(`${SERVER_URL}/recipes/users/${userId}`,
    { headers: {
      'x-access-token': getToken(),
    } })
    .then((response) => {
      const { data } = response;
      const { data: recipes } = data;
      dispatch(fetchUserRecipesSuccess(recipes));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchUserRecipesFailure(data));
    });
};

/**
 * Fetch user favorites async action creator
 *
 * @param {number} userId - The id of the user
 *
 * @returns {func} Dispatch necessary action
 */
const fetchUserFavorites = userId => (dispatch) => {
  dispatch(fetchUserFavoritesRequest());
  axios.get(`${SERVER_URL}/users/${userId}/recipes`,
    { headers: {
      'x-access-token': getToken(),
    } })
    .then((response) => {
      const { data } = response;
      const { data: { favorites } } = data;
      dispatch(fetchUserFavoritesSuccess(favorites));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchUserFavoritesFailure(data));
    });
};

/**
 * Search recipe async action creator
 *
 * @param {string} search - Search by
 * @param {string} list - Search terms
 *
 * @returns {func} Dispatch necessary action
 */
const searchRecipe = (search, list) => (dispatch) => {
  dispatch(searchRecipesRequest());
  axios.get(`${SERVER_URL}/recipes?search=${search}&list=${list}`)
    .then((response) => {
      const { data } = response;
      const { data: { recipes } } = data;
      dispatch(searchRecipesSuccess(recipes));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(searchRecipesFailure(data));
    });
};

export {
  retrieveRecipes, retrievePopularRecipes, fetchRecipe,
  fetchUserRecipes, fetchUserFavorites, searchRecipe
};
