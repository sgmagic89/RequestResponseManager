/*
 * COPYRIGHT (C) 2019 Molex - All Rights Reserved 
 */
var winston = require('winston'),
    path = require("path"),
    fs = require('fs'),
    config = require(path.resolve("config/system.config"));
const logDir = config.logger.defaults.logdir;
//constantconfig = require(path.resolve("config/constants.config"));
// const cust = constantconfig[4].dms.Customer;
// const Id = constantconfig[4].dms.Id;
require('winston-daily-rotate-file');

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

var transport = new(winston.transports.DailyRotateFile)({
    filename: logDir + '/logger-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: config.logger.defaults.maxsize,
    maxFiles: config.logger.defaults.maxFiles
});

var exceptionHandlersTransport = new(winston.transports.DailyRotateFile)({
    filename: logDir + '/exceptions-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: false,
    maxSize: config.logger.defaults.maxsize,
    maxFiles: config.logger.defaults.maxFiles
});

// function checkConnection(host, port, timeout) {
//     return new Promise(function(resolve, reject) {
//         timeout = timeout || 10000; // default of 10 seconds
//         var timer = setTimeout(function() {
//             reject("timeout");
//             socket.end();
//         }, timeout);
//         var socket = net.createConnection(port, host, function() {
//             clearTimeout(timer);
//             resolve();
//             socket.end();
//         });
//         socket.on('error', function(err) {
//             clearTimeout(timer);
//             reject(err);
//         });
//     });
// }

function logger() {
    this.logger = new(winston.Logger)({
        exceptionHandlers: [
            exceptionHandlersTransport
        ],
        transports: [
            transport
        ],
        exitOnError: false
    });

    if (config.logger.defaults.releaseModeEnable) {
        transport.level = config.logger.defaults.logLevel.trim();
    }

    // checkConnection(config.DMSConfig.ip, config.DMSConfig.port).then(function() {
    //     config.logger.centralizedLogEnable = true;
    // }, function(err) {
    //     if (err)
    //         config.logger.centralizedLogEnable = false;
    // })
}

logger.prototype.error = function(message, Component = "default", MessageType = "default") {
    let self = this;
    if (config.logger.centralizedLogEnable) {
        var dmslogger = require(path.resolve("app/services/Logger/dmsLogger"))
        // var logMessage = {
        //     "id": Id,
        //     "customer": cust,
        //     "level": "Error"
        // }
        logMessage.timestamp = new Date();
        logMessage.message = message;
        logMessage.component = Component;
        logMessage.messageType = MessageType;

        dmslogger.log(logMessage, function(err, res) {
            if (!err && !res.isSuccess)
                self.logger.error(message, Component, MessageType);
        });
    } else {
        self.logger.error(message, Component, MessageType);
    }

}

logger.prototype.warn = function(message, Component = "default", MessageType = "default") {
    let self = this;
    if (config.logger.centralizedLogEnable) {
        var dmslogger = require(path.resolve("app/services/Logger/dmsLogger"))
        // var logMessage = {
        //     "id": Id,
        //     "customer": cust,
        //     "level": "Warn"
        // }
        logMessage.timestamp = new Date();
        logMessage.message = message;
        logMessage.component = Component;
        logMessage.messageType = MessageType;
        dmslogger.log(logMessage, function(err, res) {
            if (!err && !res.isSuccess)
                self.logger.error(message, Component, MessageType);
        });
    } else {
        self.logger.warn(message, Component, MessageType);
    }
}


logger.prototype.info = function(message, Component = "default", MessageType = "default") {
    let self = this;
    if (config.logger.centralizedLogEnable) {
        var dmslogger = require(path.resolve("app/services/Logger/dmsLogger"))
        // var logMessage = {
        //     "id": Id,
        //     "customer": cust,
        //     "level": "Info"
        // }
        logMessage.timestamp = new Date();
        logMessage.message = message;
        logMessage.component = Component;
        logMessage.messageType = MessageType;
        dmslogger.log(logMessage, function(err, res) {
            if (!err && !res.isSuccess)
                self.logger.error(message, Component, MessageType);
        });
    } else {
        self.logger.info(message, Component, MessageType);
    }
}

logger.prototype.log = function(type, message, Component = 'Default', MessageType = 'Default') {
    let self = this;
    self.logger.log(type, message, Component, MessageType);
}
logger.instance = null;
logger.getInstance = function() {
    if (this.instance === null) {
        this.instance = new logger();
    }

    return this.instance;
};

module.exports = logger.getInstance();