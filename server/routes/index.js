import controllers from '../controllers';
import middlewares from '../middlewares';

const recipeController = controllers.recipe,
  validate = middlewares.validation;

export default (app) => {
  // Add a recipe to the catalog
  app.post('/api/recipes', validate.recipeRequiredInputs,
    recipeController.addRecipe);

  // Modifies a recipe in the recipe catalog
  app.put('/api/recipes/:recipeId', recipeController.modifyRecipe);
};
