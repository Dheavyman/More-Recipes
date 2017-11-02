import models from '../models';

const Recipe = models.Recipe,
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
        defaults: {
          hasVoted: true
        }
      })
      .spread((voter, created) => {
        if (created) {
          return Recipe
            .findById(req.params.recipeId)
            .then(recipe => recipe.increment('upvotes'))
            .then(recipe => res.status(200).send({
              status: 'Success',
              message: 'Upvote recorded',
              data: {
                id: recipe.id,
                upvotes: recipe.upvotes,
                downvotes: recipe.downvotes
              }
            }));
        } else if (!created && voter.hasVoted === false) {
          voter.update({
            hasVoted: true
          });
          return Recipe
            .findById(req.params.recipeId)
            .then(recipe => recipe.increment('upvotes'))
            .then(recipe => recipe.decrement('downvotes'))
            .then(recipe => res.status(200).send({
              status: 'Success',
              message: 'Upvote recorded and downvote removed',
              data: {
                id: recipe.id,
                upvotes: recipe.upvotes,
                downvotes: recipe.downvotes
              }
            }));
        } else if (!created && voter.hasVoted === true) {
          voter.destroy();
          return Recipe
            .findById(req.params.recipeId)
            .then(recipe => recipe.decrement('upvotes'))
            .then(recipe => res.status(200).send({
              status: 'Success',
              message: 'Vote removed',
              data: {
                id: recipe.id,
                upvotes: recipe.upvotes,
                downvotes: recipe.downvotes
              }
            }));
        }
      })
      .catch(error => res.status(400).send({
        message: error.message
      }));
  }

  /**
   * downvote a recipe
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object containing the success status or
   * error status
   * @memberof VoteHandler
   */
  static downvote(req, res) {
    return Vote
      .findOrCreate({
        where: {
          userId: req.decoded.user.id,
          recipeId: req.params.recipeId
        },
        defaults: {
          hasVoted: false
        }
      })
      .spread((voter, created) => {
        if (created) {
          return Recipe
            .findById(req.params.recipeId)
            .then(recipe => recipe.increment('downvotes'))
            .then(recipe => res.status(200).send({
              status: 'Success',
              message: 'Downvote recorded',
              data: {
                id: recipe.id,
                upvotes: recipe.upvotes,
                downvotes: recipe.downvotes
              }
            }));
        } else if (!created && voter.hasVoted === true) {
          voter.update({
            hasVoted: false
          });
          return Recipe
            .findById(req.params.recipeId)
            .then(recipe => recipe.increment('downvotes'))
            .then(recipe => recipe.decrement('upvotes'))
            .then(recipe => res.status(200).send({
              status: 'success',
              message: 'Downvote recorded and upvote removed',
              data: {
                id: recipe.id,
                upvotes: recipe.upvotes,
                downvotes: recipe.downvotes
              }
            }));
        } else if (!created && voter.hasVoted === false) {
          voter.destroy();
          return Recipe
            .findById(req.params.recipeId)
            .then(recipe => recipe.decrement('downvotes'))
            .then(recipe => res.status(200).send({
              status: 'success',
              message: 'Vote removed',
              data: {
                id: recipe.id,
                upvotes: recipe.upvotes,
                downvotes: recipe.downvotes
              }
            }));
        }
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }
}

export default VoteHandler;
