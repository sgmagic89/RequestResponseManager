/*
* COPYRIGHT (C) 2019 Molex - All Rights Reserved 
*/
// this file will read ts config file and validate it

var path = require("path"),
    logger = require('../../Logger/logger');
    customErrorClass = require('../../helpers/common/customError'),
    customError = new customErrorClass(),
    userDbHelperClass = require('../../helpers/db/userDbHelper'),
    userDbHelper = new userDbHelperClass();

var authenticationService = function() {}

authenticationService.prototype.authenticateUser = function(username, password, callback){
    var Component="authenticateUser";
	var MessageType="event";
    userDbHelper.findUserData({username: username}, function(err, user){
        if (err) {
            var errorObj = customError.getMolexAPIErrorObj("failed_db_query");
            logger.error("authenticationService.js - "+ JSON.stringify(errorObj),Component,MessageType);
            callback({isSuccess: false, response: errorObj});
        } else {
            if (!user) {
                var errorObj = customError.getMolexAPIErrorObj("no_user");
                logger.error("authenticationService.js - "+ JSON.stringify(errorObj),Component,MessageType);
                callback({isSuccess: false, response: errorObj});
            } else {
                user.verifyPassword(password, function(err, isMatch){
                    if(isMatch) {
                        callback({isSuccess: true, response: user});
                    } else {
                        var errorObj = customError.getMolexAPIErrorObj("invalid_password");
                        logger.error("authenticationService.js - "+ JSON.stringify(errorObj),Component,MessageType);
                        callback({isSuccess: false, response: errorObj});
                    }
                });
            }
        }
    });
}

module.exports = authenticationService;
