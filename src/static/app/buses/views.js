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
        })
        .when('/buses/find-bus', {
            controller: 'FindBusController',
            templateUrl: '/static/app/buses/templates/find-bus.html'
        })
        .when('/buses/track/:line', {
            controller: 'trackerController',
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

.factory('apiBuses', ['$resource', function($resource) {
    return $resource('/api/buses/buses/');
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

.factory('apiTracker', ['$resource', function($resource) {
    return $resource('/api/buses/track/:line', null, {
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
}])

.controller('FindBusController', ['$scope', '$location', 'apiLines',
    function($scope, $location, apiLines) {

    reset();
    setTimeout(function() {
        $('#find-bus').modal('show');
    }, 100);

    apiLines.query(function(lines) {
        console.log(lines);
        $scope.lines = lines;
    })

    $scope.trackLine = function(line) {
        $('#find-bus').modal('hide');
        $location.path('/buses/track/' + line.name);
    }
}])

.controller('trackerController', ['$scope', '$routeParams', 'apiTracker', 'apiLineRoute',
    function($scope, $routeParams, apiTracker, apiLineRoute) {

    reset();
    console.log('tracker');
    apiTracker.query({
        line: $routeParams.line
    }, function(position) {
        var i = 0;
        for(i=0; i<position.length; i++) {
            console.log(position[i].latitude, position[i].longitude);
            add_bus(latlng(
                position[i].latitude,
                position[i].longitude
            ));
        }
    });

    apiLineRoute.query({
        line: $routeParams.line
    }, function(waypoints) {
        p = waypoints;
        showRoute(p);
    });

    setInterval(function () {
        $scope.$apply(function () {
            apiTracker.query({
                line: $routeParams.line
            }, function(position) {
                var i = 0;
                for(i=0; i<position.length; i++) {
                    buses[i].setPosition({
                        lat: position[i].latitude,
                        lng: position[i].longitude
                    });
                }
            });
        });
    }, 3000);

}]);
