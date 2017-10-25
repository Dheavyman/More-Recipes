import controller from '../controllers';

const recipeController = controller.recipe;

export default (app) => {
  app.post('/api/recipes', recipeController.addRecipe);
};
