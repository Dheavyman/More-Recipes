import db from '../../dummyDb';
import models from '../models';

const reviews = db.reviews,
  Review = models.Review,
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
   * @returns {object} JSON object representing success or error message
   * @memberof ReviewHandler
   */
  static deleteReview(req, res) {
    for (let i = 0; i < reviews.length; i += 1) {
      const review = reviews[i];
      if (review.id === parseInt(req.params.reviewId, 10) &&
        review.recipeId === parseInt(req.params.recipeId, 10)) {
        reviews.splice(i, 1);
        return res.status(200).send({
          status: 'Success',
          message: 'Review deleted successfully',
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Review not found'
    });
  }
}

export default ReviewHandler;
