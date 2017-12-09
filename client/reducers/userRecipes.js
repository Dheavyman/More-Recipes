import * as actionTypes from '../actions/actionTypes';

const initialState = {
  isLoading: false,
  userRecipes: {},
  error: {}
};

const userRecipes = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_RECIPES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case actionTypes.FETCH_USER_RECIPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userRecipes: action.payload,
        error: {},
      };
    case actionTypes.FETCH_USER_RECIPES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userRecipes;
