angular.module('wdi-project-3').controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['$scope', 'Event'];
function EventsIndexCtrl($scope, Event) {
  const vm = this;
  vm.events = Event.query();

  $scope.$parent.main.eventsIndex = true;

  $scope.$on('$destroy', function() {
    $scope.$parent.main.eventsIndex = false;
  });

  Event.getTicketmasterEvents().$promise.then(data => {
    vm.events = data;
  });
}
