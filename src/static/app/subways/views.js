angular.module('samp.subways', ['ngRoute', 'ngResource'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/subways/stations', {
            controller: 'SubwaysStationsController',
            template: ' '
        });
        // .when('/subways/lines', {
        //     controller: 'SubwayLinesController',
        //     templateUrl: '/static/app/subways/templates/lines.html'
        // })
        // .when('/subways/route/:line', {
        //     controller: 'SubwayRouteController',
        //     template: ' '
        // });
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

// .factory('apiLineRoute', ['$resource', function($resource) {
//     return $resource('/api/subways/route/:line', null, {
//         'query': {
//             method: 'GET',
//             params: {
//                 line: 'line'
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

// .controller('SubwayLinesController', ['$scope', '$location', 'apiSubwayRegions',
//         'apiLinesPerRegions', 'apiLineRoute',
//     function($scope, $location,  apiSubwayRegions, apiLinesPerRegions, apiLineRoute) {

//     console.log('SubwayLinesController');
//     reset();

//     apiSubwayRegions.query(function(regions) {
//         $scope.regions = regions;
//         $scope.origin = $scope.regions[0];
//         $scope.destination = $scope.regions[0];
//     });
//     setTimeout(function() {
//         $('#subway_lines').modal('show');
//     }, 100);

//     $scope.search = function() {
//         apiLinesPerRegions.query({
//             region_a: $scope.origin.name,
//             region_b: $scope.destination.name
//         }, function(lines) {
//             console.log(lines);
//             $scope.lines = lines;
//         })
//     }

//     $scope.selectLine = function(line) {
//         $('#subway_lines').modal('hide');
//         $location.path('/subways/route/' + line.name);
//     }
// }])

// .controller('SubwayRouteController', ['$scope', '$routeParams', 'apiLineRoute',
//     function($scope, $routeParams, apiLineRoute) {
//         $('#subway_lines').modal('hide');

//     reset();
//     apiLineRoute.query({
//         line: $routeParams.line
//     }, function(waypoints) {
//         p = waypoints;
//         showRoute(p);
//     });
// }]);
