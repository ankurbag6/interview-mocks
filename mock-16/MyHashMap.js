/**
 * 
 * Implement a HashMap without using any built-in hash table libraries (no Map, no {} keyed by anything, no Set). Use an array as the underlying storage.
 */
/**
 * array --> initiate the array -- store
 * put --> push array, key/index
 * get --> iterate array and get the value for the key
 * remove  --> deleting the element from the array
 */

class MyHashMap {
    store = [];
    constructor() {
        this.store = [];
    }
    put(key, value) { /* insert or update */
        this.store[key] = value;
    }
    get(key) { /* return value, or -1 if not found */
        return this.store[key] ?? -1;
    }
    remove(key) { /* remove the mapping if present */
        if (this.store[key] !== undefined) {
            delete this.store[key];
        }
    }
}


// const m = new MyHashMap();
// m.put(1, 1);
// m.put(2, 2);
// m.get(1);     // → 1
// console.log(m.get(3));     // → -1
// m.put(2, 1);  // update existing
// console.log(m.get(2));     // → 1
// m.remove(2);
// console.log(m.get(2));     // → -1


const m = new MyHashMap();
m.put(3, 0);
m.remove(3);
console.log(m.get(3));