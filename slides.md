# Building Droids with JavaScript

<!-- .slide: class="title" -->

Xero NodeBots Day, May 8, 2015 <!-- .element: class="location" -->

Andrew Fisher @ajfisher <!-- .element: class="author" -->

Notes:
Hi! My name is Andrew Fisher and besides being an interaction researcher I love
to build robots - especially ones that use web tech. So today we're 
going to use javascript to build robots or other connected things and give 
some of you a first taste of robotics and for some of you show you how feasible
it is now to create physical products using web technologies you're already 
familiar with.


---

## Plan

1. Background on JS + hardware
2. Group basics walkthrough on electronics
3. Start hacking
4. Some food
5. More hacking
6. Show and tell

Notes:
Overview of the day.

How many of you have done any nodebots stuff before?
How many of you have done any electronics before?

Okay so those who have can spend the next half hour doing some planning around
what you might want to build with your team. Those that haven't, I'm going to
give you a crash course in electronics and how to get it doing things with 
javascript. By the time we break up into groups all of you should have got
your hands dirty actually making something work electronically.

So I'm going to start with a bit of background about why on earth you'd want
to use javascript with hardware.

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

So I'm going to start by showing you how the stack works and then we'll consider
the electronics by building some stuff together.

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
I'll walk you through the stack and then we'll all spend 10 minutes building
your first js piece of hardware.

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

# Electronics Crash Course

<!-- .slide: class="title" -->


Notes:

---

### V=I.R (Ohms Law)

![](/images/vir.png)

(C)<!-- .element: class="attribution" -->
[Sparkfun](https://sparkfun.com)

Notes:

---

### Ohm's Law another way

![](/images/ohm2.jpg)

Notes:

---

### Hardware hello world
<!-- .slide: data-background="/images/hello_world.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[Daniel Novta](http://www.flickr.com/photos/vanf/5210360116)

Notes:
So we plug in an LED (this one is bigger than normal so you can see it
easily) and then we’ll need to write some code.

---

### Using a breadboard

![](/images/breadboard.jpg)

Notes:
This is a breadboard. We use them to prototype circuits so we don't have to solder
You can see here the way the lines are connected.

---

### node-ardx.org


Notes:
This is an awesome resource that shows you how to apply the various components
in this kit and shows you how to use them in JS.

For the moment we're just going to focus on the getting started one right now.

(Switch to NodeARDX site).

---

### Base install

```
# from command line post node install

npm install johnny-five
```

Notes:
This is the main package that we're going to be using.
If you look in node_modules/johnny-five you'll see a folder called
docs and a folder called eg. Each component is broken out specifically 
so you can see how it works and the api for it as well. Also
checkout johnny-five.io for more documentation.

From wherever you installed johnny-five, create a file called blink.js
and then write this code.

---

### Hello world code

```
var five = require('johnny-five');

var board = new five.Board();

board.on("ready", function() {
    console.log('connected');

    var led = new five.Led(10);
    setInterval(function() {
        led.toggle();
    }, 1000);
});
board.on("error", function(err) {
    console.log(err);
});
```

Notes:
// Go interactive version here to show connecting and turning an LED on and
// off.

---

## Equipment

* ARDX Kits
* LEDs & NeoPixels
* Light sensors
* Servos 180 and 360
* Buttons
* Ultrasonic sensors

---

## Resources

* node-ardx.org
* johnny-five.io
* github.com/nodebotsau/simplebot
* ajf.io/buildingdroids
* nodebotsau.io

Notes: 

If you want to play with this stuff, here's some resources you can have a look
at to go further. We also run events at Hack Melbourne every month on the first
Wednesday as well as bigger events through the year.

