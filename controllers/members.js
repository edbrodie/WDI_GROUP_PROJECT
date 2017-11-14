const Member = require('../models/member');

function showRoute(req, res, next) {
  Member
    .findById(req.params.id)
    .exec()
    .then((member) => {
      if(!member) return res.notFound();
      res.json(member);
    })
    .catch(next);
}

module.exports = {
  show: showRoute
};
