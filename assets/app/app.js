(function(){
    'use strict';

    var app = angular.module('WebRequestsApp', ['ngRoute', 'ngMaterial']);

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'app/views/partials/statuses.html',
                    controller: 'ProjectsCtrl'
                }).
                otherwise({
                    redirectTo: '/hello'
                });
        }]);

})();
