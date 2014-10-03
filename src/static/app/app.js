var samp = angular.module('samp', ['ngRoute', 'ngResource']);

samp.config(function($interpolateProvider, $routeProvider) {
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');

  $routeProvider
    .when('/', {
      controller: 'HomeController',
      template: " "
    })
    .when('/buses/stops', {
      controller: 'BusStopsController',
      template: " "
    })
    .otherwise({ redirectTo: '/'});
});

samp.controller('HomeController', function($scope) {
    console.log('HomeController');
    remove_markers();
});

samp.factory("getStops", function($resource) {
    return $resource("/api/buses/stops");
});

samp.controller('BusStopsController', function($scope, getStops) {
    console.log('BusStopsController');
    var coordenate;
    getStops.query(function(stops) {
        for(i=0; i<stops.length; i++) {
            coordenate = new google.maps.LatLng(
                stops[i].latitude,
                stops[i].longitude
            );
            add_marker(coordenate);
        }
    });
    console.log(markers);
});
