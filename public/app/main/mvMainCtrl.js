angular.module('app').controller('mvMainCtrl', ['$scope', 'mvCachedCourse',function($scope, mvCachedCourse) {
    $scope.courses = mvCachedCourse.query();
}]);