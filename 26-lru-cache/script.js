/*

"Build an in-memory cache with a bounded capacity. 
It should support get(key) and set(key, value). 
When the cache is full and a new entry comes in, evict the least recently used entry. 
Capacity should be configurable when the cache is created. Take it from wherever you want."

implementation plan:
-----------------------
1. create a class LRUCACHE
class LRUCache
- attributes : map, capacity
- constructor(capacity)
- get(key)
  --> if key not present return undefined
  --> if key present, update the recency : save the val, delete the key, and insert the key with saved val, return val

- set(key, val)
  --> if key not present and capacity is full, evict the least recently used entry, add new key, val
  --> if key present, delete the key, and insert the key with saved val

*/


class LRUCache {
    constructor(capacity) {
        if(capacity <= 0) throw new Error("Error: Invalid capacity");
        this.capacity = capacity;
        this.map = new Map();
    }

    /*
    - get(key)
    --> if key not present return undefined
    --> if key present, update the recency : save the val, delete the key, and insert the key with saved val, return val
    */
    get(key) {
        if(!this.map.has(key)) return undefined;
        const val = this.map.get(key);
        this.map.delete(key);
        this.map.set(key, val);
        return val;
    }

    /*
    - set(key, val)
    --> if key not present and capacity is full, evict the least recently used entry, add new key, val
    --> if key present, delete the key, and insert the key with saved val

    */
   set(key, val) {
    if(this.map.has(key)) {
        this.map.delete(key);
    } else if(this.map.size >= this.capacity) {
        const lruKey = this.map.keys().next().value;
        this.map.delete(lruKey);
    }
    this.map.set(key, val);
   }
}

// Implement tests cases

function assertEqual(actual, expected, testName) {
    if(actual === expected) {
        console.log(`PASS: ${testName}`);
    } else {
        console.error(`FAIL: ${testName} — expected ${expected}, got ${actual}`);
    }
}

// Test 1: get on missing key returns undefined
{
    const cache = new LRUCache(2);
    assertEqual(cache.get('a'), undefined, 'get on missing key returns undefined');
}

// Test 2: basic set and get
{
    const cache = new LRUCache(2);
    cache.set('a', 1);
    assertEqual(cache.get('a'), 1, 'basic set and get');
}

// Test 3: set on existing key updates the value
{
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('a', 10);
    assertEqual(cache.get('a'), 10, 'set on existing key updates the value');
}

// Test 4: evicts least recently used when full
{
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('c', 3); // evicts 'a'
    assertEqual(cache.get('a'), undefined, 'LRU entry evicted when full');
    assertEqual(cache.get('b'), 2, 'recent entry survives eviction');
    assertEqual(cache.get('c'), 3, 'new entry present after eviction');
}

// Test 5: get updates recency
{
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.get('a');    // 'a' is now most recent, 'b' is LRU
    cache.set('c', 3); // evicts 'b', not 'a'
    assertEqual(cache.get('b'), undefined, 'get updates recency — untouched entry evicted');
    assertEqual(cache.get('a'), 1, 'get updates recency — touched entry survives');
}

// Test 6: set on existing key updates recency
{
    const cache = new LRUCache(2);
    cache.set('a', 1);
    cache.set('b', 2);
    cache.set('a', 10); // 'a' is now most recent, 'b' is LRU
    cache.set('c', 3);  // evicts 'b'
    assertEqual(cache.get('b'), undefined, 'set updates recency — untouched entry evicted');
    assertEqual(cache.get('a'), 10, 'set updates recency — updated entry survives');
}

// Test 7: cache never exceeds capacity
{
    const cache = new LRUCache(3);
    for(let i = 0; i < 10; i++) cache.set(`key${i}`, i);
    assertEqual(cache.map.size, 3, 'cache never exceeds capacity');
}

// Test 8: capacity of 1
{
    const cache = new LRUCache(1);
    cache.set('a', 1);
    cache.set('b', 2); // evicts 'a'
    assertEqual(cache.get('a'), undefined, 'capacity 1 — old entry evicted');
    assertEqual(cache.get('b'), 2, 'capacity 1 — new entry present');
}

// Test 9: invalid capacity throws
{
    let threw = false;
    try {
        new LRUCache(-1);
    } catch(e) {
        threw = true;
    }
    assertEqual(threw, true, 'negative capacity throws');
}

// Test 10: falsy values are stored and retrieved correctly
{
    const cache = new LRUCache(3);
    cache.set('zero', 0);
    cache.set('null', null);
    cache.set('false', false);
    assertEqual(cache.get('zero'), 0, 'falsy value 0 stored correctly');
    assertEqual(cache.get('null'), null, 'falsy value null stored correctly');
    assertEqual(cache.get('false'), false, 'falsy value false stored correctly');
}
