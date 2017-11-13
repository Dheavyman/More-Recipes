import Sequelize from 'sequelize';
import models from '../models';
import helpers from '../helpers';

const Recipe = models.Recipe,
  Review = models.Review,
  User = models.User,
  Op = Sequelize.Op,
  sendNotification = helpers.sendEmail;

/**
 * Class representing recipe handler
 *
 * @class RecipeController
 */
class RecipeController {
  /**
   * Add a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Object representing success status or
   *  error status
   * @memberof RecipeController
   */
  static addRecipe(req, res) {
    return Recipe
      .create({
        userId: req.decoded.user.id,
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        preparationTime: req.body.preparationTime,
        ingredients: req.body.ingredients,
        directions: req.body.directions,
      })
      .then(recipe => recipe.increment('views'))
      .then(recipe => res.status(201).send({
        status: 'Success',
        message: 'Recipe created',
        data: {
          id: recipe.id,
          userId: recipe.userId,
          title: recipe.title,
          category: recipe.category,
          description: recipe.description,
          preparationTime: recipe.preparationTime,
          ingredients: recipe.ingredients,
          directions: recipe.directions,
          upvotes: recipe.upvotes,
          downvotes: recipe.downvotes,
          views: recipe.views,
        }
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
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
   * @memberof RecipeController
   */
  static modifyRecipe(req, res) {
    return Recipe
      .find({
        where: {
          id: req.params.recipeId,
          userId: req.decoded.user.id,
        },
      })
      .then((recipe) => {
        res.locals.recipeTitle = recipe.title;
        return recipe
          .update({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            preparationTime: req.body.preparationTime,
            ingredients: req.body.ingredients,
            directions: req.body.directions,
          });
      })
      .then(updatedRecipe => res.status(200).send({
        status: 'Success',
        message: 'Recipe modified',
        data: {
          id: updatedRecipe.id,
          title: updatedRecipe.title,
          category: updatedRecipe.category,
          description: updatedRecipe.description,
          preparationTime: updatedRecipe.preparationTime,
          ingredients: updatedRecipe.ingredients,
          directions: updatedRecipe.directions,
        }
      }))
      // Notify users that their favorite recipe has been modified
      .then(() => {
        if (res.locals.usersEmail.length > 0) {
          sendNotification(res.locals.usersEmail,
            'New notification', `Your favorite recipe ${
              res.locals.recipeTitle} was modified`);
        }
      })
      .catch(error => res.status(500).send({
        status: 'Error',
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
   * @memberof RecipeController
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
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Retrieve all the recipes
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next route handler function
   * @return {object} - Object representing the success status or
   * error status
   * @memberof RecipeController
   */
  static getAll(req, res, next) {
    if (req.query.sort || req.query.search) return next();
    return Recipe
      .all({
        attributes: [
          'id', 'title', 'category', 'description', 'preparationTime',
          'ingredients', 'directions', 'upvotes', 'downvotes', 'views'
        ],
      })
      .then(recipes => res.status(200).send({
        status: 'Success',
        message: 'Recipes retrieved',
        data: {
          recipes
        }
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Retrieve a single recipe in the catalog
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} - Object representing the success status or
   * error status
   * @memberof RecipeController
   */
  static getOne(req, res) {
    return Recipe
      .findById(req.params.recipeId, {
        attributes: [
          'id', 'title', 'category', 'description', 'preparationTime',
          'ingredients', 'directions', 'upvotes', 'downvotes', 'views'
        ],
        include: [{
          model: Review,
          attributes: ['id', 'content', 'createdAt'],
          include: [{
            model: User,
            attributes: ['firstName', 'lastName'],
          }],
        }],
      })
      .then(recipe => recipe.increment('views'))
      .then(recipe => res.status(200).send({
        status: 'Success',
        message: 'Recipe retrieved',
        data: {
          recipe
        }
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message
      }));
  }

  /**
   * Retrieve user recipes
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing the success status or
   * error status
   * @memberof RecipeController
   */
  static userRecipes(req, res) {
    return Recipe
      .all({
        attributes: [
          'id', 'title', 'category', 'description', 'preparationTime',
          'ingredients', 'directions', 'upvotes', 'downvotes', 'views'
        ],
        where: {
          userId: req.params.userId,
        }
      })
      .then((recipes) => {
        if (recipes.length === 0) {
          return res.status(404).send({
            status: 'Fail',
            message: 'User has not added any recipe',
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'User recipes retrieved',
          data: {
            recipes,
          }
        });
      })
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Retrieve recipes with most upvotes in descending order
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - Calls the next route handler
   * @return {object} Object representing the success status or
   * error status
   * @memberof RecipeController
   */
  static getMostUpvotes(req, res, next) {
    if (req.query.sort && req.query.order) {
      const sort = req.query.sort,
        order = req.query.order.toUpperCase().slice(0, 4);
      return Recipe
        .findAll({
          attributes: [
            'id', 'title', 'category', 'description', 'preparationTime',
            'ingredients', 'directions', 'upvotes', 'downvotes', 'views'
          ],
          order: [
            [sort, order]
          ],
          limit: 20,
        })
        .then(recipes => res.status(200).send({
          status: 'Success',
          message: 'Recipes retrieved',
          data: {
            recipes
          }
        }))
        .catch(error => res.status(500).send({
          status: 'Error',
          message: error.message,
        }));
    }
    next();
  }

  /**
   * Search for recipes based on list of ingredients
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} Object representing success status or
   *  error status
   * @memberof RecipeController
   */
  static searchByIngredients(req, res, next) {
    if (req.query.search === 'ingredients') {
      const ingredients = req.query.list.split(' ');
      const searchList = ingredients.map(keyWord => ({
        ingredients: {
          [Op.iLike]: `%${keyWord}%`,
        }
      }));
      return Recipe
        .all({
          attributes: [
            'id', 'title', 'category', 'description', 'preparationTime',
            'ingredients', 'directions', 'upvotes', 'downvotes', 'views'
          ],
          where: {
            [Op.or]: searchList,
          }
        })
        .then((recipes) => {
          if (recipes.length === 0) {
            return res.status(400).send({
              status: 'Fail',
              message: 'No recipe matched your search',
            });
          }
          return res.status(200).send({
            status: 'Success',
            message: 'Recipe(s) found',
            data: {
              recipes,
            }
          });
        })
        .catch(error => res.status(500).send({
          status: 'Error',
          message: error.message,
        }));
    }
    next();
  }

  /**
   * Search for recipes based on category
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} Object representing success status or
   *  error status
   * @memberof RecipeController
   */
  static searchByCategory(req, res, next) {
    if (req.query.search === 'category') {
      const category = req.query.list.split(' ');
      const searchList = category.map(keyWord => ({
        category: {
          [Op.iLike]: `%${keyWord}%`,
        }
      }));
      return Recipe
        .all({
          attributes: [
            'id', 'title', 'category', 'description', 'preparationTime',
            'ingredients', 'directions', 'upvotes', 'downvotes', 'views'
          ],
          where: {
            [Op.or]: searchList,
          }
        })
        .then((recipes) => {
          if (recipes.length === 0) {
            return res.status(400).send({
              status: 'Fail',
              message: 'No recipe matched your search',
            });
          }
          return res.status(200).send({
            status: 'Success',
            message: 'Recipe(s) found',
            data: {
              recipes,
            }
          });
        })
        .catch(error => res.status(500).send({
          status: 'Error',
          message: error.message,
        }));
    }
    next();
  }
}

export default RecipeController;
