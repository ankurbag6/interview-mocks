const { Queue } = require('./queue');
const { isRetryable } = require('./errors');

class ApiClient {
  constructor(options = {}) {
    this.baseUrl = options.baseUrl || 'https://api.example.com';
    this.maxConcurrent = options.maxConcurrent || 3;
    this.queue = new Queue();
    this.activeRequests = 0;
  }

  async request(path, opts = {}) {
    return new Promise((resolve, reject) => {
      this.queue.enqueue({ path, opts, resolve, reject });
      this._drain();
    });
  }

  async _drain() {
    if (this.activeRequests >= this.maxConcurrent) return;
    const next = this.queue.dequeue();
    if (!next) return;

    this.activeRequests++;
    try {
      const res = await this._execute(next.path, next.opts);
      next.resolve(res);
    } catch (err) {
      next.reject(err);
    } finally {
      this.activeRequests--;
      this._drain();
    }
  }

  async _execute(path, opts) {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, opts);
    if (!response.ok) {
      const err = new Error(`HTTP ${response.status}`);
      err.status = response.status;
      throw err;
    }
    return response.json();
  }

  // Task 1 : Add a get(path) method to the ApiClient class that calls request(path) with no special options.
  get(path) {
    return this.request(path, {})
  }
  // Task 2 : Add a post(path, body) method to the ApiClient class that calls request with method: 'POST', a JSON-stringified body in the body field, and a Content-Type: application/json header.

  post(path, body) {
    return this.request(path, {method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' }})
  }
}

module.exports = { ApiClient };

/**
 * 
 * Great orientation. Let's start simple. I want you to add a method called get(path) to the ApiClient class. It should be a convenience wrapper that calls request(path) with no special options — just a shorthand for GET requests. Once that works, add a post(path, body) method that calls request with method: 'POST', a JSON-stringified body in the body field, and a Content-Type: application/json header."
 * 
 */

// Task 2 : Add a post(path, body) method to the ApiClient class that calls request with method: 'POST', a JSON-stringified body in the body field, and a Content-Type: application/json header.


