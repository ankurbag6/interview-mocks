/*
Write a function that translates a word into Pig Latin.

Words starting with a vowel: append "way" → "apple" → "appleway"
Words starting with consonants: move the leading consonants to the end, append "ay" → "hello" → "ellohay"
string -> ingstray
"eat" → "eatway"

Are there any more constraints , I need to think about?
Can you provide some more examples please ?

Some validations I was thinking about -
1.Empty string or undefined --> return ""

y is a consonant at the start of a word, and a vowel anywhere else. So "yellow" → y moves → "ellowyay". And "rhythm" → the y at position 1 counts as a vowel, so only r moves → "ythmrhay".


My implmentation plan : 

vowels set - [aeiou]
isVowel(ch) -> check in the set, -> true

first char isVowel-> return str+"way"

while(isVowel(ch) === true) idx++;
str.slice(idx)+str.slice(0,idx)+"ay"
*/

const VOWELS =  new Set(['a','e','i','o','u']);

function isVowel(ch){
    return VOWELS.has(ch.toLowerCase());
}
function convertToPigLatin(str) { // hello
    if(!str) return "";

    
    // check for first char
    if(isVowel(str[0])) return str + "way";

    // consonants
    let idx = 0;
    while(idx<str.length && !isVowel(str[idx])) {console.log( {idx, ch: str[idx]} );idx++; // 1 
    }

    return str.slice(idx)+str.slice(0, idx)+"ay"; //ellohay
}

console.log(convertToPigLatin("hello"));
console.log(convertToPigLatin(""));
console.log(convertToPigLatin("h"));
console.log(convertToPigLatin("apple"));
