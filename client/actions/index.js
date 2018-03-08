import { retrieveRecipes, retrievePopularRecipes, fetchRecipe,
  fetchUserRecipes, fetchUserFavorites, searchRecipe } from './recipe';
import { signupUser, signinUser, logoutUser, fetchUserProfile,
  editUserProfile, uploadUserImage } from './userActions';
import { postReview, fetchReviews, clearReviews, deleteReview } from './review';
import { addRecipe, editRecipe, deleteRecipe,
  uploadImage } from './recipeActions';
import { upvoteRecipe, downvoteRecipe } from './vote';
import setFavorite from './favorite';

export default {
  retrieveRecipes,
  retrievePopularRecipes,
  fetchRecipe,
  fetchUserRecipes,
  fetchUserFavorites,
  signupUser,
  signinUser,
  logoutUser,
  fetchUserProfile,
  editUserProfile,
  uploadUserImage,
  postReview,
  fetchReviews,
  clearReviews,
  deleteReview,
  addRecipe,
  editRecipe,
  deleteRecipe,
  uploadImage,
  upvoteRecipe,
  downvoteRecipe,
  setFavorite,
  searchRecipe,
};
