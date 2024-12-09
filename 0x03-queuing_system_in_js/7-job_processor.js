const kue = require('kue');
const queue = kue.createQueue();

const blacklistedNumbers = [4153518780, 4153518781];

const sendNotification = function(phoneNumber, message, job, done) {
  job.progress(0, 100);
  if (blacklistedNumbers.includes(phoneNumber)) {
    done(new Error(`Phone number ${phoneNumber} is blacklisted`));
    return;
  }
  job.progress(50, 100);
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
  done();
}
queue.process('notification', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
