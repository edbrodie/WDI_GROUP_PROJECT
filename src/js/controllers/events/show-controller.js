angular
  .module('wdi-project-3')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['Event', '$stateParams', 'Group'];
function EventsShowCtrl(Event, $stateParams, Group) {
  const vm = this;
  // vm.createComment = createComment;

  // getting event data here
  Event
    .findTicketmasterEventsById({ id: $stateParams.id })
    .$promise
    .then(response => {
      vm.event = response;
      console.log('this is the response', vm.event);
    });


  // get groups with event id.
  Group
    .findGroupsWithEventId({ eventId: $stateParams.id })
    .$promise
    .then(data => {
      console.log('groups for event', data);
      vm.groups = data;
    });


  // function createComment() {
  //   Event
  //     .addComment($stateParams, vm.comment)
  //     .$promise
  //     .then(data => {
  //       console.log('hi');
  //       vm.comment = null;
  //       vm.event.comments = data.comments;
  //     });
  // }



  // vm.delete = deleteComment;
  // deleteComment();



  // function deleteComment($stateParams, vm.comment) {
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
  //     .findById(req.$stateParams.id)
  //     .exec()
  //     .then(event => {
  //       if(!event) return res.status(404).json({ message: 'No comment found!'});
  //       const comment = event.comments.find(obj => obj.id);
  //       comment.remove();
  //       event.save();
  //     })
  //     .then(event => res.status(200).json(event))
  //     .catch(err => res.status(500).json(err));
  // }







}
