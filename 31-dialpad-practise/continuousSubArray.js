/*2762. Continuous Subarrays

You are given a 0-indexed integer array nums. A subarray of nums is called
continuous if, for any two indices i <= i1, i2 <= j, 0 <= |nums[i1] - nums[i2]| <= 2.

Return the total number of continuous subarrays.

Example: nums = [5,4,2,4] -> 8
Example: nums = [1,2,3]   -> 6
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
// var continuousSubarrays = function(nums) {
//     let l = 0, count = 0;

//     // Monotonic deques holding INDICES, not values.
//     // maxQ is decreasing -> its front is the window's max.
//     // minQ is increasing -> its front is the window's min.
//     const maxQ = [];
//     const minQ = [];

//     for (let r = 0; r < nums.length; r++) {
//         // Adding nums[r] evicts every candidate it dominates: anything smaller
//         // than it can never be a future max while nums[r] is still in the window.
//         while (maxQ.length && nums[maxQ[maxQ.length - 1]] <= nums[r]) maxQ.pop();
//         maxQ.push(r);

//         while (minQ.length && nums[minQ[minQ.length - 1]] >= nums[r]) minQ.pop();
//         minQ.push(r);

//         // Shrink while invalid. Re-reading the fronts each pass is what makes
//         // this terminate - the max/min change as the window narrows.
//         while (nums[maxQ[0]] - nums[minQ[0]] > 2) {
//             l++;
//             // A front that has fallen out of [l, r] is no longer a candidate.
//             if (maxQ[0] < l) maxQ.shift();
//             if (minQ[0] < l) minQ.shift();
//         }

//         // Every subarray ending at r and starting at l..r is valid.
//         count += r - l + 1;
//     }

//     return count;
// };

/**
 * @param {number[]} nums
 * @return {number}
 */
var continuousSubarrays = function(nums) {
    // l, r, count, monotonic dequeus
    let l = 0, r=0, count =0;
    const maxDq = [], minDq = []; // storing max, min indices
    
    // sliding window
    while(r<nums.length) {
        // add to Dqs
        while(maxDq.length !=0 && nums[maxDq[maxDq.length-1]] <= nums[r]) maxDq.pop();
        maxDq.push(r); // max index

        while(minDq.length !=0 && nums[minDq[minDq.length-1]] >= nums[r]) minDq.pop();
        minDq.push(r); // min index

        // invalid 
        while(nums[maxDq[0]] - nums[minDq[0]] > 2) {
            l++;
            if (maxDq[0] < l) maxDq.shift();
            if (minDq[0] < l) minDq.shift();
        }
        count += r -l + 1;
        r++;

    }
    return count;
};
