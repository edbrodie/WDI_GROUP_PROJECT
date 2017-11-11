const express         = require('express');
const router          = express.Router();
const authentications = require('../controllers/authentications');
// const members         = require('../controllers/members');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

// router.route('/members')
//   .get(members.index);
// router.route('/members/:id')
//   .get(members.show)
//   .put(members.update)
//   .delete(members.delete);

module.exports = router;
