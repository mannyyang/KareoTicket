// GetItemService.js - in api/services
var Request = require('request');

module.exports = {

    getItemByID: function(appInfo, callback) {
        Request.post({
                url: 'https://api.podio.com/item/' + appInfo.itemID,
                headers: {
                    Authorization: "OAuth2 " + sails.config.podio.token.accessToken
                }
            },
            // callback after authentication attempt
            function(err,httpResponse,body){
                callback(err, JSON.parse(body.toString()));
            }
        );
    }
};