import bcrypt from 'bcryptjs';
import middlewares from '../middlewares';
import models from '../models';

const User = models.User;
const authenticate = middlewares.authentication;

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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @return {object} Success message with the user created or error message
   *
   * @memberof UserController
   */
  static registerUser(req, res) {
    User.create(req.body)
      .then((user) => {
        const token = authenticate.generateToken(user);
        return res.status(201).send({
          status: 'Success',
          message: 'User created',
          data: {
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              fullName: user.fullName,
              notifications: user.notifications,
              token,
            }
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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} Success message after successful login or
   * error message if unsuccessful
   *
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
                user: {
                  fullName: user.fullName,
                  userImage: user.userImage,
                  token,
                },
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
   * Function to retrieve user profile
   *
   * @static
   *
   * @param {any} req - The request object
   * @param {any} res - The response object
   *
   * @returns {object} Object representing success status or
   * error status
   *
   * @memberof UserController
   */
  static userProfile(req, res) {
    return User
      .findById(req.params.userId, {
        attributes: [
          'username', 'firstName', 'lastName', 'email', 'userImage', 'aboutMe',
          'notifications'
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
   *
   * @param {object} req - The request object
   * @param {object} res - The response object
   *
   * @returns {object} Object representing success or
   * error status
   *
   * @memberof UserController
   */
  static editUserDetails(req, res) {
    let newValue;

    if (req.body.notifications === false) {
      newValue = req.body.notifications.toString();
    } else if (req.body.notifications === true) {
      newValue = req.body.notifications.toString();
    }

    return User
      .findById(req.decoded.user.id)
      .then(user => user
        .update({
          firstName: req.body.firstName || user.firstName,
          lastName: req.body.lastName || user.lastName,
          aboutMe: req.body.aboutMe || user.aboutMe,
          userImage: req.body.userImage || user.userImage,
          notifications: newValue || user.notifications,
        }))
      .then(user => res.status(200).send({
        status: 'Success',
        message: 'User profile updated',
        data: {
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            aboutMe: user.aboutMe,
            userImage: user.userImage,
            notifications: user.notifications,
          },
        },
      }))
      .catch(error => res.status(500).send({
        status: 'Error',
        message: error.message,
      }));
  }
}

export default UserController;
