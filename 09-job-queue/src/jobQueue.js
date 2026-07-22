// A simple job queue that processes jobs one at a time.

class JobQueue {
  constructor() {
    this.jobs = [];
    this.isProcessing = false;
    this.isPaused = false;
  }

    /**
   * Now add priority support. 
   * enqueue(job, priority) where priority is a number — higher number means higher priority. 
   * Jobs with higher priority should run before lower priority jobs. 
   * If no priority is given, default to 0."
   * 
   * 
   * Job1 - { j1, 1}
   * Job1 - { j2, 0}
   * Job 3 - {j3, 2}
   * push in the queue
   * highest 2 --> process 3, 1 , 2
   * 
   * Sort the Jobs array based on priority
   * Arrays.sort
   *  
   */
  enqueue(job, priority = 0, timeoutMs = 0) {
    this.jobs.push({ job, priority, timeoutMs });
    this.jobs.sort((a, b) => b.priority - a.priority);
    if (!this.isPaused) this._process();
}

async _process() {
    if (this.isProcessing || this.jobs.length === 0) return;

    this.isProcessing = true;
    const entry = this.jobs.shift();

    try {
        if (entry.timeoutMs > 0) {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('TimeoutError')), entry.timeoutMs)
            );
            await Promise.race([entry.job(), timeoutPromise]);
        } else {
            await entry.job();
        }
    } catch (err) {
        console.error('Job failed:', err.message);
    } finally {
        this.isProcessing = false;
        if (!this.isPaused) this._process();
    }
}
  // task 1 : size --> number of jobs which are waiting
  /***
   * 
   * The formula — it was simpler than you thought
Re-read the question: "number of jobs currently waiting — not including any job actively being processed."
The active job has already been shifted off the array in _process():
javascriptconst job = this.jobs.shift(); // ← removed from array before processing
So this.jobs only contains waiting jobs — the active job is already gone. The answer is simply:
javascriptget size() {
    return this.jobs.length;
}
That's it. One line. No filter needed.
This is the classic over-engineering trap under time pressure. You saw "not including actively processing" and added complexity — but the code already handles it by shifting the job off before processing.
The paper step would have caught this. If you'd written:

"Active job is shifted off before processing → jobs array only contains waiting jobs → size = jobs.length"

You'd have been done in 2 minutes.
   * 
   * 
   */
  get size() {
    return this.jobs.length;
  }

  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
    this._process();
  }

/**
 * UESTION 4
"Last one. Add a timeout option to enqueue. 
If a job runs longer than timeoutMs, it should be rejected with a TimeoutError and the queue should continue processing. Usage:
javascriptqueue.enqueue(job, 0, 2000); // priority 0, timeout 2000ms
queue.enqueue(job, 0);       // no timeout

After you implement it, tell me: what are the tradeoffs of this approach, and what happens to the job's internal state if it times out mid-execution?"
 * 


- calculate elapsedTime : endTime - startTime
- if elapsedTime > timeoutMs --. throw TimeoutError


 * 
 */


}

module.exports = { JobQueue };