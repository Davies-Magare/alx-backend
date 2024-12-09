import { createClient } from 'redis';
const redis = require('redis');
const util = require('util');
const client = createClient();

client.on('connect', () => {
  console.log('Redis connected to the server');
});

client.on('error', (err) => {
  console.error('Redis client not connected to the server: ', err);
});

const setNewSchool = async function(schoolName, value) {
  const setAsync = util.promisify(client.set).bind(client);
  try {
    const result = await setAsync(schoolName, value);
    console.log(result);
  } catch(error) {
      console.log("Error: ", error);
  }
}

const getAsync = util.promisify(client.get).bind(client);

const displaySchoolValue = async function(schoolName) {
  try {
    const result = await getAsync(schoolName);
    console.log(result);
  } catch (error) {
      console.log("Error: ", error);
  }
}
const run = async function() {
  await displaySchoolValue('Holberton');
  await setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}
client.on('connect', async() => {
  await run();
});
