import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes from './recipes';
import user from './user';
import singleRecipe from './singleRecipe';
import userRecipes from './userRecipes';

const rootReducer = combineReducers({
  recipes,
  user,
  singleRecipe,
  userRecipes,
  form: formReducer,
});

export default rootReducer;
