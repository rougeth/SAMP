angular.module('samp.subways', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/subways/stations', {
            controller: 'SubwaysStationsController',
            template: ' '
        })
}])

.factory('apiSubwayStations', ['$resource', function($resource) {
    return $resource('/api/subways/stations/');
}])

.factory('apiSubwayRegions', ['$resource', function($resource) {
    return $resource('/api/subways/regions/');
}])

.controller('SubwaysStationsController', ['$scope', 'apiSubwayStations',
    function($scope, apiSubwayStations) {

    reset();

    var coordenate;
    apiSubwayStations.query(function(stations) {
        for(i=0; i<stations.length; i++) {
            coordenate = new google.maps.LatLng(
                stations[i].latitude,
                stations[i].longitude
            );
            add_subway_station(coordenate);
        }
    });
}]);

