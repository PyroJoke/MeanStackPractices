var module = angular.module('app', ['ngResource', 'ngRoute']);

module.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/partials/main', controller: 'mvMainCtrl'});
}]);