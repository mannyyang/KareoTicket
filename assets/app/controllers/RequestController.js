(function(){
    "use strict";

    var app = angular.module('WebRequestsApp');
    app.controller('RequestController', RequestController);

    function RequestController($mdDialog){
        this.$mdDialog = $mdDialog;
    }
    
    RequestController.prototype.request = function($event){
        this.$mdDialog.show({
            targetEvent: $event,
            templateUrl:'app/views/partials/request.template.html',
            controller: 'DialogController as dialog',
            locals: {project: null, task: null}
        });
    }


})();