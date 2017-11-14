angular
  .module('wdi-project-3')
  .controller('registerController', registerController);

registerController.$inject = [
  '$state',
  '$auth',
  'currentUserService'
];
function registerController(
  $state,
  $auth,
  currentUserService
) {
  const vm = this;

  vm.submitForm = register;

  function register() {
    $auth
      .signup(vm.member)
      .then(() => $auth.login(vm.member))
      .then(() => {
        currentUserService.getUser();
        $state.go('eventsIndex');
      });
  }
}
