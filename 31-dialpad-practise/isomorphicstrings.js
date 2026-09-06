/*

205. Isomorphic Strings
Given two strings s and t, determine if they are isomorphic.
Two strings s and t are isomorphic if the characters in s can be replaced to get t.

All occurrences of a character must be replaced with another character while preserving the order of characters. No two characters may map to the same character, but a character may map to itself.

 

Example 1:

Input: s = "egg", t = "add"

Output: true

Explanation:

The strings s and t can be made identical by:

Mapping 'e' to 'a'.
Mapping 'g' to 'd'.
Example 2:

Input: s = "f11", t = "b23"

Output: false

Explanation:

The strings s and t can not be made identical as '1' needs to be mapped to both '2' and '3'.

Example 3:

Input: s = "paper", t = "title"

Output: true

 

Constraints:

1 <= s.length <= 5 * 104
t.length == s.length
s and t consist of any valid ascii character.
*/
function isIsomorphic(s, t) {

    if(s.length !== t.length) return false;

    const sTot = new Map();
    const tTos = new Map();

    for(let i=0; i<s.length; i++) {
        let a = s[i], b=t[i];
        if(sTot.has(a) && sTot.get(a) !== b) return false;
        if(tTos.has(b) && tTos.get(b) !== a) return false;
        sTot.set(a, b);
        tTos.set(b, a);
    }
    return true;

}

console.log(isIsomorphic( "egg", "add"));
console.log(isIsomorphic( "f11", "b23"));