angular
  .module('wdi-project-3')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['Event', '$stateParams', '$http', 'API'];

function EventsShowCtrl(Event, $stateParams, $http, API) {
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



  vm.delete = deleteComment;
  deleteComment();



  function deleteComment(comment) {
    Event
      .removeComment({id: $stateParams._id, commentId: comment})
      .$promise
      .then((data) => {
        console.log(data);
      });

  }

  // vm.comment
  // vm.delete = event => {
  //   Event
  //     .remove({ id: event._id })
  //     .$promise
  //     .then(() => {
  //       $state.go('eventsIndex');
  //     });
  // };
}








// vm.delete = event => {
//   Event
//     .remove({ id: event._id })
//     .$promise
//     .then(() => {
//       $state.go('evnetsIndex');
//     });
// };
