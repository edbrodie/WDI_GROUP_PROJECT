angular
  .module('wdi-project-3')
  .config(Auth);

Auth.$inject = ['$authProvider'];
function Auth($authProvider) {
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl  = '/api/login';

  $authProvider.spotify({
    url: '/api/oauth/spotify',
    clientId: '05542d6343b941b78ee07c47e3dc0793'
  });
}
