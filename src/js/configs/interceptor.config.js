angular
  .module('wdi-project-3')
  .config(Interceptor);

Interceptor.$inject = ['$httpProvider'];
function Interceptor($httpProvider){
  $httpProvider.interceptors.push(function() {
    return {
      'request': function(config) {
        const spotifyToken = window.localStorage.getItem('spotifyToken');

        if ((config.url.startsWith('https://api.spotify.com/v1') || config.url.startsWith('https://open.spotify.com/')) && spotifyToken) {
console.log('***********************')
          delete config.headers.Authorization;
          config.headers.Authorization = `Bearer ${spotifyToken}`;
        }
        return config;
      }
    };
  });
}
