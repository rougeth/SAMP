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
    .when('/subways/stops', {
      controller: 'SubwayStopsController',
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

samp.factory("api_stops_subway", function($resource) {
    return $resource("/api/subways/stops");
});

samp.factory("api_regions", function($resource) {
    return $resource("/api/buses/regions");
});

samp.factory("api_regions_subway", function($resource) {
    return $resource("/api/subways/regions");
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

samp.controller('SubwayStopsController', function($scope, api_stops_subway) {
    reset();
    console.log('SubwayStopsController');
    var coordenate;
    api_stops_subway.query(function(stops) {
        for(i=0; i<stops.length; i++) {
            coordenate = new google.maps.LatLng(
                stops[i].latitude,
                stops[i].longitude
            );
            add_subway_stop(coordenate);
        }
    });
    console.log(markers);
});

samp.controller('BusLinesController', function($scope, api_regions) {
    reset();
    console.log('BusLinesController');
    api_regions.query(function(regions) {
        $scope.regions = regions;
        $scope.origin = $scope.regions[0];
        $scope.destination = $scope.regions[0];
    });
    setTimeout(function() {
        $('#bus_lines').modal('show');
    }, 100);
});

function reset() {
    remove_all_markers();
    $('#samp-map')
        .css('height', '-webkit-calc(100vh - 52px)')
        .css('height', '-moz-cal(100vh - 52px)')
        .css('height', 'calc(100vh - 52px)');
}

