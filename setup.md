# Setup Steps:

## Presso:

cd ~/dev/building-droids-with-js
grunt serve

## NoDLE

Start robot.
Will go orange then green.
ping pallas.local
ssh pi@pallas.local
cd ajnodebot
node app.js

Should now be able to access on 192.168.40.1:8000


## Demos:

Do web server first

cd ~/dev/nbscaffold
node app.js /dev/tty.usbmodem1421

Should be able to hit this on localhost:8001

Different window

cd ~/dev/nbscaffold
node led-blink.js /dev/tty.usbmodem1411

## Test everything

Reload presentation window.

Skip to end come back and make sure:

* NoDLE is running and visible
* GIF has loaded
* Button is clickable and working
* All screens are presenting.

Throw to big screen.

They are going to love it.


