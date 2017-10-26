import controllers from '../controllers';
import middlewares from '../middlewares';

const recipeController = controllers.recipe,
  validate = middlewares.validation;

export default (app) => {
  app.post('/api/recipes', validate.recipeRequiredInputs,
    recipeController.addRecipe);
};
