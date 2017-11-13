angular
  .module('wdi-project-3')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['Event', '$stateParams'];

function EventsShowCtrl(Event, $stateParams) {
  const vm = this;
  vm.event = Event.get($stateParams);

  // vm.delete = event => {
  //   Event
  //     .remove({ id: event._id })
  //     .$promise
  //     .then(() => {
  //       $state.go('eventsIndex');
  //     });
  // };
}
