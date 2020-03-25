/*
* COPYRIGHT (C) 2019 Molex - All Rights Reserved 
*/
// This controller all mechanism for User interface configuration APIs
var path = require("path"),
    fs = require('fs'),
    responseFormatterClass = require('../helpers/common/responseFormatter'),
    appConstants = require(path.resolve('./helpers/common/constants.js')),
    responseFormatter = new responseFormatterClass();

var configurationControllerClass = function () { };

// configurationControllerClass.prototype.getConfigurationUI = function (req, res) {
//     res.sendFile(path.resolve("public/view/index.html"));
// };

configurationControllerClass.prototype.setAPIConfig = function (req, res) {
    //req.checkBody('ip', 'Invalid IP').notEmpty();
    req.checkBody('port', 'Invalid Port').notEmpty();
   // req.checkBody('protocol', 'Invalid Protocol').notEmpty();
    req.checkBody('username', 'Invalid Username').notEmpty();
    req.checkBody('password', 'Invalid Password').notEmpty();
    req.checkBody('broker', 'Invalid Password').notEmpty();

    var errors = req.validationErrors();

    if (errors) {
        var errorResponse = responseFormatter.getErrorResponseObject("invalid_params", [{ [errors[0].param]: errors[0].msg }]);
        var errorResponseObj = responseFormatter.getFormattedResponseObject(false, {}, errorResponse, "parameter_validation_failed");
        res.send(errorResponseObj);
    } else {
        var file = path.resolve('./config/system.config.json')
        fs.readFile(file, (err, data) => {
            if (err) {
                resolve({ status: false });
            }
            let config = JSON.parse(data);
                           //config.OnPrem.gateway = req.sanitize("ip").trim();
                //config.port = req.sanitize("port");
                //config.molexAPI.protocol = req.sanitize("protocol").trim();
                config.loginCredentials.username = req.sanitize("username").trim();
                config.loginCredentials.password = req.sanitize("password").trim();


                switch (req.sanitize("broker").trim()) {
                    case "aws":

                        if (req.body.endpoint) {
                            config.awsConnect = true;
                            config.cloudBroker.endpoint = req.sanitize("endpoint").trim();
                            config.azureConnect = false;
                        }
                        else {
                            let errorResponse = responseFormatter.getErrorResponseObject("invalid_params",
                            );
                            let mainResponseObj = responseFormatter.getFormattedResponseObject(false, [], errorResponse, "Invalid parameters", "parameter_validation_failed");
                            res.send(mainResponseObj);
                        }
                        break;
                    case "azure":
                        if (req.body.devicestring) {
                            config.awsConnect = false;
                            config.azureConnect = true;
                            if(config.onCloud){
                                config.serviceString = req.body.devicestring;
                            }
                            else{
                                config.deviceString = req.body.devicestring;
                            }
                           
                        } else {
                            let errorResponse = responseFormatter.getErrorResponseObject("invalid_params",
                            );
                            let mainResponseObj = responseFormatter.getFormattedResponseObject(false, [], errorResponse, "Invalid parameters", "parameter_validation_failed");
                            res.send(mainResponseObj);
                        }
                        break;
                    default: {
                        let errorResponse = responseFormatter.getErrorResponseObject("invalid_params",
                        );
                        let mainResponseObj = responseFormatter.getFormattedResponseObject(false, [], errorResponse, "Invalid parameters", "parameter_validation_failed");
                        res.send(mainResponseObj);
                    }
                        break;
                }

                        fs.writeFile(file, JSON.stringify(config, null, 4), (err) => {
                if (err) {
                    var errorResponse = responseFormatter.getErrorResponseObject("internal_server_error", []);
                    var mainResponseObj = responseFormatter.getFormattedResponseObject(false, [], errorResponse, "Error: put API Server Configuration", "internal_server_error");
                    res.send(mainResponseObj)
                }
                var mainResponseObj = responseFormatter.getFormattedResponseObject(true, "200", [], "Success");
                res.send(mainResponseObj);
            });

        })
   
    }
};

configurationControllerClass.prototype.getAPIConfig = function (req, res) {
    try {
        var systemConfigData = fs.readFileSync(path.resolve("./config/system.config.json"));
        var apiPackageData = fs.readFileSync(path.resolve("./package.json"));
        var apiResp = {};
        var apiConfigurations = {};

        var apiPackageInfo = {};

        apiPackageInfo = JSON.parse(apiPackageData);
    
        apiResp.apiVersion = apiPackageInfo.version;

        var systemConfig = JSON.parse(systemConfigData);
       
        if (!systemConfig) {
            var mainResponseObj = responseFormatter.getFormattedResponseObject(false, [], [], "Error getting API server configuration", "internal_server_error");
            res.send(mainResponseObj);
        }
        //apiConfigurations.ip = systemConfig.molexAPI.ip;
        apiConfigurations.port = systemConfig.port;
       // apiConfigurations.protocol = systemConfig.molexAPI.protocol;
        
        //apiConfigurations.mode = systemConfig.legacy.enabled ? appConstants.LEGACY : appConstants.NEXTGEN;
        apiConfigurations.aws = systemConfig.awsConnect;
        apiConfigurations.azure = systemConfig.azureConnect;
        if (systemConfig.awsConnect) {
            apiConfigurations.endpoint = systemConfig.cloudBroker.endpoint;
        }
        if (systemConfig.azureConnect) {
            apiConfigurations.devicestring = systemConfig.deviceString;
        }
      //  apiConfigurations.protocol = systemConfig.molexAPI.protocol;


        apiResp.apiConfigurations = apiConfigurations;

        var successResponseObj = responseFormatter.getFormattedResponseObject(true, apiResp, [], "Successfully received API server configuration");
        res.send(successResponseObj);

    } catch (e) {
        var mainObj = responseFormatter.getFormattedResponseObject(false, [], [], "Error getting API server configuration!!!", "internal_server_error");
        res.send(mainObj);

    }
};

module.exports = configurationControllerClass;
