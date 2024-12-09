let kue = require('kue');

let push_notification_code = kue.createQueue();

let data = {phoneNumber: '12354', message: 'hola'};

let job = push_notification_code.create('job', data).save((err) => {
    if (!err) console.log(`Notification job created: ${job.id}`);
});

job.on('complete', () => {
  console.log(`Notification job completed`);
}).on('failed', (err) => {
  console.log(`Notification job failed`);
});

module.exports = push_notification_code;
