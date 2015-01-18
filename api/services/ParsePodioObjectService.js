// ParsePodioObjectService.js - in api/services

module.exports = {

    parse: function(item, callback) {
        var fields = {};

        async.each(item.fields, function(field, callback){
            fields[field.external_id] = field;
            callback();
        },function(err){
            item.fields = fields;
            callback(err, item);
        });
    }

};