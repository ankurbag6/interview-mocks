function twoSum(nums, target) {
    const map = new Map(); // nums[i] -> i
    for(let i = 0; i<nums.length; i++) {
        let comp = target - nums[i];
        if(!map.has(comp)) {
            map.set(nums[i], i);
        } else {
            return [map.get(comp), i];
        }
    }
    return [];
} 


// console.log(twoSum([2, 7, 11, 15], 9)    ) // → [0, 1]   (2 + 7 = 9)
// console.log(twoSum([3, 2, 4], 6) )         // → [1, 2]   (2 + 4 = 6)
// console.log(twoSum([3, 3], 6)   )          // → [0, 1]
function containsNearbyDuplicate(nums, k) {
    const map = new Map(); 
    for(let i = 0; i<nums.length; i++) {
        if(!map.has(nums[i])) {
            map.set(nums[i], i);
        } else {
            let idx = map.get(nums[i]);
            console.log(map);
            console.log(i, nums[i], idx, (i - idx ));
            return i - idx <= k;
        }

    }
    return false;
}
// Soluution 1 : Map way
// map = new Map( num, idx)
// scan the array, 
// if the map.has(num) find the diff between the index
function containsNearbyDuplicate(nums, k) {
  const map = new Map();            // value -> most recent index
  for (let i = 0; i < nums.length; i++) {
    if (map.has(nums[i]) && i - map.get(nums[i]) <= k) return true;
    map.set(nums[i], i);            // always update — don't early-return on a miss
  }
  return false;
}

// Solution 2 : Sliding window
//Keep a Set of the last k values. If the incoming value is already in the window, you have a pair within distance k.
function containsNearbyDuplicate(nums, k) {
  const window = new Set();
  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true;
    window.add(nums[i]);
    if (window.size > k) window.delete(nums[i - k]);  // drop the element leaving the window
  }
  return false;
}


//console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)  )      // → true  (indices 0 and 3, diff = 3)
console.log(containsNearbyDuplicate([1, 0, 1, 1], 1))        // → true  (indices 2 and 3, diff = 1)
containsNearbyDuplicate([1, 2, 3, 1, 2, 3], 2)  // → false (closest duplicates are 3 apart)