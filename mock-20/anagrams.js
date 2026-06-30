// function isAnagram(s, t) {
//     if (s === t) return true;
//     if (s.length !== t.length) return false;
//     const map = new Map();
//     // iterate str1 --> store in map (str, count)
//     const charArray = [...s]; // or str.split('');
//     const charArray2 = [...t]; // or str.split('');
//     for (let i = 0; i < s.length; i++) {
//         let count = map.get(charArray[i]) ?? 0;
//         map.set(charArray[i], count + 1);
//     }
//     console.log(map)
//     // check the map
//     for (let i = 0; i < t.length; i++) {
//         const ch = charArray2[i];
//         const count = map.get(ch);
//         if(!count) return false;
//         map.set(ch, count - 1)
//     }
//     return true;
// }

function isAnagram(s, t) {
    if(s === t) return true;
    if(s.length !== t.length) return false;
    const charMap = new Map();
    for(const ch of s) {
        charMap.set(ch, (charMap.get(ch) ?? 0)+1);
    }
    for(const ch of t) {
        if(!charMap.has(ch)) return false;
        charMap.set(ch, (charMap.get(ch) - 1));
    }
    // charMap.forEach((v,k) =>{
    //     if(v > 0) return false;
    // });
    return true;
}

console.log(isAnagram("anagram", "nagaram")); // → true
console.log(isAnagram("rat", "car"));          // → false
console.log(isAnagram("ab", "a"));             // → false
console.log(isAnagram("", ""));                // → true