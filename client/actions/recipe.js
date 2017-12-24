import axios from 'axios';

import * as actionTypes from './actionTypes';
import { getToken } from '../utils/authenticate';

// const URL = 'https://more-recipes-25.herokuapp.com/api/v1/';

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

const fetchUserFavoritesSuccess = user => ({
  type: actionTypes.FETCH_USER_FAVORITES_SUCCESS,
  payload: user
});

const fetchUserFavoritesFailure = error => ({
  type: actionTypes.FETCH_USER_FAVORITES_FAILURE,
  payload: error,
});

const retrieveRecipes = () => (dispatch) => {
  dispatch(retrieveRecipesRequest());
  axios.get('http://127.0.0.1:3000/api/v1/recipes')
    .then((response) => {
      const { data } = response;
      dispatch(retrieveRecipesSuccess(data));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(retrieveRecipesFailure(data));
    });
};

const fetchRecipe = recipeId => (dispatch) => {
  dispatch(fetchRecipeRequest());
  axios.get(`http://127.0.0.1:3000/api/v1/recipes/${recipeId}`)
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
  axios.get(`http://127.0.0.1:3000/api/v1/recipes/users/${userId}`,
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
  axios.get(`http://127.0.0.1:3000/api/v1/users/${userId}/recipes`,
    { headers: {
      'x-access-token': getToken(),
    } })
    .then((response) => {
      const { data } = response,
        { data: { user } } = data;
      dispatch(fetchUserFavoritesSuccess(user));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchUserFavoritesFailure(data));
    });
};

export { retrieveRecipes, fetchRecipe, fetchUserRecipes, fetchUserFavorites };
