/**
 * Copyright 2015 Brendan Murray
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

// Dependency - dht sensor package
var sensorLib = require("node-dht-sensor");


module.exports = function(RED) {
   "use strict";

   // The main node definition - most things happen in here
   function dht22Sensor(config) {
      // Mapping tables
      var gpio = [ -1, -1,  8, -1,  9, -1,  7, 15, -1, 16,
                    0,  1,  2, -1,  3,  4, -1,  5, 12, -1,
                   13,  6, 14, 10, -1, 11, -1, -1, 21, -1,
                   22, 26, 23, -1, 24, 27, 25, 28, -1, 29 ];
      var bcm1 = [ -1, -1,  0, -1,  1, -1,  4, 14, -1, 15,
                   17, 18, 21, -1, 22, 23, -1, 24, 10, -1,
                    9, 25, 11,  8, -1,  7, -1, -1,  5, -1,
                    6, 12, 13, -1, 19, 16, 26, 20, -1, 21 ];
      var bcm2 = [ -1, -1,  2, -1,  3, -1,  4, 14, -1, 15,
                   17, 18, 27, -1, 22, 23, -1, 24, 10, -1,
                    9, 25, 11,  8, -1,  7, -1, -1,  5, -1,
                    6, 12, 13, -1, 19, 16, 26, 20, -1, 21 ];

      // Create a RED node
      RED.nodes.createNode(this, config);

      // Store local copies of the node configuration (as defined in the .html)
      var node = this;

      this.topic = config.topic;
      this.dht   = config.dht;

      if (config.pintype == 0) {        // BCM GPIO pin
         this.pin   = config.pin;
      } else if (config.pintype == 1) { // Physical pin number - Rev 1
         this.pin = bcm1[config.pin-1];
      } else if (config.pintype == 2) { // Physical pin number - Rev 2
         this.pin = bcm2[config.pin-1];
      } else if (config.pintype == 3) { // WiringPi pin number - Rev 1
        for (var iX=0; iX<40; iX++) {
           if (gpio[iX] == config.pin) {
             this.pin = bcm1[iX];
             break;
           }
        }
      } else {                          // WiringPi pin number - Rev 2
        for (var iX=0; iX<40; iX++) {
           if (gpio[iX] == config.pin) {
             this.pin = bcm2[iX];
             break;
           }
        }
      }


      // Read the data & return a message object
      this.read = function(msgIn) {
         var msg = msgIn ? msgIn : {};
         var reading  = { temperature : 100.0, humidity : 110.0 };

         if (this.dht === undefined || this.pin === undefined) {
            // Miscommunication - use silly values
         } else {
            // Read the data from the sensors
            reading = sensorLib.read(this.dht, this.pin);
         }

         msg.payload  = reading.temperature.toFixed(2);
         msg.humidity = reading.humidity.toFixed(2);
         msg.isValid  = reading.isValid;
         msg.errors   = reading.errors;
         msg.topic    = node.topic || node.name;
         msg.location = node.name;
         msg.sensorid = 'dht' + node.dht;

         return msg;
      };

      // respond to inputs....
      this.on('input', function (msg) {
         msg = this.read(msg);

         if (msg)
            node.send(msg);
      });

   //   var msg = this.read();

   //   // send out the message to the rest of the workspace.
   //   if (msg)
   //      this.send(msg);
   }

   // Register the node by name.
   RED.nodes.registerType("rpi-dht22", dht22Sensor);
}
