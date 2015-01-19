/**
 * Projects Service
 *
 * @module      :: Service
 * @description :: Services for CRUD functions with Podio.
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
                        ParsePodioObjectService.parse(item, function(err, project){
                            console.log('parsing podio project succeeded');
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
                                "type": "project",
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

                            Item.create(kareoProject, function(err){
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

    updateProject: function(appInfo, callback){
        var oldItem = {};
        var parsedItem = {};

        async.series([
            function(callback){
                GetItemService.getItemByID(appInfo, function(err, project){
                    oldItem = project;
                    console.log('get item service responded');
                    callback(err, {message: "new project pulled from podio."});
                });
            },
            function(callback){
                ParsePodioObjectService.parse(oldItem, function(err, parsedProject){
                    parsedItem = parsedProject;
                    console.log('parsing podio object service responded');
                    callback(err, {message: "new podio project has been parsed."});
                });
            },
            function(callback){
                AttachMilestonesServices.toProject(parsedItem, function(err, attachedProject){

                    var kareoProject = {
                        "type": "project",
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

                    Item.create(kareoProject, function(err){
                        if (err) {
                            callback(err);
                        }
                        else {
                            callback(err, {message: "new podio project has been added."});
                        }
                    });
                });
            }
        ],
        // optional callback
        function(err, results){
            return callback(err, results);
        });
        
    }
    
};
