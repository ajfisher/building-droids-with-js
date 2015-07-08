
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

More recently, over the last 2 years, some great work has been done in the
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

Let's spend a moment assessing JavaScripts capability and talking about 
some of it's features that makes JS and hardware really powerful together.

JavaScript has struggled to make the transition from a quirky language that
people think is just used to validate forms or make links change colour when
you roll over them. 

--- 

## JavaScript is too dynamic to be precise...

Glenn's tweets

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

## Real hardware engineers use C...

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

## Web applications designed by hardware engineers

Pic of some router or a printer app etc.

Notes:

This is what happens when you get a hardware engineer to design web applications.
This is recent as well - it came off my router at home.

---

## So why use JS for robotics then?

Notes:

Let's assume the language is as capable as any other - and besides the fact we
are all JS developers here. Why use JavaScript compared to some other high 
level language.

For me it really comes down to two things:

JavaScript's inherent event handling
JavaScript's dynamic object prototyping

---

## EventEmitter

Notes:

JavaScript has incredible event handling. We tend to take this for granted, but
due to it's birth as an interface related language, it has one of the most
incredible event systems of any modern language. If you work in NodeJS then you
know that you have EventEmitter available and it's just amazing at allowing
different parts of your application to talk to each other.

---

## The real world is all events

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

## Objects need structure and flexibility

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

## Prototypes are great

```
var left_motor = new Five.motor({controller: 'I2C'});
var right_motor = new Five.motor({controller: 'PCA34567'});

left_motor.start();
right_motor.stop();

left_motor.prototype.double_speed = function() { // };

```

Notes:

For end users this is awesome but as a developer writing JS drivers for things 
like motors being able to define a shape and then allow you to attach the
appropriate controller is great too.

Likewise as the end user you all know you can extend the prototype and make your
own versions of it if you need something really specific such as going twice
as fast when you call start.

---

## JS <3 Robotics

Notes:

That's enough of talking about why JS is really well suited to working with robotics.
We all work with JavaScript and know it's a real and interesting language -
Let's move on to what the hardware stack looks like.


## The NodeBots stack

NodeBots Logo

Notes:



---

## Body 3 - Things to Build

Notes:

---


## Outro

Notes:

--- 


## Resources

Notes:

--- 


## Prep for evening

Notes:


--- 
