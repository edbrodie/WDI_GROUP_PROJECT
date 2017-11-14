angular
  .module('wdi-project-3')
  .controller('GroupsNewCtrl', GroupsNewCtrl);

GroupsNewCtrl.$inject = ['$stateParams', 'Group'];

function GroupsNewCtrl($stateParams, Group) {
  const vm = this;

  vm.submitForm = createGroup;

  function createGroup() {
    vm.group.eventId = $stateParams.id;
    console.log('submitted', vm.group);

    // send group to API to be saved.
    Group
      .save(vm.group)
      .$promise
      .then(group => {
        console.log('group successfully created', group);
      });
  }
}
