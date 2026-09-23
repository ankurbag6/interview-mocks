/*
Write a function that translates a word into Pig Latin.

Words starting with a vowel: append "way" → "apple" → "appleway"
Words starting with consonants: move the leading consonants to the end, append "ay" → "hello" → "ellohay"
string -> ingstra
"eat" → "eatway"

Are there any more constraints , I need to think about?
Can you provide some more examples please ?

Some validations I was thinking about -
1.Empty string or undefined --> return ""

y is a consonant at the start of a word, and a vowel anywhere else. So "yellow" → y moves → "ellowyay". And "rhythm" → the y at position 1 counts as a vowel, so only r moves → "hythmray".


My implmentation plan : 
1. isVowel = char in [a,e,i,o,u] or char is y, but index of y > 0 
2. vowel at the start - return str+"way"
3. for consonants 
   - scan the string till I find the vowel, store the indx of vowel
   - return str.slice(index, end of str)+str.slice(0,index-1)+"ay"

*/
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function convertToPigLatin(str) {
    if(str === undefined || str.length === 0) return "";
    if(isNumeric(str)) return str;

    if(str.length === 1 && ['?','!',',', '.'].includes(str[0])) return str;
    const vowels = ['a', 'e','i','o','u'];
    const isVowel = (ch,idx=-1) => vowels.includes(ch.toLowerCase()) || (ch === 'y' && idx > 0);
    let punctuation = "", isCapitalized = str[0] === str[0].toUpperCase();
    if(['?','!',',', '.'].includes(str[str.length-1])) {
        punctuation = str[str.length-1];
        str = str.slice(0,str.length-1 )
    }
    
    
    if(isVowel(str[0])) return str+"way"+punctuation;
    str = str.toLowerCase();
    let i = 0;

    for(i=0; i<str.length; i++) {
        if(isVowel(str[i], i)) {
            break;
        }
    }
    if(i === str.length) 
        return (!isCapitalized ? str : str[0].toUpperCase()+str.slice(1,i))+ "ay"+ punctuation;
    return (!isCapitalized ? str.slice(i) : str[i].toUpperCase())+ str.slice(i+1) + str.slice(0,i) + "ay"+ punctuation;
}
console.log(convertToPigLatin("nth"));
console.log(convertToPigLatin("Nth"));
console.log(convertToPigLatin("Apple!"));

console.log(convertToPigLatin("Hello!"));

console.log(convertToPigLatin("rhythm"));

console.log(convertToPigLatin("yellow"));

console.log(convertToPigLatin("string"));

console.log(convertToPigLatin("eat"));

console.log(convertToPigLatin("eat,"));

console.log(convertToPigLatin(","));

console.log(convertToPigLatin());
console.log(convertToPigLatin("a"));

console.log(convertToPigLatin("b"));

console.log(convertToPigLatin("crypt"));

/* part 2 :
Part 2: Your function now needs to handle full sentences, with two preservation rules:

Capitalization stays where it was. 
"Apple" → "Appleway". 
"Hello" → "Ellohay" — note the capital moved to the new first letter; 
the h that shifted to the middle is lowercase now.
Punctuation stays attached where it was. "hello, world!" → "ellohay, orldway!" — the comma and exclamation stay at the end of their words.

So: "Hello, world!" → "Ellohay, orldway!".

Before you write anything — same drill as before. What questions do you have for me, and what's your plan? I'm particularly interested in how you'll structure this: does convertToPigLatin change, or does something wrap it?"

Questions : 
- What about numbers in the sentence ? 
- What about input 'hEllo world' return? 

I am thinking of creating a new wrapper function that would accept sentence,
split the words on delimiter for eg. " " and implement convertToPigLatin on each word

*/

function convertSentenceToPigLatin(sentence, delim = " ") {
    if(!sentence) return ""

    const words = sentence.split(delim);
    let res = "", i=0;
    res = words.map(convertToPigLatin).join(delim);
    return res;
}

console.log(convertSentenceToPigLatin("Hello, World!"));
console.log(convertSentenceToPigLatin("hello, world!"));
console.log('[' +convertSentenceToPigLatin("Apple pie")+"]");

console.log('[' + convertSentenceToPigLatin("I have 42 apples")+']');