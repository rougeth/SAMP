angular.module('samp.buses', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/buses/stops', {
            controller: 'BusStopsController',
            template: ' '
        })
        .when('/buses/lines', {
            controller: 'BusLinesController',
            templateUrl: '/static/app/buses/templates/lines.html'
        })
        .when('/buses/route/:line', {
            controller: 'BusRouteController',
            template: ' '
        });
}])

.factory('apiStops', ['$resource', function($resource) {
    return $resource('/api/buses/stops/');
}])

.factory('apiRegions', ['$resource', function($resource) {
    return $resource('/api/buses/regions/');
}])

.factory('apiLines', ['$resource', function($resource) {
    return $resource('/api/buses/lines/');
}])

.factory('apiLinesPerRegions', ['$resource', function($resource) {
    return $resource('/api/buses/lines/:region_a/:region_b', null, {
        'query': {
            method: 'GET',
            params: {
                region_a: 'region_a',
                region_b: 'region_b'
            },
           isArray:true
        }
    });
}])

.factory('apiLineRoute', ['$resource', function($resource) {
    return $resource('/api/buses/route/:line', null, {
        'query': {
            method: 'GET',
            params: {
                line: 'line'
            },
           isArray:true
        }
    });
}])

.controller('BusStopsController', ['$scope', 'apiStops',
    function($scope, apiStops) {

    console.log('BusStopsController');
    reset();

    var coordenate;
    apiStops.query(function(stops) {
        for(i=0; i<stops.length; i++) {
            coordenate = new google.maps.LatLng(
                stops[i].latitude,
                stops[i].longitude
            );
            add_bus_stop(coordenate);
        }
    });
}])

.controller('BusLinesController', ['$scope', '$location', 'apiRegions',
        'apiLinesPerRegions', 'apiLineRoute', 'apiLines',
    function($scope, $location,  apiRegions, apiLinesPerRegions, apiLineRoute,
        apiLines) {

    console.log('BusLinesController');
    reset();

    apiRegions.query(function(regions) {
        $scope.regions = regions;
        $scope.origin = $scope.regions[0];
        $scope.destination = $scope.regions[0];
    });
    setTimeout(function() {
        $('#bus_lines').modal('show');
    }, 100);

    $scope.search = function() {
        apiLinesPerRegions.query({
            region_a: $scope.origin.name,
            region_b: $scope.destination.name
        }, function(lines) {
            console.log(lines);
            $scope.lines = lines;
        })
    }

    $scope.getLines = function() {
        apiLines.query(function(lines) {
            console.log(lines);
            $scope.lines = lines;
        })
    }

    $scope.selectLine = function(line) {
        $('#bus_lines').modal('hide');
        $location.path('/buses/route/' + line.name);
    }
}])

.controller('BusRouteController', ['$scope', '$routeParams', 'apiLineRoute',
    function($scope, $routeParams, apiLineRoute) {
        $('#bus_lines').modal('hide');

    reset();
    apiLineRoute.query({
        line: $routeParams.line
    }, function(waypoints) {
        p = waypoints;
        showRoute(p);
    });
}]);
