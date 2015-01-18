/**
 * TaskController
 *
 * @description :: Server-side logic
 * @help        ::
 */

module.exports = {
    
    addPodioTask: function (req, res) {
        
        var appInfo = {
            hookID: req.body["hook_id"],
            code: req.body.code
        };

        switch(req.body.type){
            case "hook.verify":
                HooksService.validateHook(appInfo, function(err, confirmation) {
                    return res.json(confirmation);
                });
                break;
            case "item.create":
                break;
            default:
                console.log("Error: adding podio task was unsuccessful");
        }
        
    }

};

