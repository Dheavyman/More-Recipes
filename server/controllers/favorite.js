import models from '../models';

const Favorite = models.Favorite,
  Recipe = models.Recipe,
  User = models.User;

/**
 * Class representing favorite controller functions
 *
 * @class FavoriteController
 */
class FavoriteController {
  /**
     * Add a recipe as users favorite or undo it
     *
     * @static
     * @param {object} req - The request body
     * @param {any} res - The response body
     * @returns {object} Object representing success status or
     * error status
     * @memberof FavoriteController
     */
  static setFavorite(req, res) {
    return Favorite
      .findOrCreate({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.user.id,
        }
      })
      .spread((favorite, created) => {
        if (!created) {
          favorite.destroy();
          Recipe
            .findById(req.params.recipeId)
            .then(recipe => recipe.decrement('favorites'));
          return res.status(200).send({
            status: 'Success',
            message: 'Recipe removed from favorites'
          });
        }
        Recipe
          .findById(req.params.recipeId)
          .then(recipe => recipe.increment('favorites'));
        return res.status(201).send({
          status: 'Success',
          message: 'Recipe added to favorites',
        });
      })
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Retrieve all user favorite recipes
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing success status or
   * error stattus
   * @memberof FavoriteController
   */
  static userFavorites(req, res) {
    return User
      .findById(req.params.userId, {
        attributes: ['firstName', 'lastName'],
        include: [{
          model: Favorite,
          attributes: ['recipeId', 'category'],
          include: [{
            model: Recipe,
            attributes: [
              'id', 'title', 'category', 'description', 'preparationTime',
              'ingredients', 'directions', 'recipeImage', 'upvotes',
              'downvotes', 'views', 'favorites'
            ]
          }]
        }],
      })
      .then((user) => {
        if (user.Favorites.length === 0) {
          return res.status(404).send({
            status: 'Fail',
            message: 'User has not favorited any recipe',
          });
        }
        res.status(200).send({
          status: 'Success',
          message: 'Favorites retrieved',
          data: {
            user
          }
        });
      })
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Create category for a user favorite recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing the success status or
   * error status
   * @memberof FavoriteController
   */
  static favoriteCategory(req, res) {
    return Favorite
      .findOne({
        where: {
          userId: req.decoded.user.id,
          recipeId: req.params.recipeId,
        }
      })
      .then((favorite) => {
        if (!favorite) {
          return res.status(404).send({
            status: 'Fail',
            message: 'Favorite recipe not found',
          });
        }
        favorite
          .update({
            category: req.body.category,
          })
          .then(() => res.status(200).send({
            status: 'Success',
            message: 'Favorite recipe category added',
          }));
      })
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }
}

export default FavoriteController;
