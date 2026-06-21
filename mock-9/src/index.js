const { JobQueue } = require('./jobQueue');

const queue = new JobQueue();

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

queue.enqueue(() => delay(1000).then(() => console.log('Job 1 done')));
queue.enqueue(() => delay(5000).then(() => console.log('Job 2 done')));
queue.enqueue(() => delay(30).then(() => console.log('Job 3 done')));
//queue.pause();
queue.enqueue(() => delay(300).then(() => console.log('Job 4 done')));


//console.log(queue.size());

