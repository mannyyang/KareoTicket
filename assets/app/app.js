(function(angular){
    'use strict';

    angular.module('WebRequestsApp', [
        'ngMaterial'
    ])
    .controller('ProjectsCtrl', function($scope, $http) {
        // Simple GET request example :
        $http.get('/api/getallprojects').
            success(function(data, status, headers, config) {
                console.log('success ' + data);
            }).
            error(function(data, status, headers, config) {
                console.log('error ' + data);
            });
    });

})(window.angular);
