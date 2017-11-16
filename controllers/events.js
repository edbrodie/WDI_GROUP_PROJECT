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
    .populate('comments.createdBy')
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

function createComment(req, res, next) {

  req.body.createdBy = req.User;

  Event
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(event => {
      if(!event) return res.notFound();
      console.log('this is the current user', req.User);
      event.comments.push(req.body);
      return event.save();
    })
    .then(event => res.status(200).json(event))
    .catch(next);
}

function deleteComment(req, res, next) {
  Event
    .findById(req.params.id)
    .exec()
    .then((event) => {
      if(!event) return res.notFound();
      const comment = event.comments.id(req.params.id);
      comment.remove();


      return event.save();
    })
    .then(event => res.status(200).json(event))
    .catch(next);
}


module.exports = {
  index: eventsIndex,
  create: eventsCreate,
  show: eventsShow,
  update: eventsUpdate,
  delete: eventsDelete,
  createComment: createComment,
  deleteComment: deleteComment
};
