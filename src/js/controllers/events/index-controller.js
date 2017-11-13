angular
  .module('wdi-project-3')
  .controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['$http', 'Event'];

function EventsIndexCtrl($http, Event) {
  const vm = this;
  vm.events = Event.query();
  // console.log('Hi');

  Event
    .getTicketmasterEvents()
    .$promise
    .then(data => {
      console.log(data._embedded.events);
    });
}
