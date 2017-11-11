angular
  .module('wdi-project-3')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl  = '/api/login';
}
