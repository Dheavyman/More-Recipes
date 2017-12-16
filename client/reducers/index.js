import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes from './recipes';
import user from './user';
import singleRecipe from './singleRecipe';
import review from './review';
import userRecipes from './userRecipes';

const rootReducer = combineReducers({
  recipes,
  user,
  singleRecipe,
  review,
  userRecipes,
  form: formReducer,
});

export default rootReducer;
