(function(){
    "use strict";

    var app = angular.module('WebRequestsApp');
    app.controller('ProjectsController', ProjectsController);

    function ProjectsController($http, $firebase){

        var projectsRef = new Firebase('https://blistering-torch-551.firebaseio.com/projects');
        var sync = $firebase(projectsRef).$asArray();
        
        this.unsorted = sync;
        
        var parentThis = this;
        
    }


})();