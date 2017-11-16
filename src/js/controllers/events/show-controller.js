angular.module('wdi-project-3').controller('EventsShowCtrl', EventsShowCtrl);

EventsShowCtrl.$inject = ['Event', '$stateParams', 'Group', '$http'];

function EventsShowCtrl(Event, $stateParams, Group, $http) {
  const vm = this;

  // getting event data here
  Event.findTicketmasterEventsById({ id: $stateParams.id }).$promise.then(
    response => {
      vm.event = response;

      let artistName = vm.event.name;
      if (artistName.indexOf(' - ') >= 0) {
        artistName = artistName.split(' - ')[0].trim();
      } else if (artistName.indexOf('presents') >= 0) {
        artistName = artistName.split('presents')[1].trim();
      } else if (artistName.indexOf(',') >= 0) {
        artistName = artistName.split(',')[0].trim();
      } else if (artistName.indexOf('&') >= 0) {
        artistName = artistName.split('&')[0].trim();
      }

      //make a request to spotify
      $http({
        method: 'GET',
        url: 'https://api.spotify.com/v1/search',
        params: {
          q: artistName,
          type: 'track'
        }
      }).then(
        response => {
          vm.tracks = response.data.tracks.items.slice(0, 5);
        },
        err => {
          console.error(err);
        }
      );
    }
  );

  vm.getTrackSrc = uri => {
    return `https://open.spotify.com/embed?uri=${uri}`;
  };

  // get groups with event id.
  Group.findGroupsWithEventId({ eventId: $stateParams.id }).$promise.then(
    data => {
      console.log('groups for event', data);
      vm.groups = data;
    }
  );
}
