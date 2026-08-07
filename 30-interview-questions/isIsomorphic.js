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


/**
 * Welcome to your interview!
 * 
 * Write a function that takes two strings as input and returns true if the 
two strings are substitution ciphers of each other.

A cipher is a code that can convert one string to another.

Two strings are considered substitution ciphers of each other if there exists a cipher
to convert from the first string to the second and there exists a cipher to convert
from the second string to the first. 

In other words, each letter in the first word can
be replaced by the SAME letter to convert it to the second word, AND each letter in the
second word can be replaced by the SAME letter to convert it to the first word.

A few examples:

Input: banana, cololo
Output: True
cololo is a valid substitution cipher of banana because each character in banana 
is replaced by the *same* character in cololo for every occurrence
b : c
a : o
n : l
banana is also a valid substitution cipher of cololo
c : b
o : a
l : n

Input: potter, mallot
Output: True
mallot is a valid substitution cipher of potter
p : m
o : a
t : l
e : o
r : t
potter is also a valid substitution cipher of mallot
m : p
a : o
l : t
o : e
t : r

Input: banana, cololl
Output: False
The first and second 'a' in banana are replaced by 'o' but the third 'a' is replaced by 
'l'
b:c
a:o , l
n:l 


 */
function iscipher(s, t) { // banana 
  // validations
  if(s === undefined || t === undefined) return false;
  if(s.length !== t.length) return false;

  // Build maps : stoT , tTos
  const stoT = new Map(), tTos = new Map();
  for(let i=0; i< s.length; i++) {
    if(stoT.has(s[i]) && stoT.get(s[i]) !== t[i] )  {
      return false;
    }
    if(tTos.has(t[i]) && tTos.get(t[i]) !== s[i] )  {
      return false;
    }
    stoT.set(s[i], t[i]); // 
    tTos.set(t[i], s[i]);
  }
  // scan bata, gell
  for(let i=0; i< s.length; i++) { // 0 // i 
    
    if(stoT.get(s[i]) !== t[i] ||  tTos.get(t[i]) !== s[i])   // b --> c  // c --> b
    {
        return false;
      }
  }
  return true;

}
// console.log(iscipher("", ""));
// console.log(iscipher(undefined, ""));
// console.log(iscipher("banana", "cololo"));
// console.log(iscipher("banana", "cololl"));
// console.log(iscipher("cololl", "banana"));
// console.log(iscipher("potter", "mallot"));
// console.log(iscipher("bata", "gell"));
// console.log(iscipher("bata", "dddd"));
// console.log(iscipher("dddd", "bata"));


/**
 * EXPANSION QUESTION!
 * You're writing a puzzle helper app in which a user can enter a word, and the app
returns a list of words that are substitution ciphers of the user's word. The list
of substitution ciphers is derived from a large list of words available to the app.
An example:

Word list: [banana, abdbdb, cat, mom, tot] 
Input: cololo
Output: [banana, abdbdb]

Input: pop
Output: [mom, tot]

Input: dog
Output: [cat]


Input: gell
Output: []

Define and implement the classes/functions the app would use to get the cipher list for the user's input word.

You are provided with the function below which you can use to get the large list of words
available to the app. 
 */
// len = 5,000,000 OR not in memory
const wordList = ["banana", "abdbdb", "cat", "mom", "tot"];
// cololo
function generateCipherList(input) {
  // validation 
  if(input === undefined || input === "") return []; 
  const res =[];
  for(const word of wordList) {
    if(iscipher(input, word)) res.push(word); // banana abdbdb
  }
  return res;
}
console.log(generateCipherList(""));
console.log(generateCipherList());
console.log(generateCipherList(5));
console.log(generateCipherList("cololo"));
console.log(generateCipherList("dog"));
console.log(generateCipherList("pop"));
console.log(generateCipherList("gell"));


