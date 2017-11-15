angular
  .module('wdi-project-3')
  .directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$timeout'];



function googleMap($window, $timeout) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map">GOOGLE MAP GOES HERE</div>',
    scope: {
      center: '='
    },
    link(scope, element) {
      $timeout(renderMap, 1000);
      function renderMap() {
        const latLng = {
          lat: parseFloat(scope.center.lat),
          lng: parseFloat(scope.center.lng)
        };

        new $window.google.maps.Map(element[0], {
          zoom: 16,
          center: latLng
        });

        // create marker with latLng values





      }
    }
  };
}
