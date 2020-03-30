/* 
 * COPYRIGHT (C) 2019 Molex - All Rights Reserved
 */
const request = require('request');
var Client = require('azure-iothub').Client;
var Message = require('azure-iot-common').Message;
var mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client;
var { EventHubClient, EventPosition } = require('@azure/event-hubs');
var logger = require("./Logger/logger");
var config = require('./config/system.config');
if (config.onCloud) {
  var Cache = require('timed-cache');
  var cache = new Cache({ defaultTtl: 300 * 1000 });
}
//var auth = "Basic " + new Buffer.from(config.OnPrem.user + ":" + config.OnPrem.password).toString("base64");

class MqttHandler {
  constructor() {
    this.mqttClient = null;
  }

  // Sends a mqtt message to topic: topic
  sendMessage(message) {
    this.mqttClient.send(config["device-id"], new Message(JSON.stringify(message)), function (err, res) {
      if (err) logger.error(' error: ' + err.toString());
    });
  }

  connect() {
    if (config.onCloud) {
      var self = this;
      this.mqttClient = Client.fromConnectionString(config.serviceString);
      let serviceClient;
      EventHubClient.createFromIotHubConnectionString(config.serviceString).then(function (client) {
        serviceClient = client;
        return serviceClient.getPartitionIds();
      }).then(function (ids) {
        return ids.map(function (id) {
          return serviceClient.receive(id, message_received, error, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
        });
      }).catch(function (error) {
        logger.error("IoT hub connectivity error", error);
        return;
      });
    }
    else {

      var self = this;
      this.mqttClient = DeviceClient.fromConnectionString(config.deviceString, mqtt);

      this.mqttClient.on('message', function (payload) {
        let parseData = JSON.parse(payload.data);
        let parseDataMsgID = JSON.parse(payload.data).messageID;
        var auth = "Basic " + new Buffer.from(parseData.payload.action.options.auth.user + ":" + parseData.payload.action.options.auth.pass).toString("base64");
        let resource = parseData.payload.action.options.url;

        var options = {
          url: resource,
          method: parseData.payload.action.options.method,
          body: parseData.payload.action.options.body,
          json: true
        }
        request(options, function (error, response, body) {
          if (error) console.log(error);
          else {
            try {
              self.pubData(config.responseTopic, body, parseDataMsgID);
            }
            catch (e) {
              console.log(e)
            }
          }

        });

      });
    }
  }

  pubData(topic, data, parseDataMsgID) {
    this.mqttClient.sendEvent(new Message(JSON.stringify({ data: data, messageID: parseDataMsgID, at: Date.now() })), function (err) {
      if (err) {
        logger.error("fail to send on prem response over cloud " + err)
      }
    });
  }

  chunkSubstr(str, size) {
    var numChunks = Math.ceil(str.length / size),
      chunks = new Array(numChunks);
    for (var i = 0, o = 0; i < numChunks; ++i, o += size) {
      chunks[i] = str.substr(o, size);
    }

    return chunks;
  }

  getHttpRequestData(msgId, res) {
    // Add key/value pair insertion with time to live value
    cache.put(msgId, res, {
      ttl: 86400000,
      callback: function (key, value) {
        console.log(key, 'evicted !');
      }
    });
  }

}

var message_received = function (payload) {
  if (payload.body.messageID) {
    let msgId = payload.body.messageID;
    let f = cache.get(msgId);
    cache.remove(msgId);
    f.send(payload.body.data);
  }
};

var error = function (err) {
  logger.error(err.message);
};

module.exports = MqttHandler;
