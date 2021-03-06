/**
 * ProjectController
 *
 * @description :: Server-side logic
 * @help        ::
 */

"use strict";

module.exports = {

    updatePodioProjects: function (req, res) {

        var appInfo = {
            hookID: req.body["hook_id"],
            code: req.body.code,
            itemID: req.body["item_id"]
        };

        switch(req.body.type){
            case "hook.verify":
                HooksService.validateHook(appInfo, function(err, confirmation) {
                    return res.json(confirmation);
                });
                break;
            case "item.create":
                ProjectsService.updateProject(appInfo, function(err, results){
                    return res.json(results);
                });
                break;
            case "item.update":
                ProjectsService.updateProject(appInfo, function(err, results){
                    return res.json(results);
                });
                break;
            case "item.delete":
                ProjectsService.removeProject(appInfo, function(err, results){
                    return res.json({err: err, result: results});
                });
                break;
            default:
                console.log("Error: adding podio project was unsuccessful");
        }
        
    }

};

