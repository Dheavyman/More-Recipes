import helpers from '../helpers';

const isEmpty = helpers.isEmpty;

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
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} Object representing the failure status or
   * calls the next route handler function
   * @memberof ReviewValidation
   */
  static reviewRequiredInputs(req, res, next) {
    if (!req.body.content || isEmpty(req.body.content)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Content cannot be empty'
      });
    }
    next();
  }
}

export default ReviewValidation;
