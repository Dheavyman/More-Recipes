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
    const username = req.body.username.toLowerCase().trim();
    bcrypt.hash(req.body.password, 10)
      .then((hash) => {
        User.create({
          username,
          password: hash,
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          gender: req.body.gender.toLowerCase(),
        })
          .then((user) => {
            const token = authenticate.generateToken(user);
            res.status(201).send({
              status: 'Success',
              message: 'User created',
              token,
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
      })
      .catch(error => res.status(400).send({
        message: error.message,
      }));
  }
}

export default userHandler;
