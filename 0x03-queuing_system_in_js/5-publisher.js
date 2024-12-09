import { createClient } from 'redis';
const redis = require('redis');
const client = createClient();

client.on('connect', () => {
  console.log('Redis connected to the server');
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server: ', err);
});

let publishMessage = function(message, time) {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('ALX channel', message);
  }, time);
}
publishMessage("ALX Student #1 starts course", 100);
publishMessage("ALX Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("ALX Student #3 starts course", 400);
