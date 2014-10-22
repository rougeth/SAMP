angular.module('samp.subways', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/subways/stations', {
            controller: 'SubwaysStationsController',
            template: ' '
        })
        // .when('/subways/lines', {
        //     controller: 'SubwayLinesController',
        //     templateUrl: '/static/app/subways/templates/lines.html'
        // })
        .when('/subways/route/:line', {
            controller: 'SubwayRouteController',
            template: ' '
        });
}])

.factory('apiSubwayStations', ['$resource', function($resource) {
    return $resource('/api/subways/stations/');
}])

.factory('apiSubwayRegions', ['$resource', function($resource) {
    return $resource('/api/subways/regions/');
}])

// .factory('apiLinesPerRegions', ['$resource', function($resource) {
//     return $resource('/api/subways/regions/:region_a/:region_b', null, {
//         'query': {
//             method: 'GET',
//             params: {
//                 region_a: 'region_a',
//                 region_b: 'region_b'
//             },
//            isArray:true
//         }
//     });
// }])

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

