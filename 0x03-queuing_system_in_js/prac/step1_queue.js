const kue = require('kue');
const queue = kue.createQueue();

const job = queue.create('job', {title: 'abc', number: '1'});
job.save((err) => {
  if (!err) console.log(`Job created: ID ${job.id}`);
});

queue.process('job', (job, done) => {
  if (Number(job.data.number) >= 1000) {
    return done(new Error('Number should be less than 1000'));
  }
  console.log('Job success');
  done();
  
});
