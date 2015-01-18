/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

// Make sure items in the Firebase database are up to date with the most recent projects
// when server if first started up.
module.exports.bootstrap = function(cb) {

    var clientId = sails.config.podio.clientId;
    var clientSecret = sails.config.podio.clientSecret;
    var userName = sails.config.podio.userName;
    var password = sails.config.podio.password;

    var projectsAppInfo = {
        appId: sails.config.podio.webProjectsId,
        viewId: sails.config.podio.currentProjectsViewId
    }

    var tasksAppInfo = {
        appId: sails.config.podio.tasksId,
        viewId: sails.config.podio.currentTasksViewId
    }

    // Turning an asynchronous process to a synchronous one.
    async.series([
        // Authenticate with Podio (credentials found in config folder)
        function(callback){
            PodioAuthenticationService.authenticate(clientId, clientSecret, userName, password, function(err, result){
                callback(err, result);
            });
        },
        // Get projects from podio, parse them, attach the milestones as an object for easy access.
        // Then, add them to the Firebase database
        function(callback){
            ProjectsService.getAllProjectsFromPodio(projectsAppInfo, function(err, result){
                callback(err, result);
            });
        },
        // Get tasks from podio, parse them, add them to the Firebase database
        function(callback){
            TasksService.getAllTasksFromPodio(tasksAppInfo, function(err, result){
                callback(err, result);
            });
        }
    ],
    function(err, results){

        sails.log.error(err);
        // It's very important to trigger this callback method when you are finished
        // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
        cb();
    });

};
