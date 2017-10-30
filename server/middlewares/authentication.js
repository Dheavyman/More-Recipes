import jwt from 'jsonwebtoken';

export default {
  // Generate the JWT
  generateToken(user) {
    const token = jwt.sign({
      user: {
        id: user.id,
        username: user.username,
      }
    }, 'awesome_secret', {
      expiresIn: 60 * 60 * 24,
    });
    return token;
  },
  // Verify the JWT
  verifyToken(req, res, next) {
    const token = req.body.token || req.query.token ||
                  req.headers['x-access-token'];
    if (!token) {
      return res.status(403).send({
        status: 'Fail',
        message: 'Unauthenticated access, no token provided'
      });
    } else if (token) {
      jwt.verify(token, 'awesome_secret', (err, decoded) => {
        if (err) {
          return res.status(403).send({
            message: err.message,
          });
        }
        req.decoded = decoded;
        return next();
      });
    }
  }
};
