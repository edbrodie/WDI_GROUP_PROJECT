const Event = require('../models/event');

function eventsIndex(req, res) {
  Event
    .find()
    .exec()
    .then(events => res.status(200).json(events))
    .catch(() => res.status(500).json({ message: 'Something went wrong with the server'}));
}

function eventsShow(req, res) {
  Event
    .findById(req.params.id)
    .exec()
    .then(event => res.status(200).json(event))
    .catch(() => res.status(500).json({message: 'Something went wrong.'}));
}

function eventsCreate(req, res) {
  Event
    .create(req.body)
    .then(event => res.status(201).json(event))
    .catch(() => res.status(500).json({message: 'Something went wrong.'}));
}

function eventsUpdate(req, res) {
  Event
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .exec()
    .then(event => res.status(200).json(event))
    .catch(() => res.status(500).json({message: 'Something went wrong.'}));
}

function eventsDelete(req, res) {
  Event
    .findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(() => res.status(500).json({message: 'Something went wrong.'}));
}

module.exports = {
  index: eventsIndex,
  create: eventsCreate,
  show: eventsShow,
  update: eventsUpdate,
  delete: eventsDelete
};
