import models from '../models';
import helpers from '../helpers';

const Review = models.Review,
  Recipe = models.Recipe,
  User = models.User,
  sendNotification = helpers.sendEmail;

/**
 * Class representing review handler
 *
 * @class ReviewController
 */
class ReviewController {
  /**
   * Add a review for a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Object representing success status or
   * error status
   * @memberof ReviewController
   */
  static addReview(req, res) {
    return Review
      .create({
        userId: req.decoded.user.id,
        recipeId: req.params.recipeId,
        content: req.body.content,
      })
      .then(review => res.status(201).send({
        status: 'Success',
        message: 'Review created',
        data: {
          id: review.id,
          userId: review.userId,
          recipeId: review.recipeId,
          content: review.content,
        }
      }))
      // Notify the recipe owner of the review through email
      .then(() => Recipe
        .findById(req.params.recipeId, {
          include: [{
            model: User,
            attributes: ['id', 'email', 'notifications'],
          }]
        }))
      .then((recipe) => {
        User
          .findById(req.decoded.user.id, {
            attributes: ['id', 'firstName', 'lastName'],
          })
          .then((reviewer) => {
            if (recipe.User.notifications === true &&
              recipe.User.id !== reviewer.id) {
              sendNotification(recipe.User.email,
                'New notification', `Your recipe ${
                  recipe.title} was reviewed by ${reviewer.fullName}`);
            }
          });
      })
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Delete a review for a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing success status or
   * error status
   * @memberof ReviewController
   */
  static deleteReview(req, res) {
    return Review
      .find({
        where: {
          recipeId: req.params.recipeId,
          userId: req.decoded.user.id
        }
      })
      .then(review => review
        .destroy()
      )
      .then(() => res.status(200).send({
        status: 'Success',
        message: 'Review deleted'
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }
}

export default ReviewController;
