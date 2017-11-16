angular.module('wdi-project-3').controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['$scope', 'Event'];

function EventsIndexCtrl($scope, Event) {
  const vm = this;
  vm.events = Event.query();

  Event.getTicketmasterEvents().$promise.then(data => {
    vm.events = data;
  });
}
