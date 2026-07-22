const { TaskQueue } = require('./taskQueue');

const queue = new TaskQueue(2);

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

queue.add(() => delay(100).then(() => console.log('Task 1 done')));
queue.add(() => delay(50).then(() => console.log('Task 2 done')));
queue.add(() => delay(30).then(() => console.log('Task 3 done')));