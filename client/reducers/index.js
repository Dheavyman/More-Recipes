import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes from './recipes';
import user from './user';
import singleRecipe from './singleRecipe';
import review from './review';

const rootReducer = combineReducers({
  recipes,
  user,
  singleRecipe,
  review,
  form: formReducer,
});

export default rootReducer;
