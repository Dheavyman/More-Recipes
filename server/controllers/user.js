import bcrypt from 'bcryptjs';
import middlewares from '../middlewares';
import models from '../models';

const User = models.User,
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
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          gender: user.gender
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
          res.status(401).send({
            status: 'Fail',
            message: 'User does not exist'
          });
        }
        const hash = user.password;
        bcrypt.compare(req.body.password, hash).then((confirmed) => {
          if (!confirmed) {
            res.status(401).send({
              status: 'Fail',
              message: 'Invalid password'
            });
          }
          const token = authenticate.generateToken(user);
          res.status(200).send({
            status: 'Success',
            message: 'Login successful',
            token
          });
        });
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }
}

export default userHandler;
