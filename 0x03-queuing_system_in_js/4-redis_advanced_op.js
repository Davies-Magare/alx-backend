import { createClient } from 'redis';
const redis = require('redis');

const client = createClient();

client.on('connect', () => {
  console.log('Redis client connected to the server');
});
client.on('error', (err) => {
  console.error('Redis client not connected to the server: ', err);
});

const data = {
'Portland': 50,
'Seattle': 80,
'New York': 20,
'Bogota': 20,
'Cali': 40,
'Paris': 2
};

for (const [city, value] of Object.entries(data)) {
  client.hset('ALX', city, value, redis.print);
}

client.hgetall('ALX', (err, res) => {
  console.log(res);
});
