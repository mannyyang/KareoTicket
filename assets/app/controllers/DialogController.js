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

})();