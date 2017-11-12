// angular
//   .module('wdi-project-3')
//   .service('currentUserService', currentUserService);
//
// currentUserService.$inject = [
//   '$auth',
//   'Member',
//   '$rootScope'
// ];
//
// function currentUserService(
//   $auth,
//   Member,
//   $rootScope
// ){
//   const self = this;
//
//   self.getUser = () => {
//     const decoded = $auth.getPayload();
//
//     if (decoded) {
//       Member
//         .get({ id: decoded.userId })
//         .$promise
//         .then(user => {
//
//           self.currentUser = user;
//           $rootScope.$broadcast('loggedIn');
//         });
//     }
//   };
//
//   self.removeUser = () => {
//     self.currentUser = null;
//     $auth.logout();
//     $rootScope.$broadcast('loggedOut');
//   };
//
//   self.getUser();
// }
