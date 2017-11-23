const recipes = (state = {}, action) => {
  switch (action.type) {
    case 'RETRIEVE_RECIPES_SUCCESS':
      return {
        ...state,
        recipes: action.payload.data.recipes
      };
    default:
      return state;
  }
};

export default recipes;

