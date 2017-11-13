angular
  .module('wdi-project-3')
  .controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['$http', 'Event'];

function EventsIndexCtrl($http, Event) {
  const vm = this;
  vm.events = Event.query();


  console.log('hi');
  // getEvents();


  // 
  // function getEvents() {
  //   console.log('hello');
  //   $http.get('https://app.ticketmaster.com/discovery/v2/events.json?apikey=bbr8L0veZB9V45s6JSAf321OGwHhydvq')
  //     .then((response) => {
  //       console.log(response);
  //
  //     });
  // }
}
