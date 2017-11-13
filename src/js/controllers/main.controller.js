angular
  .module('wdi-project-3')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [
  '$rootScope',
  '$transitions',
  'currentUserService',
  '$state'];

function MainCtrl(
  $rootScope,
  $transitions,
  currentUserService,
  $state
) {
  const vm = this;

  vm.logout = logout;

  function logout() {
    currentUserService.removeUser();

  }

  $rootScope.$on('loggedIn', () => {
    console.log('fired mate!');
    vm.member = currentUserService.currentUser;
    console.log(vm.member);
  });

  $rootScope.$on('loggedOut', () => {
    vm.member = null;
    $state.go('home');
  });

  // vm.isNavCollapsed = true;
  //
  // $transitions.onSuccess({}, () => {
  //   vm.isNavCollapsed = true;
  // });

}
