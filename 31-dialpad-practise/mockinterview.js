/*
Question: First Character With Maximum Frequency
Given a string, return the character that appears most frequently. 
If multiple characters have the same highest frequency, return the one that appears first in the string.

banana --> a
aabbcc --> a
"" --> ""
*/
const isLetter = (char) => /^[a-zA-Z0-9]$/.test(char);
function maxFrequency(str) {// banana // aabbcc
    if(str === undefined || str.length === 0) return "";

    const freqMap = new Map();
    let maxFreq = 0, prev = 0, res = "";
    str = str.toLowerCase();
    for(const ch of str) {
        if(isLetter(ch)) {
            freqMap.set(ch, (freqMap.get(ch) ?? 0) + 1); // [a - 2, b - 2, c -2]
            maxFreq = Math.max(maxFreq, freqMap.get(ch)); // 2
            if(maxFreq != prev) {
                res = ch; //a
                prev = maxFreq; // prev : 1 2
            }
        }
    }
    return res;

}

console.log(maxFrequency("banana"));

console.log(maxFrequency("aabbcc"));

console.log({str : "Aabbcc", maxFrequency: maxFrequency("Aabbcc")});

console.log({ str : "112233", maxFrequency: maxFrequency("112233") });

console.log({ str : "aa bb cc dd ee ff", maxFrequency: maxFrequency("aa bb cc dd ee ff")});

// Time complexity - O(n) 