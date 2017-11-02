import models from '../models';

const Favorite = models.Favorite;

/**
 * Class representing favorite controller funcitons
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
          return res.status(200).send({
            status: 'Success',
            message: 'Recipe removed from favorites'
          });
        }
        return res.status(201).send({
          status: 'Success',
          message: 'Recipe added to favorites',
        });
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }
}

export default FavoriteController;
