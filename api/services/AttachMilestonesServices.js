// FilterItemsService.js - in api/services
var Request = require('request');
var Firebase = require('firebase');
var projectsRef = new Firebase('https://blistering-torch-551.firebaseio.com/');

module.exports = {

    toProject: function(project, callback) {

        var currProject = project;
        currProject.milestones = [];
        var projMilestones = [];

        for (var i = 0; i < project.fields.length; i++){
            if (project.fields[i].label === 'Milestones' ){
                projMilestones = project.fields[i].values;
            }
        }

        async.each(projMilestones,
            function(milestone, callback) {

                Request.get({
                        url: 'https://api.podio.com/item/' + milestone.value.item_id,
                        headers: {
                            Authorization: "OAuth2 " + sails.config.podio.token.accessToken
                        }
                    },
                    // callback
                    function(err,httpResponse,body){
                        if (err)
                            return console.error(err);
                        else {
                            currProject.milestones.push(JSON.parse(body.toString()));
                            console.log('service went through');
                            callback();
                        }

                    }
                );
            },
            function(err){

                // if any of the file processing produced an error, err would equal that error
                if(err){
                    // One of the iterations produced an error.
                    // All processing will now stop.
                    return console.error('A milestone has failed to process.');
                }
                else {
                    var obj = {};
                    obj[currProject.item_id] = currProject;
                    projectsRef.child('projects').set(obj);

                    console.log('All milestones for project ' + currProject.title + ' have been processed successfully');
                    callback();
                }
            }
        );

    }
};