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

    getAllTasksFromPodio: function(appInfo, callback) {
        var viewItems = [];
        var parsedTasks = [];

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
                        ParsePodioObjectService.parse(item, function(err, task){
                            parsedTasks.push(task);
                            console.log('parsing podio object service responded');
                            callback(err);
                        });
                    },
                    function(err){
                        callback(err, null);
                    }
                );
            },
            function(callback){
                async.each(parsedTasks,
                    function(task, callback){

                        var kareoTask = {
                            "type": "task",
                            "id": task["item_id"],
                            "name": task["title"],
                            "created_on": task["created_on"],
                            "priority": task["fields"]["priority"]["values"]["0"]["value"]["text"],
                            "description": task["fields"]["project-description"]["values"]["0"]["value"],
                            "owner": task["fields"]["project-owner"]["values"]["0"]["value"],
                            "status": task["fields"]["stage"]["values"]["0"]["value"]["text"],
                            "deadline": task["fields"]["start-and-finish-dates"]["values"]["0"],
                        }

                        Item.create(kareoTask, function(err){
                            if (err) {
                                return callback(err);
                            }
                            else {
                                return callback();
                            }
                        });
                    },
                    function(err){
                        callback(err, null);
                    }
                );
            },
        ],
        // optional callback
        function(err, results){
            return callback(err, results);
        });
    }
    
};
