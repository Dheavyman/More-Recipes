import models from '../models';
import helpers from '../helpers';

const Review = models.Review;
const Recipe = models.Recipe;
const User = models.User;
const sendNotification = helpers.sendEmail;

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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} - Object representing success status or
   * error status
   *
   * @memberof ReviewController
   */
  static addReview(req, res) {
    let reviewer;
    return Review
      .create({
        userId: req.decoded.user.id,
        recipeId: req.params.recipeId,
        content: req.body.content,
      })
      .then(review => User
        .findById(req.decoded.user.id, {
          attributes: ['id', 'firstName', 'lastName', 'userImage'],
        })
        .then((user) => {
          reviewer = user;
          res.status(201).send({
            status: 'Success',
            message: 'Review created',
            data: {
              review: {
                id: review.id,
                content: review.content,
                createdAt: review.createdAt,
                User: {
                  fullName: reviewer.fullName,
                  firstName: reviewer.firstName,
                  lastName: reviewer.lastName,
                  userImage: reviewer.userImage,
                }
              }
            }
          });
        }))
      // Notify the recipe owner of the review through email
      .then(() => Recipe
        .findById(req.params.recipeId, {
          include: [{
            model: User,
            attributes: ['id', 'email', 'notifications'],
          }],
        }))
      .then((recipe) => {
        if (recipe.User.notifications === true &&
            recipe.User.id !== reviewer.id) {
          sendNotification(recipe.User.email,
            'New notification', `Your recipe ${
              recipe.title} was reviewed by ${reviewer.fullName}`);
        }
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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} Object representing success status or
   * error status
   *
   * @memberof ReviewController
   */
  static deleteReview(req, res) {
    return Review
      .find({
        where: {
          id: req.params.reviewId,
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

  /**
   * Get the reviews for a recipe
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} Object representing success status or
   * error status
   *
   * @memberof ReviewController
   */
  static getReviews(req, res) {
    return Review
      .findAndCountAll({
        where: {
          recipeId: req.params.recipeId
        },
        order: [
          ['createdAt', 'DESC']
        ],
        limit: req.query.limit || 5,
        offset: req.query.offset,
        include: [{
          model: User,
          attributes: ['firstName', 'lastName', 'userImage'],
        }],
      })
      .then(reviews => res.status(200).send({
        status: 'Success',
        message: 'Reviews retrieved',
        data: {
          reviews: reviews.rows,
          reviewsCount: reviews.count,
        }
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }
}

export default ReviewController;
