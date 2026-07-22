async function fetchWithRetry(url, options = {}, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    } catch (err) {
      if (i === maxRetries - 1) throw err;
    }
  }
}
// Drill: orient, then add exponential backoff between retries.


const todos = [];
function addTodo(text) { todos.push({ id: Date.now(), text, done: false }); }
function toggleTodo(id) {
  const t = todos.find(t => t.id === id);
  if (t) t.done = !t.done;
}
function getTodos(filter = 'all') {
  if (filter === 'active') return todos.filter(t => !t.done);
  if (filter === 'done') return todos.filter(t => t.done);
  return todos;
}
// Drill: orient, then add a `deleteTodo(id)` and a `clearCompleted()` method.

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key) {
    if (!this.cache.has(key)) return -1;
    const val = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }
  put(key, value) {
    if (this.cache.has(key)) this.cache.delete(key);
    else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
    }
    this.cache.set(key, value);
  }
}
// Drill: orient, then explain WHY Map ordering matters here. Then add a `size()` method.

function pipe(...fns) {
  return function (input) {
    return fns.reduce((acc, fn) => fn(acc), input);
  };
}
// Usage: const addOne = x => x + 1; const double = x => x * 2;
// pipe(addOne, double)(3) === 8
// Drill: orient, then write an async version `pipeAsync` that handles Promise-returning fns.