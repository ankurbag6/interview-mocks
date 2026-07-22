/***
 * 
 * 
 * firstUniqChar("leetcode")     // → 0   ('l' appears once, first)
firstUniqChar("loveleetcode") // → 2   ('v' is the first non-repeating)
firstUniqChar("aabb")         // → -1
firstUniqChar("")             // → -1


Q5 of 5 — First Unique Character in a String
Given a string s, return the index of the first non-repeating character. 
If no such character exists, return -1.
 */

function firstUniqChar(str) {
    let indx = Infinity;

    const charArray = [...str]; 
    for(let i in charArray) {
        if(str.lastIndexOf(charArray[i]) === str.indexOf(charArray[i])) {
            console.log(charArray[i]);
            if(indx > i) indx = i;
        }
    }
    console.log(indx);
    // scsn map, get the mindx
    return indx === Infinity ? -1 : indx;
}


function firstUniqChar(str) {
    let indx = Infinity;
    const map = new Map();
    const charArray = [...str]; 
    for(let i in charArray) {
        let cnt = map.get(charArray[i]) ?? 0;
        map.set(charArray[i], cnt + 1);
    }
    
    // scsn map, get the mindx
     for(let i in charArray) {
        if(map.get(charArray[i]) === 1) 
            return i;
     }

     return -1;
}


console.log(firstUniqChar("leetcode"));
console.log(firstUniqChar("loveleetcode"));
console.log(firstUniqChar("aabb"));
console.log(firstUniqChar(""));