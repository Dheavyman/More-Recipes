import helpers from '../helpers';
import models from '../models';

const isEmpty = helpers.isEmpty,
  Recipe = models.Recipe;

/**
 * Class representing recipe validations
 *
 * @class RecipeValidation
 */
class RecipeValidation {
  /**
   * Check for all required input fields
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {any} Object representing error message or
   * calls the next function
   * @memberof RecipeValidation
   */
  static recipeRequiredInputs(req, res, next) {
    if (!req.body.title || isEmpty(req.body.title)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Title cannot be empty'
      });
    }
    if (!req.body.description || isEmpty(req.body.description)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Description cannot be empty'
      });
    }
    if (!req.body.preparationTime || isEmpty(req.body.preparationTime)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Preparation time cannot be empty'
      });
    }
    if (!req.body.ingredients || isEmpty(req.body.ingredients)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Ingredients cannot be empty'
      });
    }
    if (!req.body.directions || isEmpty(req.body.directions)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Directions cannot be empty'
      });
    }
    next();
  }

  /**
   * Checks that a recipe exist
   *
   * @static
   * @param {object} req - This is the request object
   * @param {object} res - This is the response object
   * @param {function} next - The next route handler function
   * @returns {any} Object representing error message or
   * calls the next function
   * @memberof RecipeValidation
   */
  static recipeExist(req, res, next) {
    return Recipe
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({
            status: 'Fail',
            message: 'Recipe not found'
          });
        }
        next();
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Check if a recipe belongs to a user
   *
   * @static
   * @param {object} req - The request object
   * @param {any} res - The response object
   * @param {any} next The next route handler function
   * @returns {any} Object representing error message or
   * calls the next function
   * @memberof RecipeValidation
   */
  static userRecipe(req, res, next) {
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.user.id,
        }
      })
      .then((recipe) => {
        if (!recipe) {
          return res.status(403).send({
            status: 'Fail',
            message: 'Not user\'s recipe',
          });
        }
        next();
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }
}

export default RecipeValidation;
