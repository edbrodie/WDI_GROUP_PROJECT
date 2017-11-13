angular
  .module('wdi-project-3')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['Event', '$stateParams'];

function EventsShowCtrl(Event, $stateParams) {
  const vm = this;
  vm.event = Event.get($stateParams);

  vm.createComment = createComment;

  function createComment() {
    Event
      .addComment($stateParams, vm.comment)
      .$promise
      .then(data => {
        vm.comment = null;
        vm.event.comments = data.comments;
      });
  }



  // vm.delete = deleteComment;
  // deleteComment();



  // function deleteComment(comment) {
  //   Event
  //     .removeComment({id: $stateParams._id, commentId: comment})
  //     .$promise
  //     .then((data) => {
  //       console.log(data);
  //     });
  //
  // }


  // function deleteComment(req, res) {
  //   Event
  //     .findById(req.params.id)
  //     .exec()
  //     .then(bar => {
  //       if(!bar) return res.status(404).json({ message: 'No bar found!'});
  //       const comment = bar.comments.find(obj => obj.id);
  //       comment.remove();
  //       bar.save();
  //     })
  //     .then(bar => res.status(200).json(bar))
  //     .catch(err => res.status(500).json(err));
  // }







}
