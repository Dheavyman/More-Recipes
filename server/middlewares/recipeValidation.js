import helpers from '../helpers';

const isEmpty = helpers.isEmpty;

export default {
  /**
   * Check for all required input fields
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing failure message
   */
  recipeRequiredInputs(req, res, next) {
    if (!req.body.title || isEmpty(req.body.title)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Title cannot be empty'
      });
    }
    if (!req.body.description || isEmpty(req.body.description)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Description cannot be empty'
      });
    }
    if (!req.body.preparationTime || isEmpty(req.body.preparationTime)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Preparation time cannot be empty'
      });
    }
    if (!req.body.ingredients || isEmpty(req.body.ingredients)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Ingredients cannot be empty'
      });
    }
    if (!req.body.directions || isEmpty(req.body.directions)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Directions cannot be empty'
      });
    }
    next();
  },

  /**
   * Checks for the required input fields
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - Calls the next route handler
   * @returns {object} JSON object representing the failure message
   */
  reviewRequiredInputs(req, res, next) {
    if (!req.body.content || isEmpty(req.body.content)) {
      return res.status(406).send({
        status: 'Fail',
        message: 'Content cannot be empty'
      });
    }
    next();
  }
};
