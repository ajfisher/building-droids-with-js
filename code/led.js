var five = require("johnny-five");

if (process.argv[2] == null) {
    console.log("You need to supply a device to connect to");
    process.exit()
}

var board = five.Board({port: process.argv[2]});

board.on("ready", function() {

    var pin = 10;

    var led = new five.Led(pin);

    led.blink(500);

});
