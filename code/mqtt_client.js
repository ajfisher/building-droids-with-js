var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://127.0.0.1:1883', {
//var client  = mqtt.connect('mqtt://broker.hivemq.com:1883', {
//    clientId: 'mqttjs_12345',
//    keepalive: 10000,
//    clean: false,
});

client.on('connect', function () {
  client.subscribe('presence');
  client.publish('presence', 'Hello C1', client);
  client.subscribe('tempfeed');
});

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  //client.end();
});
