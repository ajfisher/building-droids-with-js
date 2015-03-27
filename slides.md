# Building Droids with JavaScript

<!-- .slide: class="title" -->

Decompress, March 28, 2015 <!-- .element: class="location" -->

Andrew Fisher @ajfisher <!-- .element: class="author" -->

Notes:
Hi! My name is Andrew Fisher and I’m an interaction researcher. Today I
want to talk to you about web connected hardware and building droids with
javascript for the next 15 minutes.

---

## JS all the real things
<!-- .slide: data-background="/images/typewriter.jpg" -->


(CC) Flickr <!-- .element: class="attribution" -->
[Quasimodo](http://www.flickr.com/photos/quasimondo/5203908319)

Notes:
My initial interest in computing came from an interest in electronics. 
But the reality was that for a kid growing up in the late 80s, building serious hardware was
prohibitively expensive and required facilities that most kids didn’t have
access to in those days.

Doing anything non-trivial in hardware was a very difficult undertaking. As
a result, I moved to software. As you’d expect, in the world of software, the
effort to reward ratio was far better than for hardware, especially for the
attention span of a teenager.

And this situation remained the case until the early 2000s.

---

## Hardware is becoming more like software 
<!-- .slide: data-background="/images/arduino_nano.jpg" -->

(CC) <!-- .element: class="attribution" -->
[Phil Farugia](#)

Notes:
Until this came along - this is an arduino and it has changed the way
hardware is thought of. Hardware was no longer expensive - these were
designed at the time to be less than 20 euros and the designs were open
sourced, meaning anyone could make them. Today you can get them for
$8. Sophisticated hardware became accessible to students, artists, kids and
web people with little repercussion for blowing one up. With it, this
community has brought ideas around design, user experience, art and
software and architectural principles. 

More recently, over the last 2 years, some great work has been done in the
node community getting JS to work with hardware like this - to the point
where working with hardware using javascript is now extremely easy.

So today, I want to talk to you about that and how all of you can all start
working with hardware with JS and along the way we’ll bump into some
robots.

---

## TODO

1. Different ways to interface with hardware
2. The JS / hardware stack
3. Applications and examples

Notes:
So to do this, we’ll look at.

How we can interact with hardware.

Some code to show what a common JS hardware stack starts to look like

Then we’ll play with some examples.

---

## Working with hardware
<!-- .slide: data-background="/images/atmega.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[Oskay](http://www.flickr.com/photos/oskay/2310115216/)

Notes:
Let’s start by looking conceptually at how we develop with hardware. I think
about this at sort of three levels. 

At the metal

At the device

And somewhere in between.

---

### Working with the metal
<!-- .slide: data-background="/images/metal.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[Wonderlane](http://www.flickr.com/photos/wonderlane/3198166347) 

Notes:
Here we are usually writing code specifically for a chip or board at a very
low level. It usually means writing C or C++. You can get a bit of
abstraction with hardware libraries but even with good libraries you need to
write a lot of code. You get lots of control but the price is speed - iterations
take a lot longer.

---

### Device hacking
<!-- .slide: data-background="/images/little_printer.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[Roo Reynolds](http://www.flickr.com/photos/rooreynolds/9350631793)

Notes:
So At the other end of the spectrum there are devices that are already
made. This is hardware with APIs - maybe they are via the network, maybe
via an embedded web server or some sort of serial protocol. 

However it works, you’re basically interacting with the hardware given to
you as a service.

You can build clever ways of working with the service but fundamentally
you can’t change the way the hardware works.

---

### AR Drone
<!-- .slide: data-background="/images/ardrone.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[Neerav Bhatt](http://www.flickr.com/photos/neeravbhatt/6885424870)


Notes:
A good example of this is the AR Drone - you can play with using a node
library to interact with the copter directly to do some really interesting
things but you can’t fundamentally change the hardware. 

---

### Hardware in comfort
<!-- .slide: data-background="/images/keyboard_pants.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[Zack Hoeken](http://www.flickr.com/photos/hoeken/3519955473/)


Notes:
In between these extremes though is a new category, where you can work
with and change the hardware but you can still use high level languages to
do it. This is a great combo as it allows for rapid prototyping but also
makes hardware more accessible to non-embedded application designers -
people like us - web designers and developers to be able to tinker with.

---

### Sketching in hardware
<!-- .slide: data-background="/images/sketching.jpg" -->

(CC) Flickr <!-- .element: class="attribution"-->
[Camille Moussette](http://www.flickr.com/photos/9225693@N08/6051548279)

Notes:
To show you how easy this is let’s make something here and now.

---

### First steps

![Arduino](/images/arduino.jpg)<!-- .element: width="60%" -->

Notes:
We’re going to focus on the arduino. 

They run off USB or a battery so it’s hard to blow them up and even harder to
electrocute yourself. There is also huge amounts of community information
about them.

Now the arduino is way too under powered to run JavasScript so we’re going
to use our computer to do that using a protocol called Firmata.

So Firmata allows you to tell the arduino to do things like turn a pin on or
off, take a reading etc. Firmata is a neat idea as it exposes nearly all of the
features of the arduino but via a protocol so now you can control it from
somewhere else that talks the firmata protocol...

Hang on - that sounds suspiciously like an API.

---

### The JS hardware stack

Arduino (sensors and actuators)

Firmata (communications protocol)

NodeJS (application logic)

WS/HTTP (networking and security protocols)

Client (UI, input, visualisation)

Notes:
So this is what the JS hardware stack looks like. 

We’ve got an arduino with sensors and actuators. Firmata which provides
the communications protocol. The NodeJS application gives us application
logic and integration with other libraries.

Networking is provided over http or websockets and this can give us
security and encryption.

Finally the web page for the client gives as input methods, a data viz layer
as well as user interface.

Let's build something using this now.

---

### Hardware hello world
<!-- .slide: data-background="/images/hello_world.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[Daniel Novta](http://www.flickr.com/photos/vanf/5210360116)

Notes:
So we plug in an LED (this one is bigger than normal so you can see it
easily) and then we’ll need to write some code.

---

### Hello world code

```
var firmata = require('firmata');
if (process.argv[2] == null) {
    console.log("You need to supply a device to connect to");
    process.exit()
}

var board = new firmata.Board(process.argv[2], function(err) {

    console.log('connected');

    board.pinMode(10, board.OUTPUT);
    var state = false;
    setInterval(function() {
        state = ! state;
        board.digitalWrite(10, state);
    }, 1000);
});
```

Notes:
// Go interactive version here to show connecting and turning an LED on and
// off.

This is a pretty simple script. It sets up a connection to a board then sets 
pin 10 to be an OUTPUT. After that there's a timer which simply changes the
pin 10 to be 1 or 0 or in electronics terms, high or low.

That is the blink tag in JavaScript on hardware.

---


### Web thing hello world

```
var firmata = require("firmata");

if (process.argv[2] == null) {
    console.log("Please supply a device to connect to");
    process.exit();
}

// web server elements
var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var board;

// Set up the application server

app.configure(function() {
    app.set('port', 8001);
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
});

server.listen(app.get('port'));

// Set up Socket IO
var io = require('socket.io').listen(server);
io.set('log level', 1);

app.get('/', function(request, response) {
    response.sendfile(__dirname + '/public/index.html');
});

io.sockets.on("connection", function(socket) {

    if (board.ready) {
        socket.emit("connect_ack", {
            msg: "Welcome Control", 
            state: "ONLINE"
        });
    } else {
        socket.emit("connect_ack", {
            msg: "Welcome Control", 
            state: "NOPINS"
        });
    }

    socket.on("toggle", function(data) {
        board.digitalWrite(pin, data.state);
    });
});

// SET up the arduino and firmata
var pin = 10; // led pin to turn on.
board = new firmata.Board(process.argv[2], function(err) {
    if (err){
        console.log(err);
        process.exit();
    }
    console.log("Control via your browser now");
});

```

Notes:
So we’re all web devs here so let’s not stray too far away from our comfort
zone. Let’s wrap a web interface around this light so we can turn it on and
off with a click of a button on a page.

This is a bit of overkill but we’re going to use express and web sockets so
it’s a bit more realtime.

We set up the socket messages on the server to switch things on and off .
On the client side all our HTML and JS is doing is just sending messages on
click so nothing too interesting.

And there we go - button click to turn a light on and off via a web browser.

---

### Web thing hello world

<iframe class="external" src="http://localhost:8001/"></iframe>

github.com/ajfisher/nbscaffold

Notes:
The code you can get for this here

---

### Easy install

```
# from command line post node install

npm install firmata express socket.io
```

Notes:
So this stack can be created with pretty much just this command plus an
arduino with firmata on it in about 2 minutes and it's generally going to work.
Yes, even on Windows.

Now it’s pretty cool to be able to connect a web page to a bit of hardware
right?

---

### Hardware as objects

```
var led = new Led(13);
led.blink(1000);
led.stop();
led.on();
```

Notes:
Wouldn’t it be great if we could do something like this rather than telling
the pins to turn on and off?

Wouldn’t it be cool to have some sort of abstraction for LEDs which are
super common and be able to interact with them in standard ways? Wouldn't it be
great to be able to do this for all sorts of common hardware?

Well we can, thanks to a project called Johnny Five that was kicked off about
2 years ago by a chap called Rick Waldron.

---

### Johnny Five
<!-- .slide: data-background="/images/rick.jpg" -->

(C)<!-- .element: class="attribution" -->
[Joanne Daudier](https://twitter.com/jdaudier)

Notes:
Johnny Five uses the firmata protocol we were just using but provides
abstractions for common electronic devices. Things like LEDs, sensors,
motors, accelerometers - all sorts of things. The list keeps growing all the
time and there’s now over 60 committers to the project.

This means we can prototype really, really fast and build cool things.

---

### Build stuff
<!-- .slide: data-background="/images/tetris.gif" -->

(C)<!-- .element: class="attribution" -->
[Adrian Catalan](https://twitter.com/ykro)

Notes:
Like tetris games

---

### Build stuff
<!-- .slide: data-background="/images/skirt.jpg" -->


Skirt (C)<!-- .element: class="attribution" -->
[Kassandra Perch](https://twitter.com/nodebotanist) | 
Image (CC) [Matthew Bergman](https://www.flickr.com/photos/matthewbergman/15969524882/in/set-72157649619016521)

Notes:
Like skirts that you can control the colours on

---

### Build stuff
<!-- .slide: data-background="/images/catbot.jpg" -->

(C)<!-- .element: class="attribution" -->
[Suze Hinton](https://twitter.com/noopkat)

Notes:
Like Robots.

---

### Looking for droids?
<!-- .slide: data-background="/images/droids.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[⣫⣤⣇⣤](http://www.flickr.com/photos/donsolo/3768623542/)

Notes:
So let’s look at a robot that is built with web tech.

---

### NoDLE

<iframe class="nodle" src="http://10.0.2.40:8000/"></iframe>

github.com/ajfisher/ajnodebot

Notes:

This is an ongoing NodeBot project called NoDLE. It uses a Raspberry Pi for 
running node, an arduino to control motors and servos, it can capture and
process video and it can tell its distance. 

And this is all just built with web tech.

---


## Resources

* github.com/nodebotsau/simplebot
* ajf.io/buildingdroids
* github.com/rwaldron/johnny-five
* nodebotsau.io

Notes: 

If you want to play with this stuff, here's some resources you can have a look
at to go further. We also run events at Hack Melbourne every month on the first
Wednesday as well as bigger events through the year.

---

# Building Droids with JavaScript

<!-- .slide: class="title" -->

Decompress, March 28, 2015 <!-- .element: class="location" -->

Andrew Fisher @ajfisher (ajf.io/buildingdroids) <!-- .element: class="author" -->

Notes:

So today I've set up a space that you can come and play in. We have 
various bots and if you want to build one you can. There's some kits if you want
to take one with you and if we get enough interest, maybe we'll do a sumo bot
battle at the end of the day.
