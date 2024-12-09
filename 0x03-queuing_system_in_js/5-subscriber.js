import { createClient } from 'redis';
const redis = require('redis');
const client = createClient();

client.on('connect', () => {
  console.log('Redis connected to the server');
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server: ', err);
});
client.subscribe('ALXchannel');
client.on('message', (channel, message) => {
  if (message !== 'KILL_SERVER') {
    console.log(message);
  } else {
      client.unsubscribe('ALXchannel');
      client.quit();
  }
});
