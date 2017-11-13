angular
  .module('wdi-project-3')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['Event', '$stateParams', '$state'];

function EventsShowCtrl(Event, $stateParams, $state) {
  const vm = this;
  vm.event = Event.get($stateParams);

  vm.delete = event => {
    Event
      .remove({ id: event._id })
      .$promise
      .then(() => {
        $state.go('eventsIndex');
      });
  };
}
