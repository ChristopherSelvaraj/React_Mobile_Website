var config = require('config');
//var responseHandler = require('../helpers/common.js').controllerHandler;
//var otp = require('./otp');

exports.jwtSecret = jwtSecret = new Buffer(config.get('jwtSecret'), 'base64');
var loginSessionToken = function (auth, type, cb) {

    var adminCommunity;
    var parts = (auth) ? auth.split(' ') : null;

    if (parts && (parts[0] === "Basic") && parts[1]) {

        var token = new Buffer(parts[1], "base64").toString();
        var credentials = token.split(":");

        communityModel.findCommunityByAdmin(credentials[0], function (action, community) {

            if (action === "success") adminCommunity = community;

            if (type === "mobile")
                otp.Validate(credentials, adminCommunity, cb);

        });
    } else {
        cb("unauthorized", {
            "message" : "Basic Auth Header Missing"
        });
    }
};


exports.login = function (req, res) {

    var auth = req.headers.authorization;
    var type = req.body.type;

    loginSessionToken(auth, type, function (err, body) {
        responseHandler(err, body, req, res);
    });
};
