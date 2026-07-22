// A simple LRU (Least Recently Used) cache.
// When the cache is full, the least recently used entry is evicted.

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    if (!this.cache.has(key)) return null;
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  set(key, value) {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      const lruKey = this.cache.keys().next().value;
      this.cache.delete(lruKey);
    }
    this.cache.set(key, value);
  }

  get size() {
    return this.cache.size;
  }
  /**
 * THE TASK
"Add a peek(key) method that returns the value for a key without updating its LRU position.
 Then add a has(key) method that returns true/false without affecting LRU order. 
 Both are read-only — they must not change the order of any key in the cache."
 * 
 */

 peek(key) {
    return this.cache.get(key);
 }

 has(key) {
    return this.cache.has(key);
 }
}




module.exports = { LRUCache };