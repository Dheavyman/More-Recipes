import helpers from '../helpers';
import models from '../models';

const isEmpty = helpers.isEmpty;
const isAlphaNumeric = helpers.isAlphaNumeric;
const isEmail = helpers.isEmail;
const User = models.User;

/**
 * Class representing user validations
 *
 * @class UserValidation
 */
class UserValidation {
  /**
   * Check for required signup input fields
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - The next route handler function
   *
   * @returns {any} Object representing error message or
   * calls the next function
   *
   * @memberof UserValidation
   */
  static signupRequiredInputs(req, res, next) {
    if (!req.body.username || isEmpty(req.body.username)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Username required'
      });
    }

    if (!req.body.password || isEmpty(req.body.password)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Password required'
      });
    }

    if (!req.body.email || isEmpty(req.body.email)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Email required'
      });
    }

    if (!req.body.firstName || isEmpty(req.body.firstName)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Firstname required'
      });
    }

    if (!req.body.lastName || isEmpty(req.body.lastName)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Lastname required'
      });
    }
    return next();
  }

  /**
   * Validate user inputs during registration
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next The next route handler function
   *
   * @returns {any} Object representing error message or
   * call to next route handler
   *
   * @memberof UserValidation
   */
  static validUserInputs(req, res, next) {
    const username = (req.body.username).toLowerCase().trim();
    if (!isAlphaNumeric(username)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Invalid username, only alphabets and numbers allowed'
      });
    }
    if (!isEmail(req.body.email)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Invalid email address format'
      });
    }
    return next();
  }

  /**
   * Check if username already exist during signup
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next route handler function
   *
   * @returns {any} Object representing the error message or
   * call to the next route handler function
   *
   * @memberof UserValidation
   */
  static usernameExist(req, res, next) {
    const username = (req.body.username).toLowerCase().trim();
    return User
      .find({
        attributes: ['username'],
        where: {
          username,
        }
      })
      .then((user) => {
        if (!user) next();
        else {
          res.status(409).send({
            status: 'Fail',
            message: 'Username already exist'
          });
        }
      })
      .catch(error => res.status(400).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Check if email address already exist
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next route handler function
   *
   * @returns {any} Object representing the error message or
   * call to the next route handler function
   *
   * @memberof UserValidation
   */
  static emailExist(req, res, next) {
    const email = req.body.email;
    return User
      .find({
        attributes: ['email'],
        where: {
          email
        }
      })
      .then((user) => {
        if (!user) next();
        else {
          res.status(409).send({
            status: 'Fail',
            message: 'Email already exist'
          });
        }
      })
      .catch(error => res.status(400).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Check for required signin inputs fields
   *
   * @static
   *
   * @param {object} req - The request object
   * @param {any} res - The response object
   * @param {any} next - The next route handler function
   *
   * @returns {any} Object representing error message or
   * calls the next function
   *
   * @memberof UserValidation
   */
  static signinRequiredInputs(req, res, next) {
    if (!req.body.username || isEmpty(req.body.username)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Username required'
      });
    }

    if (!req.body.password || isEmpty(req.body.password)) {
      return res.status(400).send({
        status: 'Fail',
        message: 'Password required'
      });
    }
    return next();
  }

  /**
   * Check that a user exist
   *
   * @static
   *
   * @param {object} req - This is the request object
   * @param {object} res - This is the response object
   * @param {object} next - The next route handler function
   *
   * @returns {any} Object representing error message or
   * calls the next function
   *
   * @memberof UserValidation
   */
  static userExist(req, res, next) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            status: 'Fail',
            message: 'User does not exist'
          });
        }
        next();
      })
      .catch((error) => {
        if (error.message.includes('invalid input syntax for integer')) {
          return res.status(400).send({
            status: 'Error in parameter',
            message: error.message,
          });
        }
        return res.status(400).send({
          status: 'Error',
          message: error.message,
        });
      });
  }
}

export default UserValidation;
