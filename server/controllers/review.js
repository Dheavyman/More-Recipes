import models from '../models';

const Review = models.Review,
  User = models.User;

/**
 * Class representing review handler
 *
 * @class ReviewHandler
 */
class ReviewHandler {
  /**
   * Add a review for a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} - Object representing success status or
   * error status
   * @memberof ReviewHandler
   */
  static addReview(req, res) {
    User.findOne({
      where: {
        id: req.decoded.user.id
      }
    })
      .then(user => Review
        .create({
          userId: req.decoded.user.id,
          recipeId: req.params.recipeId,
          content: req.body.content,
          reviewerName: user.fullName,
        })
      )
      .then(review => res.status(201).send({
        status: 'Success',
        message: 'Review created',
        content: review.content,
        reviewerName: review.reviewerName,
      }))
      .catch(error => res.status(400).send({
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
   * @memberof ReviewHandler
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
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }
}

export default ReviewHandler;
