# node-red-contrib-dht-sensor
This is a [Node Red](http://nodered.org/) node to manage connection to a DHT11 or DHT22 sensor on a Raspberry Pi. It allows you to specify the variables that define the connections to the sensor.

This node is added to the Raspberry Pi section.

### Installation
This node requires that [node-dht-sensor](https://www.npmjs.com/package/node-dht-sensor) is installed and accessible from Node Red. Since this requires accesss to low-level parts of the Raspberry Pi, you must run your flow with superuser access.

Installing this node requires three steps:
* Install the BCM2835 library from [here](http://www.airspayce.com/mikem/bcm2835/ "C library for Broadcom BCM 2835 as used in Raspberry Pi").
* Install the node-dht-sensor dependency
```bash
sudo npm install --unsafe-perm -g node-dht-sensor
```
* Install this node
```bash
sudo npm install --unsafe-perm -g node-red-contrib-dht-sensor
```

### Configuring the node
You can specify the following, as seen in the picture here:
* The topic of the message - this is passed through so it can be used as an ID for the sensor.
* The name of the node. This can be a unique value to tag the sensor, useful if you have multiple sensors connected.
* The sensor type - this can be either DHT11 or DHT22.
* The pin number scheme. This can be any of
    * the BCM-GPIO scheme
    * the physical sequence number, for revision 1 of the Pi
    * the physical sequence number, for revision 2 of the Pi (and A+ or B+)
    * the [wiringpi](http://wiringpi.com/) sequence, for revision 1 of the Pi
    * the wiringpi sequence, for revision 2 of the Pi (and A+ or B+)

Note: If you're daft enough to select an earth (ground) pin, this will cause
the Pi to freeze. 

![Node configuration](https://github.com/bpmurray/node-red-contrib-dht-sensor/blob/master/dhtconfig.jpg?raw=true)

### Using the node
The node is added to the Raspberry Pi section of the Node-RED pallette, and it can be used in a flow as usual:

![Node-RED flow](https://github.com/bpmurray/node-red-contrib-dht-sensor/blob/master/dhtflow.jpg?raw=true)

The message returned includes the temperature as the payload, and the humidity and the device ID as part of the message itself:

![Returned message](https://github.com/bpmurray/node-red-contrib-dht-sensor/blob/master/dhtmsg.jpg?raw=true)

While not having the humidity as part of the payload may seem awkward, it was done with the explicit intention to preserve compatability with the [node-red-controb-ds18b20-sensor](https://www.npmjs.com/package/node-red-contrib-ds18b20-sensor) node.
### Problems?
It is possible to run this as an ordinary user rather than root, but it requires that you update the version of the BCM2385 library to version 1.5 or later, and build it according to the instructions. Then you have to uninstall and reinstall the nodes:
```bash
sudo npm uninstall --unsafe-perm -g node-red-contrib-dht-sensor
sudo npm uninstall --unsafe-perm -g node-dht-sensor

sudo npm install --unsafe-perm -g node-dht-sensor
sudo npm install --unsafe-perm -g node-red-contrib-dht-sensor
```
once you do this, you can run it as any user rather than as root.

### Notes:
* The temperature values is in &deg;C and the humidity values are % relative humidity.
* If you're using an older release of the DHT2385 driver, you will have to run node-RED as root, otherwise you may run into problems with permissions.
