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

.controller('HowToGetController', ['$scope', 'apiStopsPerRadius',
    function($scope, apiStopsPerRadius) {
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
            }
            $scope.optLine = true;
        }
        google.maps.event.addListener(howtoget_markers[0], 'dragend', dragEvent);
        google.maps.event.addListener(howtoget_markers[1], 'dragend', dragEvent);
        function dragEvent() {
            if(ctrl == 'howToGet') {
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
            }
        }
    });

    $scope.selectDestiny = function() {
    }
}]);
