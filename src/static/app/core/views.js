angular.module('samp.core', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/how-to-get', {
            controller: 'HowToGetController',
            templateUrl: '/static/app/core/templates/how-to-get.html'
        });
}])

.factory('apiSubwayStations', ['$resource', function($resource) {
    return $resource('/api/subways/stations/');
}])

.factory('apiSubwayRegions', ['$resource', function($resource) {
    return $resource('/api/subways/regions/');
}])

.factory('apiStopsPerRadius', ['$resource', function($resource) {
    return $resource('/api/buses/stops/radius/:lat/:lng', null, {
        'query': {
            method: 'GET',
            params: {
                lat: 'lat',
                lng: 'lng'
            },
           isArray:true
        }
    });
}])

.factory('apiLinesPerRadius', ['$resource', function($resource) {
    return $resource('/api/buses/lines/radius/:lat1/:lng1/:lat2/:lng2', null, {
        'query': {
            method: 'GET',
            params: {
                lat1: 'lat1',
                lng1: 'lng1',
                lat2: 'lat2',
                lng2: 'lng2'
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

.controller('HowToGetController', ['$scope', 'apiStopsPerRadius', 'apiLinesPerRadius', 'apiLineRoute',
    function($scope, apiStopsPerRadius, apiLinesPerRadius, apiLineRoute) {
    reset();
    $scope.optLine = false;

    ctrl ='howToGet';
    $('#samp-map')
        .css('height', '-webkit-calc(100vh - 104px)')
        .css('height', '-moz-cal(100vh - 104px)')
        .css('height', 'calc(100vh - 104px)');

    $scope.selectOrigin = function() {
        $('*').css('cursor', 'crosshair');
    }
    google.maps.event.addListener(map, 'click', function(event){
        if(ctrl == 'howToGet') {
            add_howtoget_marker(event.latLng);

            if(howtoget_markers.length == 1) {
                add_bus_stop_radius_circle(event.latLng);
            } else if(howtoget_markers.length == 2) {
                if(circles.length < 2) {
                    add_bus_stop_radius_circle(event.latLng);
                }
                for(i=0; i<howtoget_markers.length; i++) {
                    apiStopsPerRadius.query({
                        lat: howtoget_markers[i].getPosition().k,
                        lng: howtoget_markers[i].getPosition().B
                    }, function(stops) {
                        for(j=0;j<stops.length; j++){
                            add_bus_stop_radius(j, latlng(stops[j].latitude, stops[j].longitude));
                        }
                    })
                }
                apiLinesPerRadius.query({
                    lat1: howtoget_markers[0].getPosition().k,
                    lng1: howtoget_markers[0].getPosition().B,
                    lat2: howtoget_markers[1].getPosition().k,
                    lng2: howtoget_markers[1].getPosition().B
                }, function(lines) {
                    $scope.lines = lines;
                    $scope.optLine = true;
                });
            }
        }
        google.maps.event.addListener(howtoget_markers[0], 'dragend', dragEvent);
        google.maps.event.addListener(howtoget_markers[1], 'dragend', dragEvent);
        function dragEvent() {
            if(ctrl == 'howToGet') {
                remove_rendered_routes();
                remove_all_markers();
                for(i=0; i<howtoget_markers.length; i++) {
                    add_bus_stop_radius_circle(latlng(
                        howtoget_markers[i].getPosition().k,
                        howtoget_markers[i].getPosition().B
                    ));
                    apiStopsPerRadius.query({
                        lat: howtoget_markers[i].getPosition().k,
                        lng: howtoget_markers[i].getPosition().B
                    }, function(stops) {
                        for(j=0;j<stops.length; j++){
                            add_bus_stop_radius(j, latlng(stops[j].latitude, stops[j].longitude));
                            console.log('teste');
                        }
                    })
                }
                apiLinesPerRadius.query({
                    lat1: howtoget_markers[0].getPosition().k,
                    lng1: howtoget_markers[0].getPosition().B,
                    lat2: howtoget_markers[1].getPosition().k,
                    lng2: howtoget_markers[1].getPosition().B
                }, function(lines) {
                    $scope.lines = lines;
                    $scope.optLine = true;
                });
            }
        }

    $scope.getLine = function() {
        console.log($scope.selectedLine.name);
        apiLineRoute.query({
            line: $scope.selectedLine.name

        }, function(route) {
            showRoute(route);
            console.log(route);
        })
    }


    });
}]);
