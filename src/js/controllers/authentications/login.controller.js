angular
  .module('wdi-project-3')
  .controller('loginController', loginController);

loginController.$inject = [
  '$auth',
  '$state',
  '$window',
  'currentUserService'
];
function loginController(
  $auth,
  $state,
  $window,
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

  vm.authenticate = (provider) => {
    $auth
      .authenticate(provider)
      .then(response => {
        $window.localStorage.setItem('spotifyToken', response.data.spotifyToken);
        currentUserService.getUser();
        $state.go('eventsIndex');
      })
      .catch(function(err) {
        console.log(err);
      });
  };
}
