(function(){
    "use strict";

    var app = angular.module('WebRequestsApp');
    app.controller('DialogController', DialogController);

    function DialogController($mdDialog, project, task, $sce){
        this.$mdDialog = $mdDialog;
        this.$sce = $sce;
        this.project = project;
        this.task = task;
    }
    
    DialogController.prototype.trustAsHtml = function(htmlString){
        return this.$sce.trustAsHtml(htmlString);
    }

    DialogController.prototype.getMilestoneStatus = function(status){
        var boolStatus = false;
        
        switch(status){
            case "Entered":
                boolStatus = false;
                break;
            case "Complete":
                boolStatus = true;
                break;
            default:
                console.log('Could not get milestone status');
        }
        
        return boolStatus;
    }

    DialogController.prototype.closeDialog = function (){
        this.$mdDialog.hide();
    }

})();