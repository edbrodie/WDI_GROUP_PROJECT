const rp = require('request-promise');

function getEventData(req, res) {
  rp('https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&apikey=bbr8L0veZB9V45s6JSAf321OGwHhydvq')
    .then(response => {
      const data = JSON.parse(response);
      return res.status(200).json(data._embedded.events);
    });
}

function showEventData(req, res) {
  rp(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=GB&apikey=bbr8L0veZB9V45s6JSAf321OGwHhydvq&id=${req.params.id}`)
    .then(response => {
      console.log(req.params.id);
      console.log(response);
      const data = JSON.parse(response);
      console.log(data._embedded.events[0]);
      return res.status(200).json(data._embedded.events[0]);
    });
}



module.exports = {
  event: getEventData,
  show: showEventData
};
