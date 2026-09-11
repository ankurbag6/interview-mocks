/*
\---

**Question 1** (target: 8–10 min)

You're given a string of available letters and a list of words. Each letter can be used at most as many times as it appears.

```js
letters = "balloons"
words = ["son", "ball", "friends", "boll", "noons"]
```

// Example 4
letters = "aab"
words = ["aaa"]

Return the **first** word from the list that can be fully built from the available letters. 
For this input, the answer would be `"son"`.


// Example 3
letters = "xyz"
words = ["xx", "zzz", "yxa"]
Any clarifying questions before you start?
*/

function canBebuilt(words, letters) {
    if(letters=== undefined || letters.length === 0) return null;

    // scan the letters --> store in freqmap
    // scan the words array, and decremment the freq map - freq
    // if char not found in the freq map, then return false
    let freqMap = new Map(); // [b -> 2, a -> 1]
    // [b -> 1, a -> 2] // [x->1, y->1, z->1]
    let  res =""; let canBuilt = false;
    for(let l of letters) {
        freqMap.set(l, (freqMap.get(l) ?? 0 )+ 1);
    }

    const temp = new Map(freqMap);
    for(const w of words) {// ["xx"] zzz
        for(const ch of w) { // a b b
            if(!freqMap.has(ch)) {
                canBuilt = false;
                // reset 
                freqMap = new Map(temp);
                console.log({temp, freqMap, ch, canBuilt});
                break;
            } else {
                freqMap.set(ch, (freqMap.get(ch) ) - 1); // 0
                if(freqMap.get(ch) == 0) freqMap.delete(ch);
                canBuilt = true; // a b b
                console.log({freqMap, ch, canBuilt});
            }
        }
        console.log({w, canBuilt})
        if(canBuilt === true) {
            res = w;
            return res;
        }

    }
    return null;

}

// Time Complexity -  O(ch*W) + O(l)
// Space complexity - O(l)
let letters = "balloons"
let words = ["son", "ball", "friends", "boll", "noons"]
console.log(canBebuilt(words,letters));

letters = "aab"
words = ["aaa"]
console.log(canBebuilt(words,letters));


letters = "xyz"
words = ["xx", "zzz", "yxa"]

console.log(canBebuilt(words,letters));

letters = "aab"
words = ["abb", "ab"]
console.log(canBebuilt(words,letters));

letters = "aab"
words = ["abb", "abb", "ab"]

console.log(canBebuilt(words,letters));


