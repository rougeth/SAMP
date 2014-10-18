angular.module('samp', [
    'ngRoute',
    'samp.core',
    'samp.buses',
    'samp.subways'
])

.config(['$interpolateProvider', '$routeProvider'
    ,function($interpolateProvider, $routeProvider) {

    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

    $routeProvider
        .when('/', {
            controller: 'HomeController',
            template: ' '
        })
        .otherwise({redirectTo: '/'});
}])

.controller('HomeController', [function() {
    reset();
}]);

function reset() {
    remove_all_markers();
    remove_rendered_routes();
    $('#samp-map')
        .css('height', '-webkit-calc(100vh - 52px)')
        .css('height', '-moz-cal(100vh - 52px)')
        .css('height', 'calc(100vh - 52px)');
}
