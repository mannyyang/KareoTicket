// FilterItemsService.js - in api/services
var Request = require('request');

module.exports = {

    byView: function(appInfo, callback) {
        Request.post({
                url: 'https://api.podio.com/item/app/' + appInfo.appId + '/filter/' + appInfo.viewId + '/',
                headers: {
                    Authorization: "OAuth2 " + sails.config.podio.token.accessToken
                }
            },
            // callback after authentication attempt
            function(err,httpResponse,body){
                console.log(httpResponse.headers);
                callback(err, JSON.parse(body.toString()));
            }
        );
    }
};