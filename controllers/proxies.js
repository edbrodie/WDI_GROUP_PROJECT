const rp = require('request-promise');


function getEventData(req, res) {
  rp('https://app.ticketmaster.com/discovery/v2/events.json?apikey=bbr8L0veZB9V45s6JSAf321OGwHhydvq')
    .then(data => {
      return res.status(200).json(JSON.parse(data));
    });
}

module.exports = {
  event: getEventData
};
