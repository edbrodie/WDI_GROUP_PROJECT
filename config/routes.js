const express         = require('express');
const router          = express.Router();
const authentications = require('../controllers/authentications');
const secureRoute     = require('../lib/secureRoute');
const members           = require('../controllers/members');

router.route('/register')
  .post(authentications.register);
router.route('/login')
  .post(authentications.login);

router.route('/members/:id')
  .all(secureRoute)
  .get(members.show);

//RESTful EVENTS NEEDED



router.all('/*', (req, res) => res.notFound());

module.exports = router;
