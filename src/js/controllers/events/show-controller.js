angular
  .module('wdi-project-3')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['Event', '$stateParams', '$http'];

function EventsShowCtrl(Event, $stateParams, $http) {
  const vm = this;
  // vm.event = Event.get($stateParams);
  // console.log(vm.event.id);
  Event
    .get({ id: $stateParams.id })
    .$promise
    .then(data => {
      vm.event = data;
      $http
        .getTicketmasterEvents()
        .then(response => {
          console.log(response.data);
          vm.tmevent = response.data;
          console.log(vm.tmevent);
        });
    });
}
