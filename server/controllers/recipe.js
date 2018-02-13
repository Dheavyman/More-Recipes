import Sequelize from 'sequelize';
import isEmpty from 'lodash/isEmpty';
import jwt from 'jsonwebtoken';

import models from '../models';
import helpers from '../helpers';

const Recipe = models.Recipe,
  Review = models.Review,
  User = models.User,
  Favorite = models.Favorite,
  Vote = models.Vote,
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
        recipeImage: req.body.recipeImage,
      })
      .then(recipe => recipe.increment('views'))
      .then(recipe => res.status(201).send({
        status: 'Success',
        message: 'Recipe created',
        data: {
          recipe: {
            id: recipe.id,
            title: recipe.title,
            category: recipe.category,
            description: recipe.description,
            preparationTime: recipe.preparationTime,
            ingredients: recipe.ingredients,
            directions: recipe.directions,
            recipeImage: recipe.recipeImage,
            upvotes: recipe.upvotes,
            downvotes: recipe.downvotes,
            views: recipe.views,
            favorites: recipe.favorites,
          }
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
            recipeImage: req.body.recipeImage || recipe.recipeImage,
          });
      })
      .then(updatedRecipe => res.status(200).send({
        status: 'Success',
        message: 'Recipe modified',
        data: {
          recipe: {
            id: updatedRecipe.id,
            title: updatedRecipe.title,
            category: updatedRecipe.category,
            description: updatedRecipe.description,
            preparationTime: updatedRecipe.preparationTime,
            ingredients: updatedRecipe.ingredients,
            directions: updatedRecipe.directions,
            recipeImage: updatedRecipe.recipeImage,
            upvotes: updatedRecipe.upvotes,
            downvotes: updatedRecipe.downvotes,
            views: updatedRecipe.views,
            favorites: updatedRecipe.favorites,
          }
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
    if (!isEmpty(req.query)) return next();
    return Recipe
      .all({
        attributes: [
          'id', 'title', 'category', 'description', 'preparationTime',
          'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
          'views', 'favorites'
        ],
        limit: 4,
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }],
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
          'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
          'views', 'favorites', 'userId'
        ],
        include: [{
          model: Review,
          attributes: ['id', 'content', 'createdAt'],
          include: [{
            model: User,
            attributes: ['firstName', 'lastName', 'userImage'],
          }],
        }, {
          model: Favorite,
          attributes: ['userId']
        }, {
          model: Vote,
          attributes: ['userId', 'hasVoted']
        }],
      })
      .then((recipe) => {
        const token = req.body.token || req.query.token ||
          req.headers['x-access-token'];
        let userId;
        if (token !== 'null' && token !== undefined) {
          const { user: { id } } = jwt.decode(token);
          userId = id;
        }
        if (userId && recipe.userId !== userId) {
          return recipe.increment('views');
        }
        return recipe;
      })
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
          'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
          'views', 'favorites'
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
      const sort = req.query.sort;
      let order = req.query.order.toUpperCase();
      if (order === 'DESCENDING') {
        order = order.slice(0, 4);
      } else if (order === 'ASCENDING') {
        order = order.slice(0, 3);
      }
      return Recipe
        .findAll({
          attributes: [
            'id', 'title', 'category', 'description', 'preparationTime',
            'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
            'views', 'favorites'
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
        .catch((error) => {
          if (error.message.includes('column')) {
            return res.status(404).send({
              status: 'Error',
              message: 'Invalid sort or order term in query',
            });
          }
          return res.status(500).send({
            status: 'Error',
            message: error.message,
          });
        });
    }
    next();
  }

  /**
   * Retrieve popular recipes based on favorites count
   *
   * @static
   * @param {any} req - The request object
   * @param {any} res - The response object
   * @returns {object} - Object representing the success status or
     * error status
   * @memberof RecipeController
   */
  static getPopular(req, res) {
    return Recipe
      .all({
        attributes: [
          'id', 'title', 'category', 'description', 'preparationTime',
          'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
          'views', 'favorites'
        ],
        order: [
          ['favorites', 'DESC']
        ],
        limit: 8,
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }],
      })
      .then(recipes => res.status(200).send({
        status: 'Success',
        message: 'Popular recipes retrieved',
        data: {
          recipes,
        }
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
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
    if (req.query.search === 'ingredients' && req.query.list) {
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
            'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
            'views', 'favorites'
          ],
          where: {
            [Op.or]: searchList,
          }
        })
        .then((recipes) => {
          if (recipes.length === 0) {
            return res.status(404).send({
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
   * @returns {object} Object representing success status or
   *  error status
   * @memberof RecipeController
   */
  static searchByCategory(req, res) {
    if (req.query.search === 'category' && req.query.list) {
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
            'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
            'views', 'favorites'
          ],
          where: {
            [Op.or]: searchList,
          }
        })
        .then((recipes) => {
          if (recipes.length === 0) {
            return res.status(404).send({
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
    res.status(404).send({
      status: 'Fail',
      message: 'No match found, wrong query strings'
    });
  }
}

export default RecipeController;
