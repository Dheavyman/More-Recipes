import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';
import config from '../config';

const { SERVER_URL } = config;

// Action to retrieve all recipes
const retrieveRecipesRequest = () => ({
  type: actionTypes.RETRIEVE_RECIPES_REQUEST,
});

const retrieveRecipesSuccess = recipes => ({
  type: actionTypes.RETRIEVE_RECIPES_SUCCESS,
  payload: recipes,
});

const retrieveRecipesFailure = error => ({
  type: actionTypes.RETRIEVE_RECIPES_FAILURE,
  payload: error,
});

// Action to retrieve popular recipes
const popularRecipesRequest = () => ({
  type: actionTypes.POPULAR_RECIPES_REQUEST,
});

const popularRecipesSuccess = recipes => ({
  type: actionTypes.POPULAR_RECIPES_SUCCESS,
  payload: recipes,
});

const popularRecipesFailure = error => ({
  type: actionTypes.POPULAR_RECIPES_FAILURE,
  payload: error,
});

// Action to fetch a single recipe
const fetchRecipeRequest = () => ({
  type: actionTypes.FETCH_RECIPE_REQUEST,
});

const fetchRecipeSuccess = recipe => ({
  type: actionTypes.FETCH_RECIPE_SUCCESS,
  payload: recipe,
});

const fetchRecipeFailure = error => ({
  type: actionTypes.FETCH_RECIPE_FAILURE,
  payload: error,
});

// Action for fetching recipes added by user
const fetchUserRecipesRequest = () => ({
  type: actionTypes.FETCH_USER_RECIPES_REQUEST,
});

const fetchUserRecipesSuccess = recipes => ({
  type: actionTypes.FETCH_USER_RECIPES_SUCCESS,
  payload: recipes,
});

const fetchUserRecipesFailure = error => ({
  type: actionTypes.FETCH_USER_RECIPES_FAILURE,
  payload: error,
});

// Action to fetch user favorite recipes
const fetchUserFavoritesRequest = () => ({
  type: actionTypes.FETCH_USER_FAVORITES_REQUEST,
});

const fetchUserFavoritesSuccess = favorites => ({
  type: actionTypes.FETCH_USER_FAVORITES_SUCCESS,
  payload: favorites
});

const fetchUserFavoritesFailure = error => ({
  type: actionTypes.FETCH_USER_FAVORITES_FAILURE,
  payload: error,
});

const searchRecipeRequest = () => ({
  type: actionTypes.SEARCH_RECIPE_REQUEST,
});

const searchRecipeSuccess = recipe => ({
  type: actionTypes.SEARCH_RECIPE_SUCCESS,
  payload: recipe,
});

const searchRecipeFailure = error => ({
  type: actionTypes.SEARCH_RECIPE_FAILURE,
  payload: error,
});

const retrieveRecipes = () => (dispatch) => {
  dispatch(retrieveRecipesRequest());
  axios.get(`${SERVER_URL}/recipes`)
    .then((response) => {
      const { data } = response;
      const { data: { recipes } } = data;
      dispatch(retrieveRecipesSuccess(recipes));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(retrieveRecipesFailure(data));
    });
};

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

const fetchRecipe = recipeId => (dispatch) => {
  dispatch(fetchRecipeRequest());
  axios.get(`${SERVER_URL}/recipes/${recipeId}`, {
    headers: {
      'x-access-token': getToken(),
    } })
    .then((response) => {
      const { data } = response,
        { data: { recipe } } = data;
      dispatch(fetchRecipeSuccess(recipe));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchRecipeFailure(data));
    });
};

const fetchUserRecipes = userId => (dispatch) => {
  dispatch(fetchUserRecipesRequest());
  axios.get(`${SERVER_URL}/recipes/users/${userId}`,
    { headers: {
      'x-access-token': getToken(),
    } })
    .then((response) => {
      const { data } = response,
        { data: recipes } = data;
      dispatch(fetchUserRecipesSuccess(recipes));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchUserRecipesFailure(data));
    });
};

const fetchUserFavorites = userId => (dispatch) => {
  dispatch(fetchUserFavoritesRequest());
  axios.get(`${SERVER_URL}/users/${userId}/recipes`,
    { headers: {
      'x-access-token': getToken(),
    } })
    .then((response) => {
      const { data } = response,
        { data: { favorites } } = data;
      dispatch(fetchUserFavoritesSuccess(favorites));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchUserFavoritesFailure(data));
    });
};

const searchRecipe = (search, list) => (dispatch) => {
  dispatch(retrieveRecipesRequest());
  axios.get(`${SERVER_URL}/recipes?search=${search}&list=${list}`)
    .then((response) => {
      const { data } = response,
        { data: { recipe } } = data;
      dispatch(retrieveRecipesSuccess(recipe));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(retrieveRecipesFailure(data));
    });
};

export {
  retrieveRecipes, retrievePopularRecipes, fetchRecipe, fetchUserRecipes,
  fetchUserFavorites, searchRecipe
};
