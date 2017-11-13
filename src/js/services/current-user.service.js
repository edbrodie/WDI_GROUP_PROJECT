angular
  .module('wdi-project-3')
  .service('currentUserService', currentUserService);

currentUserService.$inject = [
  '$auth',
  '$rootScope',
  'Member'
];

function currentUserService(
  $auth,
  $rootScope,
  Member
){
  const self = this;

  self.getUser = () => {
    const decoded = $auth.getPayload();

    if (decoded) {
      Member
        .get({ id: decoded.userId })
        .$promise
        .then(data => {

          self.currentUser = data;
          $rootScope.$broadcast('loggedIn');
        });
    }
  };

  self.removeUser = () => {
    self.currentUser = null;
    $auth.logout();
    $rootScope.$broadcast('loggedOut');
  };

  self.getUser();
}
