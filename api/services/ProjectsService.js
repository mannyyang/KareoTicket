/**
 * GetProjects
 *
 * @module      :: Policy
 * @description :: Simple policy to get current projects with Podio.
 *
 * @docs        ::
 *
 */

"use strict";

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

                            var kareoProject = {
                                "id": attachedProject["item_id"],
                                "name": attachedProject["title"],
                                "created_on": attachedProject["created_on"],
                                "priority": attachedProject["fields"]["priority"]["values"]["0"]["value"]["text"],
                                "description": attachedProject["fields"]["project-description"]["values"]["0"]["value"],
                                "owner": attachedProject["fields"]["project-owner"]["values"]["0"]["value"],
                                "status": attachedProject["fields"]["stage"]["values"]["0"]["value"]["text"],
                                "deadline": attachedProject["fields"]["start-and-finish-dates"]["values"]["0"],
                                "milestones": attachedProject["fields"]["task"]
                            }

                            Project.create(kareoProject, function(err){
                                if (err) {
                                    callback(err);
                                }
                                else {
                                    callback();
                                }

                            });

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
    //getAllProjectsFromDb: function(callback){
    //    projectsRef.once('value', function (dataSnapshot){
    //        return callback(dataSnapshot.val());
    //    });
    //}
};
