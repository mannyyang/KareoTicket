// ParsePodioObjectService.js - in api/services

module.exports = {

    parse: function(project, callback) {
        var fields = {};

        async.each(project.fields, function(field, callback){
            fields[field.external_id] = field;
            callback();
        },function(err){
            project.fields = fields;
            callback(err, project);
        });
    }

};