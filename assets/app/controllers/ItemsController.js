(function(){
    "use strict";

    var app = angular.module('WebRequestsApp');
    app.controller('ItemsController', ItemsController);

    function ItemsController($mdDialog, $firebase){
        var projectsRef = new Firebase('https://blistering-torch-551.firebaseio.com/items');
        var list = $firebase(projectsRef).$asArray();
        
        this.unsorted = list;
        this.$mdDialog = $mdDialog;
    }
    
    ItemsController.prototype.viewDetails = function($event, item){
        if (item.type === "project") {
            this.$mdDialog.show({
                targetEvent: $event,
                templateUrl:'app/views/partials/project.template.html',
                controller: 'DialogController as dialog',
                locals: {project: item, task: item}
            });
        }
        else if (item.type === "task"){
            this.$mdDialog.show({
                targetEvent: $event,
                templateUrl:'app/views/partials/task.template.html',
                controller: 'DialogController as dialog',
                locals: {task: item, project: item}
            });
        }
        
    }


})();