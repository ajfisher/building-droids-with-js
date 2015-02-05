# Building Droids with JavaScript

<!-- .slide: class="title" -->

SLASSCOM Robotics Workshop, February 6, 2015 <!-- .element: class="location" -->

Andrew Fisher @ajfisher <!-- .element: class="author" -->

Notes:
Hi! My name is Andrew Fisher and I’m an interaction researcher. Today I
want to talk to you about web connected hardware and building droids with
javascript for the next 30 minutes.

---

## JS all the real things
<!-- .slide: data-background="/images/typewriter.jpg" -->


(CC) Flickr <!-- .element: class="attribution" -->
[Quasimodo](http://www.flickr.com/photos/quasimondo/5203908319)

Notes:
Hardware for a long time was really hard. My initial interest in computing
really came from an interest in electronics. But the reality was that for a kid
growing up in the late 80s, early 90s, building serious hardware was
prohibitively expensive and required facilities that most kids didn’t have
access to in those days - even the idea of something like a hacker space or
a makerspace didn’t exist then.

Doing anything non-trivial in hardware was a very difficult undertaking. As
a result, I moved to software. As you’d expect, in the world of software, the
effort to reward ratio was far better than for hardware, especially for the
attention span of a teenager.

And this situation remained the case until the early 2000s.

---

## Hardware is more like software 
<!-- .slide: data-background="/images/working.jpg" -->

JS Conf 2013 <!-- .element: class="attribution" -->
[Matthew Bergman](http://twitter.com/fotoverite)

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
write a lot of code.

You have insane limitations. It’s like going back to the 80s - an arduino for
example has TWO KILOBYTES of RAM.

---

### Working low level
<!-- .slide: data-background="/images/intel_4004.jpg" -->

(CC) Flickr <!-- .element: class="attribution" -->
[Rostislav Lisovy](http://www.flickr.com/photos/lisovy/4677688431/)

Notes:
Playing at the chip level gives you masses of control but your iteration
cycles take time and you’re constantly thinking about things like memory
and garbage collection and not frying a chip. Debugging is also generally a
nightmare.

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
things but you can’t fundamentally change the hardware. Having said that,
people have done some fantastic things at this level.

So there’s plenty of very interesting devices you can grab hold of and start
playing about with really easily.

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
So this approach gives you the ability to prototype rapidly as well as work
almost directly with the hardware. There are some limitations around some
hardware but to start off with and for some prototyping that doesn’t matter.

To show you how easy this is let’s make something here and now.

---

### First steps

![Arduino](/images/arduino.jpg)<!-- .element: width="60%" -->

Notes:
We’re going to focus on the arduino. 

This is an arduino - they cost about $30, they are awesome and come in
many different forms for different applications from small to large. They run
off USB or a battery so it’s hard to blow them up and even harder to
electrocute yourself. There is also huge amounts of community information
about them.

Now the arduino is way too under powered to run JavasScript so we’re going
to use our computer to do that. As such we just need to pass messages
down the wire to the arduino over the USB cable so for that we use a
protocol called Firmata.

So Firmata allows you to tell the arduino to do things like turn a pin on or
off, take a reading etc. Firmata is a neat idea as it exposes nearly all of the
features of the arduino but via a protocol so now you can control it from
somewhere else that talks the firmata protocol...

Hang on - that sounds suspiciously like an API and an API can tap into other things.

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
var repl = require("repl");

if (process.argv[2] == null) {
    console.log("You need to supply a device to connect to");
    process.exit()
}

var board = new firmata.Board(process.argv[2], function(err) {

    if (err) {
        console.log(err);
        process.exit();
    }
    console.log('connected');

    //board.pinMode(ledPin, board.firmata.MODES.OUTPUT);
    // board.digitalWrite(13, 1)
    repl.start("board> ").context.board = board;
});
```

Notes:
Go interactive version here to show connecting and turning an LED on and
off.

I’ve got a little bit of scaffolding here so I don’t have to type everything. But
you can see it just creates a board and connects it. Now it’s connected we
can tell the board we want to assign a pin as an output then we’ll tell it to
make the pin go HIGH which means send it some volts - we do that with the
digitalWrite command. Then we can make it go LOW and as you can see as I
do this it turns the LED on and off.

---


### Web thing hello world

http://github.com/ajfisher/nbscaffold

Notes:
So we’re all web devs here so let’s not stray too far away from our comfort
zone. Let’s wrap a web interface around this light so we can turn it on and
off with a click of a button on a page.

We can’t do this interactively very easily so I’ll show you some code.

This is a bit of overkill but we’re going to use express and web sockets so
it’s a bit more realtime but also it will lay the foundation for what I’ll show
you next.

We set up the socket messages on the server to switch things on and off .
On the client side all our HTML and JS is doing is just sending messages on
click so nothing too interesting.

And there we go - button click to turn a light on and off via a web browser.


---

### Easy install

```
# from command line post node install

npm install firmata express socket.io
```

Notes:
So this stack can be created with pretty much just this command plus an
arduino with firmata on it in about 2 minutes.

Which is pretty cool. And it’s robust enough now that it’s most likely going
to work the first time you try it.

Now it’s pretty cool to be able to connect a web page to a bit of hardware
right?

---

### Hardware as objects

```
var led = new five.Led(13);
led.blink(1000);
led.stop();
led.on();
```

Notes:
Wouldn’t it be great if we could do something like this rather than telling
the pins to turn on and off?

Wouldn’t it be cool to have some sort of abstraction for LEDs which are
super common and be able to interact with them in standard ways?

Well we can, thanks to a project called Johnny Five that was kicked off about
2 years ago by a chap called Rick Waldron.

---

### Johnny Five

Notes:
Johnny Five uses the firmata protocol we were just using but provides
abstractions for common electronic devices. Things like LEDs, sensors,
motors, accelerometers - all sorts of things. The list keeps growing all the
time and there’s now over 60 committers to the project.

This means we can prototype really, really fast and build cool things.

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

### SimpleBot NodeBot

TODO: SB here

Notes:
This is a NodeBot called the SimpleBot. It was designed in Australia as a way 
to be able to teach simple robotics using inexpensive components but in a way
that can be extended.

It uses two servo motors, some AA batteries, an arduino and your computer running
node JS.

These are what we'll build in the workshop today with your kits.

---

### SimpleBot layout

TODO: Image simplebot template

Notes:

The core of the robot won't take you long to build. They are designed to go 
together very rapidly so you can spend time customising them and extending them.

The things you should be aware of are:

- Get the battery as close to the centre of the wheels as possible for balance.
- Make sure you have good traction. Rubber bands, hot glue work well here.
- Your robot has differential drive which means you can spin it on the spot if you need to
- Software and responding to errors and external events matters make sure you spend time on code
- Coreflute is strong in one direction and weaker in the other, use this to shape your bot.

---

## Challenge

TODO: Robot fights

Notes:
At the end of the day we will have a sumo fight to find the best SimpleBot sumo
champions.

The battles will be elimination at all stages.

The only rules are that you cannot build a bot that is bigger than 30cm on any dimension
and that you win by the other player leaving the circle icluding if they drive
out themselves.

If you aren't interested in battling your robot then we will also do a quick
show and tell at the end as well if you want to show us what you have got.

---

## Resources

SimpleBot repo
This presentation


