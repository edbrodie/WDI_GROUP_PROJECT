angular.module('wdi-project-3').config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.spotify({
    url: '/api/oauth/spotify',
    clientId: 'bc3e6c52974e4b61af90f8fd41a6726c'
  });
}
