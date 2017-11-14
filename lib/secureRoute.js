const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const User = require('../models/User');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  return jwt
    .verifyAsync(token, secret)
    .then((payload) => {
      return User.findById(payload.userId);
    })
    .then((User) => {
      if(!User) return res.unauthorized();
      req.User = User;
      return next();
    })
    .catch(next);
}

module.exports = secureRoute;
