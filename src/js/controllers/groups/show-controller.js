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
    console.log('clicked!');

    Group
      .joinGroup({ groupId: $stateParams.id })
      .$promise
      .then(data => {
        console.log('joined group', data);
        // vm.groups = data;
      });
  }


}
