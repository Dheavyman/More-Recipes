import helpers from '../helpers';
import models from '../models';

const isEmpty = helpers.isEmpty;
const Review = models.Review;

/**
 * Class representing recipe review validations
 *
 * @class ReviewValidation
 */
class ReviewValidation {
  /**
   * Checks for the required input fields
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   *
   * @returns {object} Object representing the failure status or
   * calls the next route handler function
   *
   * @memberof ReviewValidation
   */
  static reviewRequiredInputs(req, res, next) {
    if (!req.body.content || isEmpty(req.body.content)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Content cannot be empty'
      });
    }
    next();
  }

  /**
   * Check if a review exist
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - The next route handler function
   *
   * @returns {any} Object representing the failure status or
   * call to the next route handler function
   *
   * @memberof ReviewValidation
   */
  static reviewExist(req, res, next) {
    return Review
      .findById(req.params.reviewId)
      .then((review) => {
        if (!review) {
          return res.status(404).send({
            status: 'Fail',
            message: 'Review not found'
          });
        }
        next();
      })
      .catch((error) => {
        if (error.message.includes('invalid input syntax for integer')) {
          return res.status(400).send({
            status: 'Error in parameter',
            message: error.message,
          });
        }
        return res.status(400).send({
          status: 'Error',
          message: error.message,
        });
      });
  }

  /**
   * Check if a review belongs to a user
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {any} res - The response object
   * @param {any} next The next route handler function
   *
   * @returns {any} Object representing error message or
   * calls the next function
   *
   * @memberof ReviewValidation
   */
  static userReview(req, res, next) {
    return Review
      .find({
        where: {
          id: req.params.reviewId,
          userId: req.decoded.user.id,
        }
      })
      .then((review) => {
        if (!review) {
          return res.status(403).send({
            status: 'Fail',
            message: 'Not user\'s review',
          });
        }
        next();
      })
      .catch(error => res.status(400).send({
        status: 'Error',
        message: error.message,
      }));
  }
}

export default ReviewValidation;
