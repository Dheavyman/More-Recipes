import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import recipes from './recipes';
import user from './user';

const rootReducer = combineReducers({
  recipes,
  user,
  form: formReducer,
});

export default rootReducer;
