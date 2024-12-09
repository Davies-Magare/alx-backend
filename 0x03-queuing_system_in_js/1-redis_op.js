import { createClient } from 'redis';
const redis = require('redis');
const client = createClient();

client.on('connect', () => {
  console.log('Redis connected to the server');
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server: ', err);
});

const setNewSchool = function(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

const displaySchoolValue = function(schoolName) {
  client.get(schoolName, (err, res) => {
    console.log(res);
  });
}
displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
