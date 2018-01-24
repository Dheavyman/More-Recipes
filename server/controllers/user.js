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
class UserController {
  /**
   * Register a user on the platform
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @return {object} Success message with the user created or error message
   * @memberof UserController
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
            notifications: user.notifications,
          }
        });
      })
      .catch(error => res.status(500).send({
        status: 'Error',
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
   * @memberof UserController
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
              message: 'User logged in',
              data: {
                token,
              }
            });
          })
          .catch(error => res.status(500).send({
            status: 'Error',
            message: error.message,
          }));
      })
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Enable notifications for a user
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing success status or
   * error status
   * @memberof UserController
   */
  static enableNotifications(req, res) {
    return User
      .findById(req.decoded.user.id)
      .then(user => user
        .update({
          notifications: true,
        }))
      .then(() => res.status(200).send({
        status: 'Success',
        message: 'Notifications enabled',
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Disable notifications for a user
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing success status or
   * error status
   * @memberof UserController
   */
  static disableNotifications(req, res) {
    return User
      .findById(req.decoded.user.id)
      .then(user => user
        .update({
          notifications: false,
        }))
      .then(() => res.status(200).send({
        status: 'Success',
        message: 'Notifications disabled',
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Function to retrieve user profile
   *
   * @static
   * @param {any} req - The request object
   * @param {any} res - The response object
   * @returns {object} Object representing success status or
   * error status
   * @memberof UserController
   */
  static userProfile(req, res) {
    return User
      .findById(req.params.userId, {
        attributes: [
          'username', 'firstName', 'lastName', 'email', 'phone', 'userImage',
          'aboutMe'
        ]
      })
      .then(user => res.status(200).send({
        status: 'Success',
        message: 'User profile retrieved',
        data: {
          user,
        }
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Function to edit user profile details
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing success or
   * error status
   * @memberof UserController
   */
  static editUserDetails(req, res) {
    return User
      .findById(req.decoded.user.id)
      .then(user => user
        .update({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          phone: req.body.phone,
          aboutMe: req.body.aboutMe,
        }))
      .then(user => res.status(200).send({
        status: 'Success',
        message: 'User details updated',
        data: {
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userImage: user.userImage,
          notifications: user.notifications,
          aboutMe: user.aboutMe,
        }
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }

  /**
   * Function to edit the user profile image
   *
   * @static
   * @param {object} req - The request object
   * @param {object} res - The response object
   * @returns {object} Object representing success or
   * error status
   * @memberof UserController
   */
  static editUserImage(req, res) {
    return User
      .findById(req.decoded.user.id)
      .then(user => user
        .update({
          userImage: req.body.userImage,
        }))
      .then(user => res.status(200).send({
        status: 'Success',
        message: 'User image updated',
        data: {
          userImage: user.userImage,
        }
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }
}

export default UserController;
