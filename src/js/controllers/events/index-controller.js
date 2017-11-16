angular
  .module('wdi-project-3')
  .controller('EventsIndexCtrl', EventsIndexCtrl);

EventsIndexCtrl.$inject = ['$scope', 'Event', '$stateParams'];



function EventsIndexCtrl($scope, Event, $stateParams) {
  let counter = 0;
  const vm = this;
  vm.events = Event.query();

  Event
    .getTicketmasterEvents()
    .$promise
    .then(data => {
      vm.events = data;
      console.log(data);
    });


  $scope.like = function() {
    console.log('like');
    $scope.likeCount += 1;
    console.log(likeCount);


    counter = counter++;
    console.log(counter);
  };

  function like() {
    console.log('hi');
    // let counter = 0;
    // counter = counter++;
  }


}
