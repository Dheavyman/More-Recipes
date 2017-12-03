import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes from './recipes';
import user from './user';
import singleRecipe from './singleRecipe';

const rootReducer = combineReducers({
  recipes,
  user,
  singleRecipe,
  form: formReducer,
});

export default rootReducer;
