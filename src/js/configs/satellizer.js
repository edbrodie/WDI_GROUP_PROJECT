angular.module('wdi-project-3').config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.spotify({
    url: '/api/oauth/spotify',
    clientId: '4fb106b4961949ef888c6a7bbb2a2d63'
  });
}
