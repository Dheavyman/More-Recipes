import models from '../models';

const Review = models.Review;

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
    return Review
      .create({
        userId: req.decoded.user.id,
        recipeId: req.params.recipeId,
        content: req.body.content,
      })
      .then(review => res.status(201).send({
        status: 'Success',
        message: 'Review created',
        userId: review.userId,
        recipeId: review.recipeId,
        content: review.content,
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
