/*

Maps

D5. Two Sum, unsorted, return indices. The 90-second version.

[2,7,11,15], t=9 → [0,1]

D6. First non-repeating character in a string, return its index or -1.

"leetcode" → 0    "aabb" → -1

D7. Given two arrays, return their intersection as unique values.

[1,2,2,1], [2,2] → [2]

D8. Valid anagram — s and t, lowercase letters. Frequency map, one increment pass, one decrement pass.

*/
function twoSum(nums, target) {
    const seen = new Set();
    for(const n of nums) {
        let comp = target - n;
        if(seen.has(comp)) return true;
        seen.add(n);
    }
    return false;
}

function firstNonrepeatingChar(s) {
    const seen = new Set();
    for(let i=0; i<s.length;i++) {
        if(seen.has(s[i])) return i;
        seen.add(s[i]);
    }
    return -1;
}

function intersection(s, t) {
    const freq = new Map();
    const res = [];
    for(let i=0; i<s.length;i++) {
        freq.set(s[i], (freq.get(s[i]) ?? 0) + 1);
    }
    for(let i=0; i<t.length;i++) {
        freq.set(t[i], (freq.get(t[i])) - 1);
        if(freq.get(t[i]) === 0) res.push(t[i]);

    }
    return res;
}

function validAnagram(s, t) {
    const freq = new Map();
    for(let i=0; i<s.length;i++) {
        freq.set(s[i], (freq.get(s[i]) ?? 0) + 1);
    }
    for(let i=0; i<t.length;i++) {
        freq.set(t[i], (freq.get(t[i])) - 1);
        if(freq.get(t[i]) === 0)  {
            freq.delete(t[i]);
        }

    }
    return freq.size === 0 ;
}


