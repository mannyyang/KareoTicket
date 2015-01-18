/**
 * TaskController
 *
 * @description :: Server-side logic
 * @help        ::
 */

module.exports = {
    
    updatePodioTasks: function (req, res) {
        
        var appInfo = {
            hookID: req.body["hook_id"] || "",
            code: req.body.code || "",
            itemID: req.body["item_id"] || ""
        };

        switch(req.body.type){
            case "hook.verify":
                HooksService.validateHook(appInfo, function(err, confirmation) {
                    return res.json({err: err, result: confirmation});
                });
                break;
            case "item.create":
                TasksService.updateTask(appInfo, function(err, results){
                    return res.json({err: err, result: results});
                });
                break;
            case "item.update":
                TasksService.updateTask(appInfo, function(err, results){
                    return res.json({err: err, result: results});
                });
                break;
            default:
                console.log("Error: adding podio task was unsuccessful");
        }
        
    }

};

