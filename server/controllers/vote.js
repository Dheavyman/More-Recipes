import db from '../../dummyDb';

const recipes = db.recipes;

/**
 * Class representing voting handler
 * for upvoting or downvoting a recipe
 *
 * @class Vote
 */
class Vote {
  /**
   * upvote a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object representing the success or failure message
   * @memberof Vote
   */
  static upvote(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        recipe.upvotes += 1;
        return res.status(200).send({
          status: 'Success',
          message: 'Upvote recorded',
          recipe,
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not founddd',
    });
  }

  /**
   * downvote a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object containing the success or failure message
   * @memberof Vote
   */
  static downvote(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        recipe.downvotes += 1;
        return res.status(200).send({
          status: 'Success',
          message: 'Downvote recorded',
          recipe,
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found',
    });
  }
}

export default Vote;
