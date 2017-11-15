const Group = require('../models/Group');

function groupsIndex(req, res) {
  Group
    .find({ eventId: req.params.eventId })
    .exec()
    .then(groups => res.status(200).json(groups))
    .catch(() => res.status(500).json({ message: 'Something went wrong with the server'}));
}

function groupsShow(req, res) {
  Group
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(group => res.status(200).json(group))
    .catch(() => res.status(500).json({message: 'Something went wrong.'}));
}

function groupsCreate(req, res) {
  req.body.createdBy = req.user.userId;
  req.body.attendees = [req.user.userId];

  Group
    .create(req.body)
    .then(group => res.status(201).json(group))
    .catch((err) => console.log(err));
}

// function groupsJoin(req, res) {
//   Group
//     .findById(req.params.id)
//     .exec()
//     .then(req.body.attendees.push(req.user.userId))
//     .then(group => res.status(201).json(group))
//     .catch((err) => console.log(err));
//   console.log(req.params.id);
// }
//

function groupsUpdate(req, res) {
  Group
    .findByIdAndUpdate(req.params.id, req.body, {new: true})
    .exec()
    .then(group => res.status(200).json(group))
    .catch(() => res.status(500).json({message: 'Something went wrong.'}));
}

function groupsDelete(req, res) {
  Group
    .findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(() => res.status(500).json({message: 'Something went wrong.'}));
}

function groupsJoin(req, res) {

  // 1) find group by id from req.params
  Group
    .findById(req.params.id)

  // 2) once group is passed back from query, add current user id from the token into the array of attendees
    .then(group => {
      group.attendees.push(req.user.userId);
      group.save();
      return res.status(200).json(group);
    });
}

function createComment(req, res, next) {

  req.body.createdBy = req.member;

  Group
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(group => {
      if(!group) return res.notFound();
      console.log('this is the current user', req.member);
      group.comments.push(req.body);
      return group.save();
    })
    .then(group => res.status(200).json(group))
    .catch(next);
}

function deleteComment(req, res, next) {
  Group
    .findById(req.params.id)
    .exec()
    .then((Group) => {
      if(!Group) return res.notFound();
      const comment = Group.comments.id(req.params.commentId);
      comment.remove();

      return Group.save();
    })
    .then(Group => res.status(200).json(Group))
    .catch(next);
}


module.exports = {
  index: groupsIndex,
  create: groupsCreate,
  join: groupsJoin,
  show: groupsShow,
  update: groupsUpdate,
  delete: groupsDelete,
  createComment: createComment,
  deleteComment: deleteComment
};
