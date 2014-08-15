var module = angular.module('app', ['ngResource', 'ngRoute']);

module.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
    var routeRoleChecks = {
        admin: {
            auth: function(mvAuth) {
                return mvAuth.authorizeCurrentUserForRoute('Admin');
            }
        },
        user:{
            auth: function(mvAuth) {
                return mvAuth.authorizeAuthenticatedUserForRoute();
            }
        }
    };

    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', {templateUrl: '/partials/main/main', controller: 'mvMainCtrl'})
        .when('/signup', {templateUrl: '/partials/account/signup', controller: 'mvSignupCtrl'})
        .when('/admin/users', {templateUrl: '/partials/admin/user-list', controller: 'mvUserListCtrl', resolve: routeRoleChecks.admin})
        .when('/profile', {templateUrl: '/partials/account/profile', controller: 'mvProfileCtrl', resolve: routeRoleChecks.user})
        .when('/courses', {templateUrl: '/partials/courses/course-list', controller: 'mvCourseListCtrl'})
        .when('/courses/:id', {templateUrl: '/partials/courses/course-details', controller: 'mvCourseDetailsCtrl'});
}]);

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
});