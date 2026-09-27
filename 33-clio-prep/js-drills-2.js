function reverseString(str) {
    if(!str) return "";

    if(str.length === 1) return str;

    return [...str].reverse().join('');
}

console.log(reverseString("hello"));
console.log(reverseString(""));
console.log(reverseString("a"));

function countVowels(str) {
    const vowels = ['a', 'e', 'i', 'o', 'u'];
    return [...str.toLowerCase()].filter(s => vowels.includes(s)).length;
}
console.log(countVowels("hello"));   // → 2
console.log(countVowels("rhythm"));  // → 0
console.log(countVowels("AEIOU"));   // → 5
console.log(countVowels(""));
console.log(countVowels());

function capitalize(str) {
    if(!str) return "";

    return str[0].toUpperCase()+ str.slice(1).toLowerCase();
}
console.log(capitalize("hello"));   // → 2
console.log(capitalize("rhythm"));  // → 0
console.log(capitalize("AEIOU"));   // → 5
console.log(capitalize(""));
console.log(capitalize("a")); 