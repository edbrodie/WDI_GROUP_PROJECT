const express         = require('express');
const router          = express.Router();
const authentications = require('../controllers/authentications');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

module.exports = router;
