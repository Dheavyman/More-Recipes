import jwt from 'jsonwebtoken';

export default {
  /**
   * Generate token
   *
   * @param {object} user - User details
   *
   * @returns {string} Token
   */
  generateToken(user) {
    const token = jwt.sign({
      user: {
        id: user.id
      }
    }, process.env.SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    return token;
  },

  /**
   * Verify token
   *
   * @param {any} req - The request object
   * @param {any} res - The response object
   * @param {any} next - Call next route handler
   *
   * @returns {any} Object representing error status
   */
  verifyToken(req, res, next) {
    const token = req.body.token || req.query.token ||
                  req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 'Fail',
        message: 'Unauthenticated access, no token provided'
      });
    }
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) {
        if (err.message.includes('token')) {
          return res.status(401).send({
            status: 'Error',
            message: 'Invalid token'
          });
        }
        return res.status(401).send({
          status: 'Error',
          message: err.message,
        });
      }
      req.decoded = decoded;
      return next();
    });
  }
};
