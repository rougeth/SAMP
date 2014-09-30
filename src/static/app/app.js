var samp = angular.module('samp', ['ngRoute']);
samp.config(function($interpolateProvider, $routeProvider) {
  $interpolateProvider.startSymbol('{$');
  $interpolateProvider.endSymbol('$}');

  $routeProvider
    .when('/', {
      controller: 'HomeController',
      template: " "
    })
    .otherwise({ redirectTo: '/'});
});

samp.controller('HomeController', function($scope) {
    console.log('HomeController');
});
