/*Fresh set — same level, but a few of these deliberately retest last session's misses.

**Q1.** Count character frequencies in a string. Return the map.
```
"hello" → {h:1, e:1, l:2, o:1}
```
*/
function countChars(str) {
    const freqMap = new Map();
    for(const ch of str) {
        freqMap.set(ch, (freqMap.get(ch) ?? 0)+1)
    }
    return Object.fromEntries(freqMap);
}
console.log(countChars("hello"));


/*
**Q2.** Return the first element whose count *reaches* 3.
```
[1,2,1,2,2] → 2
```
*/
function getElementWithFrequency(nums, count=3){
    const countMap = new Map();
    for(const n of nums) {
        countMap.set(n, (countMap.get(n)??0)+1);
        if(countMap.get(n) === count) return n;
    }
    return null;
}
console.log(getElementWithFrequency([1,2,1,2,2,1,2,1]));


/**Q3.** Given an array of emails, return `true` if any email appears twice. One pass.
```
["a@x.com","b@x.com","a@x.com"] → true
```
*/
function isEmailPresent(emails) {
    const seen = new Set();
    for( const email of emails) {
        if(seen.has(email)) {
            return true;
        }
        seen.add(email);
    }
    return false;
}
console.log(isEmailPresent(["a@x.com","b@x.com","a@x.com"]));


/**Q4.** Return all characters that appear exactly once in a string, in order.
```
"swiss" → ["w","i"]
```
*/
function getOccurencesChars(str, nofTimes=1){
    const freqMap = new Map();
    const res = [];
    for(const ch of str) {
        freqMap.set(ch, (freqMap.get(ch) ?? 0)+1)
    }

    for(const [char, count] of freqMap) {
        if(count === nofTimes) res.push(char);
    }
    return res;
}

console.log(getOccurencesChars("swiss"));

/*
*Q5.** Given two strings, can `s2` be built from the letters of `s1`? Each letter usable once.
```
s1="aabbc", s2="abc" → true    s1="ab", s2="aab" → false
```
*/
function canBebuilt(s1, s2) {
    if (s1 == null || s2 == null || s2.length > s1.length) return false;

    const pool = new Map();
    for (const c of s1) pool.set(c, (pool.get(c) ?? 0) + 1);

    for (const c of s2) {
        const left = pool.get(c) ?? 0;
        if (left === 0) return false;
        pool.set(c, left - 1);
    }
    return true;
}
console.log(canBebuilt("aabbc", "abc"))

/**Q6.** Group numbers by even/odd.
```
[1,2,3,4] → {odd:[1,3], even:[2,4]}
```
*/
function getEvenOddMap(nums) {
    const evenOddMap = {}
    for(const n of nums) {
            if(n%2 !== 0)
                evenOddMap['odd'] = evenOddMap['odd'] ? evenOddMap['odd'].push(n) : [n];
            else 
                evenOddMap['even'] = evenOddMap['even'] ? evenOddMap['even'].push(n) : [n];
        }
    return evenOddMap;
}
console.log(getEvenOddMap([1,2,3,4]));


/**Q7.** Given an array of `{user, amount}` transactions, return total amount per user.
```
[{user:"a",amount:5},{user:"b",amount:3},{user:"a",amount:2}] → {a:7, b:3}
```
*/
function getTransactionsbyUser(transactions) {
    const res = {}
    for(const {user, amount} of transactions) {
        res[user] = (res[user] ?? 0) + amount;
    }
    return res;
}

console.log(getTransactionsbyUser([{user:"a",amount:5},{user:"b",amount:3},{user:"a",amount:2}]))




/**Q8.** Given two arrays, return elements in `a` but **not** in `b`.
```
[1,2,3,4], [2,4] → [1,3]
```
*/
function getUncommonElementsinList(nums, comparatorarr) {
    const exclude = new Set(comparatorarr ?? []);
    return (nums ?? []).filter(n => !exclude.has(n));
}

console.log(getUncommonElementsinList([1,2,3,4],[2,4]))