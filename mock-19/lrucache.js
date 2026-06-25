class LRUCache {
  cache;
  capacity;
  constructor(capacity) {
    this.capacity = capacity; 
    this.cache = new Map();
   }
  get(key) { 
    if(this.cache.has(key)) {
      let tempV = this.cache.get(key);  
      this.cache.delete(key);
      this.cache.set(key, tempV);
      return tempV;
    } else return -1;
   }    // returns value, or -1 if absent
  put(key, value) { 
    if(this.cache.size < this.capacity) {
      this.cache.set(key, value);
    } else {
      delete this.cache.keys().next().value
    }
  }
}

// --- Basic init + puts ---
const cache = new LRUCache(3);
cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
console.log("after 3 puts:", [...cache.cache.entries()]);
// expect: [["a",1],["b",2],["c",3]]

// --- get hits + recency promotion ---
console.log("get a:", cache.get("a")); // expect 1
console.log("after get a:", [...cache.cache.entries()]);
// expect: [["b",2],["c",3],["a",1]]   (a moved to most-recent)

// --- get miss ---
console.log("get z:", cache.get("z")); // expect -1

// --- eviction ---
cache.put("d", 4);
console.log("after put d:", [...cache.cache.entries()]);
// expect: [["c",3],["a",1],["d",4]]   (b evicted as LRU)

// --- update existing key (should refresh recency, not evict) ---
cache.put("a", 99);
console.log("after put a=99:", [...cache.cache.entries()]);
// expect: [["c",3],["d",4],["a",99]]

// --- falsy value round-trip ---
const c2 = new LRUCache(2);
c2.put("zero", 0);
c2.put("empty", "");
console.log("get zero:", c2.get("zero"));   // expect 0
console.log("get empty:", c2.get("empty")); // expect ""

// --- capacity 1 edge case ---
const c3 = new LRUCache(1);
c3.put("x", 1);
c3.put("y", 2);
console.log("cap 1 contents:", [...c3.cache.entries()]); // expect [["y",2]]
console.log("get x:", c3.get("x")); // expect -1




