(function(){
    "use strict";

    var app = angular.module('WebRequestsApp');
    app.controller('ProjectsCtrl', ProjectsCtrl);

    function ProjectsCtrl($http){

        //var parentThis = this;
        //
        //// GET all projects in database
        //$http.get('/api/getallprojects').
        //    success(function (data, status, headers, config) {
        //        console.log('success ' + data);
        //        parentThis.projects = data;
        //    }).
        //    error(function (data, status, headers, config) {
        //        console.log('error ' + data);
        //    });
    }


})();