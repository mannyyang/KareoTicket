(function(){
    'use strict';

    var app = angular.module('WebRequestsApp', ['ngRoute', 'firebase', 'ngMaterial']);

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'app/views/partials/statuses.html',
                    controller: 'ProjectsController'
                }).
                otherwise({
                    redirectTo: '/hello'
                });
        }]);

})();
