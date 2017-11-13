const express           = require('express');
const router            = express.Router();
const authentications   = require('../controllers/authentications');
const secureRoute       = require('../lib/secureRoute');
const members           = require('../controllers/members');
const events            = require('../controllers/events');
const proxies           = require('../controllers/proxies');


router.route('/register')
  .post(authentications.register);

router.route('/login')
  .post(authentications.login);

router.route('/members/:id')
  .all(secureRoute)
  .get(members.show);

router.route('/events')
  .get(events.index)
  .post(events.create);

router.route('/events/:id')
  .get(events.show)
  .put(events.update)
  .patch(events.update)
  .delete(events.delete);

router.route('/getEventData')
  .get(proxies.event);
<<<<<<< HEAD


=======
>>>>>>> 624b02bfad99b2fe911c991e3e2b27193bcd1340


router.all('/*', (req, res) => res.notFound());

module.exports = router;
