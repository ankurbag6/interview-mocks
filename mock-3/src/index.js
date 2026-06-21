const { TTLStore } = require('./store');

const store = new TTLStore();
store.set('session:abc', { userId: 1}, -1);
store.set('session:def', { userId: 2 }, -500);
store.set('session:efg', { userId: 3 });
store.set('session:ghf', { userId: 4 });
store.set('session:jkl', { userId: 5 });
store.set('session:mno', { userId: 6 });

console.log(store.stats()); // { userId: 1 }
//console.log(store.get('session:abc')); // { userId: 1 }
//setTimeout(()=>{console.log(store.get('session:abc'));}, 1000);
 // { userId: 1 }
//store.set('session:def', { userId: 2 });
//console.log(store.keys());
//console.log(store.cleanup());

// console.log(store.get('session:abc')); // { userId: 1 }
//console.log(store.size);               // 2


// T=0ms: Caller 1 arrives
//const p1 = store.getOrSet('user:1', factory, 5000);
// → key missing, no in-flight
// → calls factory(), gets a Promise
// → stores Promise in inFlight map
// → returns Promise to Caller 1

// T=5ms: Caller 2 arrives (factory still running)
//const p2 = store.getOrSet('user:1', factory, 5000);
// → key still missing (factory hasn't resolved yet)
// → inFlight.has('user:1') === true ← YES, it's there
// → returns THE SAME Promise to Caller 2

// T=200ms: factory resolves
// → p1 resolves with the value ✅
// → p2 resolves with the SAME value ✅ (same Promise object)
// → inFlight cleaned up

module.exports = { store };