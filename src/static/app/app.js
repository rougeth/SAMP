var samp = angular.module('samp', ['ngRoute']);
samp.config(function($interpolateProvider, $routeProvider) {
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');

  $routeProvider
    .when('/', {
      controller: 'HomeController',
      template: " "
    })
    .when('/buses/stops', {
      controller: 'BusesStopsController',
      template: " "
    })
    .otherwise({ redirectTo: '/'});
});

samp.controller('HomeController', function($scope) {
    console.log('HomeController');
    remove_markers();
});

samp.controller('BusesStopsController', function($scope) {
    console.log('BusesStopsController');
    var brasilia = new google.maps.LatLng(-15.7929449, -47.8882138);
    add_marker(brasilia);
});
