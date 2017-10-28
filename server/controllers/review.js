import db from '../../dummyDb';

const reviews = db.reviews,
  recipes = db.recipes;

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
   * @returns {object} - JSON object representing success message
   * @memberof ReviewHandler
   */
  static addReview(req, res) {
    for (let i = 0; i < recipes.length; i += 1) {
      const recipe = recipes[i];
      if (recipe.id === parseInt(req.params.recipeId, 10)) {
        req.body.id = reviews.length + 1;
        req.body.recipeId = parseInt(req.params.recipeId, 10);
        reviews.push(req.body);
        return res.status(201).send({
          status: 'Success',
          message: 'Review added successfully',
          review: reviews[reviews.length - 1]
        });
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Recipe not found',
    });
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
      if (review.id === parseInt(req.params.reviewId, 10)) {
        if (review.recipeId === parseInt(req.params.recipeId, 10)) {
          reviews.splice(i, 1);
          return res.status(200).send({
            status: 'Success',
            message: 'Review deleted successfully',
          });
        }
      }
    }
    return res.status(404).send({
      status: 'Fail',
      message: 'Review not found'
    });
  }
}

export default ReviewHandler;
