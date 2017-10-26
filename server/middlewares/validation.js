import helpers from '../helpers';

const isEmpty = helpers.isEmpty;

export default {
  // Checks for the recipe required input fields
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

  // Check for review required input fields
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
