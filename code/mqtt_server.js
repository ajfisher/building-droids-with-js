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
    console.log("MQTT server is ready on port 1883");
});

server.on('clientConnected', (client) => {
    console.log('client has connected', client.id);
});

server.on('published', (packet, client) => {
    //console.log('published packet', packet);
	//console.log('payload: %s', packet.payload.toString());
    if (client != undefined) {
        console.log('%s published a message', client.id, packet.payload.toString());
    }
});

// fired when a client subscribes to a topic
server.on('subscribed', function(topic, client) {
  console.log('subscribed : ', topic);
  if (client != undefined) {
      console.log('subscriber: %s', client.id);
  }
});

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


/**setInterval(()=> {
    let value = Math.round(Math.random()*30);
    console.log('sending tempfeed %s', value);
    server.publish({
        topic: 'tempfeed',
        payload: value.toString()
    });
}, 5000);**/

