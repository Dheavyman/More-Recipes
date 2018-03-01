import models from '../models';

const Favorite = models.Favorite;
const User = models.User;

/**
 * Class representing notification controller
 *
 * @class NotificationController
 */
class NotificationController {
  /**
   * Send notification to users when their favorite recipe
   * get modified
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next route handler function
   * @returns {function} Object representing error message or
   * calls the next function
   * @memberof NotificationController
   */
  static favoriteRecipeModified(req, res, next) {
    return Favorite
      .findAll({
        attributes: ['userId'],
        where: {
          recipeId: req.params.recipeId,
        },
        include: [{
          model: User,
          attributes: ['id', 'email', 'notifications']
        }]
      })
      .then((favorites) => {
        const usersEmail = favorites
        // Get the email addresses of users who favorited the recipe
        // excluding that of the recipe owner if he favorites it
          .reduce((accumulator, currentValue) => {
            if (currentValue.User.notifications === true &&
              currentValue.userId !== req.decoded.user.id) {
              accumulator.push(currentValue.User.email);
            }
            return accumulator;
          }, []);
        res.locals.usersEmail = usersEmail;
        next();
      })
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }
}

export default NotificationController;
