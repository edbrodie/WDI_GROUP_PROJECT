angular
  .module('wdi-project-3')
  .controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['Event'];

function EventsIndexCtrl(Event) {
  const vm = this;
  vm.events = Event.query();

  Event
    .getTicketmasterEvents()
    .$promise
    .then((data) => {
      console.log(data);
    });

}
