/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}

"egg", 
"add"
e => a, g => d

f11
b23
f=>b
1=>2

set.size != set.2 --> false

uniq chars in both strs should match


paper
title

p => 2
a => 1
e => 1
r => 1

t => 2
i => 1
l => 1
e => 1

sort both maps by values
compare each key on values, if mismatch false
else true
 */
var isIsomorphic = function(s, t) {
    if(s.length !== t.length) return false;

    let sTot = new Map(), tTos = new Map();

    for(let i=0; i<s.length; i++) {
        const a = s[i], b = t[i]; 
        if(sTot.has(a) && sTot.get(a) !== b) return false;
        if(tTos.has(b) && tTos.get(b) !== a) return false;
        sTot.set(a, b);
        tTos.set(b, a);
    }
    return true;
};


console.log(isIsomorphic("add", "egg"));
console.log(isIsomorphic("add22", "egg12"));
console.log(isIsomorphic("paper", "title"));
console.log(isIsomorphic("bbbaaaba", "aaabbbba"));
// b =>  4, a =>4 // a => 4 b => 4
