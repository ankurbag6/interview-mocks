
/*300. Longest Increasing Subsequence

Given an integer array nums, return the length of the longest strictly increasing subsequence.

 

Example 1:

Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4.
Example 2:

Input: nums = [0,1,0,3,2,3]
Output: 4
Example 3:

Input: nums = [7,7,7,7,7,7,7]
Output: 1
 

Constraints:

1 <= nums.length <= 2500
-104 <= nums[i] <= 104
 

Follow up: Can you come up with an algorithm that runs in O(n log(n)) time complexity?
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
// doesnot wotk 
var lengthOfLIS = function(nums) {
    // validation

    // processing
    let i=0, seq=0, maxSeq = 0;
    // [7,7,7,7,7,7,7] // [0,1,0,3,2,3]

    for(let j=1; j<nums.length; j++) { //j: 1 2 3 4 // i : 0 1
        if(nums[j]>nums[i]) {
            if(nums[j] > nums[j-1]) {
                seq++; // 1 2
            } else {
                seq = 1;
            }
            maxSeq = Math.max(seq, maxSeq); // 1 2
        } else if(nums[j] === nums[i]){ // 
            i++; // 1
        } else {
            i++;
            seq = 0;
        }
    }
    return maxSeq+1; // 1

};

/*
The word "subsequence." That single word is the fork in the road:

substring / subarray (contiguous) → sliding window, two pointers, prefix sums. A window is valid because the elements you're holding are exactly the ones between i and j.
subsequence (order-preserved, gaps allowed) → almost always DP.
Two real fixes:

O(n²) DP — dp[i] = LIS length ending at i:
*/
var lengthOfLIS_dp = function(nums) {
    const dp = new Array(nums.length).fill(1);
    let max = 1;
    for (let j = 1; j < nums.length; j++) {
        for (let i = 0; i < j; i++) {
            if (nums[j] > nums[i]) dp[j] = Math.max(dp[j], dp[i] + 1);
        }
        max = Math.max(max, dp[j]);
    }
    return max;
};

// Binary search way
/*

O(n log n) — patience sorting. tails[k] = smallest possible tail of an increasing subsequence of length k+1; binary-search the first tail >= num and overwrite it:
*/
var lengthOfLIS = function(nums) {
    const tails = [];
    for (const num of nums) {
        let lo = 0, hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] < num) lo = mid + 1;
            else hi = mid;
        }
        tails[lo] = num;          // replaces, or appends when lo === tails.length
    }
    return tails.length;
};

