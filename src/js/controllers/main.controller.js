angular
  .module('wdi-project-3')
  .controller('MainCtrl', MainCtrl);

MainCtrl.$inject = [
  '$rootScope',
  '$transitions',
  'currentUserService',
  '$state',
  '$window'
];

function MainCtrl(
  $rootScope,
  $transitions,
  currentUserService,
  $state,
  $window
) {
  const vm = this;
  vm.logout = logout;

  function logout() {
    currentUserService.removeUser();
    $window.localStorage.clear();
  }

  $rootScope.$on('loggedIn', () => {
    vm.member = currentUserService.currentUser;
  });

  $rootScope.$on('loggedOut', () => {
    vm.member = null;
    $state.go('home');
  });

}
