import db from '../../dummyDb';

const recipes = db.recipes;

/**
 * Class representing recipe handler
 * 
 * @class RecipeHandler
 */
class RecipeHandler {
  /**
   * Add a recipe to the recipe catalog
   * 
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - JSON object representing success or error message
   * @memberof RecipeHandler
   */
  static addRecipe(req, res) {
    recipes.push(req.body);
    return res.status(200).send({
      status: 'Success',
      message: 'Recipe added successfully',
    });
  }

  /**
   * Modify a recipe in the catalog
   * 
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - JSON object representing success or error message
   * @memberof RecipeHandler
   */
  static modifyRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        recipe.title = req.body.title;
        recipe.description = req.body.description;
        recipe.preparationTime = req.body.preparationTime;
        recipe.ingredients = req.body.ingredients;
        recipe.directions = req.body.directions;
        return res.status(200).send({
          status: 'Success',
          message: 'Recipe modified successfully',
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found'
    });
  }

  /**
   * Delete a recipe in the catalog
   * 
   * @static
   * @param {object} req - The request object
   * @param {object} res - The responsee object
   * @returns {object} - JSON object representing success or error message
   * @memberof RecipeHandler
   */
  static deleteRecipe(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        recipes.splice(i, 1);
        return res.status(200).send({
          status: 'Success',
          message: 'Recipe deleted successfully',
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found'
    });
  }

  /**
   * Retrieve all the recipe in the catalog
   * 
   * @static
   * @param {object} req - The request object 
   * @param {object} res - The response object
   * @return {object} - JSON object representing the recipes in the catalog
   * @memberof RecipeHandler
   */
  static getAll(req, res) {
    return res.status(200).send({
      recipes,
    });
  }

  /**
   * Retrieve a single recipe in the catalog
   * 
   * @static
   * @param {object} req - The request object 
   * @param {object} res - The response object
   * @returns {object} - JSON object representing the single recipe retrieved
   * @memberof RecipeHandler
   */
  static getOne(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        return res.status(200).send({
          status: 'Success',
          recipe: recipes[i],
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found'
    });
  }
}

export default RecipeHandler;
