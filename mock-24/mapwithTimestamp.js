class TimeMap {
  constructor() {
    this.store = new Map();   // key -> array of [timestamp, value]
  }

  set(key, value, timestamp) {
    if (!this.store.has(key)) {
      this.store.set(key, []);
    }
    this.store.get(key).push([timestamp, value]);
  }

  get(key, timestamp) {
    const entries = this.store.get(key);
    if (!entries || entries.length === 0) return "";

    // binary search: largest index where entries[i][0] <= timestamp
    let lo = 0, hi = entries.length - 1;
    let result = "";

    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (entries[mid][0] <= timestamp) {
        result = entries[mid][1];   // candidate, but keep searching right
        lo = mid + 1;
      } else {
        hi = mid - 1;
      }
    }

    return result;
  }
}


const tm = new TimeMap();
tm.set("foo", "bar", 1);
console.log(tm.get("foo", 1));   // "bar"
console.log(tm.get("foo", 3));   // "bar"  (1 is the latest <= 3)
console.log(tm.store);
tm.set("foo", "bar2", 4);
console.log(tm.store);
console.log(tm.get("foo", 4));   // "bar2"
console.log(tm.get("foo", 5));   // "bar2"
console.log(tm.get("foo", 0));   // ""     (nothing <= 0)
console.log(tm.get("missing", 1)); // ""   (key not present)