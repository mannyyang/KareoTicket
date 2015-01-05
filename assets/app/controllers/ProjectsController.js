(function(){
    "use strict";

    var app = angular.module('WebRequestsApp');
    app.controller('ProjectsController', ProjectsController);

    function ProjectsController($mdDialog, $firebase){

        var projectsRef = new Firebase('https://blistering-torch-551.firebaseio.com/projects');
        var sync = $firebase(projectsRef).$asArray();
        
        this.unsorted = sync;
        this.$mdDialog = $mdDialog;
    }
    
    ProjectsController.prototype.viewDetails = function($event, project){
        this.$mdDialog.show({
            targetEvent: $event,
            templateUrl:'app/views/partials/details.template.html',
            controller: 'DialogController as dialog',
            locals: {project: project}
        });

    }


})();