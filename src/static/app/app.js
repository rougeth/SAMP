var samp = angular.module('samp', ['ngRoute', 'ngResource']);

samp.config(function($interpolateProvider, $routeProvider) {
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');

  $routeProvider
    .when('/', {
      controller: 'HomeController',
      template: " "
    })
    .when('/buses/lines', {
      controller: 'BusLinesController',
      templateUrl: "/static/app/buses/lines.html"
    })
    .when('/buses/stops', {
      controller: 'BusStopsController',
      template: " "
    })
    .otherwise({ redirectTo: '/'});
});

samp.controller('HomeController', function($scope) {
    reset();
    console.log('HomeController');
});

samp.factory("api_stops", function($resource) {
    return $resource("/api/buses/stops");
});

samp.controller('BusStopsController', function($scope, api_stops) {
    reset();
    console.log('BusStopsController');
    var coordenate;
    api_stops.query(function(stops) {
        for(i=0; i<stops.length; i++) {
            coordenate = new google.maps.LatLng(
                stops[i].latitude,
                stops[i].longitude
            );
            add_bus_stop(coordenate);
        }
    });
    console.log(markers);
});

samp.controller('BusLinesController', function($scope, api_stops) {
    reset();
    console.log('BusLinesController');
    $('#samp-map')
        .css('height', '-webkit-calc(100vh - 104px)')
        .css('height', '-moz-cal(100vh - 104px)')
        .css('height', 'calc(100vh - 104px)');


});

function reset() {
    remove_all_markers();
    $('#samp-map')
        .css('height', '-webkit-calc(100vh - 52px)')
        .css('height', '-moz-cal(100vh - 52px)')
        .css('height', 'calc(100vh - 52px)');
}

