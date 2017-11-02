import helpers from '../helpers';
import models from '../models';

const isEmpty = helpers.isEmpty,
  isAlphaNumeric = helpers.isAlphaNumeric,
  isEmail = helpers.isEmail,
  User = models.User;

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
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {object} next - The next route handler function
   * @returns {any} Object representing error message or
   * calls the next function
   * @memberof UserValidation
   */
  static signupRequiredInputs(req, res, next) {
    // Check if username is empty
    if (!req.body.username || isEmpty(req.body.username)) {
      return res.status(400).send({
        message: 'Username required'
      });
    }
    // Check if password is empty
    if (!req.body.password || isEmpty(req.body.password)) {
      return res.status(400).send({
        message: 'Password required'
      });
    }
    // Check if email is empty
    if (!req.body.email || isEmpty(req.body.email)) {
      return res.status(400).send({
        message: 'Email required'
      });
    }
    // Check if firstname is empty
    if (!req.body.firstName || isEmpty(req.body.firstName)) {
      return res.status(400).send({
        message: 'Firstname required'
      });
    }
    // Check if lastname is empty
    if (!req.body.lastName || isEmpty(req.body.lastName)) {
      return res.status(400).send({
        message: 'Lastname required'
      });
    }
    // Check if gender is empty
    if (!req.body.gender || isEmpty(req.body.gender)) {
      return res.status(400).send({
        message: 'Gender required'
      });
    }
    return next();
  }

  /**
   * Validate user inputs during registration
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next The next route handler function
   * @returns {any} Object representing error message or
   * call to next route handler
   * @memberof UserValidation
   */
  static validUserInputs(req, res, next) {
    const username = (req.body.username).toLowerCase().trim();
    if (!isAlphaNumeric(username)) {
      return res.status(400).send({
        message: 'Invalid username, only alphabets and numbers allowed'
      });
    }
    if (!isEmail(req.body.email)) {
      return res.status(400).send({
        message: 'Invalid email address format'
      });
    }
    return next();
  }

  /**
   * Check if username already exist during signup
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next route handler function
   * @returns {any} Object representing the error message or
   * call to the next route handler function
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
        message: error.message,
      }));
  }

  /**
   * Check if email address already exist
   *
   *@static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @param {function} next - The next route handler function
   * @returns {any} Object representing the error message or
   * call to the next route handler function
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
        message: error.message,
      }));
  }

  /**
   * Check for required signin inputs fields
   *
   * @static
   * @param {object} req - The request object
   * @param {any} res - The response object
   * @param {any} next - The next route handler function
   * @returns {any} Object representing error message or
   * calls the next function
   * @memberof UserValidation
   */
  static signinRequiredInputs(req, res, next) {
    // Check if username is empty
    if (!req.body.username || isEmpty(req.body.username)) {
      return res.status(401).send({
        message: 'Username required'
      });
    }
    // Check if password is empty
    if (!req.body.password || isEmpty(req.body.password)) {
      return res.status(401).send({
        message: 'Password required'
      });
    }
    return next();
  }

  /**
   * Check that a user exist
   *
   * @static
   * @param {object} req - This is the request object
   * @param {object} res - This is the response object
   * @param {object} next - The next route handler function
   * @returns {any} Object representing error message or
   * calls the next function
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
      });
  }
}

export default UserValidation;
