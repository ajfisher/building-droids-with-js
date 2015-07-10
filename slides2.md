
# Droids, JavaScript and Web Connected Hardware

<!-- .slide: class="title" -->

Decompress, March 28, 2015 <!-- .element: class="location" -->

Andrew Fisher @ajfisher <!-- .element: class="author" -->

Notes:
Hi! My name is Andrew Fisher and I’m an interaction researcher. Today I
want to talk to you about Droids, JavaScript and Web Connected hardware for 
the next 25 minutes.

---

## JS all the real things
<!-- .slide: data-background="/images/typewriter.jpg" -->


(CC) Flickr <!-- .element: class="attribution" -->
[Quasimodo](http://www.flickr.com/photos/quasimondo/5203908319)

Notes:
My initial interest in computing came from an interest in electronics. 
But the reality was that for a kid growing up in the late 80s, building serious 
hardware was prohibitively expensive and required facilities that most kids 
didn’t have access to in those days.

Doing anything non-trivial in hardware was a very difficult undertaking. As
a result, I moved to software. As you’d expect, in the world of software, the
effort to reward ratio was far better than for hardware, especially for the
attention span of a teenager.

And this situation remained the case until the early recently.

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
$5. Sophisticated hardware became accessible to students, artists, kids and
web people with little repercussion for blowing one up. With it, this
community has brought ideas around design, user experience, art and
software and architectural principles. 

More recently, over the last few years, some great work has been done in the
node community getting JS to work with hardware like this - to the point
where working with hardware using javascript is now extremely easy.

So today, I want to talk to you about that and how all of you can all start
working with hardware with JavaScript and we'll see some of the great things
the community has done along the way..

---

## TODO

1. Why use JS for robotics?
2. Introduction to the NodeBots stack
3. Applications and examples

Notes:
So to do this, we’ll consider:

Why javascript and why would we do this in JS

We'll then look at the hardware stack and show some code 

Then we’ll play with finish with some examples.

---


## Why use javascript for robotics?

Notes:

Most people don't naturally think about JavaScript as a language that should 
be used for programming hardware. JS is the language of the web! It's only
place is in the browser? Right?

Lets see how some of it's features make JS and hardware really powerful together.

JavaScript has struggled to make the transition from a quirky language that
people think is just used to validate forms or make links change colour when
you roll over them. 

--- 

### JavaScript is too dynamic to be precise...

What if the Mars Curiosity was programmed with JavaScript, huh?

I’ll tell you what would’ve happened. It would’ve crashed into Venus spitting 
out NaN errors.

— Glenn Siegman (@gsiegman) August 15, 2013

Notes:

At the start of the JS hardware movement a few years ago this tweet came onto
my feed. 

The implication was that JS is so quirky and incapable of precision that
not only would a rocket crash into a planet, but it would crash into Venus
instead of Mars. 

It's easy to pick on JS because the language is so mutable that you can do
crazy things with it and yet we forget that statically typed and memory mapped
languages have caused significant security and software bugs over the years.

---

### Real hardware engineers use C...

Pic of the tessel and micropython thing

Notes:

Given how long C has ruled the hardware world, there is a major bias in that
all hardware must use C. This is still mostly the case - especially with older
or cheaper chips. However the next generation of medium cost chips are more or
less here now that can run python and JavaScript natively.

Recall that people used to say that C was too difficult to run on chips and it
all had to be done in machine code. Computing power increases and each time it
does we use high level abstractions and languages to program them.

Let me ask a question:

How many of you know how to program in C?

Okay - so how many of you LOVE to program in C? None. No one loves programming
in C even if you're capable of it - it takes a long time to do not a lot and 
let's face it, trying to build web applications in C produces some of the most
awful web interfaces known to man.

---

### Web apps designed by hardware engineers

Pic of some router or a printer app etc.

Notes:

This is what happens when you get a hardware engineer to design web applications.
This is recent as well - it came off my router at home.

---

### So why use JS for robotics then?

Notes:

Let's assume the language is as capable as any other - and besides the fact we
are all JS developers here. Why use JavaScript compared to some other high 
level language.

For me it really comes down to two things:

JavaScript's inherent event handling
JavaScript's dynamic object prototyping

---

### EventEmitter

Notes:

JavaScript has incredible event handling. We tend to take this for granted, but
due to it's birth as an interface related language, it has one of the most
incredible event systems of any modern language. If you work in NodeJS then you
know that you have EventEmitter available and it's just amazing at allowing
different parts of your application to talk to each other.

---

### The real world is all events

Notes:

When you're designing something to work in the real world thinking about events
makes so much sense that it makes your code very clean, modular and responsive.

Say you are designing a door entry system with a card. In JS we simply define
an event listener and wait for the card swipe to occur with the detals of the
card and then handle it. We can do the same thing in C but we write a lot of
code, have to use interrupt handlers and make sure we suspend the system state
properly or our door will crash.

JS is designed to just work with this sort of behaviour. Got a robot that 
has a distance sensor on it? Events will come in when the distance changes.
If it gets below say 10cm then emit your own event saying "Obstacle" and any
listener can now do something with that. 

---

### Objects need structure and flexibility

```
var motor = new Five.Motor();
motor.start();
```

Notes:

We're all familir with the way JS handles objects. And I'll show you more
of this in a moment but the hardware framework we use allows us to consider
hardware as objects as well such as the case of this motor. Really I don't 
want to care about the underlying detail of how different types of motors work 
- I just want to use it to make the wheels of my robot turn.

---

### Prototypes are great

```
var left_motor = new Five.motor({controller: 'I2C'});
var right_motor = new Five.motor({controller: 'PCA34567'});

left_motor.start();
right_motor.stop();

left_motor.prototype.double_speed = function() { .. };

```

Notes:

For end users this is awesome but as a developer writing JS drivers for things 
like motors being able to define a shape and then allow you to attach the
appropriate controller is great too.

Likewise as the end user you all know you can extend the prototype and make your
own versions of it if you need something really specific such as going twice
as fast when you call start.

---

### JS <3 Robotics

Notes:

That's enough of talking about why JS is really well suited to working with robotics.
We all work with JavaScript and know it's a real and interesting language -
Let's move on to what the hardware stack looks like.

---

## The NodeBots stack

NodeBots Logo

Notes:

There are a few different projects that can use JavaScript on hardware now,
however the one we're going to talk about is called nodebots as it's very much
aimed at a NodeJS implementation with hardware. At the core of nodebots are
transport layers to deal with things like talking over USB or wireless or serial
connections and then wrapped around that is a framework called Johnny Five.

---

## Johnny Five

Rick picture

Notes:

Johnny Five is a hardware abstraction framework so instead of writing code that
is specific to a chip you can talk about components that behave in different
ways and leave the implementation details up to the people who write the 
board level interfaces whereupon you can then use it.

Johnny Five was started by this guy - Rick Waldron, and there are now about
30 core project members, nearly 100 contributors and over 2000
commits to the codebase in the last couple of years. It's a very active and
expanding project and we're always looking for more contributors to help out.

---

### The stack

Controller board (sensors and actuators)

IO Plugin (communications protocol)

Johnny Five / NodeJS (application logic)

WS/HTTP (networking and security protocols)

Clients (UI, input, visualisation)

Notes:

So this is what the typical JS hardware stack looks like. 

We have a board which could have sensors and actuators. Actuators is just a
fancy word for something that does something in the real world - like a motor
or an LED etc. Most controller boards can't run JS yet so we normally need to 
put some firmware on them to do what we want.

This talks via a communications protocol to what is called an IO Plugin. IO
plugins are a Johnny Five idea that tries to get hardware to behave in consistent
ways via a protocol. Think of this sort of like HTTP requests and responses - 
it doesn't really matter WHAT the server does once it gets the request but
so long as it returns a response that is HTTP then the client doesn't care. IO
plugins do that for hardware - turn a pin on, turn it off, take a sensor reading,
move a servo - these are all defined as part of the IO plugin protocol.

Johnny Five gives us hardware abstraction so we can turn motors and LEDs into 
JavaScript objects and interact with them. As a side effect we get all of NodeJS
as well so that means we can start doing interesting things like linking up
with our normal web protocols. And then finally we can add clients for things
like UI, input and what not.

---

### A basic stack

Controller board (Arduino)

IO Plugin (Firmata over USB)

Johnny Five / NodeJS (application logic)

WS/HTTP (networking and security protocols)

Clients (UI, input, visualisation)

Notes:

So in practice this is what a specific implementation of this stack looks like.
You can see we've got an arduino board in this case and the IO Plugin is 
a firmware called Firmata which provides us the interface to the board for Johnny
Five. This is about the most basic and most common stack you can use but you can
see that the bit we are concerned about - being the bit in the middle pretty
much stays the same all the time.

---

## NodeBots hardware

* Servos, Motors, ESCs, Stepper motors
* Accelerometers, Gyroscopes, Compasses, IMUs
* Temperature, Proxitimity, Pressure sensors
* LEDs, NeoPixels, Pixel matrices
* Switches, Joysticks, Buttons
* LCDs

Notes:

In terms of hardware - there is a lot covered in Johnny Five and more core
components are still being added. The intent is to have the majority of the
most common electronics components you're likely to come across available in
the framework and then you can use then to compose bigger objects that then
represent your thing that you're making.


---

### Installation 

* Board development environment (eg Arduino)
* Flash board with protocol (eg Firmata)
* npm install johnny-five
* Write code
* ...
* Make an awesome robot

Notes:

So to get up and running, it's pretty much just a case of getting the board dev
environment going. For arduino that's prerry much just download the arduino
IDE and install it. You then put the IO protocol on the board that you need - 
for an arduinon that just means using Firmata and then it's an npm install
and you are then writing code.


---

## Examples and applications

Notes:

With all this power, what sort of things can you build? Well I'm going to show
you some examples of some fun things people have made and show you some code
as well.

---

### SimpleBot

Notes:

This is a basic teaching bot we use in Australia for nodebots events. Very
basic and allows you to explore fundamentals of robotics design and motion. It
is very cheap and fast to build so good for beginners.

---

### Node Dress

Notes:

This dress, made by Kassandra Perch is fully contained running javascript on a little board embedded into
it. It has an accelerometer and as you move around the LEDs inside it light up
different colour. So you can even use JavaScript in your clothing!!


---

### Tetris

Notes:

Here is an example of using nodeJS to make a physical game. This is made by 
Adrian Catalan and uses nodebots and node-pixel to make a tetris game on
LED panels.

---

### Tharp

Notes:

Donovan Buck has done a lot of work on making sophisticated animation control
in nodebots with a library to solve inverse kinematics problems. Here you 
can see he has attached a 6-leg robot to a leap motion for hand control and it
responds very very fast to his movement. 

---

### Hello World

Notes:

So now you've seen some examples, let's see a demonstration. With hardware you 
most of the time don't have a screen. So a hello world example is just getting
an LED to blink on and off.

---

### Circuit

Notes:

We will use an arduino and we're just going to plug an LED into this pin 10 here.
The arduino will run firmata like I described before and then we'll use Johnny
Five to control it all.

---

### Hardware hello world

Notes:

So here's the code to make this work. You can see here that I have the board 
connect and then when it is ready the callback fires and I have a simple call to
blink every 500ms. This is a convenience method which just sets a timer interval
and then calls it.

So let's see that work. Switch to code.

Easy right - that is like the blink tag in hardware!!

---

### Web page LED

Notes:

So that's great but what about if you want something connected to the browser?

We'll use the same circuit but this time we can use express to make a web page.
You can see here the code is mostly just setting up page routes and then we
use web sockets to send a message when the button is clicked.

After that it's mostly just the same code as before. Connect to the board and
make it respond to a message.

---

### Web connected light

Notes:

So here it is working - as I click the button the LED turns on and off. All with
JavaScript and a little bit of hardware.

---

### mBot

Notes:

This final demonstration is a little more complex. This is an mBot - made by
a company here in Shenzhen called Make Block. These are the bots we'll be using
tonight at the nodebots workshop.

They have many features, including motors, sensors and can use bluetooth and wifi too.

---

### mBot drive code

Notes:

This code is a little long but mostly it creates a board and then uses the key
presses of a keyboard to then say to drive forwards, backwards, left and right
and turns the motors on and off in the right combinations to do this. Even
though there is some code it is very simple. 

Let's see this drive. Hopefully this will work.

---

## Outro (better title)

Notes:

So hopefully that gives you a good view of what is happening with JavaScript and
hardware. It is lots and lots of fun and is really good for your coding skill
because real life events make coding a bit more interesting. 

--- 


## Resources

Notes:

--- 


## Prep for evening

Notes:


--- 
