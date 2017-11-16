angular
  .module('wdi-project-3')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl  = '/api/login';

  $authProvider.spotify({
    url: '/api/oauth/spotify',
    clientId: '56040fdca6a54d408d368c137400c288'
  });
}
