'use strict'

var mosca = require('mosca');

var moscaSettings = {
    host: '0.0.0.0',
    port: 1883,
    http: {
        port: 8002,
        host: '0.0.0.0',
        static: './mqtt/',
        bundle: true,
    },
};

var server = new mosca.Server(moscaSettings);
server.on('ready', () => {
    console.log("MQTT server is ready on port %s", moscaSettings.port);
    console.log("HTTP Server is ready on pott %s", moscaSettings.http.port);
});

server.on('published', (packet, client) => {

    // here we see if a client has published a tempfeed value and if
    // so we augment it with other data.
    if (client != undefined) {
        console.log('%s published a message', client.id, packet.payload.toString());

        if (packet.topic == "tempfeed") {
            let value = packet.payload.toString();
            let time = (new Date()).getTime() / 1000;
            let dp = {
                sensor_id: client.id,
                time: time,
                y: value,
            };
            server.publish({
                topic: 'tempfeed/data',
                payload: JSON.stringify(dp)
            });
        }
    }
});

server.on('clientConnected', (client) => {
    console.log('client has connected', client.id);
});

// fired when a client subscribes to a topic
/**server.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
  if (client != undefined) {
      console.log('subscriber: %s', client.id);
  }
});**/
/**
// fired when a client subscribes to a topic
server.on('unsubscribed', function(topic, client) {
  console.log('unsubscribed : ', topic);
});

// fired when a client is disconnecting
server.on('clientDisconnecting', function(client) {
  console.log('clientDisconnecting : ', client.id);
});

server.on('clientDisconnected', (client) => {
    console.log('client disconnected %s', client.id);
});
**/


