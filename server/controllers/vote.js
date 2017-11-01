import db from '../../dummyDb';
import models from '../models';

const recipes = db.recipes,
  Recipe = models.Recipe,
  Vote = models.Vote;

/**
 * Class representing voting handler for upvoting or downvoting a recipe
 *
 * @class VoteHandler
 */
class VoteHandler {
  /**
   * Recipe upvote 
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing the success or failure message
   * @memberof VoteHandler
   */
  static upvote(req, res) {
    return Vote
      .findOrCreate({
        where: {
          userId: req.decoded.user.id,
          recipeId: req.params.recipeId
        },
        defaults: { hasVoted: true }
      })
      .spread((voter, created) => {
        if (created) {
          return Recipe
            .findOne({
              attributes: ['id'],
              where: {
                id: req.params.recipeId,
              }
            })
            .then(recipe => recipe.increment('upvotes'))
            .then(recipe => res.status(200).send({
              status: 'Success',
              message: 'Upvote recorded ',
              upvotes: recipe.upvotes,
              downvotes: recipe.downvotes
            }));
        } else if (!created && voter.hasVoted === false) {
          voter.update({
            option: true
          });
          return Recipe
            .findOne({
              attributes: ['id'],
              where: {
                id: req.params.recipeId
              }
            })
            .then(recipe => recipe.increment('upvotes'))
            .then(recipe => recipe.decrement('downvotes'))
            .then(recipe => res.status(200).send({
              status: 'Success',
              message: 'Upvote recorded and downvote removed',
              upvotes: recipe.upvotes,
              downvotes: recipe.downvotes
            }));
        } else if (!created && voter.hasVoted === true) {
          voter.destroy();
          return Recipe
            .findOne({
              attributes: ['id'],
              where: {
                id: req.params.recipeId
              }
            })
            .then(recipe => recipe.decrement('upvotes'))
            .then(recipe => res.status(200).send({
              status: 'Success',
              message: 'Vote removed',
              upvotes: recipe.upvotes,
              downvotes: recipe.downvotes
            }));
        }
      })
      .catch(error => res.status(400).send(error));
  }

  /**
   * downvote a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} JSON object containing the success or failure message
   * @memberof VoteHandler
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

export default VoteHandler;
