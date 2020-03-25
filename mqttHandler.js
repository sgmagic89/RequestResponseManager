/* 
 * COPYRIGHT (C) 2019 Molex - All Rights Reserved
 */
var request = require('request'),
  awsIot = require('aws-iot-device-sdk'),
  logger = require("./Logger/logger"),
  config = require('./config/system.config');

if (config.onCloud) {
  var Cache = require('timed-cache');
  var cache = new Cache({ defaultTtl: 300 * 1000 });
}

class MqttHandler {
  constructor() {
    this.mqttClient = null;
  }

  // Sends a mqtt message to topic: topic
  sendMessage(message) {
    this.mqttClient.publish(config.topic, JSON.stringify(message));
  }

  connect() {
    this.mqttClient = awsIot.device({
      keyPath: 'Aws/private.pem.key',
      certPath: 'Aws/certificate.pem.crt',
      caPath: 'Aws/root.ca.pem',
      host: config.cloudBroker.endpoint
    });
    

    // Mqtt error calback
    this.mqttClient.on('error', (err) => {
      logger.error(err);
      this.mqttClient.end();
    });

    // Connection callback
    this.mqttClient.on("connect", function (res) {
      if (res) {
        logger.info(`mqtt client connected`);

      } else {
        logger.info(`mqtt client connection failure`);
      }


    });
    if (config.onCloud)
      this.mqttClient.subscribe(config.responseTopic, { qos: 0 });
    else
      this.mqttClient.subscribe(config.topic, { qos: 0 });
    // mqtt subscriptions


    this.mqttClient.on('message', (topic, payload) => {
      this.process(topic, payload)
    });

    this.mqttClient.on('reconnect', () => {
      logger.info(`mqtt client reconnect`);
    });

    this.mqttClient.on('offline', () => {
      logger.info(`mqtt client offline`);
    });

    this.mqttClient.on('close', () => {
      logger.info(`mqtt client disconnected`);
    });
  }

  process(topic, payload) {
    switch (topic) {
      case config.topic:
        let parseData = JSON.parse(payload);
        let parseDataMsgID = JSON.parse(payload).messageID;
        var auth = "Basic " + new Buffer.from(parseData.payload.action.options.auth.user + ":" + parseData.payload.action.options.auth.pass).toString("base64");
        let resource = parseData.payload.action.options.url;
        var self = this;
        var options = {
          url: resource,
          method: parseData.payload.action.options.method,
          body: parseData.payload.action.options.body,
          json: true
        }
        request(options, function (error, response, body) {
          if (error) console.log(error);
          else self.pubData(config.responseTopic, body, parseDataMsgID);
        });

        break;
      case config.responseTopic:
        let parseResponseData = JSON.parse(payload);
        let msgId = parseResponseData.messageID;
        let f = cache.get(msgId);
        cache.remove(msgId);
        f.send(parseResponseData.data);
        break;
    }

  }

  pubData(topic, data, parseDataMsgID) {
    this.mqttClient.publish(topic, JSON.stringify({ data: data, messageID: parseDataMsgID, at: Date.now() }), { qos: 0 });
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
    // this.messageStore[msgId] = res;
  }

}

module.exports = MqttHandler;
