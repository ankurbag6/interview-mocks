/*

Given an array of strings strs, group the anagrams together. You can return the answer in any order.

 

Example 1:

Input: strs = ["eat","tea","tan","ate","nat","bat"]

Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Explanation:

There is no string in strs that can be rearranged to form "bat".
The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.
Example 2:

Input: strs = [""]

Output: [[""]]

Example 3:

Input: strs = ["a"]

Output: [["a"]]


Plan -
isAnagram(s1, s2)  - > 

map

for(i=0 to strs.len)
 for (j=1+1 to strs.length)
   if(isAangram(st[i], st[j])) group them

*/

/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
    // Scan the array, sort the str and store in a map
    // key(sorted_char) ->[array of words]
    const res = {};
    for(const str of strs) {
        const key = [...str].sort().join(''); // M * nlogn
        if(!res[key]) res[key] = [];
        res[key].push(str);
    }
    return Object.values(res);
};

// T : O(M * N Log N)
// S : O(M * N)

console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"]));

var groupAnagramsSolution2 = function(strs) {
    // Scan the array, sort the str and store in a map
    // key(sorted_char) ->[array of words]
    
    const res = {};
    for(const str of strs) {
        const count = new Array(26).fill(0);
        for (const ch of str) count[ch.charCodeAt(0) - 97]++;
        const key = count.join('#');   // '#' separator: counts of 1 and 11 stay distinct
        if(!res[key]) res[key] = [];
        res[key].push(str);
    }
    return Object.values(res);
};

console.log(groupAnagramsSolution2(["eat","tea","tan","ate","nat","bat"]));

/**
 Answer: run it as a MapReduce job, with extra handling for very popular keys
1. Basic design
Do the same thing as your code, spread across machines. The shuffle step plays the role of your object res.


words (sharded across N machines)
      │
  MAP: for each word → emit (sortedKey, word)      e.g. ("aet", "tea")
      │
  SHUFFLE: send each pair to reducer hash(sortedKey) % R
      │      → every anagram of "aet" lands on the same reducer
      │
  REDUCE: collect all words for a key → write group to storage
Why it's correct: every anagram has the same key, and every copy of a key hashes to the same reducer. Each group therefore ends up complete on one machine.
Cost: mapping is O(k log k) per word and runs in parallel. The shuffle (moving data over the network) is the main cost, at roughly the size of the input.
Combiner: group words locally on each mapper before the shuffle, so ("aet", [tea, eat, ate]) travels once instead of three separate pairs.
2. The popular-key problem (data skew)
If "aet" has 100 million words, the single reducer that owns it becomes a straggler. The whole job waits for it, and it may run out of memory.

Fixes:

Find hot keys first. Sample the input, or count keys approximately with a count-min sketch, to find keys above a threshold.
Salt the hot keys. Emit ("aet#3", word), where the salt is hash(word) % S. The hot key is now spread across S reducers.
Merge in a second step. Remove the salt and concatenate the partial groups. For grouping, the merge is just appending lists, so this step is cheap.
Stream the output instead of holding it in memory. A group of 100 million words should never be one array in RAM. Write it out as a file per key, or in chunks.
Only salt the hot keys. Salting every key doubles the work for no benefit.

3. Details that show staff-level thinking
Deterministic keys across machines: every mapper must normalize the same way (lowercase, Unicode NFC so that é is one character) and use the same hash function. If they don't, anagrams land on different reducers and the groups come out incomplete.
Duplicate words: ask whether "tea" appearing twice should be listed twice. If not, remove duplicates in the combiner.
Fault tolerance: map and reduce tasks are pure functions oof their input, so the framework can re-run a failed task safely.
What the consumer needs: if downstream code only needs counts per group, emit (key, count) instead. The shuffle then moves numbers rather than words, which is far smaller.
One-line summary for an interview: "The anagram key is the partition key. Shuffle by hash(key), use a combiner to cut network traffic, salt hot keys and merge them in a second step, and normalize consistently so the same anagrams always meet on the same machine."

*/