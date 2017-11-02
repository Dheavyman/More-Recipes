import jwt from 'jsonwebtoken';

export default {
  // Generate the JWT
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
  // Verify the JWT
  verifyToken(req, res, next) {
    const token = req.body.token || req.query.token ||
                  req.headers['x-access-token'];
    if (!token) {
      return res.status(401).send({
        status: 'Fail',
        message: 'Unauthenticated access, no token provided'
      });
    } else if (token) {
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
  }
};
