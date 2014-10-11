angular.module('samp', [
    'ngRoute',
    'samp.buses',
    'samp.subways'
])

.config(function($interpolateProvider, $routeProvider) {
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');

    $routeProvider.otherwise({redirectTo: '/'});
});

function reset() {
    remove_all_markers();
    $('#samp-map')
        .css('height', '-webkit-calc(100vh - 52px)')
        .css('height', '-moz-cal(100vh - 52px)')
        .css('height', 'calc(100vh - 52px)');
}
