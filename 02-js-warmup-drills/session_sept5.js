/*
Warmups — each should take 2–5 minutes, no tricks. They build the muscle for B1–B3 in order.



*/


/*
W1. Return true if array nums contains any duplicate.

[1,2,3,1] → true    [1,2,3,4] → false

*/
function w1(arr) {
    const seen = new Set();
    for(const el of arr) {
        if(seen.has(el)) return true;
        seen.add(el)
    }
    return false;
}
w1([1,2,3,1]);
w1([1,2,3,4]);

/*

W2. Return the count of distinct values in an array.

[5,5,5,2] → 2


*/
function w2(arr){
    // set
    // const seen = new Set();
    // for(const el of arr) {
    //     seen.add(el)
    // }
    // return seen.size;

    // pointers
    // sort and keep prev, curr
    arr.sort();
    let prev = 0;
    let cnt = 1;
    for(let curr = 1; curr<arr.length; curr++) {
        if(arr[curr] === arr[prev]) continue;
        else {
            prev=curr;
            cnt++;
        }
    }
    return cnt;

}
console.log(w2([5,5,5,3,3,2, 3,5,3]));

/*
W3. Given a string, return the first character that appears twice.
"abca" → "a"    "abcb" → "b"
*/
function w3(str) {
    const seen = new Set();
    for(const ch of str) {
        if(seen.has(ch)) return ch;
        seen.add(ch);
    }
    return "";
}
console.log(w3("abca"));

console.log(w3("abcb"));


/*

W4. Return true if strings s and t are anagrams of each other.

"listen", "silent" → true    "rat", "car" → false


*/
function w4(s, t) {
    if(s.length !== t.length) return false;
    const tracker = new Map();

    for(const ch of s) {
        tracker.set(ch, (tracker.get(ch) ?? 0) + 1);
    }

    for(const ch of t) {
        if(tracker.get(ch) <= 0 || tracker.get(ch) === undefined) return false;
        tracker.set(ch, tracker.get(ch) - 1);
    }
    return true;

}

console.log(w4("listen","silent"));

console.log(w4("rat","car"));


/*


W5. Build a frequency map of characters in a string, then return 
the character with the highest count (any tiebreak).

"tree" → "e"
*/
function w5(s) {
    if(s.length === 0) return null;
    const freq = new Map();

    let maxFreq = 0, res = '', prev = 0;
    for(const ch of s) {
        freq.set(ch, (freq.get(ch) ?? 0) + 1);
        maxFreq = Math.max(freq.get(ch), maxFreq);
        if(maxFreq != prev) {
            res = ch;
            prev = maxFreq;
        }

    }
    return res;
}

console.log(w5("tree"));

/*


W6. Given an int array, return a new array of its prefix sums.

[1,2,3,4] → [1,3,6,10]

*/

function w6(arr) {
    if(arr === undefined || arr.length ===0) return [];
    const res = arr;
    for(let i=1; i<arr.length; i++) {
        res[i] += arr[i-1];
    }
    return res;
}
console.log(w6([1,2,3,4]));

/*

W7. Using prefix sums, answer: what is the sum of elements from index i to j inclusive? 
Write rangeSum(nums, i, j) that precomputes once, then answers in O(1).

nums=[1,2,3,4], i=1, j=3 → 9


res[3]  - 0 = 0...3
res[3] -  res[0]= 1...3
res[3] -   res[1]  = 2...3
res[j] - res[i-1]

W8. Return true if any prefix of the array sums to exactly t.

[3,4,-7,1], t=0 → true (first three)
*/

function w7(nums) {

}
