angular
  .module('wdi-project-3')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'currentUserService'];

function GroupsShowCtrl(Group, $stateParams, currentUserService) {
  const vm = this;
  vm.createComment = createComment;
  vm.checkIfAttending = checkIfAttending;

  Group
    .get($stateParams)
    .$promise
    .then(response => {
      vm.group = response;
      vm.user = currentUserService.currentUser;

      vm.toggleJoinButton = checkIfAttending();
    });

  function createComment() {
    Group
      .addComment({id: $stateParams.id}, vm.comment)
      .$promise
      .then(() => {
        vm.comment = null;
        vm.group = Group.get($stateParams);
        // vm.event.comments = data.comments;
      });
  }

  function checkIfAttending() {
    const currentUserInArray = vm.group.attendees.find(user => {
      return user.id === vm.user.id;
    });

    if (currentUserInArray) {
      return true;
    } else {
      return false;
    }
  }

  vm.handleClick = joinGroup;

  function joinGroup() {
    console.log('clicked!');

    Group
      .joinGroup({ id: $stateParams.id }, {})
      .$promise
      .then(() => {
        vm.group.attendees.push(vm.user);
        vm.toggleJoinButton = checkIfAttending();
      });
  }

  vm.delete = deleteComment;

  // deleteComment();

  function deleteComment(commentId) {
    Group
      .removeComment({id: vm.group._id, commentId: commentId})
      .$promise
      .then((data) => {
        vm.comment = null;
        vm.group = Group.get($stateParams);
        console.log(data);
      });


  }


}
