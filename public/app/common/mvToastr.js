angular.module('app').value('mvToasrt', toastr);

angular.module('app').factory('mvNotifier', ['mvToasrt', function(mvToasrt) {
    return {
        notify: function(msg) {
            mvToasrt.success(msg);
            console.log(msg);
        }
    }
}]);