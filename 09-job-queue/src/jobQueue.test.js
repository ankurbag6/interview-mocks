const { JobQueue } = require('../src/jobQueue');

describe('JobQueue', () => {
  test('processes jobs in order', async () => {
    const queue = new JobQueue();
    const results = [];
    
    await new Promise(resolve => {
      queue.enqueue(async () => { results.push(1); });
      queue.enqueue(async () => { results.push(2); });
      queue.enqueue(async () => { results.push(3); resolve(); });
    });

    expect(results).toEqual([1, 2, 3]);
  });

  test('handles job errors without stopping the queue', async () => {
    const queue = new JobQueue();
    const results = [];

    await new Promise(resolve => {
      queue.enqueue(async () => { throw new Error('fail'); });
      queue.enqueue(async () => { results.push('recovered'); resolve(); });
    });

    expect(results).toEqual(['recovered']);
  });
});