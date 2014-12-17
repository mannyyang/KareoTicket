/**
 * GetProjects
 *
 * @module      :: Policy
 * @description :: Simple policy to get current projects with Podio.
 *
 * @docs        ::
 *
 */
var Firebase = require('firebase');
var projectsRef = new Firebase('https://blistering-torch-551.firebaseio.com/projects');

module.exports =  {

    getAllProjectsFromPodio: function(appInfo, callback) {

        var viewItems = [];
        var parsedProjects = [];

        async.series([
            function(callback){
                FilterItemsService.byView(appInfo, function(err, filteredItems){
                    viewItems = filteredItems.items;
                    console.log('filter items service responded');
                    callback(err, null);
                });
            },
            function(callback){
                async.each(viewItems,
                    function(item, callback){
                        ParseRawProjectService.parse(item, function(err, project){
                            console.log('parsing raw projects service responded');
                            parsedProjects.push(project);
                            callback(err);
                        });
                    },
                    function(err){
                        callback(err, null);
                    }
                );
            },
            function(callback){
                async.each(parsedProjects,
                    function(project, callback){
                        AttachMilestonesServices.toProject(project, function(err, attachedProject){
                            projectsRef.child(project.item_id).set(attachedProject);
                            callback();
                        });
                    },
                    function(err){
                        if (!err)
                            console.log("all projects have been added to firebase.");
                        callback(err, null);
                    }
                );
            }
        ],
        // optional callback
        function(err, results){
            return callback(err, results);
        });
    },
    getAllProjectsFromDb: function(callback){
        projectsRef.once('value', function (dataSnapshot){
            return callback(dataSnapshot.val());
        });
    }
};
