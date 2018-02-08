angular.module('wdi-project-3').config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.spotify({
    url: '/api/oauth/spotify',
    clientId: '67587b50e5d3445a99d3999da34bb999'
  });
}
