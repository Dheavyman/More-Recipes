import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';

import models from '../models';
import helpers from '../helpers';

const Recipe = models.Recipe;
const Review = models.Review;
const User = models.User;
const Favorite = models.Favorite;
const Vote = models.Vote;
const Op = Sequelize.Op;
const sendNotification = helpers.sendEmail;

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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} - Object representing success status or
   * error status
   *
   * @memberof RecipeController
   */
  static addRecipe(req, res) {
    Recipe.find({
      where: {
        title: req.body.title,
        userId: req.decoded.user.id,
      }
    })
      .then((recipe) => {
        if (!recipe) {
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
            .then(newRecipe => newRecipe.increment('views'))
            .then(newRecipe => res.status(201).send({
              status: 'Success',
              message: 'Recipe created',
              data: {
                recipe: {
                  id: newRecipe.id,
                  title: newRecipe.title,
                  category: newRecipe.category,
                  description: newRecipe.description,
                  preparationTime: newRecipe.preparationTime,
                  ingredients: newRecipe.ingredients,
                  directions: newRecipe.directions,
                  recipeImage: newRecipe.recipeImage,
                  upvotes: newRecipe.upvotes,
                  downvotes: newRecipe.downvotes,
                  views: newRecipe.views,
                  favorites: newRecipe.favorites,
                }
              }
            }))
            .catch(error => res.status(500).send({
              status: 'Error',
              message: error.message,
            }));
        }
        return res.status(409).send({
          status: 'Fail',
          message: 'You already have a recipe with same title',
        });
      })
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Modify a recipe
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} - Object representing success status or
   * error status
   *
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
            title: req.body.title || recipe.title,
            category: req.body.category || recipe.category,
            description: req.body.description || recipe.description,
            preparationTime: req.body.preparationTime || recipe.preparationTime,
            ingredients: req.body.ingredients || recipe.ingredients,
            directions: req.body.directions || recipe.directions,
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
   *
   * @param {object} req - The request object
   * @param {object} res - The responsee object
   *
   * @returns {object} - Object representing success status or
   * error status
   *
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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next route handler function
   *
   * @return {object} - Object representing the success status or
   * error status
   *
   * @memberof RecipeController
   */
  static getAll(req, res, next) {
    if (req.query.sort || req.query.search) return next();
    return Recipe
      .findAndCountAll({
        attributes: [
          'id', 'title', 'category', 'description', 'preparationTime',
          'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
          'views', 'favorites'
        ],
        limit: req.query.limit || 4,
        offset: req.query.offset,
        order: [
          ['createdAt', 'DESC'],
        ],
        include: [{
          model: User,
          attributes: ['id', 'firstName', 'lastName']
        }],
      })
      .then(recipes => res.status(200).send({
        status: 'Success',
        message: 'Recipes retrieved',
        data: {
          recipes: recipes.rows,
          recipesCount: recipes.count,
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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @return {object} - Object representing the success status or
   * error status
   *
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
          limit: 5,
          order: [
            ['createdAt', 'DESC']
          ],
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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} Object representing the success status or
   * error status
   *
   * @memberof RecipeController
   */
  static userRecipes(req, res) {
    return Recipe
      .findAndCountAll({
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
        if (recipes.count === 0) {
          return res.status(200).send({
            status: 'Success',
            message: 'User has not added any recipe',
            data: {
              recipes: recipes.rows,
              recipesCount: recipes.count,
            }
          });
        }
        return res.status(200).send({
          status: 'Success',
          message: 'User recipes retrieved',
          data: {
            recipes: recipes.rows,
            recipesCount: recipes.count,
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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - Calls the next route handler
   *
   * @return {object} Object representing the success status or
   * error status
   *
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
   *
   * @param {any} req - The request object
   * @param {any} res - The response object
   *
   * @returns {object} - Object representing the success status or
   * error status
   *
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
        limit: req.query.limit || 8,
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
   * Search for recipe based on recipe title
   *
   * @static
   *
   * @param {any} req - The request object
   * @param {any} res - THe response object
   * @param {any} next - Call the next route handler
   *
   * @returns {object} Object representing success status or
   * error status
   *
   * @memberof RecipeController
   */
  static searchByTitle(req, res, next) {
    if (req.query.search === 'title' && req.query.list) {
      let titles = req.query.list.split(',').join(' ').split(' ');
      titles = titles.filter(title => title !== '');
      const searchList = titles.map(keyWord => ({
        title: {
          [Op.iLike]: `%${keyWord}%`,
        }
      }));
      return Recipe
        .findAll({
          attributes: [
            'id', 'title', 'category', 'description', 'preparationTime',
            'ingredients', 'directions', 'recipeImage', 'upvotes', 'downvotes',
            'views', 'favorites'
          ],
          where: {
            [Op.or]: searchList,
          },
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          }],
        })
        .then(recipes => res.status(200).send({
          status: 'Success',
          message: 'Recipe(s) retrieved',
          data: {
            recipes
          }
        }));
    }
    next();
  }

  /**
   * Search for recipes based on list of ingredients
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   *
   * @returns {object} Object representing success status or
   * error status
   *
   * @memberof RecipeController
   */
  static searchByIngredients(req, res, next) {
    if (req.query.search === 'ingredients' && req.query.list) {
      let ingredients = req.query.list.split(',').join(' ').split(' ');
      ingredients = ingredients.filter(ingredient => ingredient !== '');
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
          },
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          }],
        })
        .then((recipes) => {
          if (recipes.length === 0) {
            return res.status(200).send({
              status: 'Success',
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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} Object representing success status or
   * error status
   *
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
          },
          include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
          }],
        })
        .then((recipes) => {
          if (recipes.length === 0) {
            return res.status(200).send({
              status: 'Success',
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
