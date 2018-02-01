import { retrieveRecipes, fetchRecipe, fetchUserRecipes,
  fetchUserFavorites } from './recipe';
import { signupUser, signinUser, logoutUser, fetchUserProfile,
  editUserProfile, editProfilePicture, uploadUserImage } from './userActions';
import postReview from './review';
import { addRecipe, editRecipe, deleteRecipe,
  uploadImage } from './recipeActions';
import { upvoteRecipe, downvoteRecipe } from './vote';
import setFavorite from './favorite';

export default {
  retrieveRecipes,
  fetchRecipe,
  fetchUserRecipes,
  fetchUserFavorites,
  signupUser,
  signinUser,
  logoutUser,
  fetchUserProfile,
  editUserProfile,
  editProfilePicture,
  uploadUserImage,
  postReview,
  addRecipe,
  editRecipe,
  deleteRecipe,
  uploadImage,
  upvoteRecipe,
  downvoteRecipe,
  setFavorite,
};
