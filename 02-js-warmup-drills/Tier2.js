
//4. A simple in-memory store with a bug
class Store {
  constructor() { this.data = {}; }
  set(key, value) { this.data[key] = value; }
  get(key) { return this.data[key]; }
  delete(key) { this.data[key] = undefined; } // Remove the key alltogether // delete this.data[key]; 
  has(key) { return key in this.data; }
}
// Drill: walk through what this does. There's a subtle bug — find it.
// (Hint: after delete, has() still returns true. Why?)

// Pagination helper
function paginate(items, page, pageSize) { // 3 params -- 100 1 10
  const start = page * pageSize; // 0 * 10 // 1 * 10 -- 10
  return items.slice(start, start + pageSize); // returning a new array 
}
// Drill: orient, then extend it to return { items, totalPages, hasNext, hasPrev }.
function advPagination(items, page, pageSize ) {// 3 params -- 100 1 10
  const totalPages = items.length * pageSize;
  const hasNext = (page < totalPages);
  const hasPrev = false;
 // const hasPrev = (page > totalPages); // 1 < (totalPages - 1) -- false // 100 -- true 
  return { items, totalPages, hasNext, hasPrev };
}
// 6. A small event emitter

class EventEmitter {
  constructor() { this.listeners = {}; } // instantaiting listeners object
  on(event, fn) {
    if (!this.listeners[event]) this.listeners[event] = []; // <K,V> 
    this.listeners[event].push(fn);
  }
  emit(event, ...args) {
    (this.listeners[event] || []).forEach(fn => fn(...args));
  }
  off(event, fn) {
    if (this.listeners[event]) delete this.listeners[event];
  }
}
// Drill: orient, then add an `off(event, fn)` method that removes a specific listener.