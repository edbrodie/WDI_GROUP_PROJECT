const Promise = require('bluebird');
const jwt = Promise.promisifyAll(require('jsonwebtoken'));
const { secret } = require('../config/environment');
const Member = require('../models/member');

function secureRoute(req, res, next) {
  if(!req.headers.authorization) return res.unauthorized();

  const token = req.headers.authorization.replace('Bearer ', '');

  return jwt
    .verifyAsync(token, secret)
    .then((payload) => {
      return Member.findById(payload.userId);
    })
    .then((member) => {
      if(!member) return res.unauthorized();
      req.member = member;
      return next();
    })
    .catch(next);
}

module.exports = secureRoute;
