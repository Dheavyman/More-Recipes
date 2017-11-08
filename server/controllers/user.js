import bcrypt from 'bcryptjs';
import middlewares from '../middlewares';
import models from '../models';

const User = models.User,
  Favorite = models.Favorite,
  Recipe = models.Recipe,
  authenticate = middlewares.authentication;

/**
 * Class representing user handler
 *
 * @class userHandler
 */
class userHandler {
  /**
   * Register a user on the platform
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the user created or error message
   * @memberof userHandler
   */
  static registerUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.status(201).send({
          status: 'Success',
          message: 'User created',
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            gender: user.gender
          }
        });
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Sign in a user on the platform
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Success message after successful login or
   * error message if unsuccessful
   * @memberof userHandler
   */
  static signinUser(req, res) {
    return User
      .findOne({
        where: {
          username: req.body.username.toLowerCase().trim(),
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            status: 'Fail',
            message: 'Username or password incorrect'
          });
        }
        const hash = user.password;
        bcrypt.compare(req.body.password, hash)
          .then((confirmed) => {
            if (!confirmed) {
              return res.status(401).send({
                status: 'Fail',
                message: 'Username or password incorrect'
              });
            }
            const token = authenticate.generateToken(user);
            return res.status(200).send({
              status: 'Success',
              message: 'Login successful',
              data: {
                token
              }
            });
          })
          .catch(error => res.status(400).send({
            message: error.message,
          }));
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }

  /**
   * Retrieve all user favorite recipes
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing success status or
   * error stattus
   * @memberof userHandler
   */
  static userFavorites(req, res) {
    return User
      .findById(req.params.userId, {
        attributes: ['firstName', 'lastName'],
        include: [{
          model: Favorite,
          attributes: ['recipeId'],
          include: [{
            model: Recipe,
            attributes: [
              'title', 'description', 'preparationTime', 'ingredients',
              'directions', 'upvotes', 'downvotes', 'views'
            ]
          }]
        }],
      })
      .then(user => res.status(200).send({
        status: 'Success',
        message: 'Favorites retrieved',
        data: {
          user
        }
      }))
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }
}

export default userHandler;
