let kue = require('kue');

// Import the shared queue instance
let push_notification_code = require('./6-job_creator.js');

let sendNotification = function(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
};

// Process jobs on the shared queue
push_notification_code.process('job', (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message);
  done(); // Mark the job as complete
});

