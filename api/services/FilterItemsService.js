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
                if (err)
                    console.log(err);
                else {
                    sails.config.podio.currentProjects = JSON.parse(body.toString());
                    console.log('service went through');
                    callback(null, 'one');
                }

            }
        );
    }
};