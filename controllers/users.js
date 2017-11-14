const User = require('../models/User');

function showRoute(req, res, next) {
  User
    .findById(req.params.id)
    .exec()
    .then((User) => {
      if(!User) return res.notFound();
      res.json(User);
    })
    .catch(next);
}

module.exports = {
  show: showRoute
};
