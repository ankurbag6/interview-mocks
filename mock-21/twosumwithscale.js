console.log("Hello, World!");

// Given an array of integers and a target integer, return the indices of the two numbers that add up to the target.
// Let’s assume $O(N)$ time complexity is the goal.
// Example 1: [2, 7, 11, 15], Target: 9, Result: [0, 1].
// Example 2: [1, 2, 3, 4, 3], Target: 6, Result: [[1, 3], [2, 4]]
// Example 3: [3, 3, 3], Target: 6, Result: [[0,1],[0,2],[1,2]]
// Example 4: [-1, -2, -3, -4] Target: -5, Result:  [[0,3],[1,2]]


function twoSums(nums, target) {
    // return empty arr if nums is empty or undefined
    if(!nums || nums.length === 0) return [];
    // map -- <n , i > 
    const map = new Map(); // [3,3,3] // []
    const res = [];

    /**
     *  [3, 3 , 3 ,,... 10mil] 6
     *  -- same
     *   if(allElementsAreSame)
     *   then check num + num == target
     *       --> twosums()
     *          --> ????
     *      // 
     *   else 
     *      return []; 
     */

    for(let i = 0; i<nums.length; i++) {
        // iterate over the nums 
        // store in the map <num, index> 
        // checking the target - num in the map 
        // return  [index, currindx]
        let comp = target - nums[i]; // 3
        if(map.has(comp)) {
            const indexes = map.get(comp);
            for(let idx of indexes){
                res.push([idx,i]); // [0,1] // [0,2]
            }
            
        } 
        // if nums[i] --> already present, then append to array
        let temparr =  map.get(nums[i]) ?? [];
        temparr.push(i);
        map.set(nums[i],temparr);

    }
    return res; // [ [ 0, 1 ], [ 0, 2 ], [ 1, 2 ] .... 10 mil ]
}
// WHat are the options ::: 
// 1. Change the data structure from array to trie 
// 2. API with BOUNDS [100]
// 3. BAtch the response
// 4. Async batching
// 5. Count of all the element


console.log(twoSums([2, 7, 11, 15], 9));

console.log(twoSums([1, 2, 3, 4, 3], 6));


console.log(twoSums([3, 3, 3], 6));


console.log(twoSums([-1, -2, -3, -4], -5));