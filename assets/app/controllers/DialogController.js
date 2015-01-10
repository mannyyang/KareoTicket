(function(){
    "use strict";

    var app = angular.module('WebRequestsApp');
    app.controller('DialogController', DialogController);

    function DialogController($mdDialog, project, $sce){
        this.$mdDialog = $mdDialog;
        this.$sce = $sce;
        this.project = project;
    }
    
    DialogController.prototype.trustAsHtml = function(htmlString){
        return this.$sce.trustAsHtml(htmlString);
    }

    DialogController.prototype.getMilestoneStatus = function(status){
        var boolStatus = false;
        if (status === "Entered") {
            boolStatus = false;
        }
        else if (status === "Complete"){
            boolStatus = true;
        }
        else {
            console.log('Could not get milestone status');
        }
        return boolStatus;
    }

    DialogController.prototype.closeDialog = function (){
        this.$mdDialog.hide();
    }

})();