import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const router = express.Router(),
  authenticate = middlewares.authentication,
  favoriteController = controllers.favorite,
  recipeController = controllers.recipe,
  reviewController = controllers.review,
  userController = controllers.user,
  voteController = controllers.vote,
  userValidate = middlewares.userValidation,
  recipeValidate = middlewares.recipeValidation,
  reviewValidate = middlewares.reviewValidation;

// Register a user on the platform
router.post('/users/signup', userValidate.signupRequiredInputs,
  userValidate.validUserInputs, userValidate.usernameExist,
  userValidate.emailExist, userController.registerUser);

// Signin a user on the platform
router.post('/users/signin', userValidate.signinRequiredInputs,
  userController.signinUser);

router.route('/recipes')
  // Add a recipe to the catalog
  .post(authenticate.verifyToken, recipeValidate.recipeRequiredInputs,
    recipeController.addRecipe)

  // Retrieve all the recipes in the catalog
  .get(authenticate.verifyToken, recipeController.getAll,
    recipeController.getMostUpvotes);

router.route('/recipes/:recipeId')
  // Retrieve a single recipe from the catalog
  .get(authenticate.verifyToken, recipeValidate.recipeExist,
    recipeController.getOne)

  // Modifies a recipe
  .put(authenticate.verifyToken, recipeValidate.recipeRequiredInputs,
    recipeValidate.recipeExist, recipeValidate.userRecipe,
    recipeController.modifyRecipe)

  // Delete a recipe
  .delete(authenticate.verifyToken, recipeValidate.recipeExist,
    recipeValidate.userRecipe, recipeController.deleteRecipe);

// Add a review for a recipe
router.post('/recipes/:recipeId/reviews', authenticate.verifyToken,
  reviewValidate.reviewRequiredInputs, recipeValidate.recipeExist,
  reviewController.addReview);

// Delete a review for a recipe
router.delete('/recipes/:recipeId/reviews/:reviewId', authenticate.verifyToken,
  recipeValidate.recipeExist, reviewValidate.reviewExist,
  reviewValidate.userReview, reviewController.deleteReview);

router.route('/recipes/:recipeId/favorites')
  // Add a recipe to a user's favorite
  .post(authenticate.verifyToken, recipeValidate.recipeExist,
    favoriteController.addFavorite)
  // Delete a recipe from a user's favorite
  .delete(authenticate.verifyToken, recipeValidate.recipeExist,
    favoriteController.removeFavorite);

// Get all user favorite recipes
router.get('/users/:userId/recipes', authenticate.verifyToken,
  userValidate.userExist, userController.userFavorites);

// Upvote a recipe
router.put('/recipes/:recipeId/upvote', voteController.upvote);

// Downvote a recipe
router.put('/recipes/:recipeId/downvote', voteController.downvote);

export default router;
