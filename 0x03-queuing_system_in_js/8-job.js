const kue = require('kue');
const queue = kue.createQueue();

const createPushNotificationsJobs = function(jobs, queue) {
  if (jobs.constructor !== Array) throw new Error('Jobs is not an array');
  jobs.forEach((jobData) => {
    const job = queue.create('notification', jobData);
    job.save((err) => {
      if (!err) console.log(`Notification job created: ${job.id}`);
    });
    job.on('complete', (result) => {
      console.log(`Notification job ${job.id} completed`);
    });
    job.on('failed', (error) => {
      console.log(`Notification job ${job.id} failed: ${error}`);
    });
    job.on('progress', (progress, data) => {
      console.log(`Notification job ${job.id} ${progress}% complete`);
    });
  });
}

module.exports = createPushNotificationsJobs;
