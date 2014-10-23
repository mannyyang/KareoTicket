/**
 * getCurrentProjects
 *
 * @module      :: Policy
 * @description :: Simple policy to get current projects with Podio.
 *
 * @docs        ::
 *
 */
module.exports = function getCurrentProjects (req, res, next) {

    var appInfo = {
        appId: sails.config.podio.webProjectsId,
        viewId: sails.config.podio.currentProjectsViewId
    }

    async.series([
        function(callback){
            FilterItemsService.byView(appInfo, callback);
        },
        function(callback){
            var currentProjects = sails.config.podio.currentProjects.items;

            async.each(currentProjects,
                function(project, callback){
                    AttachMilestonesServices.toProject(project, callback);
                },
                function(err){
                    if (err) {
                        return console.error(err);
                    }
                    else {
                        var obj = sails.config.podio.processedProjects;
                        callback(null, "two");
                    }

                }
            );
        }
    ],
    // optional callback
    function(err, results){
        return next();
    });

};
