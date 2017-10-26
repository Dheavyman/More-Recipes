import controllers from '../controllers';
import middlewares from '../middlewares';

const recipeController = controllers.recipe,
  reviewController = controllers.review,
  validate = middlewares.validation;

export default (app) => {
  // Add a recipe to the catalog
  app.post('/api/recipes', validate.recipeRequiredInputs,
    recipeController.addRecipe);

  // Modifies a recipe in the recipe catalog
  app.put('/api/recipes/:recipeId', validate.recipeRequiredInputs,
    recipeController.modifyRecipe);

  // Delete a recipe in the recipe catalog
  app.delete('/api/recipes/:recipeId', recipeController.deleteRecipe);

  // Retrieve all the recipes in the catalog
  app.get('/api/recipes', recipeController.getAll);

  // Retrieve a single recipe from the catalog
  app.get('/api/recipes/:recipeId', recipeController.getOne);

  // Add a review for a recipe
  app.post('/api/recipes/:recipeId/reviews', validate.reviewRequiredInputs,
    reviewController.addReview);

  // Delete a review for a recipe
  app.delete('/api/recipes/:recipeId/reviews', reviewController.deleteReview);
};
