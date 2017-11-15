angular
  .module('wdi-project-3')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams'];

function GroupsShowCtrl(Group, $stateParams) {
  const vm = this;
  vm.createComment = createComment;
  vm.group = Group.get($stateParams);

  function createComment() {
    Group
      .addComment($stateParams, vm.comment)
      .$promise
      .then(data => {
        console.log('hi');
        vm.comment = null;
        vm.event.comments = data.comments;
      });
  }

  vm.handleClick = joinGroup;

  function joinGroup() {
    Group
      .joinGroup({ groupId: $stateParams.id })
      .$promise
      .then(data => {
        console.log('groups for event', data);
        // vm.groups = data;
      });
  }

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


}
