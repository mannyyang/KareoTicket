// AttachMilestonesService.js - in api/services
var Request = require('request');

module.exports = {

    toProject: function(project, callback) {

        var newMilestones = [];
        var origMilestones = project.fields.task.values;

        async.each(origMilestones,
            function(milestone, callback) {
                Request.get({
                        url: 'https://api.podio.com/item/' + milestone.value.item_id,
                        headers: {
                            Authorization: "OAuth2 " + sails.config.podio.token.accessToken
                        }
                    },
                    // callback
                    function(err,httpResponse,body){
                        newMilestones.push(JSON.parse(body.toString()));
                        callback(err);
                    }
                );
            },
            function(err){
                project.fields.task = newMilestones;
                callback(err, project);
            }
        );

    }
};