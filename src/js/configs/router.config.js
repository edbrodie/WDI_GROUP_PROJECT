angular
  .module('wdi-project-3')
  .config(Router);

Router.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  '$locationProvider'
];
function Router(
  $stateProvider,
  $urlRouterProvider,
  $locationProvider
){
  $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: '/js/views/home.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: 'js/views/authentications/register.html',
      controller: 'registerController as vm'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'js/views/authentications/login.html',
      controller: 'loginController as vm'
    })
    .state('eventsIndex', {
      url: '/events',
      templateUrl: '/js/views/events/index.html',
      controller: 'EventsIndexCtrl as vm'
    })
    .state('eventsShow', {
      url: '/events/:id',
      templateUrl: '/js/views/events/show.html',
      controller: 'EventsShowCtrl as vm'
    })
    .state('groupsNew', {
      url: '/groups/new/:id',
      templateUrl: '/js/views/groups/new.html',
      controller: 'GroupsNewCtrl as vm'
    });


  $urlRouterProvider.otherwise('/');
}
