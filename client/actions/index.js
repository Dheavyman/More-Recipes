import { retrieveRecipes, fetchRecipe, fetchUserRecipes,
  fetchUserFavorites } from './recipe';
import { signupUser, signinUser, logoutUser } from './userActions';
import postReview from './review';
import { addRecipe, editRecipe, deleteRecipe,
  uploadImage } from './recipeActions';

export default {
  retrieveRecipes,
  fetchRecipe,
  fetchUserRecipes,
  fetchUserFavorites,
  signupUser,
  signinUser,
  logoutUser,
  postReview,
  addRecipe,
  editRecipe,
  deleteRecipe,
  uploadImage,
};
