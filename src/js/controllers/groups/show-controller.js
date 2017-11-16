angular
  .module('wdi-project-3')
  .controller('GroupsShowCtrl', GroupsShowCtrl);

GroupsShowCtrl.$inject = ['Group', '$stateParams', 'currentUserService', '$http', 'Event'];
function GroupsShowCtrl(Group, $stateParams, currentUserService, $http, Event) {
  const vm = this;
  vm.createComment = createComment;
  vm.checkIfAttending = checkIfAttending;

  function getGroup() {
    Group
      .get({id: $stateParams.id})
      .$promise
      .then(response => {
        vm.group = response;
        vm.user = currentUserService.currentUser;
        vm.toggleJoinButton = checkIfAttending();

        Event
          .findTicketmasterEventsById({ id: vm.group.eventId })
          .$promise
          .then(response => {
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
            }).then(response => {
              vm.tracks = response.data.tracks.items.slice(0, 3);
            }, err => {
              console.error(err);
            });
          });
      });
  }

  vm.getTrackSrc = (uri) => {
    return `https://open.spotify.com/embed?uri=${uri}`;
  };


  getGroup();

  function createComment() {
    Group
      .addComment({id: $stateParams.id}, vm.comment)
      .$promise
      .then(() => {
        vm.comment = null;
        vm.group = Group.get($stateParams);
        // vm.event.comments = data.comments;
      });
  }

  function checkIfAttending() {
    const currentUserInArray = vm.group.attendees.find(user => {
      return user.id === vm.user.id;
    });

    if (currentUserInArray) {
      return true;
    } else {
      return false;
    }
  }

  vm.handleClick = joinGroup;

  function joinGroup() {
    console.log('clicked!');

    Group
      .joinGroup({ id: $stateParams.id }, {})
      .$promise
      .then(() => {
        vm.group.attendees.push(vm.user);
        vm.toggleJoinButton = checkIfAttending();
      });
  }

  vm.delete = deleteComment;

  // deleteComment();

  function deleteComment(comment) {
    Group
      .removeComment({id: vm.group._id, commentId: comment._id})
      .$promise
      .then((data) => {
        vm.comment = null;
        getGroup();
        // vm.group = Group.get($stateParams);
        console.log(data);
      });


  }

}
