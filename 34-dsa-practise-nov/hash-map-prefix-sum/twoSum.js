/**
Example 1:

Input: nums = [2,7,11,15], target = 9

Output: [0,1]

Explanation:

The sum of nums[0] and nums[1] is 2 + 7 = 9, which equals the target. Therefore, the indices [0, 1] are returned.

Example 2:

Input: nums = [3,2,4], target = 6

Output: [1,2]

Explanation:

The sum of nums[1] and nums[2] is 2 + 4 = 6, which equals the target. Therefore, the indices [1, 2] are returned.

Example 3:

Input: nums = [3,3], target = 6

Output: [0,1]

Explanation:

The sum of nums[0] and nums[1] is 3 + 3 = 6, which equals the target. Therefore, the indices [0, 1] are returned.


Not Valid number --> return []

 */
var twoSum = function(nums, target) {

    /**
     * Approach 1 : Brfutfore 
     * scanning the array for every number
     * for(i=0...n)
     *   for(j=1...n)
     *     if(target === n[i] + n[j]) return [i,j]
     * return []
     * T : O(n2) S:O(1)
     * 
     * 
     * Approach 2: Using HashMap
     * create a map : [num -> index]
     * scan the array, find the complement in the map, return the index
     * 
     * T: O(n) S:O(n)
     */
    const map = new Map();
    
    for(let i=0;i<nums.length; i++) {
        const complement = target - nums[i];
        if(map.has(complement)) return [map.get(complement), i]
        else map.set(nums[i], i);
    }


    return [];
};

console.log(twoSum([2,7,11,15], 9));
console.log(twoSum([], 9));


function twoSumAllPairs(nums, target) {
  const seen = new Set();    // values we've already passed
  const pairs = new Map();   // smaller value -> larger value (dedupes for free)

  for (const x of nums) {
    const c = target - x;
    // c must come from an EARLIER element, so [2,2] needs two 2s
    if (seen.has(c)) pairs.set(Math.min(x, c), Math.max(x, c));
    seen.add(x);
  }
  return [...pairs];         // Map entries are already [key, value] arrays
}


/*

Staff-level follow-ups
At staff level, Two Sum is only the warm-up. The signal comes from how you handle these:

All pairs: Return every unique value pair that sums to the target, e.g. [1,1,2,2,3,3], target 4. How does your map change, and how do you avoid duplicate pairs without a Set of strings?
Memory-constrained: You can't use O(n) extra memory. What do you do if the input is sorted, and what if it isn't? What's the cost of sorting when you need the original indices?
Streaming API: Design add(num) and find(target) for a live stream. Which operation do you make O(1) if reads outnumber writes 1000:1? What if it's the other way round?
Distributed: You have 10 billion integers spread across 100 machines and one fixed target. How do you partition the data so every pair x and target - x lands on the same machine? (Hint: hashing x alone doesn't work.)
Production edge cases: What breaks if nums holds floats like 0.1 and 0.2 with target 0.3? Or integers above 2^53 in JS? How would you fix each?

*/