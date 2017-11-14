const rp = require('request-promise');

function getEventData(req, res) {
  rp('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&apikey=bbr8L0veZB9V45s6JSAf321OGwHhydvq') //do we need the id paramaters in here?
    .then(data => {
      return res.status(200).json(JSON.parse(data));
    });
}

module.exports = {
  event: getEventData
};
