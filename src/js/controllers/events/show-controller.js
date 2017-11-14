angular
  .module('wdi-project-3')
  .controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['Event', '$stateParams', '$http', 'API'];

function EventsShowCtrl(Event, $stateParams, $http, API) {
  const vm = this;

  Event
    .get({ id: $stateParams.id })
    .$promise
    .then(data => {
      vm.event = data;
      console.log(vm.event);
      $http
        .get(`${API}/getEventData`)
        .then(response => {
          // console.log(response.data);
          vm.individualEvent = response.data;
          // console.log(vm.individualEvent);
        });
    });
}








// vm.delete = event => {
//   Event
//     .remove({ id: event._id })
//     .$promise
//     .then(() => {
//       $state.go('evnetsIndex');
//     });
// };
