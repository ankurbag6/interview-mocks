/*
Fresh set — same patterns, slightly stiffer. Still small enough to run in a couple minutes each.

**R1.** Return the *last* element that appears exactly once.
```
[1,2,1,3,2,4] → 4    [1,1] → null
```
*/
function getLastElem(nums, count = 1) {
  if (nums === undefined || nums.length === 0) return null;
  const map = new Map();
  for (const n of nums) {
    map.set(n, (map.get(n) ?? 0) + 1);
  }
  const res = [];
  for (const [k, v] of map) {
    if (v === count) res.push(k);
  }
  return res.length !== 0 ? res[res.length - 1] : null;
}

console.log(getLastElem([1, 2, 1, 3, 2, 4]));
console.log(getLastElem([1, 2, 1, 3, 2, 4, 5, 5, -2]));

console.log(getLastElem([1, 1]));
/**R2.** Given a string, return `true` if some permutation of it is a palindrome.
```
"carrace" → true    "code" → false
```
carrace
  pq


*/

function containsPallindrome(str, count = 1) {
  if (str === undefined || str.length === 0) return false;
  if (str.length === 1) return true;

  const isOdd = (n) => n % 2 !== 0;
  const map = new Map();
  for (const c of str) {
    map.set(c, (map.get(c) ?? 0) + 1);
  }
  /**
     all even and one odd || all even --> is pallindrome
     all odd --> not palindrome
     */
  let isAllEven = false,
    isAllOdd = false,
    oddOunt = 0,
    evenCount = 0;

  const res = [];
  for (const [k, v] of map) {
    if (isOdd(v)) oddOunt++;
    else evenCount++;
  }
  console.log({ str, oddOunt, evenCount });
  if (oddOunt <= 1) return true;
  return false;
}

console.log(containsPallindrome("carrace"));
console.log(containsPallindrome("code"));

console.log(containsPallindrome("abab"));

console.log(containsPallindrome("abc"));

/**R3.** Two strings `s` and `t` — return the one character that was *added* to `t` (t is s shuffled plus one extra char).
```
s="abcd", t="abcde" → "e"    s="aab", t="aaba" → "a"
```
*/
function getNewChars(s, t, count = 1) {
  let newChar = "";
  const map = new Map();
  for (const c of s) {
    map.set(c, (map.get(c) ?? 0) + 1);
  }

  for (const c of t) {
    if (!map.has(c)) newChar += c;
    if (newChar.length === count) {
      return newChar;
    }
  }
  return newChar;
}

console.log(getNewChars("abcd", "abcde"));

/**R4.** Given an array of words, return the first word that is an anagram of an *earlier* word.
```
["cat","dog","tac","god"] → "tac"
```
*/
function isAnagram(s, t) {
  if (s === undefined || t == undefined) return false;
  if (s.length !== t.length) return false;
  const map = new Map();
  for (const c of s) {
    map.set(c, (map.get(c) ?? 0) + 1);
  }

  for (const c of t) {
    if (!map.has(c) || map.get(c) < 0) return false;
    map.set(c, map.get(c) - 1);
  }
  return true;
}
function getAnagrams(arr, count = 1) {
  if (arr === undefined || arr.length === 0 || arr.length === 1) return null;
  const res = [];
  for (let l = 0; l < arr.length; l++) {
    for (let j = l + 1; j < arr.length; j++) {
      if (isAnagram(arr[l], arr[j])) {
        res.push(arr[j]);
      }
    }
  }
  return res.slice(0, count);
}

console.log(getAnagrams(["cat", "dog", "tac", "god"]));

/**R5.** Given `{city, temp}` readings, return the max temp per city.
```
[{city:"van",temp:12},{city:"tor",temp:20},{city:"van",temp:15}] → {van:15, tor:20}
```
*/

function getMaxTempByCity(rows) {
  const res = {};

  for (const { city, temp } of rows) {
    // set the max temp for the city
    if (res[city] === undefined) res[city] = temp;
    if (res[city] && res[city] < temp) {
      res[city] = temp;
    }
  }
  return res;
}

console.log(
  getMaxTempByCity([
    { city: "van", temp: 12 },
    { city: "tor", temp: 20 },
    { city: "van", temp: 15 },
  ]),
);
console.log(
  getMaxTempByCity([
    { city: "van", temp: 12 },
    { city: "tor", temp: 20 },
    { city: "van", temp: 15 },
    { city: "van", temp: -15 },
  ]),
);
/**R6.** 
 * Two-way mapping check: given two strings of equal length, return `true` 
 * if chars map 1-to-1 in *both* directions. (Yes — this is isomorphic strings, as a drill.)
```
"egg","add" → true    "badc","baba" → false
```
*/
function isIsoMorphicStrings(s, t) {
  if (
    s === undefined ||
    s.length === 0 ||
    t === undefined ||
    t.length === 0 ||
    s.length !== t.length
  )
    return false;
  const stot = new Map(),
    ttos = new Map();
  for (let i = 0; i < s.length; i++) {
    let a = s[i],
      b = t[i];
    if (stot.has(a) && stot.get(a) != b) return false;
    if (ttos.has(b) && ttos.get(b) != a) return false;
    stot.set(a, b);
    ttos.set(b, a);
  }

  return true;
}

console.log(isIsoMorphicStrings("egg", "add"));
console.log(isIsoMorphicStrings("badc", "baba"));

/**R7.** Given an array, return `true` if any value equals the *count* of another value.
```
[3,1,1,1] → true (1 appears 3 times, and 3 is in the array)
```
[3 -1]
[1 - 3]
*/
function isCountEqualsTovalues(nums) {
  const map = new Map(),
    set = new Set(nums);
  for (let n of nums) {
    map.set(n, (map.get(n) ?? 0) + 1);
  }
  for (const [k, v] of map) {
    if (nums.includes(v)) return true;
  }
  return false;
}

console.log(isCountEqualsTovalues([3, 1, 1, 1]));
console.log(isCountEqualsTovalues([0, 2, 3]));
/**R8.** Sliding toward B3: return `true` if any *prefix* of the array sums to 0.
```
[3,-1,-2,5] → true    [1,2,3] → false
```

R4 is B2's engine in miniature. R6 closes out the mock problem. Run each, paste code + output.
*/

function isPrefixSumEquals(nums, tgt) {
  let prefixSum = 0;
  for (const n of nums) {
    prefixSum += n;
    if (prefixSum === tgt) return true;
  }
  return false;
}
console.log(isPrefixSumEquals([3, -1, -2, 5], 0));
console.log(isPrefixSumEquals([1, 2, 3], 0)); // [2, -5, 3] // [-1, 1, -1, 1] // [0, -5]
console.log(isPrefixSumEquals([0, -5], 0));
console.log(isPrefixSumEquals([-1, 1, -1, 1], 0));
