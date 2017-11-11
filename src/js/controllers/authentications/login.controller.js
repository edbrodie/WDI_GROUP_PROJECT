angular
  .module('wdi-project-3')
  .controller('loginController', loginController);

loginController.$inject = [
  '$auth',
  '$state'
];
function loginController(
  $auth,
  $state
) {
  const vm = this;

  vm.submitForm = login;

  function login() {
    $auth
      .login(vm.user)
      .then(() => {
        $state.go('/register');
      });
  }
}
