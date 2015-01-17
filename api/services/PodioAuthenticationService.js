/**
 * podioAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to authenticate app with Podio.
 *
 * @docs        ::
 *
 */
var Request = require('request');

module.exports = {
    authenticate: function(clientId, clientSecret, userName, password, callback){
        Request.post({
                url:'https://podio.com/oauth/token',
                form: {
                    client_id: clientId,
                    client_secret: clientSecret,
                    grant_type: 'password',
                    username: userName,
                    password: password
                }
            },
            // callback after authentication attempt
            function(err,httpResponse,body){
                if (err){
                    res.error('Podio Authentication Error');
                    return callback(err, null);
                }
                else {
                    console.log('policy went through');
                    var parsedBody = JSON.parse(body.toString());

                    sails.config.podio.token.accessToken = parsedBody.access_token;
                    sails.config.podio.token.created_at = new Date().getTime();
                    sails.config.podio.token.expires_at = sails.config.podio.token.created_at + parsedBody.expires_in;

                    return callback(null, null);
                }

            }
        )
    }

};
