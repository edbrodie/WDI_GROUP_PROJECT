angular
  .module('wdi-project-3')
  .controller('loginController', loginController);

loginController.$inject = [
  '$auth',
  '$state',
  'currentUserService'
];
function loginController(
  $auth,
  $state,
  currentUserService
) {
  const vm = this;

  vm.submitForm = login;

  function login() {
    $auth
      .login(vm.member)
      .then(() => {
        currentUserService.getUser();
        $state.go('eventsIndex');
      });
  }
}
