(function(){
    'use strict';

    var app = angular.module('WebRequestsApp', ['ngRoute', 'ngMaterial']);

    app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
                when('/', {
                    templateUrl: 'views/index.html',
                    controller: 'ProjectsCtrl'
                }).
                otherwise({
                    redirectTo: '/'
                });
        }]);

})();
