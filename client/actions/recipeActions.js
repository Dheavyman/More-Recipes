import axios from 'axios';

import * as actionTypes from './actionTypes';

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

const fetchRecipeRequest = () => ({
  type: actionTypes.FETCH_RECIPE_REQUEST,
});

const fetchRecipeSuccess = recipe => ({
  type: actionTypes.FETCH_RECIPE_REQUEST,
  payload: recipe,
});

const fetchRecipeFailure = error => ({
  type: actionTypes.FETCH_RECIPE_REQUEST,
  payload: error,
});

const retrieveRecipes = () => (dispatch) => {
  dispatch(retrieveRecipesRequest());
  axios.get('http://127.0.0.1:3000/api/v1/recipes')
    .then((response) => {
      const recipes = response.data;
      dispatch(retrieveRecipesSuccess(recipes));
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
      const recipe = response.data;
      dispatch(fetchRecipeSuccess(recipe));
    })
    .catch((error) => {
      const { response: { data } } = error;
      dispatch(fetchRecipeFailure(data));
    });
};

export { retrieveRecipes, fetchRecipe };
