import express from 'express';
import controllers from '../controllers';
import middlewares from '../middlewares';

const router = express.Router(),
  recipeController = controllers.recipe,
  reviewController = controllers.review,
  userController = controllers.user,
  voteController = controllers.vote,
  validate = middlewares.validation;

// Register a user on the platform
router.post('/users/signup', userController.registerUser);

router.route('/recipes')
  // Add a recipe to the catalog
  .post(validate.recipeRequiredInputs, recipeController.addRecipe)

  // Retrieve all the recipes in the catalog
  .get(recipeController.getAll, recipeController.getMostUpvotes);

router.route('/recipes/:recipeId')
  // Retrieve a single recipe from the catalog
  .get(recipeController.getOne)

  // Modifies a recipe in the recipe catalog
  .put(validate.recipeRequiredInputs, recipeController.modifyRecipe)

  // Delete a recipe in the recipe catalog
  .delete(recipeController.deleteRecipe);

// Add a review for a recipe
router.post('/recipes/:recipeId/reviews', validate.reviewRequiredInputs,
  reviewController.addReview);

// Delete a review for a recipe
router.delete('/recipes/:recipeId/reviews/:reviewId',
  reviewController.deleteReview);

// Upvote a recipe
router.put('/recipes/:recipeId/upvote', voteController.upvote);

// Downvote a recipe
router.put('/recipes/:recipeId/downvote', voteController.downvote);

export default router;
