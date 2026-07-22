function countFreq(arr) {
    if (!arr || arr.length === 0) return {};
    const map = new Map();
    for (const a of arr) {
        map.set(a, (map.get(a) ?? 0) + 1)
    }
    return map;
}

console.log(countFreq(['a', 'b', 'a', 'c', 'b', 'a']));
// → { a: 3, b: 2, c: 1 }

countFreq([]);
// → {}
// solution 2
// function countFreq(arr) {
//   const result = {};
//   for (const a of arr) {
//     result[a] = (result[a] ?? 0) + 1;
//   }
//   return result;
// }


function hasDuplicate(arr) {
    const seen = new Set();
    for (const a of arr) {
        if (seen.has(a)) return true;
        seen.add(a);
    }
    return false;
}

console.log(hasDuplicate([1, 2, 3, 1]));  // → true
console.log(hasDuplicate([1, 2, 3, 4]));  // → false
hasDuplicate([]);             // → false

function uniqueIndexMap(arr) {
  const counts = {};
  for (const a of arr) counts[a] = (counts[a] ?? 0) + 1;
  
  const result = {};
  for (let i = 0; i < arr.length; i++) {
    if (counts[arr[i]] === 1) result[i] = arr[i];
  }
  return result;
}

console.log(uniqueIndexMap(['a', 'b', 'c']));          // → { 0: 'a', 1: 'b', 2: 'c' }
console.log(uniqueIndexMap(['a', 'b', 'a', 'c']));      // → { 1: 'b', 3: 'c' }  (a appears twice → excluded)
uniqueIndexMap(['x', 'x']);                // → {}
uniqueIndexMap([]);                         // → {}


function intersection(a, b) {
  const set = new Set();
  for (const i of a) set.add(i);
  
  const result = new Set();
  for (const i of b) {
    if(set.has(i)) result.add(i);
  }
  return [...result];
}

intersection([1, 2, 2, 1], [2, 2]);        // → [2]
intersection([4, 9, 5], [9, 4, 9, 8, 4]);  // → [4, 9]  (or [9, 4])
intersection([1, 2], [3, 4]);               // → []
intersection([], [1, 2]);                   // → []


function singleNumber(nums) {
    // map <value , count>
    const map = new Map();
    for(const n of nums) {
        map.set(n, (map.get(n) ?? 0 ) +1 );
    }
    // iterate over map and get the key with count ==1
    for (const [num, count] of map) {
    if (count === 1) return num;
  }
    return -1;
}

singleNumber([2, 2, 1]);        // → 1
singleNumber([4, 1, 2, 1, 2]);  // → 4
singleNumber([7]);               // → 7