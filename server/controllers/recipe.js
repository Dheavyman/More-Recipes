import models from '../models';
import db from '../../dummyDb';

const Recipe = models.Recipe,
  recipes = db.recipes,
  reviews = db.reviews;

/**
 * Class representing recipe handler
 *
 * @class RecipeHandler
 */
class RecipeHandler {
  /**
   * Add a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Object representing success status or
   *  error status
   * @memberof RecipeHandler
   */
  static addRecipe(req, res) {
    return Recipe
      .create({
        userId: req.decoded.user.id,
        title: req.body.title,
        description: req.body.description,
        preparationTime: req.body.preparationTime,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
      })
      .then(recipe => recipe.increment('views'))
      .then(recipe => recipe.reload())
      .then(recipe => res.status(201).send({
        status: 'Success',
        message: 'Recipe created',
        id: recipe.id,
        userId: recipe.userId,
        title: recipe.title,
        description: recipe.description,
        preparationTime: recipe.preparationTime,
        ingredients: recipe.ingredients,
        directions: recipe.directions,
        upvotes: recipe.upvotes,
        downvotes: recipe.downvotes,
        views: recipe.views,
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Modify a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Object representing success status or
   *  error status
   * @memberof RecipeHandler
   */
  static modifyRecipe(req, res) {
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.user.id,
        },
      })
      .then(recipe => recipe
        .update({
          title: req.body.title,
          description: req.body.description,
          preparationTime: req.body.preparationTime,
          ingredients: req.body.ingredients,
          directions: req.body.directions,
        })
      )
      .then(updatedRecipe => res.status(200).send({
        status: 'Success',
        message: 'Recipe modified',
        id: updatedRecipe.id,
        title: updatedRecipe.title,
        description: updatedRecipe.description,
        preparationTime: updatedRecipe.preparationTime,
        ingredients: updatedRecipe.ingredients,
        directions: updatedRecipe.directions,
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Delete a recipe in the catalog
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The responsee object
   * @returns {object} - Object representing success status or
   * error status
   * @memberof RecipeHandler
   */
  static deleteRecipe(req, res) {
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.user.id,
        }
      })
      .then(recipe => recipe.destroy())
      .then(() => res.status(200).send({
        status: 'Success',
        message: 'Recipe deleted'
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Retrieve all the recipe in the catalog
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler function
   * @return {object} - JSON object representing the recipes in the catalog
   * @memberof RecipeHandler
   */
  static getAll(req, res, next) {
    if (req.query.sort) return next();
    return res.status(200).send({
      status: 'Success',
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
      const recipe = recipes[i],
        review = [];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        for (let j = 0; j < reviews.length; j += 1) {
          if (reviews[j].recipeId === recipe.id) {
            review.push(reviews[j]);
          }
        }
        return res.status(200).send({
          status: 'Success',
          recipe: recipes[i],
          reviews: review,
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found'
    });
  }

  /**
   * Retrieve recipes with most upvotes in descending order
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - Calls the next route handler
   * @return {object} JSON object representing the success or failure message
   * @memberof RecipeHandler
   */
  static getMostUpvotes(req, res, next) {
    if (req.query.sort && req.query.order) {
      const sort = req.query.sort.toLowerCase(),
        order = req.query.order.slice(0, 4).toLowerCase(),
        sortedRecipes = recipes.slice(0);
      if (sort === 'upvotes' && order === 'desc') {
        sortedRecipes
          .sort((current, nextIndex) => nextIndex.upvotes - current.upvotes);
        return res.status(200).send({
          status: 'Success',
          sortedRecipes
        });
      }
    }
    next();
  }
}

export default RecipeHandler;
