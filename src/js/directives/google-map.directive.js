angular.module('wdi-project-3').directive('googleMap', googleMap);

googleMap.$inject = ['$window', '$timeout'];

let map = null;
let markers = [];
let locations = null;

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

        map = new $window.google.maps.Map(element[0], {
          zoom: 16,
          center: latLng
        });

        addMarker();
        // create marker with latLng values
        function addMarker() {
          const marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: 'images/dot.svg'
          });

          markers.push(marker);
        }
      }
    }
  };
}
