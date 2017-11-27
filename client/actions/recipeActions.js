import axios from 'axios';

const retrieveRecipes = recipes => ({
  type: 'RETRIEVE_RECIPES_SUCCESS',
  payload: recipes,
});

const requestPopularRecipes = popularRecipes => ({
  type: 'RETRIEVE_POPULAR_RECIPES_SUCCESS',
  payload: popularRecipes,
});

const fetchRecipes = () => (dispatch) => {
  axios.get('http://127.0.0.1:3000/api/v1/recipes')
    .then((response) => {
      const recipes = response.data;
      dispatch(retrieveRecipes(recipes));
    })
    .catch(() => {
      // Error handler
    });
};

export { fetchRecipes, requestPopularRecipes };
