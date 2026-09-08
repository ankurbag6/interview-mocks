/*


Arrays

D1. Reverse an array in place. Two pointers, no .reverse().

[1,2,3,4] → [4,3,2,1]

D2. Move all zeroes to the end, preserving order of non-zeroes. In place, write cursor advances by exactly one per kept element.

[0,1,0,3,12] → [1,3,12,0,0]
[0,1,0,3,12]
r. w if(nums[r] === 0) , search for next nonzero, w++
 if(nums[w] !=0) swap [w,r], r++
[1,0,0,3,12]
   r   w


D3. Find the max and min in one pass. 
Trivial — but say the loop out loud while you write it, like you would in CoderPad.

D4. Given a sorted array, return true if any pair sums to t. Two pointers from the ends.

[1,3,5,8], t=11 → true

*/
function reverse(nums) {
    let l=0, r=nums.length-1;
    while(l<r) {
        //swap l, r
        [nums[l],nums[r]] = [nums[r], nums[l]]
        l++;
        r--;
    }
    return nums
}
console.log(reverse([1,2,3,4]));

function moveZerroes(nums) {
    let r=0, w=0;
    // [0,1,0,3,12]
    while(w<nums.length){
        // if(nums[r] === 0){ // r:0
        //     // search for nonzero
        //     w++; // 1, 2
        // } 
        if(nums[w] !== 0) { // r:0, 1
            [nums[r], nums[w]] = [nums[w], nums[r]];
            // [1,0,0,3,12]// [1,3,0,0,12] // [1,3,12,0,0]
            r++; // r:1, 2

        }
        w++;
    }
    return nums;
}
console.log(moveZerroes([1,2,3,4]));

function findMinMax(nums) {
    let min = Infinity, max=-Infinity;
    for(const n of nums) {
        min = Math.min(min, n);
        max = Math.max(max, n);
    }
    return [min,max];
}
console.log(findMinMax([1,2,3,4]))

function twoSum(nums, target) {
    let s =0, e=nums.length-1;
    while(s<e){
        if(nums[s]+nums[e]>target) e--;
        else if(nums[s]+nums[e]<target) s++;
        else return true;
    }
    return false;
}
console.log(twoSum([1,2,3,4], 7));
