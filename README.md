# node-red-contrib-dht-sensor
This is a [Node Red](http://nodered.org/) node to manage connection to a DHT11 or DHT22 sensor on a Raspberry Pi. It allows you to specify the variables that define the connections to the sensor. You can specify:
* The topic of the message (not really a lot of use!).
* The name of the node. This can be a unique value to tag the sensor, useful if you have multiple connected.
* The sensor type - this can be either DHT11 or DHT22.
* The pin number scheme. This can be any of
    * the BCM-GPIO scheme
    * the physical sequence number, for revision 1 of the Pi
    * the physical sequence number, for revision 2 of the Pi (and A+ or B+)
    * the [wiringpi](http://wiringpi.com/) sequence, for revision 1 of the Pi
    * the wiringpi sequence, for revision 2 of the Pi (and A+ or B+)

This node is added to the Raspberry Pi section.

Note that this node requires that [node-dht-sensor](https://www.npmjs.com/package/node-dht-sensor) is installed and accessible from Node Red. Since this requires accesss to low-level parts of the Raspberry Pi, you must run your flow with superuser access.

Installing this node requires three steps:
* Install the BCM2835 library from [here](http://www.airspayce.com/mikem/bcm2835/ "C library for Broadcom BCM 2835 as used in Raspberry Pi").
* Install the node-dht-sensor dependency
```bash
sudo npm install -g node-dht-sensor
```
* Install this node
```bash
sudo npm install -g node-red-contrib-dht-sensor
```
