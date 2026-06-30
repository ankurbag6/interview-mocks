// class LRUCache {
//   constructor(capacity) {
//     this.capacity = capacity;
//     this.cache = new Map();
//   }

//   get(key) {
//     if (!this.cache.has(key)) return -1;
//     const value = this.cache.get(key);
//     this.cache.delete(key);   // remove from current position
//     this.cache.set(key, value); // re-insert as most-recent
//     return value;
//   }

//   put(key, value) {
//     if (this.cache.has(key)) {
//       this.cache.delete(key); // remove so re-insert moves it to most-recent
//     } else if (this.cache.size >= this.capacity) {
//       const oldestKey = this.cache.keys().next().value; // LRU = first inserted
//       this.cache.delete(oldestKey);
//     }
//     this.cache.set(key, value);
//   }
// }


class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    // if key is already present, then delete and insert to refresh the recency
    if(this.cache.has(key)) {
      const val = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
    } 
    return -1;
  }

  put(key, val) {
    // key already present then delete and insert to refresh the recency
     if(this.cache.has(key)) {
      this.cache.delete(key);
    }
    this.cache.set(key, val);
    // update the capacity
    // Remove the oldest key
    if(this.cache.size > this.capacity) {
      // get the oldest key and delete
      const oldestkey = this.cache.keys().next().value; 
      this.cache.delete(oldestkey);
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




