import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  recipe: {},
  error: {},
};

const recipeActions = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_RECIPE_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case actionTypes.ADD_RECIPE_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipe: action.payload,
        error: {},
      };

    case actionTypes.ADD_RECIPE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default recipeActions;
