/**
 * Hooks Service
 *
 * @module      :: Service
 * @description :: Services for hooks with Podio.
 *
 * @docs        ::
 *
 */

"use strict";

var Request = require('request');

module.exports =  {

    validateHook: function(appInfo, callback){
        Request.post({
                url: 'https://api.podio.com/hook/' + appInfo.hookID + '/verify/validate',
                headers: {
                    Authorization: "OAuth2 " + sails.config.podio.token.accessToken
                },
                body: JSON.stringify({
                    "code": appInfo.code
                })
            },
            // callback after validation attempt
            function(err,httpResponse,body){
                if (!err)
                    console.log("Hook has been validated.");
                callback(err, body);
            }
        );
    }

};
