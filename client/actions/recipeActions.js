import axios from 'axios';

import * as actionTypes from './actionTypes';

const addRecipeRequest = () => ({
  type: actionTypes.ADD_RECIPE_REQUEST,
});

const addRecipeSuccess = values => ({
  type: actionTypes.ADD_RECIPE_SUCCESS,
  payload: values,
});

const addRecipeFailure = error => ({
  type: actionTypes.ADD_RECIPE_FAILURE,
  payload: error,
});

const addRecipe = values => (dispatch) => {
  const token = {
    'x-access-token': localStorage.getItem('token'),
  };

  dispatch(addRecipeRequest());
  axios.post('http://127.0.0.1:3000/api/v1/recipes', values, { headers: token })
    .then((response) => {
      const { data } = response;
      console.log(data);
      dispatch(addRecipeSuccess(data));
    })
    .catch((error) => {
      const { response: { data } } = error;
      console.log(data);
      dispatch(addRecipeFailure(error));
    });
};

export default addRecipe;
